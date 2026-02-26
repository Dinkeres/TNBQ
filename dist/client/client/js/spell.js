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
import Character from "./character";
var Spell = (function (_super) {
    __extends(Spell, _super);
    function Spell(id, kind) {
        var _this = _super.call(this, id, kind) || this;
        _this.type = "spell";
        _this.lastUpdate = Date.now();
        _this.isFading = false;
        _this.hasHurtPlayer = false;
        _this.angled = [Types.Entities.ARROW].includes(kind);
        return _this;
    }
    Spell.prototype.getSpriteName = function (element) {
        return "".concat(Types.getKindAsString(this.kind)).concat(element ? "-".concat(element) : "");
    };
    Spell.prototype.hasShadow = function () {
        return false;
    };
    Spell.prototype.setTarget = function (target) {
        if (!target)
            return;
        this.target = target;
        this.updateAngle();
    };
    Spell.prototype.getTimeDiff = function () {
        return (Date.now() - this.lastUpdate) / 1000;
    };
    Spell.prototype.updateAngle = function () {
        if (!this.target)
            return;
        this.angle = this.angled
            ? Math.atan2(this.target.y - this.y, this.target.x - this.x) * (180 / Math.PI) + 135
            : null;
    };
    Spell.prototype.getAngle = function () {
        return (this.angle * Math.PI) / 180;
    };
    Spell.prototype.die = function () {
        var _a;
        this.isDead = true;
        (_a = this.death_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    return Spell;
}(Character));
export default Spell;
