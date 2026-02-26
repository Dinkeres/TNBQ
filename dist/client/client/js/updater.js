import { Types } from "../../shared/js/gametypes";
import Character from "./character";
import Spell from "./spell";
import Timer from "./timer";
var Updater = (function () {
    function Updater(game) {
        this.game = game;
        this.playerAggroTimer = new Timer(1000);
        this.isFading = false;
    }
    Updater.prototype.update = function () {
        this.updateZoning();
        this.updateCharacters();
        this.updatePlayerAggro();
        this.updateTransitions();
        this.updateAnimations();
        this.updateAnimatedTiles();
        this.updateHighAnimatedTiles();
        this.updateChatBubbles();
        this.updateInfos();
        this.updateKeyboardMovement();
    };
    Updater.prototype.updateCharacters = function () {
        var self = this;
        this.game.forEachEntity(function (entity) {
            var isCharacter = entity instanceof Character;
            if (entity.isLoaded) {
                if (isCharacter) {
                    self.updateCharacter(entity);
                    self.game.onCharacterUpdate(entity);
                }
                if (entity.isFading) {
                    self.updateEntityFading(entity);
                }
            }
        });
    };
    Updater.prototype.updatePlayerAggro = function () {
        var t = this.game.currentTime;
        var player = this.game.player;
        if (player && !player.isMoving() && !player.isDead && this.playerAggroTimer.isOver(t)) {
            player.checkAggro();
        }
    };
    Updater.prototype.updateEntityFading = function (entity) {
        if (entity && entity.isFading) {
            var duration = 1000;
            var t = this.game.currentTime;
            var dt = t - entity.startFadingTime;
            if (dt > duration) {
                this.isFading = false;
                entity.fadingAlpha = 1;
            }
            else {
                entity.fadingAlpha = dt / duration;
            }
        }
    };
    Updater.prototype.updateTransitions = function () {
        var self = this, m = null, z = this.game.currentZoning;
        this.game.forEachEntity(function (entity) {
            if (!entity || !entity.movement)
                return;
            m = entity.movement;
            if (m) {
                if (m.inProgress) {
                    m.step(self.game.currentTime);
                }
            }
        });
        if (z) {
            if (z.inProgress) {
                z.step(this.game.currentTime);
            }
        }
    };
    Updater.prototype.updateZoning = function () {
        var g = this.game, c = g.camera, z = g.currentZoning, ts = 16, speed = 180;
        var endValue;
        var offset;
        if (z && z.inProgress === false) {
            var orientation = this.game.zoningOrientation, startValue = (endValue = offset = 0), updateFunc = null, endFunc = null;
            if (orientation === Types.Orientations.LEFT || orientation === Types.Orientations.RIGHT) {
                offset = (c.gridW - 2) * ts;
                startValue = orientation === Types.Orientations.LEFT ? c.x - ts : c.x + ts;
                endValue = orientation === Types.Orientations.LEFT ? c.x - offset : c.x + offset;
                updateFunc = function (x) {
                    c.setPosition(x, c.y);
                    g.initAnimatedTiles();
                    g.renderer.renderStaticCanvases();
                };
                endFunc = function () {
                    c.setPosition(z.endValue, c.y);
                    g.endZoning();
                };
            }
            else if (orientation === Types.Orientations.UP || orientation === Types.Orientations.DOWN) {
                offset = (c.gridH - 2) * ts;
                startValue = orientation === Types.Orientations.UP ? c.y - ts : c.y + ts;
                endValue = orientation === Types.Orientations.UP ? c.y - offset : c.y + offset;
                updateFunc = function (y) {
                    c.setPosition(c.x, y);
                    g.initAnimatedTiles();
                    g.renderer.renderStaticCanvases();
                };
                endFunc = function () {
                    c.setPosition(c.x, z.endValue);
                    g.endZoning();
                };
            }
            z.start(this.game.currentTime, updateFunc, endFunc, startValue, endValue, speed);
        }
    };
    Updater.prototype.updateCharacter = function (c) {
        var tick = Math.round(16 / Math.round(c.moveSpeed / (1000 / this.game.renderer.FPS)));
        if (c instanceof Spell && c.target) {
            var timeDiff = c.getTimeDiff();
            var mDistance = c.moveSpeed * timeDiff, dx = c.target.x - c.x, dy = c.target.y - c.y, tDistance = Math.sqrt(dx * dx + dy * dy), amount = mDistance / tDistance;
            if (amount > 1)
                amount = 1;
            if (!c.isDead) {
                c.x += dx * amount;
                c.y += dy * amount;
                if (isNaN(c.y)) {
                    return;
                }
                if (Math.floor(c.y / 16) !== c.gridY) {
                    this.game.removeFromRenderingGrid(c, c.gridX, c.gridY);
                    c.gridY = Math.floor(c.y / 16);
                    if (typeof c.gridY === "number" && !isNaN(c.gridY)) {
                        this.game.addToRenderingGrid(c, c.gridX, c.gridY);
                    }
                }
            }
            if (!c.isDead && this.game.player) {
                var keepUntilDie = [Types.Entities.DEATHBRINGERSPELL].includes(c.kind);
                var isPlayerHit = !c.hasHurtPlayer
                    ? Math.abs(this.game.player.x - c.x) <= 8 && Math.abs(this.game.player.y - c.y) <= 8
                    : false;
                var isGridOrAnyPlayerHit = !keepUntilDie && !isPlayerHit
                    ? this.game.pathingGrid[Math.round(c.y / 16)][Math.round(c.x / 16)] &&
                        this.game.isPlayerAt(Math.round(c.x / 16), Math.round(c.y / 16))
                    : false;
                if (isPlayerHit) {
                    c.hasHurtPlayer = true;
                    this.game.makePlayerHurtFromSpell(c);
                }
                if (!keepUntilDie && (isPlayerHit || isGridOrAnyPlayerHit || tDistance < 1)) {
                    c.die();
                }
            }
            c.lastUpdate = this.game.currentTime;
            return;
        }
        if (c.isMoving() && c.movement.inProgress === false) {
            if (c.orientation === Types.Orientations.LEFT) {
                c.movement.start(this.game.currentTime, function (x) {
                    c.x = x;
                    c.hasMoved();
                }, function () {
                    c.x = c.movement.endValue;
                    c.hasMoved();
                    c.nextStep();
                }, c.x - tick, c.x - 16, c.moveSpeed);
            }
            else if (c.orientation === Types.Orientations.RIGHT) {
                c.movement.start(this.game.currentTime, function (x) {
                    c.x = x;
                    c.hasMoved();
                }, function () {
                    c.x = c.movement.endValue;
                    c.hasMoved();
                    c.nextStep();
                }, c.x + tick, c.x + 16, c.moveSpeed);
            }
            else if (c.orientation === Types.Orientations.UP) {
                c.movement.start(this.game.currentTime, function (y) {
                    c.y = y;
                    c.hasMoved();
                }, function () {
                    c.y = c.movement.endValue;
                    c.hasMoved();
                    c.nextStep();
                }, c.y - tick, c.y - 16, c.moveSpeed);
            }
            else if (c.orientation === Types.Orientations.DOWN) {
                c.movement.start(this.game.currentTime, function (y) {
                    c.y = y;
                    c.hasMoved();
                }, function () {
                    c.y = c.movement.endValue;
                    c.hasMoved();
                    c.nextStep();
                }, c.y + tick, c.y + 16, c.moveSpeed);
            }
            else if (c.orientation === Types.Orientations.DOWN_LEFT) {
                c.movement.start(this.game.currentTime, function (x, y) {
                    c.x = x;
                    c.y = y;
                    c.hasMoved();
                }, function () {
                    c.x = c.movement.endValue;
                    c.y = c.movement.endValue1;
                    c.hasMoved();
                    c.nextStep();
                }, c.x - tick, c.x - 16, c.moveSpeed, c.y + tick, c.y + 16);
            }
            else if (c.orientation === Types.Orientations.DOWN_RIGHT) {
                c.movement.start(this.game.currentTime, function (x, y) {
                    c.x = x;
                    c.y = y;
                    c.hasMoved();
                }, function () {
                    c.x = c.movement.endValue;
                    c.y = c.movement.endValue1;
                    c.hasMoved();
                    c.nextStep();
                }, c.x + tick, c.x + 16, c.moveSpeed, c.y + tick, c.y + 16);
            }
            else if (c.orientation === Types.Orientations.UP_LEFT) {
                c.movement.start(this.game.currentTime, function (x, y) {
                    c.x = x;
                    c.y = y;
                    c.hasMoved();
                }, function () {
                    c.x = c.movement.endValue;
                    c.y = c.movement.endValue1;
                    c.hasMoved();
                    c.nextStep();
                }, c.x - tick, c.x - 16, c.moveSpeed, c.y - tick, c.y - 16);
            }
            else if (c.orientation === Types.Orientations.UP_RIGHT) {
                c.movement.start(this.game.currentTime, function (x, y) {
                    c.x = x;
                    c.y = y;
                    c.hasMoved();
                }, function () {
                    c.x = c.movement.endValue;
                    c.y = c.movement.endValue1;
                    c.hasMoved();
                    c.nextStep();
                }, c.x + tick, c.x + 16, c.moveSpeed, c.y - tick, c.y - 16);
            }
        }
    };
    Updater.prototype.updateKeyboardMovement = function () {
        if (!this.game.player || this.game.player.isMoving())
            return;
        var game = this.game;
        var player = this.game.player;
        var pos = {
            x: player.gridX,
            y: player.gridY,
        };
        if (player.moveUp) {
            pos.y -= 1;
            game.keys(pos);
        }
        else if (player.moveDown) {
            pos.y += 1;
            game.keys(pos);
        }
        else if (player.moveRight) {
            pos.x += 1;
            game.keys(pos);
        }
        else if (player.moveLeft) {
            pos.x -= 1;
            game.keys(pos);
        }
    };
    Updater.prototype.updateAnimations = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        var t = this.game.currentTime;
        this.game.forEachEntity(function (entity) {
            var anim = entity.currentAnimation;
            if (anim) {
                if (anim.update(t)) {
                    entity.setDirty();
                }
            }
        });
        (_a = this.game.sparksAnimation) === null || _a === void 0 ? void 0 : _a.update(t);
        (_b = this.game.targetAnimation) === null || _b === void 0 ? void 0 : _b.update(t);
        (_c = this.game.levelupAnimation) === null || _c === void 0 ? void 0 : _c.update(t);
        (_d = this.game.drainLifeAnimation) === null || _d === void 0 ? void 0 : _d.update(t);
        (_e = this.game.thunderstormAnimation) === null || _e === void 0 ? void 0 : _e.update(t);
        (_f = this.game.highHealthAnimation) === null || _f === void 0 ? void 0 : _f.update(t);
        (_g = this.game.freezeAnimation) === null || _g === void 0 ? void 0 : _g.update(t);
        (_h = this.game.resistanceAnimation) === null || _h === void 0 ? void 0 : _h.update(t);
        (_j = this.game.arcaneAnimation) === null || _j === void 0 ? void 0 : _j.update(t);
        (_k = this.game.paladinAnimation) === null || _k === void 0 ? void 0 : _k.update(t);
        (_l = this.game.healthRegenerateAnimation) === null || _l === void 0 ? void 0 : _l.update(t);
        (_m = this.game.anvilAnimation) === null || _m === void 0 ? void 0 : _m.update(t);
        (_o = this.game.defenseSkillAnimation) === null || _o === void 0 ? void 0 : _o.update(t);
        (_p = this.game.skillResistanceAnimation) === null || _p === void 0 ? void 0 : _p.update(t);
        (_q = this.game.skillCastAnimation) === null || _q === void 0 ? void 0 : _q.update(t);
        (_r = this.game.skillMagicAnimation) === null || _r === void 0 ? void 0 : _r.update(t);
        (_s = this.game.skillFlameAnimation) === null || _s === void 0 ? void 0 : _s.update(t);
        (_t = this.game.skillLightningAnimation) === null || _t === void 0 ? void 0 : _t.update(t);
        (_u = this.game.skillColdAnimation) === null || _u === void 0 ? void 0 : _u.update(t);
        (_v = this.game.skillPoisonAnimation) === null || _v === void 0 ? void 0 : _v.update(t);
        (_w = this.game.curseHealthAnimation) === null || _w === void 0 ? void 0 : _w.update(t);
        (_x = this.game.curseResistanceAnimation) === null || _x === void 0 ? void 0 : _x.update(t);
        (_y = this.game.weaponEffectAnimation) === null || _y === void 0 ? void 0 : _y.update(t);
    };
    Updater.prototype.updateAnimatedTiles = function (isHighTile) {
        if (isHighTile === void 0) { isHighTile = false; }
        var self = this;
        var t = this.game.currentTime;
        var callback = function (tile) {
            if (tile.animate(t)) {
                tile.isDirty = true;
                tile.dirtyRect = self.game.renderer.getTileBoundingRect(tile);
                if (self.game.renderer.mobile || self.game.renderer.tablet) {
                    self.game.checkOtherDirtyRects(tile.dirtyRect, tile, tile.x, tile.y);
                }
            }
        };
        if (isHighTile) {
            this.game.forEachHighAnimatedTile(callback);
        }
        else {
            this.game.forEachAnimatedTile(callback);
        }
    };
    Updater.prototype.updateHighAnimatedTiles = function () {
        this.updateAnimatedTiles(true);
    };
    Updater.prototype.updateChatBubbles = function () {
        var t = this.game.currentTime;
        this.game.bubbleManager.update(t);
    };
    Updater.prototype.updateInfos = function () {
        var t = this.game.currentTime;
        this.game.infoManager.update(t);
    };
    return Updater;
}());
export default Updater;
