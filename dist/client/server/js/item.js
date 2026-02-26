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
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(_a) {
        var id = _a.id, kind = _a.kind, skin = _a.skin, x = _a.x, y = _a.y, partyId = _a.partyId, level = _a.level, mobKind = _a.mobKind, amount = _a.amount;
        var _this = _super.call(this, id, "item", kind, x, y) || this;
        _this.isStatic = false;
        _this.isFromChest = false;
        _this.partyId = partyId;
        _this.level = level;
        _this.mobKind = mobKind;
        if (skin) {
            _this.skin = skin;
        }
        if (amount) {
            _this.amount = amount;
        }
        return _this;
    }
    Item.prototype.getState = function () {
        return Object.assign({}, this._getBaseState(), {
            partyId: this.partyId,
            level: this.level,
            mobKind: this.mobKind,
            amount: this.amount,
            skin: this.skin,
        });
    };
    Item.prototype.handleDespawn = function (params) {
        var self = this;
        this.blinkTimeout = setTimeout(function () {
            params.blinkCallback();
            self.despawnTimeout = setTimeout(params.despawnCallback, params.blinkingDuration);
        }, params.beforeBlinkDelay);
    };
    Item.prototype.destroy = function () {
        if (this.blinkTimeout) {
            clearTimeout(this.blinkTimeout);
        }
        if (this.despawnTimeout) {
            clearTimeout(this.despawnTimeout);
        }
        if (this.isStatic) {
            this.scheduleRespawn(30000);
        }
    };
    Item.prototype.scheduleRespawn = function (delay) {
        var self = this;
        setTimeout(function () {
            if (self.respawnCallback) {
                self.respawnCallback();
            }
        }, delay);
    };
    Item.prototype.onRespawn = function (callback) {
        this.respawnCallback = callback;
    };
    return Item;
}(Entity));
export default Item;
