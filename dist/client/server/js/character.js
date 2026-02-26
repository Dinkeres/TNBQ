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
import Entity from "./entity";
import Messages from "./message";
import { randomOrientation } from "./utils";
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(id, type, kind, x, y) {
        var _this = _super.call(this, id, type, kind, x, y) || this;
        _this.orientation = randomOrientation();
        _this.attackers = {};
        _this.targetId = null;
        _this.poisonedInterval = null;
        return _this;
    }
    Character.prototype.getState = function () {
        return Object.assign({}, this._getBaseState(), {
            orientation: this.orientation,
            targetId: this.targetId,
            resistances: this.resistances || null,
            element: this.element || null,
            enchants: this.enchants || null,
            bonus: this.bonus,
        });
    };
    Character.prototype.isNear = function (character, distance) {
        var dx, dy, near = false;
        dx = Math.abs(this.x - character.x);
        dy = Math.abs(this.y - character.y);
        if (dx <= distance && dy <= distance) {
            near = true;
        }
        return near;
    };
    Character.prototype.resetHitPoints = function (maxHitPoints) {
        this.maxHitPoints = maxHitPoints;
        this.hitPoints = this.maxHitPoints;
    };
    Character.prototype.updateMaxHitPoints = function (maxHitPoints) {
        this.maxHitPoints = maxHitPoints;
        if (this.hitPoints > maxHitPoints) {
            this.hitPoints = maxHitPoints;
        }
    };
    Character.prototype.regenerateHealthBy = function (value) {
        var hp = this.hitPoints;
        var max = this.maxHitPoints;
        if (hp < max) {
            if (hp + value <= max) {
                this.hitPoints += value;
            }
            else {
                this.hitPoints = max;
            }
        }
    };
    Character.prototype.hasFullHealth = function () {
        return this.hitPoints === this.maxHitPoints;
    };
    Character.prototype.setTarget = function (entity) {
        this.targetId = entity.id;
    };
    Character.prototype.clearTarget = function () {
        this.targetId = null;
    };
    Character.prototype.hasTarget = function () {
        return this.targetId !== null;
    };
    Character.prototype.attack = function () {
        return new Messages.Attack(this.id, this.targetId);
    };
    Character.prototype.raise = function (targetId) {
        return new Messages.Raise(this.id, this.targetId || targetId);
    };
    Character.prototype.health = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.isHurt, isHurt = _c === void 0 ? false : _c, _d = _b.dmg, dmg = _d === void 0 ? 0 : _d, _e = _b.isBlocked, isBlocked = _e === void 0 ? false : _e, _f = _b.attacker, attacker = _f === void 0 ? {} : _f;
        return new Messages.Health({ points: this.hitPoints, dmg: dmg, isRegen: false, isHurt: isHurt, isBlocked: isBlocked, attacker: attacker });
    };
    Character.prototype.healthEntity = function () {
        return new Messages.HealthEntity({ points: this.hitPoints, id: this.id });
    };
    Character.prototype.regen = function () {
        return new Messages.Health({ points: this.hitPoints, isRegen: true });
    };
    Character.prototype.addAttacker = function (entity) {
        if (entity) {
            this.attackers[entity.id] = entity;
        }
    };
    Character.prototype.removeAttacker = function (entity) {
        if (entity && entity.id in this.attackers) {
            delete this.attackers[entity.id];
            console.debug(this.id + " REMOVED ATTACKER " + entity.id);
        }
    };
    Character.prototype.forEachAttacker = function (callback) {
        for (var id in this.attackers) {
            callback(this.attackers[id]);
        }
    };
    return Character;
}(Entity));
export default Character;
