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
var Pet = (function (_super) {
    __extends(Pet, _super);
    function Pet(id, kind, props) {
        var _this = _super.call(this, id, kind) || this;
        _this.aggroRange = 0;
        _this.castRange = null;
        _this.type = "pet";
        _this.name = "pet";
        _this.isPet = true;
        _this.itemKind = Types.getKindAsString(kind);
        _this.idleTimeout = null;
        Object.keys(props).forEach(function (prop) {
            _this[prop] = props[prop];
        });
        return _this;
    }
    Pet.prototype.go = function (x, y) {
        if (this.isAttacking()) {
            this.disengage();
        }
        else if (this.followingMode) {
            this.followingMode = false;
            this.target = null;
        }
        this.moveTo_(x, y);
        this.setIdleAnimation();
    };
    Pet.prototype.setIdleAnimation = function () {
        var _this = this;
        clearTimeout(this.idleTimeout);
        var sitCount = Types.Entities.PET_BAT ? 1 : 5;
        this.idleTimeout = window.setTimeout(function () {
            _this.animate("sit", _this.idleSpeed, sitCount, function () {
                _this.animate("liedown", _this.idleSpeed);
            });
        }, 10000);
    };
    Pet.prototype.getSpriteName = function (skin) {
        return "".concat(Types.getKindAsString(this.kind)).concat(skin ? "-".concat(skin) : "");
    };
    return Pet;
}(Character));
export default Pet;
