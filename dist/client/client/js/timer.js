var Timer = (function () {
    function Timer(duration, startTime) {
        if (startTime === void 0) { startTime = 0; }
        this.lastTime = startTime;
        this.duration = duration;
    }
    Timer.prototype.isOver = function (time, isSlowed) {
        if (isSlowed === void 0) { isSlowed = false; }
        var over = false;
        if (time - this.lastTime > this.duration * (isSlowed ? 2 : 1)) {
            over = true;
            this.lastTime = time;
        }
        return over;
    };
    return Timer;
}());
export default Timer;
