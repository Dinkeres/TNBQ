import each from "lodash/each";
var InfoManager = (function () {
    function InfoManager(game) {
        this.game = game;
        this.infos = {};
        this.destroyQueue = [];
        this.showDamageInfo = true;
    }
    InfoManager.prototype.setShowDamageInfo = function (showDamageInfo) {
        this.showDamageInfo = showDamageInfo;
    };
    InfoManager.prototype.addDamageInfo = function (_a) {
        var value = _a.value, x = _a.x, y = _a.y, type = _a.type, _b = _a.duration, duration = _b === void 0 ? 1000 : _b, isCritical = _a.isCritical, isBlocked = _a.isBlocked;
        if (!this.showDamageInfo)
            return;
        var time = this.game.currentTime;
        var id = time + "" + (isNaN(value * 1) ? value : value * 1) + "" + x + "" + y;
        var self = this;
        var string = value;
        if (isCritical) {
            string += " Critical";
        }
        else if (isBlocked) {
            string = "Blocked";
            type = "inflicted";
        }
        var info = new HoveringInfo(id, string, x, y, duration, type);
        info.onDestroy(function (id) {
            self.destroyQueue.push(id);
        });
        this.infos[id] = info;
    };
    InfoManager.prototype.forEachInfo = function (callback) {
        each(this.infos, function (info) {
            callback(info);
        });
    };
    InfoManager.prototype.update = function (time) {
        var self = this;
        this.forEachInfo(function (info) {
            info.update(time);
        });
        each(this.destroyQueue, function (id) {
            delete self.infos[id];
        });
        this.destroyQueue = [];
    };
    return InfoManager;
}());
var damageInfoColors = {
    received: {
        fill: "rgb(255, 50, 50)",
        stroke: "rgb(255, 180, 180)",
    },
    inflicted: {
        fill: "white",
        stroke: "#373737",
    },
    healed: {
        fill: "rgb(80, 255, 80)",
        stroke: "rgb(50, 120, 50)",
    },
    health: {
        fill: "white",
        stroke: "#373737",
    },
    exp: {
        fill: "rgb(80, 80, 255)",
        stroke: "rgb(50, 50, 255)",
    },
};
var HoveringInfo = (function () {
    function HoveringInfo(id, value, x, y, duration, type) {
        this.id = id;
        this.value = value;
        this.duration = duration;
        this.x = x;
        this.y = y;
        this.opacity = 1.0;
        this.lastTime = 0;
        this.speed = 100;
        this.type = type;
        this.fillColor = damageInfoColors[type].fill;
        this.strokeColor = damageInfoColors[type].stroke;
    }
    HoveringInfo.prototype.isTimeToAnimate = function (time) {
        return time - this.lastTime > this.speed;
    };
    HoveringInfo.prototype.update = function (time) {
        if (this.isTimeToAnimate(time)) {
            this.lastTime = time;
            this.tick();
        }
    };
    HoveringInfo.prototype.tick = function () {
        if (this.type !== "health")
            this.y -= 1;
        this.opacity -= 70 / this.duration;
        if (this.opacity < 0) {
            this.destroy();
        }
    };
    HoveringInfo.prototype.onDestroy = function (callback) {
        this.destroy_callback = callback;
    };
    HoveringInfo.prototype.destroy = function () {
        if (this.destroy_callback) {
            this.destroy_callback(this.id);
        }
    };
    return HoveringInfo;
}());
export default InfoManager;
