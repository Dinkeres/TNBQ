import Messages from "./message";
import { random } from "./utils";
var Entity = (function () {
    function Entity(id, type, kind, x, y) {
        this.id = parseInt(id, 10);
        this.type = type;
        this.kind = kind;
        this.x = x;
        this.y = y;
    }
    Entity.prototype.destroy = function () { };
    Entity.prototype._getBaseState = function () {
        return {
            id: this.id,
            kind: this.kind,
            x: this.x,
            y: this.y,
            hitPoints: this.hitPoints,
            maxHitPoints: this.maxHitPoints,
        };
    };
    Entity.prototype.getState = function () {
        return this._getBaseState();
    };
    Entity.prototype.spawn = function () {
        return new Messages.Spawn(this);
    };
    Entity.prototype.despawn = function () {
        return new Messages.Despawn(this.id);
    };
    Entity.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Entity.prototype.getPositionNextTo = function (entity) {
        var pos = null;
        if (entity) {
            pos = {};
            var r = random(4);
            pos.x = entity.x;
            pos.y = entity.y;
            if (r === 0) {
                pos.y -= 1;
            }
            if (r === 1) {
                pos.y += 1;
            }
            if (r === 2) {
                pos.x -= 1;
            }
            if (r === 3) {
                pos.x += 1;
            }
        }
        return pos;
    };
    return Entity;
}());
export default Entity;
