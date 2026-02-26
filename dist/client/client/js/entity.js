import { Types } from "../../shared/js/gametypes";
var Entity = (function () {
    function Entity(id, kind) {
        this.id = id;
        this.kind = kind;
        this.isDirty = false;
        this.sprite = null;
        this.flipSpriteX = false;
        this.flipSpriteY = false;
        this.animations = null;
        this.currentAnimation = null;
        this.shadowOffsetY = 0;
        this.setGridPosition(0, 0);
        this.isLoaded = false;
        this.isHighlighted = false;
        this.visible = true;
        this.isFading = true;
        this.setDirty();
    }
    Entity.prototype.setName = function (name) {
        this.name = name;
    };
    Entity.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Entity.prototype.setGridPosition = function (x, y) {
        this.gridX = x;
        this.gridY = y;
        this.setPosition(x * 16, y * 16);
    };
    Entity.prototype.setSprite = function (sprite) {
        if (!sprite) {
            console.error(this.id + " : sprite is null", sprite);
            throw "Sprite error";
        }
        if (!sprite.name || (this.sprite && this.sprite.name === sprite.name)) {
            return;
        }
        this.sprite = sprite;
        this.normalSprite = this.sprite;
        if (Types.isMob(this.kind) || Types.isPlayer(this.kind)) {
            this.hurtSprite = sprite.getHurtSprite();
        }
        this.animations = sprite.createAnimations();
        this.isLoaded = true;
        if (this.ready_func) {
            this.ready_func();
        }
    };
    Entity.prototype.getSprite = function () {
        return this.sprite;
    };
    Entity.prototype.getSpriteName = function (elementOrSkin) {
        return "".concat(Types.getKindAsString(this.kind)).concat(elementOrSkin ? "-".concat(elementOrSkin) : "");
    };
    Entity.prototype.getAnimationByName = function (name) {
        var animation = null;
        if (name in this.animations) {
            animation = this.animations[name];
        }
        else {
            console.error("No animation called " + name);
        }
        return animation;
    };
    Entity.prototype.setAnimation = function (name, speed, count, onEndCount) {
        if (count === void 0) { count = 0; }
        var self = this;
        if (this.isLoaded) {
            if (this.currentAnimation && this.currentAnimation.name === name) {
                return;
            }
            var a = this.getAnimationByName(name);
            if (a) {
                this.currentAnimation = a;
                var isAtk = name.substr(0, 3) === "atk";
                var isRaise = name.substr(0, 5) === "raise";
                var isUnraise = name.substr(0, 7) === "unraise";
                if (isAtk || isRaise || isUnraise) {
                    this.currentAnimation.reset();
                }
                if (this.kind === Types.Entities.ANVIL ||
                    this.kind === Types.Entities.WAYPOINTX ||
                    this.kind === Types.Entities.WAYPOINTN ||
                    this.kind === Types.Entities.WAYPOINTO ||
                    (!isRaise &&
                        [
                            Types.Entities.PORTALCOW,
                            Types.Entities.PORTALMINOTAUR,
                            Types.Entities.PORTALSTONE,
                            Types.Entities.PORTALGATEWAY,
                        ].includes(this.kind))) {
                    this.currentAnimation.setSpeed(150);
                }
                else if (this.kind === Types.Entities.MAGICSTONE ||
                    this.kind === Types.Entities.LEVER ||
                    this.kind === Types.Entities.LEVER2 ||
                    this.kind === Types.Entities.LEVER3 ||
                    this.kind === Types.Entities.STATUE ||
                    this.kind === Types.Entities.STATUE2 ||
                    this.kind === Types.Entities.ALTARSOULSTONE ||
                    this.kind === Types.Entities.DOORDEATHANGEL) {
                    this.currentAnimation.setSpeed(100);
                }
                else if (this.kind === Types.Entities.BLUEFLAME ||
                    this.kind === Types.Entities.TRAP ||
                    this.kind === Types.Entities.TRAP2 ||
                    this.kind === Types.Entities.TRAP3 ||
                    this.kind === Types.Entities.HANDS) {
                    this.currentAnimation.setSpeed(75);
                }
                else if (this.kind === Types.Entities.ALTARCHALICE) {
                    this.currentAnimation.setSpeed(200);
                }
                else {
                    this.currentAnimation.setSpeed(speed);
                }
                this.currentAnimation.setCount(count ? count : 0, onEndCount ||
                    function () {
                        self.idle();
                    });
            }
        }
        else {
            this.log_error("Not ready for animation");
        }
    };
    Entity.prototype.hasShadow = function () {
        return false;
    };
    Entity.prototype.ready = function (f) {
        this.ready_func = f;
    };
    Entity.prototype.clean = function () {
        this.stopBlinking();
    };
    Entity.prototype.log_info = function (message) {
        console.info("[" + this.id + "] " + message);
    };
    Entity.prototype.log_error = function (message) {
        console.error("[" + this.id + "] " + message);
    };
    Entity.prototype.setHighlight = function (value) {
        var _a;
        this.isHighlighted = !!value;
        if (value === true &&
            ![Types.Entities.TREE, Types.Entities.TRAP, Types.Entities.TRAP2, Types.Entities.TRAP3].includes(this.kind)) {
            if (!this.sprite.silhouetteSprite) {
                this.sprite.createSilhouette();
            }
            this.sprite = (_a = this.sprite) === null || _a === void 0 ? void 0 : _a.silhouetteSprite;
        }
        else {
            this.sprite = this.normalSprite;
        }
    };
    Entity.prototype.setVisible = function (value) {
        this.visible = value;
    };
    Entity.prototype.isVisible = function () {
        return this.visible;
    };
    Entity.prototype.toggleVisibility = function () {
        if (this.visible) {
            this.setVisible(false);
        }
        else {
            this.setVisible(true);
        }
    };
    Entity.prototype.getDistanceToEntity = function (entity) {
        var distX = Math.abs(entity.gridX - this.gridX), distY = Math.abs(entity.gridY - this.gridY);
        return distX > distY ? distX : distY;
    };
    Entity.prototype.isCloseTo = function (entity, aggroRange) {
        var dx, dy, close = false;
        if (entity) {
            dx = Math.abs(entity.gridX - this.gridX);
            dy = Math.abs(entity.gridY - this.gridY);
            if (dx < aggroRange && dy < aggroRange) {
                close = true;
            }
        }
        return close;
    };
    Entity.prototype.isAdjacent = function (entity) {
        var adjacent = false;
        if (entity) {
            adjacent = this.getDistanceToEntity(entity) > 1 ? false : true;
        }
        return adjacent;
    };
    Entity.prototype.isAdjacentNonDiagonal = function (entity) {
        var result = false;
        if (this.isAdjacent(entity) && !(this.gridX !== entity.gridX && this.gridY !== entity.gridY)) {
            result = true;
        }
        return result;
    };
    Entity.prototype.isDiagonallyAdjacent = function (entity) {
        return this.isAdjacent(entity) && !this.isAdjacentNonDiagonal(entity);
    };
    Entity.prototype.forEachAdjacentNonDiagonalPosition = function (callback) {
        callback(this.gridX - 1, this.gridY, Types.Orientations.LEFT);
        callback(this.gridX, this.gridY - 1, Types.Orientations.UP);
        callback(this.gridX + 1, this.gridY, Types.Orientations.RIGHT);
        callback(this.gridX, this.gridY + 1, Types.Orientations.DOWN);
    };
    Entity.prototype.fadeIn = function (currentTime) {
        this.isFading = true;
        this.startFadingTime = currentTime;
    };
    Entity.prototype.blink = function (speed) {
        var self = this;
        this.blinking = setInterval(function () {
            self.toggleVisibility();
        }, speed);
    };
    Entity.prototype.stopBlinking = function () {
        if (this.blinking) {
            clearInterval(this.blinking);
        }
        this.setVisible(true);
    };
    Entity.prototype.setDirty = function () {
        this.isDirty = true;
        if (this.dirty_callback) {
            this.dirty_callback(this);
        }
    };
    Entity.prototype.onDirty = function (dirty_callback) {
        this.dirty_callback = dirty_callback;
    };
    return Entity;
}());
export default Entity;
