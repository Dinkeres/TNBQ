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
var Chest = (function (_super) {
    __extends(Chest, _super);
    function Chest(id) {
        return _super.call(this, id, Types.Entities.CHEST) || this;
    }
    Chest.prototype.getSpriteName = function () {
        return "chest";
    };
    Chest.prototype.isMoving = function () {
        return false;
    };
    Chest.prototype.open = function () {
        if (this.open_callback) {
            this.open_callback();
        }
    };
    Chest.prototype.onOpen = function (callback) {
        this.open_callback = callback;
    };
    return Chest;
}(Entity));
export default Chest;
