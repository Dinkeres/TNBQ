import { randomInt } from "./utils";
var Checkpoint = (function () {
    function Checkpoint(id, x, y, width, height) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Checkpoint.prototype.getRandomPosition = function () {
        var pos = {};
        pos.x = this.x + randomInt(0, this.width - 1);
        pos.y = this.y + randomInt(0, this.height - 1);
        return pos;
    };
    return Checkpoint;
}());
export default Checkpoint;
