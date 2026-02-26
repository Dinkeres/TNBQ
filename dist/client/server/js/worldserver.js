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
import "./store/cron";
import * as _ from "lodash";
import { Types } from "../../shared/js/gametypes";
import { ACHIEVEMENT_NAMES, ACHIEVEMENT_ZAP_INDEX } from "../../shared/js/types/achievements";
import { getGoldDeathPenaltyPercent, getGoldSkin } from "../../shared/js/utils";
import { ChestArea, MobArea } from "./area";
import Chest from "./chest";
import { EmojiMap, postMessageToDiscordEventChannel } from "./discord";
import { generateRandomGoldAmount } from "./gold";
import Item from "./item";
import Map from "./map";
import Messages from "./message";
import Mob from "./mob";
import Npc from "./npc";
import Party, { MAX_PARTY_MEMBERS } from "./party";
import Player from "./player";
import Properties from "./properties";
import { Sentry } from "./sentry";
import Spell from "./spell";
import { purchase } from "./store/purchase";
import Trade from "./trade";
import { generateDroppedItem, generateSoulStoneItem, getRandomJewelLevel, getRandomPetCollarSkin, getRandomRune, random, randomInt, randomRange, } from "./utils";
var World = (function () {
    function World(id, maxPlayers, websocketServer, databaseHandler) {
        var _this = this;
        var self = this;
        if (process.env.NODE_ENV === "production") {
            ["log", "warn", "info", "error", "debug"].forEach(function (methodName) {
                console[methodName] = function () { };
            });
        }
        this.id = id;
        this.maxPlayers = maxPlayers;
        this.server = websocketServer;
        this.ups = 50;
        this.databaseHandler = databaseHandler;
        this.map = null;
        this.entities = {};
        this.players = {};
        this.parties = {};
        this.trades = {};
        this.currentPartyId = 0;
        this.currentTradeId = 0;
        this.cowKingPlayerName = null;
        this.minotaurPlayerName = null;
        this.mobs = {};
        this.spellCount = 0;
        this.attackers = {};
        this.items = {};
        this.equipping = {};
        this.hurt = {};
        this.npcs = {};
        this.mobAreas = [];
        this.chestAreas = [];
        this.groups = {};
        this.zombies = [];
        this.cowTotal = 0;
        this.cowLevelCoords = {};
        this.cowLevelClock = null;
        this.cowLevelInterval = null;
        this.cowLevelTownNpcId = null;
        this.cowLevelNpcId = null;
        this.cowLevelNpcIds = [];
        this.cowPossibleCoords = [];
        this.cowEntityIds = [];
        this.packOrder = [
            [0, 0],
            [-1, 0],
            [-1, -1],
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-2, 1],
            [-2, 0],
            [-2, -1],
            [-2, -2],
            [-1, -2],
            [0, -2],
            [1, -2],
            [2, -2],
            [2, -1],
            [2, 0],
            [2, 1],
            [2, 2],
            [1, 2],
            [0, 2],
            [-1, 2],
            [-2, 2],
        ];
        this.cowKingHornDrop = false;
        this.minotaur = null;
        this.cowking = null;
        this.minotaurLevelClock = null;
        this.minotaurLevelInterval = null;
        this.minotaurLevelTownNpcId = null;
        this.minotaurLevelNpcId = null;
        this.minotaurSpawnTimeout = null;
        this.outgoingQueues = {};
        this.itemCount = 0;
        this.playerCount = 0;
        this.zoneGroupsReady = false;
        this.raiseNecromancerInterval = null;
        this.raiseDeathAngelInterval = null;
        this.isCastDeathAngelSpellEnabled = false;
        this.isCastDeathBringerSpellEnabled = false;
        this.magicStones = [];
        this.activatedMagicStones = [];
        this.blueFlames = [];
        this.statues = [];
        this.secretStairsChaliceNpcId = null;
        this.secretStairsTreeNpcId = null;
        this.secretStairsLeftTemplarNpcId = null;
        this.secretStairsRightTemplarNpcId = null;
        this.secretStairsPickaxeNpcId = null;
        this.poisonTemplarId = null;
        this.magicTemplarId = null;
        this.chaliceLevelClock = null;
        this.chaliceLevelInterval = null;
        this.altarChaliceNpcId = null;
        this.altarSoulStoneNpcId = null;
        this.handsNpcId = null;
        this.isActivatedTreeLevel = false;
        this.trapIds = [];
        this.leverChaliceNpcId = null;
        this.leverLeftCryptNpcId = null;
        this.leverRightCryptNpcId = null;
        this.leverDeathAngelNpcId = null;
        this.doorDeathAngelNpcId = null;
        this.portalStoneNpcId = null;
        this.portalStoneInnerNpcId = null;
        this.stoneLevelClock = null;
        this.stoneLevelInterval = null;
        this.powderSpiderId = null;
        this.chaliceSpiderId = null;
        this.spiderQueen = null;
        this.spiderTotal = 0;
        this.spiderEntityIds = [];
        this.spiderPossibleCoords = [];
        this.archerEntityIds = [];
        this.archerPossibleCoords = [];
        this.mageEntityIds = [];
        this.magePossibleCoords = [];
        this.worm = null;
        this.necromancer = null;
        this.mageTempleEntityIds = [];
        this.mageTemplePossibleCoords = [];
        this.gateTempleNpcId = null;
        this.gateSubTempleNpcId = null;
        this.goldBank = 0;
        this.janetYellenNpcId = null;
        this.chatBan = null;
        this.maxPlayerCreateByIp = { ip: [] };
        this.onPlayerConnect(function (player) {
            player.onRequestPosition(function () {
                if (player.lastCheckpoint) {
                    return player.lastCheckpoint.getRandomPosition();
                }
                else {
                    return self.map.getRandomStartingPosition();
                }
            });
        });
        this.getIsValidHash = function (hash) {
            var isValid = false;
            if (!hash)
                return isValid;
            if (!_this.hash) {
                if (!_this.tmpHash) {
                    _this.tmpHash = hash;
                    isValid = true;
                }
                else if (hash === _this.tmpHash) {
                    _this.hash = hash;
                    isValid = true;
                }
            }
            else {
                isValid = _this.hash === hash;
            }
            return isValid;
        };
        this.onPlayerEnter(function (player) {
            var _a;
            console.info(player.name + "(" + (player.ip || "Player IP") + ") has joined " + self.id);
            if (!player.hasEnteredGame) {
                self.incrementPlayerCount();
            }
            self.pushRelevantEntityListTo(player);
            var move_callback = function (x, y) {
                console.debug(player.name + " is moving to (" + x + ", " + y + ").");
                player.forEachAttacker(function (mob) {
                    if (mob.targetId === null) {
                        player.removeAttacker(mob);
                        return;
                    }
                    var target = self.getEntityById(mob.targetId);
                    if (target) {
                        var pos = self.findPositionNextTo(mob, target);
                        if (mob.distanceToSpawningPoint(pos.x, pos.y) > 50) {
                            mob.clearTarget();
                            mob.forgetEveryone();
                            player.removeAttacker(mob);
                        }
                        else {
                            self.moveEntity(mob, pos.x, pos.y);
                        }
                    }
                });
            };
            player.onMove(move_callback);
            player.onLootMove(move_callback);
            player.onZone(function () {
                var hasChangedGroups = self.handleEntityGroupMembership(player);
                if (hasChangedGroups) {
                    self.pushToPreviousGroups(player, new Messages.Destroy(player));
                    self.pushRelevantEntityListTo(player);
                }
            });
            player.onBroadcast(function (message, ignoreSelf) {
                self.pushToAdjacentGroups(player.group, message, ignoreSelf ? player.id : null);
            });
            player.onBroadcastToZone(function (message, ignoreSelf) {
                self.pushToGroup(player.group, message, ignoreSelf ? player.id : null);
            });
            player.onExit(function () {
                var _a, _b;
                if (player.network) {
                    (_a = purchase[player.network]) === null || _a === void 0 ? void 0 : _a.cancel(player.depositAccount);
                }
                clearTimeout(player.checkHashInterval);
                console.info(player.name + " has left the game.");
                if (player.hasParty()) {
                    self.pushToParty(player.getParty(), new Messages.Party(Types.Messages.PARTY_ACTIONS.DISCONNECT, [player.name]), player);
                }
                Object.values(self.parties || []).forEach(function (party) { return party.deleteInvite(player); });
                if (player.hasTrade()) {
                    self.trades[player.tradeId].close({ playerName: player.name });
                }
                self.removePlayer(player);
                self.decrementPlayerCount();
                (_b = self.removed_callback) === null || _b === void 0 ? void 0 : _b.call(self);
            });
            (_a = self.added_callback) === null || _a === void 0 ? void 0 : _a.call(self);
        });
        this.onEntityAttack(function (attacker) {
            var target = self.getEntityById(attacker.targetId);
            if (target && attacker.type === "mob") {
                var pos = self.findPositionNextTo(attacker, target);
                self.moveEntity(attacker, pos.x, pos.y);
            }
        });
        this.onRegenTick(function () {
            self.forEachCharacter(function (character) {
                var _a, _b;
                if (!character.hasFullHealth() && !character.isDead) {
                    var regenerateHealth = Math.floor(character.maxHitPoints / 33);
                    if (character.bonus && character.bonus.regenerateHealth) {
                        regenerateHealth += character.bonus.regenerateHealth;
                    }
                    if (((_a = character.curse) === null || _a === void 0 ? void 0 : _a.health) && ((_b = character.curse) === null || _b === void 0 ? void 0 : _b.health) !== 0) {
                        regenerateHealth = regenerateHealth - Math.floor(regenerateHealth * (character.curse.health / 100));
                    }
                    if (regenerateHealth > 0) {
                        character.regenerateHealthBy(regenerateHealth);
                        if (character.type === "player") {
                            self.pushToPlayer(character, character.regen());
                        }
                    }
                }
            });
        });
    }
    World.prototype.run = function (mapFilePath) {
        var _this = this;
        var self = this;
        this.map = new Map(mapFilePath);
        this.map.ready(function () {
            self.initZoneGroups();
            self.map.generateCollisionGrid();
            _.each(self.map.mobAreas, function (a) {
                var area = new MobArea(a.id, a.nb, a.type, a.x, a.y, a.width, a.height, self);
                area.spawnMobs();
                area.onEmpty(self.handleEmptyMobArea.bind(self, area));
                self.mobAreas.push(area);
            });
            _.each(self.map.chestAreas, function (a) {
                var area = new ChestArea(a.id, a.x, a.y, a.w, a.h, a.tx, a.ty, a.i, self);
                self.chestAreas.push(area);
                area.onEmpty(self.handleEmptyChestArea.bind(self, area));
            });
            _.each(self.map.staticChests, function (chest) {
                var c = self.createChest(chest.x, chest.y, chest.i);
                self.addStaticItem(c);
            });
            self.spawnStaticEntities();
        });
        var regenCount = this.ups * 2;
        var updateCount = 0;
        setInterval(function () {
            var _a;
            self.processGroups();
            self.processQueues();
            if (updateCount < regenCount) {
                updateCount += 1;
            }
            else {
                (_a = self.regen_callback) === null || _a === void 0 ? void 0 : _a.call(self);
                updateCount = 0;
            }
        }, 1000 / this.ups);
        console.info("" + this.id + " created (capacity: " + this.maxPlayers + " players).");
        this.databaseHandler.getGoldBank().then(function (goldBank) {
            _this.goldBank = goldBank;
        });
    };
    World.prototype.runChatBans = function () {
        var _this = this;
        setInterval(function () {
            _this.databaseHandler.getChatBan().then(function (chatBan) {
                _this.chatBan = chatBan;
            });
        }, 300000);
        setInterval(function () {
            _this.maxPlayerCreateByIp = { ip: [] };
        }, 86400000);
    };
    World.prototype.setUpdatesPerSecond = function (ups) {
        this.ups = ups;
    };
    World.prototype.onInit = function (callback) {
        this.init_callback = callback;
    };
    World.prototype.onPlayerConnect = function (callback) {
        this.connect_callback = callback;
    };
    World.prototype.onPlayerEnter = function (callback) {
        this.enter_callback = callback;
    };
    World.prototype.onPlayerAdded = function (callback) {
        this.added_callback = callback;
    };
    World.prototype.onPlayerRemoved = function (callback) {
        this.removed_callback = callback;
    };
    World.prototype.onRegenTick = function (callback) {
        this.regen_callback = callback;
    };
    World.prototype.pushRelevantEntityListTo = function (player) {
        var entities;
        if (player && player.group in this.groups) {
            entities = _.keys(this.groups[player.group].entities);
            entities = _.reject(entities, function (id) {
                return id == player.id;
            });
            entities = _.map(entities, function (id) {
                return parseInt(id, 10);
            });
            if (entities) {
                this.pushToPlayer(player, new Messages.List(entities));
            }
        }
    };
    World.prototype.disconnectPlayer = function (_a) {
        var playerName = _a.name, _b = _a.force, force = _b === void 0 ? false : _b, _c = _a.lastId, lastId = _c === void 0 ? null : _c;
        var player = this.getPlayerByName(playerName);
        if (force && player && player.id !== lastId) {
            delete this.players[player.id];
            this.removePlayer(player);
        }
        player === null || player === void 0 ? void 0 : player.connection.close();
    };
    World.prototype.pushSpawnsToPlayer = function (player, ids) {
        var _this = this;
        _.each(ids, function (id) {
            var entity = _this.getEntityById(id);
            if (entity) {
                _this.pushToPlayer(player, new Messages.Spawn(entity));
            }
        });
        console.debug("Pushed ".concat(_.size(ids), " new spawns to ").concat(player.name, ": ").concat(player.id));
    };
    World.prototype.pushToPlayer = function (player, message) {
        if (player && player.id in this.outgoingQueues) {
            var serializedMessage = message.serialize();
            this.outgoingQueues[player.id].push(serializedMessage);
            if (serializedMessage[0] === Types.Messages.HEALTH && player.hasParty()) {
                this.pushToParty(player.getParty(), new Messages.Party(Types.Messages.PARTY_ACTIONS.HEALTH, {
                    id: player.id,
                    hp: player.hitPoints,
                    mHp: player.maxHitPoints,
                }));
            }
        }
        else {
            console.log("pushToPlayer: player was undefined");
        }
    };
    World.prototype.pushToParty = function (party, message, except) {
        var _this = this;
        var exceptPlayerId = except === null || except === void 0 ? void 0 : except.id;
        if (party) {
            party.forEachMember(function (_a) {
                var id = _a.id;
                if (!exceptPlayerId || exceptPlayerId !== id) {
                    _this.pushToPlayer(_this.getEntityById(id), message);
                }
            });
        }
        else {
            console.log("pushToParty: party was undefined");
            Sentry.captureException(new Error("pushToParty: party was undefined"));
        }
    };
    World.prototype.pushToGroup = function (groupId, message, ignoredPlayer) {
        var self = this;
        var group = this.groups[groupId];
        var ignoredPlayerIds = (Array.isArray(ignoredPlayer) ? ignoredPlayer : [ignoredPlayer || undefined]).filter(Boolean);
        if (group) {
            _.each(group.players, function (playerId) {
                if (![ignoredPlayerIds].includes(playerId)) {
                    self.pushToPlayer(self.getEntityById(playerId), message);
                }
            });
        }
        else {
            console.error("groupId: " + groupId + " is not a valid group");
        }
    };
    World.prototype.pushToAdjacentGroups = function (groupId, message, ignoredPlayer) {
        var self = this;
        self.map.forEachAdjacentGroup(groupId, function (id) {
            self.pushToGroup(id, message, ignoredPlayer);
        });
    };
    World.prototype.pushToPreviousGroups = function (player, message) {
        var self = this;
        _.each(player.recentlyLeftGroups, function (id) {
            self.pushToGroup(id, message);
        });
        player.recentlyLeftGroups = [];
        if (player.petEntity) {
            player.petEntity.recentlyLeftGroups = [];
        }
    };
    World.prototype.pushBroadcast = function (message, ignoredPlayer) {
        for (var id in this.outgoingQueues) {
            if (id != ignoredPlayer) {
                this.outgoingQueues[id].push(message.serialize());
            }
        }
    };
    World.prototype.processQueues = function () {
        var connection;
        for (var id in this.outgoingQueues) {
            if (this.outgoingQueues[id].length > 0) {
                connection = this.server.getConnection(id);
                if (connection && connection.send) {
                    connection.send(this.outgoingQueues[id]);
                }
                this.outgoingQueues[id] = [];
            }
        }
    };
    World.prototype.addEntity = function (entity) {
        this.entities[entity.id] = entity;
        this.handleEntityGroupMembership(entity);
    };
    World.prototype.removeEntity = function (entity) {
        var _a;
        if (entity.poisonedInterval) {
            clearInterval(entity.poisonedInterval);
            entity.poisonedInterval = null;
        }
        if (entity.id in this.entities) {
            if (entity.type === "player") {
                entity.isDead = true;
            }
            else {
                delete this.entities[entity.id];
            }
        }
        if (entity.id in this.mobs) {
            delete this.mobs[entity.id];
        }
        if (entity.id in this.items) {
            delete this.items[entity.id];
        }
        if (entity.type === "mob") {
            this.clearMobAggroLink(entity);
            this.clearMobHateLinks(entity);
        }
        var delay = 30000;
        if (entity.kind === Types.Entities.DEATHKNIGHT) {
            var adjustedDifficulty = this.getPlayersAroundEntity({ x: 155, y: 53 });
            delay = delay - (adjustedDifficulty - 1) * 10000;
            if (delay < 3000) {
                delay = 3000;
            }
        }
        if (entity.kind === Types.Entities.ZOMBIE) {
            this.zombies.find(function (_a) {
                var id = _a.id;
                return entity.id === id;
            }).isDead = true;
        }
        if (entity.kind === Types.Entities.NECROMANCER) {
            this.despawnZombies();
        }
        (_a = entity.destroy) === null || _a === void 0 ? void 0 : _a.call(entity, delay);
        this.removeFromGroups(entity);
        console.debug("Removed " + Types.getKindAsString(entity.kind) + " : " + entity.id);
    };
    World.prototype.partyCreate = function (player) {
        this.currentPartyId += 1;
        var party = new Party(this.currentPartyId, player, this);
        this.parties[this.currentPartyId] = party;
        return party;
    };
    World.prototype.getParty = function (partyId) {
        return (partyId && this.parties[partyId]) || null;
    };
    World.prototype.tradeCreate = function (playerId1, playerId2) {
        this.currentTradeId += 1;
        var trade = new Trade(this.currentTradeId, playerId1, playerId2, this);
        this.trades[this.currentTradeId] = trade;
        return trade;
    };
    World.prototype.getTrade = function (tradeId) {
        return (tradeId && this.trades[tradeId]) || null;
    };
    World.prototype.addPlayer = function (player) {
        this.addEntity(player);
        this.players[player.id] = player;
        this.outgoingQueues[player.id] = [];
        return true;
    };
    World.prototype.removePlayer = function (player) {
        var _a;
        if (player.petEntity) {
            this.despawn(player.petEntity);
        }
        if (player.hasParty()) {
            (_a = player.getParty()) === null || _a === void 0 ? void 0 : _a.removeMember(player);
        }
        this.despawn(player);
        delete this.players[player.id];
        delete this.outgoingQueues[player.id];
    };
    World.prototype.loggedInPlayer = function (name) {
        for (var id in this.players) {
            if (this.players[id].name === name) {
                if (!this.players[id].isDead)
                    return true;
            }
        }
        return false;
    };
    World.prototype.addMob = function (mob) {
        this.addEntity(mob);
        this.mobs[mob.id] = mob;
    };
    World.prototype.addNpc = function (kind, x, y) {
        var self = this;
        var npc = new Npc("8" + x + "" + y, kind, x, y);
        npc.onRespawn(function () {
            npc.isDead = false;
            self.addMob(npc);
        });
        if (kind === Types.Entities.PORTALCOW) {
            npc.isDead = true;
            if (x === 43 && y === 211) {
                this.cowLevelTownNpcId = npc.id;
            }
            else {
                this.cowLevelNpcIds.push(npc.id);
            }
        }
        else if (kind === Types.Entities.PORTALMINOTAUR) {
            npc.isDead = true;
            if (x === 40 && y === 210) {
                this.minotaurLevelTownNpcId = npc.id;
            }
            else {
                this.minotaurLevelNpcId = npc.id;
            }
        }
        else if (kind === Types.Entities.SECRETSTAIRS) {
            npc.isDead = true;
            if (x === 8 && y === 683) {
                this.secretStairsChaliceNpcId = npc.id;
            }
            else if (x === 19 && y === 642) {
                this.secretStairsTreeNpcId = npc.id;
                this.addNpc(Types.Entities.TREE, x, y + 1);
            }
            else if (x === 159 && y === 597) {
                this.secretStairsPickaxeNpcId = npc.id;
            }
        }
        else if (kind === Types.Entities.SECRETSTAIRS2) {
            npc.isDead = true;
            if (x === 149 && y === 548) {
                this.secretStairsLeftTemplarNpcId = npc.id;
            }
            else if (x === 162 && y === 548) {
                this.secretStairsRightTemplarNpcId = npc.id;
            }
        }
        else if (kind === Types.Entities.PORTALSTONE) {
            npc.isDead = true;
            if (x === 71 && y === 643) {
                this.portalStoneNpcId = npc.id;
            }
            else {
                this.portalStoneInnerNpcId = npc.id;
            }
        }
        else if (kind === Types.Entities.PORTALGATEWAY) {
            npc.isDead = true;
            if (x === 97 && y === 545) {
                this.portalGatewayNpcId = npc.id;
            }
            else {
                this.portalGatewayInnerNpcId = npc.id;
            }
        }
        else {
            if (kind === Types.Entities.MAGICSTONE) {
                this.magicStones.push(npc.id);
            }
            else if (kind === Types.Entities.BLUEFLAME) {
                this.blueFlames.push(npc.id);
            }
            else if (kind === Types.Entities.STATUE || kind === Types.Entities.STATUE2) {
                this.statues.push(npc.id);
            }
            else if (kind === Types.Entities.ALTARCHALICE) {
                this.altarChaliceNpcId = npc.id;
            }
            else if (kind === Types.Entities.ALTARSOULSTONE) {
                this.altarSoulStoneNpcId = npc.id;
            }
            else if (kind === Types.Entities.HANDS) {
                this.handsNpcId = npc.id;
            }
            else if ([Types.Entities.TRAP, Types.Entities.TRAP2, Types.Entities.TRAP3].includes(kind)) {
                this.trapIds.push(npc.id);
            }
            else if (kind === Types.Entities.LEVER || kind === Types.Entities.LEVER2 || kind === Types.Entities.LEVER3) {
                if (npc.x === 10 && npc.y === 703) {
                    this.leverChaliceNpcId = npc.id;
                }
                else if (npc.x === 80 && npc.y === 703) {
                    this.leverLeftCryptNpcId = npc.id;
                }
                else if (npc.x === 67 && npc.y === 722) {
                    this.leverRightCryptNpcId = npc.id;
                }
                else if (npc.x === 149 && npc.y === 752) {
                    this.leverDeathAngelNpcId = npc.id;
                }
            }
            else if (kind === Types.Entities.GATE) {
                if (npc.x === 43 && npc.y === 579) {
                    this.gateTempleNpcId = npc.id;
                }
                else if (npc.x === 71 && npc.y === 548) {
                    this.gateSubTempleNpcId = npc.id;
                }
                npc.activate();
            }
            else if (kind === Types.Entities.JANETYELLEN) {
                this.janetYellenNpcId = npc.id;
            }
            else if (kind === Types.Entities.DOORDEATHANGEL) {
                this.doorDeathAngelNpcId = npc.id;
            }
            this.addEntity(npc);
        }
        this.npcs[npc.id] = npc;
        return npc;
    };
    World.prototype.addSpell = function (_a) {
        var _this = this;
        var kind = _a.kind, x = _a.x, y = _a.y, _b = _a.orientation, orientation = _b === void 0 ? Types.Orientations.UP : _b, originX = _a.originX, originY = _a.originY, element = _a.element, casterId = _a.casterId, casterKind = _a.casterKind, _c = _a.targetId, targetId = _c === void 0 ? undefined : _c, _d = _a.isRaise2, isRaise2 = _d === void 0 ? false : _d;
        var spell = new Spell({
            id: "9".concat(this.spellCount).concat(x).concat(y),
            kind: kind,
            x: x,
            y: y,
            orientation: orientation,
            originX: originX,
            originY: originY,
            element: element,
            casterId: casterId,
            casterKind: casterKind,
            targetId: targetId,
            isRaise2: isRaise2,
        });
        this.spellCount += 1;
        this.addEntity(spell);
        setTimeout(function () {
            _this.removeFromGroups(spell);
            _this.removeEntity(spell.id);
        }, 3000);
        return spell;
    };
    World.prototype.addItem = function (item) {
        this.addEntity(item);
        this.items[item.id] = item;
        return item;
    };
    World.prototype.castDeathAngelSpell = function (x, y) {
        var _this = this;
        var _a = this.deathAngel, id = _a.id, isDead = _a.isDead, mobX = _a.x, mobY = _a.y;
        var diffX = Math.abs(x - mobX);
        var diffY = Math.abs(y - mobY);
        if (!id || !this.isCastDeathAngelSpellEnabled || isDead || !x || !y || diffX > 16 || diffY > 16)
            return;
        this.isCastDeathAngelSpellEnabled = false;
        var coords = [
            [0, 1, Types.Orientations.DOWN],
            [1, 1, Types.Orientations.DOWN_RIGHT],
            [1, 0, Types.Orientations.RIGHT],
            [1, -1, Types.Orientations.UP_RIGHT],
            [0, -1, Types.Orientations.UP],
            [-1, -1, Types.Orientations.UP_LEFT],
            [-1, 0, Types.Orientations.LEFT],
            [-1, 1, Types.Orientations.DOWN_LEFT],
        ];
        var element = Types.getRandomElement();
        coords.forEach(function (_a) {
            var spellX = _a[0], spellY = _a[1], orientation = _a[2];
            _this.addSpell({
                kind: Types.Entities.DEATHANGELSPELL,
                x: x + spellX,
                y: y + spellY,
                orientation: orientation,
                originX: spellX,
                originY: spellY,
                element: element,
                casterId: _this.deathAngel.id,
                casterKind: Types.Entities.DEATHANGEL,
            });
        });
    };
    World.prototype.castShamanSpell = function (x, y, entity, targetId, isRaise2) {
        var _this = this;
        var id = entity.id, isDead = entity.isDead, mobX = entity.x, mobY = entity.y;
        var diffX = Math.abs(x - mobX);
        var diffY = Math.abs(y - mobY);
        if (!id || isDead || !x || !y || diffX > 16 || diffY > 16)
            return;
        if (isRaise2) {
            var coords = [
                [0, 1, Types.Orientations.DOWN],
                [1, 0, Types.Orientations.RIGHT],
                [0, -1, Types.Orientations.UP],
                [-1, 0, Types.Orientations.LEFT],
            ];
            coords.forEach(function (_a) {
                var spellX = _a[0], spellY = _a[1], orientation = _a[2];
                _this.addSpell({
                    kind: Types.Entities.MAGESPELL,
                    x: x + spellX,
                    y: y + spellY,
                    orientation: orientation,
                    originX: spellX,
                    originY: spellY,
                    element: entity.element,
                    casterId: entity.id,
                    casterKind: Types.Entities.SHAMAN,
                    isRaise2: isRaise2,
                });
            });
        }
        else {
            this.addSpell({
                kind: Types.Entities.MAGESPELL,
                x: x,
                y: y,
                orientation: Types.Orientations.DOWN,
                originX: x,
                originY: y,
                element: entity.element,
                casterId: entity.id,
                casterKind: Types.Entities.SHAMAN,
                targetId: targetId,
            });
        }
    };
    World.prototype.startCowLevel = function () {
        var _this = this;
        if (this.cowLevelClock || this.cowLevelInterval) {
            return;
        }
        this.cowTotal = 0;
        this.cowLevelClock = 15 * 60;
        var townPortal = this.npcs[this.cowLevelTownNpcId];
        townPortal.respawnCallback();
        this.cowLevelNpcId = _.shuffle(this.cowLevelNpcIds).slice(0, 1);
        var cowLevelPortal = this.npcs[this.cowLevelNpcId];
        cowLevelPortal.respawnCallback();
        this.cowLevelCoords = { x: cowLevelPortal.x, y: cowLevelPortal.y + 1 };
        this.pushBroadcast(new Messages.CowLevelStart(this.cowLevelCoords));
        var count = 0;
        var cowCoords = _.shuffle(this.cowPossibleCoords).slice(0, 30);
        cowCoords.map(function (_a, coordsIndex) {
            var x = _a.x, y = _a.y;
            var cowCount = Math.ceil(randomRange(8, 24));
            _this.cowTotal += cowCount;
            for (var i = 0; i < cowCount; i++) {
                var kind = coordsIndex === 0 && i === 0 ? Types.Entities.COWKING : Types.Entities.COW;
                var id = "7".concat(kind).concat(count++);
                var mob = new Mob(id, kind, x + _this.packOrder[i][0], y + _this.packOrder[i][1]);
                if (kind === Types.Entities.COWKING) {
                    _this.cowking = mob;
                }
                mob.onMove(_this.onMobMoveCallback.bind(_this));
                mob.onDestroy(function () {
                    _this.cowTotal--;
                    if (_this.cowTotal === 0) {
                        clearInterval(_this.cowLevelInterval);
                        setTimeout(function () {
                            _this.endCowLevel(true);
                            if (_this.minotaurSpawnTimeout && _this.minotaur.isDead && random(4) === 0) {
                                _this.minotaur.handleRespawn(0);
                                clearTimeout(_this.minotaurSpawnTimeout);
                                _this.minotaurSpawnTimeout = null;
                            }
                        }, 3000);
                    }
                });
                _this.addMob(mob);
                _this.cowEntityIds.push(id);
            }
        });
        this.cowLevelInterval = setInterval(function () {
            _this.cowLevelClock -= 1;
            if (_this.cowLevelClock < 0) {
                clearInterval(_this.cowLevelInterval);
                _this.endCowLevel();
            }
        }, 1000);
    };
    World.prototype.endCowLevel = function (isCompleted) {
        var _this = this;
        if (isCompleted === void 0) { isCompleted = false; }
        this.cowLevelInterval = null;
        this.cowLevelClock = null;
        this.cowKingHornDrop = false;
        var townPortal = this.npcs[this.cowLevelTownNpcId];
        this.despawn(townPortal);
        var cowLevelPortal = this.npcs[this.cowLevelNpcId];
        this.despawn(cowLevelPortal);
        this.pushBroadcast(new Messages.CowLevelEnd(isCompleted));
        this.cowEntityIds.map(function (entityId) {
            var entity = _this.getEntityById(entityId);
            if (entity) {
                _this.removeEntity(entity);
            }
        });
        this.cowEntityIds = [];
    };
    World.prototype.startMinotaurLevel = function () {
        var _this = this;
        this.minotaurLevelClock = 15 * 60;
        var portal = this.npcs[this.minotaurLevelTownNpcId];
        portal.respawnCallback();
        var minotaurLevelPortal = this.npcs[this.minotaurLevelNpcId];
        minotaurLevelPortal.respawnCallback();
        this.pushBroadcast(new Messages.MinotaurLevelStart());
        this.minotaurLevelInterval = setInterval(function () {
            _this.minotaurLevelClock -= 1;
            if (_this.minotaurLevelClock < 0) {
                clearInterval(_this.minotaurLevelInterval);
                _this.endMinotaurLevel();
            }
        }, 1000);
    };
    World.prototype.endMinotaurLevel = function () {
        this.minotaurLevelInterval = null;
        this.minotaurLevelClock = null;
        var portal = this.npcs[this.minotaurLevelTownNpcId];
        this.despawn(portal);
        var minotaurLevelPortal = this.npcs[this.minotaurLevelNpcId];
        this.despawn(minotaurLevelPortal);
        this.pushBroadcast(new Messages.MinotaurLevelEnd());
    };
    World.prototype.startChaliceLevel = function () {
        var _this = this;
        if (this.chaliceLevelClock)
            return;
        this.chaliceLevelClock = 15 * 60;
        var secretStairs = this.npcs[this.secretStairsChaliceNpcId];
        secretStairs.respawnCallback();
        this.pushBroadcast(new Messages.ChaliceLevelStart());
        if (this.shaman.isDead) {
            this.shaman.handleRespawn(0);
            this.shaman.clearTarget();
            this.shaman.forgetEveryone();
        }
        var count = 0;
        this.magePossibleCoords.forEach(function (_a) {
            var x = _a.x, y = _a.y;
            var mageCount = Math.ceil(randomRange(2, 4));
            var mobType = _.shuffle([Types.Entities.MAGE, Types.Entities.GHOST])[0];
            for (var i = 0; i < mageCount; i++) {
                var kind = mobType;
                var id = "7".concat(kind).concat(count++);
                var mob = new Mob(id, kind, x + _this.packOrder[i][0], y + _this.packOrder[i][1]);
                mob.onMove(_this.onMobMoveCallback.bind(_this));
                _this.addMob(mob);
                _this.mageEntityIds.push(id);
            }
        });
        clearInterval(this.chaliceLevelInterval);
        this.chaliceLevelInterval = setInterval(function () {
            _this.chaliceLevelClock -= 1;
            if (_this.chaliceLevelClock < 0) {
                clearInterval(_this.chaliceLevelInterval);
                _this.endChaliceLevel();
            }
        }, 1000);
    };
    World.prototype.endChaliceLevel = function (isCompleted) {
        var _this = this;
        var _a;
        if (isCompleted === void 0) { isCompleted = false; }
        this.chaliceLevelInterval = null;
        this.chaliceLevelClock = null;
        var secretStairs = this.npcs[this.secretStairsChaliceNpcId];
        this.despawn(secretStairs);
        (_a = this.getEntityById(this.altarChaliceNpcId)) === null || _a === void 0 ? void 0 : _a.deactivate();
        this.pushBroadcast(new Messages.ChaliceLevelEnd(isCompleted));
        this.mageEntityIds.map(function (entityId) {
            var entity = _this.getEntityById(entityId);
            if (entity) {
                _this.removeEntity(entity);
            }
        });
        this.mageEntityIds = [];
        if (!this.shaman.isDead) {
            this.removeEntity(this.shaman);
        }
    };
    World.prototype.startTempleLevel = function () {
        var _this = this;
        this.templeLevelClock = 15 * 60;
        var gate = this.npcs[this.gateTempleNpcId];
        gate.deactivate();
        this.despawn(gate);
        this.pushBroadcast(new Messages.TempleLevelStart());
        if (this.worm.isDead) {
            this.worm.handleRespawn(0);
            this.worm.clearTarget();
            this.worm.forgetEveryone();
        }
        if (this.deathAngel.isDead) {
            this.deathAngel.handleRespawn(0);
            this.deathAngel.clearTarget();
            this.deathAngel.forgetEveryone();
        }
        var count = 0;
        this.mageTemplePossibleCoords.map(function (_a) {
            var x = _a.x, y = _a.y;
            var mageCount = Math.ceil(randomRange(2, 5));
            var kind = _.shuffle([Types.Entities.MAGE, Types.Entities.SKELETONARCHER])[0];
            for (var i = 0; i < mageCount; i++) {
                var id = "7".concat(kind).concat(count++);
                var mob = new Mob(id, kind, x + _this.packOrder[i][0], y + _this.packOrder[i][1]);
                mob.isInsideTemple = true;
                mob.onMove(_this.onMobMoveCallback.bind(_this));
                _this.addMob(mob);
                _this.mageTempleEntityIds.push(id);
            }
        });
        this.templeLevelInterval = setInterval(function () {
            _this.templeLevelClock -= 1;
            if (_this.templeLevelClock < 0) {
                clearInterval(_this.templeLevelInterval);
                _this.endTempleLevel();
            }
        }, 1000);
    };
    World.prototype.endTempleLevel = function () {
        var _this = this;
        this.templeLevelInterval = null;
        this.templeLevelClock = null;
        var gate = this.npcs[this.gateTempleNpcId];
        gate.activate();
        gate.respawnCallback();
        this.pushBroadcast(new Messages.TempleLevelEnd());
        var lever = this.npcs[this.leverChaliceNpcId];
        lever.deactivate();
        this.pushBroadcast(new Messages.Unraise(lever.id));
        var deathAngelDoor = this.getEntityById(this.doorDeathAngelNpcId);
        deathAngelDoor.deactivate();
        var deathAngelLever = this.getEntityById(this.leverDeathAngelNpcId);
        deathAngelLever.deactivate();
        this.mageTempleEntityIds.map(function (entityId) {
            var entity = _this.getEntityById(entityId);
            if (entity) {
                _this.removeEntity(entity);
            }
        });
        this.mageTempleEntityIds = [];
        if (!this.worm.isDead) {
            this.removeEntity(this.worm);
        }
        if (!this.deathAngel.isDead) {
            this.removeEntity(this.deathAngel);
        }
    };
    World.prototype.startStoneLevel = function () {
        var _this = this;
        this.stoneLevelClock = 15 * 60;
        this.powderSpiderId = null;
        this.chaliceSpiderId = null;
        this.spiderTotal = 1;
        var stonePortal = this.npcs[this.portalStoneNpcId];
        stonePortal.respawnCallback();
        var stoneInnerPortal = this.npcs[this.portalStoneInnerNpcId];
        stoneInnerPortal.respawnCallback();
        if (this.spiderQueen.isDead) {
            this.spiderQueen.handleRespawn(0);
            this.spiderQueen.clearTarget();
            this.spiderQueen.forgetEveryone();
        }
        this.pushBroadcast(new Messages.StoneLevelStart());
        var count = 0;
        _.shuffle(this.spiderPossibleCoords).map(function (_a, coordsIndex) {
            var x = _a.x, y = _a.y;
            var kind = coordsIndex % 2 ? Types.Entities.SPIDER : Types.Entities.SPIDER2;
            var id = "7".concat(kind).concat(count++);
            _this.spiderTotal += 1;
            var mob = new Mob(id, kind, x, y);
            mob.onMove(_this.onMobMoveCallback.bind(_this));
            mob.onDestroy(function () {
                _this.spiderTotal--;
                if (_this.spiderTotal === 0) {
                    clearInterval(_this.stoneLevelInterval);
                    setTimeout(function () {
                        _this.endStoneLevel();
                    }, 5000);
                }
            });
            _this.addMob(mob);
            _this.spiderEntityIds.push(id);
            if (coordsIndex === 0) {
                _this.powderSpiderId = mob.id;
            }
            else if (coordsIndex === 4) {
                _this.chaliceSpiderId = mob.id;
            }
        });
        this.stoneLevelInterval = setInterval(function () {
            _this.stoneLevelClock -= 1;
            if (_this.stoneLevelClock < 0) {
                clearInterval(_this.stoneLevelInterval);
                _this.endStoneLevel();
            }
        }, 1000);
    };
    World.prototype.endStoneLevel = function () {
        var _this = this;
        this.stoneLevelInterval = null;
        this.stoneLevelClock = null;
        var stonePortal = this.npcs[this.portalStoneNpcId];
        this.despawn(stonePortal);
        var bloodPortal = this.npcs[this.portalStoneInnerNpcId];
        this.despawn(bloodPortal);
        this.pushBroadcast(new Messages.StoneLevelEnd());
        this.deactivateMagicStones();
        this.spiderEntityIds.map(function (entityId) {
            var entity = _this.getEntityById(entityId);
            if (entity) {
                _this.removeEntity(entity);
            }
        });
        this.spiderEntityIds = [];
        if (!this.spiderQueen.isDead) {
            this.removeEntity(this.spiderQueen);
        }
    };
    World.prototype.startGatewayLevel = function () {
        var _this = this;
        this.gatewayLevelClock = 15 * 60;
        var gatewayPortal = this.npcs[this.portalGatewayNpcId];
        gatewayPortal.respawnCallback();
        var gatewayInnerPortal = this.npcs[this.portalGatewayInnerNpcId];
        gatewayInnerPortal.respawnCallback();
        this.pushBroadcast(new Messages.GatewayLevelStart());
        if (this.butcher.isDead) {
            this.butcher.handleRespawn(0);
            this.spiderQueen.clearTarget();
            this.spiderQueen.forgetEveryone();
        }
        var count = 0;
        this.archerPossibleCoords.map(function (_a) {
            var x = _a.x, y = _a.y;
            var archerCount = Math.ceil(randomRange(3, 5));
            for (var i = 0; i < archerCount; i++) {
                var kind = Types.Entities.SKELETONARCHER;
                var id = "7".concat(kind).concat(count++);
                var mob = new Mob(id, kind, x + _this.packOrder[i][0], y + _this.packOrder[i][1]);
                mob.onMove(_this.onMobMoveCallback.bind(_this));
                mob.onDestroy(function () { });
                _this.addMob(mob);
                _this.archerEntityIds.push(id);
            }
        });
        this.gatewayLevelInterval = setInterval(function () {
            _this.gatewayLevelClock -= 1;
            if (_this.gatewayLevelClock < 0) {
                clearInterval(_this.gatewayLevelInterval);
                _this.endGatewayLevel();
            }
        }, 1000);
    };
    World.prototype.endGatewayLevel = function () {
        var _this = this;
        this.gatewayLevelInterval = null;
        this.gatewayLevelClock = null;
        var gatewayPortal = this.npcs[this.portalGatewayNpcId];
        this.despawn(gatewayPortal);
        var gatewayInnerPortal = this.npcs[this.portalGatewayInnerNpcId];
        this.despawn(gatewayInnerPortal);
        this.pushBroadcast(new Messages.GatewayLevelEnd());
        this.deactivateHands();
        this.archerEntityIds.map(function (entityId) {
            var entity = _this.getEntityById(entityId);
            if (entity) {
                _this.removeEntity(entity);
            }
        });
        this.archerEntityIds = [];
        if (!this.butcher.isDead) {
            this.removeEntity(this.butcher);
        }
    };
    World.prototype.startTreeLevel = function (tree) {
        var _this = this;
        this.isActivatedTreeLevel = true;
        this.despawn(tree);
        var secretStairs = this.npcs[this.secretStairsTreeNpcId];
        secretStairs.respawnCallback();
        setTimeout(function () {
            _this.isActivatedTreeLevel = false;
            tree.respawnCallback();
            _this.despawn(secretStairs);
        }, 5000);
    };
    World.prototype.activateFossil = function (player, force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, secretStairs_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = force;
                        if (_a) return [3, 2];
                        return [4, this.databaseHandler.useWeaponItem(player)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            secretStairs_1 = this.npcs[this.secretStairsPickaxeNpcId];
                            secretStairs_1.respawnCallback();
                            setTimeout(function () {
                                _this.isActivatedTreeLevel = false;
                                _this.despawn(secretStairs_1);
                            }, 10000);
                        }
                        return [2];
                }
            });
        });
    };
    World.prototype.createItem = function (_a) {
        var kind = _a.kind, skin = _a.skin, x = _a.x, y = _a.y, partyId = _a.partyId, level = _a.level, mobKind = _a.mobKind, amount = _a.amount;
        var id = "9" + this.itemCount++, item = null;
        if (kind === Types.Entities.CHEST) {
            item = new Chest(id, x, y);
        }
        else {
            item = new Item({ id: id, kind: kind, skin: skin, x: x, y: y, partyId: partyId, level: level, mobKind: mobKind, amount: amount });
        }
        return item;
    };
    World.prototype.createChest = function (x, y, items) {
        var chest = this.createItem({ kind: Types.Entities.CHEST, x: x, y: y });
        chest.setItems(items);
        return chest;
    };
    World.prototype.addStaticItem = function (item) {
        item.isStatic = true;
        item.onRespawn(this.addStaticItem.bind(this, item));
        return this.addItem(item);
    };
    World.prototype.addItemFromChest = function (kind, x, y) {
        var item = this.createItem({ kind: kind, x: x, y: y });
        item.isFromChest = true;
        return this.addItem(item);
    };
    World.prototype.clearMobAggroLink = function (mob, player) {
        if (player === void 0) { player = null; }
        var targetPlayer = null;
        if (mob.targetId) {
            targetPlayer = this.getEntityById(mob.targetId);
            if (targetPlayer) {
                if (!player || (player && targetPlayer.id === player.id)) {
                    targetPlayer.removeAttacker(mob);
                }
            }
        }
    };
    World.prototype.clearMobHateLinks = function (mob) {
        var self = this;
        if (mob) {
            _.each(mob.hateList, function (obj) {
                var player = self.getEntityById(obj.id);
                if (player) {
                    player.removeHater(mob);
                }
            });
        }
    };
    World.prototype.forEachEntity = function (callback) {
        for (var id in this.entities) {
            callback(this.entities[id]);
        }
    };
    World.prototype.forEachPlayer = function (callback) {
        for (var id in this.players) {
            callback(this.players[id]);
        }
    };
    World.prototype.forEachMob = function (callback) {
        for (var id in this.mobs) {
            callback(this.mobs[id]);
        }
    };
    World.prototype.forEachCharacter = function (callback) {
        this.forEachPlayer(callback);
        this.forEachMob(callback);
    };
    World.prototype.handleMobHate = function (mobId, playerId, hatePoints) {
        var mob = this.getEntityById(mobId);
        var player = this.getEntityById(playerId);
        if (player && mob) {
            mob.increaseHateFor(playerId, hatePoints);
            player.addHater(mob);
            if (mob.kind === Types.Entities.NECROMANCER && !mob.hasTarget()) {
                this.startRaiseNecromancerInterval(player, mob);
            }
            else if (mob.kind === Types.Entities.DEATHANGEL && !mob.hasTarget()) {
                this.startRaiseDeathAngelInterval(player, mob);
            }
            else if (mob.kind === Types.Entities.DEATHBRINGER && !mob.hasTarget()) {
                this.startRaiseDeathBringerInterval(player, mob);
            }
            else if (mob.kind === Types.Entities.BUTCHER && !mob.hasTaunted) {
                mob.hasTaunted = true;
                this.pushBroadcast(new Messages.Taunt(mob.id));
            }
            if (mob.hitPoints > 0) {
                this.chooseMobTarget(mob);
            }
        }
    };
    World.prototype.chooseMobTarget = function (mob, hateRank, ignorePlayerId) {
        var playerId = mob.getHatedPlayerId(hateRank, ignorePlayerId);
        var player;
        if (ignorePlayerId && ignorePlayerId === playerId) {
            player = null;
        }
        else {
            player = this.getEntityById(playerId);
        }
        if (!player) {
            this.clearMobAggroLink(mob);
        }
        else {
            this.clearMobAggroLink(mob, player);
            player.addAttacker(mob);
            mob.setTarget(player);
            this.broadcastAttacker(mob);
            console.debug(mob.id + " is now attacking " + player.id);
        }
    };
    World.prototype.onEntityAttack = function (callback) {
        this.attack_callback = callback;
    };
    World.prototype.getEntityById = function (id) {
        if (id in this.entities) {
            return this.entities[id];
        }
        else {
            console.log("Unknown entity : " + id);
        }
    };
    World.prototype.getPlayerCount = function () {
        var count = 0;
        for (var p in this.players) {
            if (this.players.hasOwnProperty(p)) {
                count += 1;
            }
        }
        return count;
    };
    World.prototype.getPlayerPopulation = function () {
        var players = _.sortBy(Object.values(this.players).reduce(function (acc, _a) {
            var id = _a.id, name = _a.name, level = _a.level, hash = _a.hash, account = _a.account, network = _a.network, partyId = _a.partyId, ip = _a.ip, partyEnabled = _a.partyEnabled, tradeEnabled = _a.tradeEnabled, bonus = _a.bonus;
            acc.push({
                id: id,
                name: name,
                level: level,
                network: account ? network : null,
                hash: !!hash,
                partyId: partyId,
                ip: ip,
                partyEnabled: partyEnabled,
                tradeEnabled: tradeEnabled,
                bonus: bonus,
            });
            return acc;
        }, []), ["name"]);
        return players;
    };
    World.prototype.broadcastAttacker = function (character) {
        if (character) {
            this.pushToAdjacentGroups(character.group, character.attack(), character.id);
        }
        if (this.attack_callback) {
            this.attack_callback(character);
        }
    };
    World.prototype.startRaiseNecromancerInterval = function (character, mob) {
        var _this = this;
        this.stopRaiseNecromancerInterval();
        var raiseZombies = function () {
            var adjustedDifficulty = _this.getPlayersAroundEntity(mob);
            var minRaise = adjustedDifficulty + 1;
            if (minRaise) {
                _this.broadcastRaise(character, mob);
                var zombieCount = 0;
                var randomZombies = _this.shuffle(_this.zombies);
                for (var i = 0; i < randomZombies.length; i++) {
                    if (zombieCount === minRaise)
                        break;
                    var entity = randomZombies[i];
                    if (entity.isDead &&
                        (!entity.destroyTime || entity.destroyTime < Date.now() - 1000) &&
                        entity.x <= character.x + 5 &&
                        entity.x >= character.x - 5 &&
                        entity.y <= character.y + 5 &&
                        entity.y >= character.y - 5) {
                        zombieCount++;
                        entity.respawnCallback();
                    }
                }
            }
        };
        this.raiseNecromancerInterval = setInterval(function () {
            if (mob && Array.isArray(mob.hateList) && !mob.hateList.length) {
                _this.stopRaiseNecromancerInterval();
                _this.despawnZombies();
            }
            else {
                raiseZombies();
            }
        }, 7500);
        raiseZombies();
    };
    World.prototype.stopRaiseNecromancerInterval = function () {
        clearInterval(this.raiseNecromancerInterval);
        this.raiseNecromancerInterval = null;
    };
    World.prototype.startRaiseDeathAngelInterval = function (player, mob) {
        var _this = this;
        this.stopRaiseDeathAngelInterval();
        var raiseSkeletonSpell = function () {
            _this.broadcastRaise(player, mob);
            _this.isCastDeathAngelSpellEnabled = true;
        };
        this.raiseDeathAngelInterval = setInterval(function () {
            if (mob && Array.isArray(mob.hateList) && !mob.hateList.length) {
                _this.stopRaiseDeathAngelInterval();
            }
            else {
                raiseSkeletonSpell();
            }
        }, 4000);
        raiseSkeletonSpell();
    };
    World.prototype.stopRaiseDeathAngelInterval = function () {
        clearInterval(this.raiseDeathAngelInterval);
        this.raiseDeathBringerInterval = null;
        this.isCastDeathBringerSpellEnabled = true;
    };
    World.prototype.startRaiseDeathBringerInterval = function (player, mob) {
        var _this = this;
        this.stopRaiseDeathBringerInterval();
        var raiseSkeletonSpell = function () {
            _this.broadcastRaise(player, mob);
            _this.isCastDeathAngelSpellEnabled = true;
        };
        this.raiseDeathBringerInterval = setInterval(function () {
            if (mob && Array.isArray(mob.hateList) && !mob.hateList.length) {
                _this.stopRaiseDeathBringerInterval();
            }
            else {
                raiseSkeletonSpell();
            }
        }, 2500);
        raiseSkeletonSpell();
    };
    World.prototype.stopRaiseDeathBringerInterval = function () {
        clearInterval(this.raiseDeathAngelInterval);
        this.raiseDeathBringerInterval = null;
        this.isCastDeathBringerSpellEnabled = true;
    };
    World.prototype.activateMagicStone = function (player, magicStone) {
        magicStone.activate();
        var magicStoneIndex = this.magicStones.findIndex(function (id) { return id === magicStone.id; });
        var blueflame = this.getEntityById(this.blueFlames[magicStoneIndex]);
        blueflame.activate();
        this.activatedMagicStones.push(magicStone.id);
        this.broadcastRaise(player, magicStone);
        this.pushBroadcast(new Messages.Raise(blueflame.id));
        if (this.magicStones.length === this.activatedMagicStones.length) {
            this.startStoneLevel();
        }
    };
    World.prototype.deactivateMagicStones = function () {
        var _this = this;
        this.blueFlames.forEach(function (id) {
            _this.getEntityById(id).deactivate();
            _this.pushBroadcast(new Messages.Unraise(id));
        });
        this.magicStones.forEach(function (id) {
            _this.getEntityById(id).deactivate();
            _this.pushBroadcast(new Messages.Unraise(id));
        });
        this.activatedMagicStones = [];
    };
    World.prototype.activateLever = function (player, lever, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (!force && lever.id === this.leverDeathAngelNpcId && !this.worm.isDead)
            return;
        if (!force && lever.id === this.leverChaliceNpcId && !this.shaman.isDead)
            return;
        lever.activate();
        if (lever.id === this.leverChaliceNpcId) {
            clearInterval(this.chaliceLevelInterval);
            setTimeout(function () {
                _this.endChaliceLevel(true);
            }, 3000);
            this.startTempleLevel();
        }
        else if (lever.id === this.leverLeftCryptNpcId) {
            var secretStairs = this.npcs[this.secretStairsLeftTemplarNpcId];
            this.poisonTemplar.handleRespawn(0);
            this.poisonTemplar.clearTarget();
            this.poisonTemplar.forgetEveryone();
            secretStairs.respawnCallback();
        }
        else if (lever.id === this.leverRightCryptNpcId) {
            var secretStairs = this.npcs[this.secretStairsRightTemplarNpcId];
            this.magicTemplar.handleRespawn(0);
            this.magicTemplar.clearTarget();
            this.magicTemplar.forgetEveryone();
            secretStairs.respawnCallback();
        }
        else if (lever.id === this.leverDeathAngelNpcId) {
            var deathAngelDoor = this.getEntityById(this.doorDeathAngelNpcId);
            deathAngelDoor.activate();
            this.broadcastRaise(player, deathAngelDoor);
        }
        this.broadcastRaise(player, lever);
    };
    World.prototype.activateStatues = function () {
        var _this = this;
        this.statues.forEach(function (statueId) {
            _this.activateStatue(statueId);
        });
    };
    World.prototype.activateStatue = function (statueId) {
        var _this = this;
        var statue = this.getEntityById(statueId);
        var player = this.getFirstPlayerNearEntity(statue);
        if (player) {
            if (!statue.isActivated) {
                statue.activate();
                this.broadcastRaise(player, statue);
                var kind_1 = Types.Entities.STATUESPELL;
                var element_1 = "flame";
                if (statue.kind === Types.Entities.STATUE2) {
                    kind_1 = Types.Entities.STATUE2SPELL;
                    element_1 = "cold";
                }
                setTimeout(function () {
                    _this.addSpell({
                        kind: kind_1,
                        x: statue.x,
                        y: statue.y + 1,
                        orientation: Types.Orientations.DOWN,
                        originX: statue.x,
                        originY: statue.y,
                        element: element_1,
                        casterId: statue.id,
                        casterKind: statue.kind,
                    });
                }, 300);
                setTimeout(function () {
                    statue.isActivated = false;
                    _this.activateStatue(statueId);
                }, randomInt(2, 3) * 1000);
            }
        }
        else {
            statue.deactivate();
        }
    };
    World.prototype.activateAltarChalice = function (player, force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var altar, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        altar = this.getEntityById(this.altarChaliceNpcId);
                        if (!(altar && altar instanceof Npc && !altar.isActivated)) return [3, 3];
                        _a = force;
                        if (_a) return [3, 2];
                        return [4, this.databaseHandler.useInventoryItem(player, "chalice")];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            altar.activate();
                            this.startChaliceLevel();
                            this.broadcastRaise(player, altar);
                        }
                        _b.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    World.prototype.activateAltarSoulStone = function (player, force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var altar, _a, kind, item, soulStoneItem, isRune, runeName, rune, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        altar = this.getEntityById(this.altarSoulStoneNpcId);
                        if (!(altar && altar instanceof Npc && !altar.isActivated)) return [3, 6];
                        altar.activate();
                        setTimeout(function () {
                            altar.deactivate();
                        }, 1000);
                        _a = force;
                        if (_a) return [3, 2];
                        return [4, this.databaseHandler.useInventoryItem(player, "soulstone")];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3, 6];
                        kind = void 0;
                        item = void 0;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        soulStoneItem = generateSoulStoneItem();
                        isRune = Types.isRune(soulStoneItem.item);
                        if (!isRune) {
                            kind = Types.getKindFromString(soulStoneItem.item);
                            item = player.generateItem({
                                kind: kind,
                                uniqueChances: soulStoneItem.uniqueChances,
                            });
                        }
                        else {
                            item = soulStoneItem;
                            kind = Types.getKindFromString(soulStoneItem.item);
                            runeName = item.item;
                            rune = Types.getRuneFromItem(runeName);
                            if (rune.rank >= 20) {
                                postMessageToDiscordEventChannel("**".concat(player.name, "** obtained ").concat(Types.RuneList[rune.rank - 1].toUpperCase(), " rune ").concat(EmojiMap[runeName], " from the Soul Stone"));
                            }
                        }
                        this.databaseHandler.lootItems({
                            player: player,
                            items: [item],
                        });
                        player.send(new Messages.SoulStone({ kind: kind, isUnique: item.isUnique }).serialize());
                        this.broadcastRaise(player, altar);
                        return [4, this.databaseHandler.foundAchievement(player, ACHIEVEMENT_ZAP_INDEX).player.connection.send({
                                type: Types.Messages.NOTIFICATION,
                                achievement: ACHIEVEMENT_NAMES[ACHIEVEMENT_ZAP_INDEX],
                                message: "You cracked the Soulstone open!",
                            })];
                    case 4:
                        _b.sent();
                        return [3, 6];
                    case 5:
                        err_1 = _b.sent();
                        Sentry.captureException(err_1, {
                            extra: {
                                player: player.name,
                                item: item,
                            },
                        });
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    World.prototype.activateHands = function (player, force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var hands, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        hands = this.getEntityById(this.handsNpcId);
                        if (!(hands && hands instanceof Npc && !hands.isActivated)) return [3, 3];
                        _a = force;
                        if (_a) return [3, 2];
                        return [4, this.databaseHandler.useInventoryItem(player, "powderquantum")];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            hands.activate();
                            this.soulStonePlayerName = player.name;
                            this.startGatewayLevel();
                            this.broadcastRaise(player, hands);
                        }
                        _b.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    World.prototype.deactivateHands = function () {
        var hands = this.getEntityById(this.handsNpcId);
        this.soulStonePlayerName = null;
        if (hands && hands instanceof Npc && hands.isActivated) {
            hands.deactivate();
            this.pushBroadcast(new Messages.Unraise(hands.id));
        }
    };
    World.prototype.activateTrap = function (player, trapId) {
        var trap = this.getEntityById(trapId);
        if (!trap || trap.isActivated)
            return;
        trap.activate();
        this.broadcastRaise(player, trap);
        setTimeout(function () {
            trap.isActivated = false;
        }, 3000);
    };
    World.prototype.broadcastRaise = function (player, mob) {
        if (player && mob) {
            this.pushToAdjacentGroups(player.group, mob.raise(player.id));
        }
    };
    World.prototype.incrementExp = function (player, mob, expOverride) {
        var playerLevel = player.level;
        var mobLevel = Types.getMobLevel(mob.kind);
        var EXP_LEVEL_BELOW_MOB = 8;
        var EXP_LEVEL_START_RANGE = 2;
        var EXP_LEVEL_END_RANGE = 6;
        var exp = expOverride || Types.getMobExp(mob.kind);
        if (Types.isMiniBoss(mob)) {
            exp = Math.ceil(exp * 3);
        }
        var levelDifference = playerLevel - mobLevel;
        if (Types.isBoss(mob.kind)) {
            if (levelDifference < 0 && levelDifference >= -EXP_LEVEL_BELOW_MOB) {
                var multiplier = Math.abs(levelDifference) / 8;
                exp = Math.ceil(exp * multiplier);
            }
            else {
                exp = 0;
            }
        }
        else if (levelDifference < 0) {
            if (levelDifference < -EXP_LEVEL_BELOW_MOB) {
                exp = 0;
            }
        }
        else if (levelDifference > 0) {
            if (levelDifference > EXP_LEVEL_END_RANGE) {
                exp = 0;
            }
            else if (levelDifference > EXP_LEVEL_START_RANGE) {
                var multiplier = (levelDifference - EXP_LEVEL_START_RANGE) / 8;
                exp = exp - Math.ceil(exp * multiplier);
            }
        }
        if (exp) {
            exp = Math.ceil((parseInt(exp) * (player.bonus.exp + player.partyBonus.exp)) / 100 + parseInt(exp));
            player.incExp(exp);
        }
        this.pushToPlayer(player, new Messages.Kill(mob, player.level, player.experience, exp));
        return exp;
    };
    World.prototype.handleHurtEntity = function (_a) {
        var _this = this;
        var attacker = _a.attacker, entity = _a.entity, dmg = _a.dmg, _b = _a.isCritical, isCritical = _b === void 0 ? false : _b, _c = _a.isBlocked, isBlocked = _c === void 0 ? false : _c;
        if ((attacker === null || attacker === void 0 ? void 0 : attacker.type) === "player") {
            this.pushToPlayer(attacker, new Messages.Damage(entity, dmg, entity.hitPoints, entity.maxHitPoints, isCritical, isBlocked));
            if (entity === null || entity === void 0 ? void 0 : entity.healthEntity) {
                this.pushToAdjacentGroups(attacker.group, entity.healthEntity(), [attacker.id, entity.id]);
            }
        }
        if (entity.type === "player") {
            this.pushToPlayer(entity, entity.health({ isHurt: true, dmg: dmg, isBlocked: isBlocked, attacker: { type: attacker.type } }));
        }
        if (entity.hitPoints <= 0) {
            if (entity.type === "mob") {
                var mob = entity;
                var item = this.getDroppedItem(mob, attacker);
                if (attacker.hasParty()) {
                    attacker.getParty().shareExp(mob);
                }
                else {
                    this.incrementExp(attacker, mob);
                }
                this.pushToAdjacentGroups(mob.group, mob.despawn());
                if (item) {
                    this.pushToAdjacentGroups(mob.group, mob.drop(item));
                    this.handleItemDespawn(item);
                }
            }
            else if (entity.type === "player") {
                this.handlePlayerVanish(entity);
                this.pushToAdjacentGroups(entity.group, entity.despawn());
                clearInterval(entity.checkHashInterval);
                if (entity.petEntity) {
                    this.despawn(entity.petEntity);
                }
                if (attacker.type === "mob" || attacker.casterKind) {
                    var penalty = getGoldDeathPenaltyPercent(entity.level);
                    if (!penalty)
                        return;
                    this.databaseHandler
                        .deductGold(entity, { penalty: penalty })
                        .then(function (goldBank) {
                        _this.goldBank = Number(goldBank);
                    })
                        .catch(function (err) {
                        Sentry.captureException(err);
                    });
                }
            }
            this.removeEntity(entity);
        }
        if ((attacker === null || attacker === void 0 ? void 0 : attacker.type) === "spell" && ![Types.Entities.DEATHBRINGERSPELL].includes(attacker.kind)) {
            this.pushToAdjacentGroups(attacker.group, attacker.despawn());
            this.removeEntity(attacker);
        }
    };
    World.prototype.despawn = function (entity) {
        this.pushToAdjacentGroups(entity.group, entity.despawn());
        if (entity.id in this.entities) {
            this.removeEntity(entity);
        }
    };
    World.prototype.despawnZombies = function () {
        var _this = this;
        this.zombies.forEach(function (zombie) {
            _this.despawn(zombie);
        });
    };
    World.prototype.spawnStaticEntities = function () {
        var self = this;
        var count = 0;
        _.each(this.map.staticEntities, function (kindName, tid) {
            var kind = Types.getKindFromString(kindName);
            var pos = self.map.tileIndexToGridPosition(tid);
            if (Types.isNpc(kind)) {
                self.addNpc(kind, pos.x + 1, pos.y);
            }
            else if (Types.isMob(kind)) {
                if (kind === Types.Entities.COW) {
                    self.cowPossibleCoords.push({ x: pos.x + 1, y: pos.y });
                }
                else if ([Types.Entities.SPIDER, Types.Entities.SPIDER2].includes(kind)) {
                    self.spiderPossibleCoords.push({ x: pos.x + 1, y: pos.y });
                }
                else if (kind === Types.Entities.SKELETONARCHER && pos.x < 29 && pos.y >= 744 && pos.y <= 781) {
                    self.archerPossibleCoords.push({ x: pos.x + 1, y: pos.y });
                }
                else if (kind === Types.Entities.MAGE && pos.x < 29 && pos.y >= 696 && pos.y <= 734) {
                    self.magePossibleCoords.push({ x: pos.x + 1, y: pos.y });
                }
                else if (kind === Types.Entities.MAGE && pos.x > 112 && pos.y >= 744) {
                    self.mageTemplePossibleCoords.push({ x: pos.x + 1, y: pos.y });
                }
                else {
                    var id = "7".concat(kind).concat(count++);
                    var mob_1 = new Mob(id, kind, pos.x + 1, pos.y);
                    if (kind === Types.Entities.MINOTAUR) {
                        self.minotaur = mob_1;
                        mob_1.onDestroy(function () {
                            clearInterval(self.minotaurLevelInterval);
                            setTimeout(function () {
                                self.endMinotaurLevel();
                            }, 5000);
                            var time = (random(120) + 60 * 6) * 60 * 1000;
                            self.minotaurSpawnTimeout = setTimeout(function () {
                                mob_1.handleRespawn(0);
                                self.minotaurSpawnTimeout = null;
                            }, time);
                        });
                    }
                    else if (kind === Types.Entities.BUTCHER) {
                        self.butcher = mob_1;
                        mob_1.onDestroy(function () {
                            if (!self.gatewayLevelClock)
                                return;
                            clearInterval(self.gatewayLevelInterval);
                            setTimeout(function () {
                                self.endGatewayLevel();
                            }, 5000);
                        });
                    }
                    else if (kind === Types.Entities.SPIDERQUEEN) {
                        self.spiderQueen = mob_1;
                        mob_1.onDestroy(function () {
                            if (!self.stoneLevelClock)
                                return;
                            self.spiderTotal--;
                            if (self.spiderTotal === 0) {
                                clearInterval(self.stoneLevelInterval);
                                setTimeout(function () {
                                    self.endStoneLevel();
                                }, 5000);
                            }
                        });
                    }
                    else if (kind === Types.Entities.WORM) {
                        self.worm = mob_1;
                    }
                    else if (kind === Types.Entities.NECROMANCER) {
                        self.necromancer = mob_1;
                    }
                    else if (kind === Types.Entities.SHAMAN) {
                        self.shaman = mob_1;
                    }
                    else if (kind === Types.Entities.DEATHANGEL) {
                        self.deathAngel = mob_1;
                        self.deathAngelSpawnCoords = { x: mob_1.x, y: mob_1.y };
                        mob_1.onDestroy(function () {
                            if (!self.templeLevelClock)
                                return;
                            clearInterval(self.templeLevelInterval);
                            setTimeout(function () {
                                self.endTempleLevel();
                            }, 5000);
                        });
                    }
                    else if (kind === Types.Entities.SKELETONTEMPLAR || kind === Types.Entities.SKELETONTEMPLAR2) {
                        var isPoisonTemplar_1 = kind === Types.Entities.SKELETONTEMPLAR;
                        var isMagicTemplar = kind === Types.Entities.SKELETONTEMPLAR2;
                        if (isPoisonTemplar_1) {
                            self.poisonTemplar = mob_1;
                            self.poisonTemplarId = mob_1.id;
                            mob_1.onRespawn(function () {
                                mob_1.clearTarget();
                                mob_1.forgetEveryone();
                            });
                        }
                        else if (isMagicTemplar) {
                            self.magicTemplar = mob_1;
                            self.magicTemplarId = mob_1.id;
                            mob_1.onRespawn(function () {
                                mob_1.clearTarget();
                                mob_1.forgetEveryone();
                            });
                        }
                        mob_1.onDestroy(function () {
                            var lever = self.npcs[isPoisonTemplar_1 ? self.leverLeftCryptNpcId : self.leverRightCryptNpcId];
                            var secretStairs = self.npcs[isPoisonTemplar_1 ? self.secretStairsLeftTemplarNpcId : self.secretStairsRightTemplarNpcId];
                            self.despawn(secretStairs);
                            lever.deactivate();
                            self.pushBroadcast(new Messages.Unraise(lever.id));
                        });
                    }
                    mob_1.onRespawn(function () {
                        mob_1.isDead = false;
                        mob_1.clearTarget();
                        mob_1.forgetEveryone();
                        self.addMob(mob_1);
                        if (mob_1.area && mob_1.area instanceof ChestArea) {
                            mob_1.area.addToArea(mob_1);
                        }
                        mob_1.handleRandomElement();
                        mob_1.handleEnchant();
                        mob_1.handleRandomResistances();
                    });
                    mob_1.onMove(self.onMobMoveCallback.bind(self));
                    if ([Types.Entities.ZOMBIE].includes(kind)) {
                        mob_1.isDead = true;
                        self.zombies.push(mob_1);
                    }
                    else {
                        self.addMob(mob_1);
                    }
                    self.tryAddingMobToChestArea(mob_1);
                }
            }
            if (Types.isItem(kind)) {
                self.addStaticItem(self.createItem({ kind: kind, x: pos.x + 1, y: pos.y }));
            }
        });
    };
    World.prototype.isValidPosition = function (x, y) {
        if (this.map && _.isNumber(x) && _.isNumber(y) && !this.map.isOutOfBounds(x, y) && !this.map.isColliding(x, y)) {
            return true;
        }
        return false;
    };
    World.prototype.handlePlayerVanish = function (player) {
        var _this = this;
        var previousAttackers = [];
        player.forEachAttacker(function (mob) {
            previousAttackers.push(mob);
            _this.chooseMobTarget(mob, 2, player.id);
        });
        Object.entries(player.haters).map(function (_a) {
            var _id = _a[0], mob = _a[1];
            player.removeHater(mob);
            mob.clearTarget();
            mob.forgetPlayer(player.id, 1000);
            mob.removeAttacker(player);
            mob.returnToSpawningPosition(0);
            if (mob.hateList.length === 0 && mob.kind === Types.Entities.ZOMBIE) {
                _this.despawn(mob);
            }
        });
        _.each(previousAttackers, function (mob) {
            player.removeAttacker(mob);
            mob.clearTarget();
            mob.forgetPlayer(player.id, 1000);
            if (mob.hateList.length === 0 && mob.kind === Types.Entities.ZOMBIE) {
                _this.despawn(mob);
            }
        });
        this.handleEntityGroupMembership(player);
    };
    World.prototype.setPlayerCount = function (count) {
        this.playerCount = count;
    };
    World.prototype.incrementPlayerCount = function () {
        this.setPlayerCount(this.playerCount + 1);
    };
    World.prototype.decrementPlayerCount = function () {
        if (this.playerCount > 0) {
            this.setPlayerCount(this.playerCount - 1);
        }
    };
    World.prototype.lootChests = function (mob, attacker) {
        var _a;
        var _this = this;
        if (mob.kind === Types.Entities.MINOTAUR ||
            mob.kind === Types.Entities.BUTCHER ||
            mob.kind === Types.Entities.DEATHANGEL) {
            var MIN_DAMAGE_1 = (_a = {},
                _a[Types.Entities.MINOTAUR] = 2000,
                _a[Types.Entities.BUTCHER] = 2500,
                _a[Types.Entities.DEATHANGEL] = 3000,
                _a);
            var members = [attacker.id];
            var party_1 = null;
            if (attacker.partyId) {
                party_1 = this.getParty(attacker.partyId);
                members = party_1.members.map(function (_a) {
                    var id = _a.id;
                    return id;
                });
            }
            if (members.length > MAX_PARTY_MEMBERS) {
                Sentry.captureException(new Error("Loot party for Minotaur"), {
                    user: {
                        username: attacker.name,
                    },
                    extra: { members: members },
                });
            }
            members = _.uniq(members);
            var playersToReceiveChests_1 = {};
            members.forEach(function (id) {
                var player = _this.getEntityById(id);
                if (!player) {
                    Sentry.captureException(new Error("Missing party member"), {
                        user: {
                            username: attacker.name,
                        },
                        extra: { id: id },
                    });
                    return;
                }
                var chestType = null;
                if (mob.kind === Types.Entities.MINOTAUR) {
                    if (player.level < 50) {
                    }
                    if ((player === null || player === void 0 ? void 0 : player.minotaurDamage) >= MIN_DAMAGE_1[mob.kind]) {
                        chestType = player.level >= 56 ? "chestgreen" : "chestblue";
                    }
                }
                else if (mob.kind === Types.Entities.BUTCHER) {
                    if ((player === null || player === void 0 ? void 0 : player.butcherDamage) >= MIN_DAMAGE_1[mob.kind]) {
                        chestType = "chestred";
                    }
                }
                else if (mob.kind === Types.Entities.DEATHANGEL) {
                    if ((player === null || player === void 0 ? void 0 : player.deathAngelDamage) >= MIN_DAMAGE_1[mob.kind]) {
                        chestType = "chestpurple";
                    }
                }
                if (chestType) {
                    _this.databaseHandler.lootItems({
                        player: player,
                        items: [{ item: chestType, quantity: 1 }],
                    });
                    if (!playersToReceiveChests_1[chestType]) {
                        playersToReceiveChests_1[chestType] = [];
                    }
                    playersToReceiveChests_1[chestType].push(player.name);
                    if (party_1 && (player === null || player === void 0 ? void 0 : player.name)) {
                        _this.pushToParty(party_1, new Messages.Party(Types.Messages.PARTY_ACTIONS.LOOT, [
                            { playerName: player.name, kind: Types.Entities[chestType.toUpperCase()] },
                        ]));
                    }
                }
            });
            if (Object.keys(playersToReceiveChests_1).length) {
                Object.entries(playersToReceiveChests_1).map(function (_a) {
                    var chestType = _a[0], players = _a[1];
                    postMessageToDiscordEventChannel("".concat(players.join(", "), " received a ").concat(_.capitalize(chestType.replace("chest", "")), " Chest ").concat(EmojiMap[chestType]));
                });
            }
        }
    };
    World.prototype.getDroppedItemName = function (mob, attacker) {
        var mobLevel = Types.getMobLevel(mob.kind);
        var kind = Types.getKindAsString(mob.kind);
        var drops = mob.isInsideTemple ? Properties.templeMob.drops : Properties[kind].drops;
        var isBoss = Types.isBoss(mob.kind);
        var v = random(100) + 1;
        var p = 0;
        var itemKind = null;
        if (mob.kind === Types.Entities.COW) {
            var diamondRandom = random(800);
            if (diamondRandom === 69) {
                return "diamondsword";
            }
            else if (diamondRandom === 133) {
                return "diamondarmor";
            }
            else if (diamondRandom === 420) {
                return "beltdiamond";
            }
            else if (diamondRandom === 555) {
                return "shielddiamond";
            }
            else if (diamondRandom === 42) {
                return "helmdiamond";
            }
        }
        else if (mob.kind >= Types.Entities.COW && !isBoss) {
            var christmasPresentRandom = random(1000);
            if (christmasPresentRandom === 133) {
                return "christmaspresent";
            }
        }
        if (mob.isInsideTemple) {
            var templeMobRandom = random(800);
            if (templeMobRandom === 133) {
                return "ringmystical";
            }
        }
        if (mob.kind >= Types.Entities.EYE) {
            var vv = random(12000);
            if (vv === 420) {
                return "ringraistone";
            }
            else if (mob.kind >= Types.Entities.RAT2 && vv === 6969) {
                return "ringfountain";
            }
            else if (mob.kind === Types.Entities.COW && vv === 133) {
                return "amuletfrozen";
            }
        }
        if (mob.kind === Types.Entities.GOLEM) {
            if (!attacker.hasNft && random(150) === 100) {
                return "nft";
            }
        }
        else if (mob.kind === Types.Entities.SNAKE4) {
            if (!attacker.hasWing && random(150) === 100) {
                return "wing";
            }
        }
        if ([Types.Entities.SPIDER, Types.Entities.SPIDER2].includes(mob.kind)) {
            if (mob.id === this.powderSpiderId) {
                return "powderred";
            }
            else if (mob.id === this.chaliceSpiderId) {
                return "chalice";
            }
        }
        if (mob.kind >= Types.Entities.OCULOTHORAX) {
            var superUniqueRandom = random(15000);
            if ([Types.Entities.MAGE, Types.Entities.SHAMAN, Types.Entities.DEATHANGEL].includes(mob.kind)) {
                if (superUniqueRandom === 666) {
                    return "ringwizard";
                }
                else if (superUniqueRandom === 777) {
                    return "ringmystical";
                }
            }
            if (mob.kind >= Types.Entities.SPIDERQUEEN) {
                if (superUniqueRandom === 133) {
                    return "amuletmoon";
                }
                else if (superUniqueRandom === 420) {
                    return "amuletdragon";
                }
                else if (superUniqueRandom === 555) {
                    return "ringheaven";
                }
            }
            if (superUniqueRandom === 111) {
                return "ringbalrog";
            }
            else if (superUniqueRandom === 222) {
                return "ringconqueror";
            }
            else if (superUniqueRandom === 6969) {
                return "amuletstar";
            }
            else if (superUniqueRandom === 5555) {
                return "amuletskull";
            }
            else if (superUniqueRandom === 4242) {
                return "ringgreed";
            }
            else if (superUniqueRandom === 6666) {
                return "amuletgreed";
            }
            var stoneDragonRandom = random(25000);
            if (stoneDragonRandom === 133) {
                return "stonedragon";
            }
            var stoneHeroRandom = random(100000);
            if (stoneHeroRandom === 133) {
                return "stonehero";
            }
        }
        if (!isBoss) {
            var runeRandom = attacker.level < 20 ? random(125) : random(250);
            if (runeRandom === 10) {
                return "rune-".concat(getRandomRune(Types.getMobLevel(mob.kind)));
            }
            else if (runeRandom === 42) {
                return "stonesocket";
            }
            else if (runeRandom === 69) {
                return "jewelskull";
            }
            var socketStoneRandom = random(400);
            if (socketStoneRandom === 133) {
                return "socketstone";
            }
            var stoneTeleportRandom = random(500);
            if (stoneTeleportRandom === 133) {
                return "stoneteleport";
            }
            if (mob.kind >= Types.Entities.WRAITH) {
                var transmuteRandom = random(800);
                if (transmuteRandom === 133) {
                    return "scrolltransmute";
                }
            }
            if (mob.kind >= Types.Entities.OCULOTHORAX) {
                var transmuteRandom = random(7000);
                if (transmuteRandom === 133) {
                    return "scrolltransmuteblessed";
                }
                else if (transmuteRandom === 420) {
                    return "scrolltransmutepet";
                }
            }
            if (mob.kind >= Types.Entities.GHOST) {
                var superUnqueRandom = random(12000);
                if (superUnqueRandom === 133) {
                    return "helmclown";
                }
                else if (superUnqueRandom === 42) {
                    return "beltgoldwrap";
                }
                var stoneBlessedRandom = random(10000);
                if (stoneBlessedRandom === 133) {
                    return "stonesocketblessed";
                }
            }
        }
        if (!isBoss && mob.x <= 29 && mob.y >= 744 && mob.y <= 781) {
            var demonRandom = random(900);
            if (demonRandom === 666) {
                return "demonsickle";
            }
            else if (demonRandom === 333) {
                return "eclypsedagger";
            }
            else if (demonRandom === 69) {
                return "demonaxe";
            }
            else if (demonRandom === 133) {
                return "demonarmor";
            }
            else if (demonRandom === 420) {
                return "beltdemon";
            }
            else if (demonRandom === 555) {
                return "shielddemon";
            }
            else if (demonRandom === 699) {
                return "helmdemon";
            }
            else if (demonRandom === 554) {
                return "demonmaul";
            }
        }
        if (mob.kind === Types.Entities.SKELETON4 && !attacker.hasObelisk) {
            var pickaxeRandom = random(250);
            if (pickaxeRandom === 133) {
                return "pickaxe";
            }
        }
        if (!isBoss) {
            if (mob.kind >= Types.Entities.RAT && mob.kind <= Types.Entities.ZOMBIE) {
                var barRandom = random(5000);
                if (barRandom === 133) {
                    return "barbronze";
                }
            }
            if (mob.kind >= Types.Entities.RAT2) {
                var barRandom = random(17500);
                if (barRandom === 133) {
                    return "barsilver";
                }
            }
            if (mob.kind >= Types.Entities.RAT3) {
                var barRandom = random(200000);
                if (barRandom === 133) {
                    return "bargold";
                }
            }
        }
        if (!isBoss) {
            if (mob.kind <= Types.Entities.DEATHKNIGHT) {
                var iouRandom = random(1000);
                if (iouRandom === 133) {
                    return "iou";
                }
            }
            else if (mob.kind <= Types.Entities.ZOMBIE) {
                var iouRandom = random(3000);
                if (iouRandom === 133) {
                    return "iou";
                }
            }
            else if (mob.kind <= Types.Entities.SKELETONAXE2) {
                var iouRandom = random(13000);
                if (iouRandom === 133) {
                    return "iou";
                }
            }
        }
        if (!isBoss && mob.kind >= Types.Entities.RAT3) {
            var elementScrollRandom = random(10000);
            if (elementScrollRandom === 133) {
                return "scrollupgradeelementmagic";
            }
            else if (elementScrollRandom === 134) {
                return "scrollupgradeelementflame";
            }
            else if (elementScrollRandom === 135) {
                return "scrollupgradeelementlightning";
            }
            else if (elementScrollRandom === 136) {
                return "scrollupgradeelementcold";
            }
            else if (elementScrollRandom === 137) {
                return "scrollupgradeelementpoison";
            }
            else {
                var skillRandom = random(15000);
                if (skillRandom === 133) {
                    return "scrollupgradeskillrandom";
                }
            }
        }
        if (!isBoss && [23, 42, 69].includes(v)) {
            if (attacker.network === "ban") {
                return "bananopotion";
            }
            else {
                return "nanopotion";
            }
        }
        else if (mob.kind === Types.Entities.COWKING && this.cowKingHornDrop) {
            return "cowkinghorn";
        }
        else {
            for (var itemName in drops) {
                var percentage = drops[itemName];
                p += percentage;
                if (v <= p) {
                    itemKind = Types.getKindFromString(itemName);
                    if ([Types.Entities.SCROLLUPGRADEHIGH, Types.Entities.SCROLLUPGRADELEGENDARY].includes(itemKind)) {
                        var lvlDifference = attacker.level - mobLevel;
                        if (lvlDifference >= 8) {
                            var reduction = 1;
                            if (lvlDifference >= 11 && lvlDifference < 14) {
                                reduction = 2;
                            }
                            else if (lvlDifference >= 14) {
                                reduction = 3;
                            }
                            var randomscroll = random(4);
                            if (randomscroll < reduction) {
                                break;
                            }
                        }
                    }
                    if (itemKind === Types.Entities.SCROLLUPGRADEHIGH) {
                        if (mob.kind >= Types.Entities.YETI) {
                            var blessedScroll = random(25);
                            if (blessedScroll === 21) {
                                itemKind = Types.Entities.SCROLLUPGRADEBLESSED;
                            }
                        }
                    }
                    else if (itemKind === Types.Entities.SCROLLUPGRADELEGENDARY) {
                        if (mob.kind >= Types.Entities.GOLEM) {
                            var sacredScroll = random(30);
                            if (sacredScroll === 21) {
                                itemKind = Types.Entities.SCROLLUPGRADESACRED;
                            }
                        }
                    }
                    return Types.getKindAsString(itemKind);
                }
            }
        }
    };
    World.prototype.getDroppedItem = function (mob, attacker) {
        var itemName = this.getDroppedItemName(mob, attacker);
        if (attacker.bonus.magicFind && !itemName) {
            var rerollRandom = random(100);
            if (rerollRandom < Types.calculateMagicFindCap(attacker.bonus.magicFind)) {
                itemName = this.getDroppedItemName(mob, attacker);
            }
        }
        if (mob.kind === Types.Entities.MINOTAUR) {
            postMessageToDiscordEventChannel("".concat(attacker.name, " slayed the Minotaur ").concat(EmojiMap.minotaur));
        }
        else if (mob.kind === Types.Entities.COWKING) {
            postMessageToDiscordEventChannel("".concat(attacker.name, " slayed the Cow King ").concat(EmojiMap.cowking));
        }
        else if (mob.kind === Types.Entities.SPIDERQUEEN) {
            postMessageToDiscordEventChannel("".concat(attacker.name, " slayed Arachneia the Spider Queen ").concat(EmojiMap.arachneia));
        }
        else if (mob.kind === Types.Entities.BUTCHER) {
            postMessageToDiscordEventChannel("".concat(attacker.name, " slayed Gorefiend the Butcher ").concat(EmojiMap.butcher));
        }
        else if (mob.kind === Types.Entities.SHAMAN) {
        }
        else if (mob.kind === Types.Entities.WORM) {
        }
        else if (mob.kind === Types.Entities.DEATHANGEL) {
            postMessageToDiscordEventChannel("".concat(attacker.name, " slayed Azrael ").concat(EmojiMap.azrael));
        }
        if ([Types.Entities.MINOTAUR, Types.Entities.BUTCHER, Types.Entities.DEATHANGEL].includes(mob.kind)) {
            this.lootChests(mob, attacker);
        }
        var itemLevel = null;
        itemName = generateDroppedItem() || itemName;
        if (itemName === "jewelskull") {
            itemLevel = getRandomJewelLevel(Types.getMobLevel(mob.kind));
        }
        else if (itemName === "rune") {
            itemName = "rune-".concat(getRandomRune(Types.getMobLevel(mob.kind)));
        }
        var kind = Types.getKindFromString(itemName);
        var partyId = Types.isHealingItem(kind) ? undefined : attacker.partyId;
        var amount = undefined;
        if (Types.Entities.GOLD === kind) {
            amount = generateRandomGoldAmount(mob.name, Types.isMiniBoss(mob));
        }
        else if (Types.Entities.IOU === kind) {
            amount = generateRandomGoldAmount(mob.name, Types.isMiniBoss(mob)) * 100;
        }
        else if (Types.Entities.NANOCOIN === kind) {
        }
        else if (Types.Entities.BANANOCOIN === kind) {
        }
        kind = Types.getKindFromString(itemName);
        var skin = null;
        if (kind === Types.Entities.PETCOLLAR) {
            skin = getRandomPetCollarSkin();
        }
        if (kind === Types.Entities.GOLD) {
            skin = getGoldSkin(amount);
        }
        return itemName
            ? this.addItem(this.createItem(__assign(__assign({ kind: kind, x: mob.x, y: mob.y, partyId: partyId, level: itemLevel, mobKind: mob.kind }, (skin ? { skin: skin } : null)), (amount ? { amount: amount } : null))))
            : null;
    };
    World.prototype.onMobMoveCallback = function (mob) {
        if (this.getPlayersAroundEntity(mob)) {
            this.pushToAdjacentGroups(mob.group, new Messages.Move(mob));
            this.handleEntityGroupMembership(mob);
        }
    };
    World.prototype.findPositionNextTo = function (entity, target) {
        var valid = false, pos;
        while (!valid) {
            pos = entity.getPositionNextTo(target);
            valid = this.isValidPosition(pos.x, pos.y);
        }
        return pos;
    };
    World.prototype.initZoneGroups = function () {
        var self = this;
        this.map.forEachGroup(function (id) {
            self.groups[id] = { entities: {}, players: [], incoming: [] };
        });
        this.zoneGroupsReady = true;
    };
    World.prototype.removeFromGroups = function (entity) {
        var self = this, oldGroups = [];
        if (entity && entity.group) {
            var group = this.groups[entity.group];
            if (entity instanceof Player) {
                group.players = _.reject(group.players, function (id) {
                    return id === entity.id;
                });
            }
            this.map.forEachAdjacentGroup(entity.group, function (id) {
                if (entity.id in self.groups[id].entities) {
                    delete self.groups[id].entities[entity.id];
                    oldGroups.push(id);
                }
            });
            entity.group = null;
        }
        return oldGroups;
    };
    World.prototype.addAsIncomingToGroup = function (entity, groupId) {
        var self = this, isChest = entity && entity instanceof Chest, isItem = entity && entity instanceof Item, isDroppedItem = entity && isItem && !entity.isStatic && !entity.isFromChest;
        if (entity && groupId) {
            this.map.forEachAdjacentGroup(groupId, function (id) {
                var group = self.groups[id];
                if (group) {
                    if (!_.includes(group.entities, entity.id) &&
                        (!isItem || isChest || (isItem && !isDroppedItem))) {
                        group.incoming.push(entity);
                    }
                }
            });
        }
    };
    World.prototype.addToGroup = function (entity, groupId) {
        var self = this, newGroups = [];
        if (entity && groupId && groupId in this.groups) {
            this.map.forEachAdjacentGroup(groupId, function (id) {
                self.groups[id].entities[entity.id] = entity;
                newGroups.push(id);
            });
            entity.group = groupId;
            if (entity instanceof Player) {
                this.groups[groupId].players.push(entity.id);
            }
        }
        return newGroups;
    };
    World.prototype.logGroupPlayers = function (groupId) {
        console.debug("Players inside group " + groupId + ":");
        _.each(this.groups[groupId].players, function (id) {
            console.debug("- player " + id);
        });
    };
    World.prototype.handleEntityGroupMembership = function (entity) {
        var hasChangedGroups = false;
        if (entity) {
            var groupId = this.map.getGroupIdFromPosition(entity.x, entity.y);
            if (!entity.group || (entity.group && entity.group !== groupId)) {
                hasChangedGroups = true;
                this.addAsIncomingToGroup(entity, groupId);
                var oldGroups = this.removeFromGroups(entity);
                var newGroups = this.addToGroup(entity, groupId);
                if (entity instanceof Player && entity.petEntity) {
                    this.addAsIncomingToGroup(entity.petEntity, groupId);
                    this.removeFromGroups(entity.petEntity);
                    this.addToGroup(entity.petEntity, groupId);
                }
                if (_.size(oldGroups) > 0) {
                    entity.recentlyLeftGroups = _.difference(oldGroups, newGroups);
                }
            }
        }
        return hasChangedGroups;
    };
    World.prototype.processGroups = function () {
        var _this = this;
        if (this.zoneGroupsReady) {
            this.map.forEachGroup(function (id) {
                if (_this.groups[id].incoming.length > 0) {
                    _.each(_this.groups[id].incoming, function (entity) {
                        if (entity.isDead)
                            return;
                        if (entity instanceof Player) {
                            _this.pushToGroup(id, new Messages.Spawn(entity), entity.id);
                            if (entity.petEntity) {
                                _this.pushToGroup(id, new Messages.Spawn(entity.petEntity));
                            }
                        }
                        else {
                            _this.pushToGroup(id, new Messages.Spawn(entity));
                        }
                    });
                    _this.groups[id].incoming = [];
                }
            });
        }
    };
    World.prototype.moveEntity = function (entity, x, y) {
        if (entity) {
            entity.setPosition(x, y);
            this.handleEntityGroupMembership(entity);
        }
    };
    World.prototype.handleItemDespawn = function (item) {
        var self = this;
        if (item) {
            item.handleDespawn({
                beforeBlinkDelay: 10000,
                blinkCallback: function () {
                    self.pushToAdjacentGroups(item.group, new Messages.Blink(item));
                },
                blinkingDuration: 4000,
                despawnCallback: function () {
                    self.pushToAdjacentGroups(item.group, new Messages.Destroy(item));
                    self.removeEntity(item);
                },
            });
        }
    };
    World.prototype.handleEmptyMobArea = function (_area) { };
    World.prototype.handleEmptyChestArea = function (area) {
        if (area) {
            var chest = this.addItem(this.createChest(area.chestX, area.chestY, area.items));
            this.handleItemDespawn(chest);
        }
    };
    World.prototype.handleOpenedChest = function (chest, _player) {
        this.pushToAdjacentGroups(chest.group, chest.despawn());
        this.removeEntity(chest);
        var kind = chest.getRandomItem();
        if (kind) {
            var item = this.addItemFromChest(kind, chest.x, chest.y);
            this.handleItemDespawn(item);
        }
    };
    World.prototype.getPlayerByName = function (name) {
        var count = 0;
        var lastId = 0;
        var player = null;
        for (var id in this.players) {
            if (this.players[id].name === name) {
                count += 1;
                lastId = Number(id);
                player = this.players[id];
            }
        }
        if (count !== 1) {
            this.disconnectPlayer({ name: name, force: true, lastId: lastId });
        }
        else {
            return player;
        }
        return null;
    };
    World.prototype.tryAddingMobToChestArea = function (mob) {
        _.each(this.chestAreas, function (area) {
            if (area.contains(mob)) {
                area.addToArea(mob);
            }
        });
    };
    World.prototype.isPlayerNearEntity = function (player, entity, range) {
        if (range === void 0) { range = 20; }
        if (player) {
            return Math.abs(player.x - entity.x) <= range && Math.abs(player.y - entity.y) <= range;
        }
        else {
            return false;
        }
    };
    World.prototype.getFirstPlayerNearEntity = function (entity, range) {
        if (range === void 0) { range = 20; }
        for (var id in this.players) {
            if (this.isPlayerNearEntity(this.players[id], entity, range)) {
                return this.players[id];
            }
        }
        return null;
    };
    World.prototype.getPlayersAroundEntity = function (entity, range) {
        if (range === void 0) { range = 20; }
        var counter = 0;
        for (var id in this.players) {
            if (this.isPlayerNearEntity(this.players[id], entity, range)) {
                counter += 1;
                if (counter === 6) {
                    break;
                }
            }
        }
        return counter;
    };
    World.prototype.updatePopulation = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.levelupPlayer, levelupPlayer = _c === void 0 ? undefined : _c;
        this.pushBroadcast(new Messages.Population(this.getPlayerPopulation(), levelupPlayer));
    };
    World.prototype.shuffle = function (array) {
        var _a;
        var currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            _a = [array[randomIndex], array[currentIndex]], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
        }
        return array;
    };
    World.prototype.handleBossDmg = function (_a) {
        var dmg = _a.dmg, entity = _a.entity, player = _a.player;
        var adjustedDifficulty = this.getPlayersAroundEntity(entity);
        var percentReduce = Math.pow(0.8, adjustedDifficulty - 1);
        dmg = Math.floor(dmg * percentReduce);
        if (entity.kind === Types.Entities.MINOTAUR) {
            player.minotaurDamage += dmg;
            player.unregisterMinotaurDamage();
        }
        else if (entity.kind === Types.Entities.BUTCHER) {
            player.butcherDamage += dmg;
            player.unregisterButcherDamage();
        }
        else if (entity.kind === Types.Entities.DEATHANGEL) {
            player.deathAngelDamage += dmg;
            player.unregisterDeathAngelDamage();
        }
        return dmg;
    };
    return World;
}());
export default World;
