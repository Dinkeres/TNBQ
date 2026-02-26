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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as Sentry from "@sentry/browser";
import CryptoJS from "crypto-js";
import * as _ from "lodash";
import { io } from "socket.io-client";
import { Types } from "../../shared/js/gametypes";
import EntityFactory from "./entityfactory";
var GameClient = (function () {
    function GameClient(host, port) {
        this.connection = null;
        this.host = host;
        this.port = port;
        this.connected_callback = null;
        this.spawn_callback = null;
        this.movement_callback = null;
        this.fail_callback = null;
        this.notify_callback = null;
        this.handlers = [];
        this.handlers[Types.Messages.WELCOME] = this.receiveWelcome;
        this.handlers[Types.Messages.ACCOUNT] = this.receiveAccount;
        this.handlers[Types.Messages.MOVE] = this.receiveMove;
        this.handlers[Types.Messages.LOOTMOVE] = this.receiveLootMove;
        this.handlers[Types.Messages.ATTACK] = this.receiveAttack;
        this.handlers[Types.Messages.RAISE] = this.receiveRaise;
        this.handlers[Types.Messages.UNRAISE] = this.receiveUnraise;
        this.handlers[Types.Messages.SPAWN] = this.receiveSpawn;
        this.handlers[Types.Messages.DESPAWN] = this.receiveDespawn;
        this.handlers[Types.Messages.HEALTH] = this.receiveHealth;
        this.handlers[Types.Messages.HEALTH_ENTITY] = this.receiveHealthEntity;
        this.handlers[Types.Messages.CHAT] = this.receiveChat;
        this.handlers[Types.Messages.EQUIP] = this.receiveEquipItem;
        this.handlers[Types.Messages.AURAS] = this.receiveAuras;
        this.handlers[Types.Messages.SKILL] = this.receiveSkill;
        this.handlers[Types.Messages.DROP] = this.receiveDrop;
        this.handlers[Types.Messages.TELEPORT] = this.receiveTeleport;
        this.handlers[Types.Messages.DAMAGE] = this.receiveDamage;
        this.handlers[Types.Messages.POPULATION] = this.receivePopulation;
        this.handlers[Types.Messages.LIST] = this.receiveList;
        this.handlers[Types.Messages.DESTROY] = this.receiveDestroy;
        this.handlers[Types.Messages.KILL] = this.receiveKill;
        this.handlers[Types.Messages.STATS] = this.receiveStats;
        this.handlers[Types.Messages.SETBONUS] = this.receiveSetBonus;
        this.handlers[Types.Messages.SETTINGS] = this.receiveSettings;
        this.handlers[Types.Messages.BLINK] = this.receiveBlink;
        this.handlers[Types.Messages.PARTY] = this.receiveParty;
        this.handlers[Types.Messages.SOULSTONE] = this.receiveSoulStone;
        this.handlers[Types.Messages.TRADE] = this.receiveTrade;
        this.handlers[Types.Messages.BOSS_CHECK] = this.receiveBossCheck;
        this.handlers[Types.Messages.DEATHANGEL_CHECK] = this.receiveDeathAngelCheck;
        this.handlers[Types.Messages.STONETELEPORT_CHECK] = this.receiveStoneTeleportCheck;
        this.handlers[Types.Messages.NOTIFICATION] = this.receiveNotification;
        this.handlers[Types.Messages.INVENTORY] = this.receiveInventory;
        this.handlers[Types.Messages.STASH] = this.receiveStash;
        this.handlers[Types.Messages.UPGRADE] = this.receiveUpgrade;
        this.handlers[Types.Messages.ANVIL_UPGRADE] = this.receiveAnvilUpgrade;
        this.handlers[Types.Messages.ANVIL_RECIPE] = this.receiveAnvilRecipe;
        this.handlers[Types.Messages.ANVIL_ODDS] = this.receiveAnvilOdds;
        this.handlers[Types.Messages.STORE_ITEMS] = this.receiveStoreItems;
        this.handlers[Types.Messages.PURCHASE_COMPLETED] = this.receivePurchaseCompleted;
        this.handlers[Types.Messages.PURCHASE_ERROR] = this.receivePurchaseError;
        this.handlers[Types.Messages.WAYPOINTS_UPDATE] = this.receiveWaypointsUpdate;
        this.handlers[Types.Messages.LEVEL_INPROGRESS] = this.receiveLevelInProgress;
        this.handlers[Types.Messages.COWLEVEL_START] = this.receiveCowLevelStart;
        this.handlers[Types.Messages.COWLEVEL_END] = this.receiveCowLevelEnd;
        this.handlers[Types.Messages.MINOTAURLEVEL_START] = this.receiveMinotaurLevelStart;
        this.handlers[Types.Messages.MINOTAURLEVEL_END] = this.receiveMinotaurLevelEnd;
        this.handlers[Types.Messages.CHALICELEVEL_START] = this.receiveChaliceLevelStart;
        this.handlers[Types.Messages.CHALICELEVEL_END] = this.receiveChaliceLevelEnd;
        this.handlers[Types.Messages.TEMPLELEVEL_START] = this.receiveTempleLevelStart;
        this.handlers[Types.Messages.TEMPLELEVEL_END] = this.receiveTempleLevelEnd;
        this.handlers[Types.Messages.STONELEVEL_START] = this.receiveStoneLevelStart;
        this.handlers[Types.Messages.STONELEVEL_END] = this.receiveStoneLevelEnd;
        this.handlers[Types.Messages.GATEWAYLEVEL_START] = this.receiveGatewayLevelStart;
        this.handlers[Types.Messages.GATEWAYLEVEL_END] = this.receiveGatewayLevelEnd;
        this.handlers[Types.Messages.FROZEN] = this.receiveFrozen;
        this.handlers[Types.Messages.SLOWED] = this.receiveSlowed;
        this.handlers[Types.Messages.POISONED] = this.receivePoisoned;
        this.handlers[Types.Messages.CURSED] = this.receiveCursed;
        this.handlers[Types.Messages.TAUNT] = this.receiveTaunt;
        this.handlers[Types.Messages.GOLD.INVENTORY] = this.receiveGold;
        this.handlers[Types.Messages.GOLD.STASH] = this.receiveGoldStash;
        this.handlers[Types.Messages.GOLD.TRADE] = this.receiveGoldTrade;
        this.handlers[Types.Messages.GOLD.TRADE2] = this.receiveGoldTrade2;
        this.handlers[Types.Messages.GOLD.BANK] = this.receiveGoldBank;
        this.handlers[Types.Messages.GOLD.BANK_WITHDRAW] = this.receiveGoldBankWithdraw;
        this.handlers[Types.Messages.MERCHANT.SELL] = this.receiveMerchantSell;
        this.handlers[Types.Messages.MERCHANT.LOG] = this.receiveMerchantLog;
        this.handlers[Types.Messages.COIN] = this.receiveCoin;
        this.enable();
    }
    GameClient.prototype.enable = function () {
        this.isListening = true;
    };
    GameClient.prototype.disable = function () {
        this.isListening = false;
    };
    GameClient.prototype.connect = function (dispatcherMode) {
        var _this = this;
        var protocol = window.location.hostname === "localhost" ? "ws" : "wss";
        var port = window.location.hostname === "localhost" ? ":8000" : "";
        var url = protocol + "://" + this.host + port + "/";
        console.info("Trying to connect to server : " + url);
        this.connection = null;
        this.connection = io(url, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 3000,
            reconnectionAttempts: 5,
        });
        if (dispatcherMode) {
            this.connection.on("message", function (e) {
                var reply = JSON.parse(e.data);
                if (reply.status === "OK") {
                    _this.dispatched_callback(reply.host, reply.port);
                }
                else if (reply.status === "FULL") {
                    alert("BrowserQuest is currently at maximum player population. Please retry later.");
                }
                else {
                    alert("Unknown error while connecting to Nano BrowserQuest.");
                }
            });
        }
        else {
            this.connection.on("connection", function () {
                console.info("Connected to server " + _this.host + ":" + _this.port);
            });
            this.connection.on("message", function (e) {
                var _a, _b;
                if (e === "go") {
                    if (_this.connected_callback) {
                        _this.connected_callback();
                    }
                    return;
                }
                if (e === "timeout") {
                    _this.isTimeout = true;
                    return;
                }
                if (typeof e === "string" && e.includes("banned")) {
                    try {
                        var _c = JSON.parse(e), admin = _c.admin, player = _c.player, error = _c.error, reason = _c.reason, message = _c.message, ip = _c.ip, until = _c.until;
                        (_a = _this.fail_callback) === null || _a === void 0 ? void 0 : _a.call(_this, { admin: admin, player: player, error: error, reason: reason, until: until, message: message, ip: ip });
                    }
                    catch (err) { }
                }
                if (e === "invalidlogin" ||
                    e === "userexists" ||
                    e === "loggedin" ||
                    e === "invalidconnection" ||
                    e === "passwordcreate" ||
                    e === "passwordlogin" ||
                    e === "passwordinvalid" ||
                    e === "invalidusername" ||
                    e === "invalidusernameCreation") {
                    (_b = _this.fail_callback) === null || _b === void 0 ? void 0 : _b.call(_this, { reason: e });
                    return;
                }
                if (e === "messagetoplayer") {
                }
                _this.receiveMessage(e);
            });
            this.connection.on("error", function (err) {
                var _a;
                console.error(err);
                $("#container").addClass("error");
                (_a = _this.disconnected_callback) === null || _a === void 0 ? void 0 : _a.call(_this, "The connection to Nano BrowserQuest has been lost");
            });
            this.connection.io.off("reconnect_attempt").on("reconnect_attempt", function (attempt) {
                console.info("Reconnect failed, attempt ".concat(attempt));
                if (attempt > 5) {
                    _this.connection.disconnect();
                }
            });
            this.connection.io.on("reconnect", function () {
            });
            this.connection.on("disconnect", function (reason) {
                var _a;
                console.info("Connection closed, ".concat(reason));
                var disconnectMessage = "An error occured";
                if (reason === "transport close") {
                    disconnectMessage = "The connection to Nano BrowserQuest has been lost";
                }
                else if (_this.isTimeout) {
                    disconnectMessage = "You have been disconnected for being inactive for too long";
                }
                if (disconnectMessage) {
                    $("#container").addClass("error");
                    (_a = _this.disconnected_callback) === null || _a === void 0 ? void 0 : _a.call(_this, disconnectMessage);
                    _this.connection.disconnect();
                }
            });
        }
    };
    GameClient.prototype.signMessage = function (message, secret) {
        return this.someHashFunction(message, secret);
    };
    GameClient.prototype.someHashFunction = function (message, secret) {
        var encodedMsg = CryptoJS.AES.encrypt(JSON.stringify(message), secret).toString();
        return encodedMsg;
    };
    GameClient.prototype.sendMessage = function (json) {
        if (this.connection.connected === true) {
            var secret = "f4c10471-09cb-49e6-a816-7510677926bc";
            var sentmessage = {
                action: json[0],
                message: json[1],
                params: [json[1], json[2], json[3], json[4], json[5]],
            };
            var encryptedMessage = this.signMessage(sentmessage, secret);
            this.connection.send(encryptedMessage);
        }
    };
    GameClient.prototype.receiveMessage = function (message) {
        if (this.isListening) {
            if (message instanceof Array) {
                if (message[0] instanceof Array) {
                    this.receiveActionBatch(message);
                }
                else {
                    this.receiveAction(message);
                }
            }
            else if (message && message.type) {
                this.receiveAction(message);
            }
        }
    };
    GameClient.prototype.receiveAction = function (data) {
        var action = data instanceof Array ? data[0] : data.type;
        if (this.handlers[action] && _.isFunction(this.handlers[action])) {
            this.handlers[action].call(this, data);
        }
        else {
            console.error("Unknown action : " + action);
        }
    };
    GameClient.prototype.receiveActionBatch = function (actions) {
        var self = this;
        _.each(actions, function (action) {
            self.receiveAction(action);
        });
    };
    GameClient.prototype.receiveWelcome = function (data) {
        var _a;
        (_a = this.welcome_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveAccount = function (data) {
        var _a;
        (_a = this.account_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveMove = function (data) {
        var id = data[1], x = data[2], y = data[3];
        if (this.move_callback) {
            this.move_callback(id, x, y);
        }
    };
    GameClient.prototype.receiveLootMove = function (data) {
        var id = data[1], item = data[2];
        if (this.lootmove_callback) {
            this.lootmove_callback(id, item);
        }
    };
    GameClient.prototype.receiveAttack = function (data) {
        var attacker = data[1];
        var target = data[2];
        if (this.attack_callback) {
            this.attack_callback(attacker, target);
        }
    };
    GameClient.prototype.receiveRaise = function (data) {
        var mobId = data[1];
        var targetId = data[2];
        if (this.raise_callback) {
            this.raise_callback(mobId, targetId);
        }
    };
    GameClient.prototype.receiveUnraise = function (data) {
        var mobId = data[1];
        if (this.unraise_callback) {
            this.unraise_callback(mobId);
        }
    };
    GameClient.prototype.receiveDrop = function (data) {
        var _a;
        var _b = data[1], mobId = _b.mobId, itemId = _b.itemId, kind = _b.kind, mobHateList = _b.mobHateList, partyId = _b.partyId, amount = _b.amount, skin = _b.skin;
        try {
            var item = EntityFactory.createEntity({ kind: kind, id: itemId, skin: skin });
            item.wasDropped = true;
            item.playersInvolved = mobHateList;
            item.partyId = partyId;
            if ([Types.Entities.GOLD, Types.Entities.NANOCOIN, Types.Entities.BANANOCOIN].includes(item.kind)) {
                item.amount = amount;
            }
            (_a = this.drop_callback) === null || _a === void 0 ? void 0 : _a.call(this, item, mobId);
        }
        catch (err) {
            Sentry.captureException(err, { extra: data[1] });
        }
    };
    GameClient.prototype.receiveSpawn = function (data) {
        var _a, _b, _c, _d;
        var _e = data[1], id = _e.id, kind = _e.kind, x = _e.x, y = _e.y, orientation = _e.orientation, isPet = _e.isPet;
        if (Types.isSpell(kind)) {
            var spell = EntityFactory.createEntity({ kind: kind, id: id });
            var _f = data[1], originX = _f.originX, originY = _f.originY, element = _f.element, casterId = _f.casterId, targetId = _f.targetId, _g = _f.isRaise2, isRaise2 = _g === void 0 ? false : _g;
            spell.casterId = casterId;
            spell.targetId = targetId;
            (_a = this.spawn_spell_callback) === null || _a === void 0 ? void 0 : _a.call(this, spell, x, y, orientation, originX, originY, element, casterId, targetId, isRaise2);
        }
        else if (Types.isItem(kind) && !isPet) {
            var _h = data[1], mobHateList = _h.mobHateList, partyId = _h.partyId, amount = _h.amount, skin = _h.skin;
            var item_1 = EntityFactory.createEntity({ kind: kind, id: id, skin: skin });
            item_1.wasDropped = false;
            item_1.playersInvolved = mobHateList;
            item_1.partyId = partyId;
            if ([Types.Entities.GOLD, Types.Entities.NANOCOIN, Types.Entities.BANANOCOIN].includes(item_1.kind)) {
                item_1.amount = amount;
                item_1.skin = skin;
            }
            (_b = this.spawn_item_callback) === null || _b === void 0 ? void 0 : _b.call(this, item_1, x, y);
        }
        else if (Types.isStaticChest(kind)) {
            var item = EntityFactory.createEntity({ kind: kind, id: id });
            (_c = this.spawn_chest_callback) === null || _c === void 0 ? void 0 : _c.call(this, item, x, y);
        }
        else {
            (_d = this.spawn_character_callback) === null || _d === void 0 ? void 0 : _d.call(this, data[1]);
        }
    };
    GameClient.prototype.receiveDespawn = function (data) {
        var _a;
        var id = data[1];
        (_a = this.despawn_callback) === null || _a === void 0 ? void 0 : _a.call(this, id);
    };
    GameClient.prototype.receiveHealth = function (data) {
        var _a;
        (_a = this.health_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveHealthEntity = function (data) {
        var _a;
        (_a = this.healthentity_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveChat = function (data) {
        var entityId = data[1];
        var name = data[2];
        var message = data[3];
        var type = data[4];
        var deductedGold = data[5];
        if (this.chat_callback) {
            this.chat_callback({ entityId: entityId, name: name, message: message, type: type, deductedGold: deductedGold });
        }
    };
    GameClient.prototype.receiveEquipItem = function (data) {
        var _a;
        var id = data[1];
        var item = data[2];
        (_a = this.equip_callback) === null || _a === void 0 ? void 0 : _a.call(this, __assign({ id: id }, item));
    };
    GameClient.prototype.receiveAuras = function (data) {
        var id = data[1];
        var auras = data[2];
        if (this.auras_callback) {
            this.auras_callback(id, auras);
        }
    };
    GameClient.prototype.receiveSkill = function (data) {
        var id = data[1];
        var skill = data[2];
        if (this.skill_callback) {
            this.skill_callback({ id: id, skill: skill });
        }
    };
    GameClient.prototype.receiveTeleport = function (data) {
        var id = data[1], x = data[2], y = data[3];
        if (this.teleport_callback) {
            this.teleport_callback(id, x, y);
        }
    };
    GameClient.prototype.receiveDamage = function (data) {
        var id = data[1];
        var dmg = data[2];
        var hp = parseInt(data[3]);
        var maxHitPoints = parseInt(data[4]);
        var isCritical = data[5];
        var isBlocked = data[6];
        if (this.dmg_callback) {
            this.dmg_callback({ id: id, dmg: dmg, hp: hp, maxHitPoints: maxHitPoints, isCritical: isCritical, isBlocked: isBlocked });
        }
    };
    GameClient.prototype.receivePopulation = function (data) {
        var players = data[1];
        var levelupPlayer = data[2];
        if (this.population_callback) {
            this.population_callback(players, levelupPlayer);
        }
    };
    GameClient.prototype.receiveKill = function (data) {
        var _a;
        (_a = this.kill_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveList = function (data) {
        var _a;
        data.shift();
        (_a = this.list_callback) === null || _a === void 0 ? void 0 : _a.call(this, data);
    };
    GameClient.prototype.receiveDestroy = function (data) {
        var _a;
        var id = data[1];
        (_a = this.destroy_callback) === null || _a === void 0 ? void 0 : _a.call(this, id);
    };
    GameClient.prototype.receiveStats = function (data) {
        var _a;
        var stats = data[1];
        (_a = this.stats_callback) === null || _a === void 0 ? void 0 : _a.call(this, stats);
    };
    GameClient.prototype.receiveSettings = function (data) {
        var _a;
        var playerId = data[1];
        var settings = data[2];
        (_a = this.settings_callback) === null || _a === void 0 ? void 0 : _a.call(this, { playerId: playerId, settings: settings });
    };
    GameClient.prototype.receiveSetBonus = function (data) {
        var bonus = data[1];
        if (this.setbonus_callback) {
            this.setbonus_callback(bonus);
        }
    };
    GameClient.prototype.receiveBlink = function (data) {
        var id = data[1];
        if (this.blink_callback) {
            this.blink_callback(id);
        }
    };
    GameClient.prototype.receiveParty = function (data) {
        if (data[1] === Types.Messages.PARTY_ACTIONS.CREATE && this.partycreate_callback) {
            this.partycreate_callback();
        }
        else if (data[1] === Types.Messages.PARTY_ACTIONS.JOIN && this.partyjoin_callback) {
            this.partyjoin_callback(data[2]);
        }
        else if (data[1] === Types.Messages.PARTY_ACTIONS.REFUSE && this.partyrefuse_callback) {
            this.partyrefuse_callback(data[2]);
        }
        else if (data[1] === Types.Messages.PARTY_ACTIONS.INVITE && this.partyinvite_callback) {
            this.partyinvite_callback(data[2]);
        }
        else if (data[1] === Types.Messages.PARTY_ACTIONS.DELETE_INVITE && this.partydeleteinvite_callback) {
            this.partydeleteinvite_callback(data[2]);
        }
        else if (data[1] === Types.Messages.PARTY_ACTIONS.LEAVE && this.partyleave_callback) {
            this.partyleave_callback(data[2]);
        }
        else if (data[1] === Types.Messages.PARTY_ACTIONS.DISBAND && this.partydisband_callback) {
            this.partydisband_callback(data[2]);
        }
        else if (data[1] === Types.Messages.PARTY_ACTIONS.INFO && this.partyinfo_callback) {
            this.partyinfo_callback(data[2]);
        }
        else if (data[1] === Types.Messages.PARTY_ACTIONS.ERROR && this.partyerror_callback) {
            this.partyerror_callback(data[2]);
        }
        else if (data[1] === Types.Messages.PARTY_ACTIONS.LOOT && this.partyloot_callback) {
            this.partyloot_callback(data[2]);
        }
        else if (data[1] === Types.Messages.PARTY_ACTIONS.HEALTH && this.partyhealth_callback) {
            this.partyhealth_callback(data[2]);
        }
    };
    GameClient.prototype.receiveSoulStone = function (data) {
        var _a;
        (_a = this.soulstone_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveTrade = function (data) {
        if (data[1] === Types.Messages.TRADE_ACTIONS.REQUEST_SEND && this.traderequestsend_callback) {
            this.traderequestsend_callback(data[2]);
        }
        else if (data[1] === Types.Messages.TRADE_ACTIONS.REQUEST_RECEIVE && this.traderequestreceive_callback) {
            this.traderequestreceive_callback(data[2]);
        }
        else if (data[1] === Types.Messages.TRADE_ACTIONS.START && this.tradestart_callback) {
            this.tradestart_callback(data[2]);
        }
        else if (data[1] === Types.Messages.TRADE_ACTIONS.CLOSE && this.tradeclose_callback) {
            this.tradeclose_callback(data[2]);
        }
        else if (data[1] === Types.Messages.TRADE_ACTIONS.INFO && this.tradeinfo_callback) {
            this.tradeinfo_callback(data[2]);
        }
        else if (data[1] === Types.Messages.TRADE_ACTIONS.ERROR && this.tradeerror_callback) {
            this.tradeerror_callback(data[2]);
        }
        else if (data[1] === Types.Messages.TRADE_ACTIONS.PLAYER1_MOVE_ITEM && this.tradeplayer1moveitem_callback) {
            this.tradeplayer1moveitem_callback(data[2]);
        }
        else if (data[1] === Types.Messages.TRADE_ACTIONS.PLAYER2_MOVE_ITEM && this.tradeplayer2moveitem_callback) {
            this.tradeplayer2moveitem_callback(data[2]);
        }
        else if (data[1] === Types.Messages.TRADE_ACTIONS.PLAYER1_STATUS && this.tradeplayer1status_callback) {
            this.tradeplayer1status_callback(data[2]);
        }
        else if (data[1] === Types.Messages.TRADE_ACTIONS.PLAYER2_STATUS && this.tradeplayer2status_callback) {
            this.tradeplayer2status_callback(data[2]);
        }
    };
    GameClient.prototype.receiveBossCheck = function (data) {
        var _a;
        (_a = this.bosscheck_callback) === null || _a === void 0 ? void 0 : _a.call(this, data);
    };
    GameClient.prototype.receiveDeathAngelCheck = function (data) {
        var _a;
        var coords = data[1];
        (_a = this.deathangelcheck_callback) === null || _a === void 0 ? void 0 : _a.call(this, coords);
    };
    GameClient.prototype.receiveStoneTeleportCheck = function (data) {
        var _a;
        var params = data[1];
        (_a = this.stoneteleportcheck_callback) === null || _a === void 0 ? void 0 : _a.call(this, params);
    };
    GameClient.prototype.receiveNotification = function (data) {
        var _a;
        (_a = this.receivenotification_callback) === null || _a === void 0 ? void 0 : _a.call(this, data);
    };
    GameClient.prototype.receiveInventory = function (data) {
        var _a;
        var inventory = data[1];
        (_a = this.receiveinventory_callback) === null || _a === void 0 ? void 0 : _a.call(this, inventory);
    };
    GameClient.prototype.receiveMerchantSell = function () {
        var _a;
        (_a = this.receivemerchantsell_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    GameClient.prototype.receiveMerchantLog = function (data) {
        var _a;
        var log = data[1];
        (_a = this.receivemerchantlog_callback) === null || _a === void 0 ? void 0 : _a.call(this, log);
    };
    GameClient.prototype.receiveStash = function (data) {
        var _a;
        var stash = data[1];
        (_a = this.receivestash_callback) === null || _a === void 0 ? void 0 : _a.call(this, stash);
    };
    GameClient.prototype.receiveUpgrade = function (data) {
        var upgrade = data[1];
        var _a = data[2] || {}, luckySlot = _a.luckySlot, isLucky7 = _a.isLucky7, isMagic8 = _a.isMagic8, isSuccess = _a.isSuccess, recipe = _a.recipe;
        if (this.receiveupgrade_callback) {
            this.receiveupgrade_callback(upgrade, { luckySlot: luckySlot, isLucky7: isLucky7, isMagic8: isMagic8, isSuccess: isSuccess, recipe: recipe });
        }
    };
    GameClient.prototype.receiveAnvilUpgrade = function (data) {
        var _a = data[1], isSuccess = _a.isSuccess, isTransmute = _a.isTransmute, isRuneword = _a.isRuneword, isChestblue = _a.isChestblue, isChestgreen = _a.isChestgreen, isChestpurple = _a.isChestpurple, isChristmasPresent = _a.isChristmasPresent, isChestdead = _a.isChestdead, isChestred = _a.isChestred;
        if (this.receiveanvilupgrade_callback) {
            this.receiveanvilupgrade_callback({
                isSuccess: isSuccess,
                isTransmute: isTransmute,
                isRuneword: isRuneword,
                isChestblue: isChestblue,
                isChestgreen: isChestgreen,
                isChestpurple: isChestpurple,
                isChristmasPresent: isChristmasPresent,
                isChestdead: isChestdead,
                isChestred: isChestred,
            });
        }
    };
    GameClient.prototype.receiveAnvilRecipe = function (data) {
        var recipe = data[1];
        if (this.receiveanvilrecipe_callback) {
            this.receiveanvilrecipe_callback(recipe);
        }
    };
    GameClient.prototype.receiveAnvilOdds = function (data) {
        var message = data[1];
        if (this.receiveanvilodds_callback) {
            this.receiveanvilodds_callback(message);
        }
    };
    GameClient.prototype.receiveStoreItems = function (data) {
        var _a;
        var items = data[1];
        (_a = this.receivestoreitems_callback) === null || _a === void 0 ? void 0 : _a.call(this, items);
    };
    GameClient.prototype.receivePurchaseCompleted = function (data) {
        var _a;
        var payment = data[1];
        (_a = this.receivepurchasecompleted_callback) === null || _a === void 0 ? void 0 : _a.call(this, payment);
    };
    GameClient.prototype.receivePurchaseError = function (data) {
        var _a;
        var error = data[1];
        (_a = this.receivepurchaseerror_callback) === null || _a === void 0 ? void 0 : _a.call(this, error);
    };
    GameClient.prototype.receiveWaypointsUpdate = function (data) {
        var _a;
        var waypoints = data[1];
        (_a = this.receivewaypointsupdate_callback) === null || _a === void 0 ? void 0 : _a.call(this, waypoints);
    };
    GameClient.prototype.receiveCowLevelStart = function (data) {
        var _a;
        var x = data[1];
        var y = data[2];
        (_a = this.receivecowlevelstart_callback) === null || _a === void 0 ? void 0 : _a.call(this, { x: x, y: y });
    };
    GameClient.prototype.receiveCowLevelEnd = function (data) {
        var _a;
        var isCompleted = data[1];
        (_a = this.receivecowlevelend_callback) === null || _a === void 0 ? void 0 : _a.call(this, isCompleted);
    };
    GameClient.prototype.receiveMinotaurLevelStart = function () {
        var _a;
        (_a = this.receiveminotaurlevelstart_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    GameClient.prototype.receiveMinotaurLevelEnd = function () {
        var _a;
        (_a = this.receiveminotaurlevelend_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    GameClient.prototype.receiveChaliceLevelStart = function () {
        var _a;
        (_a = this.receivechalicelevelstart_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    GameClient.prototype.receiveChaliceLevelEnd = function (data) {
        var _a;
        var isCompleted = data[1];
        (_a = this.receivechalicelevelend_callback) === null || _a === void 0 ? void 0 : _a.call(this, isCompleted);
    };
    GameClient.prototype.receiveTempleLevelStart = function () {
        var _a;
        (_a = this.receivetemplelevelstart_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    GameClient.prototype.receiveTempleLevelEnd = function () {
        var _a;
        (_a = this.receivetemplelevelend_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    GameClient.prototype.receiveStoneLevelStart = function () {
        var _a;
        (_a = this.receivestonelevelstart_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    GameClient.prototype.receiveStoneLevelEnd = function () {
        var _a;
        (_a = this.receivestonelevelend_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    GameClient.prototype.receiveGatewayLevelStart = function () {
        var _a;
        (_a = this.receivegatewaylevelstart_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    GameClient.prototype.receiveGatewayLevelEnd = function () {
        var _a;
        (_a = this.receivegatewaylevelend_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    GameClient.prototype.receiveLevelInProgress = function (data) {
        var clock = data[1];
        var level = data[2];
        this.receivelevelinprogress_callback(clock, level);
    };
    GameClient.prototype.receiveFrozen = function (data) {
        var _a;
        var entityId = data[1];
        var duration = data[2];
        (_a = this.receivefrozen_callback) === null || _a === void 0 ? void 0 : _a.call(this, entityId, duration);
    };
    GameClient.prototype.receiveSlowed = function (data) {
        var _a;
        var entityId = data[1];
        var duration = data[2];
        (_a = this.receiveslowed_callback) === null || _a === void 0 ? void 0 : _a.call(this, entityId, duration);
    };
    GameClient.prototype.receivePoisoned = function (data) {
        var _a;
        var entityId = data[1];
        var duration = data[2];
        (_a = this.receivepoisoned_callback) === null || _a === void 0 ? void 0 : _a.call(this, entityId, duration);
    };
    GameClient.prototype.receiveCursed = function (data) {
        var _a;
        var entityId = data[1];
        var curseId = data[2];
        var duration = data[3];
        (_a = this.receivecursed_callback) === null || _a === void 0 ? void 0 : _a.call(this, entityId, curseId, duration);
    };
    GameClient.prototype.receiveTaunt = function (data) {
        var _a;
        var entityId = data[1];
        (_a = this.receivetaunt_callback) === null || _a === void 0 ? void 0 : _a.call(this, entityId);
    };
    GameClient.prototype.receiveGold = function (data) {
        var _a;
        (_a = this.receivegold_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveGoldStash = function (data) {
        var _a;
        (_a = this.receivegoldstash_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveGoldTrade = function (data) {
        var _a;
        (_a = this.receivegoldtrade_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveGoldTrade2 = function (data) {
        var _a;
        (_a = this.receivegoldtrade2_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveGoldBank = function (data) {
        var _a;
        (_a = this.receivegoldbank_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveGoldBankWithdraw = function (data) {
        var _a;
        (_a = this.receivegoldbankwithdraw_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.receiveCoin = function (data) {
        var _a;
        (_a = this.receivecoin_callback) === null || _a === void 0 ? void 0 : _a.call(this, data[1]);
    };
    GameClient.prototype.onDispatched = function (callback) {
        this.dispatched_callback = callback;
    };
    GameClient.prototype.onConnected = function (callback) {
        this.connected_callback = callback;
    };
    GameClient.prototype.onDisconnected = function (callback) {
        this.disconnected_callback = callback;
    };
    GameClient.prototype.onWelcome = function (callback) {
        this.welcome_callback = callback;
    };
    GameClient.prototype.onAccount = function (callback) {
        this.account_callback = callback;
    };
    GameClient.prototype.onSpawnCharacter = function (callback) {
        this.spawn_character_callback = callback;
    };
    GameClient.prototype.onSpawnSpell = function (callback) {
        this.spawn_spell_callback = callback;
    };
    GameClient.prototype.onSpawnItem = function (callback) {
        this.spawn_item_callback = callback;
    };
    GameClient.prototype.onSpawnChest = function (callback) {
        this.spawn_chest_callback = callback;
    };
    GameClient.prototype.onDespawnEntity = function (callback) {
        this.despawn_callback = callback;
    };
    GameClient.prototype.onEntityMove = function (callback) {
        this.move_callback = callback;
    };
    GameClient.prototype.onEntityAttack = function (callback) {
        this.attack_callback = callback;
    };
    GameClient.prototype.onEntityRaise = function (callback) {
        this.raise_callback = callback;
    };
    GameClient.prototype.onEntityUnraise = function (callback) {
        this.unraise_callback = callback;
    };
    GameClient.prototype.onPlayerChangeHealth = function (callback) {
        this.health_callback = callback;
    };
    GameClient.prototype.onEntityChangeHealth = function (callback) {
        this.healthentity_callback = callback;
    };
    GameClient.prototype.onPlayerEquipItem = function (callback) {
        this.equip_callback = callback;
    };
    GameClient.prototype.onPlayerAuras = function (callback) {
        this.auras_callback = callback;
    };
    GameClient.prototype.onPlayerSkill = function (callback) {
        this.skill_callback = callback;
    };
    GameClient.prototype.onPlayerCurse = function (callback) {
        this.curse_callback = callback;
    };
    GameClient.prototype.onPlayerMoveToItem = function (callback) {
        this.lootmove_callback = callback;
    };
    GameClient.prototype.onPlayerTeleport = function (callback) {
        this.teleport_callback = callback;
    };
    GameClient.prototype.onChatMessage = function (callback) {
        this.chat_callback = callback;
    };
    GameClient.prototype.onDropItem = function (callback) {
        this.drop_callback = callback;
    };
    GameClient.prototype.onPlayerDamageMob = function (callback) {
        this.dmg_callback = callback;
    };
    GameClient.prototype.onPlayerKillMob = function (callback) {
        this.kill_callback = callback;
    };
    GameClient.prototype.onPopulationChange = function (callback) {
        this.population_callback = callback;
    };
    GameClient.prototype.onEntityList = function (callback) {
        this.list_callback = callback;
    };
    GameClient.prototype.onEntityDestroy = function (callback) {
        this.destroy_callback = callback;
    };
    GameClient.prototype.onPlayerChangeStats = function (callback) {
        this.stats_callback = callback;
    };
    GameClient.prototype.onPlayerSettings = function (callback) {
        this.settings_callback = callback;
    };
    GameClient.prototype.onSetBonus = function (callback) {
        this.setbonus_callback = callback;
    };
    GameClient.prototype.onItemBlink = function (callback) {
        this.blink_callback = callback;
    };
    GameClient.prototype.onPartyCreate = function (callback) {
        this.partycreate_callback = callback;
    };
    GameClient.prototype.onPartyJoin = function (callback) {
        this.partyjoin_callback = callback;
    };
    GameClient.prototype.onPartyRefuse = function (callback) {
        this.partyrefuse_callback = callback;
    };
    GameClient.prototype.onPartyInvite = function (callback) {
        this.partyinvite_callback = callback;
    };
    GameClient.prototype.onPartyDeleteInvite = function (callback) {
        this.partydeleteinvite_callback = callback;
    };
    GameClient.prototype.onPartyLeave = function (callback) {
        this.partyleave_callback = callback;
    };
    GameClient.prototype.onPartyDisband = function (callback) {
        this.partydisband_callback = callback;
    };
    GameClient.prototype.onPartyInfo = function (callback) {
        this.partyinfo_callback = callback;
    };
    GameClient.prototype.onPartyError = function (callback) {
        this.partyerror_callback = callback;
    };
    GameClient.prototype.onPartyLoot = function (callback) {
        this.partyloot_callback = callback;
    };
    GameClient.prototype.onPartyHealth = function (callback) {
        this.partyhealth_callback = callback;
    };
    GameClient.prototype.onSoulStone = function (callback) {
        this.soulstone_callback = callback;
    };
    GameClient.prototype.onTradeRequestSend = function (callback) {
        this.traderequestsend_callback = callback;
    };
    GameClient.prototype.onTradeRequestReceive = function (callback) {
        this.traderequestreceive_callback = callback;
    };
    GameClient.prototype.onTradeStart = function (callback) {
        this.tradestart_callback = callback;
    };
    GameClient.prototype.onTradeClose = function (callback) {
        this.tradeclose_callback = callback;
    };
    GameClient.prototype.onTradeInfo = function (callback) {
        this.tradeinfo_callback = callback;
    };
    GameClient.prototype.onTradeError = function (callback) {
        this.tradeerror_callback = callback;
    };
    GameClient.prototype.onPlayer1MoveItem = function (callback) {
        this.tradeplayer1moveitem_callback = callback;
    };
    GameClient.prototype.onPlayer2MoveItem = function (callback) {
        this.tradeplayer2moveitem_callback = callback;
    };
    GameClient.prototype.onPlayer1Status = function (callback) {
        this.tradeplayer1status_callback = callback;
    };
    GameClient.prototype.onPlayer2Status = function (callback) {
        this.tradeplayer2status_callback = callback;
    };
    GameClient.prototype.onBossCheck = function (callback) {
        this.bosscheck_callback = callback;
    };
    GameClient.prototype.onDeathAngelCheck = function (callback) {
        this.deathangelcheck_callback = callback;
    };
    GameClient.prototype.onStoneTeleportCheck = function (callback) {
        this.stoneteleportcheck_callback = callback;
    };
    GameClient.prototype.onReceiveNotification = function (callback) {
        this.receivenotification_callback = callback;
    };
    GameClient.prototype.onReceiveInventory = function (callback) {
        this.receiveinventory_callback = callback;
    };
    GameClient.prototype.onReceiveMerchantSell = function (callback) {
        this.receivemerchantsell_callback = callback;
    };
    GameClient.prototype.onReceiveMerchantLog = function (callback) {
        this.receivemerchantlog_callback = callback;
    };
    GameClient.prototype.onReceiveStash = function (callback) {
        this.receivestash_callback = callback;
    };
    GameClient.prototype.onReceiveUpgrade = function (callback) {
        this.receiveupgrade_callback = callback;
    };
    GameClient.prototype.onReceiveAnvilUpgrade = function (callback) {
        this.receiveanvilupgrade_callback = callback;
    };
    GameClient.prototype.onReceiveAnvilRecipe = function (callback) {
        this.receiveanvilrecipe_callback = callback;
    };
    GameClient.prototype.onReceiveAnvilOdds = function (callback) {
        this.receiveanvilodds_callback = callback;
    };
    GameClient.prototype.onReceiveStoreItems = function (callback) {
        this.receivestoreitems_callback = callback;
    };
    GameClient.prototype.onReceivePurchaseCompleted = function (callback) {
        this.receivepurchasecompleted_callback = callback;
    };
    GameClient.prototype.onReceivePurchaseError = function (callback) {
        this.receivepurchaseerror_callback = callback;
    };
    GameClient.prototype.onReceiveWaypointsUpdate = function (callback) {
        this.receivewaypointsupdate_callback = callback;
    };
    GameClient.prototype.onReceiveCowLevelStart = function (callback) {
        this.receivecowlevelstart_callback = callback;
    };
    GameClient.prototype.onReceiveCowLevelEnd = function (callback) {
        this.receivecowlevelend_callback = callback;
    };
    GameClient.prototype.onReceiveMinotaurLevelStart = function (callback) {
        this.receiveminotaurlevelstart_callback = callback;
    };
    GameClient.prototype.onReceiveMinotaurLevelEnd = function (callback) {
        this.receiveminotaurlevelend_callback = callback;
    };
    GameClient.prototype.onReceiveChaliceLevelStart = function (callback) {
        this.receivechalicelevelstart_callback = callback;
    };
    GameClient.prototype.onReceiveChaliceLevelEnd = function (callback) {
        this.receivechalicelevelend_callback = callback;
    };
    GameClient.prototype.onReceiveTempleLevelStart = function (callback) {
        this.receivetemplelevelstart_callback = callback;
    };
    GameClient.prototype.onReceiveTempleLevelEnd = function (callback) {
        this.receivetemplelevelend_callback = callback;
    };
    GameClient.prototype.onReceiveStoneLevelStart = function (callback) {
        this.receivestonelevelstart_callback = callback;
    };
    GameClient.prototype.onReceiveStoneLevelEnd = function (callback) {
        this.receivestonelevelend_callback = callback;
    };
    GameClient.prototype.onReceiveGatewayLevelStart = function (callback) {
        this.receivegatewaylevelstart_callback = callback;
    };
    GameClient.prototype.onReceiveGatewayLevelEnd = function (callback) {
        this.receivegatewaylevelend_callback = callback;
    };
    GameClient.prototype.onReceiveLevelInProgress = function (callback) {
        this.receivelevelinprogress_callback = callback;
    };
    GameClient.prototype.onFrozen = function (callback) {
        this.receivefrozen_callback = callback;
    };
    GameClient.prototype.onSlowed = function (callback) {
        this.receiveslowed_callback = callback;
    };
    GameClient.prototype.onPoisoned = function (callback) {
        this.receivepoisoned_callback = callback;
    };
    GameClient.prototype.onCursed = function (callback) {
        this.receivecursed_callback = callback;
    };
    GameClient.prototype.onTaunt = function (callback) {
        this.receivetaunt_callback = callback;
    };
    GameClient.prototype.onReceiveGold = function (callback) {
        this.receivegold_callback = callback;
    };
    GameClient.prototype.onReceiveGoldStash = function (callback) {
        this.receivegoldstash_callback = callback;
    };
    GameClient.prototype.onReceiveGoldTrade = function (callback) {
        this.receivegoldtrade_callback = callback;
    };
    GameClient.prototype.onReceiveGoldTrade2 = function (callback) {
        this.receivegoldtrade2_callback = callback;
    };
    GameClient.prototype.onReceiveGoldBank = function (callback) {
        this.receivegoldbank_callback = callback;
    };
    GameClient.prototype.onReceiveGoldBankWithdraw = function (callback) {
        this.receivegoldbankwithdraw_callback = callback;
    };
    GameClient.prototype.onReceiveCoin = function (callback) {
        this.receivecoin_callback = callback;
    };
    GameClient.prototype.sendCreate = function (_a) {
        var name = _a.name, _b = _a.account, account = _b === void 0 ? "" : _b, _c = _a.password, password = _c === void 0 ? "" : _c;
        this.sendMessage([Types.Messages.CREATE, name, account, password]);
    };
    GameClient.prototype.sendLogin = function (_a) {
        var name = _a.name, _b = _a.account, account = _b === void 0 ? "" : _b, _c = _a.password, password = _c === void 0 ? "" : _c;
        this.sendMessage([Types.Messages.LOGIN, name, account, password]);
    };
    GameClient.prototype.sendAccount = function (account) {
        this.sendMessage([Types.Messages.ACCOUNT, account]);
    };
    GameClient.prototype.sendMove = function (x, y) {
        this.sendMessage([Types.Messages.MOVE, x, y]);
    };
    GameClient.prototype.sendMovePet = function (x, y) {
        this.sendMessage([Types.Messages.MOVE_PET, x, y]);
    };
    GameClient.prototype.sendLootMove = function (item, x, y) {
        this.sendMessage([Types.Messages.LOOTMOVE, x, y, item.id]);
    };
    GameClient.prototype.sendAggro = function (mob) {
        this.sendMessage([Types.Messages.AGGRO, mob.id]);
    };
    GameClient.prototype.sendAttack = function (mob) {
        this.sendMessage([Types.Messages.ATTACK, mob.id]);
    };
    GameClient.prototype.sendHit = function (mob) {
        this.sendMessage([Types.Messages.HIT, mob.id]);
    };
    GameClient.prototype.sendHurt = function (mob) {
        this.sendMessage([Types.Messages.HURT, mob.id]);
    };
    GameClient.prototype.sendHurtSpell = function (spell) {
        this.sendMessage([Types.Messages.HURT_SPELL, spell.id]);
    };
    GameClient.prototype.sendHurtTrap = function (trap) {
        this.sendMessage([Types.Messages.HURT_TRAP, trap.id]);
    };
    GameClient.prototype.sendChat = function (text) {
        this.sendMessage([Types.Messages.CHAT, text]);
    };
    GameClient.prototype.sendLoot = function (item) {
        this.sendMessage([Types.Messages.LOOT, item.id]);
    };
    GameClient.prototype.sendTeleport = function (x, y, orientation) {
        this.sendMessage([Types.Messages.TELEPORT, x, y, orientation]);
    };
    GameClient.prototype.sendStoneTeleport = function (playerId) {
        this.sendMessage([Types.Messages.STONETELEPORT, playerId]);
    };
    GameClient.prototype.sendZone = function () {
        this.sendMessage([Types.Messages.ZONE]);
    };
    GameClient.prototype.sendOpen = function (chest) {
        this.sendMessage([Types.Messages.OPEN, chest.id]);
    };
    GameClient.prototype.sendCheck = function (id) {
        this.sendMessage([Types.Messages.CHECK, id]);
    };
    GameClient.prototype.sendCheckStorage = function () {
        this.sendMessage([Types.Messages.CHECK_STORAGE]);
    };
    GameClient.prototype.sendWho = function (ids) {
        this.sendMessage([Types.Messages.WHO, __spreadArray([], ids, true)]);
    };
    GameClient.prototype.sendAchievement = function (id) {
        this.sendMessage([Types.Messages.ACHIEVEMENT, id, "found"]);
    };
    GameClient.prototype.sendWaypoint = function (id) {
        this.sendMessage([Types.Messages.WAYPOINT, id, "found"]);
    };
    GameClient.prototype.sendBossCheck = function (again) {
        this.sendMessage([Types.Messages.BOSS_CHECK, again]);
    };
    GameClient.prototype.sendPartyCreate = function () {
        this.sendMessage([Types.Messages.PARTY, Types.Messages.PARTY_ACTIONS.CREATE]);
    };
    GameClient.prototype.sendPartyJoin = function (partyId) {
        this.sendMessage([Types.Messages.PARTY, Types.Messages.PARTY_ACTIONS.JOIN, partyId]);
    };
    GameClient.prototype.sendPartyRefuse = function (partyId) {
        this.sendMessage([Types.Messages.PARTY, Types.Messages.PARTY_ACTIONS.REFUSE, partyId]);
    };
    GameClient.prototype.sendPartyInvite = function (playerName) {
        this.sendMessage([Types.Messages.PARTY, Types.Messages.PARTY_ACTIONS.INVITE, playerName]);
    };
    GameClient.prototype.sendPartyLeave = function () {
        this.sendMessage([Types.Messages.PARTY, Types.Messages.PARTY_ACTIONS.LEAVE]);
    };
    GameClient.prototype.sendPartyRemove = function (playerName) {
        this.sendMessage([Types.Messages.PARTY, Types.Messages.PARTY_ACTIONS.REMOVE, playerName]);
    };
    GameClient.prototype.sendPartyDisband = function () {
        this.sendMessage([Types.Messages.PARTY, Types.Messages.PARTY_ACTIONS.DISBAND]);
    };
    GameClient.prototype.sendTradeRequest = function (playerName) {
        this.sendMessage([Types.Messages.TRADE, Types.Messages.TRADE_ACTIONS.REQUEST_SEND, playerName]);
    };
    GameClient.prototype.sendTradeRequestAccept = function (playerName) {
        this.sendMessage([Types.Messages.TRADE, Types.Messages.TRADE_ACTIONS.REQUEST_ACCEPT, playerName]);
    };
    GameClient.prototype.sendTradeRequestRefuse = function (playerName) {
        this.sendMessage([Types.Messages.TRADE, Types.Messages.TRADE_ACTIONS.REQUEST_REFUSE, playerName]);
    };
    GameClient.prototype.sendTradeClose = function () {
        this.sendMessage([Types.Messages.TRADE, Types.Messages.TRADE_ACTIONS.CLOSE]);
    };
    GameClient.prototype.sendTradePlayer1Status = function (isAccepted) {
        this.sendMessage([Types.Messages.TRADE, Types.Messages.TRADE_ACTIONS.PLAYER1_STATUS, isAccepted]);
    };
    GameClient.prototype.sendBanPlayer = function (message) {
        this.sendMessage([Types.Messages.BAN_PLAYER, message]);
    };
    GameClient.prototype.sendManualBanPlayer = function (params) {
        this.sendMessage([Types.Messages.MANUAL_BAN_PLAYER, params]);
    };
    GameClient.prototype.sendRequestPayout = function (kind) {
        this.sendMessage([Types.Messages.REQUEST_PAYOUT, kind]);
    };
    GameClient.prototype.sendMoveItem = function (fromSlot, toSlot, quantity) {
        this.sendMessage([Types.Messages.MOVE_ITEM, fromSlot, toSlot, quantity]);
    };
    GameClient.prototype.sendMoveItemsToInventory = function (panel) {
        this.sendMessage([Types.Messages.MOVE_ITEMS_TO_INVENTORY, panel]);
    };
    GameClient.prototype.sendUpgradeItem = function () {
        this.sendMessage([Types.Messages.UPGRADE_ITEM]);
    };
    GameClient.prototype.sendStoreItems = function () {
        this.sendMessage([Types.Messages.STORE_ITEMS]);
    };
    GameClient.prototype.sendPurchaseCreate = function (id, account) {
        this.sendMessage([Types.Messages.PURCHASE_CREATE, id, account]);
    };
    GameClient.prototype.sendPurchaseCancel = function () {
        this.sendMessage([Types.Messages.PURCHASE_CANCEL]);
    };
    GameClient.prototype.sendSettings = function (settings) {
        this.sendMessage([Types.Messages.SETTINGS, settings]);
    };
    GameClient.prototype.sendSkill = function (slot, mobId) {
        this.sendMessage([Types.Messages.SKILL, slot, mobId]);
    };
    GameClient.prototype.sendCastSpell = function (mobId, x, y, targetId, isRaise2) {
        if (targetId === void 0) { targetId = 0; }
        if (isRaise2 === void 0) { isRaise2 = false; }
        this.sendMessage([Types.Messages.CAST_SPELL, mobId, x, y, targetId, isRaise2]);
    };
    GameClient.prototype.sendMagicStone = function (id) {
        this.sendMessage([Types.Messages.MAGICSTONE, id]);
    };
    GameClient.prototype.sendLever = function (id) {
        this.sendMessage([Types.Messages.LEVER, id]);
    };
    GameClient.prototype.sendAltarChalice = function (id) {
        this.sendMessage([Types.Messages.ALTARCHALICE, id]);
    };
    GameClient.prototype.sendAltarSoulStone = function (id) {
        this.sendMessage([Types.Messages.ALTARSOULSTONE, id]);
    };
    GameClient.prototype.sendFossil = function () {
        this.sendMessage([Types.Messages.FOSSIL]);
    };
    GameClient.prototype.sendHands = function (id) {
        this.sendMessage([Types.Messages.HANDS, id]);
    };
    GameClient.prototype.sendActivateTrap = function (id) {
        this.sendMessage([Types.Messages.TRAP, id]);
    };
    GameClient.prototype.sendActivateStatue = function (id) {
        this.sendMessage([Types.Messages.STATUE, id]);
    };
    GameClient.prototype.sendMoveGold = function (amount, from, to) {
        this.sendMessage([Types.Messages.GOLD.MOVE, amount, from, to]);
    };
    GameClient.prototype.sendGoldBank = function (isIouExchange) {
        if (isIouExchange === void 0) { isIouExchange = false; }
        this.sendMessage([Types.Messages.GOLD.BANK, isIouExchange]);
    };
    GameClient.prototype.sendBuyFromMerchant = function (fromSlot, toSlot, quantity) {
        this.sendMessage([Types.Messages.MERCHANT.BUY, fromSlot, toSlot, quantity]);
    };
    GameClient.prototype.sendSellToMerchant = function (fromSlot, quantity) {
        this.sendMessage([Types.Messages.MERCHANT.SELL, fromSlot, quantity]);
    };
    GameClient.prototype.sendHash = function (hash) {
        this.sendMessage([Types.Messages.HASH, hash]);
    };
    GameClient.prototype.sendBan = function (params) {
        this.sendMessage([Types.Messages.BAN, params]);
    };
    return GameClient;
}());
export default GameClient;
