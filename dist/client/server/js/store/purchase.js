var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import ReconnectingWebSocket from "reconnecting-websocket";
import WS from "ws";
import { Types } from "../../../shared/js/gametypes";
import { toBoolean } from "../../../shared/js/utils";
import { Sentry } from "../sentry";
import { rawToRai } from "../utils";
import { store } from "./store";
var ERROR_MESSAGES = {
    noSession: "Received payment for an unregistered session account.",
    wrongAmount: "Wrong amount sent to deposit address.",
    notAvailable: "The store is not currently available, try again later.",
};
var IS_STORE_AVAILABLE = process.env.IS_STORE_AVAILABLE;
var isStoreAvailable = toBoolean(IS_STORE_AVAILABLE);
var Purchase = (function () {
    function Purchase(network) {
        this.network = null;
        this.sessions = [];
        this.databaseHandler = null;
        this.network = network;
    }
    Purchase.prototype.create = function (_a) {
        var player = _a.player, account = _a.account, id = _a.id;
        var accountSession = this.sessions.find(function (_a) {
            var registeredAccount = _a.account;
            return account === registeredAccount;
        });
        var _b = store.storeItems.find(function (item) { return id === item.id; }), nano = _b.nano, ban = _b.ban;
        if (accountSession) {
            this.sessions.map(function (session) {
                if (session.account === accountSession.account) {
                    session.id = id;
                    session.nano = nano;
                    session.ban = ban;
                }
                return session;
            });
        }
        else {
            this.sessions.push({ player: player, account: account, id: id, nano: nano, ban: ban });
            if (!websocket[this.network].registerAccount(account) || !isStoreAvailable) {
                player.send([
                    Types.Messages.PURCHASE_ERROR,
                    {
                        message: ERROR_MESSAGES.notAvailable,
                    },
                ]);
            }
        }
    };
    Purchase.prototype.cancel = function (account) {
        if (!this.sessions.find(function (session) { return session.account === account; }))
            return;
        console.debug("[".concat(this.network, "] PURCHASE - cancel: ").concat(account));
        this.sessions = this.sessions.filter(function (session) { return session.account !== account; });
        websocket[this.network].unregisterAccount(account);
    };
    Purchase.prototype.complete = function (account) {
        console.debug("[".concat(this.network, "] PURCHASE - complete: ").concat(account));
        this.sessions = this.sessions.filter(function (session) { return session.account !== account; });
        websocket[this.network].unregisterAccount(account);
    };
    Purchase.prototype.settle = function (payment) {
        var _a;
        var session = this.sessions.find(function (session) { return session.account === payment.account; });
        if (!session) {
            this.error(ERROR_MESSAGES.noSession, payment);
        }
        else if (payment.amount < session[this.network]) {
            this.error("**".concat(session.player.name, "** ").concat(ERROR_MESSAGES.wrongAmount), (_a = {},
                _a[this.network] = session[this.network],
                _a.payment = payment,
                _a.player = session.player.name,
                _a));
            session.player.send([
                Types.Messages.PURCHASE_ERROR,
                {
                    message: "".concat(ERROR_MESSAGES.wrongAmount, ". You sent ").concat(payment.amount, " instead of sending ").concat(session[this.network], ". Try again or contact an admin."),
                },
            ]);
            this.cancel(session.account);
        }
        else {
            console.debug("[".concat(this.network, "] PURCHASE - settle: ").concat(payment.account));
            this.databaseHandler.settlePurchase(__assign(__assign({ player: session.player }, payment), { id: session.id }));
            this.complete(session.account);
        }
    };
    Purchase.prototype.error = function (error, extra) {
        console.log(error);
        Sentry.captureException(new Error("**".concat(extra.player, "** ").concat(ERROR_MESSAGES.wrongAmount)), {
            extra: extra,
        });
    };
    return Purchase;
}());
var Websocket = (function () {
    function Websocket(network) {
        var _this = this;
        this.network = null;
        this.websocketDomain = null;
        this.connection = null;
        this.isReady = false;
        this.watchedAccounts = [];
        this.keepAliveInterval = null;
        this.network = network;
        this.websocketDomain = network === "nano" ? process.env.NANO_WEBSOCKET_DOMAIN : process.env.BAN_WEBSOCKET_DOMAIN;
        console.debug("[".concat(this.network, "] WEBSOCKET - ").concat(this.websocketDomain));
        if (!isStoreAvailable) {
            return;
        }
        this.connection = isStoreAvailable ? new ReconnectingWebSocket(this.websocketDomain, [], {
            WebSocket: WS,
            connectionTimeout: 10000,
            maxRetries: 100000,
            maxReconnectionDelay: 2000,
            minReconnectionDelay: 10,
        }) : {};
        this.connection.onopen = function () {
            var _a;
            console.debug("[".concat(_this.network, "] WEBSOCKET - onopen"));
            _this.isReady = true;
            var confirmation_subscription = {
                action: "subscribe",
                topic: "confirmation",
                options: {
                    confirmation_type: "active_quorum",
                    all_local_accounts: true,
                    accounts: _this.watchedAccounts,
                },
            };
            _this.connection.send(JSON.stringify(confirmation_subscription));
            _this.keepAlive();
            (_a = purchase[_this.network].sessions) === null || _a === void 0 ? void 0 : _a.forEach(function (_a) {
                var account = _a.account;
                _this.registerAccount(account);
            });
        };
        this.connection.onclose = function () {
            console.debug("[".concat(_this.network, "] WEBSOCKET - onclosed"));
            _this.isReady = false;
        };
        this.connection.onerror = function (err) {
            console.debug("[".concat(_this.network, "] WEBSOCKET - onerror: ").concat(err.message));
            Sentry.captureException(err);
            _this.isReady = false;
        };
        this.connection.onmessage = function (msg) {
            var _a = JSON.parse(msg.data), topic = _a.topic, message = _a.message;
            if (topic !== "confirmation")
                return;
            var hash = message.hash, amount = message.amount, link_as_account = message.block.link_as_account;
            purchase[_this.network].settle({ account: link_as_account, amount: rawToRai(amount, _this.network), hash: hash });
        };
    }
    Websocket.prototype.keepAlive = function () {
        var _this = this;
        this.keepAliveInterval = setInterval(function () {
            _this.connection.send(JSON.stringify({ action: "ping" }));
        }, 20000);
    };
    Websocket.prototype.registerAccount = function (account) {
        if (!this.watchedAccounts.includes(account)) {
            this.watchedAccounts.push(account);
        }
        if (!this.isReady) {
            return false;
        }
        console.debug("WEBSOCKET ".concat(this.network, " - registerAccount: ").concat(account));
        try {
            var confirmation_subscription = {
                action: "update",
                topic: "confirmation",
                options: {
                    accounts_add: [account],
                },
            };
            this.connection.send(JSON.stringify(confirmation_subscription));
        }
        catch (err) {
            Sentry.captureException(err);
            return false;
        }
        return true;
    };
    Websocket.prototype.unregisterAccount = function (account) {
        var index = this.watchedAccounts.indexOf(account);
        if (index > -1) {
            this.watchedAccounts.splice(index, 1);
        }
        console.debug("[".concat(this.network, "] WEBSOCKET - unregisterAccount: ").concat(account));
        try {
            var confirmation_subscription = {
                action: "update",
                topic: "confirmation",
                options: {
                    accounts_del: [account],
                },
            };
            this.connection.send(JSON.stringify(confirmation_subscription));
        }
        catch (err) {
            Sentry.captureException(err);
        }
    };
    return Websocket;
}());
var purchase = {
    nano: new Purchase("nano"),
    ban: new Purchase("ban"),
};
var websocket = {
    nano: new Websocket("nano"),
    ban: new Websocket("ban"),
};
export { purchase };
