var Transition = (function () {
    function Transition() {
        this.startValue = 0;
        this.endValue = 0;
        this.startValue1 = 0;
        this.endValue1 = 0;
        this.duration = 0;
        this.count = 0;
        this.inProgress = false;
    }
    Transition.prototype.start = function (currentTime, updateFunction, stopFunction, startValue, endValue, duration, startValue1, endValue1) {
        if (startValue1 === void 0) { startValue1 = 0; }
        if (endValue1 === void 0) { endValue1 = 0; }
        this.startTime = currentTime;
        this.updateFunction = updateFunction;
        this.stopFunction = stopFunction;
        this.startValue = startValue;
        this.endValue = endValue;
        this.startValue1 = startValue1;
        this.endValue1 = endValue1;
        this.duration = duration;
        this.inProgress = true;
        this.count = 0;
    };
    Transition.prototype.step = function (currentTime) {
        var _a;
        if (this.inProgress) {
            if (this.count > 0) {
                this.count -= 1;
                console.debug(currentTime + ": jumped frame");
            }
            else {
                var elapsed = currentTime - this.startTime;
                if (elapsed > this.duration) {
                    elapsed = this.duration;
                }
                var diff = this.endValue - this.startValue;
                var i = Math.round(this.startValue + (diff / this.duration) * elapsed);
                var diff1 = void 0;
                var ii = void 0;
                if (this.startValue1 && this.endValue1) {
                    diff1 = this.endValue1 - this.startValue1;
                    ii = Math.round(this.startValue1 + (diff1 / this.duration) * elapsed);
                }
                if (elapsed === this.duration || i === this.endValue) {
                    this.stop();
                    (_a = this.stopFunction) === null || _a === void 0 ? void 0 : _a.call(this);
                }
                else if (this.updateFunction) {
                    this.updateFunction(i, ii);
                }
            }
        }
    };
    Transition.prototype.restart = function (currentTime, startValue, endValue) {
        this.start(currentTime, this.updateFunction, this.stopFunction, startValue, endValue, this.duration);
        this.step(currentTime);
    };
    Transition.prototype.stop = function () {
        this.inProgress = false;
    };
    return Transition;
}());
export default Transition;
