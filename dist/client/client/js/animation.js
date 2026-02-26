var Animation = (function () {
    function Animation(name, length, row, width, height) {
        this.count = 0;
        this.lastTime = 0;
        this.speed = 0;
        this.isPaused = false;
        this.name = name;
        this.length = length;
        this.row = row;
        this.width = width;
        this.height = height;
        this.reset();
    }
    Animation.prototype.tick = function () {
        var i = this.currentFrame.index;
        i = i < this.length - 1 ? i + 1 : 0;
        if (this.count > 0) {
            if (i === 0) {
                this.count -= 1;
                if (this.count === 0) {
                    this.currentFrame.index = 0;
                    this.endcount_callback();
                    return;
                }
            }
        }
        this.currentFrame.x = this.width * i;
        this.currentFrame.y = this.height * this.row;
        this.currentFrame.index = i;
    };
    Animation.prototype.setSpeed = function (speed) {
        this.speed = speed;
    };
    Animation.prototype.setCount = function (count, onEndCount) {
        this.count = count;
        this.endcount_callback = onEndCount;
    };
    Animation.prototype.isTimeToAnimate = function (time) {
        return time - this.lastTime > this.speed;
    };
    Animation.prototype.update = function (time) {
        if (this.lastTime === 0 && (this.name.substr(0, 3) === "atk" || this.name.substr(0, 5) === "raise")) {
            this.lastTime = time;
        }
        if (this.isTimeToAnimate(time)) {
            this.lastTime = time;
            if (!this.isPaused) {
                this.tick();
            }
            return true;
        }
        else {
            return false;
        }
    };
    Animation.prototype.pause = function () {
        this.isPaused = true;
    };
    Animation.prototype.play = function () {
        this.isPaused = false;
    };
    Animation.prototype.reset = function () {
        this.lastTime = 0;
        this.currentFrame = { index: 0, x: 0, y: this.row * this.height };
    };
    return Animation;
}());
export default Animation;
