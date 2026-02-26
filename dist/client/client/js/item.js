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
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(id, kind, type, props) {
        var _this = _super.call(this, id, kind) || this;
        _this.itemKind = Types.getKindAsString(kind);
        _this.type = type;
        _this.wasDropped = false;
        _this.skin = (props === null || props === void 0 ? void 0 : props.skin) || "";
        return _this;
    }
    Item.prototype.hasShadow = function () {
        return true;
    };
    Item.prototype.getSpriteName = function (skin) {
        if (skin === void 0) { skin = ""; }
        if (skin || this.skin) {
            return "item-".concat(this.itemKind, "-").concat(skin || this.skin);
        }
        else {
            return "item-".concat(this.itemKind);
        }
    };
    Item.prototype.getLootMessage = function (_a) {
        var _b = _a === void 0 ? {} : _a, amount = _b.amount;
        if ([Types.Entities.GOLD, Types.Entities.NANOCOIN, Types.Entities.BANANOCOIN].includes(this.kind)) {
            return this.lootMessage.replace("amount", amount || this.amount);
        }
        return this.lootMessage;
    };
    return Item;
}(Entity));
export default Item;
