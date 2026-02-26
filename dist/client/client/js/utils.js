import BigNumber from "bignumber.js";
Function.prototype.bind = function (bind) {
    var self = this;
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return self.apply(bind || null, args);
    };
};
export var isInt = function (n) {
    return n % 1 === 0;
};
export var TRANSITIONEND = "transitionend webkitTransitionEnd oTransitionEnd";
window.requestAnimFrame = (function () {
    return (window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        });
})();
export var rawToRai = function (raw, network) {
    var decimals = network === "nano" ? 30 : 29;
    var value = new BigNumber(raw.toString());
    return value.shiftedBy(decimals * -1).toNumber();
};
export var raiToRaw = function (rai, network) {
    var decimals = network === "nano" ? 30 : 29;
    var value = new BigNumber(rai.toString());
    return value.shiftedBy(decimals).toNumber();
};
export function copyToClipboard(text) {
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = text;
    sampleTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
}
export function randomRange(min, max) {
    return min + Math.random() * (max - min);
}
