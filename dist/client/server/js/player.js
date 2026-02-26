var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
import CryptoJS from "crypto-js";
import * as _ from "lodash";
import { kinds, petKindToPetMap, Types } from "../../shared/js/gametypes";
import { defaultSettings } from "../../shared/js/settings";
import { ACHIEVEMENT_CRYSTAL_INDEX, ACHIEVEMENT_GRIMOIRE_INDEX, ACHIEVEMENT_HERO_INDEX, ACHIEVEMENT_NFT_INDEX, ACHIEVEMENT_OBELISK_INDEX, ACHIEVEMENT_WING_INDEX, } from "../../shared/js/types/achievements";
import { curseDurationMap } from "../../shared/js/types/curse";
import { expForLevel } from "../../shared/js/types/experience";
import { getEntityLocation, isExpansion1Location, isExpansion2Location, isLocationOKWithExpansionLocation, } from "../../shared/js/utils";
import { isValidAccountAddress, toArray, toDb, toNumber, validateQuantity, } from "../../shared/js/utils";
import { getisValidMinLevelLocation, hasMoreThanPercentCaps, MIN_SKELETON_KING_LEVEL, replaceLetters, } from "../../shared/js/utils";
import Character from "./character";
import Chest from "./chest";
import { EmojiMap, postMessageToDiscordChatChannel, postMessageToDiscordEventChannel, postMessageToDiscordModeratorDebugChannel, postMessageToDiscordPayoutsChannel, postMessageToModeratorSupportChannel, postMessageToSupportChannel, } from "./discord";
import FormatChecker from "./format";
import Formulas from "./formulas";
import Messages from "./message";
import Npc from "./npc";
import { enqueueSendPayout } from "./payout";
import Pet from "./pet";
import { PromiseQueue } from "./promise-queue";
import { Sentry } from "./sentry";
import { purchase } from "./store/purchase";
import { store } from "./store/store";
import { getClassicMaxPayout, getClassicPayout, getRandomAttackSkill, getRandomDefenseSkill, getRandomSockets, random, randomInt, randomOrientation, rawToRai, sanitize, } from "./utils";
var MIN_TIME = 1000 * 60 * 15;
var MAX_EXP = expForLevel[expForLevel.length - 1];
var NODE_ENV = process.env.NODE_ENV;
var payoutIndex = 0;
var ADMINS = [
    "oldschooler",
    "HeroOfNano",
    "Dyllux",
    "CelioSevii",
    "xDulfinz",
    "bruin",
    "bread duck",
    "Thedd",
    "vikramr",
    "Crimson Bean",
];
var SUPER_ADMINS = ["running-coder"];
var badWords = [
    "nigger",
    "nig",
    "shut",
    "shut up",
    "cumslut",
    "shutup",
    "pwd",
    "psword",
    "pswerd",
    "neger",
    "niger",
    "niggers",
    "nigga",
    "niggas",
    "niga",
    "fucker",
    "fucked",
    "fucking",
    "fucks",
    "fuck you",
    "fuck",
    "fvck",
    "fvk",
    "sucker",
    "cunt",
    "whore",
    "asshole",
    "bitch",
    "bitches",
    "fag",
    "faggot",
    "cum",
    "cummed",
    "hitler",
    "dick",
    "penis",
    "cock",
    "butt",
    "ass",
    "stupid",
    "jizz",
    "balls",
    "testicule",
    "boobs",
    "vagina",
    "gay",
    "pedo",
    "child",
    "abuse",
    "anus",
    "anal",
    "stfu",
    "slut",
    "your mom",
    "lick",
    "shitty",
    "shit",
    "rape",
    "murder",
    "loser",
    "slave",
    "pussy",
    "bitch",
    "intercourse",
    "Deez",
    "nutz",
    "rapist",
    "porn",
    "negro",
    "motherfucker",
    "sex",
    "卐",
    "hail",
    "cocksuckers",
];
var replacedWords = __spreadArray([], badWords, true).map(replaceLetters);
export var CHATBAN_PATTERNS_WARNING = new RegExp("\\b(".concat(replacedWords.join("|"), ")\\b"), "gi");
export var CHATBAN_PATTERNS = new RegExp("\\b(".concat(replacedWords.join("|"), ")\\b"), "gi");
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(connection, worldServer, databaseHandler) {
        var _this = _super.call(this, connection.id, "player", Types.Entities.WARRIOR) || this;
        _this.unregisterMinotaurDamage = _.debounce(function () {
            _this.minotaurDamage = 0;
        }, 30000);
        _this.unregisterButcherDamage = _.debounce(function () {
            _this.butcherDamage = 0;
        }, 30000);
        _this.unregisterDeathAngelDamage = _.debounce(function () {
            _this.deathAngelDamage = 0;
        }, 30000);
        var self = _this;
        purchase["nano"].databaseHandler = databaseHandler;
        purchase["ban"].databaseHandler = databaseHandler;
        _this.databaseHandler = databaseHandler;
        _this.server = worldServer;
        _this.connection = connection;
        _this.hasEnteredGame = false;
        _this.isDead = false;
        _this.network = null;
        _this.haters = {};
        _this.lastCheckpoint = null;
        _this.formatChecker = new FormatChecker();
        _this.bannedTime = 0;
        _this.banUseTime = 0;
        _this.experience = 0;
        _this.level = 0;
        _this.setLevel = {};
        _this.lastWorldChatMinutes = 99;
        _this.auras = [];
        _this.freezeChanceLevel = 0;
        _this.minotaurDamage = 0;
        _this.butcherDamage = 0;
        _this.deathAngelDamage = 0;
        _this.resetBonus();
        _this.resetPartyBonus();
        _this.resetSkill();
        _this.resetCurse();
        _this.inventory = [];
        _this.inventoryCount = [];
        _this.achievement = [];
        _this.hasRequestedBossPayout = false;
        _this.hasWallet = false;
        _this.expansion1 = false;
        _this.expansion2 = false;
        _this.depositAccount = null;
        _this.chatBanEndTime = 0;
        _this.hash = null;
        _this.isHurtByTrap = false;
        _this.hasGrimoire = false;
        _this.hasObelisk = false;
        _this.hasNft = false;
        _this.hasWing = false;
        _this.hasCrystal = false;
        _this.isChatbanWarned = false;
        _this.settings = defaultSettings;
        _this.ip = connection._connection.handshake.headers["cf-connecting-ip"];
        _this.canChat = true;
        _this.dbWriteQueue = new PromiseQueue();
        _this.lastHashCheckTimestamp = Date.now();
        _this.connection.listen(function (rawMessage) { return __awaiter(_this, void 0, void 0, function () {
            var message, clientAction, params, action, params_1, timestamp, reason, banMessage, ip, admin, playerName, name, account, password, network, newAccount, newNetwork, msg, hashighPercentCaps, entity, emoji, playerLocation, lever, lever, leverDeathAngel, leverLeft, leverRight, playerName, secret, _a, playerName, reason, duration, banMessage, isIPBan, isChatBan, until, bannedPlayer, x, y, playerLocation, x, y, item, mob_1, playerLocation, mobLocation, hash, isValidHash, mob, playerLocation, mobLocation, mob, playerLocation, mobLocation, attackSpeed, duration, isCritical, resistances, _b, dmg, attackDamage, elementDamage, freezeChance, isFrozen, drainLife, defense, isBlocked, pierceDamage, mob, dmg, duration, spell, caster, magicStone, lever, altarId, altarId, handsId, trapId, trapId, trap, statueId, mobId, x, y, entity, targetId, item, kind, soulStonePlayer, index, index, amount, amount, amount, player, isUnique, isSuperior, jewelLevel, generatedItem, runeName, player, isLooterInTown, isStoneTeleport, isTeleport, x, y, orientation_1, isItemConsumed, isNear, playerToTeleportTo, playerToTeleportToLocation, errorMessage, _c, locationErrorMessage, isValid, deathAngelLevel, deathAngelDoor, deathAngel, possibleTeleportCoords, position, date, check, isClassicPayout, playerLocation, until, banMessage, amount, maxAmount, raiPayoutAmount, isPayoutEnqueued, response, _d, _e, err, responseMsg, payeoutHash, maxPayoutOutput, messageToPayoutsChannel, chest, checkpoint, quantity, panel, amount, from, to, tradeInstance, amount, index, _f, _g, _h, _j, _k, index, items, isWorldPartyUpdate, party, party, party, playerToInvite, playerToRemove, playerToTradeWith, playerToTradeWith, playerToTradeWith, fromSlot, toSlot, quantity, fromSlot, quantity, slot, mobId, isAttackSkill, skill, shouldBroadcast, level, attackedMob, mobResistances, mobResistance, _l, min, max, dmg, originalTimeout, timeout, percent, healAmount, healthDiff, percent, percent, originalTimeout, timeout;
            var _m, _o, _p, _q;
            var _this = this;
            var _r;
            var _s, _t, _u, _v, _w, _x, _y;
            return __generator(this, function (_z) {
                switch (_z.label) {
                    case 0:
                        message = this.verifySignature(rawMessage);
                        clientAction = message.action, params = message.params;
                        action = parseInt(clientAction);
                        if (action === Types.Messages.BAN_PLAYER) {
                            databaseHandler.banPlayerByIP({
                                player: self,
                                reason: "cheating",
                                message: "invalid websocket message",
                            });
                            return [2];
                        }
                        if (!this.formatChecker.check({ action: action, message: message, params: params })) {
                            Sentry.captureException(new Error("FormatChecker failed for player ".concat(self.name, " for: ").concat(JSON.stringify(message))), {
                                user: {
                                    username: self.name,
                                },
                                extra: { message: message, action: action },
                            });
                            self.connection.close("Invalid " + Types.getMessageTypeAsString(action) + " message format: ", message);
                            return [2];
                        }
                        if (!self.hasEnteredGame && action !== Types.Messages.CREATE && action !== Types.Messages.LOGIN) {
                            self.connection.close("Invalid handshake message: " + message);
                            return [2];
                        }
                        if (self.hasEnteredGame &&
                            !self.isDead &&
                            (action === Types.Messages.CREATE || action === Types.Messages.LOGIN)) {
                            self.connection.close("Cannot initiate handshake twice: " + message);
                            return [2];
                        }
                        if (!(action === Types.Messages.CREATE || action === Types.Messages.LOGIN)) return [3, 10];
                        if (NODE_ENV === "production" && !self.ip) {
                            self.connection.sendUTF8("invalidconnection");
                            self.connection.close("Unable to get IP.");
                            return [2];
                        }
                        params_1 = message.params;
                        timestamp = void 0;
                        reason = void 0;
                        banMessage = void 0;
                        ip = void 0;
                        admin = void 0;
                        playerName = void 0;
                        name = sanitize(params_1[0]);
                        account = sanitize(params_1[1]);
                        password = sanitize(params_1[2]);
                        network = ((account || "").split("_") || null)[0];
                        return [4, databaseHandler.checkIsBannedByIP(self)];
                    case 1:
                        (_m = _z.sent(), playerName = _m.playerName, timestamp = _m.timestamp, reason = _m.reason, banMessage = _m.message, ip = _m.ip, admin = _m.admin);
                        if (timestamp && timestamp > Date.now()) {
                            self.connection.sendUTF8(JSON.stringify({
                                player: playerName,
                                admin: admin,
                                error: "banned",
                                reason: reason,
                                until: timestamp,
                                message: banMessage,
                                ip: ip,
                            }));
                            self.connection.close("You are banned.");
                            return [2];
                        }
                        return [4, databaseHandler.checkIsBannedForReason(name)];
                    case 2:
                        (_o = _z.sent(), playerName = _o.playerName, timestamp = _o.timestamp, reason = _o.reason, banMessage = _o.message, admin = _o.admin);
                        if (timestamp && timestamp > Date.now()) {
                            self.connection.sendUTF8(JSON.stringify({
                                player: playerName,
                                admin: admin,
                                error: "banned",
                                reason: reason,
                                until: timestamp,
                                message: banMessage,
                            }));
                            self.connection.close("You are banned.");
                            return [2];
                        }
                        if (account && !isValidAccountAddress(account)) {
                            self.connection.sendUTF8("invalidconnection");
                            self.connection.close("Invalid Account.");
                            return [2];
                        }
                        if (network && !["nano", "ban"].includes(network)) {
                            self.connection.sendUTF8("invalidconnection");
                            self.connection.close("Invalid Network.");
                            return [2];
                        }
                        self.name = name.substr(0, 16).trim();
                        if (!self.checkName(self.name)) {
                            self.connection.sendUTF8("invalidusername");
                            self.connection.close("Invalid name " + self.name);
                            return [2];
                        }
                        self.account = account;
                        self.network = network;
                        if (!(action === Types.Messages.CREATE)) return [3, 4];
                        console.info("CREATE: " + self.name);
                        return [4, databaseHandler.isPlayerExist(self)];
                    case 3:
                        if (_z.sent()) {
                            console.log("~~~~~~8");
                            return [2];
                        }
                        return [3, 5];
                    case 4:
                        console.log("~~~~~~9");
                        console.info("LOGIN: " + self.name, " ID: " + self.id);
                        if (self.server.loggedInPlayer(self.name) && !password) {
                            self.connection.sendUTF8("passwordlogin");
                            self.connection.close("Already logged in " + self.name);
                            return [2];
                        }
                        _z.label = 5;
                    case 5:
                        if (!!password) return [3, 7];
                        return [4, databaseHandler.passwordIsRequired(self)];
                    case 6:
                        if (_z.sent()) {
                            return [2];
                        }
                        return [3, 9];
                    case 7: return [4, databaseHandler.passwordLoginOrCreate(self, password)];
                    case 8:
                        if (!(_z.sent())) {
                            return [2];
                        }
                        else if (self.server.loggedInPlayer(self.name)) {
                            self.server.disconnectPlayer({ name: self.name });
                        }
                        _z.label = 9;
                    case 9:
                        if (action === Types.Messages.CREATE) {
                            if (databaseHandler.validateCreatePlayer(self)) {
                                databaseHandler.createPlayer(self);
                            }
                        }
                        else {
                            databaseHandler.loadPlayer(self);
                        }
                        return [3, 74];
                    case 10:
                        if (!(action === Types.Messages.ACCOUNT)) return [3, 13];
                        newAccount = params[0];
                        if (!(!self.account && isValidAccountAddress(newAccount))) return [3, 12];
                        newNetwork = newAccount.split("_")[0];
                        return [4, self.databaseHandler.setAccount(self, newAccount, newNetwork)];
                    case 11:
                        _z.sent();
                        self.server.updatePopulation();
                        _z.label = 12;
                    case 12: return [3, 74];
                    case 13:
                        if (!(action === Types.Messages.WHO)) return [3, 14];
                        console.info("WHO: " + self.name);
                        self.server.pushSpawnsToPlayer(self, params[0]);
                        return [3, 74];
                    case 14:
                        if (!(action === Types.Messages.ZONE)) return [3, 15];
                        console.info("ZONE: " + self.name);
                        self.zone_callback();
                        return [3, 74];
                    case 15:
                        if (!(action === Types.Messages.CHAT)) return [3, 16];
                        msg = sanitize(params[0]);
                        console.info("CHAT: " + self.name + ": " + "\"".concat(msg, "\""));
                        if (!self.achievement[20]) {
                            if (self.chatTimeout) {
                                self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "You can only send 1 message per 10 seconds until you beat the Skeleton King").serialize());
                                return [2];
                            }
                            else {
                                self.chatTimeout = setTimeout(function () {
                                    self.chatTimeout = null;
                                }, 10000);
                            }
                        }
                        if (!self.canChat) {
                            self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "You are banned from chatting (repeated offense), to ask for an unban ask on Discord #support channel)").serialize());
                            return [2];
                        }
                        hashighPercentCaps = hasMoreThanPercentCaps({ msg: msg, minChar: 24 });
                        if (!ADMINS.includes(self.name) &&
                            (CHATBAN_PATTERNS_WARNING.test(msg) || CHATBAN_PATTERNS.test(msg) || hashighPercentCaps)) {
                            if (!self.isChatbanWarned) {
                                postMessageToModeratorSupportChannel("**".concat(self.name, "** was Warned for saying:\"**").concat(msg, "** ").concat(hashighPercentCaps ? " Don't abuse CAPS" : "", "\""));
                                self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, hashighPercentCaps
                                    ? "".concat(hashighPercentCaps ? "Don't abuse CAPS" : "", ":\"**").concat(msg, "** (you've been warned)")
                                    : "Watch your languague next time you will be banned from chat saying:\"**".concat(msg, "** (you've been warned)")).serialize());
                            }
                            else {
                                self.databaseHandler.chatBan({ player: self, message: msg });
                                postMessageToModeratorSupportChannel("**".concat(self.name, "** was self-chat banned for saying").concat(hashighPercentCaps ? "too many CAPS" : "", ":**").concat(msg, "** Repeated offense\""));
                                self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "You are banned from chat for saying".concat(hashighPercentCaps ? "too many CAPS" : "", ":**").concat(msg, "** Repeated offense")).serialize());
                            }
                            self.isChatbanWarned = true;
                            return [2];
                        }
                        else if (msg.includes("@everyone") || msg.includes("@here")) {
                            self.databaseHandler.chatBan({ player: self, message: msg });
                            postMessageToModeratorSupportChannel("**".concat(self.name, "** was self-chat banned for saying:\"**").concat(msg, "**\""));
                            self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "You are banned from chatting (repeated offense), to ask for an unban ask on Discord #support channel)").serialize());
                            return [2];
                        }
                        if (msg === "/find boss") {
                            entity = void 0;
                            emoji = void 0;
                            playerLocation = getEntityLocation({ x: self.x, y: self.y });
                            if (playerLocation === "magicskeletoncrypt") {
                                entity = self.server.magicTemplar;
                                emoji = EmojiMap.magicTemplar;
                            }
                            else if (playerLocation === "poisonskeletoncrypt") {
                                entity = self.server.poisonTemplar;
                                emoji = EmojiMap.poisonTemplar;
                            }
                            else if (playerLocation === "butchergateway") {
                                entity = self.server.butcher;
                                emoji = EmojiMap.butcher;
                            }
                            else if (playerLocation === "skeletonking") {
                                entity = self.server.skeletonking;
                                emoji = EmojiMap.skeletonking;
                            }
                            else if (playerLocation === "necromancerlair") {
                                entity = (function (_a) {
                                    var x = _a.x, y = _a.y, name = _a.name, isDead = _a.isDead, resistances = _a.resistances, enchants = _a.enchants, hitPoints = _a.hitPoints, maxHitPoints = _a.maxHitPoints, spawningX = _a.spawningX, spawningY = _a.spawningY, armorLevel = _a.armorLevel, weaponLevel = _a.weaponLevel;
                                    return ({
                                        x: x,
                                        y: y,
                                        name: name,
                                        isDead: isDead,
                                        resistances: resistances,
                                        enchants: enchants,
                                        hitPoints: hitPoints,
                                        maxHitPoints: maxHitPoints,
                                        spawningX: spawningX,
                                        spawningY: spawningY,
                                        armorLevel: armorLevel,
                                        weaponLevel: weaponLevel,
                                    });
                                })(self.server.necromancer);
                                emoji = EmojiMap.necromancer;
                            }
                            else if (playerLocation === "chalice") {
                                entity = self.server.shaman;
                                emoji = EmojiMap.zulgurak;
                            }
                            else if (playerLocation === "spiders") {
                                entity = self.server.spiderQueen;
                                emoji = EmojiMap.arachneia;
                            }
                            else if (playerLocation === "azrealchamber") {
                                entity = self.server.deathAngel;
                                emoji = EmojiMap.azrael;
                            }
                            else if (playerLocation === "minotaurcage") {
                                entity = self.server.minotaur;
                                emoji = EmojiMap.minotaur;
                            }
                            else if (playerLocation === "cow") {
                                entity = self.server.cowking;
                                emoji = EmojiMap.cowking;
                            }
                            else if (playerLocation === "magicskeletoncrypt") {
                                entity = self.server.skeletontemplar;
                            }
                            else if (playerLocation === "poisonskeletoncrypt") {
                                entity = self.server.skeletontemplar2;
                            }
                            if (entity) {
                                postMessageToSupportChannel("**".concat(entity.name.toUpperCase(), "** ").concat(emoji).concat(JSON.stringify(entity.neme)));
                            }
                            else {
                                postMessageToSupportChannel("No boss in that area **".concat(self.name, "** x:").concat(self.x, ", y:").concat(self.y, "  playerLocation:").concat(playerLocation));
                                self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "No boss in that area.").serialize());
                            }
                            return [2];
                        }
                        if (msg && msg !== "") {
                            msg = msg.substr(0, 255);
                            if ((msg.startsWith("/") && ADMINS.includes(self.name)) || SUPER_ADMINS.includes(self.name)) {
                                if (SUPER_ADMINS.includes(self.name)) {
                                    if (msg === "/cow") {
                                        if (!self.server.cowLevelClock) {
                                            self.server.startCowLevel();
                                            self.broadcast(new Messages.AnvilRecipe("cowLevel"), false);
                                        }
                                        return [2];
                                    }
                                    else if (msg === "/minotaur") {
                                        if (!self.server.minotaurLevelClock && !self.server.minotaurSpawnTimeout) {
                                            self.server.startMinotaurLevel();
                                            self.broadcast(new Messages.AnvilRecipe("minotaurLevel"), false);
                                        }
                                        return [2];
                                    }
                                    else if (msg === "/chalice") {
                                        if (!self.server.chaliceLevelClock) {
                                            self.server.activateAltarChalice(self, true);
                                        }
                                        return [2];
                                    }
                                    else if (msg === "/soulstone") {
                                        self.server.activateAltarSoulStone(self, true);
                                        return [2];
                                    }
                                    else if (msg === "/fossil") {
                                        self.server.activateFossil(self, true);
                                        return [2];
                                    }
                                    else if (msg === "/stone") {
                                        if (!self.server.stoneLevelClock) {
                                            self.server.magicStones.forEach(function (id) {
                                                var magicStone = self.server.getEntityById(id);
                                                self.server.activateMagicStone(self, magicStone);
                                            });
                                        }
                                        return [2];
                                    }
                                    else if (msg === "/tree") {
                                        if (!self.server.isActivatedTreeLevel) {
                                            self.server.startTreeLevel();
                                        }
                                        return [2];
                                    }
                                    else if (msg === "/gateway") {
                                        self.server.activateHands(self, true);
                                        return [2];
                                    }
                                    else if (msg === "/temple") {
                                        lever = self.server.getEntityById(self.server.leverChaliceNpcId);
                                        self.server.activateLever(self, lever, true);
                                        return [2];
                                    }
                                    else if (msg === "/deathangel" || msg === "/azrael") {
                                        lever = self.server.getEntityById(self.server.leverChaliceNpcId);
                                        self.server.activateLever(self, lever);
                                        leverDeathAngel = self.server.getEntityById(self.server.leverDeathAngelNpcId);
                                        self.server.activateLever(self, leverDeathAngel, true);
                                        return [2];
                                    }
                                    else if (msg === "/olaf") {
                                        leverLeft = self.server.getEntityById(self.server.leverLeftCryptNpcId);
                                        leverRight = self.server.getEntityById(self.server.leverRightCryptNpcId);
                                        self.server.activateLever(self, leverLeft);
                                        self.server.activateLever(self, leverRight);
                                        return [2];
                                    }
                                }
                                else if (msg.startsWith("/kick") && msg.length) {
                                    playerName = msg.replace("/kick ", "");
                                    self.server.disconnectPlayer({ name: playerName.trim(), force: true });
                                    self.send(new Messages.Chat({}, "You kicked ".concat(playerName, "."), "event").serialize());
                                    return [2];
                                }
                            }
                            if (msg.startsWith("/ban")) {
                                return [2];
                            }
                            if (msg.startsWith("!link")) {
                                secret = msg.replace("!link", "").trim();
                                self.databaseHandler.linkPlayerToDiscordUser(self, secret);
                                return [2];
                            }
                            postMessageToDiscordChatChannel("".concat(self.name, ": ").concat(msg.replace(/\@/g, "")));
                            self.server.pushBroadcast(new Messages.Chat(self, msg), false);
                        }
                        return [3, 74];
                    case 16:
                        if (!(action === Types.Messages.MANUAL_BAN_PLAYER)) return [3, 17];
                        _a = params[0], playerName = _a.player, reason = _a.reason, duration = _a.duration, banMessage = _a.message, isIPBan = _a.isIPBan, isChatBan = _a.isChatBan;
                        until = duration * 24 * 60 * 60 * 1000 + Date.now();
                        bannedPlayer = self.server.getPlayerByName(playerName);
                        if (!ADMINS.includes(self.name)) {
                            console.log("~~~startbanPlayerByIP");
                            databaseHandler.banPlayerByIP({
                                admin: "auto-mod",
                                player: bannedPlayer,
                                reason: "cheating",
                                until: until,
                                message: "non-mod ban",
                            });
                            console.log("~~~endbanPlayerByIP");
                            postMessageToModeratorSupportChannel("\n            **".concat(self.name, "** was banned for exploiting the ban feature"));
                            return [2];
                        }
                        if (!bannedPlayer)
                            return [2];
                        if (isChatBan) {
                            self.databaseHandler.chatBan({ player: bannedPlayer, message: message, isIPBan: isIPBan });
                        }
                        else if (isIPBan) {
                            databaseHandler.banPlayerByIP({
                                player: bannedPlayer,
                                reason: reason,
                                until: until,
                                message: message,
                            });
                        }
                        else {
                            databaseHandler.banPlayerForReason({
                                admin: self,
                                player: bannedPlayer,
                                reason: reason,
                                until: until,
                                message: banMessage,
                            });
                        }
                        postMessageToModeratorSupportChannel("**".concat(bannedPlayer.name, "** was banned by **").concat(self.name, "** reason: **").concat(reason, "**, message: **").concat(banMessage, "**, duration: **").concat(duration, "** days"));
                        return [2];
                    case 17:
                        if (!(action === Types.Messages.MOVE)) return [3, 18];
                        if (self.move_callback) {
                            x = params[0], y = params[1];
                            playerLocation = getEntityLocation({ x: x, y: y });
                            if (playerLocation === "expansion2" && !self.expansion2) {
                                databaseHandler.banPlayerByIP({
                                    player: self,
                                    reason: "cheating",
                                    message: "haven't unlocked expansion2, invalid position x:".concat(x, ", y:").concat(y),
                                });
                                return [2];
                            }
                            if (self.server.isValidPosition(x, y)) {
                                self.setPosition(x, y);
                                self.clearTarget();
                                self.broadcast(new Messages.Move(self));
                                self.move_callback(self.x, self.y);
                            }
                            else {
                                databaseHandler.banPlayerByIP({
                                    player: self,
                                    reason: "cheating",
                                    message: "invalid position x:".concat(x, ", y:").concat(y),
                                });
                                return [2];
                            }
                        }
                        return [3, 74];
                    case 18:
                        if (!(action === Types.Messages.MOVE_PET)) return [3, 19];
                        if (!self.petEntity)
                            return [2];
                        x = params[0], y = params[1];
                        if (self.server.isValidPosition(x, y)) {
                            self.petEntity.setPosition(x, y);
                            self.broadcast(new Messages.Move(self.petEntity));
                        }
                        return [3, 74];
                    case 19:
                        if (!(action === Types.Messages.LOOTMOVE)) return [3, 20];
                        if (self.lootmove_callback) {
                            self.setPosition(params[0], params[1]);
                            item = self.server.getEntityById(params[2]);
                            if (item) {
                                self.clearTarget();
                                self.broadcast(new Messages.LootMove(self, item));
                                self.lootmove_callback(self.x, self.y);
                            }
                        }
                        return [3, 74];
                    case 20:
                        if (!(action === Types.Messages.AGGRO)) return [3, 21];
                        mob_1 = self.server.getEntityById(params[0]);
                        if (mob_1) {
                            playerLocation = getEntityLocation({ x: self.x, y: self.y });
                            mobLocation = getEntityLocation({ x: mob_1.x, y: mob_1.y });
                            if (playerLocation !== mobLocation && !isLocationOKWithExpansionLocation(playerLocation, mobLocation)) {
                                self.server.disconnectPlayer({ name: name.trim(), force: true });
                                postMessageToModeratorSupportChannel("\n          :warning: **".concat(self.name, "** was kicked for exploiting: ").concat(params[0], " the AGGRO message, playerLocation ").concat(playerLocation, ": self.x: ").concat(self.x, ", self.y: ").concat(self.y, ", mobLocation: ").concat(mobLocation, ", mobname: ").concat(mob_1.name, ", mob.x: ").concat(mob_1.x, ", mob.y: ").concat(mob_1.y, "\n          "));
                                return [2];
                            }
                            console.info("AGGRO: " + self.name + " " + params[0]);
                        }
                        if (self.move_callback) {
                            self.server.handleMobHate(params[0], self.id, 5);
                        }
                        return [3, 74];
                    case 21:
                        if (!(action === Types.Messages.HASH)) return [3, 22];
                        hash = params[0];
                        self.lastHashCheckTimestamp = Date.now();
                        isValidHash = this.server.getIsValidHash(hash);
                        if (!isValidHash) {
                            self.databaseHandler.banPlayerByIP({
                                player: self,
                                reason: "cheating",
                                message: "invalid hash:".concat(hash, " expecting:").concat(self.server.hash),
                            });
                        }
                        return [3, 74];
                    case 22:
                        if (!(action === Types.Messages.ATTACK)) return [3, 23];
                        console.info("ATTACK: " + self.name + " " + params[0]);
                        mob = self.server.getEntityById(params[0]);
                        if (mob) {
                            self.setTarget(mob);
                            self.server.broadcastAttacker(self);
                            playerLocation = getEntityLocation({ x: self.x, y: self.y });
                            mobLocation = mob && getEntityLocation({ x: mob.x, y: mob.y });
                            if (playerLocation !== mobLocation && !isLocationOKWithExpansionLocation(playerLocation, mobLocation)) {
                                self.server.disconnectPlayer({ name: self.name.trim(), force: true });
                                postMessageToModeratorSupportChannel("\n          :warning: **".concat(self.name, "** was kicked for exploiting: ").concat(params[0], " the ATTACK message, playerLocation ").concat(playerLocation, ": self.x: ").concat(self.x, ", self.y: ").concat(self.y, ", mobLocation: ").concat(mobLocation, ", mobname: ").concat(mob.name, ", mob.x: ").concat(mob.x, ", mob.y: ").concat(mob.y, "\n          "));
                                return [2];
                            }
                        }
                        return [3, 74];
                    case 23:
                        if (!(action === Types.Messages.HIT)) return [3, 24];
                        console.info("HIT: " + self.name + " " + params[0]);
                        mob = self.server.getEntityById(params[0]);
                        if (mob) {
                            playerLocation = getEntityLocation({ x: self.x, y: self.y });
                            mobLocation = getEntityLocation({ x: mob.x, y: mob.y });
                            if (playerLocation !== mobLocation && !isLocationOKWithExpansionLocation(playerLocation, mobLocation)) {
                                self.server.disconnectPlayer({ name: self.name.trim(), force: true });
                                postMessageToModeratorSupportChannel("\n          :warning: **".concat(self.name, "** was kicked for exploiting: ").concat(params[0], " the ATTACK message, playerLocation ").concat(playerLocation, ": self.x: ").concat(self.x, ", self.y: ").concat(self.y, ", mobLocation: ").concat(mobLocation, ", mobname: ").concat(mob.name, ", mob.x: ").concat(mob.x, ", mob.y: ").concat(mob.y, "\n          "));
                                return [2];
                            }
                        }
                        if (self.attackTimeout) {
                            return [2];
                        }
                        attackSpeed = Types.calculateAttackSpeedCap(self.bonus.attackSpeed + 10, this.weaponKind);
                        duration = Math.round(Types.DEFAULT_ATTACK_SPEED - Types.DEFAULT_ATTACK_SPEED * (attackSpeed / 100));
                        self.attackTimeout = setTimeout(function () {
                            self.attackTimeout = null;
                        }, duration);
                        if ((mob === null || mob === void 0 ? void 0 : mob.type) === "mob" || ((mob === null || mob === void 0 ? void 0 : mob.type) === "player" && self.pvp && mob.pvp)) {
                            isCritical = false;
                            resistances = Types.getResistance(mob, self);
                            _b = Formulas.dmg(__assign({ weapon: self.weapon, weaponLevel: self.weaponLevel, playerLevel: self.level, minDamage: self.bonus.minDamage + self.partyBonus.minDamage, maxDamage: self.bonus.maxDamage + self.partyBonus.maxDamage, magicDamage: self.bonus.magicDamage + self.partyBonus.magicDamage, attackDamage: self.bonus.attackDamage, drainLife: self.bonus.drainLife, flameDamage: self.bonus.flameDamage, lightningDamage: self.bonus.lightningDamage, coldDamage: self.bonus.coldDamage, poisonDamage: self.bonus.poisonDamage, partyAttackDamage: self.partyBonus.attackDamage }, resistances)), dmg = _b.dmg, attackDamage = _b.attackDamage, elementDamage = _b.elementDamage;
                            if (mob.type === "mob") {
                                if (mob.enchants.includes("stoneskin")) {
                                    dmg = Math.round(attackDamage * 0.8) + dmg - attackDamage;
                                    attackDamage = Math.round(attackDamage * 0.8);
                                }
                            }
                            if (self.bonus.criticalHit) {
                                isCritical = random(100) < self.bonus.criticalHit;
                                if (isCritical) {
                                    dmg = attackDamage * 2 + dmg - attackDamage;
                                }
                            }
                            if (self.bonus.freezeChance && !Types.isBoss(mob.kind)) {
                                freezeChance = self.bonus.freezeChance;
                                if (mob.type === "player") {
                                    freezeChance = freezeChance - mob.bonus.reduceFrozenChance;
                                }
                                isFrozen = random(100) < freezeChance;
                                if (isFrozen) {
                                    self.broadcast(new Messages.Frozen(mob.id, Types.getFrozenTimePerLevel(self.freezeChanceLevel)));
                                }
                            }
                            if (self.bonus.drainLife) {
                                if (!self.hasFullHealth()) {
                                    drainLife = self.bonus.drainLife;
                                    if (self.curse.health) {
                                        drainLife = drainLife - Math.floor((self.bonus.drainLife * self.curse.health) / 100);
                                    }
                                    self.regenerateHealthBy(drainLife);
                                    self.server.pushToPlayer(self, self.health());
                                }
                            }
                            if (self.bonus.poisonDamage) {
                                self.startPoisoned({
                                    dmg: self.bonus.poisonDamage,
                                    entity: mob,
                                    resistance: resistances.poisonResistance,
                                    attacker: self,
                                });
                            }
                            defense = 0;
                            isBlocked = false;
                            if (mob.type === "mob") {
                                defense = Formulas.mobDefense({ armorLevel: mob.armorLevel });
                                dmg = defense > dmg ? 0 : dmg - defense;
                                dmg += elementDamage;
                                dmg += self.bonus.pierceDamage;
                                if (Types.isBoss(mob.kind)) {
                                    dmg = self.server.handleBossDmg({ dmg: dmg, entity: mob, player: self });
                                }
                                if (!dmg) {
                                    dmg = randomInt(3, 5);
                                }
                            }
                            else if (mob.type === "player") {
                                pierceDamage = self.bonus.pierceDamage - mob.bonus.absorbedDamage;
                                if (pierceDamage < 0) {
                                    pierceDamage = 0;
                                }
                                (_p = mob.handleHurtDmg(this, dmg, pierceDamage, elementDamage), dmg = _p.dmg, isBlocked = _p.isBlocked);
                            }
                            if ((mob === null || mob === void 0 ? void 0 : mob.type) === "mob" && (mob === null || mob === void 0 ? void 0 : mob.receiveDamage)) {
                                mob.receiveDamage(dmg);
                                self.server.handleMobHate(mob.id, self.id, dmg);
                            }
                            self.server.handleHurtEntity({ entity: mob, attacker: self, dmg: dmg, isCritical: isCritical, isBlocked: isBlocked });
                            if (mob.hitPoints <= 0) {
                                mob.isDead = true;
                                if (mob.poisonedInterval) {
                                    clearInterval(mob.poisonedInterval);
                                    mob.poisonedInterval = null;
                                }
                            }
                        }
                        return [3, 74];
                    case 24:
                        if (!(action === Types.Messages.HURT)) return [3, 25];
                        console.info("HURT: " + self.name + " " + params[0]);
                        mob = self.server.getEntityById(params[0]);
                        if (mob && self.hitPoints > 0) {
                            dmg = Formulas.dmgFromMob({
                                weaponLevel: mob.weaponLevel,
                            });
                            if (!self.hasCurse() && Array.isArray(mob.enchants) && !self.skill.defense) {
                                duration = void 0;
                                if (mob.enchants.includes("curse-health")) {
                                    self.curse.health = 100;
                                    duration = curseDurationMap[Types.Curses.HEALTH](10);
                                    self.broadcast(new Messages.Cursed(self.id, Types.Curses.HEALTH, duration));
                                }
                                else if (mob.enchants.includes("curse-resistance")) {
                                    self.curse.resistances = 50;
                                    duration = curseDurationMap[Types.Curses.RESISTANCES](10);
                                    self.broadcast(new Messages.Cursed(self.id, Types.Curses.RESISTANCES, duration));
                                }
                                if (self.hasCurse()) {
                                    clearTimeout(self.cursedTimeout);
                                    if (self.curse.resistances) {
                                        self.sendPlayerStats();
                                    }
                                    self.cursedTimeout = setTimeout(function () {
                                        if (self.curse.resistances) {
                                            self.resetCurse();
                                            self.sendPlayerStats();
                                        }
                                        else {
                                            self.resetCurse();
                                        }
                                        self.cursedTimeout = null;
                                    }, duration);
                                }
                            }
                            self.handleHurtDmg(mob, dmg);
                        }
                        return [3, 74];
                    case 25:
                        if (!(action === Types.Messages.HURT_SPELL)) return [3, 26];
                        console.info("HURT_SPELL: " + self.name + " " + params[0]);
                        spell = self.server.getEntityById(params[0]);
                        if (spell && self.hitPoints > 0) {
                            caster = self.server.getEntityById(spell.casterId);
                            if (!spell.element) {
                                if (caster) {
                                    self.handleHurtDmg(caster, spell.dmg);
                                }
                            }
                            else {
                                self.handleHurtSpellDmg(spell);
                            }
                        }
                        return [3, 74];
                    case 26:
                        if (!(action === Types.Messages.MAGICSTONE)) return [3, 27];
                        console.info("MAGICSTONE: " + self.name + " " + params[0]);
                        magicStone = self.server.getEntityById(params[0]);
                        if (Math.abs(self.x - magicStone.x) >= 3 && Math.abs(self.y - magicStone.y) >= 3) {
                            databaseHandler.banPlayerByIP({
                                player: self,
                                reason: "cheating",
                                message: "activated magicStone from a distance: ".concat(self.x, "-").concat(magicStone.x, ", ").concat(self.y, "-").concat(magicStone.y),
                            });
                            return [2];
                        }
                        if (magicStone &&
                            magicStone instanceof Npc &&
                            !magicStone.isActivated &&
                            self.server.magicStones.includes(magicStone.id) &&
                            !self.server.activatedMagicStones.includes(magicStone.id)) {
                            self.server.activateMagicStone(self, magicStone);
                        }
                        return [3, 74];
                    case 27:
                        if (!(action === Types.Messages.LEVER)) return [3, 28];
                        console.info("LEVER: " + self.name + " " + params[0]);
                        lever = self.server.getEntityById(params[0]);
                        if (Math.abs(self.x - lever.x) >= 10 && Math.abs(self.y - lever.y) >= 10) {
                            databaseHandler.banPlayerByIP({
                                player: self,
                                reason: "cheating",
                                message: "activated lever from a distance: ".concat(self.x, "-").concat(lever.x, ", ").concat(self.y, "-").concat(lever.y),
                            });
                            return [2];
                        }
                        if (lever && lever instanceof Npc && !lever.isActivated) {
                            if (lever.id === self.server.leverChaliceNpcId && !self.server.chaliceLevelClock) {
                                databaseHandler.banPlayerByIP({
                                    player: self,
                                    reason: "cheating",
                                    message: "Activated chalice lever without the level being opened",
                                });
                                return [2];
                            }
                            self.server.activateLever(self, lever);
                        }
                        return [3, 74];
                    case 28:
                        if (!(action === Types.Messages.ALTARCHALICE)) return [3, 29];
                        console.info("ALTAR - CHALICE: " + self.name + " " + params[0]);
                        altarId = /\d+/.test(params[0]) ? parseInt(params[0]) : null;
                        if (altarId === self.server.altarChaliceNpcId) {
                            self.server.activateAltarChalice(self);
                        }
                        return [3, 74];
                    case 29:
                        if (!(action === Types.Messages.ALTARSOULSTONE)) return [3, 30];
                        console.info("ALTAR - SOULSTONE: " + self.name + " " + params[0]);
                        altarId = /\d+/.test(params[0]) ? parseInt(params[0]) : null;
                        if (altarId && altarId === self.server.altarSoulStoneNpcId) {
                            self.server.activateAltarSoulStone(self);
                        }
                        return [3, 74];
                    case 30:
                        if (!(action === Types.Messages.FOSSIL)) return [3, 31];
                        console.info("FOSSIL: " + self.name);
                        if (self.weapon !== "pickaxe")
                            return [2];
                        self.server.activateFossil(self);
                        return [3, 74];
                    case 31:
                        if (!(action === Types.Messages.HANDS)) return [3, 32];
                        console.info("HANDS: " + self.name + " " + params[0]);
                        handsId = /\d+/.test(params[0]) ? parseInt(params[0]) : null;
                        if (handsId && handsId === self.server.handsNpcId) {
                            self.server.activateHands(self);
                        }
                        return [3, 74];
                    case 32:
                        if (!(action === Types.Messages.TRAP)) return [3, 33];
                        console.info("TRAP: " + self.name + " " + params[0]);
                        trapId = /\d+/.test(params[0]) ? parseInt(params[0]) : null;
                        if (trapId) {
                            self.server.activateTrap(self, trapId);
                        }
                        return [3, 74];
                    case 33:
                        if (!(action === Types.Messages.HURT_TRAP)) return [3, 34];
                        console.info("HURT_TRAP: " + self.name + " " + params[0]);
                        if (self.isHurtByTrap)
                            return [2];
                        trapId = /\d+/.test(params[0]) ? parseInt(params[0]) : null;
                        if (trapId) {
                            trap = self.server.getEntityById(trapId);
                            self.handleHurtTrapDmg(trap);
                            self.isHurtByTrap = true;
                            if (self.hitPoints >= 0) {
                                setTimeout(function () {
                                    self.isHurtByTrap = false;
                                }, 3000);
                            }
                        }
                        return [3, 74];
                    case 34:
                        if (!(action === Types.Messages.STATUE)) return [3, 35];
                        console.info("STATUE: " + self.name + " " + params[0]);
                        statueId = /\d+/.test(params[0]) ? parseInt(params[0]) : null;
                        if (statueId) {
                            self.server.activateStatue(statueId);
                        }
                        return [3, 74];
                    case 35:
                        if (!(action === Types.Messages.CAST_SPELL)) return [3, 36];
                        if (typeof params[0] !== "number" ||
                            typeof params[1] !== "number" ||
                            typeof params[2] !== "number" ||
                            typeof params[4] !== "boolean") {
                            return [2];
                        }
                        mobId = params[0], x = params[1], y = params[2];
                        entity = self.server.getEntityById(mobId);
                        if (!entity)
                            return [2];
                        targetId = params[3] || undefined;
                        if (entity.kind === Types.Entities.DEATHANGEL) {
                            self.server.castDeathAngelSpell(x, y);
                        }
                        else if (entity.kind === Types.Entities.DEATHBRINGER) {
                            self.server.addSpell({
                                kind: Types.Entities.DEATHBRINGERSPELL,
                                x: x,
                                y: y,
                                element: entity.element,
                                casterId: mobId,
                                casterKind: entity.kind,
                                targetId: targetId,
                            });
                        }
                        else if (entity.kind === Types.Entities.SHAMAN) {
                            self.server.castShamanSpell(x, y, entity, targetId, params[4]);
                        }
                        else if (entity.kind === Types.Entities.MAGE) {
                            self.server.addSpell({
                                kind: Types.Entities.MAGESPELL,
                                x: x,
                                y: y,
                                element: entity.element,
                                casterId: mobId,
                                casterKind: entity.kind,
                                targetId: targetId,
                            });
                        }
                        else if (entity.kind === Types.Entities.SKELETONARCHER) {
                            self.server.addSpell({
                                kind: Types.Entities.ARROW,
                                x: x,
                                y: y,
                                element: entity.element,
                                casterId: mobId,
                                casterKind: entity.kind,
                                targetId: targetId,
                            });
                        }
                        else if (entity.kind === Types.Entities.STATUE) {
                            self.server.addSpell({
                                kind: Types.Entities.STATUESPELL,
                                x: x,
                                y: y,
                                element: "flame",
                                casterId: mobId,
                                casterKind: entity.kind,
                            });
                        }
                        else if (entity.kind === Types.Entities.STATUE2) {
                            self.server.addSpell({
                                kind: Types.Entities.STATUE2SPELL,
                                x: x,
                                y: y,
                                element: "cold",
                                casterId: mobId,
                                casterKind: entity.kind,
                            });
                        }
                        return [3, 74];
                    case 36:
                        if (!(action === Types.Messages.LOOT)) return [3, 37];
                        console.info("LOOT: " + self.name + " " + params[0]);
                        item = self.server.getEntityById(params[0]);
                        if (item) {
                            if (item.partyId) {
                                if ((((_s = self.server.getParty(item.partyId)) === null || _s === void 0 ? void 0 : _s.members.length) || 0) > 1 && self.partyId !== item.partyId) {
                                    self.connection.send({
                                        type: Types.Messages.NOTIFICATION,
                                        message: "Can't loot item, it belongs to a party.",
                                    });
                                    return [2];
                                }
                            }
                            kind = item.kind;
                            if (Types.isItem(kind)) {
                                self.broadcast(item.despawn());
                                self.server.removeEntity(item);
                                if (Types.Entities.CAKE === kind)
                                    return [2];
                                if (Types.Entities.SOULSTONE === kind) {
                                    if (self.server.soulStonePlayerName) {
                                        soulStonePlayer = self.server.getPlayerByName(self.server.soulStonePlayerName);
                                        if (soulStonePlayer) {
                                            self.databaseHandler.lootItems({
                                                player: soulStonePlayer,
                                                items: [{ item: "soulstone", quantity: 1 }],
                                            });
                                            soulStonePlayer.send({
                                                type: Types.Messages.NOTIFICATION,
                                                message: "You received the Soul Stone",
                                            });
                                            postMessageToDiscordEventChannel("**".concat(soulStonePlayer.name, "** picked up Soul Stone ").concat(EmojiMap.soulstone, " "));
                                        }
                                    }
                                }
                                else if (Types.Entities.Gems.includes(kind)) {
                                    index = Types.Entities.Gems.indexOf(kind);
                                    databaseHandler.foundGem(self.name, index);
                                }
                                else if (Types.Entities.Artifact.includes(kind)) {
                                    index = Types.Entities.Artifact.indexOf(kind);
                                    databaseHandler.foundArtifact(self.name, index);
                                }
                                else if (Types.Entities.nonLootableKeys.includes(kind)) {
                                    if (kind === Types.Entities.SKELETONKEY) {
                                        postMessageToDiscordEventChannel("**".concat(self.name, "** picked up the Skeleton Key ").concat(EmojiMap.skeletonkey, " "));
                                    }
                                }
                                else if (kind === Types.Entities.FIREFOXPOTION) {
                                    self.updateHitPoints(true);
                                    self.broadcast(self.equip({ kind: Types.Entities.FIREFOX, level: 1 }));
                                    self.firefoxpotionTimeout = setTimeout(function () {
                                        self.broadcast(self.equip({ kind: self.armorKind, level: self.armorLevel, bonus: self.armorBonus, type: "armor" }));
                                        self.firefoxpotionTimeout = null;
                                    }, 10000);
                                    self.sendPlayerStats();
                                }
                                else if (Types.isHealingItem(kind)) {
                                    amount = void 0;
                                    switch (kind) {
                                        case Types.Entities.FLASK:
                                            amount = 40;
                                            break;
                                        case Types.Entities.BURGER:
                                            amount = 100;
                                            break;
                                        case Types.Entities.NANOPOTION:
                                        case Types.Entities.BANANOPOTION:
                                            amount = 200;
                                            break;
                                        case Types.Entities.REJUVENATIONPOTION:
                                            amount = Math.ceil(self.maxHitPoints / 3);
                                            break;
                                        case Types.Entities.POISONPOTION:
                                            self.handleHurtSpellDmg({ element: "poison", dmg: 240 });
                                            break;
                                    }
                                    if ((kind === Types.Entities.NANOPOTION || kind === Types.Entities.BANANOPOTION) &&
                                        self.nanoPotions < 5) {
                                        self.nanoPotions += 1;
                                        databaseHandler.foundNanoPotion(self.name);
                                    }
                                    if (amount && !self.hasFullHealth()) {
                                        self.regenerateHealthBy(amount);
                                        self.server.pushToPlayer(self, self.health());
                                    }
                                }
                                else if (kind === Types.Entities.GOLD) {
                                    console.info("LOOT GOLD: " + self.name + " " + item.amount);
                                    if (!item.amount || isNaN(item.amount))
                                        return [2];
                                    amount = item.amount;
                                    if (self.bonus.extraGold || self.partyBonus.extraGold) {
                                        amount = Math.floor((Types.calculateExtraGoldCap(self.bonus.extraGold + self.partyBonus.extraGold) / 100) * amount +
                                            amount);
                                    }
                                    self.databaseHandler.lootGold({ player: self, amount: amount });
                                }
                                else if (kind === Types.Entities.IOU) {
                                    console.info("LOOT IOU: " + self.name + " " + item.amount);
                                    if (!item.amount || isNaN(item.amount))
                                        return [2];
                                    amount = item.amount;
                                    player = self;
                                    if (self.partyId) {
                                        player = self;
                                    }
                                    self.databaseHandler.lootItems({
                                        player: player,
                                        items: [
                                            {
                                                item: "iou",
                                                level: amount,
                                            },
                                        ],
                                    });
                                }
                                else if (Types.Entities.NANOCOIN === kind) {
                                    console.info("LOOT NANO: ".concat(self.name, ", ").concat(self.network, ", ").concat(item.amount));
                                    if (!item.amount || isNaN(item.amount) || self.network !== "nano") {
                                        return [2];
                                    }
                                    self.databaseHandler.lootCoin({ player: self, amount: item.amount });
                                }
                                else if (Types.Entities.BANANOCOIN === kind) {
                                    console.info("LOOT NANO: ".concat(self.name, ", ").concat(self.network, ", ").concat(item.amount));
                                    if (!item.amount || isNaN(item.amount) || self.network !== "nano") {
                                        return [2];
                                    }
                                    self.databaseHandler.lootCoin({ player: self, amount: item.amount });
                                }
                                else {
                                    try {
                                        isUnique = false;
                                        isSuperior = false;
                                        jewelLevel = null;
                                        generatedItem = null;
                                        runeName = null;
                                        if (Types.isRune(kind)) {
                                            runeName = Types.RuneByKind[kind];
                                            if (runeName) {
                                                generatedItem = { item: "rune-".concat(runeName), quantity: 1 };
                                            }
                                        }
                                        else if (Types.isQuantity(kind) || Types.isConsumable(kind)) {
                                            generatedItem = { item: Types.getKindAsString(kind), quantity: 1 };
                                        }
                                        else if (Types.isItem(kind)) {
                                            jewelLevel = Types.isJewel(kind) ? item.level : 1;
                                            (_r = self.generateItem({ kind: kind, jewelLevel: jewelLevel }) || {}, (isUnique = _r.isUnique, isSuperior = _r.isSuperior), generatedItem = __rest(_r, ["isUnique", "isSuperior"]));
                                        }
                                        if (generatedItem) {
                                            player = self;
                                            if (self.server.cowKingPlayerName && item.mobKind === Types.Entities.COWKING) {
                                                player = self.server.getPlayerByName(self.server.cowKingPlayerName);
                                            }
                                            else if (self.server.minotaurPlayerName && item.mobKind === Types.Entities.MINOTAUR) {
                                                player = self.server.getPlayerByName(self.server.minotaurPlayerName);
                                            }
                                            if (!Types.isSingle(kind) && self.partyId) {
                                                isLooterInTown = getEntityLocation({ x: self.x, y: self.y }) === "town";
                                                player = self.server.getEntityById(self.getParty().getNextLootMemberId({ isLooterInTown: isLooterInTown })) || self;
                                            }
                                            if ((player === null || player === void 0 ? void 0 : player.partyId) && (player === null || player === void 0 ? void 0 : player.name)) {
                                                self.server.pushToParty(self.getParty(), new Messages.Party(Types.Messages.PARTY_ACTIONS.LOOT, [
                                                    { playerName: player.name, kind: kind, isUnique: isUnique, isSuperior: isSuperior, jewelLevel: jewelLevel },
                                                ]));
                                            }
                                            if (kind === Types.Entities.CHRISTMASPRESENT) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(kinds[generatedItem.item][2], " ").concat(EmojiMap[generatedItem.item], " "));
                                            }
                                            else if (kind === Types.Entities.SCROLLUPGRADEELEMENTMAGIC) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(kinds[generatedItem.item][2], " ").concat(EmojiMap[generatedItem.item], " "));
                                            }
                                            else if (kind === Types.Entities.SCROLLUPGRADEELEMENTMAGIC) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(kinds[generatedItem.item][2], " ").concat(EmojiMap[generatedItem.item], " "));
                                            }
                                            else if (kind === Types.Entities.SCROLLUPGRADEELEMENTFLAME) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(kinds[generatedItem.item][2], " ").concat(EmojiMap[generatedItem.item], " "));
                                            }
                                            else if (kind === Types.Entities.SCROLLUPGRADEELEMENTLIGHTNING) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(kinds[generatedItem.item][2], " ").concat(EmojiMap[generatedItem.item], " "));
                                            }
                                            else if (kind === Types.Entities.SCROLLUPGRADEELEMENTCOLD) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(kinds[generatedItem.item][2], " ").concat(EmojiMap[generatedItem.item], " "));
                                            }
                                            else if (kind === Types.Entities.SCROLLUPGRADEELEMENTPOISON) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(kinds[generatedItem.item][2], " ").concat(EmojiMap[generatedItem.item], " "));
                                            }
                                            else if (kind === Types.Entities.SCROLLUPGRADESKILLRANDOM) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(kinds[generatedItem.item][2], " ").concat(EmojiMap[generatedItem.item], " "));
                                            }
                                            else if (kind === Types.Entities.PETCOLLAR) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(kinds[generatedItem.item][2], " ").concat(EmojiMap[generatedItem.item], " "));
                                            }
                                            else if (kind === Types.Entities.STONESOCKETBLESSED) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(kinds[generatedItem.item][2], " ").concat(EmojiMap[generatedItem.item], " "));
                                            }
                                            if (Types.isSuperUnique(generatedItem.item)) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(kinds[generatedItem.item][2], " ").concat(EmojiMap[generatedItem.item] || "💍", " "));
                                            }
                                            else if (Types.isRune(kind) && Types.RuneList.indexOf(runeName) + 1 >= 20) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up ").concat(runeName.toUpperCase(), " rune ").concat(EmojiMap["rune-".concat(runeName)], " ").concat(EmojiMap.Bebeking));
                                            }
                                            else if (kind === Types.Entities.STONEDRAGON) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up a Dragon Stone ").concat(EmojiMap.stonedragon, " ").concat(EmojiMap.Bebeking));
                                            }
                                            else if (kind === Types.Entities.STONEHERO) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up a Hero Emblem ").concat(EmojiMap.stonehero, " ").concat(EmojiMap.Bebeking));
                                            }
                                            else if (kind === Types.Entities.CHALICE) {
                                            }
                                            else if (kind === Types.Entities.SCROLLTRANSMUTEBLESSED) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up a Blessed Transmute Scroll ").concat(EmojiMap.scrolltransmuteblessed));
                                            }
                                            else if (kind === Types.Entities.SCROLLTRANSMUTEPET) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up a Pet Transmute Scroll ").concat(EmojiMap.scrolltransmutepet));
                                            }
                                            else if (kind === Types.Entities.SCROLLUPGRADESACRED) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up a Sacred Upgrade Scroll ").concat(EmojiMap.scrollupgradesacred));
                                            }
                                            else if (kind === Types.Entities.BARGOLD) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up a Gold Bar ").concat(EmojiMap.bargold));
                                            }
                                            else if (kind === Types.Entities.JEWELSKULL && generatedItem.level === 5) {
                                                postMessageToDiscordEventChannel("**".concat(player.name, "** picked up a ").concat(isUnique ? "**unique** " : "", "lv.5 Skull Jewel ").concat(EmojiMap.jewelskull));
                                            }
                                            if (!generatedItem || !Object.keys(generatedItem).length) {
                                                Sentry.captureException(new Error("invalid generatedItem for ".concat(kind)));
                                            }
                                            self.databaseHandler.lootItems({
                                                player: player || self,
                                                items: [generatedItem],
                                            });
                                        }
                                    }
                                    catch (err) {
                                        Sentry.captureException(err);
                                    }
                                }
                            }
                        }
                        return [3, 74];
                    case 37:
                        if (!(action === Types.Messages.TELEPORT || action === Types.Messages.STONETELEPORT)) return [3, 41];
                        console.info("TELEPORT: " + self.name + "(" + params[0] + ", " + params[1] + ")");
                        isStoneTeleport = action === Types.Messages.STONETELEPORT;
                        isTeleport = action === Types.Messages.TELEPORT;
                        x = void 0;
                        y = void 0;
                        orientation_1 = self.orientation;
                        if (isTeleport) {
                            x = params[0];
                            y = params[1];
                            orientation_1 = params[2];
                        }
                        else {
                        }
                        isItemConsumed = false;
                        isNear = false;
                        playerToTeleportTo = isStoneTeleport ? self.server.getEntityById(params[0]) : null;
                        playerToTeleportToLocation = playerToTeleportTo
                            ? getEntityLocation({ x: playerToTeleportTo.x, y: playerToTeleportTo.y })
                            : null;
                        errorMessage = "";
                        if (!(isStoneTeleport && playerToTeleportTo)) return [3, 40];
                        if ((playerToTeleportTo === null || playerToTeleportTo === void 0 ? void 0 : playerToTeleportTo.partyId) === self.partyId) {
                            if (isExpansion1Location.includes(playerToTeleportToLocation) && !self.expansion1) {
                                errorMessage = " You can't teleport to Freeznig Lands location before you kill the Skeleton King.";
                            }
                            if (isExpansion2Location.includes(playerToTeleportToLocation) && !self.expansion2) {
                                errorMessage = " You can't teleport to a Lost Temple location, you don't have the expansion.";
                            }
                            isNear = Math.abs(self.x - playerToTeleportTo.x) <= 32 && Math.abs(self.y - playerToTeleportTo.y) <= 32;
                            if (isNear) {
                                errorMessage = " The player you want to teleport to within 32 tiles.";
                            }
                            if (playerToTeleportToLocation === "town") {
                                errorMessage = " The player you want to teleport to is in Town.";
                            }
                            _c = getisValidMinLevelLocation(playerToTeleportToLocation, self.level), locationErrorMessage = _c.message, isValid = _c.isValid;
                            if (!isValid || locationErrorMessage) {
                                errorMessage = locationErrorMessage;
                            }
                        }
                        if (isStoneTeleport) {
                            x = playerToTeleportTo.x;
                            y = playerToTeleportTo.y;
                        }
                        if (!errorMessage) return [3, 38];
                        self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "".concat(errorMessage, ". Teleport stone was not consumed.")).serialize());
                        return [3, 40];
                    case 38:
                        if (!(isStoneTeleport && playerToTeleportTo && self.server.isValidPosition(x, y))) return [3, 40];
                        return [4, this.databaseHandler.useInventoryItem(self, "stoneteleport")];
                    case 39:
                        isItemConsumed = _z.sent();
                        self.send([
                            Types.Messages.STONETELEPORT_CHECK,
                            {
                                x: x,
                                y: y,
                                playerId: playerToTeleportTo === null || playerToTeleportTo === void 0 ? void 0 : playerToTeleportTo.id,
                                confirmed: true,
                                isValid: isItemConsumed,
                            },
                        ]);
                        _z.label = 40;
                    case 40:
                        self.orientation = orientation_1;
                        if (x >= 33 && x <= 39 && y >= 208 && y <= 211) {
                            if (Object.keys(self.attackers).length || (self.y >= 195 && self.y <= 259)) {
                                return [2];
                            }
                        }
                        if (self.server.isValidPosition(x, y) && !errorMessage) {
                            if (x === 98 && y === 764) {
                                deathAngelLevel = self.server.getEntityById(self.server.leverDeathAngelNpcId);
                                deathAngelDoor = self.server.getEntityById(self.server.doorDeathAngelNpcId);
                                deathAngel = self.server.deathAngel;
                                if (!deathAngelLevel.isActivated || !deathAngelDoor.isActivated || deathAngel.isDead) {
                                    return [2];
                                }
                                if (deathAngel.x !== self.server.deathAngelSpawnCoords.x &&
                                    deathAngel.y !== self.server.deathAngelSpawnCoords.y) {
                                    possibleTeleportCoords = [
                                        { x: 90, y: 749 },
                                        { x: 107, y: 749 },
                                        { x: 107, y: 764 },
                                        { x: 90, y: 764 },
                                        { x: 100, y: 760 },
                                        { x: 95, y: 750 },
                                    ];
                                    _q = _.shuffle(possibleTeleportCoords)[0], x = _q.x, y = _q.y;
                                }
                                self.send([Types.Messages.DEATHANGEL_CHECK, { x: x, y: y }]);
                            }
                            if (self.petEntity) {
                                self.petEntity.setPosition(x, y);
                            }
                            self.setPosition(x, y);
                            self.clearTarget();
                            self.broadcast(new Messages.Teleport(self));
                            self.zone_callback();
                            self.server.handlePlayerVanish(self);
                            self.sendLevelInProgress();
                        }
                        else {
                            return [2];
                        }
                        return [3, 74];
                    case 41:
                        if (!(action === Types.Messages.BOSS_CHECK)) return [3, 42];
                        if (self.hash && !params[0]) {
                            self.connection.send({
                                type: Types.Messages.BOSS_CHECK,
                                status: "completed",
                                hash: self.hash,
                            });
                            return [2];
                        }
                        if (!self.hash) {
                            if (self.createdAt + MIN_TIME > Date.now() || self.level < MIN_SKELETON_KING_LEVEL) {
                                self.connection.send({
                                    type: Types.Messages.BOSS_CHECK,
                                    status: "failed",
                                    message: MIN_SKELETON_KING_LEVEL,
                                });
                                return [2];
                            }
                            else if (!self.account && !params[0]) {
                                self.connection.send({
                                    type: Types.Messages.BOSS_CHECK,
                                    status: "missing-account",
                                });
                                return [2];
                            }
                        }
                        position = Math.floor(Math.random() * 6) + 1;
                        date = "".concat(Date.now());
                        check = "".concat(date.slice(0, position)).concat(position).concat(date.slice(position)).concat(position);
                        self.connection.send({
                            type: Types.Messages.BOSS_CHECK,
                            status: "ok",
                            check: check,
                        });
                        return [3, 74];
                    case 42:
                        if (!(action === Types.Messages.REQUEST_PAYOUT)) return [3, 50];
                        isClassicPayout = params[0] && params[0] === Types.Entities.BOSS;
                        playerLocation = getEntityLocation({ x: self.x, y: self.y });
                        if (playerLocation !== "skeletonking") {
                            until = 365 * 24 * 60 * 60 * 1000 + Date.now();
                            databaseHandler.banPlayerByIP({
                                admin: "auto-mod",
                                player: self,
                                reason: "cheating",
                                until: until,
                                message: "invalid payout request, playerLocation: ".concat(playerLocation, ", x: ").concat(self.x, ", y: ").concat(self.y),
                            });
                        }
                        return [4, self.databaseHandler.foundAchievement(self, ACHIEVEMENT_HERO_INDEX)];
                    case 43:
                        _z.sent();
                        if (isClassicPayout &&
                            (self.createdAt + MIN_TIME > Date.now() ||
                                self.level < MIN_SKELETON_KING_LEVEL ||
                                !self.achievement[1] ||
                                !self.achievement[11] ||
                                !self.achievement[16])) {
                            banMessage = "";
                            if (self.hash) {
                                banMessage = "Already have hash ".concat(self.hash);
                            }
                            else if (self.createdAt + MIN_TIME > Date.now()) {
                                banMessage = "Less then 15 minutes played ".concat(Date.now() - (self.createdAt + MIN_TIME));
                            }
                            else if (self.level < MIN_SKELETON_KING_LEVEL) {
                                banMessage = "Min level not obtained, player is level ".concat(self.level);
                            }
                            else if (!self.achievement[1] || !self.achievement[11] || !self.achievement[16]) {
                                banMessage = "Player has not compl  eted required quests ".concat(self.achievement[1], ", ").concat(self.achievement[11], ", ").concat(self.achievement[16], "}");
                            }
                            if (self.hash) {
                                return [2];
                            }
                            if (banMessage) {
                                console.info("Reason: ".concat(banMessage));
                                databaseHandler.banPlayerByIP({
                                    player: self,
                                    reason: "cheating",
                                    message: banMessage,
                                });
                                return [2];
                            }
                            else {
                                self.connection.send({
                                    type: Types.Messages.NOTIFICATION,
                                    message: "Payout is being sent!",
                                });
                            }
                        }
                        amount = void 0;
                        maxAmount = void 0;
                        raiPayoutAmount = void 0;
                        if (isClassicPayout && !self.hasRequestedBossPayout && self.network && self.account) {
                            self.hasRequestedBossPayout = true;
                            try {
                                amount = getClassicPayout(self.achievement.slice(0, 24), self.network);
                                if (!amount) {
                                    databaseHandler.banPlayerByIP({
                                        player: self,
                                        reason: "cheating",
                                        message: "**".concat(self.name, "** invalid payout ").concat(amount),
                                    });
                                    postMessageToModeratorSupportChannel("**".concat(self.name, "** Tried to withdraw invalid amount"));
                                }
                                maxAmount = getClassicMaxPayout(self.network);
                                raiPayoutAmount = rawToRai(amount, self.network);
                            }
                            catch (err) {
                                throw new Error("**".concat(self.name, "** invalid getClassicPayout"));
                            }
                        }
                        else {
                            return [2];
                        }
                        if (raiPayoutAmount > maxAmount) {
                            databaseHandler.banPlayerByIP({
                                player: self,
                                reason: "cheating",
                                message: "Tried to withdraw ".concat(raiPayoutAmount, " but max is ").concat(maxAmount, " for quest of kind: ").concat(params[0]),
                            });
                            return [2];
                        }
                        console.info("PAYOUT STARTED: " + self.name + " " + self.account + " " + raiPayoutAmount);
                        payoutIndex += 1;
                        self.hasRequestedBossPayout = true;
                        isPayoutEnqueued = self.network && self.hasWallet && !self.hash && self.hasRequestedBossPayout;
                        if (!isPayoutEnqueued) return [3, 45];
                        return [4, enqueueSendPayout({
                                playerName: self.name,
                                account: self.account,
                                amount: amount,
                                payoutIndex: payoutIndex,
                                network: self.network,
                            })];
                    case 44:
                        _d = _z.sent();
                        return [3, 46];
                    case 45:
                        _d = {};
                        _z.label = 46;
                    case 46:
                        response = _d;
                        _e = response, err = _e.err, responseMsg = _e.message, payeoutHash = _e.hash;
                        self.hash = payeoutHash;
                        if (!payeoutHash) return [3, 48];
                        console.info("PAYOUT COMPLETED: ".concat(self.name, " ").concat(self.account, " for quest of kind: ").concat(params[0]));
                        return [4, self.databaseHandler.foundAchievement(self, ACHIEVEMENT_HERO_INDEX)];
                    case 47:
                        _z.sent();
                        maxPayoutOutput = raiPayoutAmount === maxAmount
                            ? "Completed all ahievements like a BOSS ".concat(EmojiMap.Bebeking, " for Max Payout!")
                            : "";
                        messageToPayoutsChannel = "**".concat(self.name, "** killed the Skeleton King ").concat(EmojiMap.skeletonking, " ").concat(maxPayoutOutput, " and received a payout of **").concat(raiPayoutAmount, "** ").concat(self.network === "nano" ? "XNO" : "BAN", " \uD83C\uDF89");
                        postMessageToDiscordPayoutsChannel(messageToPayoutsChannel);
                        if (isPayoutEnqueued && isClassicPayout && payeoutHash) {
                            self.hasRequestedBossPayout = true;
                            self.hash = hash;
                            databaseHandler.setHash(self.name, payeoutHash);
                        }
                        return [3, 49];
                    case 48:
                        console.info("PAYOUT FAILED: " + self.name + " " + self.account);
                        Sentry.captureException(err, {
                            user: {
                                username: self.name,
                            },
                            tags: {
                                player: self.name,
                                account: self.account,
                            },
                            extra: { status: "PAYOUT FAILED" },
                        });
                        _z.label = 49;
                    case 49:
                        self.connection.send({
                            type: Types.Messages.NOTIFICATION,
                            message: responseMsg,
                            hash: self.payeoutHash,
                        });
                        self.server.updatePopulation();
                        return [3, 74];
                    case 50:
                        if (!(action === Types.Messages.BAN_PLAYER)) return [3, 51];
                        databaseHandler.banPlayerByIP({
                            player: self,
                            reason: "cheating",
                            message: params[0],
                        });
                        return [3, 74];
                    case 51:
                        if (!(action === Types.Messages.OPEN)) return [3, 52];
                        console.info("OPEN: " + self.name + " " + params[0]);
                        chest = self.server.getEntityById(params[0]);
                        if (chest && chest instanceof Chest) {
                            self.server.handleOpenedChest(chest, self);
                        }
                        return [3, 74];
                    case 52:
                        if (!(action === Types.Messages.CHECK)) return [3, 53];
                        console.info("CHECK: " + self.name + " " + params[0]);
                        checkpoint = self.server.map.getCheckpoint(params[0]);
                        if (checkpoint) {
                            self.lastCheckpoint = checkpoint;
                            databaseHandler.setCheckpoint(self.name, self.x, self.y);
                        }
                        return [3, 74];
                    case 53:
                        if (!(action === Types.Messages.MOVE_ITEM)) return [3, 54];
                        console.info("MOVE ITEM: " + self.name + " " + params[0] + " " + params[1]);
                        quantity = params[2];
                        if (quantity && !validateQuantity(quantity)) {
                            return [2];
                        }
                        databaseHandler.moveItem({ player: self, fromSlot: params[0], toSlot: params[1], quantity: quantity });
                        return [3, 74];
                    case 54:
                        if (!(action === Types.Messages.MOVE_ITEMS_TO_INVENTORY)) return [3, 55];
                        panel = params[0];
                        console.info("MOVE ITEMS TO INVENTORY: ".concat(self.name, " Panel: ").concat(panel));
                        if (["upgrade", "trade"].includes(panel)) {
                            databaseHandler.moveItemsToInventory(self, panel);
                        }
                        return [3, 74];
                    case 55:
                        if (!(action === Types.Messages.MOVE_TRADE_ITEMS_TO_INVENTORY)) return [3, 56];
                        console.info("MOVE TRADE ITEMS TO INVENTORY: " + self.name);
                        databaseHandler.moveItemsToInventory(self, "trade");
                        return [3, 74];
                    case 56:
                        if (!(action === Types.Messages.GOLD.MOVE)) return [3, 57];
                        amount = params[0];
                        from = params[1];
                        to = params[2];
                        console.info("MOVE GOLD: ".concat(self.name, ", AMOUNT: ").concat(amount, ", FROM: ").concat(from, ", TO: ").concat(to));
                        if (!validateQuantity(amount)) {
                            return [2];
                        }
                        if (!from || !to)
                            return [2];
                        if (from === "inventory" && amount > self.gold)
                            return [2];
                        if (from === "stash" && amount > self.goldStash)
                            return [2];
                        if (from === "trade" && amount > self.goldTrade)
                            return [2];
                        if (from === "trade" || to === "trade") {
                            tradeInstance = self.server.getTrade(self.tradeId);
                            if (!(tradeInstance === null || tradeInstance === void 0 ? void 0 : tradeInstance.players.find(function (_a) {
                                var id = _a.id;
                                return id === self.id;
                            }))) {
                                Sentry.captureException(new Error("Invalid trade instance or Player ".concat(self.name, " not part of it")));
                                return [2];
                            }
                            tradeInstance.updateGold({ player1Id: self.id, from: from, to: to, amount: amount });
                        }
                        else {
                            databaseHandler.moveGold({ player: self, from: from, to: to, amount: amount });
                        }
                        return [3, 74];
                    case 57:
                        if (!(action === Types.Messages.GOLD.BANK)) return [3, 61];
                        if (!params[0]) return [3, 59];
                        return [4, databaseHandler.withdrawFromBank({ player: self })];
                    case 58:
                        amount = _z.sent();
                        self.send([Types.Messages.GOLD.BANK_WITHDRAW, amount]);
                        return [3, 60];
                    case 59:
                        self.send([Types.Messages.GOLD.BANK, self.server.goldBank]);
                        _z.label = 60;
                    case 60: return [3, 74];
                    case 61:
                        if (!(action === Types.Messages.UPGRADE_ITEM)) return [3, 62];
                        console.info("UPGRADE ITEM: " + self.name);
                        databaseHandler.upgradeItem(self);
                        return [3, 74];
                    case 62:
                        if (!(action === Types.Messages.ACHIEVEMENT)) return [3, 73];
                        console.info("ACHIEVEMENT: " + self.name + " " + params[0] + " " + params[1]);
                        index = Number(params[0]) - 1;
                        if (!(params[1] === "found" && !self.achievement[index])) return [3, 72];
                        self.achievement[index] = 1;
                        _h = index === ACHIEVEMENT_NFT_INDEX;
                        if (!_h) return [3, 64];
                        return [4, databaseHandler.useInventoryItem(self, "nft")];
                    case 63:
                        _h = !(_z.sent());
                        _z.label = 64;
                    case 64:
                        _g = (_h);
                        if (_g) return [3, 67];
                        _j = index === ACHIEVEMENT_WING_INDEX;
                        if (!_j) return [3, 66];
                        return [4, databaseHandler.useInventoryItem(self, "wing")];
                    case 65:
                        _j = !(_z.sent());
                        _z.label = 66;
                    case 66:
                        _g = (_j);
                        _z.label = 67;
                    case 67:
                        _f = _g;
                        if (_f) return [3, 70];
                        _k = index === ACHIEVEMENT_CRYSTAL_INDEX;
                        if (!_k) return [3, 69];
                        return [4, databaseHandler.useInventoryItem(self, "crystal")];
                    case 68:
                        _k = !(_z.sent());
                        _z.label = 69;
                    case 69:
                        _f = (_k);
                        _z.label = 70;
                    case 70:
                        if (_f) {
                            return [2];
                        }
                        return [4, databaseHandler.foundAchievement(self, index)];
                    case 71:
                        _z.sent();
                        if (index === ACHIEVEMENT_GRIMOIRE_INDEX) {
                            self.hasGrimoire = true;
                            self.equipItem({});
                            postMessageToDiscordEventChannel("".concat(self.name, " uncovered the long-lost Grimoire ").concat(EmojiMap.grimoire));
                        }
                        else if (index === ACHIEVEMENT_OBELISK_INDEX) {
                            self.hasObelisk = true;
                            self.equipItem({});
                            postMessageToDiscordEventChannel("".concat(self.name, " found the Obelisk of Eternal Life ").concat(EmojiMap.obelisklarge));
                        }
                        _z.label = 72;
                    case 72: return [3, 74];
                    case 73:
                        if (action === Types.Messages.WAYPOINT) {
                            console.info("WAYPOINT: " + self.name + " " + params[0] + " " + params[1]);
                            index = parseInt(params[0]) - 1;
                            if (params[1] === "found" && !self.waypoints[index]) {
                                self.waypoints[index] = 1;
                                databaseHandler.foundWaypoint(self.name, index);
                            }
                        }
                        else if (action === Types.Messages.PURCHASE_CREATE) {
                            console.info("PURCHASE_CREATE: " + self.name + " " + params[0] + " " + params[1]);
                            if (params[1] === self.depositAccount && self.network) {
                                purchase[self.network].create({ player: self, account: self.depositAccount, id: params[0] });
                            }
                        }
                        else if (action === Types.Messages.PURCHASE_CANCEL) {
                            console.info("PURCHASE_CANCEL: " + self.name + " " + self.depositAccount);
                            (_t = purchase[self.network]) === null || _t === void 0 ? void 0 : _t.cancel(self.depositAccount);
                        }
                        else if (action === Types.Messages.STORE_ITEMS) {
                            console.info("STORE_ITEMS");
                            items = store.getItems();
                            self.send([Types.Messages.STORE_ITEMS, items]);
                        }
                        else if (action === Types.Messages.PARTY) {
                            isWorldPartyUpdate = false;
                            if (params[0] === Types.Messages.PARTY_ACTIONS.CREATE) {
                                if (!self.partyId) {
                                    self.server.partyCreate(self);
                                    isWorldPartyUpdate = true;
                                }
                                else {
                                    self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "Leave current party to create a party").serialize());
                                }
                            }
                            else if (params[0] === Types.Messages.PARTY_ACTIONS.JOIN) {
                                party = self.server.parties[params[1]];
                                if (!party) {
                                    self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "There is no party id ".concat(params[1])).serialize());
                                }
                                else {
                                    party.addMember(self);
                                    isWorldPartyUpdate = true;
                                }
                            }
                            else if (params[0] === Types.Messages.PARTY_ACTIONS.REFUSE) {
                                party = self.server.parties[params[1]];
                                if (!party) {
                                    self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "There is no party id ".concat(params[1])).serialize());
                                }
                                else {
                                    party.refuse(self);
                                }
                            }
                            else if (params[0] === Types.Messages.PARTY_ACTIONS.INVITE) {
                                party = self.getParty();
                                if (!party) {
                                    self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "You need to be in a party to invite other players").serialize());
                                }
                                else if (party.partyLeader.id !== self.id) {
                                    self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "Only the party leader can invite other players").serialize());
                                }
                                else {
                                    playerToInvite = self.server.getPlayerByName(params[1]);
                                    if (!playerToInvite) {
                                        self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "".concat(params[1], " is not online")).serialize());
                                    }
                                    else if (playerToInvite.partyId) {
                                        self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "".concat(playerToInvite.name, " is already in a party")).serialize());
                                    }
                                    else if (!playerToInvite.settings.partyEnabled) {
                                        self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "".concat(playerToInvite.name, " has blocked party requests")).serialize());
                                    }
                                    else if (party.sentInvites[playerToInvite.id]) {
                                        self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "".concat(playerToInvite.name, " is already invited")).serialize());
                                    }
                                    else {
                                        party.invite(playerToInvite);
                                        self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.INFO, "Party invite sent to ".concat(playerToInvite.name)).serialize());
                                        isWorldPartyUpdate = true;
                                    }
                                }
                            }
                            else if (params[0] === Types.Messages.PARTY_ACTIONS.LEAVE) {
                                (_u = self.getParty()) === null || _u === void 0 ? void 0 : _u.removeMember(self);
                                isWorldPartyUpdate = true;
                            }
                            else if (params[0] === Types.Messages.PARTY_ACTIONS.REMOVE) {
                                if (self.id === ((_v = self.getParty()) === null || _v === void 0 ? void 0 : _v.partyLeader.id)) {
                                    playerToRemove = self.server.getPlayerByName(params[1]);
                                    if (!playerToRemove) {
                                        self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "".concat(params[1], " is not online")).serialize());
                                    }
                                    else if (playerToRemove.partyId !== self.partyId) {
                                        self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "".concat(playerToRemove.name, " is not in the party")).serialize());
                                    }
                                    else {
                                        self.getParty().removeMember(playerToRemove);
                                        isWorldPartyUpdate = true;
                                    }
                                }
                                else {
                                    self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "Only the party leader can remove a player from the party").serialize());
                                }
                            }
                            else if (params[0] === Types.Messages.PARTY_ACTIONS.DISBAND) {
                                if (self.id === ((_w = self.getParty()) === null || _w === void 0 ? void 0 : _w.partyLeader.id)) {
                                    self.getParty().disband();
                                    isWorldPartyUpdate = true;
                                }
                                else {
                                    self.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "Only the party leader can disband the party").serialize());
                                }
                            }
                            if (isWorldPartyUpdate) {
                                self.server.updatePopulation();
                            }
                        }
                        else if (action === Types.Messages.TRADE) {
                            if (params[0] === Types.Messages.TRADE_ACTIONS.REQUEST_SEND) {
                                playerToTradeWith = self.server.getPlayerByName(params[1]);
                                if (!playerToTradeWith) {
                                    self.send(new Messages.Trade(Types.Messages.TRADE_ACTIONS.ERROR, "".concat(params[1], " is not online")).serialize());
                                }
                                else if (!playerToTradeWith.settings.tradeEnabled) {
                                    self.send(new Messages.Trade(Types.Messages.TRADE_ACTIONS.ERROR, "".concat(params[1], " has disabled trade requests")).serialize());
                                }
                                else if (!playerToTradeWith.achievement[ACHIEVEMENT_HERO_INDEX]) {
                                    self.send(new Messages.Trade(Types.Messages.TRADE_ACTIONS.ERROR, "".concat(params[1], " has not yet killed the Skeleton King.")).serialize());
                                }
                                else if (playerToTradeWith.hasTrade()) {
                                    self.send(new Messages.Trade(Types.Messages.TRADE_ACTIONS.ERROR, "".concat(params[1], " is already trading with another player")).serialize());
                                }
                                else if (self.hasTrade()) {
                                    self.send(new Messages.Trade(Types.Messages.TRADE_ACTIONS.ERROR, "You are already trading with a player").serialize());
                                }
                                else {
                                    self.send(new Messages.Trade(Types.Messages.TRADE_ACTIONS.INFO, "Trade request sent to ".concat(params[1])).serialize());
                                    playerToTradeWith.send(new Messages.Trade(Types.Messages.TRADE_ACTIONS.REQUEST_RECEIVE, self.name).serialize());
                                }
                            }
                            else if (params[0] === Types.Messages.TRADE_ACTIONS.REQUEST_REFUSE) {
                                playerToTradeWith = self.server.getPlayerByName(params[1]);
                                if (playerToTradeWith) {
                                    playerToTradeWith.send(new Messages.Trade(Types.Messages.TRADE_ACTIONS.INFO, "".concat(self.name, " declined the trade request")).serialize());
                                }
                            }
                            else if (params[0] === Types.Messages.TRADE_ACTIONS.REQUEST_ACCEPT) {
                                playerToTradeWith = self.server.getPlayerByName(params[1]);
                                if (playerToTradeWith) {
                                    playerToTradeWith.send(new Messages.Trade(Types.Messages.TRADE_ACTIONS.INFO, "".concat(self.name, " accepted the trade request")).serialize());
                                    self.server.tradeCreate(playerToTradeWith.id, self.id);
                                }
                            }
                            else if (params[0] === Types.Messages.TRADE_ACTIONS.CLOSE) {
                                (_x = self.server.trades[self.tradeId]) === null || _x === void 0 ? void 0 : _x.close({ playerName: self.name });
                            }
                            else if (params[0] === Types.Messages.TRADE_ACTIONS.PLAYER1_STATUS) {
                                (_y = self.server.trades[self.tradeId]) === null || _y === void 0 ? void 0 : _y.status({ player1Id: self.id, isAccepted: params[1] });
                            }
                        }
                        else if (action === Types.Messages.MERCHANT.BUY) {
                            fromSlot = params[0];
                            toSlot = params[1];
                            quantity = params[2];
                            if (!validateQuantity(quantity)) {
                                return [2];
                            }
                            self.databaseHandler.buyFromMerchant({ player: self, fromSlot: fromSlot, toSlot: toSlot, quantity: quantity });
                        }
                        else if (action === Types.Messages.MERCHANT.SELL) {
                            fromSlot = params[0];
                            quantity = params[1];
                            if (!validateQuantity(quantity)) {
                                return [2];
                            }
                            self.databaseHandler.sellToMerchant({ player: self, fromSlot: fromSlot, quantity: quantity });
                        }
                        else if (action === Types.Messages.SETTINGS) {
                            this.databaseHandler.setSettings(this, params[0]);
                            this.broadcast(new Messages.Settings(this, self.settings), false);
                        }
                        else if (action === Types.Messages.SKILL) {
                            slot = params[0];
                            mobId = params[1];
                            isAttackSkill = slot === 1;
                            skill = isAttackSkill ? this.attackSkill : this.defenseSkill;
                            shouldBroadcast = false;
                            level = void 0;
                            if (isAttackSkill) {
                                if (typeof this.attackSkill !== "number" || this.attackSkillTimeout)
                                    return [2];
                                attackedMob = self.server.getEntityById(mobId);
                                if (!attackedMob || (attackedMob.type === "player" && !attackedMob.pvp))
                                    return [2];
                                if (attackedMob.kind === Types.Entities.TREE && this.attackSkill === 1) {
                                    if (!this.server.isActivatedTreeLevel) {
                                        this.server.startTreeLevel(attackedMob);
                                    }
                                    return [2];
                                }
                                shouldBroadcast = true;
                                mobResistances = Types.getResistance(attackedMob, self);
                                mobResistance = (mobResistances === null || mobResistances === void 0 ? void 0 : mobResistances[Types.attackSkillToResistanceType[this.attackSkill]]) || 0;
                                if (attackedMob instanceof Player) {
                                    mobResistance = Types.calculateResistance(mobResistance + attackedMob.skill.resistances, attackedMob.curse.resistances);
                                }
                                _l = Types.getAttackSkill({
                                    skill: this.attackSkill,
                                    level: this.weaponLevel,
                                    bonus: this.bonus,
                                    resistance: mobResistance,
                                    itemClass: Types.getItemClass(this.weapon, this.weaponLevel, this.isWeaponUnique),
                                }), min = _l.min, max = _l.max;
                                dmg = randomInt(min, max);
                                if (attackedMob.type === "mob") {
                                    this.server.handleMobHate(attackedMob.id, this.id, dmg);
                                    if (Types.isBoss(attackedMob.kind)) {
                                        dmg = this.server.handleBossDmg({ dmg: dmg, entity: attackedMob, player: this });
                                    }
                                    attackedMob.receiveDamage(dmg);
                                }
                                else if (attackedMob.type === "player") {
                                    attackedMob.hitPoints -= dmg;
                                }
                                originalTimeout = Math.floor(Types.attackSkillDelay[this.attackSkill]);
                                timeout = Math.round(originalTimeout - originalTimeout * (Types.calculateSkillTimeout(this.bonus.skillTimeout) / 100));
                                if (Types.skillToNameMap[this.attackSkill] === "poison") {
                                    this.startPoisoned({ dmg: dmg, entity: attackedMob, resistance: mobResistance, attacker: this });
                                }
                                this.attackSkillTimeout = setTimeout(function () {
                                    _this.attackSkillTimeout = null;
                                }, timeout);
                                this.server.handleHurtEntity({ entity: attackedMob, attacker: this, dmg: dmg });
                            }
                            else {
                                if (typeof this.defenseSkill !== "number" || this.defenseSkillTimeout)
                                    return [2];
                                shouldBroadcast = true;
                                level = this.shieldLevel;
                                if (this.defenseSkill === 0) {
                                    if (!self.hasFullHealth()) {
                                        percent = Types.getDefenseSkill(0, this.shieldLevel).stats;
                                        healAmount = Math.round((percent / 100) * this.maxHitPoints);
                                        healthDiff = this.maxHitPoints - this.hitPoints;
                                        if (healthDiff < healAmount) {
                                            healAmount = healthDiff;
                                        }
                                        self.regenerateHealthBy(healAmount);
                                        self.server.pushToPlayer(self, self.health());
                                    }
                                }
                                else if (this.defenseSkill === 1) {
                                    percent = Types.getDefenseSkill(1, this.shieldLevel).stats;
                                    if (self.hasCurse()) {
                                        self.resetCurse();
                                    }
                                    self.skill.defense = percent;
                                    self.sendPlayerStats();
                                    self.defenseSkillDefenseTimeout = setTimeout(function () {
                                        self.skill.defense = 0;
                                        self.sendPlayerStats();
                                        self.defenseSkillDefenseTimeout = null;
                                    }, Types.defenseSkillDurationMap[this.defenseSkill](this.shieldLevel));
                                }
                                else if (this.defenseSkill === 2) {
                                    percent = Types.getDefenseSkill(2, this.shieldLevel).stats;
                                    self.skill.resistances = percent;
                                    self.sendPlayerStats();
                                    self.defenseSkillResistancesTimeout = setTimeout(function () {
                                        self.skill.resistances = 0;
                                        self.sendPlayerStats();
                                        self.defenseSkillResistancesTimeout = null;
                                    }, Types.defenseSkillDurationMap[this.defenseSkill](this.shieldLevel));
                                }
                                originalTimeout = Math.floor(Types.defenseSkillDelay[this.defenseSkill]);
                                timeout = Math.round(originalTimeout - originalTimeout * (Types.calculateSkillTimeout(this.bonus.skillTimeout) / 100));
                                self.defenseSkillTimeout = setTimeout(function () {
                                    self.defenseSkillTimeout = null;
                                }, timeout);
                            }
                            if (shouldBroadcast) {
                                self.broadcast(new Messages.Skill(this, { skill: skill, level: level, isAttackSkill: isAttackSkill, mobId: mobId }), false);
                            }
                        }
                        else {
                            if (self.message_callback) {
                                self.message_callback(message);
                            }
                        }
                        _z.label = 74;
                    case 74: return [2];
                }
            });
        }); });
        _this.connection.onClose(function () {
            var _a;
            if (self.firefoxpotionTimeout) {
                clearTimeout(self.firefoxpotionTimeout);
            }
            if (self.poisonedInterval) {
                clearInterval(self.poisonedInterval);
            }
            if (self.cursedTimeout) {
                clearTimeout(self.cursedTimeout);
            }
            if (self.chatTimeout) {
                clearTimeout(self.chatTimeout);
            }
            (_a = self.exit_callback) === null || _a === void 0 ? void 0 : _a.call(self);
        });
        _this.connection.sendUTF8("go");
        return _this;
    }
    Player.prototype.generateRandomCapeBonus = function (uniqueChances) {
        if (uniqueChances === void 0) { uniqueChances = 1; }
        var randomIsUnique = random(100);
        var isUnique = randomIsUnique < uniqueChances;
        var baseBonus = [0, 1, 2, 7, 8];
        var uniqueBonus = [3, 4, 5, 6];
        return _.shuffle(baseBonus)
            .slice(0, 1)
            .concat(isUnique ? _.shuffle(uniqueBonus).slice(0, 1) : []);
    };
    Player.prototype.generateItem = function (_a) {
        var _b = _a.level, level = _b === void 0 ? 1 : _b, kind = _a.kind, _c = _a.uniqueChances, uniqueChances = _c === void 0 ? 1 : _c, _d = _a.superiorChances, superiorChances = _d === void 0 ? 1 : _d, _e = _a.isLuckySlot, isLuckySlot = _e === void 0 ? false : _e, _f = _a.jewelLevel, jewelLevel = _f === void 0 ? 1 : _f, _g = _a.skin, skin = _g === void 0 ? 1 : _g, _h = _a.bonus, bonus = _h === void 0 ? [] : _h, _j = _a.socket, socket = _j === void 0 ? null : _j;
        var isUnique = false;
        var isSuperior = false;
        var item;
        var lowLevelBonus = [0, 1, 2, 3];
        var mediumLevelBonus = [0, 1, 2, 3, 4, 5];
        var highLevelBonus = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        var amuletHighLevelBonus = [9, 10];
        var drainLifeBonus = [13];
        var flameDamageBonus = [14];
        var lightningDamageBonus = [15];
        var pierceDamageBonus = [16];
        var highHealthBonus = [17];
        var coldDamageBonus = [18];
        var freezeChanceBonus = [19];
        var reduceFrozenChanceBonus = [20];
        var resistances = [21, 22, 23, 24, 25];
        var elementPercentage = [27, 28, 29, 30, 31];
        var allResistance = [32];
        var timeout = [35];
        var elementDamage = [4, 14, 15, 16, 18, 34];
        var lowerResistance = [36, 37, 38, 39, 40];
        var lowerAllResistance = [41];
        var extraGold = [42];
        var magicFind = [11];
        var attackSpeed = [12];
        var superior = [43];
        var preventHealthRegen = [33];
        if (Types.isArmor(kind) ||
            Types.isHelm(kind) ||
            Types.isWeapon(kind) ||
            Types.isBelt(kind) ||
            Types.isShield(kind)) {
            var randomIsUnique = random(100);
            var randomIsSuperior = random(100);
            isUnique = randomIsUnique < uniqueChances;
            isSuperior = randomIsSuperior < superiorChances;
            if ([Types.Entities.HELMCLOWN, Types.Entities.HELMPUMKIN, Types.Entities.BELTGOLDWRAP].includes(kind)) {
                isUnique = true;
            }
            var baseLevel = Types.getBaseLevel(kind);
            level = baseLevel <= 5 && !isUnique ? randomInt(1, 3) : 1;
            var skill = null;
            if (isUnique) {
                if (Types.isHelm(kind) || Types.isArmor(kind)) {
                    if (kind === Types.Entities.HELMCLOWN) {
                        bonus = _.shuffle(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], highLevelBonus, true), elementDamage, true), elementPercentage, true), reduceFrozenChanceBonus, true), timeout, true), attackSpeed, true))
                            .slice(0, 1)
                            .concat(allResistance);
                    }
                    else if (kind === Types.Entities.HELMPUMKIN) {
                        bonus = _.shuffle(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], extraGold, true), extraGold, true), magicFind, true), magicFind, true))
                            .slice(0, 3)
                            .concat(_.shuffle(highLevelBonus).slice(0, 3))
                            .sort();
                    }
                    else {
                        bonus = [6];
                    }
                }
                else if (Types.isWeapon(kind)) {
                    bonus = [3, 14];
                }
                else if (Types.isBelt(kind)) {
                    if (kind === Types.Entities.BELTGOLDWRAP) {
                        bonus = __spreadArray(__spreadArray([], extraGold, true), magicFind, true);
                    }
                    else {
                        bonus = _.shuffle(mediumLevelBonus).slice(0, 1).sort();
                    }
                }
            }
            if (Types.isShield(kind) && kind >= Types.Entities.SHIELDGOLDEN) {
                skill = getRandomDefenseSkill();
                bonus = _.shuffle(resistances)
                    .slice(0, isUnique ? 2 : 1)
                    .sort();
            }
            else if (Types.isWeapon(kind) && kind >= Types.Entities.GOLDENSWORD) {
                skill = getRandomAttackSkill();
            }
            if (isSuperior) {
                bonus = bonus.concat(superior);
            }
            item = {
                item: Types.getKindAsString(kind),
                level: level,
                bonus: bonus ? JSON.stringify(bonus) : null,
                socket: JSON.stringify(getRandomSockets({ kind: kind, baseLevel: baseLevel, isLuckySlot: isLuckySlot })),
                skill: skill,
                isUnique: isUnique,
            };
        }
        else if (Types.isScroll(kind) || Types.isSingle(kind) || Types.isStone(kind) || Types.isBar(kind)) {
            item = { item: Types.getKindAsString(kind), quantity: 1 };
        }
        else if (Types.isCape(kind)) {
            bonus = this.generateRandomCapeBonus(uniqueChances);
            item = { item: Types.getKindAsString(kind), level: 1, bonus: JSON.stringify(bonus.sort(function (a, b) { return a - b; })) };
        }
        else if (Types.isPetItem(kind)) {
            var randomIsUnique = random(100);
            isUnique = randomIsUnique < uniqueChances;
            bonus = _.shuffle(highLevelBonus).slice(0, isUnique ? 2 : 1);
            if (kind === Types.Entities.PETCOLLAR) {
                item = {
                    item: Types.getKindAsString(kind),
                    level: level,
                    bonus: "[]",
                    socket: "[]",
                    isUnique: isUnique,
                    skin: 1,
                };
            }
            else if (kind === Types.Entities.PETEGG) {
                item = {
                    item: Types.getKindAsString(kind),
                    level: level,
                };
            }
            else {
                item = {
                    item: Types.getKindAsString(kind),
                    level: level,
                    bonus: JSON.stringify(bonus.sort(function (a, b) { return a - b; })),
                    socket: socket && typeof socket === "string" ? socket : JSON.stringify([0]),
                    skin: skin,
                };
            }
        }
        else if (Types.isRing(kind) || Types.isAmulet(kind) || Types.isJewel(kind)) {
            var randomIsUnique = random(100);
            isUnique = randomIsUnique < uniqueChances;
            if (kind === Types.Entities.RINGBRONZE) {
                bonus = _.shuffle(lowLevelBonus).slice(0, isUnique ? 2 : 1);
            }
            else if (kind === Types.Entities.RINGSILVER || kind === Types.Entities.AMULETSILVER) {
                bonus = _.shuffle(mediumLevelBonus).slice(0, isUnique ? 3 : 2);
            }
            else if (kind === Types.Entities.RINGGOLD) {
                bonus = _.shuffle(highLevelBonus).slice(0, isUnique ? 4 : 3);
            }
            else if (kind === Types.Entities.RINGPLATINUM) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(_.shuffle(elementDamage).slice(0, 1))
                    .concat(isUnique ? allResistance : _.shuffle(resistances).slice(0, 2));
            }
            else if (kind === Types.Entities.AMULETGOLD) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, isUnique ? 3 : 2)
                    .concat(_.shuffle(amuletHighLevelBonus).slice(0, 1));
            }
            else if (kind === Types.Entities.AMULETPLATINUM) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(_.shuffle(amuletHighLevelBonus).slice(0, 1))
                    .concat(_.shuffle(elementDamage).slice(0, 1))
                    .concat(isUnique ? allResistance : _.shuffle(resistances).slice(0, 2));
            }
            else if (kind === Types.Entities.RINGNECROMANCER) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(drainLifeBonus)
                    .concat(_.shuffle([resistances[4], elementPercentage[4]]).slice(0, 1));
            }
            else if (kind === Types.Entities.AMULETCOW) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(_.shuffle(amuletHighLevelBonus).slice(0, 1))
                    .concat(_.shuffle(__spreadArray(__spreadArray(__spreadArray([], flameDamageBonus, true), lightningDamageBonus, true), pierceDamageBonus, true)).slice(0, 1))
                    .concat(_.shuffle(elementPercentage).slice(0, 1));
            }
            else if (kind === Types.Entities.AMULETFROZEN) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(_.shuffle(amuletHighLevelBonus).slice(0, 1))
                    .concat(coldDamageBonus)
                    .concat(freezeChanceBonus)
                    .concat(reduceFrozenChanceBonus)
                    .concat(_.shuffle([resistances[3], elementPercentage[3]]).slice(0, 1));
            }
            else if (kind === Types.Entities.AMULETDEMON) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(_.shuffle(amuletHighLevelBonus).slice(0, 1))
                    .concat(flameDamageBonus)
                    .concat(flameDamageBonus)
                    .concat(elementPercentage[1])
                    .concat(allResistance);
            }
            else if (kind === Types.Entities.AMULETMOON) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 2)
                    .concat(_.shuffle(amuletHighLevelBonus).slice(0, 1))
                    .concat(random(2) ? allResistance : _.shuffle(resistances).slice(0, 2))
                    .concat(_.shuffle(elementDamage).slice(0, 2))
                    .concat(_.shuffle(elementPercentage).slice(0, 2));
            }
            else if (kind === Types.Entities.AMULETCHRISTMAS) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 2)
                    .concat(_.shuffle(amuletHighLevelBonus).slice(0, 1))
                    .concat(random(2) ? allResistance : _.shuffle(resistances).slice(0, 2))
                    .concat(_.shuffle(elementDamage).slice(0, 1))
                    .concat(_.shuffle(elementPercentage).slice(0, 1))
                    .concat(__spreadArray(__spreadArray([], extraGold, true), magicFind, true).slice(0, 1));
            }
            else if (kind === Types.Entities.AMULETSTAR) {
                var isAllResistances = random(2);
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, isAllResistances ? 2 : 3)
                    .slice(0, 2)
                    .concat(amuletHighLevelBonus)
                    .concat(isAllResistances ? allResistance : _.shuffle(resistances).slice(0, 3))
                    .concat(_.shuffle(elementDamage).slice(0, 2))
                    .concat(_.shuffle(elementPercentage).slice(0, 2));
            }
            else if (kind === Types.Entities.AMULETSKULL) {
                var isAllResistances = random(2);
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, isAllResistances ? 2 : 4)
                    .concat(amuletHighLevelBonus.slice(0, 1))
                    .concat(isAllResistances ? allResistance : _.shuffle(resistances).slice(0, 2))
                    .concat(_.shuffle(elementPercentage).slice(0, 2))
                    .concat(_.shuffle(lowerResistance).slice(0, 1));
            }
            else if (kind === Types.Entities.AMULETDRAGON) {
                var isAllResistances = random(2);
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, isAllResistances ? 2 : 4)
                    .concat(_.shuffle(amuletHighLevelBonus).slice(0, 1))
                    .concat(isAllResistances ? allResistance : _.shuffle(resistances).slice(0, 2))
                    .concat([elementPercentage[1], lowerResistance[1]]);
            }
            else if (kind === Types.Entities.AMULETEYE) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(allResistance)
                    .concat(_.shuffle(elementPercentage).slice(0, 1))
                    .concat(timeout)
                    .concat(lowerAllResistance);
            }
            else if (kind === Types.Entities.AMULETGREED) {
                bonus = _.shuffle(highLevelBonus).slice(0, 5).concat(magicFind).concat(extraGold);
            }
            else if (kind === Types.Entities.AMULETIMMORTAL) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 5)
                    .concat(_.shuffle(amuletHighLevelBonus).slice(0, 1))
                    .concat(highHealthBonus)
                    .concat(allResistance);
            }
            else if (kind === Types.Entities.AMULETPALADIN) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 5)
                    .concat(_.shuffle(amuletHighLevelBonus).slice(0, 1))
                    .concat(highHealthBonus)
                    .concat(_.shuffle(__spreadArray(__spreadArray(__spreadArray([], allResistance, true), magicFind, true), extraGold, true)).slice(0, 2))
                    .concat(_.shuffle(elementDamage).slice(0, 2))
                    .concat(_.shuffle(elementPercentage).slice(0, 3));
            }
            else if (kind === Types.Entities.RINGRAISTONE) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(lightningDamageBonus)
                    .concat(_.shuffle([resistances[2], elementPercentage[2]]).slice(0, 1));
            }
            else if (kind === Types.Entities.RINGFOUNTAIN || kind === Types.Entities.RINGPUMKIN) {
                bonus = _.shuffle([5, 6])
                    .slice(0, 2)
                    .concat(__spreadArray([8], highHealthBonus, true))
                    .concat(_.shuffle([7, 11, 12]).slice(0, 1))
                    .concat(_.shuffle(resistances).slice(0, 1));
            }
            else if (kind === Types.Entities.RINGBADOMEN) {
                var isElementorElementPercent = random(2);
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 2)
                    .concat(lowerAllResistance)
                    .concat(timeout)
                    .concat(_.shuffle(__spreadArray(__spreadArray([], extraGold, true), magicFind, true)).slice(0, 1))
                    .concat(preventHealthRegen)
                    .concat(isElementorElementPercent ? _.shuffle(elementPercentage).slice(0, 1) : _.shuffle(elementDamage).slice(0, 2))
                    .concat(_.shuffle(resistances).slice(0, 2));
            }
            else if (kind === Types.Entities.RINGMINOTAUR) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(__spreadArray(__spreadArray([], coldDamageBonus, true), freezeChanceBonus, true))
                    .concat(_.shuffle([resistances[3], elementPercentage[3]]).slice(0, 1));
            }
            else if (kind === Types.Entities.RINGMYSTICAL) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(_.shuffle(resistances).slice(0, 2))
                    .concat(_.shuffle(elementDamage).slice(0, 1))
                    .concat(_.shuffle(elementPercentage).slice(0, 2));
            }
            else if (kind === Types.Entities.RINGBALROG) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(_.shuffle(__spreadArray(__spreadArray([], flameDamageBonus, true), lightningDamageBonus, true)).slice(0, 1))
                    .concat(_.shuffle(resistances).slice(0, 2))
                    .concat(_.shuffle(elementPercentage).slice(0, 2));
            }
            else if (kind === Types.Entities.RINGCONQUEROR) {
                bonus = [0, 1, 2].concat(_.shuffle([3, 5, 6, 7, 8]).slice(0, 3)).concat(_.shuffle(resistances).slice(0, 3));
            }
            else if (kind === Types.Entities.RINGHEAVEN) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 1)
                    .concat(_.shuffle([11, 12]).slice(0, 1))
                    .concat(_.shuffle(elementDamage).slice(0, 1))
                    .concat(_.shuffle(elementPercentage).slice(0, 2))
                    .concat(allResistance);
            }
            else if (kind === Types.Entities.RINGWIZARD) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 1)
                    .concat(_.shuffle(elementDamage).slice(0, 2))
                    .concat(_.shuffle(elementPercentage).slice(0, 2))
                    .concat(_.shuffle(resistances).slice(0, 2))
                    .concat(timeout);
            }
            else if (kind === Types.Entities.RINGGREED) {
                bonus = _.shuffle(highLevelBonus).slice(0, 4).concat(magicFind).concat(extraGold);
            }
            else if (kind === Types.Entities.RINGIMMORTAL) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 4)
                    .concat(_.shuffle(resistances).slice(0, 4))
                    .concat(_.shuffle(highLevelBonus).slice(0, 1));
            }
            else if (kind === Types.Entities.RINGPALADIN) {
                bonus = _.shuffle(highLevelBonus)
                    .slice(0, 3)
                    .concat(_.shuffle(__spreadArray(__spreadArray(__spreadArray([], allResistance, true), magicFind, true), extraGold, true)).slice(0, 1))
                    .concat(_.shuffle(highLevelBonus).slice(0, 3))
                    .concat(_.shuffle(elementDamage).slice(0, 1))
                    .concat(_.shuffle(elementPercentage).slice(0, 2));
            }
            else if (kind === Types.Entities.JEWELSKULL) {
                if (jewelLevel === 1) {
                    bonus = _.shuffle(lowLevelBonus).slice(0, isUnique ? 2 : 1);
                }
                else if (jewelLevel === 2) {
                    bonus = _.shuffle(mediumLevelBonus).slice(0, isUnique ? 3 : 2);
                }
                else if (jewelLevel === 3) {
                    bonus = _.shuffle(highLevelBonus)
                        .slice(0, isUnique ? 3 : 2)
                        .concat(_.shuffle(resistances).slice(0, 1));
                }
                else if (jewelLevel === 4) {
                    bonus = _.shuffle(highLevelBonus).slice(0, 2).concat(_.shuffle(resistances).slice(0, 2));
                    if (isUnique) {
                        bonus = bonus.concat(_.shuffle(elementPercentage).slice(0, 1));
                    }
                }
                else if (jewelLevel === 5) {
                    bonus = _.shuffle(highLevelBonus)
                        .slice(0, 2)
                        .concat(_.shuffle(elementDamage).slice(0, 1))
                        .concat(_.shuffle(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], resistances, true), extraGold, true), magicFind, true), attackSpeed, true)).slice(0, 2));
                    if (isUnique) {
                        bonus = bonus.concat(_.shuffle(elementPercentage).slice(0, 1));
                    }
                }
            }
            item = {
                item: Types.getKindAsString(kind),
                level: jewelLevel,
                bonus: JSON.stringify(bonus.sort(function (a, b) { return a - b; })),
            };
        }
        item.isUnique = isUnique;
        item.isSuperior = isSuperior;
        item.jewelLevel = jewelLevel;
        return item;
    };
    Player.prototype.destroy = function () {
        var self = this;
        this.forEachAttacker(function (mob) {
            mob.clearTarget();
        });
        this.attackers = {};
        this.forEachHater(function (mob) {
            mob.forgetPlayer(self.id);
        });
        this.haters = {};
    };
    Player.prototype.getState = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var helmBonus = (_a = this.helmBonus) === null || _a === void 0 ? void 0 : _a.concat(this.isHelmSuperior ? [43] : []);
        var armorBonus = (_b = this.armorBonus) === null || _b === void 0 ? void 0 : _b.concat(this.isArmorSuperior ? [43] : []);
        var weaponBonus = (_c = this.weaponBonus) === null || _c === void 0 ? void 0 : _c.concat(this.isWeaponSuperior ? [43] : []);
        var beltBonus = (_d = this.beltBonus) === null || _d === void 0 ? void 0 : _d.concat(this.isBeltSuperior ? [43] : []);
        var capeBonus = (_e = this.capeBonus) === null || _e === void 0 ? void 0 : _e.concat(this.isCapeSuperior ? [43] : []);
        var shieldBonus = (_f = this.shieldBonus) === null || _f === void 0 ? void 0 : _f.concat(this.isShieldSuperior ? [43] : []);
        var petBonus = (_g = this.petBonus) === null || _g === void 0 ? void 0 : _g.concat(this.isPetSuperior ? [43] : []);
        return Object.assign({}, this._getBaseState(), {
            orientation: this.orientation,
            targetId: this.targetId,
            petId: this.pet && this.petEntity ? this.petEntity.id : null,
            name: this.name,
            helm: "".concat(this.helm, ":").concat(this.helmLevel).concat(toDb(helmBonus)).concat(toDb(this.helmSocket)),
            armor: "".concat(this.armor, ":").concat(this.armorLevel).concat(toDb(armorBonus)).concat(toDb(this.armorSocket)),
            weapon: "".concat(this.weapon, ":").concat(this.weaponLevel).concat(toDb(weaponBonus)).concat(toDb(this.weaponSocket)).concat(toDb(this.attackSkill)),
            amulet: this.amulet ? "".concat(this.amulet, ":").concat(this.amuletLevel).concat(toDb(this.amuletBonus)) : null,
            ring1: this.ring1 ? "".concat(this.ring1, ":").concat(this.ring1Level).concat(toDb(this.ring1Bonus)) : null,
            ring2: this.ring2 ? "".concat(this.ring2, ":").concat(this.ring2Level).concat(toDb(this.ring2Bonus)) : null,
            belt: this.belt ? "".concat(this.belt, ":").concat(this.beltLevel).concat(toDb(beltBonus)) : null,
            level: this.level,
            auras: this.auras,
            partyId: this.partyId,
            cape: this.cape ? "".concat(this.cape).concat(toDb(this.capeLevel)).concat(toDb(capeBonus)) : null,
            pet: this.pet
                ? "".concat(this.pet).concat(toDb(this.petLevel)).concat(toDb(petBonus)).concat(toDb(this.petSocket)).concat(toDb(this.petSkin))
                : null,
            shield: this.shield
                ? "".concat(this.shield, ":").concat(this.shieldLevel).concat(toDb(shieldBonus)).concat(toDb(this.shieldSocket)).concat(toDb(this.defenseSkill))
                : null,
            settings: this.settings,
            resistances: null,
            element: null,
            enchants: null,
            bonus: {
                attackSpeed: Types.calculateAttackSpeedCap(this.bonus.attackSpeed, this.weaponKind),
                regenerateHealth: this.bonus.regenerateHealth + Math.floor(this.maxHitPoints / 33),
            },
        });
    };
    Player.prototype.handleHurtDmg = function (mob, rawDmg, pierceDamage, elementDamage) {
        var _this = this;
        var _a, _b;
        if (pierceDamage === void 0) { pierceDamage = 0; }
        if (elementDamage === void 0) { elementDamage = 0; }
        var isBlocked = false;
        var lightningDamage = 0;
        var defense = Formulas.playerDefense({
            helm: this.helm,
            helmLevel: this.helmLevel,
            isHelmUnique: this.isHelmUnique,
            isHelmSuperior: this.isHelmSuperior,
            armor: this.armor,
            armorLevel: this.armorLevel,
            isArmorUnique: this.isArmorUnique,
            isArmorSuperior: this.isArmorSuperior,
            belt: this.belt,
            beltLevel: this.beltLevel,
            isBeltUnique: this.isBeltUnique,
            isBeltSuperior: this.isBeltSuperior,
            playerLevel: this.level,
            defense: this.bonus.defense,
            absorbedDamage: this.bonus.absorbedDamage,
            partyDefense: this.partyBonus.defense,
            cape: this.cape,
            capeLevel: this.capeLevel,
            isCapeUnique: this.isCapeUnique,
            isCapeSuperior: this.isCapeSuperior,
            shield: this.shield,
            shieldLevel: this.shieldLevel,
            isShieldUnique: this.isShieldUnique,
            isShieldSuperior: this.isShieldSuperior,
            skillDefense: this.skill.defense,
        });
        if (mob.type === "mob" && ((_a = mob.enchants) === null || _a === void 0 ? void 0 : _a.length)) {
            if (mob.enchants.includes("physical")) {
                rawDmg = Math.round(rawDmg * 1.35);
            }
        }
        var dmg = defense > rawDmg ? 0 : rawDmg - defense;
        dmg += pierceDamage + elementDamage;
        if (!dmg) {
            dmg = randomInt(3, 5);
        }
        if (mob.type === "mob" && ((_b = mob.enchants) === null || _b === void 0 ? void 0 : _b.length)) {
            mob.enchants.forEach(function (enchant) {
                if (!Types.elements.includes(enchant))
                    return;
                var enchantDmg = _this.calculateElementDamage({ element: enchant, dmg: Math.floor(rawDmg * 0.35) });
                dmg += enchantDmg;
            });
        }
        if (this.bonus.blockChance) {
            var blockRandom = random(100);
            isBlocked = blockRandom < this.bonus.blockChance;
            if (isBlocked) {
                dmg = 0;
            }
        }
        if (this.bonus.lightningDamage) {
            lightningDamage = this.bonus.lightningDamage;
            var mobResistance = Types.getResistance(mob).lightningResistance;
            var receivedLightningDamage = Math.round(lightningDamage - lightningDamage * (mobResistance / 100));
            if (mob.type === "mob") {
                mob.receiveDamage(receivedLightningDamage);
            }
            else if (mob.type === "player") {
                mob.hitPoints -= receivedLightningDamage;
            }
            this.server.handleHurtEntity({ entity: mob, attacker: this, dmg: receivedLightningDamage });
        }
        if (mob.kind === Types.isBoss(mob.kind)) {
            if (random(100) < 15) {
                dmg = Math.ceil(dmg * 1.5);
            }
        }
        if (!isBlocked && mob.kind === Types.Entities.MINOTAUR) {
            var isFrozen = random(100) < 30 - this.bonus.reduceFrozenChance;
            if (isFrozen) {
                this.broadcast(new Messages.Frozen(this.id, Types.getFrozenTimePerLevel(10)));
            }
        }
        this.hitPoints -= dmg;
        this.server.handleHurtEntity({ entity: this, attacker: mob, isBlocked: isBlocked, dmg: dmg });
        this.handleHurtDeath();
        return { dmg: dmg, isBlocked: isBlocked };
    };
    Player.prototype.calculateElementDamage = function (spell) {
        var resistance = Types.calculateResistance(this.bonus["".concat(spell.element, "Resistance")] + this.skill.resistances, this.curse.resistances);
        var dmg = Math.round(spell.dmg - spell.dmg * (resistance / 100));
        if (spell.element === "cold") {
            var isSlowedRandom = random(100);
            var isSlowed = isSlowedRandom > Math.floor(resistance / 2) + this.bonus.reduceFrozenChance;
            if (isSlowed) {
                this.broadcast(new Messages.Slowed(this.id, Types.getFrozenTimePerLevel(10)));
            }
        }
        else if (spell.element === "poison") {
            this.startPoisoned({ dmg: spell.dmg, entity: this, resistance: this.bonus.poisonResistance });
        }
        return dmg;
    };
    Player.prototype.handleHurtSpellDmg = function (spell) {
        var dmg = this.calculateElementDamage(spell);
        var isBlocked = false;
        if (spell.casterKind === Types.Entities.SKELETONARCHER && this.bonus.blockChance) {
            var blockRandom = random(100);
            isBlocked = blockRandom < this.bonus.blockChance;
            if (isBlocked) {
                dmg = 0;
            }
        }
        this.hitPoints -= dmg;
        this.server.handleHurtEntity({ entity: this, attacker: spell, isBlocked: isBlocked, dmg: dmg });
        this.handleHurtDeath();
    };
    Player.prototype.handleHurtTrapDmg = function (trap) {
        var dmg = 300;
        this.hitPoints -= dmg;
        this.server.handleHurtEntity({ entity: this, attacker: trap, dmg: dmg });
        this.handleHurtDeath();
    };
    Player.prototype.startPoisoned = function (_a) {
        var _this = this;
        var dmg = _a.dmg, entity = _a.entity, resistance = _a.resistance, _b = _a.attacker, attacker = _b === void 0 ? {} : _b;
        var baseIterations = 5;
        var tick = 3000;
        var iterations = Math.round(baseIterations - baseIterations * (resistance / 100));
        this.broadcast(new Messages.Poisoned(entity.id, iterations * tick));
        clearInterval(entity.poisonedInterval);
        entity.poisonedInterval = setInterval(function () {
            var _a, _b;
            var poisonDmg = Math.round((dmg -
                dmg *
                    (Types.calculateResistance(Types.getResistance(entity, attacker).poisonResistance + (((_a = entity.skill) === null || _a === void 0 ? void 0 : _a.resistances) || 0), ((_b = entity.curse) === null || _b === void 0 ? void 0 : _b.resistances) || 0) /
                        100)) /
                5);
            if (iterations && poisonDmg && entity.hitPoints > 0) {
                entity.hitPoints -= poisonDmg;
                _this.server.handleHurtEntity({ entity: entity, attacker: attacker, dmg: poisonDmg });
                iterations--;
            }
            else {
                clearInterval(entity.poisonedInterval);
            }
        }, tick);
    };
    Player.prototype.handleHurtDeath = function () {
        if (this.hitPoints <= 0) {
            this.clearTarget();
            this.isDead = true;
            if (this.attackSkillTimeout) {
                clearTimeout(this.attackSkillTimeout);
                this.attackSkillTimeout = null;
            }
            if (this.defenseSkillTimeout) {
                clearTimeout(this.defenseSkillTimeout);
                this.defenseSkillTimeout = null;
            }
            if (this.defenseSkillDefenseTimeout) {
                this.skill.defense = 0;
                clearTimeout(this.defenseSkillDefenseTimeout);
                this.defenseSkillDefenseTimeout = null;
            }
            if (this.defenseSkillResistancesTimeout) {
                this.skill.resistances = 0;
                clearTimeout(this.defenseSkillResistancesTimeout);
                this.defenseSkillResistancesTimeout = null;
            }
            if (this.firefoxpotionTimeout) {
                clearTimeout(this.firefoxpotionTimeout);
                this.firefoxpotionTimeout = null;
            }
            if (this.poisonedInterval) {
                clearInterval(this.poisonedInterval);
                this.poisonedInterval = null;
            }
            if (this.cursedTimeout) {
                clearTimeout(this.cursedTimeout);
                this.cursedTimeout = null;
                this.resetCurse();
            }
        }
    };
    Player.prototype.send = function (message) {
        this.connection.send(message);
    };
    Player.prototype.broadcast = function (message, ignoreSelf) {
        if (ignoreSelf === void 0) { ignoreSelf = false; }
        if (this.broadcast_callback) {
            this.broadcast_callback(message, ignoreSelf === undefined ? true : ignoreSelf);
        }
    };
    Player.prototype.broadcastToZone = function (message, ignoreSelf) {
        if (ignoreSelf === void 0) { ignoreSelf = false; }
        if (this.broadcastzone_callback) {
            this.broadcastzone_callback(message, ignoreSelf === undefined ? true : ignoreSelf);
        }
    };
    Player.prototype.onExit = function (callback) {
        this.exit_callback = callback;
    };
    Player.prototype.onMove = function (callback) {
        this.move_callback = callback;
    };
    Player.prototype.onLootMove = function (callback) {
        this.lootmove_callback = callback;
    };
    Player.prototype.onZone = function (callback) {
        this.zone_callback = callback;
    };
    Player.prototype.onOrient = function (callback) {
        this.orient_callback = callback;
    };
    Player.prototype.onMessage = function (callback) {
        this.message_callback = callback;
    };
    Player.prototype.onBroadcast = function (callback) {
        this.broadcast_callback = callback;
    };
    Player.prototype.onBroadcastToZone = function (callback) {
        this.broadcastzone_callback = callback;
    };
    Player.prototype.equip = function (_a) {
        var kind = _a.kind, level = _a.level, bonus = _a.bonus, socket = _a.socket, skill = _a.skill, skin = _a.skin, type = _a.type;
        return new Messages.EquipItem(this, { kind: kind, level: level, bonus: bonus, socket: socket, skill: skill, skin: skin, type: type });
    };
    Player.prototype.addHater = function (mob) {
        if (mob) {
            if (!(mob.id in this.haters)) {
                this.haters[mob.id] = mob;
            }
        }
    };
    Player.prototype.removeHater = function (mob) {
        if (mob && mob.id in this.haters) {
            delete this.haters[mob.id];
        }
    };
    Player.prototype.forEachHater = function (callback) {
        _.each(this.haters, function (mob) {
            callback(mob);
        });
    };
    Player.prototype.equipHelm = function (helm, kind, level, rawBonus, socket) {
        var _a;
        var bonus = toArray(rawBonus);
        this.helm = helm;
        this.helmKind = kind;
        this.helmLevel = toNumber(level);
        this.helmBonus = bonus === null || bonus === void 0 ? void 0 : bonus.filter(function (oneBonus) { return oneBonus !== 43; });
        this.helmSocket = toArray(socket);
        this.isHelmUnique = !!((_a = this.helmBonus) === null || _a === void 0 ? void 0 : _a.length);
        this.isHelmSuperior = bonus === null || bonus === void 0 ? void 0 : bonus.includes(43);
    };
    Player.prototype.equipArmor = function (armor, kind, level, rawBonus, socket) {
        var _a;
        var bonus = toArray(rawBonus);
        this.armor = armor;
        this.armorKind = kind;
        this.armorLevel = toNumber(level);
        this.armorBonus = bonus === null || bonus === void 0 ? void 0 : bonus.filter(function (oneBonus) { return oneBonus !== 43; });
        this.armorSocket = toArray(socket);
        this.isArmorUnique = !!((_a = this.armorBonus) === null || _a === void 0 ? void 0 : _a.length);
        this.isArmorSuperior = bonus === null || bonus === void 0 ? void 0 : bonus.includes(43);
    };
    Player.prototype.equipWeapon = function (weapon, kind, level, rawBonus, socket, skill) {
        var _a;
        var bonus = toArray(rawBonus);
        this.weapon = weapon;
        this.weaponKind = kind;
        this.weaponLevel = toNumber(level);
        this.weaponBonus = bonus === null || bonus === void 0 ? void 0 : bonus.filter(function (oneBonus) { return oneBonus !== 43; });
        this.weaponSocket = toArray(socket);
        this.isWeaponUnique = !!((_a = this.weaponBonus) === null || _a === void 0 ? void 0 : _a.length);
        this.isWeaponSuperior = bonus === null || bonus === void 0 ? void 0 : bonus.includes(43);
        this.attackSkill = toNumber(skill);
    };
    Player.prototype.equipBelt = function (belt, level, rawBonus) {
        var _a;
        var bonus = toArray(rawBonus);
        this.belt = belt;
        this.beltLevel = toNumber(level);
        this.beltBonus = bonus === null || bonus === void 0 ? void 0 : bonus.filter(function (oneBonus) { return oneBonus !== 43; });
        this.isBeltUnique = !!((_a = this.beltBonus) === null || _a === void 0 ? void 0 : _a.length);
        this.isBeltSuperior = bonus === null || bonus === void 0 ? void 0 : bonus.includes(43);
    };
    Player.prototype.equipCape = function (cape, kind, level, rawBonus) {
        var _a;
        var bonus = toArray(rawBonus);
        this.cape = cape;
        this.capeKind = kind;
        this.capeLevel = toNumber(level);
        this.capeBonus = bonus === null || bonus === void 0 ? void 0 : bonus.filter(function (oneBonus) { return oneBonus !== 43; });
        this.isCapeUnique = ((_a = this.capeBonus) === null || _a === void 0 ? void 0 : _a.length) >= 2;
        this.isCapeSuperior = bonus === null || bonus === void 0 ? void 0 : bonus.includes(43);
    };
    Player.prototype.equipPet = function (pet, kind, level, rawBonus, socket, skin) {
        var _a;
        var bonus = toArray(rawBonus);
        this.pet = pet;
        this.petKind = kind;
        this.petLevel = toNumber(level);
        this.petBonus = bonus === null || bonus === void 0 ? void 0 : bonus.filter(function (oneBonus) { return oneBonus !== 43; });
        this.petSocket = toArray(socket);
        this.isPetUnique = ((_a = this.petBonus) === null || _a === void 0 ? void 0 : _a.length) >= 2;
        this.isPetSuperior = bonus === null || bonus === void 0 ? void 0 : bonus.includes(43);
        this.petSkin = toNumber(skin);
    };
    Player.prototype.equipShield = function (shield, kind, level, rawBonus, socket, skill) {
        var _a;
        var bonus = toArray(rawBonus);
        this.shield = shield;
        this.shieldKind = kind;
        this.shieldLevel = toNumber(level);
        this.shieldBonus = bonus === null || bonus === void 0 ? void 0 : bonus.filter(function (oneBonus) { return oneBonus !== 43; });
        this.shieldSocket = toArray(socket);
        this.isShieldUnique = ((_a = this.shieldBonus) === null || _a === void 0 ? void 0 : _a.length) >= 2;
        this.isShieldSuperior = bonus === null || bonus === void 0 ? void 0 : bonus.includes(43);
        this.defenseSkill = toNumber(skill);
    };
    Player.prototype.equipRing1 = function (ring, level, bonus) {
        this.ring1 = ring;
        this.ring1Level = toNumber(level);
        this.ring1Bonus = toArray(bonus);
    };
    Player.prototype.equipRing2 = function (ring, level, bonus) {
        this.ring2 = ring;
        this.ring2Level = toNumber(level);
        this.ring2Bonus = toArray(bonus);
    };
    Player.prototype.equipAmulet = function (amulet, level, bonus) {
        this.amulet = amulet;
        this.amuletLevel = toNumber(level);
        this.amuletBonus = toArray(bonus);
    };
    Player.prototype.getEquipment = function () {
        return [this.weapon, this.helm, this.armor, this.belt, this.shield, this.ring1, this.ring2, this.amulet, this.pet];
    };
    Player.prototype.getEquipmentLevel = function () {
        return [
            this.weaponLevel,
            this.helmLevel,
            this.armorLevel,
            this.beltLevel,
            this.shieldLevel,
            this.ring1Level,
            this.ring2Level,
            this.amuletLevel,
        ];
    };
    Player.prototype.calculateBonus = function () {
        var _this = this;
        this.freezeChanceLevel = 0;
        try {
            var bonusToCalculate = [
                this.ring1
                    ? {
                        level: this.ring1Level,
                        bonus: this.ring1Bonus,
                    }
                    : null,
                this.ring2
                    ? {
                        level: this.ring2Level,
                        bonus: this.ring2Bonus,
                    }
                    : null,
                this.amulet
                    ? {
                        level: this.amuletLevel,
                        bonus: this.amuletBonus,
                    }
                    : null,
                this.weaponBonus
                    ? {
                        level: this.weaponLevel,
                        bonus: this.weaponBonus,
                        socket: this.weaponSocket,
                    }
                    : null,
                this.armorBonus
                    ? {
                        level: this.armorLevel,
                        bonus: this.armorBonus,
                        socket: this.armorSocket,
                    }
                    : null,
                this.helmBonus
                    ? {
                        level: this.helmLevel,
                        bonus: this.helmBonus,
                        socket: this.armorSocket,
                    }
                    : null,
                this.beltBonus
                    ? {
                        level: this.beltLevel,
                        bonus: this.beltBonus,
                    }
                    : null,
                this.shieldBonus
                    ? {
                        level: this.shieldLevel,
                        bonus: this.shieldBonus,
                    }
                    : null,
                this.petBonus
                    ? {
                        level: this.petLevel,
                        bonus: this.petBonus,
                    }
                    : null,
            ].filter(Boolean);
            bonusToCalculate.forEach(function (_a) {
                var bonus = _a.bonus, level = _a.level;
                if (bonus) {
                    Object.entries(Types.getBonus(bonus, level)).forEach(function (_a) {
                        var type = _a[0], stats = _a[1];
                        if (type === "freezeChance" && level > _this.freezeChanceLevel) {
                            _this.freezeChanceLevel = level;
                        }
                        _this.bonus[type] += stats;
                    });
                }
            });
            if (this.weapon !== "dagger" && !this.isWeaponUnique) {
                this.bonus.magicDamage += Types.getWeaponMagicDamage(this.weaponLevel);
            }
            if (this.bonus.drainLife) {
                this.auras.push("drainlife");
            }
            if (this.bonus.lightningDamage) {
                this.auras.push("thunderstorm");
            }
            if (this.bonus.highHealth) {
                this.auras.push("highhealth");
            }
            if (this.bonus.freezeChance) {
                this.auras.push("freeze");
            }
            if (this.bonus.regenerateHealth + Math.floor(this.maxHitPoints / 33) >= 100) {
                this.auras.push("health-regenerate");
            }
            this.broadcast(new Messages.Auras(this), false);
        }
        catch (err) {
            Sentry.captureException(err, {
                user: {
                    username: this.name,
                },
            });
        }
    };
    Player.prototype.calculatePartyBonus = function () {
        var _this = this;
        var _a;
        this.resetPartyBonus();
        if (this.cape && ((_a = this.getParty()) === null || _a === void 0 ? void 0 : _a.members.length) >= 2) {
            Types.getPartyBonus(this.capeBonus, this.capeLevel).forEach(function (_a) {
                var type = _a.type, stats = _a.stats;
                _this.partyBonus[type] += stats;
            });
        }
    };
    Player.prototype.resetBonus = function () {
        this.auras = [];
        this.bonus = Types.bonusType.reduce(function (acc, key) {
            acc[key] = 0;
            return acc;
        }, {});
        this.bonus.resistanceSpectral = 0;
    };
    Player.prototype.resetPartyBonus = function () {
        this.partyBonus = {
            attackDamage: 0,
            defense: 0,
            exp: 0,
            minDamage: 0,
            maxDamage: 0,
            health: 0,
            magicDamage: 0,
            allResistance: 0,
            extraGold: 0,
        };
    };
    Player.prototype.resetSkill = function () {
        this.skill = {
            defense: 0,
            resistances: 0,
        };
    };
    Player.prototype.resetCurse = function () {
        this.curse = {
            health: 0,
            resistances: 0,
        };
    };
    Player.prototype.hasCurse = function () {
        return Object.values(this.curse).some(function (percent) { return percent !== 0; });
    };
    Player.prototype.equipItem = function (_a) {
        var item = _a.item, level = _a.level, bonus = _a.bonus, socket = _a.socket, skill = _a.skill, skin = _a.skin, type = _a.type;
        if (bonus === "null") {
            bonus = null;
        }
        if (["ring1", "ring2"].includes(type)) {
            if (type === "ring1") {
                this.equipRing1(item, level, bonus);
                this.databaseHandler.equipRing1({ name: this.name, item: item, level: level, bonus: bonus });
            }
            else if (type === "ring2") {
                this.equipRing2(item, level, bonus);
                this.databaseHandler.equipRing2({ name: this.name, item: item, level: level, bonus: bonus });
            }
        }
        else if (type === "amulet") {
            this.equipAmulet(item, level, bonus);
            this.databaseHandler.equipAmulet({ name: this.name, item: item, level: level, bonus: bonus });
        }
        else if (type === "belt") {
            this.databaseHandler.equipBelt(this.name, item, level, bonus);
            this.equipBelt(item, level, bonus);
        }
        else if (type === "cape") {
            var kind = Types.getKindFromString(item);
            this.databaseHandler.equipCape(this.name, item, level, bonus);
            this.equipCape(item, kind, level, bonus);
        }
        else if (type === "pet") {
            var kind = Types.getKindFromString(item);
            this.databaseHandler.equipPet(this.name, item, level, bonus, socket, skin);
            this.equipPet(item, kind, level, bonus, socket, skin);
            if (this.petEntity) {
                this.server.despawn(this.petEntity);
                this.petEntity = null;
            }
            if (this.pet) {
                var _b = this, id = _b.id, x = _b.x, y = _b.y;
                this.petEntity = new Pet({
                    id: "9" + id,
                    type: "pet",
                    kind: petKindToPetMap[this.petKind],
                    skin: this.petSkin,
                    level: this.petLevel,
                    bonus: this.petBonus,
                    x: x,
                    y: y,
                    ownerId: id,
                });
                this.server.addEntity(this.petEntity);
            }
        }
        else if (type === "shield") {
            this.databaseHandler.equipShield(this.name, item, level, bonus, socket, skill);
            this.equipShield(item, Types.getKindFromString(item), level, bonus, socket, skill);
        }
        else if (item && level) {
            var kind = Types.getKindFromString(item);
            console.debug(this.name + " equips " + item);
            if (Types.isArmor(kind)) {
                this.databaseHandler.equipArmor(this.name, item, level, bonus, socket);
                this.equipArmor(item, kind, level, bonus, socket);
            }
            else if (Types.isHelm(kind)) {
                this.databaseHandler.equipHelm(this.name, item, level, bonus, socket);
                this.equipHelm(item, kind, level, bonus, socket);
            }
            else if (Types.isWeapon(kind)) {
                this.databaseHandler.equipWeapon(this.name, item, level, bonus, socket, skill);
                this.equipWeapon(item, kind, level, bonus, socket, skill);
            }
        }
        this.updateHitPoints(true);
        this.resetBonus();
        this.calculateBonus();
        this.calculateSetBonus();
        this.calculateSocketBonus();
        this.calculatePartyBonus();
        this.calculateGlobalBonus();
        this.validateCappedBonus();
        this.sendPlayerStats();
    };
    Player.prototype.calculateGlobalBonus = function () {
        if (this.hasGrimoire) {
            this.bonus.allResistance += 10;
        }
        if (this.hasObelisk) {
            this.bonus.health += 50;
        }
        if (this.bonus.allResistance || this.partyBonus.allResistance) {
            this.bonus.magicResistance = Types.calculateResistance(this.bonus.magicResistance + this.bonus.allResistance + this.partyBonus.allResistance);
            this.bonus.flameResistance = Types.calculateResistance(this.bonus.flameResistance + this.bonus.allResistance + this.partyBonus.allResistance);
            this.bonus.lightningResistance = Types.calculateResistance(this.bonus.lightningResistance + this.bonus.allResistance + this.partyBonus.allResistance);
            this.bonus.coldResistance = Types.calculateResistance(this.bonus.coldResistance + this.bonus.allResistance + this.partyBonus.allResistance);
            this.bonus.poisonResistance = Types.calculateResistance(this.bonus.poisonResistance + this.bonus.allResistance + this.partyBonus.allResistance);
        }
        if (this.bonus.magicDamagePercent) {
            this.bonus.magicDamage += Math.round((this.bonus.magicDamagePercent / 100) * this.bonus.magicDamage);
        }
        if (this.bonus.flameDamagePercent) {
            this.bonus.flameDamage += Math.round((this.bonus.flameDamagePercent / 100) * this.bonus.flameDamage);
        }
        if (this.bonus.lightningDamagePercent) {
            this.bonus.lightningDamage += Math.round((this.bonus.lightningDamagePercent / 100) * this.bonus.lightningDamage);
        }
        if (this.bonus.coldDamagePercent) {
            this.bonus.coldDamage += Math.round((this.bonus.coldDamagePercent / 100) * this.bonus.coldDamage);
        }
        if (this.bonus.poisonDamagePercent) {
            this.bonus.poisonDamage += Math.round((this.bonus.poisonDamagePercent / 100) * this.bonus.poisonDamage);
        }
        if (this.bonus.coldResistance) {
            this.bonus.reduceFrozenChance += Math.floor(this.bonus.coldResistance / 3);
        }
    };
    Player.prototype.validateCappedBonus = function () {
        var _this = this;
        Object.entries(Types.bonusCap).forEach(function (_a) {
            var bonus = _a[0], cap = _a[1];
            if (_this.bonus[bonus] > cap) {
                _this.bonus[bonus] = cap;
            }
        });
    };
    Player.prototype.calculateSetBonus = function () {
        var _this = this;
        var bonus = {};
        var setItems = {};
        var paladin = 0;
        var immortal = 0;
        this.getEquipment().forEach(function (item, index) {
            var set = Types.kindAsStringToSet[item];
            if (set) {
                if (typeof setItems[set] !== "number") {
                    setItems[set] = 0;
                }
                setItems[set] += 1;
                if (set === "paladin") {
                    paladin += _this.getEquipmentLevel()[index];
                }
                else if (set === "immortal") {
                    immortal += _this.getEquipmentLevel()[index];
                }
                _this.setLevel = {
                    paladin: paladin,
                    immortal: immortal,
                };
            }
        });
        if (Object.keys(setItems).length) {
            Object.entries(setItems).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (Types.setItems[key].length === value) {
                    value = Object.keys(Types.setBonus[key]).length;
                }
                Types.getSetBonus(key, value).forEach(function (_a) {
                    var type = _a.type, stats = _a.stats;
                    if (typeof bonus[type] !== "number") {
                        bonus[type] = 0;
                    }
                    bonus[type] += stats;
                });
            });
            if (setItems["immortal"] && setItems["immortal"] && this.setLevel["immortal"] >= 50) {
                this.auras.push("arcane");
            }
            if (setItems["paladin"] && setItems["paladin"] > 0 && this.setLevel["paladin"] >= 50) {
                this.auras.push("paladin");
            }
        }
        if (Object.keys(bonus)) {
            Object.entries(bonus).map(function (_a) {
                var type = _a[0], stats = _a[1];
                _this.bonus[type] += stats;
            });
        }
        this.send(new Messages.SetBonus(setItems).serialize());
    };
    Player.prototype.calculateSocketBonus = function () {
        var _this = this;
        var socketRuneBonus = {};
        var socketJewelBonus = {};
        [
            this.helmSocket ? [this.helmLevel, this.helmSocket, this.isHelmUnique, "helm"] : undefined,
            this.armorSocket ? [this.armorLevel, this.armorSocket, this.isArmorUnique, "armor"] : undefined,
            this.weaponSocket ? [this.weaponLevel, this.weaponSocket, this.isWeaponUnique, "weapon"] : undefined,
            this.shieldSocket ? [this.shieldLevel, this.shieldSocket, this.isShieldUnique, "shield"] : undefined,
        ]
            .filter(Boolean)
            .forEach(function (_a) {
            var level = _a[0], rawSocket = _a[1], isUnique = _a[2], type = _a[3];
            var runewordBonus = Types.getRunewordBonus({ isUnique: isUnique, socket: rawSocket, type: type }).runewordBonus;
            if (runewordBonus) {
                socketRuneBonus = runewordBonus;
                socketJewelBonus = {};
            }
            else {
                socketRuneBonus = Types.getRunesBonus(rawSocket);
                socketJewelBonus = Types.getJewelBonus(rawSocket);
            }
            if (socketRuneBonus.freezeChance || socketJewelBonus.freezeChance) {
                if (typeof level === "number" && level > _this.freezeChanceLevel) {
                    _this.freezeChanceLevel = level;
                }
            }
            _this.bonus = Types.combineBonus(_this.bonus, socketRuneBonus);
            _this.bonus = Types.combineBonus(_this.bonus, socketJewelBonus);
        });
    };
    Player.prototype.updateHitPoints = function (reset) {
        var _a;
        var isInParty = ((_a = this.getParty()) === null || _a === void 0 ? void 0 : _a.members.length) >= 2;
        var maxHitPoints = Formulas.hp({
            helmLevel: this.helmLevel,
            armorLevel: this.armorLevel,
            playerLevel: this.level,
            beltLevel: this.beltLevel,
            shieldLevel: this.shieldLevel,
        }) +
            this.bonus.health +
            this.bonus.highHealth +
            (isInParty ? this.partyBonus.health : 0);
        if (reset) {
            this.resetHitPoints(maxHitPoints);
        }
        else {
            this.updateMaxHitPoints(maxHitPoints);
        }
        if (this.hasParty()) {
            this.server.pushToParty(this.getParty(), new Messages.Party(Types.Messages.PARTY_ACTIONS.HEALTH, {
                id: this.id,
                hp: this.hitPoints,
                mHp: maxHitPoints,
            }));
        }
    };
    Player.prototype.updatePosition = function () {
        if (this.requestpos_callback) {
            var pos = this.requestpos_callback();
            this.setPosition(pos.x, pos.y);
        }
    };
    Player.prototype.onRequestPosition = function (callback) {
        this.requestpos_callback = callback;
    };
    Player.prototype.timeout = function () {
        this.connection.sendUTF8("timeout");
        this.connection.close("Player was idle for too long");
    };
    Player.prototype.sendLevelInProgress = function () {
        var _a = this, x = _a.x, y = _a.y;
        var entityLocation = getEntityLocation({ x: x, y: y });
        if (entityLocation === "minotaurcage" && this.server.minotaurLevelClock) {
            this.send(new Messages.LevelInProgress(this.server.minotaurLevelClock, "minotaur").serialize());
        }
        else if (entityLocation === "cow" && this.server.cowLevelClock) {
            this.send(new Messages.LevelInProgress(this.server.cowLevelClock, "cow").serialize());
        }
        else if (entityLocation === "chalice" && this.server.chaliceLevelClock) {
            this.send(new Messages.LevelInProgress(this.server.chaliceLevelClock, "chalice").serialize());
        }
        else if (entityLocation === "spiders" && this.server.stoneLevelClock) {
            this.send(new Messages.LevelInProgress(this.server.stoneLevelClock, "stone").serialize());
        }
        else if (entityLocation === "butchergateway" && this.server.gatewayLevelClock) {
            this.send(new Messages.LevelInProgress(this.server.gatewayLevelClock, "gateway").serialize());
        }
        else if (entityLocation === "temple" && this.server.templeLevelClock) {
            this.send(new Messages.LevelInProgress(this.server.templeLevelClock, "temple").serialize());
        }
    };
    Player.prototype.sendPlayerStats = function () {
        var _a;
        var isInParty = ((_a = this.getParty()) === null || _a === void 0 ? void 0 : _a.members.length) >= 2;
        var _b = Formulas.minMaxDefense({
            helm: this.helm,
            helmLevel: this.helmLevel,
            isHelmUnique: this.isHelmUnique,
            isHelmSuperior: this.isHelmSuperior,
            armor: this.armor,
            armorLevel: this.armorLevel,
            isArmorUnique: this.isArmorUnique,
            isArmorSuperior: this.isArmorSuperior,
            belt: this.belt,
            beltLevel: this.beltLevel,
            isBeltUnique: this.isBeltUnique,
            isBeltSuperior: this.isBeltSuperior,
            playerLevel: this.level,
            defense: this.bonus.defense,
            absorbedDamage: this.bonus.absorbedDamage,
            cape: this.cape,
            capeLevel: this.capeLevel,
            isCapeUnique: this.isCapeUnique,
            isCapeSuperior: this.isCapeSuperior,
            shield: this.shield,
            shieldLevel: this.shieldLevel,
            isShieldUnique: this.isShieldUnique,
            isShieldSuperior: this.isShieldSuperior,
            partyDefense: isInParty ? this.partyBonus.defense : 0,
            skillDefense: this.skill.defense,
        }), minDefense = _b.min, maxDefense = _b.max;
        var _c = Formulas.minMaxDamage({
            weapon: this.weapon,
            weaponLevel: this.weaponLevel,
            isWeaponUnique: this.isWeaponUnique,
            isWeaponSuperior: this.isWeaponSuperior,
            playerLevel: this.level,
            minDamage: this.bonus.minDamage + (isInParty ? this.partyBonus.minDamage : 0),
            maxDamage: this.bonus.maxDamage + (isInParty ? this.partyBonus.maxDamage : 0),
            magicDamage: this.bonus.magicDamage + (isInParty ? this.partyBonus.magicDamage : 0),
            attackDamage: this.bonus.attackDamage,
            drainLife: this.bonus.drainLife,
            flameDamage: this.bonus.flameDamage,
            lightningDamage: this.bonus.lightningDamage,
            coldDamage: this.bonus.coldDamage,
            poisonDamage: this.bonus.poisonDamage,
            pierceDamage: this.bonus.pierceDamage,
            partyAttackDamage: isInParty ? this.partyBonus.attackDamage : 0,
        }), minDamage = _c.min, maxDamage = _c.max, attackDamage = _c.attackDamage;
        var stats = {
            maxHitPoints: this.maxHitPoints,
            damage: minDamage !== maxDamage ? "".concat(minDamage, "-").concat(maxDamage) : maxDamage,
            defense: minDefense !== maxDefense
                ? "".concat(minDefense - this.bonus.absorbedDamage, "-").concat(maxDefense - this.bonus.absorbedDamage)
                : maxDefense - this.bonus.absorbedDamage,
            attackDamage: attackDamage,
            absorbedDamage: this.bonus.absorbedDamage,
            exp: this.bonus.exp + this.partyBonus.exp,
            criticalHit: this.bonus.criticalHit,
            blockChance: this.bonus.blockChance,
            magicFind: Types.calculateMagicFindCap(this.bonus.magicFind),
            extraGold: Types.calculateExtraGoldCap(this.bonus.extraGold + this.partyBonus.extraGold),
            attackSpeed: Types.calculateAttackSpeedCap(this.bonus.attackSpeed, this.weaponKind),
            magicDamage: this.bonus.magicDamage + this.partyBonus.magicDamage,
            flameDamage: this.bonus.flameDamage,
            lightningDamage: this.bonus.lightningDamage,
            coldDamage: this.bonus.coldDamage,
            poisonDamage: this.bonus.poisonDamage,
            pierceDamage: this.bonus.pierceDamage,
            skillTimeout: Types.calculateSkillTimeout(this.bonus.skillTimeout),
            magicDamagePercent: this.bonus.magicDamagePercent,
            flameDamagePercent: this.bonus.flameDamagePercent,
            lightningDamagePercent: this.bonus.lightningDamagePercent,
            coldDamagePercent: this.bonus.coldDamagePercent,
            poisonDamagePercent: this.bonus.poisonDamagePercent,
            lowerMagicResistance: this.bonus.lowerMagicResistance,
            lowerFlameResistance: this.bonus.lowerFlameResistance,
            lowerLightningResistance: this.bonus.lowerLightningResistance,
            lowerColdResistance: this.bonus.lowerColdResistance,
            lowerPoisonResistance: this.bonus.lowerPoisonResistance,
            lowerAllResistance: this.bonus.lowerAllResistance,
            magicResistance: Types.calculateResistance(this.bonus.magicResistance + this.skill.resistances, this.curse.resistances),
            flameResistance: Types.calculateResistance(this.bonus.flameResistance + this.skill.resistances - this.curse.resistances),
            lightningResistance: Types.calculateResistance(this.bonus.lightningResistance + this.skill.resistances - this.curse.resistances),
            coldResistance: Types.calculateResistance(this.bonus.coldResistance + this.skill.resistances - this.curse.resistances),
            poisonResistance: Types.calculateResistance(this.bonus.poisonResistance + this.skill.resistances - this.curse.resistances),
            freezeChance: this.bonus.freezeChance,
            reduceFrozenChance: this.bonus.reduceFrozenChance,
            drainLife: this.bonus.drainLife,
            regenerateHealth: this.bonus.regenerateHealth + Math.floor(this.maxHitPoints / 33),
            setLevel: this.setLevel,
        };
        this.send(new Messages.Stats(stats).serialize());
    };
    Player.prototype.incExp = function (exp) {
        if (this.experience >= MAX_EXP) {
            return;
        }
        this.experience = this.experience + exp;
        if (this.experience > MAX_EXP) {
            this.experience = MAX_EXP;
        }
        this.databaseHandler.setExp(this.name, this.experience);
        var originalLevel = this.level;
        this.level = Types.getLevel(this.experience);
        if (originalLevel !== this.level) {
            this.updateHitPoints(true);
            this.sendPlayerStats();
            this.server.updatePopulation({ levelupPlayer: this.id });
            var emoji = "";
            if (this.level >= 64) {
                if (this.level >= 71) {
                    emoji = EmojiMap.maxlv;
                }
                postMessageToDiscordEventChannel("".concat(this.name, " is now lv.").concat(this.level).concat(emoji));
            }
        }
    };
    Player.prototype.hasParty = function () {
        return !!this.partyId;
    };
    Player.prototype.hasTrade = function () {
        return !!this.tradeId;
    };
    Player.prototype.getParty = function () {
        return this.partyId ? this.server.parties[this.partyId] : undefined;
    };
    Player.prototype.getTrade = function () {
        return this.tradeId ? this.server.trades[this.tradeId] : undefined;
    };
    Player.prototype.setPartyId = function (partyId) {
        this.partyId = partyId;
    };
    Player.prototype.setTradeId = function (tradeId) {
        this.tradeId = tradeId;
    };
    Player.prototype.checkName = function (name) {
        if (!(name === null || name === void 0 ? void 0 : name.trim()))
            return false;
        for (var i = 0; i < name.length; i++) {
            var c = name.charCodeAt(i);
            if (!((0xac00 <= c && c <= 0xd7a3) ||
                (0x3131 <= c && c <= 0x318e) ||
                (0x61 <= c && c <= 0x7a) ||
                (0x41 <= c && c <= 0x5a) ||
                (0x30 <= c && c <= 0x39) ||
                c == 0x20 ||
                c == 0x5f ||
                c == 0x2d ||
                c == 0x28 ||
                c == 0x29 ||
                c == 0x5e)) {
                return false;
            }
        }
        return true;
    };
    Player.prototype.verifySignature = function (signature) {
        try {
            var bytes = CryptoJS.AES.decrypt(signature, process.env.WS_MESSAGE_SECRET);
            var message = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return message;
        }
        catch (err) {
            postMessageToDiscordModeratorDebugChannel("failed to decode message and got kicked");
            return;
        }
    };
    Player.prototype.sendWelcome = function (_a) {
        var _this = this;
        var _b, _c;
        var account = _a.account, helm = _a.helm, armor = _a.armor, weapon = _a.weapon, belt = _a.belt, cape = _a.cape, pet = _a.pet, shield = _a.shield, ring1 = _a.ring1, ring2 = _a.ring2, amulet = _a.amulet, exp = _a.exp, gold = _a.gold, goldStash = _a.goldStash, coin = _a.coin, createdAt = _a.createdAt, x = _a.x, y = _a.y, _d = _a.chatBanEndTime, chatBanEndTime = _d === void 0 ? 0 : _d, achievement = _a.achievement, inventory = _a.inventory, stash = _a.stash, trade = _a.trade, upgrade = _a.upgrade, hash = _a.hash, nanoPotions = _a.nanoPotions, gems = _a.gems, artifact = _a.artifact, expansion1 = _a.expansion1, expansion2 = _a.expansion2, waypoints = _a.waypoints, depositAccount = _a.depositAccount, depositAccountIndex = _a.depositAccountIndex, settings = _a.settings, network = _a.network, discordId = _a.discordId;
        console.log("~~~~~~~nanoPotions", nanoPotions);
        console.log("~~~~~~~achievement", achievement);
        console.log("~~~~~~~settings", settings);
        console.log("~~~~~~~stash", stash);
        console.log("~~~~~~~trade", trade);
        console.log("~~~~~~~inventory", inventory);
        console.log("~~~~~~~settings", settings);
        this.settings = typeof settings === "string" ? JSON.parse(settings) : settings;
        if (this.isPasswordRequired && !this.isPasswordValid) {
            this.connection.sendUTF8("passwordinvalid");
            return;
        }
        if (NODE_ENV === "production") {
            this.canChat = !((_b = this.server.chatBan) === null || _b === void 0 ? void 0 : _b.some(function (_a) {
                var playerName = _a.player, ip = _a.ip;
                return playerName === _this.name || (_this.ip && ip && ip === _this.ip);
            }));
        }
        else {
            this.canChat = !((_c = this.server.chatBan) === null || _c === void 0 ? void 0 : _c.some(function (_a) {
                var playerName = _a.player, ip = _a.ip;
                return playerName === _this.name || ip === _this.ip;
            }));
        }
        this.account = account;
        delete this.isPasswordRequired;
        delete this.isPasswordValid;
        this.kind = Types.Entities.WARRIOR;
        var _e = armor.split(":"), playerArmor = _e[0], _f = _e[1], playerArmorLevel = _f === void 0 ? 1 : _f, playerArmorBonus = _e[2], playerArmorSocket = _e[3];
        this.equipArmor(playerArmor, Types.getKindFromString(playerArmor), playerArmorLevel, playerArmorBonus, playerArmorSocket);
        var _g = weapon.split(":"), playerWeapon = _g[0], _h = _g[1], playerWeaponLevel = _h === void 0 ? 1 : _h, playerWeaponBonus = _g[2], playerWeaponSocket = _g[3], playerWeaponSkill = _g[4];
        this.equipWeapon(playerWeapon, Types.getKindFromString(playerWeapon), playerWeaponLevel, playerWeaponBonus, playerWeaponSocket, playerWeaponSkill);
        if (helm) {
            var _j = helm.split(":"), playerHelm = _j[0], _k = _j[1], playerHelmLevel = _k === void 0 ? 1 : _k, playerHelmBonus = _j[2], playerHelmSocket = _j[3];
            this.equipHelm(playerHelm, Types.getKindFromString(playerHelm), playerHelmLevel, playerHelmBonus, playerHelmSocket);
        }
        if (belt) {
            var _l = belt.split(":"), playerBelt = _l[0], playerBeltLevel = _l[1], playerBeltBonus = _l[2];
            this.equipBelt(playerBelt, playerBeltLevel, playerBeltBonus);
        }
        if (cape) {
            var _m = cape.split(":"), playerCape = _m[0], playerCapeLevel = _m[1], playerCapeBonus = _m[2];
            this.equipCape(playerCape, Types.getKindFromString(playerCape), playerCapeLevel, playerCapeBonus);
        }
        if (pet) {
            var _o = pet.split(":"), playerPet = _o[0], playerPetLevel = _o[1], playePetBonus = _o[2], playerPetSocket = _o[3], playerPetSkin = _o[4];
            this.equipPet(playerPet, Types.getKindFromString(playerPet), playerPetLevel, playePetBonus, playerPetSocket, playerPetSkin);
        }
        if (shield) {
            var _p = shield.split(":"), playerShield = _p[0], playerShieldLevel = _p[1], playerShieldBonus = _p[2], playerShieldSocket = _p[3], playerDefenseSkill = _p[4];
            this.equipShield(playerShield, Types.getKindFromString(playerShield), playerShieldLevel, playerShieldBonus, playerShieldSocket, playerDefenseSkill);
        }
        if (ring1) {
            var _q = ring1.split(":"), playerRing1 = _q[0], playerRing1Level = _q[1], playerRing1Bonus = _q[2];
            this.equipRing1(playerRing1, playerRing1Level, playerRing1Bonus);
        }
        if (ring2) {
            var _r = ring2.split(":"), playerRing2 = _r[0], playerRing2Level = _r[1], playerRing2Bonus = _r[2];
            this.equipRing2(playerRing2, playerRing2Level, playerRing2Bonus);
        }
        if (amulet) {
            var _s = amulet.split(":"), playerAmulet = _s[0], playerAmuletLevel = _s[1], playerAmuletBonus = _s[2];
            this.equipAmulet(playerAmulet, playerAmuletLevel, playerAmuletBonus);
        }
        if (pet) {
            var _t = pet.split(":"), playerPet = _t[0], playerPetLevel = _t[1], playerPetBonus = _t[2], playerPetSocket = _t[3], playerPetSkin = _t[4];
            this.equipPet(playerPet, Types.getKindFromString(playerPet), playerPetLevel, playerPetBonus, playerPetSocket, playerPetSkin);
        }
        this.achievement = achievement;
        this.waypoints = waypoints;
        this.expansion1 = expansion1;
        this.expansion2 = expansion2;
        this.depositAccount = depositAccount;
        this.depositAccountIndex = depositAccountIndex;
        this.inventory = inventory;
        this.stash = stash;
        this.hash = hash;
        this.hasRequestedBossPayout = false;
        this.hasWallet = !!network || !!account;
        this.createdAt = createdAt;
        this.experience = exp;
        this.level = Types.getLevel(this.experience);
        this.orientation = randomOrientation();
        this.network = network;
        this.nanoPotions = nanoPotions;
        this.discordId = discordId;
        this.gold = gold;
        this.goldStash = goldStash;
        if (!x || !y) {
            this.updatePosition();
        }
        else {
            if (x >= 84 && y >= 744 && !this.server.templeLevelClock) {
                x = randomInt(40, 46);
                y = randomInt(581, 585);
            }
            this.setPosition(x, y);
        }
        this.chatBanEndTime = chatBanEndTime;
        console.log("~~~before enter");
        this.server.addPlayer(this);
        this.server.enter_callback(this);
        var _u = this.getParty() || {}, members = _u.members, partyLeader = _u.partyLeader;
        console.log("~~~~~~achievement", achievement);
        if (achievement) {
            this.hasGrimoire = !!achievement[ACHIEVEMENT_GRIMOIRE_INDEX];
            this.hasObelisk = !!achievement[ACHIEVEMENT_OBELISK_INDEX];
            this.hasNft = !!achievement[ACHIEVEMENT_NFT_INDEX];
            this.hasWing = !!achievement[ACHIEVEMENT_WING_INDEX];
            this.hasCrystal = !!achievement[ACHIEVEMENT_CRYSTAL_INDEX];
        }
        if (this.pet) {
            if (this.petEntity) {
                this.server.despawn(this.petEntity);
                this.petEntity = null;
            }
            var id = this.id;
            this.petEntity = new Pet({
                id: "9" + id,
                type: "pet",
                kind: petKindToPetMap[this.petKind],
                skin: this.petSkin,
                level: this.petLevel,
                bonus: this.petBonus,
                x: x,
                y: y,
                ownerId: id,
            });
            this.server.addEntity(this.petEntity);
        }
        this.send([
            Types.Messages.WELCOME,
            {
                id: this.id,
                name: this.name,
                account: account,
                x: this.x,
                y: this.y,
                hitpoints: this.hitPoints,
                helm: helm,
                armor: armor,
                weapon: weapon,
                belt: belt,
                cape: cape,
                pet: pet,
                shield: shield,
                ring1: ring1,
                ring2: ring2,
                amulet: amulet,
                experience: this.experience,
                gold: gold,
                goldStash: goldStash,
                coin: coin,
                achievement: achievement,
                inventory: inventory,
                stash: stash,
                trade: trade,
                upgrade: upgrade,
                hash: hash,
                nanoPotions: nanoPotions,
                gems: gems,
                artifact: artifact,
                expansion1: expansion1,
                expansion2: expansion2,
                waypoints: waypoints,
                depositAccount: depositAccount,
                auras: this.auras,
                cowLevelPortalCoords: this.server.cowLevelCoords,
                settings: settings,
                network: network,
                party: this.hasParty() ? { partyId: this.partyId, members: members, partyLeader: partyLeader } : null,
                isHurtByTrap: this.isHurtByTrap,
                admins: ADMINS.concat(SUPER_ADMINS),
            },
        ]);
        this.sendLevelInProgress();
        this.updateHitPoints(true);
        this.resetBonus();
        this.calculateBonus();
        this.calculateSetBonus();
        this.calculateSocketBonus();
        this.calculatePartyBonus();
        this.calculateGlobalBonus();
        this.validateCappedBonus();
        this.sendPlayerStats();
        this.hasEnteredGame = true;
        this.isDead = false;
        this.isHurtByTrap = false;
    };
    return Player;
}(Character));
export default Player;
