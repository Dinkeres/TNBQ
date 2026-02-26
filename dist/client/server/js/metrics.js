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
import { redisClient } from "./db_providers/client";
var Metrics = (function () {
    function Metrics(config) {
        this.config = config;
        this.client = redisClient;
        this.isReady = this.client.isOpen;
        if (this.isReady) {
            console.info("Metrics enabled: Redis client connected to " + config.redis_host + ":" + config.redis_port);
        }
    }
    Metrics.prototype.ready = function (callback) {
        this.readyCallback = callback;
    };
    Metrics.prototype.updatePlayerCounters = function (worlds, updatedCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var config, numServers, playerCount, totalPlayers;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = this.config;
                        numServers = _.size(config.game_servers);
                        playerCount = _.reduce(worlds, function (sum, world) {
                            return sum + world.playerCount;
                        }, 0);
                        if (!this.isReady) return [3, 2];
                        return [4, this.client.set("player_count_" + config.server_name, String(playerCount))];
                    case 1:
                        _a.sent();
                        totalPlayers = 0;
                        _.each(config.game_servers, function (server) { return __awaiter(_this, void 0, void 0, function () {
                            var result, count;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.client.get("player_count_" + server.name)];
                                    case 1:
                                        result = _a.sent();
                                        count = result ? parseInt(result, 10) : 0;
                                        totalPlayers += count;
                                        numServers -= 1;
                                        if (!(numServers === 0)) return [3, 3];
                                        return [4, this.client.set("total_players", totalPlayers)];
                                    case 2:
                                        _a.sent();
                                        updatedCallback === null || updatedCallback === void 0 ? void 0 : updatedCallback(String(totalPlayers));
                                        _a.label = 3;
                                    case 3: return [2];
                                }
                            });
                        }); });
                        return [3, 3];
                    case 2:
                        console.error("Redis client not connected");
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    Metrics.prototype.updateWorldDistribution = function (worlds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.set("world_distribution_" + this.config.server_name, String(worlds))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Metrics.prototype.updateWorldCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.set("world_count_" + this.config.server_name, this.config.nb_worlds)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Metrics.prototype.getOpenWorldCount = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get("world_count_" + this.config.server_name)];
                    case 1:
                        result = _a.sent();
                        callback(result);
                        return [2];
                }
            });
        });
    };
    Metrics.prototype.getTotalPlayers = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get("total_players")];
                    case 1:
                        result = _a.sent();
                        callback(result);
                        return [2];
                }
            });
        });
    };
    Metrics.prototype.getWorldPlayers = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get("world_players_" + this.config.server_name)];
                    case 1:
                        result = _a.sent();
                        callback(result);
                        return [2];
                }
            });
        });
    };
    return Metrics;
}());
export default Metrics;
