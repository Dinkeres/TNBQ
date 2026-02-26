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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as _ from "lodash";
import { Types } from "../../shared/js/gametypes";
import { getEntityLocation } from "../../shared/js/utils";
import { ChestArea, MobArea } from "./area";
import Character from "./character";
import Messages from "./message";
import Properties from "./properties";
import { distanceTo, random, randomInt } from "./utils";
var Mob = (function (_super) {
    __extends(Mob, _super);
    function Mob(id, kind, x, y) {
        var _this = _super.call(this, id, "mob", kind, x, y) || this;
        _this.updateHitPoints();
        _this.spawningX = x;
        _this.spawningY = y;
        _this.armorLevel = Properties.getArmorLevel(_this.kind);
        _this.weaponLevel = Properties.getWeaponLevel(_this.kind);
        _this.hateList = [];
        _this.respawnTimeout = null;
        _this.returnTimeout = null;
        _this.isDead = false;
        _this.hateCount = 0;
        _this.tankerlist = [];
        _this.destroyTime = null;
        _this.name = Types.getKindAsString(kind);
        _this.resistances = Types.getResistance(_this);
        _this.enchants = null;
        _this.hasTaunted = false;
        _this.isInsideTemple = false;
        _this.handleRandomElement();
        _this.handleRandomResistances();
        _this.handleEnchant();
        return _this;
    }
    Mob.prototype.assignRandomResistances = function (count) {
        var _this = this;
        var randomResistances = _.shuffle(Object.keys(Types.mobResistance[this.name]));
        var immunedResistances = [];
        if (this.element) {
            immunedResistances.push("".concat(this.element, "Resistance"));
            randomResistances = __spreadArray(__spreadArray([], immunedResistances, true), randomResistances.filter(function (r) { return !immunedResistances.includes(r); }), true);
        }
        this.resistances = randomResistances.slice(0, count).reduce(function (acc, resistance, index) {
            if (immunedResistances.includes(resistance)) {
                acc[resistance] = 100;
            }
            else {
                acc[resistance] = Types.mobResistance[_this.name][resistance];
            }
            if (_this.kind === Types.Entities.DEATHANGEL && index !== 0) {
                acc[resistance] = randomInt(2, 8) * 10;
            }
            return acc;
        }, {});
        this.resistances = _.fromPairs(_.sortBy(_.toPairs(this.resistances), 1).reverse());
    };
    Mob.prototype.handleRandomElement = function () {
        if ([Types.Entities.MAGE, Types.Entities.SKELETONARCHER].includes(this.kind)) {
            this.element = Types.getRandomElement();
            if (this.kind === Types.Entities.SKELETONARCHER && this.element === "spectral") {
                this.element = undefined;
            }
        }
        else if (this.kind === Types.Entities.SHAMAN) {
            this.element = _.shuffle(["magic", "flame", "lightning", "cold", "poison"])[0];
        }
        else if (this.kind === Types.Entities.DEATHBRINGER) {
            this.element = "flame";
        }
    };
    Mob.prototype.handleEnchant = function () {
        var _this = this;
        this.enchants = __spreadArray([], (Types.mobEnchant[this.name] || []), true);
        var enchants = [
            "magic",
            "flame",
            "lightning",
            "cold",
            "poison",
            "spectral",
            "physical",
            "stoneskin",
            "fast",
        ];
        if ([
            Types.Entities.SPIDERQUEEN,
            Types.Entities.BUTCHER,
            Types.Entities.SHAMAN,
            Types.Entities.WORM,
            Types.Entities.DEATHBRINGER,
            Types.Entities.DEATHANGEL,
        ].includes(this.kind)) {
            var extraEnchants = _.shuffle(enchants.filter(function (enchant) { return !_this.enchants.includes(enchant); })).slice(0, 2);
            this.enchants = this.enchants.concat(extraEnchants);
        }
        if (this.kind > Types.Entities.ZOMBIE && !this.enchants.length) {
            if (Types.isBoss(this.kind)) {
                this.enchants = _.shuffle(enchants).slice(0, this.kind === Types.Entities.NECROMANCER ? 1 : 2);
            }
            else {
                this.enchants = this.element ? [this.element] : _.shuffle(enchants).slice(0, 1);
            }
        }
        if (!Types.isBoss(this.kind)) {
            var isMiniBoss = random(this.kind === Types.Entities.COW ? 40 : 20) === 1;
            if (!isMiniBoss)
                return;
            var enchantCount = 0;
            if (this.kind <= Types.Entities.DEATHKNIGHT) {
                enchantCount = 1;
            }
            else if (this.kind <= Types.Entities.COW) {
                enchantCount = 2;
            }
            else if (this.kind >= Types.Entities.RAT3) {
                enchantCount = 3;
            }
            enchantCount = enchantCount - this.enchants.length;
            this.enchants = this.enchants.concat(_.shuffle(enchants.filter(function (enchant) { return !_this.enchants.includes(enchant); })).slice(0, enchantCount));
        }
        if (Types.isBoss(this.kind) && !this.enchants.includes("stoneskin")) {
            var hasStoneSkin = random(2);
            if (hasStoneSkin) {
                if (this.enchants.length >= 3) {
                    this.enchants[this.enchants.length - 1] = "stoneskin";
                }
                else {
                    this.enchants.push("stoneskin");
                }
            }
        }
    };
    Mob.prototype.handleRandomResistances = function () {
        if ([
            Types.Entities.BOSS,
            Types.Entities.RAT3,
            Types.Entities.SNAKE3,
            Types.Entities.SNAKE4,
            Types.Entities.OCULOTHORAX,
            Types.Entities.KOBOLD,
            Types.Entities.SPIDER,
            Types.Entities.SPIDER2,
            Types.Entities.SKELETONBERSERKER,
            Types.Entities.SKELETONARCHER,
        ].includes(this.kind)) {
            this.assignRandomResistances(1);
        }
        else if ([
            Types.Entities.NECROMANCER,
            Types.Entities.GHOST,
            Types.Entities.SKELETONTEMPLAR,
            Types.Entities.SKELETONTEMPLAR2,
            Types.Entities.MAGE,
            Types.Entities.WRAITH2,
        ].includes(this.kind)) {
            this.assignRandomResistances(2);
        }
        else if ([
            Types.Entities.SPIDERQUEEN,
            Types.Entities.BUTCHER,
            Types.Entities.SHAMAN,
            Types.Entities.WORM,
            Types.Entities.DEATHBRINGER,
            Types.Entities.DEATHANGEL,
        ].includes(this.kind)) {
            this.assignRandomResistances(3);
        }
    };
    Mob.prototype.destroy = function (delay) {
        var _a;
        if (delay === void 0) { delay = 30000; }
        this.isDead = true;
        this.hasTaunted = false;
        this.destroyTime = Date.now();
        this.hateList = [];
        this.tankerlist = [];
        this.clearTarget();
        this.updateHitPoints();
        this.resetPosition();
        if (![
            Types.Entities.ZOMBIE,
            Types.Entities.MINOTAUR,
            Types.Entities.SPIDERQUEEN,
            Types.Entities.BUTCHER,
            Types.Entities.SHAMAN,
            Types.Entities.WORM,
            Types.Entities.DEATHBRINGER,
            Types.Entities.DEATHANGEL,
        ].includes(this.kind)) {
            this.handleRespawn(delay);
        }
        (_a = this.destroyCallback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    Mob.prototype.receiveDamage = function (points) {
        this.hitPoints -= points;
    };
    Mob.prototype.hates = function (playerId) {
        return _.some(this.hateList, function (obj) {
            return obj.id === playerId;
        });
    };
    Mob.prototype.increaseHateFor = function (playerId, points) {
        if (this.hates(playerId)) {
            _.find(this.hateList, function (obj) {
                return obj.id === playerId;
            }).hate += points;
        }
        else {
            this.hateList.push({ id: playerId, hate: points });
        }
        if (this.returnTimeout) {
            clearTimeout(this.returnTimeout);
            this.returnTimeout = null;
        }
    };
    Mob.prototype.addTanker = function (playerId) {
        var i = 0;
        for (i = 0; i < this.tankerlist.length; i++) {
            if (this.tankerlist[i].id === playerId) {
                this.tankerlist[i].points++;
                break;
            }
        }
        if (i >= this.tankerlist.length) {
            this.tankerlist.push({ id: playerId, points: 1 });
        }
    };
    Mob.prototype.getMainTankerId = function () {
        var i = 0;
        var mainTanker = null;
        for (i = 0; i < this.tankerlist.length; i++) {
            if (mainTanker === null) {
                mainTanker = this.tankerlist[i];
                continue;
            }
            if (mainTanker.points < this.tankerlist[i].points) {
                mainTanker = this.tankerlist[i];
            }
        }
        if (mainTanker) {
            return mainTanker.id;
        }
        else {
            return null;
        }
    };
    Mob.prototype.getHatedPlayerId = function (hateRank, ignorePlayerId) {
        var i;
        var playerId;
        if (ignorePlayerId) {
            this.hateList = this.hateList.filter(function (hatedPlayer) { return hatedPlayer.id !== ignorePlayerId; });
        }
        var sorted = _.sortBy(this.hateList, function (obj) {
            return obj.hate;
        });
        var size = _.size(this.hateList);
        if (hateRank && hateRank <= size) {
            i = size - hateRank;
        }
        else {
            if (size === 1) {
                i = size - 1;
            }
            else {
                this.hateCount++;
                if (this.hateCount > size * 1.3) {
                    this.hateCount = 0;
                    i = size - 1 - random(size - 1);
                    console.info("CHANGE TARGET: " + i);
                }
                else {
                    return 0;
                }
            }
        }
        if (sorted && sorted[i]) {
            playerId = sorted[i].id;
        }
        return playerId;
    };
    Mob.prototype.forgetPlayer = function (playerId, duration) {
        this.hateList = _.reject(this.hateList, function (obj) {
            return obj.id === playerId;
        });
        this.tankerlist = _.reject(this.tankerlist, function (obj) {
            return obj.id === playerId;
        });
        if (this.hateList.length === 0) {
            this.returnToSpawningPosition(duration);
        }
    };
    Mob.prototype.forgetEveryone = function () {
        this.hateList = [];
        this.tankerlist = [];
        this.returnToSpawningPosition(1);
    };
    Mob.prototype.drop = function (item) {
        if (item) {
            return new Messages.Drop(this, item);
        }
    };
    Mob.prototype.handleRespawn = function (delay) {
        var self = this;
        if (this.area && this.area instanceof MobArea) {
            this.area.respawnMob(this, delay);
        }
        else if (this.area && this.area instanceof ChestArea) {
            this.area.removeFromArea(this);
        }
        this.respawnTimeout = setTimeout(function () {
            var _a;
            (_a = self.respawnCallback) === null || _a === void 0 ? void 0 : _a.call(self);
        }, delay);
    };
    Mob.prototype.onRespawn = function (callback) {
        this.hitPoints = Properties.getHitPoints(this.kind);
        this.respawnCallback = callback;
    };
    Mob.prototype.resetPosition = function () {
        this.setPosition(this.spawningX, this.spawningY);
    };
    Mob.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Mob.prototype.returnToSpawningPosition = function (waitDuration) {
        var self = this;
        var delay = waitDuration || 4000;
        this.clearTarget();
        this.returnTimeout = setTimeout(function () {
            self.resetPosition();
            if (!waitDuration && Types.isBoss(this.kind)) {
                self.destroy(30);
                self.handleRespawn(30);
            }
            self.move(self.spawningX, self.spawningY);
        }, delay);
    };
    Mob.prototype.returnBossToSpawningPosition = function (x, y) {
        if (!Types.isBoss(this.kind)) {
            return;
        }
        var entityLocation = getEntityLocation({ x: x, y: y });
        if (this.kind === Types.Entities.BOSS && entityLocation !== "skeletonking") {
            this.returnToSpawningPosition(0);
        }
        else if (this.kind === Types.Entities.MINOTAUR && entityLocation !== "minotaurcage") {
            this.returnToSpawningPosition(0);
        }
        else if (this.kind === Types.Entities.DEATHANGEL && entityLocation !== "azrealchamber") {
            this.returnToSpawningPosition(0);
        }
        else if (this.kind === Types.Entities.NECROMANCER && entityLocation !== "necromancerlair") {
            this.returnToSpawningPosition(0);
        }
        else if (this.kind === Types.Entities.COWKING && entityLocation !== "cow") {
            this.returnToSpawningPosition(0);
        }
        else if (this.kind === Types.Entities.SPIDERQUEEN && entityLocation !== "spiders") {
            this.returnToSpawningPosition(0);
        }
        else if (this.kind === Types.Entities.BUTCHER && entityLocation !== "butchergateway") {
            this.returnToSpawningPosition(0);
        }
        else if (this.kind === Types.Entities.SHAMAN && entityLocation !== "chalice") {
            this.returnToSpawningPosition(0);
        }
    };
    Mob.prototype.onDestroy = function (callback) {
        this.destroyCallback = callback;
    };
    Mob.prototype.onMove = function (callback) {
        this.returnBossToSpawningPosition(this.x, this.y);
        this.moveCallback = callback;
    };
    Mob.prototype.move = function (x, y) {
        var _a;
        this.setPosition(x, y);
        (_a = this.moveCallback) === null || _a === void 0 ? void 0 : _a.call(this, this);
    };
    Mob.prototype.updateHitPoints = function () {
        this.resetHitPoints(Properties.getHitPoints(this.kind));
    };
    Mob.prototype.distanceToSpawningPoint = function (x, y) {
        return distanceTo(x, y, this.spawningX, this.spawningY);
    };
    return Mob;
}(Character));
export default Mob;
