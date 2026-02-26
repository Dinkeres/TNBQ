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
import Player from "./player";
var Warrior = (function (_super) {
    __extends(Warrior, _super);
    function Warrior(id, _a) {
        var name = _a.name, petId = _a.petId;
        var _this = _super.call(this, id, name, "", Types.Entities.WARRIOR) || this;
        _this.petId = petId;
        return _this;
    }
    return Warrior;
}(Player));
export default Warrior;
