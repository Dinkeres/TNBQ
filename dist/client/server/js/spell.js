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
import { Types } from "../../shared/js/gametypes";
import Entity from "./entity";
import Messages from "./message";
var Spell = (function (_super) {
    __extends(Spell, _super);
    function Spell(_a) {
        var id = _a.id, kind = _a.kind, x = _a.x, y = _a.y, orientation = _a.orientation, originX = _a.originX, originY = _a.originY, element = _a.element, casterId = _a.casterId, casterKind = _a.casterKind, targetId = _a.targetId, isRaise2 = _a.isRaise2;
        var _this = _super.call(this, id, "spell", kind, x, y) || this;
        _this.spawningX = x;
        _this.spawningY = y;
        _this.isDead = false;
        _this.destroyTime = null;
        _this.orientation = orientation;
        _this.originX = originX;
        _this.originY = originY;
        _this.element = element;
        _this.casterId = casterId;
        _this.casterKind = casterKind;
        _this.targetId = targetId;
        _this.isRaise2 = isRaise2;
        _this.dmg = _this.getDmg();
        return _this;
    }
    Spell.prototype.getDmg = function () {
        var dmg = 0;
        if (this.kind === Types.Entities.DEATHANGELSPELL) {
            dmg = 300;
        }
        else if (this.kind === Types.Entities.DEATHBRINGERSPELL) {
            dmg = 10;
        }
        else if (this.kind === Types.Entities.MAGESPELL) {
            if (this.casterKind === Types.Entities.SHAMAN) {
                dmg = 320;
            }
            else {
                dmg = 240;
            }
        }
        else if (this.kind === Types.Entities.ARROW) {
            dmg = 240;
        }
        else if (this.kind === Types.Entities.STATUESPELL || this.kind === Types.Entities.STATUE2SPELL) {
            dmg = 300;
        }
        return dmg;
    };
    Spell.prototype.getState = function () {
        return Object.assign({}, this._getBaseState(), {
            orientation: this.orientation,
            originX: this.originX,
            originY: this.originY,
            element: this.element,
            casterId: this.casterId,
            targetId: this.targetId,
            isRaise2: this.isRaise2,
        });
    };
    Spell.prototype.destroy = function () {
        this.isDead = true;
        this.destroyTime = Date.now();
        if (this.destroyCallback) {
            this.destroyCallback();
        }
    };
    Spell.prototype.drop = function (item) {
        if (item) {
            return new Messages.Drop(this, item);
        }
    };
    Spell.prototype.cast = function (delay, duration, endCallback) {
        if (delay === void 0) { delay = 0; }
        setTimeout(function () {
            setTimeout(function () {
                endCallback();
            }, duration);
        }, delay);
    };
    Spell.prototype.onDestroy = function (callback) {
        this.destroyCallback = callback;
    };
    Spell.prototype.onMove = function (callback) {
        this.moveCallback = callback;
    };
    Spell.prototype.move = function (x, y) {
        this.setPosition(x, y);
        if (this.moveCallback) {
            this.moveCallback(this);
        }
    };
    return Spell;
}(Entity));
export default Spell;
