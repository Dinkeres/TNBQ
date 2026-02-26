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
import * as _ from "lodash";
import { Types } from "../../shared/js/gametypes";
import Item from "./item";
import { random } from "./utils";
var Chest = (function (_super) {
    __extends(Chest, _super);
    function Chest(id, x, y) {
        return _super.call(this, { id: id, kind: Types.Entities.CHEST, x: x, y: y }) || this;
    }
    Chest.prototype.setItems = function (items) {
        this.items = items;
    };
    Chest.prototype.getRandomItem = function () {
        var nbItems = _.size(this.items), item = null;
        if (nbItems > 0) {
            item = this.items[random(nbItems)];
        }
        return item;
    };
    return Chest;
}(Item));
export default Chest;
