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
import * as _ from "lodash";
import { Types } from "../../shared/js/gametypes";
import { randomInt } from "../../shared/js/utils";
import Entity from "./entity";
import Timer from "./timer";
import Transition from "./transition";
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(id, kind) {
        var _this = _super.call(this, id, kind) || this;
        _this.nextGridX = -1;
        _this.nextGridY = -1;
        _this.orientation = Types.Orientations.DOWN;
        _this.atkSpeed = Types.DEFAULT_ATTACK_ANIMATION_SPEED;
        _this.raiseSpeed = null;
        _this.moveSpeed = 120;
        _this.walkSpeed = 100;
        _this.idleSpeed = 450;
        _this.setAttackRate(Types.DEFAULT_ATTACK_SPEED);
        _this.movement = new Transition();
        _this.path = null;
        _this.newDestination = null;
        _this.adjacentTiles = {};
        _this.target = null;
        _this.unconfirmedTarget = null;
        _this.attackers = {};
        _this.hitPoints = 0;
        _this.maxHitPoints = 0;
        _this.isDead = false;
        _this.raisingMode = false;
        _this.attackingMode = false;
        _this.followingMode = false;
        _this.inspecting = null;
        _this.isLevelup = false;
        _this.auras = [];
        return _this;
    }
    Character.prototype.clean = function () {
        this.forEachAttacker(function (attacker) {
            attacker.disengage();
            attacker.idle();
        });
    };
    Character.prototype.setMaxHitPoints = function (hp) {
        this.maxHitPoints = hp;
        this.hitPoints = hp;
    };
    Character.prototype.setDefaultAnimation = function () {
        this.idle();
    };
    Character.prototype.hasWeapon = function () {
        return false;
    };
    Character.prototype.hasShadow = function () {
        return true;
    };
    Character.prototype.setLevelup = function () {
        var _this = this;
        this.isLevelup = true;
        setTimeout(function () {
            _this.isLevelup = false;
        }, 1500);
    };
    Character.prototype.setCastSkill = function (skill) {
        var _this = this;
        this.castSkill = skill;
        setTimeout(function () {
            _this.castSkill = null;
        }, 850);
    };
    Character.prototype.setSkillAnimation = function (skill) {
        var _this = this;
        this.skillAnimation = skill;
        clearTimeout(this.skillAnimationTimeout);
        this.skillAnimationTimeout = setTimeout(function () {
            _this.skillAnimation = null;
        }, Types.attackSkillDurationMap[skill]());
    };
    Character.prototype.resetDefenseSkillAnimation = function () {
        this.defenseSkillName = null;
        clearTimeout(this.defenseSkillAnimationTimeout);
    };
    Character.prototype.setDefenseSkillAnimation = function (skillName, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        this.resetDefenseSkillAnimation();
        this.defenseSkillName = skillName;
        this.defenseSkillAnimationTimeout = setTimeout(function () {
            _this.defenseSkillName = null;
        }, delay);
    };
    Character.prototype.animate = function (animation, speed, count, onEndCount) {
        if (count === void 0) { count = 0; }
        var oriented = [
            "atk",
            "atk2",
            "walk",
            "idle",
            "raise",
            "raise2",
            "unraise",
            "sit",
            "liedown",
            "run",
            "dash",
            "sleep",
        ];
        if (!(this.currentAnimation && this.currentAnimation.name === "death")) {
            this.flipSpriteX = false;
            this.flipSpriteY = false;
            var orientationAsString = Types.getOrientationAsString(this.orientation);
            if (_.indexOf(oriented, animation) >= 0) {
                animation += "_".concat(orientationAsString.replace("left", "right"));
                this.flipSpriteX = orientationAsString.includes("left") ? true : false;
            }
            if (this.kind === Types.Entities.WARRIOR) {
                this.capeOrientation = this.orientation;
            }
            if (this.kind === Types.Entities.DEATHBRINGER) {
                this.flipSpriteX = !this.flipSpriteX;
            }
            this.setAnimation(animation, speed, count, onEndCount);
        }
    };
    Character.prototype.turnTo = function (orientation) {
        this.orientation = orientation;
    };
    Character.prototype.setOrientation = function (orientation) {
        if (orientation) {
            this.orientation = orientation;
        }
    };
    Character.prototype.idle = function (orientation) {
        this.setOrientation(orientation);
        this.animate("idle", this.idleSpeed);
    };
    Character.prototype.hit = function (orientation) {
        this.setOrientation(orientation);
        var atkAnimation = "";
        if (this.kind === Types.Entities.SPIDERQUEEN) {
            atkAnimation = randomInt(0, 1) ? "2" : "";
        }
        this.animate("atk".concat(atkAnimation), this.atkSpeed, 1);
    };
    Character.prototype.walk = function (orientation) {
        this.setOrientation(orientation);
        this.animate("walk", this.walkSpeed);
    };
    Character.prototype.raise = function (orientation) {
        if (orientation) {
            this.setOrientation(orientation);
        }
        else {
            this.lookAtTarget();
        }
        this.animate("raise", this.raiseSpeed, 1);
    };
    Character.prototype.raise2 = function (orientation) {
        if (orientation) {
            this.setOrientation(orientation);
        }
        else {
            this.lookAtTarget();
        }
        this.animate("raise2", this.raise2Speed, 1);
    };
    Character.prototype.unraise = function () {
        this.animate("unraise", this.raiseSpeed, 1);
    };
    Character.prototype.sit = function () {
        this.animate("sit", this.idleSpeed, 1);
    };
    Character.prototype.liedown = function () {
        this.animate("liedown", this.idleSpeed, 1);
    };
    Character.prototype.run = function () {
        this.animate("run", this.idleSpeed);
    };
    Character.prototype.dash = function () {
        this.animate("dash", this.idleSpeed);
    };
    Character.prototype.sleep = function () {
        this.animate("sleep", this.idleSpeed);
    };
    Character.prototype.moveTo_ = function (x, y) {
        if (this.kind === Types.Entities.NECROMANCER ||
            this.kind === Types.Entities.DEATHANGEL ||
            this.kind === Types.Entities.DEATHBRINGER ||
            this.kind === Types.Entities.MAGE ||
            this.kind === Types.Entities.SHAMAN) {
            if (this.isRaising()) {
                this.aggroRange = 10;
                return;
            }
        }
        this.destination = { gridX: x, gridY: y };
        this.adjacentTiles = {};
        if (this.isMoving()) {
            this.continueTo(x, y);
        }
        else {
            var path = this.requestPathfindingTo(x, y);
            this.followPath(path);
        }
    };
    Character.prototype.requestPathfindingTo = function (x, y) {
        if (this.request_path_callback) {
            return this.request_path_callback(x, y);
        }
        else {
            console.error(this.id + " couldn't request pathfinding to " + x + ", " + y);
            return [];
        }
    };
    Character.prototype.onRequestPath = function (callback) {
        this.request_path_callback = callback;
    };
    Character.prototype.onStartPathing = function (callback) {
        this.start_pathing_callback = callback;
    };
    Character.prototype.onStopPathing = function (callback) {
        this.stop_pathing_callback = callback;
    };
    Character.prototype.followPath = function (path) {
        var _a;
        if (this.raisingMode)
            return;
        if (path.length <= 1 || this.isFrozen)
            return;
        this.path = path;
        this.step = 0;
        if (this.followingMode) {
            path.pop();
        }
        (_a = this.start_pathing_callback) === null || _a === void 0 ? void 0 : _a.call(this, path);
        this.nextStep();
    };
    Character.prototype.continueTo = function (x, y) {
        this.newDestination = { x: x, y: y };
    };
    Character.prototype.updateMovement = function () {
        var p = this.path;
        var i = this.step;
        if (p[i][0] < p[i - 1][0]) {
            this.walk(Types.Orientations.LEFT);
        }
        if (p[i][0] > p[i - 1][0]) {
            this.walk(Types.Orientations.RIGHT);
        }
        if (p[i][1] < p[i - 1][1]) {
            this.walk(Types.Orientations.UP);
        }
        if (p[i][1] > p[i - 1][1]) {
            this.walk(Types.Orientations.DOWN);
        }
    };
    Character.prototype.updatePositionOnGrid = function () {
        this.setGridPosition(this.path[this.step][0], this.path[this.step][1]);
    };
    Character.prototype.nextStep = function () {
        var _a, _b, _c;
        var stop = false;
        var x;
        var y;
        var path;
        if (this.isMoving()) {
            (_a = this.before_step_callback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.updatePositionOnGrid();
            this.checkAggro();
            if (this.interrupted) {
                stop = true;
                this.interrupted = false;
            }
            else {
                if (this.hasNextStep()) {
                    this.nextGridX = this.path[this.step + 1][0];
                    this.nextGridY = this.path[this.step + 1][1];
                }
                (_b = this.step_callback) === null || _b === void 0 ? void 0 : _b.call(this);
                if (this.raisingMode || (this.castRange && this.path.length - this.step < this.castRange)) {
                    if (!this.raisingMode) {
                        this.setRaisingMode();
                    }
                    stop = true;
                }
                else if (this.hasChangedItsPath()) {
                    x = this.newDestination.x;
                    y = this.newDestination.y;
                    path = this.requestPathfindingTo(x, y);
                    this.newDestination = null;
                    if (path.length < 2) {
                        stop = true;
                    }
                    else {
                        this.followPath(path);
                    }
                }
                else if (this.hasNextStep()) {
                    this.step += 1;
                    this.updateMovement();
                }
                else {
                    stop = true;
                }
            }
            if (stop) {
                this.path = null;
                this.idle();
                (_c = this.stop_pathing_callback) === null || _c === void 0 ? void 0 : _c.call(this, { x: this.gridX, y: this.gridY });
            }
        }
    };
    Character.prototype.onBeforeStep = function (callback) {
        this.before_step_callback = callback;
    };
    Character.prototype.onStep = function (callback) {
        this.step_callback = callback;
    };
    Character.prototype.isMoving = function () {
        return !(this.path === null);
    };
    Character.prototype.setRaisingMode = function () {
        var _this = this;
        if (this.raisingModeTimeout)
            return;
        this.raisingMode = true;
        this.raisingModeTimeout = setTimeout(function () {
            _this.raisingMode = false;
            _this.raisingModeTimeout = null;
            if (_this.hasTarget()) {
                if (_this.castRange && _this.isCloseTo(_this.target, _this.castRange + 1)) {
                    _this.setRaisingMode();
                }
                else if (_this.isCloseTo(_this.target, _this.aggroRange)) {
                    _this.engage(_this.target);
                }
            }
        }, this.raiseRate);
    };
    Character.prototype.isRaising = function () {
        return this.raisingMode;
    };
    Character.prototype.hasNextStep = function () {
        return this.path.length - 1 > this.step;
    };
    Character.prototype.hasChangedItsPath = function () {
        return !(this.newDestination === null);
    };
    Character.prototype.isNear = function (character, distance) {
        var dx, dy, near = false;
        dx = Math.abs(this.gridX - character.gridX);
        dy = Math.abs(this.gridY - character.gridY);
        if (dx <= distance && dy <= distance) {
            near = true;
        }
        return near;
    };
    Character.prototype.onAggro = function (callback) {
        this.aggro_callback = callback;
    };
    Character.prototype.onCheckAggro = function (callback) {
        this.checkaggro_callback = callback;
    };
    Character.prototype.checkAggro = function () {
        var _a;
        (_a = this.checkaggro_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    Character.prototype.aggro = function (character) {
        var _a;
        (_a = this.aggro_callback) === null || _a === void 0 ? void 0 : _a.call(this, character);
    };
    Character.prototype.onDeath = function (callback) {
        this.death_callback = callback;
    };
    Character.prototype.lookAtTarget = function () {
        if (this.target) {
            this.turnTo(this.getOrientationTo(this.target));
        }
    };
    Character.prototype.go = function (x, y) {
        if (this.isAttacking()) {
            this.disengage();
        }
        else if (this.followingMode) {
            this.followingMode = false;
            this.target = null;
        }
        this.moveTo_(x, y);
    };
    Character.prototype.follow = function (entity) {
        if (entity) {
            this.followingMode = true;
            this.moveTo_(entity.gridX, entity.gridY);
        }
    };
    Character.prototype.stop = function () {
        if (this.isMoving()) {
            this.interrupted = true;
        }
    };
    Character.prototype.engage = function (character) {
        this.attackingMode = true;
        this.setTarget(character);
        this.follow(character);
    };
    Character.prototype.disengage = function () {
        this.attackingMode = false;
        this.followingMode = false;
        this.removeTarget();
    };
    Character.prototype.isAttacking = function () {
        return this.attackingMode;
    };
    Character.prototype.getOrientationTo = function (character) {
        if (this.gridX < character.gridX) {
            return Types.Orientations.RIGHT;
        }
        else if (this.gridX > character.gridX) {
            return Types.Orientations.LEFT;
        }
        else if (this.gridY > character.gridY) {
            return Types.Orientations.UP;
        }
        else {
            return Types.Orientations.DOWN;
        }
    };
    Character.prototype.isAttackedBy = function (character) {
        return character.id in this.attackers;
    };
    Character.prototype.addAttacker = function (character) {
        if (!this.isAttackedBy(character)) {
            this.attackers[character.id] = character;
        }
        else {
            console.error(this.id + " is already attacked by " + character.id);
        }
    };
    Character.prototype.removeAttacker = function (character) {
        if (this.isAttackedBy(character)) {
            delete this.attackers[character.id];
        }
        else {
        }
    };
    Character.prototype.forEachAttacker = function (callback) {
        _.each(this.attackers, function (attacker) {
            callback(attacker);
        });
    };
    Character.prototype.setTarget = function (character) {
        var _a;
        if (((_a = this.target) === null || _a === void 0 ? void 0 : _a.id) !== character.id) {
            if (this.hasTarget()) {
                this.removeTarget();
            }
            this.unconfirmedTarget = null;
            this.target = character;
            if (this.settarget_callback) {
                var targetName = Types.getKindAsString(character.kind);
                this.settarget_callback(character, targetName);
            }
        }
        else {
            console.debug(character.id + " is already the target of " + this.id);
        }
    };
    Character.prototype.setSkillTargetId = function (mobId) {
        this.skillTargetId = mobId;
    };
    Character.prototype.onSetTarget = function (callback) {
        this.settarget_callback = callback;
    };
    Character.prototype.showTarget = function (character) {
        if (this.inspecting !== character) {
            this.inspecting = character;
            if (this.settarget_callback) {
                var targetName = Types.getKindAsString(character.kind);
                this.settarget_callback(character, targetName, true);
            }
        }
    };
    Character.prototype.removeTarget = function (withoutCallback) {
        if (this.target) {
            if (this.target instanceof Character) {
                this.target.removeAttacker(this);
            }
            if (this.removetarget_callback && !withoutCallback) {
                this.removetarget_callback(this.target.id);
            }
            this.target = null;
        }
    };
    Character.prototype.onRemoveTarget = function (callback) {
        this.removetarget_callback = callback;
    };
    Character.prototype.hasTarget = function () {
        return !(this.target === null);
    };
    Character.prototype.waitToAttack = function (character) {
        this.unconfirmedTarget = character;
    };
    Character.prototype.isWaitingToAttack = function (character) {
        return this.unconfirmedTarget === character;
    };
    Character.prototype.canAttack = function (time) {
        if (!this.isRaising() &&
            this.canReachTarget() &&
            this.attackCooldown.isOver(time, this.isSlowed) &&
            !this.isFrozen) {
            return true;
        }
        return false;
    };
    Character.prototype.canRaise = function (time) {
        if (this.raiseCooldown.isOver(time)) {
            return true;
        }
        return false;
    };
    Character.prototype.canReachTarget = function () {
        if (this.hasTarget() && this.isAdjacentNonDiagonal(this.target)) {
            return true;
        }
        return false;
    };
    Character.prototype.die = function (attacker) {
        var _a;
        if (attacker === void 0) { attacker = { type: null }; }
        this.removeTarget();
        this.isDead = true;
        (_a = this.death_callback) === null || _a === void 0 ? void 0 : _a.call(this, (attacker === null || attacker === void 0 ? void 0 : attacker.type) === "mob");
    };
    Character.prototype.onHasMoved = function (callback) {
        this.hasmoved_callback = callback;
    };
    Character.prototype.hasMoved = function () {
        this.setDirty();
        if (this.hasmoved_callback) {
            this.hasmoved_callback(this);
        }
    };
    Character.prototype.hurt = function () {
        this.stopHurting();
        this.sprite = this.sprite.whiteSprite;
        this.hurting = setTimeout(this.stopHurting.bind(this), 75);
    };
    Character.prototype.stopHurting = function () {
        this.sprite = this.normalSprite;
        clearTimeout(this.hurting);
    };
    Character.prototype.setAttackSpeed = function (bonus, weaponName) {
        var weaponKind = null;
        if (typeof weaponName === "string") {
            weaponKind = Types.getKindFromString(weaponName);
        }
        var animationSpeed = Math.round(Types.DEFAULT_ATTACK_ANIMATION_SPEED -
            Types.DEFAULT_ATTACK_ANIMATION_SPEED * (Types.calculateAttackSpeedCap(bonus, weaponKind) / 100));
        var attackSpeed = Math.round(Types.DEFAULT_ATTACK_SPEED -
            Types.DEFAULT_ATTACK_SPEED * (Types.calculateAttackSpeedCap(bonus, weaponKind) / 100));
        this.atkSpeed = animationSpeed;
        this.setAttackRate(attackSpeed);
    };
    Character.prototype.setAttackRate = function (rate) {
        this.attackCooldown = new Timer(rate);
    };
    Character.prototype.setFrozen = function (duration) {
        var _this = this;
        this.isFrozen = true;
        this.stop();
        this.currentAnimation.pause();
        clearTimeout(this.frozenTimeout);
        this.frozenTimeout = setTimeout(function () {
            _this.isFrozen = false;
            _this.frozenTimeout = null;
            _this.currentAnimation.play();
        }, duration);
    };
    Character.prototype.setSlowed = function (duration) {
        var _this = this;
        this.isSlowed = true;
        if (!this.originalAtkSpeed) {
            this.originalAtkSpeed = this.atkSpeed;
            this.originalMoveSpeed = this.moveSpeed;
            this.originalWalkSpeed = this.walkSpeed;
            this.originalIdleSpeed = this.idleSpeed;
            this.atkSpeed = this.atkSpeed * 3;
            this.moveSpeed = this.moveSpeed * 3;
            this.walkSpeed = this.walkSpeed * 3;
            this.idleSpeed = this.idleSpeed * 3;
        }
        clearTimeout(this.slowedTimeout);
        this.slowedTimeout = setTimeout(function () {
            _this.isSlowed = false;
            _this.slowedTimeout = null;
            _this.atkSpeed = _this.originalAtkSpeed;
            _this.moveSpeed = _this.originalMoveSpeed;
            _this.walkSpeed = _this.originalWalkSpeed;
            _this.idleSpeed = _this.originalIdleSpeed;
            _this.originalAtkSpeed = null;
            _this.originalMoveSpeed = null;
            _this.originalWalkSpeed = null;
            _this.originalIdleSpeed = null;
        }, duration);
    };
    Character.prototype.setPoisoned = function (duration) {
        var _this = this;
        this.isPoisoned = true;
        clearTimeout(this.poisonedTimeout);
        this.poisonedTimeout = setTimeout(function () {
            _this.isPoisoned = false;
            _this.poisonedTimeout = null;
        }, duration + 500);
    };
    Character.prototype.setCursed = function (curseId, duration) {
        var _this = this;
        this.curseId = curseId;
        clearTimeout(this.cursedTimeout);
        this.cursedTimeout = setTimeout(function () {
            _this.clearCursed();
        }, duration);
    };
    Character.prototype.clearCursed = function () {
        clearTimeout(this.cursedTimeout);
        this.curseId = null;
        this.cursedTimeout = null;
    };
    return Character;
}(Entity));
export default Character;
