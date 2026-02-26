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
import { promises as fs } from "fs";
import * as _ from "lodash";
import Checkpoint from "./checkpoint";
import { randomInt } from "./utils";
var Map = (function () {
    function Map(filepath) {
        var self = this;
        this.isLoaded = false;
        function loadJsonFile(filepath) {
            return __awaiter(this, void 0, void 0, function () {
                var file, json, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4, fs.access(filepath)];
                        case 1:
                            _a.sent();
                            return [4, fs.readFile(filepath)];
                        case 2:
                            file = _a.sent();
                            json = JSON.parse(file.toString());
                            self.initMap(json);
                            return [3, 4];
                        case 3:
                            error_1 = _a.sent();
                            if (error_1.code === "ENOENT") {
                                console.error("".concat(filepath, " doesn't exist."));
                            }
                            else {
                                console.error("An error occurred: ".concat(error_1.message));
                            }
                            return [3, 4];
                        case 4: return [2];
                    }
                });
            });
        }
        loadJsonFile(filepath);
    }
    Map.prototype.initMap = function (thismap) {
        this.width = thismap.width;
        this.height = thismap.height;
        this.collisions = thismap.collisions;
        this.mobAreas = thismap.roamingAreas;
        this.chestAreas = thismap.chestAreas;
        this.staticChests = thismap.staticChests;
        this.staticEntities = thismap.staticEntities;
        this.isLoaded = true;
        this.zoneWidth = 28;
        this.zoneHeight = 12;
        this.groupWidth = Math.floor(this.width / this.zoneWidth);
        this.groupHeight = Math.floor(this.height / this.zoneHeight);
        this.initConnectedGroups(thismap.doors);
        this.initCheckpoints(thismap.checkpoints);
        if (this.readyFunc) {
            this.readyFunc();
        }
    };
    Map.prototype.ready = function (f) {
        this.readyFunc = f;
    };
    Map.prototype.tileIndexToGridPosition = function (tileNum) {
        var x = 0;
        var y = 0;
        var getX = function (num, w) {
            if (num === 0) {
                return 0;
            }
            return num % w === 0 ? w - 1 : (num % w) - 1;
        };
        tileNum -= 1;
        x = getX(tileNum + 1, this.width);
        y = Math.floor(tileNum / this.width);
        return { x: x, y: y };
    };
    Map.prototype.GridPositionToTileIndex = function (x, y) {
        return y * this.width + x + 1;
    };
    Map.prototype.generateCollisionGrid = function () {
        this.grid = [];
        if (this.isLoaded) {
            var tileIndex = 0;
            for (var j, i = 0; i < this.height; i++) {
                this.grid[i] = [];
                for (j = 0; j < this.width; j++) {
                    if (_.includes(this.collisions, tileIndex)) {
                        this.grid[i][j] = 1;
                    }
                    else {
                        this.grid[i][j] = 0;
                    }
                    tileIndex += 1;
                }
            }
            console.debug("Collision grid generated.");
        }
    };
    Map.prototype.isOutOfBounds = function (x, y) {
        return x <= 0 || x >= this.width || y <= 0 || y >= this.height;
    };
    Map.prototype.isColliding = function (x, y) {
        if (this.isOutOfBounds(x, y)) {
            return false;
        }
        return this.grid[y][x] === 1;
    };
    Map.prototype.GroupIdToGroupPosition = function (id) {
        var posArray = id.split("-");
        return pos(parseInt(posArray[0], 10), parseInt(posArray[1], 10));
    };
    Map.prototype.forEachGroup = function (callback) {
        var width = this.groupWidth;
        var height = this.groupHeight;
        for (var x = 0; x < width; x += 1) {
            for (var y = 0; y < height; y += 1) {
                callback(x + "-" + y);
            }
        }
    };
    Map.prototype.getGroupIdFromPosition = function (x, y) {
        var w = this.zoneWidth;
        var h = this.zoneHeight;
        var gx = Math.floor((x - 1) / w);
        var gy = Math.floor((y - 1) / h);
        return gx + "-" + gy;
    };
    Map.prototype.getAdjacentGroupPositions = function (id) {
        var self = this;
        var position = this.GroupIdToGroupPosition(id);
        var x = position.x;
        var y = position.y;
        var list = [
            pos(x - 1, y - 1),
            pos(x, y - 1),
            pos(x + 1, y - 1),
            pos(x - 1, y),
            pos(x, y),
            pos(x + 1, y),
            pos(x - 1, y + 1),
            pos(x, y + 1),
            pos(x + 1, y + 1),
        ];
        _.each(this.connectedGroups[id], function (position) {
            if (!_.some(list, function (groupPos) {
                return equalPositions(groupPos, position);
            })) {
                list.push(position);
            }
        });
        return _.reject(list, function (pos) {
            return pos.x < 0 || pos.y < 0 || pos.x >= self.groupWidth || pos.y >= self.groupHeight;
        });
    };
    Map.prototype.forEachAdjacentGroup = function (groupId, callback) {
        if (groupId) {
            _.each(this.getAdjacentGroupPositions(groupId), function (pos) {
                callback(pos.x + "-" + pos.y);
            });
        }
    };
    Map.prototype.initConnectedGroups = function (doors) {
        var self = this;
        this.connectedGroups = {};
        _.each(doors, function (door) {
            var groupId = self.getGroupIdFromPosition(door.x, door.y);
            var connectedGroupId = self.getGroupIdFromPosition(door.tx, door.ty);
            var connectedPosition = self.GroupIdToGroupPosition(connectedGroupId);
            if (groupId in self.connectedGroups) {
                self.connectedGroups[groupId].push(connectedPosition);
            }
            else {
                self.connectedGroups[groupId] = [connectedPosition];
            }
        });
    };
    Map.prototype.initCheckpoints = function (cpList) {
        var self = this;
        this.checkpoints = {};
        this.startingAreas = [];
        _.each(cpList, function (cp) {
            var checkpoint = new Checkpoint(cp.id, cp.x, cp.y, cp.w, cp.h);
            self.checkpoints[checkpoint.id] = checkpoint;
            if (cp.s === 1) {
                self.startingAreas.push(checkpoint);
            }
        });
    };
    Map.prototype.getCheckpoint = function (id) {
        return this.checkpoints[id];
    };
    Map.prototype.getRandomStartingPosition = function () {
        var nbAreas = _.size(this.startingAreas), i = randomInt(0, nbAreas - 1), area = this.startingAreas[i];
        return area.getRandomPosition();
    };
    return Map;
}());
var pos = function (x, y) {
    return { x: x, y: y };
};
var equalPositions = function (pos1, pos2) {
    return pos1.x === pos2.x && pos2.y === pos2.y;
};
export default Map;
