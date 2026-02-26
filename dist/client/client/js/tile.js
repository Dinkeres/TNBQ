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
var Tile = (function () {
    function Tile() {
    }
    return Tile;
}());
var AnimatedTile = (function (_super) {
    __extends(AnimatedTile, _super);
    function AnimatedTile(id, length, speed, skip, index) {
        if (skip === void 0) { skip = 1; }
        var _this = _super.call(this) || this;
        _this.startId = id;
        _this.id = id;
        _this.length = length;
        _this.speed = speed;
        _this.skip = skip;
        _this.index = index;
        _this.lastTime = 0;
        return _this;
    }
    AnimatedTile.prototype.tick = function () {
        if (this.id - this.startId < this.length * this.skip - this.skip) {
            this.id += this.skip;
        }
        else {
            this.id = this.startId;
        }
    };
    AnimatedTile.prototype.animate = function (time) {
        if (time - this.lastTime > this.speed) {
            this.tick();
            this.lastTime = time;
            return true;
        }
        else {
            return false;
        }
    };
    return AnimatedTile;
}(Tile));
export default AnimatedTile;
