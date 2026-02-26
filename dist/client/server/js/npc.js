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
var Npc = (function (_super) {
    __extends(Npc, _super);
    function Npc(id, kind, x, y) {
        var _this = _super.call(this, id, "npc", kind, x, y) || this;
        _this.isActivated = false;
        return _this;
    }
    Npc.prototype.getState = function () {
        return Object.assign({}, this._getBaseState(), {
            isActivated: this.isActivated,
        });
    };
    Npc.prototype.onRespawn = function (callback) {
        this.respawnCallback = callback;
    };
    Npc.prototype.activate = function () {
        this.isActivated = true;
    };
    Npc.prototype.deactivate = function () {
        this.isActivated = false;
    };
    Npc.prototype.raise = function () {
        return new Messages.Raise(this.id);
    };
    Npc.prototype.hasFullHealth = function () {
        return true;
    };
    return Npc;
}(Entity));
export default Npc;
