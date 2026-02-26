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
import Character from "./character";
import { randomOrientation } from "./utils";
var Pet = (function (_super) {
    __extends(Pet, _super);
    function Pet(_a) {
        var id = _a.id, _b = _a.type, type = _b === void 0 ? "pet" : _b, kind = _a.kind, skin = _a.skin, x = _a.x, y = _a.y, ownerId = _a.ownerId, level = _a.level, bonus = _a.bonus;
        var _this = _super.call(this, id, type, kind, x, y) || this;
        _this.orientation = randomOrientation();
        _this.attackers = {};
        _this.targetId = null;
        _this.poisonedInterval = null;
        _this.ownerId = ownerId;
        _this.skin = skin;
        _this.isPet = true;
        _this.level = level;
        _this.bonus = bonus;
        return _this;
    }
    Pet.prototype.getState = function () {
        return Object.assign({}, this._getBaseState(), {
            orientation: this.orientation,
            targetId: this.targetId,
            isPet: this.isPet,
            resistances: this.resistances || null,
            element: this.element || null,
            enchants: this.enchants || null,
            skin: this.skin,
            level: this.level,
            bonus: this.bonus,
            ownerId: this.ownerId,
        });
    };
    Pet.prototype.onMove = function (callback) {
        this.moveCallback = callback;
    };
    return Pet;
}(Character));
export default Pet;
