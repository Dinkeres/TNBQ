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
import * as _ from "lodash";
import { Types } from "../../shared/js/gametypes";
import Mob from "./mob";
import { random } from "./utils";
var Area = (function () {
    function Area(id, x, y, width, height, world) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.world = world;
        this.entities = [];
        this.hasCompletelyRespawned = true;
        this.nbEntities = 0;
    }
    Area.prototype._getRandomPositionInsideArea = function () {
        var pos = {};
        var valid = false;
        while (!valid) {
            pos.x = this.x + random(this.width + 1);
            pos.y = this.y + random(this.height + 1);
            valid = this.world.isValidPosition(pos.x, pos.y);
        }
        return pos;
    };
    Area.prototype.removeFromArea = function (entity) {
        var i = _.indexOf(_.map(this.entities, "id"), entity.id);
        this.entities.splice(i, 1);
        if (this.isEmpty() && this.hasCompletelyRespawned && this.emptyCallback) {
            this.hasCompletelyRespawned = false;
            this.emptyCallback();
        }
    };
    Area.prototype.addToArea = function (entity) {
        if (entity) {
            this.entities.push(entity);
            entity.area = this;
            if (entity instanceof Mob) {
                this.world.addMob(entity);
            }
        }
        if (this.isFull()) {
            this.hasCompletelyRespawned = true;
        }
    };
    Area.prototype.isEmpty = function () {
        return !_.some(this.entities, function (entity) {
            return !entity.isDead;
        });
    };
    Area.prototype.isFull = function () {
        return !this.isEmpty() && this.nbEntities === _.size(this.entities);
    };
    Area.prototype.onEmpty = function (callback) {
        this.emptyCallback = callback;
    };
    return Area;
}());
var MobArea = (function (_super) {
    __extends(MobArea, _super);
    function MobArea(id, nbEntities, type, x, y, width, height, world) {
        var _this = _super.call(this, id, x, y, width, height, world) || this;
        _this.type = type;
        _this.respawns = [];
        _this.nbEntities = nbEntities;
        _this.initRoaming();
        return _this;
    }
    MobArea.prototype.spawnMobs = function () {
        for (var i = 0; i <= this.nbEntities; i += 1) {
            this.addToArea(this._createMobInsideArea());
        }
    };
    MobArea.prototype._createMobInsideArea = function () {
        this.kind = Types.getKindFromString(this.type);
        var pos = this._getRandomPositionInsideArea();
        var mob = new Mob("1" + this.id + "" + this.kind + "" + this.entities.length, this.kind, pos.x, pos.y);
        mob.onMove(this.world.onMobMoveCallback.bind(this.world));
        return mob;
    };
    MobArea.prototype.respawnMob = function (mob, delay) {
        var self = this;
        this.removeFromArea(mob);
        setTimeout(function () {
            var pos = self._getRandomPositionInsideArea();
            mob.x = pos.x;
            mob.y = pos.y;
            mob.isDead = false;
            self.addToArea(mob);
            self.world.addMob(mob);
            mob.handleRespawn();
        }, delay);
    };
    MobArea.prototype.initRoaming = function () {
        var self = this;
        setInterval(function () {
            _.each(self.entities, function (mob) {
                var canRoam = random(20) === 1;
                var pos;
                if (canRoam) {
                    if (!mob.hasTarget() && !mob.isDead) {
                        pos = self._getRandomPositionInsideArea();
                        mob.move(pos.x, pos.y);
                    }
                }
            });
        }, 500);
    };
    MobArea.prototype.createReward = function () {
        var pos = this._getRandomPositionInsideArea();
        return { x: pos.x, y: pos.y, kind: Types.Entities.CHEST };
    };
    return MobArea;
}(Area));
var ChestArea = (function (_super) {
    __extends(ChestArea, _super);
    function ChestArea(id, x, y, width, height, cx, cy, items, world) {
        var _this = _super.call(this, id, x, y, width, height, world) || this;
        _this.items = items;
        _this.chestX = cx;
        _this.chestY = cy;
        _this.nbEntities = 0;
        return _this;
    }
    ChestArea.prototype.contains = function (entity) {
        var isEntityContained = false;
        if (entity) {
            isEntityContained =
                entity.x >= this.x && entity.y >= this.y && entity.x < this.x + this.width && entity.y < this.y + this.height;
        }
        else {
            isEntityContained = false;
        }
        if (isEntityContained) {
            this.nbEntities += 1;
        }
        return isEntityContained;
    };
    return ChestArea;
}(Area));
export { Area, MobArea, ChestArea };
