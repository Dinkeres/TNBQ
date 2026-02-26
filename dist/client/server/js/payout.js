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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import BigNumber from "bignumber.js";
import fetch from "node-fetch";
import { PromiseQueue } from "./promise-queue";
import { rpc } from "./rpc";
import { Sentry } from "./sentry";
var queue = new PromiseQueue();
var sender = "1questzx4ym4ncmswhz3r4upwrxosh1hnic8ry8sbh694r48ajq95d1ckpay";
var _a = process.env, PRIVATE_KEY = _a.PRIVATE_KEY, BPOW_USERNAME = _a.BPOW_USERNAME, BPOW_API_KEY = _a.BPOW_API_KEY, BPOW_DOMAIN = _a.BPOW_DOMAIN;
var getWorkFromService = function (hash) { return __awaiter(void 0, void 0, void 0, function () {
    var params, res, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    user: BPOW_USERNAME,
                    api_key: BPOW_API_KEY,
                    hash: hash,
                    timeout: 15,
                    difficulty: "fffffff800000000",
                };
                return [4, fetch(BPOW_DOMAIN, {
                        method: "POST",
                        body: JSON.stringify(params),
                    })];
            case 1:
                res = _a.sent();
                return [4, res.json()];
            case 2:
                json = _a.sent();
                return [2, json];
        }
    });
}); };
var enqueueSendPayout = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, queue.enqueue(function () { return sendPayout(params); })];
            case 1: return [2, _a.sent()];
        }
    });
}); };
var sendPayout = function (_a) {
    var receiver = _a.account, amount = _a.amount, network = _a.network, playerName = _a.playerName;
    return __awaiter(void 0, void 0, void 0, function () {
        var hash, work, accountInfo, frontier, representative, balance, err_1, blockCreate, process_1, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    if (!network) {
                        throw new Error("Invalid payout network");
                    }
                    return [4, rpc("account_info", { account: "".concat(network, "_").concat(sender), representative: "true" }, network)];
                case 1:
                    accountInfo = _b.sent();
                    frontier = accountInfo.frontier, representative = accountInfo.representative, balance = accountInfo.balance;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4, getWorkFromService(frontier)];
                case 3:
                    (work = (_b.sent()).work);
                    return [3, 5];
                case 4:
                    err_1 = _b.sent();
                    console.log("Bpow error", err_1);
                    return [3, 5];
                case 5: return [4, rpc("block_create", __assign({ json_block: true, type: "state", previous: frontier, account: "".concat(network, "_").concat(sender), representative: representative, balance: new BigNumber(balance).minus(amount).toFixed(), link: receiver, key: PRIVATE_KEY }, (work ? { work: work } : null)), network)];
                case 6:
                    blockCreate = _b.sent();
                    return [4, rpc("process", {
                            json_block: true,
                            subtype: "send",
                            block: blockCreate.block,
                        }, network)];
                case 7:
                    process_1 = _b.sent();
                    if (process_1.error) {
                        Sentry.captureException(new Error("Unable to process block"), {
                            extra: {
                                network: network,
                                process: process_1,
                                block: blockCreate,
                                player: playerName,
                            },
                        });
                    }
                    hash = process_1.hash;
                    return [3, 9];
                case 8:
                    err_2 = _b.sent();
                    return [2, {
                            message: "Unable to complete payout, try again later.",
                            err: err_2,
                        }];
                case 9: return [2, {
                        hash: hash,
                        message: "Payout sent!",
                    }];
            }
        });
    });
};
export { enqueueSendPayout };
