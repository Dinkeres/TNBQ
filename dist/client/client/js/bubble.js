import * as _ from "lodash";
import Timer from "./timer";
var Bubble = (function () {
    function Bubble(id, element, time) {
        this.id = id;
        this.element = element;
        this.timer = new Timer(6000, time);
    }
    Bubble.prototype.isOver = function (time) {
        if (this.timer.isOver(time)) {
            return true;
        }
        return false;
    };
    Bubble.prototype.destroy = function () {
        $(this.element).remove();
    };
    Bubble.prototype.reset = function (time) {
        this.timer.lastTime = time;
    };
    return Bubble;
}());
var BubbleManager = (function () {
    function BubbleManager(container) {
        this.container = container;
        this.bubbles = {};
    }
    BubbleManager.prototype.getBubbleById = function (id) {
        if (id in this.bubbles) {
            return this.bubbles[id];
        }
        return null;
    };
    BubbleManager.prototype.create = function (id, message, time) {
        if (this.bubbles[id]) {
            this.bubbles[id].reset(time);
            $("#" + id + " p").html(message);
        }
        else {
            var el = $('<div id="' + id + '" class="bubble"><p>' + message + '</p><div class="thingy"></div></div>');
            $(el).appendTo(this.container);
            this.bubbles[id] = new Bubble(id, el, time);
        }
    };
    BubbleManager.prototype.update = function (time) {
        var self = this, bubblesToDelete = [];
        _.each(this.bubbles, function (bubble) {
            if (bubble.isOver(time)) {
                bubble.destroy();
                bubblesToDelete.push(bubble.id);
            }
        });
        _.each(bubblesToDelete, function (id) {
            delete self.bubbles[id];
        });
    };
    BubbleManager.prototype.clean = function () {
        var self = this, bubblesToDelete = [];
        _.each(this.bubbles, function (bubble) {
            bubble.destroy();
            bubblesToDelete.push(bubble.id);
        });
        _.each(bubblesToDelete, function (id) {
            delete self.bubbles[id];
        });
        this.bubbles = {};
    };
    BubbleManager.prototype.destroyBubble = function (id) {
        var bubble = this.getBubbleById(id);
        if (bubble) {
            bubble.destroy();
            delete this.bubbles[id];
        }
    };
    BubbleManager.prototype.forEachBubble = function (callback) {
        _.each(this.bubbles, function (bubble) {
            callback(bubble);
        });
    };
    return BubbleManager;
}());
export default BubbleManager;
