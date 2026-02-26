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
import * as _ from "lodash";
import { Types } from "../../shared/js/gametypes";
import { GOLD_CAP } from "../../shared/js/gold";
import { postMessageToDiscordModeratorTradeChannel } from "./discord";
import Messages from "./message";
var Trade = (function () {
    function Trade(id, player1, player2, server) {
        this.players = [];
        this.players = [
            { id: player1, isAccepted: false },
            { id: player2, isAccepted: false },
        ];
        this.id = id;
        this.server = server;
        this.start();
    }
    Trade.prototype.start = function () {
        var _this = this;
        this.forEachPlayer(function (_a) {
            var id = _a.id;
            var player = _this.server.getEntityById(id);
            if (player) {
                player.tradeId = _this.id;
                _this.server.pushToPlayer(player, new Messages.Trade(Types.Messages.TRADE_ACTIONS.START, _this.players));
            }
        });
    };
    Trade.prototype.close = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, playerName = _b.playerName, isCompleted = _b.isCompleted, isInventoryFull = _b.isInventoryFull;
        this.forEachPlayer(function (_a) {
            var id = _a.id;
            return __awaiter(_this, void 0, void 0, function () {
                var player, isAPlayerNotAccepted, rawGoldTrade, userKey, _b, inventory, gold;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            player = this.server.getEntityById(id);
                            if (!player) return [3, 6];
                            this.server.pushToPlayer(player, new Messages.Trade(Types.Messages.TRADE_ACTIONS.CLOSE, { playerName: playerName, isCompleted: isCompleted, isInventoryFull: isInventoryFull }));
                            player.setTradeId(undefined);
                            isAPlayerNotAccepted = this.players.some(function (_a) {
                                var isAccepted = _a.isAccepted;
                                return !isAccepted;
                            });
                            if (!(!isCompleted && isAPlayerNotAccepted)) return [3, 4];
                            this.server.databaseHandler.moveItemsToInventory(player, "trade");
                            return [4, this.server.databaseHandler.client.hGet("u:" + player.name, "goldTrade")];
                        case 1:
                            rawGoldTrade = _c.sent();
                            if (!(rawGoldTrade && rawGoldTrade !== "0" && /\d+/.test(rawGoldTrade))) return [3, 3];
                            return [4, this.server.databaseHandler.moveGold({
                                    player: player,
                                    from: "trade",
                                    to: "inventory",
                                    amount: parseInt(rawGoldTrade),
                                })];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3: return [3, 6];
                        case 4:
                            userKey = "u:" + player.name;
                            return [4, this.server.databaseHandler.client
                                    .multi()
                                    .hGet(userKey, "inventory")
                                    .hGet(userKey, "gold")
                                    .exec()];
                        case 5:
                            _b = _c.sent(), inventory = _b[0], gold = _b[1];
                            inventory = JSON.parse(inventory);
                            gold = Number(gold || "0");
                            player.send([Types.Messages.INVENTORY, inventory]);
                            player.send([Types.Messages.GOLD.INVENTORY, gold]);
                            _c.label = 6;
                        case 6: return [2];
                    }
                });
            });
        });
        delete this.server.trades[this.id];
    };
    Trade.prototype.update = function (_a) {
        var _this = this;
        var player1Id = _a.player1Id, data = _a.data;
        this.resetAccept();
        this.forEachPlayer(function (_a) {
            var id = _a.id;
            var player = _this.server.getEntityById(id);
            if (!player)
                return;
            var messageId = id === player1Id
                ? Types.Messages.TRADE_ACTIONS.PLAYER1_MOVE_ITEM
                : Types.Messages.TRADE_ACTIONS.PLAYER2_MOVE_ITEM;
            _this.server.pushToPlayer(player, new Messages.Trade(messageId, data));
        });
    };
    Trade.prototype.resetAccept = function () {
        var _this = this;
        if (!this.players.some(function (_a) {
            var isAccepted = _a.isAccepted;
            return isAccepted;
        }))
            return;
        this.players = this.players.map(function (player) {
            player.isAccepted = false;
            return player;
        });
        this.forEachPlayer(function (_a) {
            var id = _a.id;
            var player = _this.server.getEntityById(id);
            _this.server.pushToPlayer(player, new Messages.Trade(Types.Messages.TRADE_ACTIONS.PLAYER1_STATUS, false));
            _this.server.pushToPlayer(player, new Messages.Trade(Types.Messages.TRADE_ACTIONS.PLAYER2_STATUS, false));
        });
    };
    Trade.prototype.updateGold = function (_a) {
        var player1Id = _a.player1Id, from = _a.from, to = _a.to, amount = _a.amount;
        return __awaiter(this, void 0, void 0, function () {
            var tradePlayer1, tradePlayer2, player1, player2, newAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.resetAccept();
                        tradePlayer1 = this.players.find(function (_a) {
                            var id = _a.id;
                            return id === player1Id;
                        });
                        tradePlayer2 = this.players.find(function (_a) {
                            var id = _a.id;
                            return id !== player1Id;
                        });
                        if (!tradePlayer1 || !tradePlayer2)
                            return [2];
                        player1 = this.server.getEntityById(tradePlayer1.id);
                        player2 = this.server.getEntityById(tradePlayer2.id);
                        if (!player1 || !player2)
                            return [2];
                        return [4, this.server.databaseHandler.moveGold({ player: player1, from: from, to: to, amount: amount })];
                    case 1:
                        newAmount = _b.sent();
                        player2.send([Types.Messages.GOLD.TRADE2, newAmount]);
                        return [2];
                }
            });
        });
    };
    Trade.prototype.validatePlayerInventory = function (playerA, playerB) {
        return __awaiter(this, void 0, void 0, function () {
            var playerATrade, playerAGoldTrade, playerAFilteredTrade, playerBInventory, playerBGold, playerBAvailableInventorySlots, isValid, userAKey, userBKey, _a, inventory, gold;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        playerBInventory = [];
                        isValid = true;
                        userAKey = "u:" + playerA.name;
                        return [4, this.server.databaseHandler.client
                                .multi()
                                .hGet(userAKey, "trade")
                                .hGet(userAKey, "goldTrade")
                                .exec()];
                    case 1:
                        _b = _c.sent(), playerATrade = _b[0], playerAGoldTrade = _b[1];
                        playerATrade = JSON.parse(playerATrade);
                        playerAFilteredTrade = playerATrade.filter(Boolean);
                        playerAGoldTrade = parseInt(playerAGoldTrade || "0");
                        userBKey = "u:" + playerB.name;
                        return [4, this.server.databaseHandler.client
                                .multi()
                                .hGet(userBKey, "inventory")
                                .hGet(userBKey, "gold")
                                .exec()];
                    case 2:
                        _a = _c.sent(), inventory = _a[0], gold = _a[1];
                        playerBInventory = JSON.parse(inventory);
                        playerBAvailableInventorySlots = playerBInventory.filter(function (item) { return !item; }).length;
                        playerBGold = parseInt(gold || "0");
                        if (!playerAFilteredTrade.length) {
                            isValid = true;
                        }
                        else if (playerAFilteredTrade.length <= playerBAvailableInventorySlots) {
                            playerAFilteredTrade.forEach(function (item) {
                                var isQuantityItemFound = false;
                                if (Types.isQuantity(item)) {
                                    var _a = item.split(":"), tradeItem_1 = _a[0], tradeQuantity = _a[1];
                                    var index = playerBInventory.findIndex(function (entry) {
                                        var playerBInventoryItem = (typeof entry === "string" && entry.split(":"))[0];
                                        return playerBInventoryItem === tradeItem_1;
                                    });
                                    if (index > -1) {
                                        var _b = playerBInventory[index].split(":"), inventoryItem = _b[0], inventoryQuantity = _b[1];
                                        playerBInventory[index] = "".concat(inventoryItem, ":").concat(parseInt(inventoryQuantity) + parseInt(tradeQuantity));
                                        isQuantityItemFound = true;
                                    }
                                }
                                if (!isQuantityItemFound) {
                                    var index = playerBInventory.findIndex(function (entry) { return !entry; });
                                    if (index > -1) {
                                        playerBInventory[index] = item;
                                    }
                                    else {
                                        isValid = false;
                                    }
                                }
                            });
                        }
                        else {
                            isValid = false;
                        }
                        return [2, {
                                inventory: playerBInventory,
                                isValid: isValid,
                                gold: playerAGoldTrade + playerBGold,
                                filteredTrade: playerAFilteredTrade,
                            }];
                }
            });
        });
    };
    Trade.prototype.checkBothPlayersAccepted = function () {
        return __awaiter(this, void 0, void 0, function () {
            var player1, player2, _a, player2Data, player1Data, isGoldExeeds100k, content, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.players.some(function (_a) {
                            var isAccepted = _a.isAccepted;
                            return !isAccepted;
                        })) {
                            return [2];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        player1 = this.server.getEntityById(this.players[0].id);
                        player2 = this.server.getEntityById(this.players[1].id);
                        if (!player1 || !player2) {
                            throw new Error("Invalid trade player");
                        }
                        return [4, Promise.all([
                                this.validatePlayerInventory(player1, player2),
                                this.validatePlayerInventory(player2, player1),
                            ])];
                    case 2:
                        _a = _b.sent(), player2Data = _a[0], player1Data = _a[1];
                        isGoldExeeds100k = false;
                        if (player1Data.gold >= 100000 || player2Data.gold >= 100000) {
                            isGoldExeeds100k = true;
                        }
                        content = "".concat(isGoldExeeds100k ? ":warning:" : "", " P1 **").concat(player1.name, "** completed trade with P2 **").concat(player2.name, "** items P1 items: \"").concat(JSON.stringify(player1Data.filteredTrade), "}, P1 gold: ").concat(player1Data.gold, ", P2 gold: ").concat(player2Data.gold, " items: ").concat(player2Data.filteredTrade);
                        if (isGoldExeeds100k) {
                            postMessageToDiscordModeratorTradeChannel(content);
                        }
                        if (!player1Data.isValid || !player2Data.isValid) {
                            this.close({ playerName: !player1Data.isValid ? player1.name : player2.name, isInventoryFull: true });
                            return [2];
                        }
                        return [4, Promise.all([
                                this.writeData(player1, player1Data.inventory, player1Data.gold),
                                this.writeData(player2, player2Data.inventory, player2Data.gold),
                            ])];
                    case 3:
                        _b.sent();
                        this.close({ isCompleted: true });
                        return [3, 5];
                    case 4:
                        err_1 = _b.sent();
                        this.close();
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    Trade.prototype.writeData = function (player, inventory, gold) {
        return __awaiter(this, void 0, void 0, function () {
            var userKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userKey = "u:" + player.name;
                        return [4, this.server.databaseHandler.client.hSet(userKey, "trade", JSON.stringify(new Array(9).fill(0)))];
                    case 1:
                        _a.sent();
                        return [4, this.server.databaseHandler.client.hSet(userKey, "inventory", JSON.stringify(inventory))];
                    case 2:
                        _a.sent();
                        if (Number(gold) > GOLD_CAP) {
                            gold = GOLD_CAP;
                        }
                        return [4, this.server.databaseHandler.client.hSet(userKey, "gold", gold)];
                    case 3:
                        _a.sent();
                        return [4, this.server.databaseHandler.client.hSet(userKey, "goldTrade", 0)];
                    case 4:
                        _a.sent();
                        player.gold = gold;
                        player.goldTrade = 0;
                        player.send([Types.Messages.INVENTORY, inventory]);
                        return [2];
                }
            });
        });
    };
    Trade.prototype.status = function (_a) {
        var _this = this;
        var player1Id = _a.player1Id, isAccepted = _a.isAccepted;
        this.players = this.players.map(function (player) {
            if (player.id === player1Id) {
                player.isAccepted = isAccepted;
            }
            return player;
        });
        this.forEachPlayer(function (_a) {
            var id = _a.id;
            var player = _this.server.getEntityById(id);
            if (player) {
                var messageId = id === player1Id ? Types.Messages.TRADE_ACTIONS.PLAYER1_STATUS : Types.Messages.TRADE_ACTIONS.PLAYER2_STATUS;
                _this.server.pushToPlayer(player, new Messages.Trade(messageId, isAccepted));
            }
        });
        if (isAccepted) {
            this.checkBothPlayersAccepted();
        }
    };
    Trade.prototype.forEachPlayer = function (iterator) {
        if (!this.players.length)
            return;
        _.each(this.players, iterator);
    };
    return Trade;
}());
export default Trade;
