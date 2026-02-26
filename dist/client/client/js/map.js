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
import each from "lodash/each";
import indexOf from "lodash/indexOf";
import { Types } from "../../shared/js/gametypes";
import Area from "./area";
import Detect from "./detect";
import { isInt } from "./utils";
var Map = (function () {
    function Map(loadMultiTilesheets, game) {
        this.tilesetCount = 0;
        this.width = 0;
        this.height = 0;
        this.game = game;
        this.data = [];
        this.isLoaded = false;
        this.tilesetsLoaded = false;
        this.loadMultiTilesheets = loadMultiTilesheets;
        var useWorker = !(this.game.renderer.mobile || this.game.renderer.tablet) && !Detect.isSafari;
        this._loadMap(useWorker);
    }
    Map.prototype._checkReady = function () {
        var _a;
        this.isLoaded = true;
        (_a = this.ready_func) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    Map.prototype._loadMap = function (useWorker) {
        var _this = this;
        var filepath = "maps/world_client.json";
        if (useWorker) {
            console.info("Loading map with web worker.");
            var worker = new Worker("mapworker.js");
            worker.postMessage(1);
            worker.onmessage = function (event) {
                var map = event.data;
                _this._initMap(map);
                _this.grid = map.grid;
                _this.plateauGrid = map.plateauGrid;
                _this.tilesets = map.tilesets;
                _this._checkReady();
            };
        }
        else {
            console.info("Loading map via Ajax.");
            $.get(filepath, function (data) {
                _this._initMap(data);
                _this._generateCollisionGrid();
                _this._generatePlateauGrid();
                _this._checkReady();
                _this.tilesets = data.tilesets;
                _this._initTilesets();
            }, "json");
        }
    };
    Map.prototype._initTilesets = function () {
        this.tilesetCount = this.tilesets.length;
        this.tilesets = this.tilesets.map(function (_a) {
            var imageName = _a.imageName, rest = __rest(_a, ["imageName"]);
            return (__assign({}, rest));
        });
    };
    Map.prototype._initMap = function (map) {
        this.width = map.width;
        this.height = map.height;
        this.tilesize = map.tilesize;
        this.data = map.data;
        this.blocking = map.blocking || [];
        this.plateau = map.plateau || [];
        this.musicAreas = map.musicAreas || [];
        this.collisions = map.collisions;
        this.high = map.high;
        this.animated = map.animated;
        this.doors = this._getDoors(map);
        this.checkpoints = this._getCheckpoints(map);
    };
    Map.prototype._getDoors = function (map) {
        var doors = {}, self = this;
        each(map.doors, function (door) {
            var o;
            switch (door.to) {
                case "u":
                    o = Types.Orientations.UP;
                    break;
                case "d":
                    o = Types.Orientations.DOWN;
                    break;
                case "l":
                    o = Types.Orientations.LEFT;
                    break;
                case "r":
                    o = Types.Orientations.RIGHT;
                    break;
                default:
                    o = Types.Orientations.DOWN;
            }
            doors[self.GridPositionToTileIndex(door.x, door.y)] = {
                x: door.tx,
                y: door.ty,
                orientation: o,
                cameraX: door.tcx,
                cameraY: door.tcy,
                portal: door.p === 1,
            };
        });
        return doors;
    };
    Map.prototype._loadTileset = function (filepath) {
        var _this = this;
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = filepath;
        console.info("Loading tileset: " + filepath);
        img.onload = function () {
            if (img.width % _this.tilesize > 0) {
                throw Error("Tileset size should be a multiple of " + _this.tilesize);
            }
            console.info("Map tileset loaded.");
            _this.game.renderer.renderStaticCanvases();
        };
        return img;
    };
    Map.prototype.ready = function (f) {
        this.ready_func = f;
    };
    Map.prototype.tileIndexToGridPosition = function (tileNum) {
        var x = 0, y = 0;
        var getX = function (num, w) {
            if (num == 0) {
                return 0;
            }
            return num % w == 0 ? w - 1 : (num % w) - 1;
        };
        tileNum -= 1;
        x = getX(tileNum + 1, this.width);
        y = Math.floor(tileNum / this.width);
        return { x: x, y: y };
    };
    Map.prototype.GridPositionToTileIndex = function (x, y) {
        return y * this.width + x + 1;
    };
    Map.prototype.isColliding = function (x, y) {
        if (this.isOutOfBounds(x, y) || !this.grid) {
            return false;
        }
        return this.grid[y][x] === 1;
    };
    Map.prototype.isPlateau = function (x, y) {
        if (this.isOutOfBounds(x, y) || !this.plateauGrid) {
            return false;
        }
        return this.plateauGrid[y][x] === 1;
    };
    Map.prototype._generateCollisionGrid = function () {
        var self = this;
        this.grid = [];
        for (var j, i = 0; i < this.height; i++) {
            this.grid[i] = [];
            for (j = 0; j < this.width; j++) {
                this.grid[i][j] = 0;
            }
        }
        each(this.collisions, function (tileIndex) {
            var pos = self.tileIndexToGridPosition(tileIndex + 1);
            self.grid[pos.y][pos.x] = 1;
        });
        each(this.blocking, function (tileIndex) {
            var pos = self.tileIndexToGridPosition(tileIndex + 1);
            if (self.grid[pos.y] !== undefined) {
                self.grid[pos.y][pos.x] = 1;
            }
        });
        console.debug("Collision grid generated.");
    };
    Map.prototype._generatePlateauGrid = function () {
        var tileIndex = 0;
        this.plateauGrid = [];
        for (var j, i = 0; i < this.height; i++) {
            this.plateauGrid[i] = [];
            for (j = 0; j < this.width; j++) {
                if (this.plateau.includes(tileIndex)) {
                    this.plateauGrid[i][j] = 1;
                }
                else {
                    this.plateauGrid[i][j] = 0;
                }
                tileIndex += 1;
            }
        }
        console.info("Plateau grid generated.");
    };
    Map.prototype.isOutOfBounds = function (x, y) {
        return isInt(x) && isInt(y) && (x < 0 || x >= this.width || y < 0 || y >= this.height);
    };
    Map.prototype.isHighTile = function (id) {
        return indexOf(this.high, id + 1) >= 0;
    };
    Map.prototype.isAnimatedTile = function (id) {
        return id + 1 in this.animated;
    };
    Map.prototype.getTileAnimationLength = function (id) {
        return this.animated[id + 1].l;
    };
    Map.prototype.getTileAnimationSkip = function (id) {
        return this.animated[id + 1].s;
    };
    Map.prototype.getTileAnimationDelay = function (id) {
        var animProperties = this.animated[id + 1];
        if (animProperties.d) {
            return animProperties.d;
        }
        else {
            return 100;
        }
    };
    Map.prototype.isDoor = function (x, y) {
        return this.doors[this.GridPositionToTileIndex(x, y)] !== undefined;
    };
    Map.prototype.getDoorDestination = function (x, y) {
        return this.doors[this.GridPositionToTileIndex(x, y)];
    };
    Map.prototype._getCheckpoints = function (map) {
        var checkpoints = [];
        each(map.checkpoints, function (cp) {
            var area = new Area(cp.x, cp.y, cp.w, cp.h);
            area.id = cp.id;
            checkpoints.push(area);
        });
        return checkpoints;
    };
    Map.prototype.getCurrentCheckpoint = function (entity) {
        return this.checkpoints.find(function (checkpoint) {
            return checkpoint.contains(entity);
        });
    };
    return Map;
}());
export default Map;
