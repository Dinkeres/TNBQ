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
var _a;
import bcrypt from "bcrypt";
import * as NanocurrencyWeb from "nanocurrency-web";
import { kinds, Types } from "../../../shared/js/gametypes";
import { getGoldAmountFromSoldItem, merchantItems } from "../../../shared/js/gold";
import { GOLD_CAP } from "../../../shared/js/gold";
import { defaultSettings } from "../../../shared/js/settings";
import { INVENTORY_SLOT_COUNT, MERCHANT_SLOT_RANGE, Slot, STASH_SLOT_COUNT, STASH_SLOT_RANGE, TRADE_SLOT_COUNT, TRADE_SLOT_RANGE, UPGRADE_SLOT_COUNT, UPGRADE_SLOT_RANGE, } from "../../../shared/js/slots";
import { StoreItems } from "../../../shared/js/store";
import { ACHIEVEMENT_ANTIDOTE_INDEX, ACHIEVEMENT_ARCHMAGE_INDEX, ACHIEVEMENT_BLACKSMITH_INDEX, ACHIEVEMENT_BOO_INDEX, ACHIEVEMENT_BULLSEYE_INDEX, ACHIEVEMENT_COUNT, ACHIEVEMENT_CRYSTAL_INDEX, ACHIEVEMENT_CYCLOP_INDEX, ACHIEVEMENT_DISCORD_INDEX, ACHIEVEMENT_HERO_INDEX, ACHIEVEMENT_MINI_BOSS_INDEX, ACHIEVEMENT_NAMES, ACHIEVEMENT_NFT_INDEX, ACHIEVEMENT_SACRED_INDEX, ACHIEVEMENT_SPECTRAL_INDEX, ACHIEVEMENT_TEMPLAR_INDEX, ACHIEVEMENT_UNBREAKABLE_INDEX, ACHIEVEMENT_VIKING_INDEX, ACHIEVEMENT_WING_INDEX, } from "../../../shared/js/types/achievements";
import { getRunewordBonus } from "../../../shared/js/types/rune";
import { toArray, toBoolean, toDb, validateQuantity } from "../../../shared/js/utils";
import { isValidRecipe } from "../../../shared/js/utils";
import { discordClient, EmojiMap, postMessageToDiscordAnvilChannel, postMessageToDiscordEventChannel, postMessageToDiscordModeratorDebugChannel, postMessageToDiscordModeratorMerchantChannel, postMessageToDiscordPurchaseChannel, postMessageToDiscordWelcomeChannel, } from "../discord";
import Messages from "../message";
import { CHATBAN_PATTERNS } from "../player";
import { PromiseQueue } from "../promise-queue";
import { Sentry } from "../sentry";
import { generateBlueChestItem, generateChristmasPresentItem, generateDeadChestItem, generateGreenChestItem, generatePurpleChestItem, generateRandomPet, generateRedChestItem, getIsTransmuteSuccess, isUpgradeSuccess, isValidAddWeaponSkill, isValidDowngradeRune, isValidSocketItem, isValidSocketPetCollar, isValidStoneSocket, isValidTransmuteItems, isValidTransmutePet, isValidUpgradeElementItems, isValidUpgradeItems, isValidUpgradeRunes, isValidUpgradeskillrandom, NaN2Zero, randomInt, } from "../utils";
import { redisClient } from "./client";
export var DEPOSIT_SEED = (_a = process.env, _a.DEPOSIT_SEED), NODE_ENV = _a.NODE_ENV;
var GEM_COUNT = 5;
var ARTIFACT_COUNT = 4;
var queue = new PromiseQueue();
var getNewDepositAccountByIndex = function (index, network) { return __awaiter(void 0, void 0, void 0, function () {
    var depositAccount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                depositAccount = null;
                return [4, NanocurrencyWeb.wallet.legacyAccounts(DEPOSIT_SEED, index, index)[0].address];
            case 1:
                depositAccount = _a.sent();
                if (network === "ban") {
                    depositAccount = depositAccount.replace("nano_", "ban_");
                }
                return [2, depositAccount];
        }
    });
}); };
var DatabaseHandler = (function () {
    function DatabaseHandler() {
        this.client = redisClient;
    }
    DatabaseHandler.prototype.assignNewDepositAccount = function (player, network) {
        return __awaiter(this, void 0, void 0, function () {
            var userKey, _a, depositAccount, depositAccountIndex, isSuccess;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!player || player.depositAccount || player.depositAccountIndex || !network)
                            return [2];
                        userKey = "u:" + player.name;
                        return [4, this.client
                                .multi()
                                .hGet(userKey, "depositAccount")
                                .hGet(userKey, "depositAccountIndex")
                                .exec()];
                    case 1:
                        _a = _b.sent(), depositAccount = _a[0], depositAccountIndex = _a[1];
                        if (!depositAccount) {
                            Sentry.captureException(new Error("Unable to get deposit account"), { extra: { player: player.name } });
                            return [2];
                        }
                        if (depositAccount || depositAccountIndex)
                            return [2];
                        return [4, this.createDepositAccount()];
                    case 2:
                        depositAccountIndex = _b.sent();
                        return [4, getNewDepositAccountByIndex(depositAccountIndex, network)];
                    case 3:
                        depositAccount = _b.sent();
                        if (typeof depositAccountIndex !== "number" || !depositAccount) {
                            Sentry.captureException(new Error("Invalid deposit account when creating player"), {
                                extra: { depositAccountIndex: depositAccountIndex, depositAccount: depositAccount, player: player.name },
                            });
                            return [2];
                        }
                        return [4, this.client.hSet(userKey, "depositAccount", depositAccount)];
                    case 4:
                        isSuccess = _b.sent();
                        return [4, this.client.hSet("depositAccountIndex", depositAccountIndex)];
                    case 5:
                        _b.sent();
                        if (!isSuccess) {
                            Sentry.captureException(new Error("Unable to set new deposit account"), {
                                extra: { player: player.name },
                            });
                            return [2];
                        }
                        player.depositAccountIndex = depositAccountIndex;
                        player.depositAccount = depositAccount;
                        player.network = network;
                        return [2, { depositAccount: depositAccount, depositAccountIndex: depositAccountIndex }];
                }
            });
        });
    };
    DatabaseHandler.prototype.loadPlayer = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var userKey, _a, account, hash, exp, gold, goldStash, goldTrade, x, y, createdAt, achievement, inventory, stash, helm, armor, weapon, belt, cape, pet, shield, settings, ring1, ring2, amulet, nanoPotions, gems, artifact, upgrade, trade, expansion1, expansion2, waypoints, depositAccountIndex, depositAccount, network, discordId, dbSsettings, loggedInNetwork, _b, rawDepositAccount;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        userKey = "u:" + player.name;
                        console.log("~~~~~userKey", userKey);
                        return [4, this.client
                                .multi()
                                .hGet(userKey, "account")
                                .hGet(userKey, "hash")
                                .hGet(userKey, "exp")
                                .hGet(userKey, "gold")
                                .hGet(userKey, "goldStash")
                                .hGet(userKey, "goldTrade")
                                .hGet(userKey, "x")
                                .hGet(userKey, "y")
                                .hGet(userKey, "createdAt")
                                .hGet(userKey, "achievement")
                                .hGet(userKey, "inventory")
                                .hGet(userKey, "stash")
                                .hGet(userKey, "helm")
                                .hGet(userKey, "armor")
                                .hGet(userKey, "weapon")
                                .hGet(userKey, "belt")
                                .hGet(userKey, "cape")
                                .hGet(userKey, "pet")
                                .hGet(userKey, "shield")
                                .hGet(userKey, "settings")
                                .hGet(userKey, "ring1")
                                .hGet(userKey, "ring2")
                                .hGet(userKey, "amulet")
                                .hGet(userKey, "nanoPotions")
                                .hGet(userKey, "gems")
                                .hGet(userKey, "artifact")
                                .hGet(userKey, "upgrade")
                                .hGet(userKey, "trade")
                                .hGet(userKey, "expansion1")
                                .hGet(userKey, "expansion2")
                                .hGet(userKey, "waypoints")
                                .hGet(userKey, "depositAccount")
                                .hGet(userKey, "depositAccountIndex")
                                .hGet(userKey, "network")
                                .hGet(userKey, "discordId")
                                .exec()];
                    case 1:
                        _a = _d.sent(), account = _a[0], hash = _a[1], exp = _a[2], gold = _a[3], goldStash = _a[4], goldTrade = _a[5], x = _a[6], y = _a[7], createdAt = _a[8], achievement = _a[9], inventory = _a[10], stash = _a[11], helm = _a[12], armor = _a[13], weapon = _a[14], belt = _a[15], cape = _a[16], pet = _a[17], shield = _a[18], settings = _a[19], ring1 = _a[20], ring2 = _a[21], amulet = _a[22], nanoPotions = _a[23], gems = _a[24], artifact = _a[25], upgrade = _a[26], trade = _a[27], expansion1 = _a[28], expansion2 = _a[29], waypoints = _a[30], depositAccountIndex = _a[31], depositAccount = _a[32], network = _a[33], discordId = _a[34];
                        exp = NaN2Zero(exp);
                        gold = NaN2Zero(gold);
                        goldStash = NaN2Zero(goldStash);
                        goldTrade = NaN2Zero(goldTrade);
                        dbSsettings = settings;
                        settings = settings ? JSON.parse(settings) : defaultSettings;
                        if (!!dbSsettings) return [3, 3];
                        return [4, this.client.hSet(userKey, "settings", JSON.stringify(settings))];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        if (!(account && !network)) return [3, 5];
                        network = account.split("_")[0];
                        return [4, this.client.hSet(userKey, "network", network)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        if (!(depositAccount && ["nano", "ban"].includes(network))) return [3, 7];
                        return [4, this.assignNewDepositAccount(player, network)];
                    case 6:
                        (_c = _d.sent(), depositAccount = _c.depositAccount, depositAccountIndex = _c.depositAccountIndex);
                        _d.label = 7;
                    case 7:
                        loggedInNetwork = player.network;
                        if (loggedInNetwork &&
                            ["nano", "ban"].includes(loggedInNetwork) &&
                            depositAccount &&
                            !depositAccount.startsWith(loggedInNetwork)) {
                            _b = depositAccount.split("_"), rawDepositAccount = _b[1];
                            depositAccount = "".concat(loggedInNetwork, "_").concat(rawDepositAccount);
                        }
                        if (goldTrade) {
                            gold = gold + goldTrade;
                            goldTrade = 0;
                            if (gold > GOLD_CAP) {
                                gold = GOLD_CAP;
                            }
                            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~before!!!!");
                        }
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.info("Player name: " + player.name);
                        console.info("Armor: " + armor);
                        console.info("Weapon: " + weapon);
                        console.info("Experience: " + exp);
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
                        player.sendWelcome({
                            account: account,
                            hash: hash,
                            network: network,
                            helm: helm,
                            armor: armor,
                            weapon: weapon,
                            exp: exp,
                            createdAt: createdAt,
                            inventory: inventory,
                            stash: stash,
                            trade: trade,
                            upgrade: upgrade,
                            x: x,
                            y: y,
                            nanoPotions: nanoPotions,
                            gems: gems,
                            achievement: achievement,
                            ring1: ring1,
                            ring2: ring2,
                            amulet: amulet,
                            belt: belt,
                            cape: cape,
                            shield: shield,
                            pet: pet,
                            artifact: artifact,
                            expansion1: expansion1,
                            expansion2: expansion2,
                            gold: gold,
                            goldStash: goldStash,
                            goldTrade: goldTrade,
                            waypoints: waypoints,
                            depositAccount: depositAccount,
                            depositAccountIndex: depositAccountIndex,
                            settings: settings,
                            discordId: discordId,
                        });
                        console.log("~~~~redis~~~trade", trade);
                        console.log("~~~~redis~~~inventory", inventory);
                        console.log("~~~redis~~~~settings", settings);
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.validateCreatePlayer = function (player) {
        var MAX_PLAYER_CREATED_FOR_IP_BY_24H = 5;
        if (CHATBAN_PATTERNS.test(player.name)) {
            player.connection.sendUTF8("invalidusername");
            player.connection.close("User does not exist: " + player.name);
            postMessageToDiscordModeratorDebugChannel("Invalid player name for creation **".concat(player.name, "**"));
            return false;
        }
        if (!Array.isArray(player.server.maxPlayerCreateByIp[player.ip])) {
            player.server.maxPlayerCreateByIp[player.ip] = [];
        }
        if (player.server.maxPlayerCreateByIp[player.ip].length >= MAX_PLAYER_CREATED_FOR_IP_BY_24H) {
            player.connection.sendUTF8("invalidusernameCreation");
            postMessageToDiscordModeratorDebugChannel("more than **".concat(MAX_PLAYER_CREATED_FOR_IP_BY_24H, "**  players for same IP: **").concat(player.ip, "** created for 24h, Forbidden **").concat(player.name, "** ,Other characters are: ").concat(player.server.maxPlayerCreateByIp[player.ip].join(",")));
            return false;
        }
        else {
            player.server.maxPlayerCreateByIp[player.ip].push(player.name);
        }
        return true;
    };
    DatabaseHandler.prototype.createPlayer = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var userKey, curTime, depositAccountIndex, depositAccount, achievement, inventory, _a, account, hash, exp, gold, goldStash, goldTrade, x, y, ip, createdAt, stash, weapon, armor, helm, belt, cape, pet, shield, settings, ring1, ring2, amulet, nanoPotions, gems, artifact, upgrade, trade, expansion1, expansion2, waypoints, network;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userKey = "u:" + player.name;
                        curTime = new Date().getTime();
                        return [4, this.setDepositAccount()];
                    case 1:
                        _b.sent();
                        depositAccountIndex = null;
                        depositAccount = null;
                        if (!(player.account && player.network)) return [3, 4];
                        return [4, this.createDepositAccount()];
                    case 2:
                        depositAccountIndex = _b.sent();
                        return [4, getNewDepositAccountByIndex(depositAccountIndex, player.network)];
                    case 3:
                        depositAccount = _b.sent();
                        if (typeof depositAccountIndex !== "number" || !depositAccount) {
                            Sentry.captureException(new Error("Invalid deposit account when creating player"));
                            return [2];
                        }
                        _b.label = 4;
                    case 4:
                        if (!player.network) {
                            postMessageToDiscordWelcomeChannel("A new adventurer **".concat(player.name, "** has just arrived in our realm \uD83C\uDF89"));
                        }
                        else {
                            postMessageToDiscordWelcomeChannel("A new adventurer has just arrived in our realm. **".concat(player.name, "** has joined the ranks of **").concat(player.network === "nano" ? " Nano ".concat(EmojiMap.nbq) : " Banano ".concat(EmojiMap.bbq), "** \uD83C\uDF89"));
                        }
                        console.log("~~~~~~start create player");
                        achievement = JSON.stringify(new Array(ACHIEVEMENT_COUNT).fill(0));
                        inventory = JSON.stringify(new Array(INVENTORY_SLOT_COUNT).fill(0));
                        return [4, this.client
                                .multi()
                                .hSet(userKey, "account", player.account || "")
                                .hSet(userKey, "hash", "")
                                .hSet(userKey, "exp", 0)
                                .hSet(userKey, "gold", 0)
                                .hSet(userKey, "goldStash", 0)
                                .hSet(userKey, "goldTrade", 0)
                                .hSet(userKey, "x", player.x || "")
                                .hSet(userKey, "y", player.y || "")
                                .hSet(userKey, "ip", player.ip || "")
                                .hSet(userKey, "createdAt", curTime)
                                .hSet(userKey, "achievement", achievement)
                                .hSet(userKey, "inventory", inventory)
                                .hSet(userKey, "stash", JSON.stringify(new Array(STASH_SLOT_COUNT).fill(0)))
                                .hSet(userKey, "weapon", "dagger:1")
                                .hSet(userKey, "armor", "clotharmor:1")
                                .hSet(userKey, "helm", "helmcloth:1")
                                .hSet(userKey, "belt", "")
                                .hSet(userKey, "cape", "")
                                .hSet(userKey, "pet", "")
                                .hSet(userKey, "shield", "")
                                .hSet(userKey, "settings", "".concat(JSON.stringify(defaultSettings)))
                                .hSet(userKey, "ring1", "")
                                .hSet(userKey, "ring2", "")
                                .hSet(userKey, "amulet", "")
                                .hSet(userKey, "nanoPotions", 0)
                                .hSet(userKey, "gems", JSON.stringify(new Array(GEM_COUNT).fill(0)))
                                .hSet(userKey, "artifact", JSON.stringify(new Array(ARTIFACT_COUNT).fill(0)))
                                .hSet(userKey, "upgrade", JSON.stringify(new Array(UPGRADE_SLOT_COUNT).fill(0)))
                                .hSet(userKey, "trade", JSON.stringify(new Array(TRADE_SLOT_COUNT).fill(0)))
                                .hSet(userKey, "expansion1", 0)
                                .hSet(userKey, "expansion2", 0)
                                .hSet(userKey, "waypoints", JSON.stringify([1, 0, 0, 2, 2, 2, 2, 2, 2, 2]))
                                .hSet(userKey, "depositAccountIndex", depositAccountIndex || "")
                                .hSet(userKey, "depositAccount", depositAccount || "")
                                .hSet(userKey, "network", player.network || "nano")
                                .exec()];
                    case 5:
                        _a = _b.sent(), account = _a[0], hash = _a[1], exp = _a[2], gold = _a[3], goldStash = _a[4], goldTrade = _a[5], x = _a[6], y = _a[7], ip = _a[8], createdAt = _a[9], stash = _a[10], weapon = _a[11], armor = _a[12], helm = _a[13], belt = _a[14], cape = _a[15], pet = _a[16], shield = _a[17], settings = _a[18], ring1 = _a[19], ring2 = _a[20], amulet = _a[21], nanoPotions = _a[22], gems = _a[23], artifact = _a[24], upgrade = _a[25], trade = _a[26], expansion1 = _a[27], expansion2 = _a[28], waypoints = _a[29], network = _a[30];
                        console.info("New User: " + player.name);
                        player.sendWelcome({
                            account: account,
                            hash: hash,
                            exp: exp,
                            gold: gold,
                            goldStash: goldStash,
                            goldTrade: goldTrade,
                            x: x,
                            y: y,
                            ip: ip,
                            createdAt: createdAt,
                            achievement: achievement,
                            inventory: inventory,
                            stash: stash,
                            weapon: weapon,
                            armor: armor,
                            helm: helm,
                            belt: belt,
                            cape: cape,
                            pet: pet,
                            shield: shield,
                            settings: settings,
                            ring1: ring1,
                            ring2: ring2,
                            amulet: amulet,
                            nanoPotions: nanoPotions,
                            gems: gems,
                            artifact: artifact,
                            upgrade: upgrade,
                            trade: trade,
                            expansion1: expansion1,
                            expansion2: expansion2,
                            waypoints: waypoints,
                            depositAccount: depositAccount,
                            depositAccountIndex: depositAccountIndex,
                            network: network,
                        });
                        console.log("~~~~~~done create player");
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.checkIsBannedByIP = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var ipKey, _a, timestamp, reason, message, admin;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ipKey = "ipban:" + player.ip;
                        return [4, this.client
                                .multi()
                                .hGet(ipKey, "timestamp")
                                .hGet(ipKey, "reason")
                                .hGet(ipKey, "message")
                                .hGet(ipKey, "admin")
                                .exec()];
                    case 1:
                        _a = _b.sent(), timestamp = _a[0], reason = _a[1], message = _a[2], admin = _a[3];
                        return [2, { playerName: player.name, timestamp: timestamp, reason: reason, message: message, ip: player.ip, admin: admin }];
                }
            });
        });
    };
    DatabaseHandler.prototype.checkIsBannedForReason = function (playerName) {
        return __awaiter(this, void 0, void 0, function () {
            var banKey, _a, timestamp, reason, message, admin;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        banKey = "ban:" + playerName;
                        return [4, this.client
                                .multi()
                                .hGet(banKey, "timestamp")
                                .hGet(banKey, "reason")
                                .hGet(banKey, "message")
                                .hGet(banKey, "admin")
                                .exec()];
                    case 1:
                        _a = _b.sent(), timestamp = _a[0], reason = _a[1], message = _a[2], admin = _a[3];
                        return [2, { playerName: playerName, timestamp: timestamp, reason: reason, message: message, admin: admin }];
                }
            });
        });
    };
    DatabaseHandler.prototype.banPlayerByIP = function (_a) {
        var _b, _c, _d, _e;
        var _f = _a.admin, admin = _f === void 0 ? "auto-mod" : _f, player = _a.player, _g = _a.reason, reason = _g === void 0 ? "other" : _g, _h = _a.message, message = _h === void 0 ? "no message" : _h, _j = _a.days, days = _j === void 0 ? 365 : _j;
        return __awaiter(this, void 0, void 0, function () {
            var until, userKey;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        until = days * 24 * 60 * 60 * 1000 + Date.now();
                        return [4, this.banPlayerForReason({ admin: admin, player: player, reason: reason, message: message, until: until })];
                    case 1:
                        _k.sent();
                        player.connection.sendUTF8(JSON.stringify({ admin: admin, player: player.name, error: "banned", reason: reason, until: until, message: message }));
                        player.connection.close("You are banned, ".concat(reason, "."));
                        if (!((_e = (_d = (_c = (_b = player === null || player === void 0 ? void 0 : player.connection) === null || _b === void 0 ? void 0 : _b._connection) === null || _c === void 0 ? void 0 : _c.handshake) === null || _d === void 0 ? void 0 : _d.headers) === null || _e === void 0 ? void 0 : _e["cf-connecting-ip"]))
                            return [2];
                        userKey = "ipban:" + player.ip;
                        return [4, this.client
                                .multi()
                                .hSet(userKey, "account", player.account)
                                .hSet(userKey, "timestamp", until)
                                .hSet(userKey, "reason", reason)
                                .hSet(userKey, "message", message)
                                .hSet(userKey, "player", player.name)
                                .hSet(userKey, "admin", admin)
                                .exec()];
                    case 2:
                        _k.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.banPlayerForReason = function (_a) {
        var admin = _a.admin, player = _a.player, reason = _a.reason, message = _a.message, until = _a.until;
        return __awaiter(this, void 0, void 0, function () {
            var userKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userKey = "ban:" + player.name;
                        return [4, this.client
                                .multi()
                                .hSet(userKey, "account", player.account)
                                .hSet(userKey, "timestamp", until)
                                .hSet(userKey, "reason", reason)
                                .hSet(userKey, "message", message)
                                .hSet(userKey, "admin", admin)
                                .exec()];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.chatBan = function (_a) {
        var player = _a.player, message = _a.message, isIPBan = _a.isIPBan;
        return __awaiter(this, void 0, void 0, function () {
            var ip;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ip = isIPBan ? player.ip : "";
                        player.canChat = false;
                        return [4, this.client.hSet("chatBan", player.name, JSON.stringify({ ip: ip, message: message }))];
                    case 1:
                        _b.sent();
                        player.server.chatBan.push({ player: player.name, ip: ip });
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.getChatBan = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rawChatBan, chatBan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.hGetAll("chatBan")];
                    case 1:
                        rawChatBan = _a.sent();
                        chatBan = [];
                        console.log("~~~~rawChatBan", rawChatBan);
                        if (rawChatBan) {
                            chatBan = Object.entries(rawChatBan)
                                .map(function (_a) {
                                var player = _a[0], data = _a[1];
                                try {
                                    var ip = JSON.parse(data).ip;
                                    return {
                                        player: player,
                                        ip: ip,
                                    };
                                }
                                catch (err) {
                                    return;
                                }
                            })
                                .filter(Boolean);
                        }
                        return [2, chatBan];
                }
            });
        });
    };
    DatabaseHandler.prototype.equipWeapon = function (name, weapon, level, bonus, socket, skill) {
        if (bonus === void 0) { bonus = []; }
        if (socket === void 0) { socket = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Set Weapon: " + name + " " + weapon + ":" + level);
                        return [4, this.client.hSet("u:" + name, "weapon", "".concat(weapon, ":").concat(level).concat(toDb(bonus)).concat(toDb(socket)).concat(toDb(skill)))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.equipHelm = function (name, helm, level, bonus, socket) {
        if (bonus === void 0) { bonus = []; }
        if (socket === void 0) { socket = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Set Helm: " + name + " " + helm + ":" + level);
                        return [4, this.client.hSet("u:" + name, "helm", "".concat(helm, ":").concat(level).concat(toDb(bonus)).concat(toDb(socket)))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.equipArmor = function (name, armor, level, bonus, socket) {
        if (bonus === void 0) { bonus = []; }
        if (socket === void 0) { socket = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Set Armor: " + name + " " + armor + ":" + level);
                        return [4, this.client.hSet("u:" + name, "armor", "".concat(armor, ":").concat(level).concat(toDb(bonus)).concat(toDb(socket)))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.equipBelt = function (name, belt, level, bonus) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!belt) return [3, 2];
                        console.info("Set Belt: " + name + " " + belt + ":" + level);
                        return [4, this.client.hSet("u:" + name, "belt", "".concat(belt, ":").concat(level).concat(toDb(bonus)))];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        console.info("Delete Belt");
                        return [4, this.client.hDel("u:" + name, "belt")];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.equipShield = function (name, shield, level, bonus, socket, skill) {
        if (bonus === void 0) { bonus = []; }
        if (socket === void 0) { socket = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!shield) return [3, 2];
                        console.info("Set Shield: ".concat(name, " ").concat(shield, " ").concat(level, " ").concat(bonus, " ").concat(socket, " ").concat(skill));
                        return [4, this.client.hSet("u:" + name, "shield", "".concat(shield, ":").concat(level).concat(toDb(bonus)).concat(toDb(socket)).concat(toDb(skill)))];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        console.info("Delete Shield");
                        return [4, this.client.hDel("u:" + name, "shield")];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.equipCape = function (name, cape, level, bonus) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!cape) return [3, 2];
                        console.info("Set Cape: " + name + " " + cape + ":" + level);
                        return [4, this.client.hSet("u:" + name, "cape", "".concat(cape, ":").concat(level).concat(toDb(bonus)))];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        console.info("Delete Cape");
                        return [4, this.client.hDel("u:" + name, "cape")];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.equipPet = function (name, pet, level, bonus, socket, skin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!pet) return [3, 2];
                        console.info("Set Pet: " + name + " " + pet + ":" + level);
                        return [4, this.client.hSet("u:" + name, "pet", "".concat(pet, ":").concat(level).concat(toDb(bonus)).concat(toDb(socket)).concat(toDb(skin)))];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        console.info("Delete Pet");
                        return [4, this.client.hDel("u:" + name, "pet")];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.setSettings = function (player, setting) {
        return __awaiter(this, void 0, void 0, function () {
            var userKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof setting.playerNames !== "undefined") {
                            player.settings.playerNames = toBoolean(setting.playerNames);
                        }
                        if (typeof setting.damageInfo !== "undefined") {
                            player.settings.damageInfo = toBoolean(setting.damageInfo);
                        }
                        if (typeof setting.debug !== "undefined") {
                            player.settings.debug = toBoolean(setting.debug);
                        }
                        if (typeof setting.capeHue !== "undefined") {
                            player.settings.capeHue = Number(setting.capeHue);
                        }
                        if (typeof setting.capeSaturate !== "undefined") {
                            player.settings.capeSaturate = Number(setting.capeSaturate);
                        }
                        if (typeof setting.capeContrast !== "undefined") {
                            player.settings.capeContrast = Number(setting.capeContrast);
                        }
                        if (typeof setting.capeBrightness !== "undefined") {
                            player.settings.capeBrightness = Number(setting.capeBrightness);
                        }
                        if (typeof setting.pvp !== "undefined") {
                            player.settings.pvp = toBoolean(setting.pvp);
                        }
                        if (typeof setting.partyEnabled !== "undefined") {
                            player.settings.partyEnabled = toBoolean(setting.partyEnabled);
                        }
                        if (typeof setting.tradeEnabled !== "undefined") {
                            player.settings.tradeEnabled = toBoolean(setting.tradeEnabled);
                        }
                        if (typeof setting.effects !== "undefined") {
                            player.settings.effects = toBoolean(setting.effects);
                        }
                        userKey = "u:" + player.name;
                        return [4, this.client.hSet(userKey, "settings", JSON.stringify(player.settings))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.setAccount = function (player, account, network) {
        return __awaiter(this, void 0, void 0, function () {
            var userKey, depositAccount, _a, hash, rawAchievement, achievement, hasHeroAchievement, err_1, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (player.depositAccount || player.depositAccountIndex || player.hash) {
                            Sentry.captureException(new Error("Already have deposit account for Player"), { extra: { name: player.name } });
                            return [2];
                        }
                        userKey = "u:" + player.name;
                        return [4, this.client.hSet(userKey, "account", account)];
                    case 1:
                        _b.sent();
                        return [4, this.client.hSet(userKey, "network", network)];
                    case 2:
                        _b.sent();
                        return [4, this.assignNewDepositAccount(player, network)];
                    case 3:
                        depositAccount = (_b.sent()).depositAccount;
                        player.account = account;
                        player.send([Types.Messages.ACCOUNT, { account: account, network: network, depositAccount: depositAccount }]);
                        postMessageToDiscordWelcomeChannel("**".concat(player.name, "** has joined the ranks of **").concat(player.network === "nano" ? " Nano ".concat(EmojiMap.nbq) : " Banano ".concat(EmojiMap.bbq), "** \uD83C\uDF89"));
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 10, , 11]);
                        return [4, this.client
                                .multi()
                                .hGet(userKey, "hash")
                                .hGet(userKey, "achievement")
                                .exec()];
                    case 5:
                        _a = _b.sent(), hash = _a[0], rawAchievement = _a[1];
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        achievement = JSON.parse(rawAchievement);
                        hasHeroAchievement = !!achievement[ACHIEVEMENT_HERO_INDEX];
                        if (hash || !hasHeroAchievement)
                            return [2];
                        achievement[ACHIEVEMENT_HERO_INDEX] = 0;
                        return [4, this.client.hSet("u:" + player.name, "achievement", JSON.stringify(achievement))];
                    case 7:
                        _b.sent();
                        return [3, 9];
                    case 8:
                        err_1 = _b.sent();
                        Sentry.captureException(new Error("Unable to assign deposit account"), { extra: { err: err_1 } });
                        return [3, 9];
                    case 9: return [3, 11];
                    case 10:
                        err_2 = _b.sent();
                        Sentry.captureException(new Error("Unable to assign deposit account"), { extra: { err: err_2 } });
                        return [3, 11];
                    case 11: return [2, true];
                }
            });
        });
    };
    DatabaseHandler.prototype.equipRing1 = function (_a) {
        var name = _a.name, item = _a.item, level = _a.level, bonus = _a.bonus;
        return __awaiter(this, void 0, void 0, function () {
            var ring1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ring1 = [item, level, bonus].filter(Boolean).join(":") || "";
                        console.info("Set Ring1: ".concat(name, " ring1"));
                        if (!ring1) return [3, 2];
                        return [4, this.client.hSet("u:" + name, "ring1", ring1)];
                    case 1:
                        _b.sent();
                        return [3, 4];
                    case 2: return [4, this.client.hDel("u:" + name, "ring1")];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.equipRing2 = function (_a) {
        var name = _a.name, item = _a.item, level = _a.level, bonus = _a.bonus;
        return __awaiter(this, void 0, void 0, function () {
            var ring2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ring2 = [item, level, bonus].filter(Boolean).join(":") || "";
                        console.info("Set Ring2: ".concat(name, " ring2"));
                        if (!ring2) return [3, 2];
                        return [4, this.client.hSet("u:" + name, "ring2", ring2)];
                    case 1:
                        _b.sent();
                        return [3, 4];
                    case 2: return [4, this.client.hDel("u:" + name, "ring2")];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.equipAmulet = function (_a) {
        var name = _a.name, item = _a.item, level = _a.level, bonus = _a.bonus;
        return __awaiter(this, void 0, void 0, function () {
            var amulet;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        amulet = [item, level, bonus].filter(Boolean).join(":") || "";
                        console.info("Set Amulet: ".concat(name, " amulet"));
                        if (!amulet) return [3, 2];
                        return [4, this.client.hSet("u:" + name, "amulet", amulet)];
                    case 1:
                        _b.sent();
                        return [3, 4];
                    case 2: return [4, this.client.hDel("u:" + name, "amulet")];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.setExp = function (name, exp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Set Exp: " + name + " " + exp);
                        return [4, this.client.hSet("u:" + name, "exp", exp)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.setHash = function (name, hash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Set Hash: " + name + " " + hash);
                        return [4, this.client.hSet("u:" + name, "hash", hash)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.getItemLocation = function (slot) {
        if (slot < INVENTORY_SLOT_COUNT) {
            return ["inventory", 0];
        }
        else if (slot === Slot.WEAPON) {
            return ["weapon", 0];
        }
        else if (slot === Slot.HELM) {
            return ["helm", 0];
        }
        else if (slot === Slot.ARMOR) {
            return ["armor", 0];
        }
        else if (slot === Slot.BELT) {
            return ["belt", 0];
        }
        else if (slot === Slot.CAPE) {
            return ["cape", 0];
        }
        else if (slot === Slot.PET) {
            return ["pet", 0];
        }
        else if (slot === Slot.SHIELD) {
            return ["shield", 0];
        }
        else if (slot === Slot.RING1) {
            return ["ring1", 0];
        }
        else if (slot === Slot.RING2) {
            return ["ring2", 0];
        }
        else if (slot === Slot.AMULET) {
            return ["amulet", 0];
        }
        else if (slot >= UPGRADE_SLOT_RANGE && slot <= UPGRADE_SLOT_RANGE + UPGRADE_SLOT_COUNT - 1) {
            return ["upgrade", UPGRADE_SLOT_RANGE];
        }
        else if (slot >= TRADE_SLOT_RANGE && slot <= TRADE_SLOT_RANGE + TRADE_SLOT_COUNT - 1) {
            return ["trade", TRADE_SLOT_RANGE];
        }
        else if (slot >= STASH_SLOT_RANGE && slot <= STASH_SLOT_RANGE + STASH_SLOT_COUNT) {
            return ["stash", STASH_SLOT_RANGE];
        }
        return ["", 0];
    };
    DatabaseHandler.prototype.sendMoveItem = function (_a) {
        var _b;
        var player = _a.player, location = _a.location, data = _a.data;
        var type = location;
        var isEquipment = [
            "weapon",
            "helm",
            "armor",
            "belt",
            "cape",
            "pet",
            "shield",
            "ring1",
            "ring2",
            "amulet",
        ].includes(location);
        var item = null;
        var level = null;
        var bonus = null;
        var socket = null;
        var skillOrSkin = null;
        if (isEquipment && data) {
            _b = data.split(":"), item = _b[0], level = _b[1], bonus = _b[2], socket = _b[3], skillOrSkin = _b[4];
        }
        else if (!data) {
            if (type === "weapon") {
                item = "dagger";
                level = 1;
            }
            else if (type === "armor") {
                item = "clotharmor";
                level = 1;
            }
        }
        if (location === "inventory") {
            player.send([Types.Messages.INVENTORY, data]);
        }
        else if (location === "stash") {
            player.send([Types.Messages.STASH, data]);
        }
        else if (location === "weapon") {
            player.equipItem({ item: item, level: level, type: type, bonus: bonus, socket: socket, skill: skillOrSkin });
            player.broadcast(player.equip({
                kind: player.weaponKind,
                level: player.weaponLevel,
                bonus: toArray(bonus),
                socket: player.weaponSocket,
                skill: player.attackSkill,
                type: type,
            }), false);
        }
        else if (location === "helm") {
            player.equipItem({ item: item, level: level, type: type, bonus: bonus, socket: socket });
            player.broadcast(player.equip({
                kind: player.helmKind,
                level: player.helmLevel,
                bonus: toArray(bonus),
                socket: player.helmSocket,
                type: type,
            }), false);
        }
        else if (location === "armor") {
            player.equipItem({ item: item, level: level, type: type, bonus: bonus, socket: socket });
            player.broadcast(player.equip({
                kind: player.armorKind,
                level: player.armorLevel,
                bonus: toArray(bonus),
                socket: player.armorSocket,
                type: type,
            }), false);
        }
        else if (location === "belt") {
            player.equipItem({ item: item, level: level, type: type, bonus: bonus });
            player.broadcast(player.equip({ kind: Types.getKindFromString(item), level: level, bonus: toArray(bonus), type: type }), false);
        }
        else if (location === "cape") {
            player.equipItem({ item: item, level: level, type: type, bonus: bonus });
            player.broadcast(player.equip({ kind: player.capeKind, level: player.capeLevel, bonus: toArray(bonus), type: type }), false);
        }
        else if (location === "pet") {
            player.equipItem({ item: item, level: level, type: type, bonus: bonus, socket: socket, skin: skillOrSkin });
            player.broadcast(player.equip({
                kind: player.petKind,
                level: player.petLevel,
                bonus: toArray(bonus),
                socket: player.petSocket,
                skin: player.petSkin,
                type: type,
            }), false);
        }
        else if (location === "shield") {
            player.equipItem({ item: item, level: level, type: type, bonus: bonus, socket: socket, skill: skillOrSkin });
            player.broadcast(player.equip({
                kind: player.shieldKind,
                level: player.shieldLevel,
                bonus: toArray(bonus),
                socket: player.shieldSocket,
                skill: player.defenseSkill,
                type: type,
            }), false);
        }
        else if (location === "ring1") {
            player.equipItem({ item: item, level: level, type: type, bonus: bonus });
            player.broadcast(player.equip({ kind: Types.getKindFromString(item), level: level, bonus: bonus, type: type }), false);
        }
        else if (location === "ring2") {
            player.equipItem({ item: item, level: level, type: type, bonus: bonus });
            player.broadcast(player.equip({ kind: Types.getKindFromString(item), level: level, bonus: bonus, type: type }), false);
        }
        else if (location === "amulet") {
            player.equipItem({ item: item, level: level, type: type, bonus: bonus });
            player.broadcast(player.equip({ kind: Types.getKindFromString(item), level: level, bonus: bonus, type: type }), false);
        }
        else if (location === "upgrade") {
            player.send([Types.Messages.UPGRADE, data]);
        }
        else if (location === "trade") {
            var tradeInstance = player.server.getTrade(player.tradeId);
            if (!(tradeInstance === null || tradeInstance === void 0 ? void 0 : tradeInstance.players.find(function (_a) {
                var id = _a.id;
                return id === player.id;
            }))) {
                Sentry.captureException(new Error("Invalid trade instance or Player ".concat(player.name, " not part of it")));
            }
            else {
                tradeInstance.update({ data: data, player1Id: player.id });
            }
        }
    };
    DatabaseHandler.prototype.moveItem = function (_a) {
        var player = _a.player, fromSlot = _a.fromSlot, toSlot = _a.toSlot, _b = _a.quantity, movedQuantity = _b === void 0 ? 0 : _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, fromLocation, fromRange, _d, toLocation, toRange, isMultipleFrom, isMultipleTo, tradeInstance, fromReply, fromItem, toItem, isConsumable, fromReplyParsed, toReply, isFromReplyDone, isToReplyDone, toReplyParsed, _e, fromIsQuantity_1, rawFromQuantity, fromQuantity, toItemIndex, _f, _g, toQuantity, isScroll, isRune, hasScroll, _h, item, fromLevel, _j, item, toLevel, err_3, err_4;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        if (movedQuantity && !validateQuantity(movedQuantity))
                            return [2];
                        if (fromSlot === toSlot)
                            return [2];
                        _c = this.getItemLocation(fromSlot), fromLocation = _c[0], fromRange = _c[1];
                        _d = this.getItemLocation(toSlot), toLocation = _d[0], toRange = _d[1];
                        isMultipleFrom = ["inventory", "upgrade", "trade", "stash"].includes(fromLocation);
                        isMultipleTo = ["inventory", "upgrade", "trade", "stash"].includes(toLocation);
                        if (!(!fromLocation || !toLocation)) return [3, 2];
                        return [4, this.banPlayerByIP({
                                player: player,
                                reason: "cheating",
                                message: "Tried moveItem fromSlot:".concat(fromSlot, " toSlot:").concat(toSlot),
                            })];
                    case 1:
                        _k.sent();
                        return [2];
                    case 2:
                        if (movedQuantity && fromLocation !== "inventory" && toLocation !== "inventory")
                            return [2];
                        if ([fromLocation, toLocation].includes("trade") && player.tradeId) {
                            tradeInstance = player.server.trades[player.tradeId];
                            if (!tradeInstance || tradeInstance.players.find(function (_a) {
                                var id = _a.id, isAccepted = _a.isAccepted;
                                return player.id === id && isAccepted;
                            })) {
                                return [2];
                            }
                        }
                        return [4, this.client.hGet("u:" + player.name, fromLocation)];
                    case 3:
                        fromReply = _k.sent();
                        _k.label = 4;
                    case 4:
                        _k.trys.push([4, 15, , 16]);
                        fromReplyParsed = isMultipleFrom ? JSON.parse(fromReply) : fromReply;
                        fromItem = isMultipleFrom ? fromReplyParsed[fromSlot - fromRange] : fromReplyParsed;
                        if (!fromItem) {
                            return [2];
                        }
                        if (["dagger:1", "clotharmor:1"].includes(fromItem) && toSlot !== -1) {
                            return [2];
                        }
                        if (!(toLocation === fromLocation)) return [3, 6];
                        toItem = fromReplyParsed[toSlot - toRange];
                        if (toSlot !== -1) {
                            fromReplyParsed[toSlot - toRange] = fromItem;
                            fromReplyParsed[fromSlot - fromRange] = toItem || 0;
                        }
                        else {
                            fromReplyParsed[fromSlot - fromRange] = 0;
                        }
                        return [4, this.client.hSet("u:" + player.name, fromLocation, JSON.stringify(fromReplyParsed))];
                    case 5:
                        _k.sent();
                        this.sendMoveItem({ player: player, location: fromLocation, data: fromReplyParsed });
                        return [3, 14];
                    case 6: return [4, this.client.hGet("u:" + player.name, toLocation)];
                    case 7:
                        toReply = _k.sent();
                        _k.label = 8;
                    case 8:
                        _k.trys.push([8, 13, , 14]);
                        isFromReplyDone = false;
                        isToReplyDone = false;
                        toReplyParsed = isMultipleTo ? JSON.parse(toReply) : toReply;
                        toItem = isMultipleTo ? toReplyParsed[toSlot - toRange] : toReplyParsed;
                        if (["dagger:1", "clotharmor:1"].includes(toItem)) {
                            toItem = 0;
                        }
                        _e = fromItem.split(":"), fromIsQuantity_1 = _e[0], rawFromQuantity = _e[1];
                        isConsumable = Types.isConsumable(fromIsQuantity_1);
                        if (Types.isQuantity(fromIsQuantity_1)) {
                            fromQuantity = Number(rawFromQuantity);
                            if (movedQuantity && movedQuantity > fromQuantity) {
                                return [2];
                            }
                            if (toLocation === "inventory" || toLocation === "stash" || toLocation === "trade") {
                                toItemIndex = toReplyParsed.findIndex(function (a) { return a && a.startsWith("".concat(fromIsQuantity_1, ":")); });
                                if (toItemIndex === -1) {
                                    toItemIndex = toItem ? toReplyParsed.indexOf(0) : toSlot - toRange;
                                }
                                if (toItemIndex > -1) {
                                    _f = (toReplyParsed[toItemIndex] || "").split(":"), _g = _f[1], toQuantity = _g === void 0 ? 0 : _g;
                                    toReplyParsed[toItemIndex] = "".concat(fromIsQuantity_1, ":").concat(parseInt(toQuantity) + parseInt("".concat(movedQuantity || fromQuantity)));
                                    if (movedQuantity && fromQuantity - movedQuantity > 0) {
                                        fromReplyParsed[fromSlot - fromRange] = "".concat(fromIsQuantity_1, ":").concat(fromQuantity - movedQuantity);
                                    }
                                    else {
                                        fromReplyParsed[fromSlot - fromRange] = 0;
                                    }
                                    isFromReplyDone = true;
                                    isToReplyDone = true;
                                }
                            }
                            else if (toLocation === "upgrade") {
                                isScroll = Types.isScroll(fromItem) || Types.isStone(fromItem) || Types.isChest(fromItem);
                                isRune = Types.isRune(fromItem);
                                hasScroll = isScroll
                                    ? toReplyParsed.some(function (a, i) { return i !== 0 && a && (a.startsWith("scroll") || a.startsWith("stone")); })
                                    : false;
                                if ((isScroll && !hasScroll) ||
                                    (isRune && !toReplyParsed[toSlot - toRange]) ||
                                    (isConsumable && (fromQuantity || movedQuantity))) {
                                    fromReplyParsed[fromSlot - fromRange] = fromQuantity > 1 ? "".concat(fromIsQuantity_1, ":").concat(fromQuantity - 1) : 0;
                                    toReplyParsed[toSlot - toRange] = "".concat(fromIsQuantity_1, ":1");
                                }
                                isFromReplyDone = true;
                                isToReplyDone = true;
                            }
                            else {
                                isFromReplyDone = true;
                                isToReplyDone = true;
                            }
                        }
                        else if (["weapon", "helm", "armor", "belt", "cape", "pet", "shield", "ring1", "ring2", "amulet"].includes(toLocation) &&
                            fromItem) {
                            _h = fromItem.split(":"), item = _h[0], fromLevel = _h[1];
                            if (Types.getItemRequirement(item, fromLevel) > player.level ||
                                !Types.isCorrectTypeForSlot(toLocation, item)) {
                                isFromReplyDone = true;
                                isToReplyDone = true;
                            }
                        }
                        else if (["weapon", "helm", "armor", "belt", "cape", "pet", "shield", "ring1", "ring2", "amulet"].includes(fromLocation) &&
                            toItem) {
                            _j = toItem.split(":"), item = _j[0], toLevel = _j[1];
                            if (Types.getItemRequirement(item, toLevel) > player.level ||
                                !Types.isCorrectTypeForSlot(fromLocation, item)) {
                                isFromReplyDone = true;
                                isToReplyDone = true;
                            }
                        }
                        if ((Types.isSingle(toItem) || Types.isSingle(fromItem)) &&
                            (fromLocation === "trade" || toLocation === "trade")) {
                            isFromReplyDone = true;
                            isToReplyDone = true;
                        }
                        if (!isToReplyDone) {
                            if (isMultipleTo) {
                                toReplyParsed[toSlot - toRange] = fromItem;
                            }
                            else {
                                toReplyParsed = fromItem;
                            }
                        }
                        if (!isFromReplyDone) {
                            if (isMultipleFrom) {
                                fromReplyParsed[fromSlot - fromRange] = toItem || 0;
                            }
                            else {
                                fromReplyParsed = toItem || 0;
                            }
                        }
                        console.log('~~~~~~isMultipleFrom', isMultipleFrom, fromLocation);
                        if (!isMultipleFrom) return [3, 10];
                        return [4, this.client.hSet("u:" + player.name, fromLocation, JSON.stringify(fromReplyParsed))];
                    case 9:
                        _k.sent();
                        _k.label = 10;
                    case 10:
                        console.log('~~~~~~isMultipleFrom', isMultipleFrom, fromLocation);
                        if (!isMultipleTo) return [3, 12];
                        return [4, this.client.hSet("u:" + player.name, toLocation, JSON.stringify(toReplyParsed))];
                    case 11:
                        _k.sent();
                        _k.label = 12;
                    case 12:
                        this.sendMoveItem({ player: player, location: fromLocation, data: fromReplyParsed });
                        this.sendMoveItem({ player: player, location: toLocation, data: toReplyParsed });
                        return [3, 14];
                    case 13:
                        err_3 = _k.sent();
                        console.log(err_3);
                        Sentry.captureException(err_3, {
                            extra: {
                                player: player.name,
                                fromSlot: fromSlot,
                                fromItem: fromItem,
                                toItem: toItem,
                                toSlot: toSlot,
                                toLocation: toLocation,
                                fromLocation: fromLocation,
                                movedQuantity: movedQuantity,
                            },
                        });
                        return [3, 14];
                    case 14: return [3, 16];
                    case 15:
                        err_4 = _k.sent();
                        console.log(err_4);
                        Sentry.captureException(err_4, {
                            extra: {
                                player: player.name,
                                fromSlot: fromSlot,
                                fromItem: fromItem,
                                toItem: toItem,
                                toSlot: toSlot,
                                toLocation: toLocation,
                                fromLocation: fromLocation,
                                movedQuantity: movedQuantity,
                            },
                        });
                        return [3, 16];
                    case 16: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.lootGold = function (_a) {
        var player = _a.player, amount = _a.amount;
        return __awaiter(this, void 0, void 0, function () {
            var rawCurrentGold, currentGold, gold;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.client.hGet("u:" + player.name, "gold")];
                    case 1:
                        rawCurrentGold = _b.sent();
                        currentGold = rawCurrentGold;
                        if (!currentGold) {
                            currentGold = 0;
                        }
                        else if (!/\d+/.test(currentGold)) {
                            Sentry.captureException(new Error("".concat(player.name, " gold hash corrupted?")), {
                                extra: {
                                    currentGold: currentGold,
                                },
                            });
                            return [2];
                        }
                        gold = currentGold + parseInt(amount);
                        if (gold > GOLD_CAP) {
                            gold = GOLD_CAP;
                            return [2];
                        }
                        return [4, this.client.hSet("u:" + player.name, "gold", gold)];
                    case 2:
                        _b.sent();
                        player.send([Types.Messages.GOLD.INVENTORY, gold]);
                        player.gold = gold;
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.moveGold = function (_a) {
        var player = _a.player, amount = _a.amount, from = _a.from, to = _a.to;
        return __awaiter(this, void 0, void 0, function () {
            var locationMap, fromLocation, toLocation, rawFromGold, fromGold, newFromGold, rawToGold, toGold, newToGold, resolvedAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (isNaN(amount) || amount <= 0)
                            return [2];
                        locationMap = {
                            inventory: "gold",
                            stash: "goldStash",
                            trade: "goldTrade",
                        };
                        fromLocation = locationMap[from];
                        toLocation = locationMap[to];
                        if (fromLocation === toLocation || !fromLocation || !toLocation)
                            return [2];
                        return [4, this.client.hGet("u:" + player.name, fromLocation)];
                    case 1:
                        rawFromGold = _b.sent();
                        if (!rawFromGold || rawFromGold === "0" || !/\d+/.test(rawFromGold))
                            return [2];
                        fromGold = parseInt(rawFromGold);
                        if (amount > fromGold) {
                            return [2];
                        }
                        newFromGold = fromGold - amount;
                        if (newFromGold < 0)
                            return [2];
                        return [4, this.client.hGet("u:" + player.name, toLocation)];
                    case 2:
                        rawToGold = _b.sent();
                        if (rawToGold === null) {
                            rawToGold = 0;
                        }
                        else if (!/\d+/.test(rawToGold)) {
                            return [2];
                        }
                        toGold = parseInt(rawToGold || "0");
                        if (toGold + amount < 0)
                            return [2];
                        return [4, this.client.hSet("u:" + player.name, fromLocation, String(newFromGold))];
                    case 3:
                        _b.sent();
                        player.send([Types.Messages.GOLD[from.toUpperCase()], newFromGold]);
                        player[fromLocation] = newFromGold;
                        newToGold = toGold + amount;
                        return [4, this.client.hSet("u:" + player.name, toLocation, newToGold)];
                    case 4:
                        _b.sent();
                        player.send([Types.Messages.GOLD[to.toUpperCase()], newToGold]);
                        player[toLocation] = newToGold;
                        resolvedAmount = 0;
                        if (from === "trade") {
                            resolvedAmount = newFromGold;
                        }
                        else if (to === "trade") {
                            resolvedAmount = newToGold;
                        }
                        player[fromLocation] = newFromGold;
                        player[toLocation] = newToGold;
                        return [2, resolvedAmount];
                }
            });
        });
    };
    DatabaseHandler.prototype.deductGold = function (player, _a) {
        var _this = this;
        var penalty = _a.penalty, amount = _a.amount;
        return new Promise(function (resolve, _reject) { return __awaiter(_this, void 0, void 0, function () {
            var currentGold, gold, deductedGold, newGold;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!amount && !penalty) {
                            return [2];
                        }
                        return [4, this.client.hGet("u:" + player.name, "gold")];
                    case 1:
                        currentGold = _a.sent();
                        if (currentGold === null) {
                            currentGold = 0;
                        }
                        else if (!/\d+/.test(currentGold)) {
                            Sentry.captureException(new Error("".concat(player.name, " gold hash corrupted?")), {
                                extra: {
                                    currentGold: currentGold,
                                },
                            });
                            return [2];
                        }
                        gold = parseInt(currentGold);
                        if (gold === 0)
                            return [2];
                        deductedGold = amount;
                        if (amount && gold < amount) {
                            return [2];
                        }
                        if (penalty) {
                            deductedGold = Math.ceil((gold * penalty) / 100);
                        }
                        if (!deductedGold)
                            return [2];
                        if (deductedGold >= 10000 && penalty) {
                            postMessageToDiscordEventChannel("".concat(EmojiMap.press_f_to_pay_respects, " **").concat(player.name, "** just lost **").concat(new Intl.NumberFormat("en-EN", {}).format(deductedGold), "** gold ").concat(EmojiMap.gold, " on death").concat(EmojiMap.janetyellen, " is getting richer."));
                        }
                        newGold = gold - deductedGold;
                        if (newGold < 0)
                            return [2];
                        return [4, this.client.hSet("u:" + player.name, "gold", newGold)];
                    case 2:
                        _a.sent();
                        player.send([Types.Messages.GOLD.INVENTORY, newGold]);
                        player.gold = newGold;
                        if (!amount) return [3, 3];
                        resolve(newGold);
                        return [3, 5];
                    case 3:
                        if (!penalty) return [3, 5];
                        player.send(new Messages.Chat({}, "You lost ".concat(deductedGold, " gold from your death."), "event", deductedGold).serialize());
                        return [4, this.client.incrBy("goldBank", deductedGold, function (_err, reply) {
                                resolve(reply);
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2];
                }
            });
        }); });
    };
    DatabaseHandler.prototype.getGoldBank = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gold, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.client.get("goldBank")];
                    case 1:
                        gold = _a.sent();
                        return [2, Number(gold)];
                    case 2:
                        err_5 = _a.sent();
                        return [2, 0];
                    case 3: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.buyFromMerchant = function (_a) {
        var _this = this;
        var player = _a.player, fromSlot = _a.fromSlot, toSlot = _a.toSlot, _b = _a.quantity, quantity = _b === void 0 ? 1 : _b;
        var _c = merchantItems[fromSlot - MERCHANT_SLOT_RANGE] || {}, amount = _c.amount, item = _c.item;
        if (!amount || !item || toSlot > INVENTORY_SLOT_COUNT - 1)
            return;
        if (!validateQuantity(quantity))
            return;
        var maxQuantity = Math.floor(player.gold / amount);
        if (quantity > maxQuantity) {
            return;
        }
        var totalAmount = amount * quantity;
        this.deductGold(player, { amount: totalAmount })
            .then(function () {
            _this.lootItems({ player: player, items: [{ item: item, quantity: quantity }], toSlot: toSlot });
            if (item === "barplatinum" || quantity > 10 || totalAmount >= 100000) {
                postMessageToDiscordModeratorMerchantChannel(":warning:**".concat(player.name, "** purchased ").concat(quantity, "x ").concat(item, " from merchant for ").concat(totalAmount).concat(EmojiMap.gold));
            }
            player.send(new Messages.MerchantLog({ item: item, quantity: quantity, amount: totalAmount, type: "buy" }).serialize());
        })
            .catch(function (err) {
            Sentry.captureException(err);
        });
    };
    DatabaseHandler.prototype.withdrawFromBank = function (_a) {
        var player = _a.player;
        return __awaiter(this, void 0, void 0, function () {
            var fromReply, inventory, slot, _b, rawAmount, amount, reply;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.client.hGet("u:" + player.name, "inventory")];
                    case 1:
                        fromReply = _c.sent();
                        inventory = JSON.parse(fromReply);
                        slot = inventory.findIndex(function (item) { return item && typeof item === "string" && item.startsWith("iou:"); });
                        if (!(slot <= -1)) return [3, 3];
                        return [4, this.banPlayerByIP({
                                player: player,
                                reason: "cheating",
                                message: "Tried to withdraw from bank without an IOU",
                            })];
                    case 2:
                        _c.sent();
                        return [2, false];
                    case 3:
                        _b = inventory[slot].split(":"), rawAmount = _b[1];
                        amount = Number(rawAmount);
                        if (!(amount && player.server.goldBank >= amount)) return [3, 7];
                        inventory[slot] = 0;
                        return [4, this.client.hSet("u:" + player.name, "inventory", JSON.stringify(inventory))];
                    case 4:
                        _c.sent();
                        this.sendMoveItem({ player: player, location: "inventory", data: inventory });
                        return [4, this.client.decrBy("goldBank", amount)];
                    case 5:
                        reply = _c.sent();
                        player.server.goldBank = Number(reply);
                        return [4, this.lootGold({
                                player: player,
                                amount: amount,
                            })];
                    case 6:
                        _c.sent();
                        postMessageToDiscordEventChannel("**".concat(player.name, "** just exchanged an IOU ").concat(EmojiMap.iou, " for **").concat(new Intl.NumberFormat("en-EN", {}).format(amount), "** gold ").concat(EmojiMap.gold, " "));
                        return [2, amount];
                    case 7: return [2, false];
                }
            });
        });
    };
    DatabaseHandler.prototype.sellToMerchant = function (_a) {
        var player = _a.player, fromSlot = _a.fromSlot, _b = _a.quantity, soldQuantity = _b === void 0 ? 1 : _b;
        return __awaiter(this, void 0, void 0, function () {
            var fromReply, fromItem, fromReplyParsed, amount, _c, item, rawLevel, level, isGoldExeeds100k, isFromReplyDone, _d, fromScroll, rawQuantity, fromQuantity;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (isNaN(fromSlot) || fromSlot >= INVENTORY_SLOT_COUNT)
                            return [2];
                        if (!validateQuantity(soldQuantity))
                            return [2];
                        return [4, this.client.hGet("u:" + player.name, "inventory")];
                    case 1:
                        fromReply = _e.sent();
                        fromReplyParsed = JSON.parse(fromReply);
                        fromItem = fromReplyParsed[fromSlot];
                        if (!fromItem)
                            return [2];
                        amount = getGoldAmountFromSoldItem({ item: fromItem, quantity: soldQuantity });
                        if (!amount)
                            return [2];
                        _c = fromItem.split(":"), item = _c[0], rawLevel = _c[1];
                        level = Number(rawLevel);
                        isGoldExeeds100k = false;
                        if (amount >= 100000) {
                            isGoldExeeds100k = true;
                        }
                        if (isGoldExeeds100k) {
                            postMessageToDiscordModeratorMerchantChannel(":warning: **".concat(player.name, "** sold ").concat(soldQuantity, "x ").concat(fromItem, " to merchant for ").concat(amount).concat(EmojiMap.gold));
                        }
                        else if (level >= 7 && !soldQuantity) {
                            postMessageToDiscordModeratorMerchantChannel("".concat(EmojiMap.press_f_to_pay_respects, " **").concat(player.name, "** sold ").concat(item, " **+").concat(level, "** ").concat(fromItem, " to merchant"));
                        }
                        isFromReplyDone = false;
                        if (Types.isQuantity(fromItem)) {
                            _d = fromItem.split(":"), fromScroll = _d[0], rawQuantity = _d[1];
                            fromQuantity = Number(rawQuantity);
                            if (soldQuantity > fromQuantity)
                                return [2];
                            if (fromQuantity - soldQuantity > 0) {
                                fromReplyParsed[fromSlot] = "".concat(fromScroll, ":").concat(fromQuantity - soldQuantity);
                                isFromReplyDone = true;
                            }
                        }
                        else {
                            if (soldQuantity > 1)
                                return [2];
                        }
                        if (!isFromReplyDone) {
                            fromReplyParsed[fromSlot] = 0;
                        }
                        return [4, this.client.hSet("u:" + player.name, "inventory", JSON.stringify(fromReplyParsed))];
                    case 2:
                        _e.sent();
                        return [4, this.lootGold({
                                player: player,
                                amount: amount,
                            })];
                    case 3:
                        _e.sent();
                        player.send(new Messages.MerchantLog({
                            item: fromItem,
                            quantity: soldQuantity,
                            amount: amount,
                            type: "sell",
                        }).serialize());
                        this.sendMoveItem({ player: player, location: "inventory", data: fromReplyParsed });
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.lootItems = function (_a) {
        var _this = this;
        var player = _a.player, items = _a.items, toSlot = _a.toSlot;
        player.dbWriteQueue.enqueue(function () {
            return new Promise(function (resolve, _reject) { return __awaiter(_this, void 0, void 0, function () {
                var reply, inventory;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.hGet("u:" + player.name, "inventory")];
                        case 1:
                            reply = _a.sent();
                            inventory = JSON.parse(reply);
                            items.forEach(function (rawItem) {
                                var item = rawItem.item, level = rawItem.level, quantity = rawItem.quantity, bonus = rawItem.bonus, skillOrSkin = rawItem.skill, socket = rawItem.socket;
                                var slotIndex = quantity ? inventory.findIndex(function (a) { return a && a.startsWith("".concat(item, ":")); }) : -1;
                                if (slotIndex > -1) {
                                    if (Types.isSingle(item)) {
                                        inventory[slotIndex] = "".concat(item, ":1");
                                    }
                                    else {
                                        var _a = inventory[slotIndex].split(":"), oldQuantity = _a[1];
                                        inventory[slotIndex] = "".concat(item, ":").concat(parseInt(oldQuantity) + parseInt(String(quantity)));
                                    }
                                }
                                else if (slotIndex === -1) {
                                    if (typeof toSlot === "number" && inventory[toSlot] === 0) {
                                        slotIndex = toSlot;
                                    }
                                    else {
                                        slotIndex = inventory === null || inventory === void 0 ? void 0 : inventory.indexOf(0);
                                    }
                                    if (slotIndex !== -1) {
                                        var levelQuantity = level || quantity;
                                        if (!levelQuantity && !Types.isJewel(item)) {
                                            throw new Error("Invalid item property ".concat(JSON.stringify({ rawItem: rawItem, playerName: player.name, inventory: inventory })));
                                        }
                                        var delimiter = Types.isJewel(item) ? "|" : ":";
                                        inventory[slotIndex] = [item, levelQuantity, bonus, socket, skillOrSkin]
                                            .filter(Boolean)
                                            .join(delimiter);
                                    }
                                    else if (player.hasParty()) {
                                    }
                                }
                            });
                            return [4, this.client.hSet("u:" + player.name, "inventory", JSON.stringify(inventory))];
                        case 2:
                            _a.sent();
                            player.send([Types.Messages.INVENTORY, inventory]);
                            resolve(true);
                            return [2];
                    }
                });
            }); });
        });
    };
    DatabaseHandler.prototype.moveItemsToInventory = function (player, panel) {
        if (panel === void 0) { panel = "upgrade"; }
        return __awaiter(this, void 0, void 0, function () {
            var rawInvetory, inventory, availableInventorySlots, data, reply, filteredUpgrade, items, quantityItem_1, areItemsLooted, hasQuantityItem, isValidReturnQuantityItem_1, hasInventoryQuantityItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.hGet("u:" + player.name, "inventory")];
                    case 1:
                        rawInvetory = _a.sent();
                        inventory = JSON.parse(rawInvetory).filter(function (i) { return i !== 0; });
                        availableInventorySlots = JSON.parse(rawInvetory).filter(function (i) { return i === 0; }).length;
                        return [4, this.client.hGet("u:" + player.name, panel)];
                    case 2:
                        reply = _a.sent();
                        data = JSON.parse(reply);
                        filteredUpgrade = data.filter(Boolean);
                        if (!filteredUpgrade.length) return [3, 4];
                        items = filteredUpgrade.reduce(function (acc, rawItem) {
                            var _a;
                            if (!rawItem)
                                return acc;
                            var delimiter = Types.isJewel(rawItem) ? "|" : ":";
                            var _b = rawItem.split(delimiter), item = _b[0], level = _b[1], bonus = _b[2], socket = _b[3], skill = _b[4];
                            var isQuantity = Types.isQuantity(item);
                            acc.push((_a = {
                                    item: item
                                },
                                _a[isQuantity ? "quantity" : "level"] = level,
                                _a.bonus = bonus,
                                _a.socket = socket,
                                _a.skill = skill,
                                _a));
                            return acc;
                        }, []);
                        quantityItem_1 = "";
                        areItemsLooted = false;
                        hasQuantityItem = items.some(function (_a) {
                            var item = _a.item;
                            if (Types.isQuantity(item)) {
                                quantityItem_1 = item;
                            }
                            return Types.isQuantity(item);
                        });
                        isValidReturnQuantityItem_1 = false;
                        hasInventoryQuantityItem = inventory.some(function (rawItem) {
                            var item = rawItem.split(":")[0];
                            if (item === quantityItem_1) {
                                isValidReturnQuantityItem_1 = true;
                            }
                            return isValidReturnQuantityItem_1;
                        });
                        if ((hasQuantityItem && quantityItem_1 && hasInventoryQuantityItem && isValidReturnQuantityItem_1) ||
                            availableInventorySlots > items.length) {
                            this.lootItems({ player: player, items: items });
                            areItemsLooted = true;
                        }
                        else {
                            if (panel === "upgrade" && availableInventorySlots < items.length) {
                                throw new Error("**".concat(player.name, "** not enought inventory slots to move items from upgrade panel"));
                            }
                        }
                        if (areItemsLooted) {
                            data = data.map(function () { return 0; });
                        }
                        return [4, this.client.hSet("u:" + player.name, panel, JSON.stringify(data))];
                    case 3:
                        _a.sent();
                        if (panel === "upgrade") {
                            player.send([Types.Messages.UPGRADE, data]);
                        }
                        else if (panel === "trade") {
                            player.send(new Messages.Trade(Types.Messages.TRADE_ACTIONS.PLAYER1_MOVE_ITEM, data).serialize());
                        }
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.upgradeItem = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var reply, isLucky7, isMagic8, upgrade, isBlessed, slotIndex, luckySlot, isLuckySlot, filteredUpgrade, isSuccess, recipe, random, transmuteSuccessRate, uniqueSuccessRate, isTransmuteSuccess, isUniqueSuccess, result, nextRuneRank, previousRuneRank, socketItem, isNewSocketItem, extractedItem, socketCount, weaponWithSkill, itemWithRandomSkill, socketPetCollarItem, _a, item, rawLevel, bonus, socket, skillOrSkin, scrollOrStone, isUnique, upgradedItem, isGuaranteedSuccess, level, upgradedLevel, generatedItem, _b, item, skin, _c, itemName, level, _d, item, level, skin, generatedItem, _e, itemName, bonus, socket, skill, isWorkingRecipe, generatedItem, isRecipe, isChestblue, isChestgreen, isChestpurple, isChristmasPresent, isChestdead, isChestred, item, uniqueChances, jewelLevel, kind, _f, itemName, level, quantity, bonus, socket, skill, delimiter, _g, item, skin, _h, itemName, level, bonus, socket;
            var _j, _k, _l, _m, _o, _p, _q, _r;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0: return [4, this.client.hGet("u:" + player.name, "upgrade")];
                    case 1:
                        reply = _s.sent();
                        isLucky7 = false;
                        isMagic8 = false;
                        upgrade = JSON.parse(reply);
                        if (upgrade[upgrade.length - 1] !== 0) {
                            player.send([Types.Messages.UPGRADE, upgrade]);
                            return [2];
                        }
                        isBlessed = false;
                        slotIndex = upgrade.findIndex(function (index) {
                            if (index) {
                                if (index.startsWith("scrollupgradeblessed") || index.startsWith("scrollupgradesacred")) {
                                    isBlessed = true;
                                }
                                return index.startsWith("scroll") || index.startsWith("stone");
                            }
                        });
                        luckySlot = randomInt(1, 9);
                        isLuckySlot = slotIndex === luckySlot;
                        filteredUpgrade = upgrade.filter(Boolean);
                        isSuccess = false;
                        recipe = null;
                        random = null;
                        transmuteSuccessRate = null;
                        uniqueSuccessRate = null;
                        isTransmuteSuccess = null;
                        isUniqueSuccess = null;
                        nextRuneRank = null;
                        previousRuneRank = null;
                        socketItem = null;
                        isNewSocketItem = false;
                        extractedItem = null;
                        socketCount = null;
                        weaponWithSkill = null;
                        itemWithRandomSkill = null;
                        socketPetCollarItem = null;
                        if (!(weaponWithSkill = isValidAddWeaponSkill(filteredUpgrade))) return [3, 2];
                        isSuccess = true;
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = weaponWithSkill;
                        player.broadcast(new Messages.AnvilUpgrade({ isSuccess: isSuccess }), false);
                        return [3, 19];
                    case 2:
                        if (!(weaponWithSkill = isValidUpgradeElementItems(filteredUpgrade))) return [3, 3];
                        isSuccess = !!weaponWithSkill.item;
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = weaponWithSkill.item;
                        player.broadcast(new Messages.AnvilUpgrade({ isSuccess: isSuccess }), false);
                        return [3, 19];
                    case 3:
                        if (!(itemWithRandomSkill = isValidUpgradeskillrandom(filteredUpgrade))) return [3, 4];
                        isSuccess = !!itemWithRandomSkill.item;
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = itemWithRandomSkill.item;
                        player.broadcast(new Messages.AnvilUpgrade({ isSuccess: isSuccess }), false);
                        return [3, 19];
                    case 4:
                        if (!isValidUpgradeItems(filteredUpgrade)) return [3, 5];
                        _a = filteredUpgrade[0].split(":"), item = _a[0], rawLevel = _a[1], bonus = _a[2], socket = _a[3], skillOrSkin = _a[4];
                        scrollOrStone = filteredUpgrade[1].split(":")[0];
                        isUnique = Types.isUnique(item, bonus);
                        upgradedItem = 0;
                        isGuaranteedSuccess = Types.isStone(scrollOrStone) && ["stonedragon", "stonehero"].includes(scrollOrStone);
                        (_j = isUpgradeSuccess({
                            level: rawLevel,
                            isLuckySlot: isLuckySlot,
                            isBlessed: isBlessed,
                            isGuaranteedSuccess: isGuaranteedSuccess,
                        }), isSuccess = _j.isSuccess, random = _j.random);
                        level = parseInt(rawLevel);
                        if (isSuccess) {
                            upgradedLevel = level + 1;
                            if (isGuaranteedSuccess) {
                                if (scrollOrStone === "stonedragon") {
                                    upgradedLevel = Types.StoneUpgrade.stonedragon;
                                }
                                else if (scrollOrStone === "stonehero") {
                                    upgradedLevel = Types.StoneUpgrade.stonehero;
                                }
                            }
                            upgradedItem = [item, upgradedLevel, bonus, socket, skillOrSkin].filter(Boolean).join(":");
                            isSuccess = true;
                            if (Types.isBaseHighClassItem(item) && upgradedLevel === 7) {
                                isLucky7 = true;
                            }
                            if (Types.isBaseLegendaryClassItem(item) && upgradedLevel === 8) {
                                isMagic8 = true;
                            }
                            if (upgradedLevel >= 8 || (isUnique && upgradedLevel >= 7)) {
                                this.logUpgrade({ player: player, item: upgradedItem, isSuccess: isSuccess, isLuckySlot: isLuckySlot });
                            }
                        }
                        else {
                            if (level >= 8) {
                                this.logUpgrade({ player: player, item: filteredUpgrade[0], isSuccess: false, isLuckySlot: isLuckySlot });
                            }
                        }
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = upgradedItem;
                        player.broadcast(new Messages.AnvilUpgrade({ isSuccess: isSuccess }), false);
                        return [3, 19];
                    case 5:
                        if (!(nextRuneRank = isValidUpgradeRunes(filteredUpgrade))) return [3, 6];
                        isSuccess = true;
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = "rune-".concat(Types.RuneList[nextRuneRank], ":1");
                        player.broadcast(new Messages.AnvilUpgrade({ isSuccess: isSuccess }), false);
                        return [3, 19];
                    case 6:
                        if (!(previousRuneRank = isValidDowngradeRune(filteredUpgrade))) return [3, 7];
                        isSuccess = true;
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = "rune-".concat(Types.RuneList[previousRuneRank - 1], ":1");
                        player.broadcast(new Messages.AnvilUpgrade({ isSuccess: isSuccess }), false);
                        return [3, 19];
                    case 7:
                        if (!(socketItem = isValidSocketItem(filteredUpgrade))) return [3, 8];
                        isSuccess = true;
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = socketItem;
                        this.logUpgrade({ player: player, item: socketItem, isSuccess: isSuccess, isRuneword: true });
                        player.broadcast(new Messages.AnvilUpgrade({ isRuneword: isSuccess }), false);
                        return [3, 19];
                    case 8:
                        if (!(socketPetCollarItem = isValidSocketPetCollar(filteredUpgrade))) return [3, 9];
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = socketPetCollarItem;
                        return [3, 19];
                    case 9:
                        if (!(result = isValidStoneSocket(filteredUpgrade, isLuckySlot))) return [3, 10];
                        isSuccess = true;
                        (socketItem = result.socketItem, extractedItem = result.extractedItem, socketCount = result.socketCount, isNewSocketItem = result.isNewSocketItem);
                        if (extractedItem) {
                            this.lootItems({ player: player, items: [extractedItem] });
                        }
                        if (socketCount === 6 && isNewSocketItem) {
                            this.logUpgrade({ player: player, item: socketItem, isSuccess: isSuccess, isLuckySlot: isLuckySlot, isNewSocketItem: isNewSocketItem });
                        }
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = socketItem;
                        player.broadcast(new Messages.AnvilUpgrade({ isSuccess: isSuccess }), false);
                        return [3, 19];
                    case 10:
                        if (!(result = isValidTransmutePet(filteredUpgrade))) return [3, 11];
                        isSuccess = randomInt(1, 100) !== 100;
                        generatedItem = 0;
                        _b = generateRandomPet(), item = _b.pet, skin = _b.skin;
                        _c = player.generateItem({
                            level: result.level,
                            kind: Types.getKindFromString(item),
                            skin: skin,
                            uniqueChances: isUniqueSuccess ? 100 : 0,
                            isLuckySlot: isLuckySlot,
                            bonus: result.bonus,
                            socket: result.socket,
                        }), itemName = _c.item, level = _c.level;
                        generatedItem = isSuccess ? [itemName, level, result.bonus, result.socket, skin].filter(Boolean).join(":") : 0;
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = generatedItem;
                        player.broadcast(new Messages.AnvilUpgrade({ isTransmute: isSuccess }), false);
                        return [3, 19];
                    case 11:
                        if (!(result = isValidTransmuteItems(filteredUpgrade))) return [3, 12];
                        _d = filteredUpgrade[0].split(":"), item = _d[0], level = _d[1], skin = _d[4];
                        generatedItem = 0;
                        (_k = getIsTransmuteSuccess(__assign(__assign({}, result), { isLuckySlot: isLuckySlot })), random = _k.random, transmuteSuccessRate = _k.transmuteSuccessRate, uniqueSuccessRate = _k.uniqueSuccessRate, isTransmuteSuccess = _k.isTransmuteSuccess, isUniqueSuccess = _k.isUniqueSuccess);
                        player.send(new Messages.AnvilOdds("You rolled ".concat(random).concat(transmuteSuccessRate ? ", the transmute success rate is ".concat(transmuteSuccessRate, "%") : "").concat(uniqueSuccessRate && uniqueSuccessRate !== 100 ? ", the unique success rate is ".concat(uniqueSuccessRate) : "", ". ").concat(isTransmuteSuccess || isUniqueSuccess ? "Success" : "Failure")).serialize());
                        if ((typeof isTransmuteSuccess === "boolean" && isTransmuteSuccess) ||
                            (typeof isTransmuteSuccess === "undefined" && isUniqueSuccess)) {
                            isSuccess = true;
                            _e = player.generateItem({
                                kind: Types.getKindFromString(item),
                                skin: skin,
                                uniqueChances: isUniqueSuccess ? 100 : 0,
                                isLuckySlot: isLuckySlot,
                            }), itemName = _e.item, bonus = _e.bonus, socket = _e.socket, skill = _e.skill;
                            generatedItem = [itemName, level, bonus, socket, skill || skin].filter(Boolean).join(":");
                        }
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = generatedItem;
                        player.broadcast(new Messages.AnvilUpgrade({ isTransmute: isSuccess }), false);
                        return [3, 19];
                    case 12:
                        recipe = isValidRecipe(filteredUpgrade);
                        isWorkingRecipe = false;
                        generatedItem = 0;
                        isRecipe = false;
                        isChestblue = false;
                        isChestgreen = false;
                        isChestpurple = false;
                        isChristmasPresent = false;
                        isChestdead = false;
                        isChestred = false;
                        if (!recipe) return [3, 16];
                        isSuccess = true;
                        if (!(recipe === "expansion2voucher")) return [3, 15];
                        isSuccess = !player.expansion2;
                        if (!isSuccess) return [3, 14];
                        isWorkingRecipe = true;
                        return [4, this.unlockExpansion2(player)];
                    case 13:
                        _s.sent();
                        this.lootItems({ player: player, items: [{ item: "scrollupgradelegendary", quantity: 60 }] });
                        postMessageToDiscordAnvilChannel("**".concat(player.name, "** consumed Lost Temple Expansion Voucher ").concat(EmojiMap.losttempleexpansionvoucher));
                        _s.label = 14;
                    case 14: return [3, 16];
                    case 15:
                        if (recipe === "cowLevel") {
                            if (!player.server.cowLevelClock) {
                                isWorkingRecipe = true;
                                isRecipe = true;
                                player.server.cowKingPlayerName = player.name;
                                player.server.startCowLevel();
                                if (filteredUpgrade.find(function (item) { return item.startsWith("wirtleg") && item.includes("[3,14]"); })) {
                                    player.server.cowKingHornDrop = true;
                                }
                            }
                        }
                        else if (recipe === "minotaurLevel") {
                            if (!player.server.minotaurLevelClock && !player.server.minotaurSpawnTimeout) {
                                isWorkingRecipe = true;
                                isRecipe = true;
                                player.server.minotaurPlayerName = player.name;
                                player.server.startMinotaurLevel();
                            }
                        }
                        else if (recipe === "chestblue" ||
                            recipe === "chestgreen" ||
                            recipe === "chestpurple" ||
                            recipe === "christmaspresent" ||
                            recipe === "chestdead" ||
                            recipe === "chestred") {
                            item = void 0;
                            uniqueChances = void 0;
                            jewelLevel = void 0;
                            try {
                                switch (recipe) {
                                    case "chestblue":
                                        isChestblue = true;
                                        (_l = generateBlueChestItem(), item = _l.item, uniqueChances = _l.uniqueChances, jewelLevel = _l.jewelLevel);
                                        break;
                                    case "chestgreen":
                                        isChestgreen = true;
                                        (_m = generateGreenChestItem(), item = _m.item, uniqueChances = _m.uniqueChances, jewelLevel = _m.jewelLevel);
                                        break;
                                    case "chestpurple":
                                        isChestpurple = true;
                                        (_o = generatePurpleChestItem(), item = _o.item, uniqueChances = _o.uniqueChances, jewelLevel = _o.jewelLevel);
                                        break;
                                    case "christmaspresent":
                                        isChristmasPresent = true;
                                        (_p = generateChristmasPresentItem(), item = _p.item, uniqueChances = _p.uniqueChances, jewelLevel = _p.jewelLevel);
                                        break;
                                    case "chestdead":
                                        isChestdead = true;
                                        (_q = generateDeadChestItem(), item = _q.item, uniqueChances = _q.uniqueChances, jewelLevel = _q.jewelLevel);
                                        break;
                                    case "chestred":
                                        isChestred = true;
                                        (_r = generateRedChestItem(), item = _r.item, uniqueChances = _r.uniqueChances, jewelLevel = _r.jewelLevel);
                                        break;
                                }
                                if (!item)
                                    return [2];
                                luckySlot = null;
                                isWorkingRecipe = true;
                                kind = Types.getKindFromString(item);
                                if (Types.isRune(kind)) {
                                    generatedItem = [item, 1].filter(Boolean).join(":");
                                }
                                else {
                                    _f = player.generateItem({ kind: kind, uniqueChances: uniqueChances, jewelLevel: jewelLevel }), itemName = _f.item, level = _f.level, quantity = _f.quantity, bonus = _f.bonus, socket = _f.socket, skill = _f.skill;
                                    delimiter = Types.isJewel(item) ? "|" : ":";
                                    generatedItem = [itemName, level, quantity, bonus, socket, skill].filter(Boolean).join(delimiter);
                                }
                            }
                            catch (err) {
                                Sentry.captureException(err, {
                                    extra: {
                                        player: player.name,
                                        recipe: recipe,
                                        item: item,
                                    },
                                });
                            }
                        }
                        else if (recipe === "powderquantum") {
                            isWorkingRecipe = true;
                            isRecipe = true;
                            generatedItem = "powderquantum:1";
                        }
                        else if (recipe === "petegg") {
                            isWorkingRecipe = true;
                            isRecipe = true;
                            _g = generateRandomPet(), item = _g.pet, skin = _g.skin;
                            _h = player.generateItem({
                                kind: Types.getKindFromString(item),
                                skin: skin,
                                uniqueChances: isUniqueSuccess ? 100 : 0,
                                isLuckySlot: isLuckySlot,
                            }), itemName = _h.item, level = _h.level, bonus = _h.bonus, socket = _h.socket;
                            generatedItem = [itemName, level, bonus, socket, skin].filter(Boolean).join(":");
                        }
                        _s.label = 16;
                    case 16:
                        if (!!isWorkingRecipe) return [3, 18];
                        return [4, this.moveItemsToInventory(player, "upgrade")];
                    case 17:
                        _s.sent();
                        return [3, 19];
                    case 18:
                        upgrade = upgrade.map(function () { return 0; });
                        upgrade[upgrade.length - 1] = generatedItem;
                        if (isRecipe) {
                            player.broadcast(new Messages.AnvilRecipe(recipe), false);
                        }
                        else if (isChestblue || isChestgreen || isChestpurple || isChristmasPresent || isChestdead || isChestred) {
                            player.broadcast(new Messages.AnvilUpgrade({
                                isChestblue: isChestblue,
                                isChestgreen: isChestgreen,
                                isChestpurple: isChestpurple,
                                isChristmasPresent: isChristmasPresent,
                                isChestdead: isChestdead,
                                isChestred: isChestred,
                            }), false);
                        }
                        _s.label = 19;
                    case 19:
                        player.send([Types.Messages.UPGRADE, upgrade, { luckySlot: luckySlot, isLucky7: isLucky7, isMagic8: isMagic8, isSuccess: isSuccess, recipe: recipe }]);
                        return [4, this.client.hSet("u:" + player.name, "upgrade", JSON.stringify(upgrade))];
                    case 20:
                        _s.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.foundAchievement = function (player, index) {
        return __awaiter(this, void 0, void 0, function () {
            var achievements, achievement, item, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Found Achievement: " + player.name + " " + index + 1);
                        return [4, this.client.hGet("u:" + player.name, "achievement")];
                    case 1:
                        achievements = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        achievement = JSON.parse(achievements);
                        if (achievement[index] === 1) {
                            return [2, false];
                        }
                        achievement[index] = 1;
                        achievement = JSON.stringify(achievement);
                        return [4, this.client.hSet("u:" + player.name, "achievement", achievement)];
                    case 3:
                        _a.sent();
                        if (!(index === ACHIEVEMENT_HERO_INDEX)) return [3, 5];
                        return [4, this.unlockExpansion1(player)];
                    case 4:
                        _a.sent();
                        player.connection.send({
                            type: Types.Messages.NOTIFICATION,
                            achievement: ACHIEVEMENT_NAMES[ACHIEVEMENT_HERO_INDEX],
                            message: "killed the Skeleton King!",
                        });
                        _a.label = 5;
                    case 5:
                        if (index === ACHIEVEMENT_BLACKSMITH_INDEX) {
                            return [2, true];
                        }
                        if (index === ACHIEVEMENT_DISCORD_INDEX) {
                            item = "scrollupgrademedium";
                            if (player.expansion2) {
                                item = "scrollupgradelegendary";
                            }
                            else if (player.expansion1) {
                                item = "scrollupgradehigh";
                            }
                            this.lootItems({ player: player, items: [{ item: item, quantity: 5 }] });
                            return [2, true];
                        }
                        if ([
                            ACHIEVEMENT_NFT_INDEX,
                            ACHIEVEMENT_WING_INDEX,
                            ACHIEVEMENT_CRYSTAL_INDEX,
                            ACHIEVEMENT_ANTIDOTE_INDEX,
                            ACHIEVEMENT_UNBREAKABLE_INDEX,
                            ACHIEVEMENT_CYCLOP_INDEX,
                            ACHIEVEMENT_TEMPLAR_INDEX,
                            ACHIEVEMENT_BOO_INDEX,
                            ACHIEVEMENT_ARCHMAGE_INDEX,
                            ACHIEVEMENT_SPECTRAL_INDEX,
                            ACHIEVEMENT_VIKING_INDEX,
                            ACHIEVEMENT_BULLSEYE_INDEX,
                        ].includes(index)) {
                            if (index === ACHIEVEMENT_NFT_INDEX) {
                                player.hasNft = true;
                            }
                            else if (index === ACHIEVEMENT_WING_INDEX) {
                                player.hasWing = true;
                            }
                            else if (index === ACHIEVEMENT_CRYSTAL_INDEX) {
                                player.hasCrystal = true;
                            }
                            this.lootItems({ player: player, items: [{ item: "scrollupgradelegendary", quantity: 5 }] });
                        }
                        else if ([ACHIEVEMENT_MINI_BOSS_INDEX, ACHIEVEMENT_SACRED_INDEX].includes(index)) {
                            this.lootItems({ player: player, items: [{ item: "scrollupgradesacred", quantity: 5 }] });
                        }
                        return [2, true];
                    case 6:
                        err_6 = _a.sent();
                        Sentry.captureException(err_6);
                        return [2, false];
                    case 7: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.foundWaypoint = function (name, index) {
        return __awaiter(this, void 0, void 0, function () {
            var rawWaypoints, waypoints, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Found Waypoint: " + name + " " + index);
                        return [4, this.client.hGet("u:" + name, "waypoints")];
                    case 1:
                        rawWaypoints = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        waypoints = JSON.parse(rawWaypoints);
                        waypoints[index] = 1;
                        waypoints = JSON.stringify(waypoints);
                        return [4, this.client.hSet("u:" + name, "waypoints", waypoints)];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        err_7 = _a.sent();
                        Sentry.captureException(err_7);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.unlockExpansion1 = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var rawWaypoints, waypoints, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (player.expansion1) {
                            return [2];
                        }
                        player.expansion1 = true;
                        console.info("Unlock Expansion1: " + player.name);
                        return [4, this.client.hSet("u:" + player.name, "expansion1", 1)];
                    case 1:
                        _a.sent();
                        return [4, this.client.hGet("u:" + player.name, "waypoints")];
                    case 2:
                        rawWaypoints = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        waypoints = JSON.parse(rawWaypoints);
                        waypoints[3] = 1;
                        waypoints[4] = 0;
                        waypoints[5] = 0;
                        player.send([Types.Messages.WAYPOINTS_UPDATE, waypoints]);
                        waypoints = JSON.stringify(waypoints);
                        return [4, this.client.hSet("u:" + player.name, "waypoints", waypoints)];
                    case 4:
                        _a.sent();
                        return [3, 6];
                    case 5:
                        err_8 = _a.sent();
                        Sentry.captureException(err_8);
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.unlockExpansion2 = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var rawWaypoints, waypoints;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!player.expansion2) {
                            player.expansion2 = true;
                        }
                        console.info("Unlock Expansion2: " + player.name);
                        return [4, this.client.hSet("u:" + player.name, "expansion2", 1)];
                    case 1:
                        _a.sent();
                        return [4, this.client.hGet("u:" + player.name, "waypoints")];
                    case 2:
                        rawWaypoints = _a.sent();
                        waypoints = JSON.parse(rawWaypoints);
                        waypoints[6] = 1;
                        waypoints[7] = 0;
                        waypoints[8] = 0;
                        waypoints[9] = 0;
                        player.send([Types.Messages.WAYPOINTS_UPDATE, waypoints]);
                        waypoints = JSON.stringify(waypoints);
                        return [4, this.client.hSet("u:" + player.name, "waypoints", waypoints)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.foundNanoPotion = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var nanoPotions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Found NanoPotion: " + name);
                        return [4, this.client.hGet("u:" + name, "nanoPotions")];
                    case 1:
                        nanoPotions = _a.sent();
                        nanoPotions = nanoPotions += 1;
                        return [4, this.client.hSet("u:" + name, "nanoPotions", nanoPotions)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.foundGem = function (name, index) {
        return __awaiter(this, void 0, void 0, function () {
            var rawGems, gems, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Found Gem: " + name + " " + index + 1);
                        return [4, this.client.hGet("u:" + name, "gems")];
                    case 1:
                        rawGems = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        gems = rawGems ? JSON.parse(rawGems) : new Array(GEM_COUNT).fill(0);
                        gems[index] = 1;
                        gems = JSON.stringify(rawGems);
                        return [4, this.client.hSet("u:" + name, "gems", gems)];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        err_9 = _a.sent();
                        Sentry.captureException(err_9);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.foundArtifact = function (name, index) {
        return __awaiter(this, void 0, void 0, function () {
            var rawArtifact, artifact;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Found Artifact: " + name + " " + index + 1);
                        return [4, this.client.hGet("u:" + name, "artifact")];
                    case 1:
                        rawArtifact = _a.sent();
                        artifact = rawArtifact ? JSON.parse(rawArtifact) : new Array(ARTIFACT_COUNT).fill(0);
                        artifact[index] = 1;
                        artifact = JSON.stringify(artifact);
                        return [4, this.client.hSet("u:" + name, "artifact", artifact)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.useInventoryItem = function (player, item) {
        return __awaiter(this, void 0, void 0, function () {
            var rawInventory, inventory, slotIndex, _a, rawQuantity, quantity;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.client.hGet("u:" + player.name, "inventory")];
                    case 1:
                        rawInventory = _b.sent();
                        inventory = JSON.parse(rawInventory);
                        slotIndex = inventory.findIndex(function (rawItem) { return typeof rawItem === "string" && rawItem.startsWith(item); });
                        if (!(slotIndex !== -1)) return [3, 3];
                        _a = (inventory[slotIndex] || "").split(":"), rawQuantity = _a[1];
                        quantity = parseInt(rawQuantity);
                        if (quantity > 1) {
                            inventory[slotIndex] = "".concat(item, ":").concat(quantity - 1);
                        }
                        else {
                            inventory[slotIndex] = 0;
                        }
                        player.send([Types.Messages.INVENTORY, inventory]);
                        return [4, this.client.hSet("u:" + player.name, "inventory", JSON.stringify(inventory))];
                    case 2:
                        _b.sent();
                        return [2, true];
                    case 3: return [2, false];
                }
            });
        });
    };
    DatabaseHandler.prototype.useWeaponItem = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.hSet("u:" + player.name, "weapon", "dagger:1")];
                    case 1:
                        _a.sent();
                        this.sendMoveItem({ player: player, location: "weapon", data: "" });
                        return [2, true];
                }
            });
        });
    };
    DatabaseHandler.prototype.passwordIsRequired = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var userKey, password, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userKey = "u:" + player.name;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.client.hGet(userKey, "password")];
                    case 2:
                        password = _a.sent();
                        if (password) {
                            player.connection.sendUTF8("passwordlogin");
                            return [2, true];
                        }
                        return [2, false];
                    case 3:
                        err_10 = _a.sent();
                        Sentry.captureException(err_10);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.linkPlayerToDiscordUser = function (player, secret) {
        return __awaiter(this, void 0, void 0, function () {
            var discordUserId, playerName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (secret.length !== 6)
                            return [2];
                        return [4, this.client.get("discord_secret:".concat(secret))];
                    case 1:
                        discordUserId = _a.sent();
                        if (!discordUserId)
                            return [2];
                        return [4, this.client.get("discord:".concat(discordUserId))];
                    case 2:
                        playerName = _a.sent();
                        if (playerName)
                            return [2];
                        return [4, this.client.set("discord:".concat(discordUserId), player.name)];
                    case 3:
                        _a.sent();
                        return [4, this.client.del("discord_secret:".concat(secret))];
                    case 4:
                        _a.sent();
                        return [4, this.client.hSet("u:" + player.name, "discordId", discordUserId)];
                    case 5:
                        _a.sent();
                        return [4, this.foundAchievement(player, ACHIEVEMENT_DISCORD_INDEX).then(function () {
                                player.connection.send({
                                    type: Types.Messages.NOTIFICATION,
                                    achievement: ACHIEVEMENT_NAMES[ACHIEVEMENT_DISCORD_INDEX],
                                    message: "You are now linked with your Discord account!",
                                });
                                discordClient.users.fetch(discordUserId).then(function (user) {
                                    user.send("You linked ".concat(player.name, " to your Discord account!"));
                                });
                            })];
                    case 6:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.isPlayerExist = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var userKey, isPlayerExist, _a, createdAt, weapon;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userKey = "u:" + player.name;
                        console.log("~~~~~userKey", userKey);
                        return [4, this.client.multi().hGet(userKey, "createdAt").hGet(userKey, "weapon").exec()];
                    case 1:
                        _a = _b.sent(), createdAt = _a[0], weapon = _a[1];
                        console.log("~~~~~createdAt", createdAt);
                        console.log("~~~~~weapon", weapon);
                        isPlayerExist = createdAt || weapon;
                        console.log("~~~~~isPlayerExist", isPlayerExist);
                        if (isPlayerExist) {
                            player.connection.sendUTF8("userexists");
                            player.connection.close("Username not available: " + player.name);
                            console.log("~~~~10");
                            return [2, true];
                        }
                        return [2, false];
                }
            });
        });
    };
    DatabaseHandler.prototype.passwordLoginOrCreate = function (player, loginPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var userKey, password, isValid, salt, passwordHash, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userKey = "u:" + player.name;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        return [4, this.client.hGet(userKey, "password")];
                    case 2:
                        password = _a.sent();
                        isValid = false;
                        if (!!password) return [3, 6];
                        return [4, bcrypt.genSalt(10)];
                    case 3:
                        salt = _a.sent();
                        return [4, bcrypt.hash(loginPassword, salt)];
                    case 4:
                        passwordHash = _a.sent();
                        return [4, this.client.hSet(userKey, "password", passwordHash)];
                    case 5:
                        _a.sent();
                        isValid = true;
                        player.isPasswordValid = isValid;
                        return [3, 8];
                    case 6: return [4, bcrypt.compare(loginPassword, password)];
                    case 7:
                        isValid = _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!isValid) {
                            player.connection.sendUTF8("passwordinvalid");
                        }
                        return [2, isValid];
                    case 9:
                        err_11 = _a.sent();
                        Sentry.captureException(err_11);
                        return [3, 10];
                    case 10: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.setCheckpoint = function (name, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Set Check Point: " + name + " " + x + " " + y);
                        return [4, this.client.hSet("u:" + name, "x", x)];
                    case 1:
                        _a.sent();
                        return [4, this.client.hSet("u:" + name, "y", y)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.setDepositAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.set("deposit_account_count", 1, { NX: true })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.createDepositAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queue.enqueue(function () {
                            return new Promise(function (resolve, _reject) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, this.client.incr("deposit_account_count", function (_err, reply) {
                                                resolve(reply);
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            }); });
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    DatabaseHandler.prototype.settlePurchase = function (_a) {
        var player = _a.player, account = _a.account, amount = _a.amount, hash = _a.hash, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var soldStoreItem, bonus, now, err_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        soldStoreItem = StoreItems.find(function (_a) {
                            var storeItemId = _a.id;
                            return storeItemId === id;
                        });
                        if (!(id === Types.Store.EXPANSION1)) return [3, 2];
                        return [4, this.unlockExpansion1(player)];
                    case 1:
                        _b.sent();
                        this.lootItems({ player: player, items: [{ item: "scrollupgradehigh", quantity: 10 }] });
                        _b.label = 2;
                    case 2:
                        if (!(id === Types.Store.EXPANSION2)) return [3, 6];
                        if (!!player.expansion2) return [3, 4];
                        return [4, this.unlockExpansion2(player)];
                    case 3:
                        _b.sent();
                        this.lootItems({ player: player, items: [{ item: "scrollupgradelegendary", quantity: 60 }] });
                        return [3, 5];
                    case 4:
                        this.lootItems({ player: player, items: [{ item: "expansion2voucher", quantity: 1 }] });
                        this.lootItems({ player: player, items: [{ item: "scrollupgradelegendary", quantity: 60 }] });
                        _b.label = 5;
                    case 5: return [3, 7];
                    case 6:
                        if (id === Types.Store.SCROLLUPGRADEBLESSED) {
                            this.lootItems({ player: player, items: [{ item: "scrollupgradeblessed", quantity: 5 }] });
                        }
                        else if (id === Types.Store.SCROLLUPGRADEHIGH) {
                            this.lootItems({ player: player, items: [{ item: "scrollupgradehigh", quantity: 10 }] });
                        }
                        else if (id === Types.Store.SCROLLUPGRADEMEDIUM) {
                            this.lootItems({ player: player, items: [{ item: "scrollupgrademedium", quantity: 10 }] });
                        }
                        else if (id === Types.Store.CAPE) {
                            bonus = player.generateRandomCapeBonus();
                            this.lootItems({
                                player: player,
                                items: [{ item: "cape", level: 1, bonus: JSON.stringify(bonus.sort(function (a, b) { return a - b; })) }],
                            });
                        }
                        else if (id === Types.Store.SCROLLUPGRADELEGENDARY) {
                            this.lootItems({ player: player, items: [{ item: "scrollupgradelegendary", quantity: 60 }] });
                        }
                        else if (id === Types.Store.SCROLLUPGRADESACRED) {
                            this.lootItems({ player: player, items: [{ item: "scrollupgradesacred", quantity: 10 }] });
                        }
                        else if (id === Types.Store.SCROLLTRANSMUTE) {
                            this.lootItems({ player: player, items: [{ item: "scrolltransmute", quantity: 10 }] });
                        }
                        else if (id === Types.Store.STONESOCKET) {
                            this.lootItems({ player: player, items: [{ item: "stonesocket", quantity: 10 }] });
                        }
                        else if (id === Types.Store.STONEDRAGON) {
                            this.lootItems({ player: player, items: [{ item: "stonedragon", quantity: 1 }] });
                        }
                        else if (id === Types.Store.STONEHERO) {
                            this.lootItems({ player: player, items: [{ item: "stonehero", quantity: 1 }] });
                        }
                        else if (id === Types.Store.PET) {
                            this.lootItems({ player: player, items: [{ item: Types.getKindAsString(Types.Entities.PETEGG), level: 1 }] });
                        }
                        else {
                            throw new Error("Invalid purchase id");
                        }
                        _b.label = 7;
                    case 7:
                        player.send([Types.Messages.PURCHASE_COMPLETED, { hash: hash, id: id }]);
                        now = Date.now();
                        return [4, this.client.zadd("purchase", now, JSON.stringify({
                                player: player.name,
                                network: player.network,
                                account: account,
                                hash: hash,
                                id: id,
                                amount: amount,
                                depositAccountIndex: player.depositAccountIndex,
                            }))];
                    case 8:
                        _b.sent();
                        postMessageToDiscordPurchaseChannel("**".concat(player.name, "** purchased \"ID:").concat(id, "\":\"").concat(soldStoreItem.name, "\" for ").concat(amount, " using deposit account ").concat(account));
                        return [3, 10];
                    case 9:
                        err_12 = _b.sent();
                        player.send([
                            Types.Messages.PURCHASE_ERROR,
                            {
                                message: "An error happened while completing your purchase, contact the game admin to receive your purchase.",
                            },
                        ]);
                        Sentry.captureException(err_12, { extra: { account: account, amount: amount, hash: hash, id: id } });
                        return [3, 10];
                    case 10: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.logUpgrade = function (_a) {
        var _b;
        var player = _a.player, item = _a.item, isSuccess = _a.isSuccess, isLuckySlot = _a.isLuckySlot, isRuneword = _a.isRuneword, _c = _a.isNewSocketItem, isNewSocketItem = _c === void 0 ? false : _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, itemName, rawLevel, bonus, rawSocket, level, socket, isUnique, message, runeword, wordSocket, output, fire, isWeapon, isHelm, isArmor, isShield, type, EmojiRunes, err_13;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _d = item.split(":"), itemName = _d[0], rawLevel = _d[1], bonus = _d[2], rawSocket = _d[3];
                        level = parseInt(rawLevel);
                        if (!(isSuccess || level >= 8)) return [3, 6];
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 5, , 6]);
                        socket = toArray(rawSocket);
                        isUnique = Types.isUnique(itemName, bonus);
                        message = "";
                        runeword = "";
                        wordSocket = "";
                        output = kinds[itemName][2];
                        fire = level >= 8 ? EmojiMap.firepurple : EmojiMap.fire;
                        if (!isUnique && isRuneword) {
                            if (socket.findIndex(function (s) { return s === 0 || "".concat(s).startsWith("jewel"); }) !== -1) {
                                return [2];
                            }
                            else {
                                isWeapon = Types.isWeapon(itemName);
                                isHelm = Types.isHelm(itemName);
                                isArmor = Types.isArmor(itemName);
                                isShield = Types.isShield(itemName);
                                type = null;
                                if (isWeapon) {
                                    type = "weapon";
                                }
                                else if (isHelm) {
                                    type = "helm";
                                }
                                else if (isArmor) {
                                    type = "armor";
                                }
                                else if (isShield) {
                                    type = "shield";
                                }
                                (_e = getRunewordBonus({ isUnique: isUnique, socket: socket, type: type }), runeword = _e.runeword, wordSocket = _e.wordSocket);
                            }
                        }
                        else if (isUnique) {
                            output =
                                ((_b = Types.itemUniqueMap[itemName]) === null || _b === void 0 ? void 0 : _b[0]) ||
                                    "".concat([
                                        "ringbronze",
                                        "ringsilver",
                                        "ringgold",
                                        "ringplatinum",
                                        "amuletsilver",
                                        "amuletgold",
                                        "amuletplatinum",
                                    ].includes(itemName) || itemName.startsWith("pet")
                                        ? "Unique "
                                        : "").concat(output);
                        }
                        if (isRuneword && !runeword) {
                            return [2];
                        }
                        if (!runeword) return [3, 3];
                        fire = EmojiMap.fireblue;
                        EmojiRunes = wordSocket
                            .split("-")
                            .map(function (rune) { return EmojiMap["rune-".concat(rune)]; })
                            .join("");
                        message = "".concat(player.name, " forged **").concat(runeword, "** runeword (").concat(EmojiRunes, ") in a **+").concat(level, "** ").concat(output);
                        return [4, this.foundAchievement(player, ACHIEVEMENT_BLACKSMITH_INDEX).then(function () {
                                player.connection.send({
                                    type: Types.Messages.NOTIFICATION,
                                    achievement: ACHIEVEMENT_NAMES[ACHIEVEMENT_BLACKSMITH_INDEX],
                                    message: "You've forged a runeword!",
                                });
                            })];
                    case 2:
                        _f.sent();
                        return [3, 4];
                    case 3:
                        if ((socket === null || socket === void 0 ? void 0 : socket.length) === 6 && level >= 7 && isNewSocketItem) {
                            message = "".concat(player.name, " added **6 sockets** to a **+").concat(level, "** ").concat(output);
                        }
                        else {
                            if (level >= 7) {
                                if (level >= 7 && isSuccess) {
                                    message = "**".concat(player.name, "** upgraded a **+").concat(level, "** ").concat(output);
                                }
                                else if (level >= 8 && isSuccess) {
                                    message = "**".concat(player.name, "** upgraded a **+").concat(level, "** ").concat(output, " ").concat(fire, " ").concat(fire, " ").concat(fire, " ").concat(fire, " ").concat(fire);
                                }
                                else {
                                    message = "".concat(EmojiMap.press_f_to_pay_respects, " **").concat(player.name, "** burned a **+").concat(level, "** ").concat(output);
                                }
                            }
                            if (level === 10 && isSuccess) {
                                message = "".concat(EmojiMap.impossibru, " ").concat(EmojiMap.impossibru, "! **").concat(player.name, "** BROKE the anvil & upgraded a **+").concat(level, "** ").concat(output, " ").concat(fire, " ").concat(fire);
                            }
                        }
                        _f.label = 4;
                    case 4:
                        if (!message) {
                            message = "**".concat(player.name, "**");
                        }
                        postMessageToDiscordAnvilChannel("".concat(message).concat(isLuckySlot ? " with the lucky slot 🍀" : "", " ").concat(fire));
                        return [3, 6];
                    case 5:
                        err_13 = _f.sent();
                        Sentry.captureException(err_13);
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.logLoot = function (_a) {
        var player = _a.player, item = _a.item;
        return __awaiter(this, void 0, void 0, function () {
            var now;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        now = Date.now();
                        return [4, this.client.zAdd("loot", now, JSON.stringify({ player: player.name, item: item }))];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    DatabaseHandler.prototype.logEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var now;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Date.now();
                        return [4, this.client.zAdd("event", now, JSON.stringify(event))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return DatabaseHandler;
}());
export default DatabaseHandler;
