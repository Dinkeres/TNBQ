import * as _ from "lodash";
import { Types } from "../../shared/js/gametypes";
import Camera from "./camera";
import Character from "./character";
import Detect from "./detect";
import Item from "./item";
import Pet from "./pet";
import Player from "./player";
import Timer from "./timer";
var Renderer = (function () {
    function Renderer(game, canvas, background, foreground) {
        this.game = game;
        this.context = canvas && canvas.getContext ? canvas.getContext("2d") : null;
        this.background = background && background.getContext ? background.getContext("2d") : null;
        this.foreground = foreground && foreground.getContext ? foreground.getContext("2d") : null;
        this.canvas = canvas;
        this.backcanvas = background;
        this.forecanvas = foreground;
        this.initFPS();
        this.tilesize = 16;
        this.adminBadgeImg = null;
        this.isDrawEntityName = true;
        this.upscaledRendering = true;
        this.supportsSilhouettes = this.upscaledRendering;
        this.rescale();
        this.lastTime = new Date();
        this.frameCount = 0;
        this.maxFPS = this.FPS;
        this.realFPS = 0;
        this.animatedTileCount = 0;
        this.highAnimatedTileCount = 0;
        this.highTileCount = 0;
        this.tablet = Detect.isTablet(window.innerWidth);
        this.fixFlickeringTimer = new Timer(100);
        this.brightnessMap = {
            7: 125,
            8: 160,
            9: 200,
            10: 250,
        };
    }
    Renderer.prototype.getWidth = function () {
        return this.canvas.width;
    };
    Renderer.prototype.getHeight = function () {
        return this.canvas.height;
    };
    Renderer.prototype.setTileset = function (tileset) {
        this.tileset = tileset;
    };
    Renderer.prototype.getScaleFactor = function () {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var scale;
        this.mobile = false;
        if (w <= 1000) {
            scale = 2;
            this.mobile = true;
        }
        else if (w <= 1500 || h <= 870) {
            scale = 2;
        }
        else {
            scale = 3;
        }
        return scale;
    };
    Renderer.prototype.rescale = function () {
        this.scale = this.getScaleFactor();
        this.createCamera();
        this.context.imageSmoothingEnabled = false;
        this.background.imageSmoothingEnabled = false;
        this.foreground.imageSmoothingEnabled = false;
        this.initFont();
        this.initFPS();
        if (this.game.renderer) {
            this.game.setSpriteScale(this.scale);
        }
    };
    Renderer.prototype.createCamera = function () {
        this.camera = new Camera(this);
        this.camera.rescale();
        this.canvas.width = this.camera.gridW * this.tilesize * this.scale;
        this.canvas.height = this.camera.gridH * this.tilesize * this.scale;
        console.debug("#entities set to " + this.canvas.width + " x " + this.canvas.height);
        this.backcanvas.width = this.canvas.width;
        this.backcanvas.height = this.canvas.height;
        console.debug("#background set to " + this.backcanvas.width + " x " + this.backcanvas.height);
        this.forecanvas.width = this.canvas.width;
        this.forecanvas.height = this.canvas.height;
        console.debug("#foreground set to " + this.forecanvas.width + " x " + this.forecanvas.height);
    };
    Renderer.prototype.initFPS = function () {
        this.FPS = this.mobile ? 50 : 50;
    };
    Renderer.prototype.initFont = function () {
        var fontsize;
        switch (this.scale) {
            case 1:
                fontsize = 10;
                break;
            case 2:
                fontsize = Detect.isWindows() ? 10 : 13;
                break;
            case 3:
                fontsize = 20;
        }
        this.setFontSize(fontsize);
    };
    Renderer.prototype.setFontSize = function (size) {
        var font = size + "px GraphicPixel";
        this.context.font = font;
        this.background.font = font;
    };
    Renderer.prototype.drawText = function (text, x, y, centered, color, strokeColor) {
        var ctx = this.context;
        var strokeSize;
        switch (this.scale) {
            case 1:
                strokeSize = 3;
                break;
            case 2:
                strokeSize = 3;
                break;
            case 3:
                strokeSize = 5;
        }
        if (text && x && y) {
            ctx.save();
            if (centered) {
                ctx.textAlign = "center";
            }
            ctx.strokeStyle = strokeColor || "#373737";
            ctx.lineWidth = strokeSize;
            ctx.strokeText(text, x, y);
            ctx.fillStyle = color || "white";
            ctx.fillText(text, x, y);
            ctx.restore();
        }
    };
    Renderer.prototype.drawAdminBadge = function (x, y) {
        var _this = this;
        var ctx = this.context;
        var svgData = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%239B59B6' d='M 19.487 5.126 L 10.487 0.126 C 10.184 -0.042 9.81798 -0.042 9.51498 0.126 L 0.514977 5.126 C 0.197977 5.302 0.000976562 5.636 0.000976562 5.999 C 0.000976562 6.693 0.114977 22.999 10.001 22.999 C 19.887 22.999 20.001 6.693 20.001 5.999 C 20.001 5.636 19.804 5.302 19.487 5.126 Z M 10.001 5.999 C 11.382 5.999 12.501 7.118 12.501 8.499 C 12.501 9.88 11.382 10.999 10.001 10.999 C 8.61998 10.999 7.50098 9.88 7.50098 8.499 C 7.50098 7.118 8.61998 5.999 10.001 5.999 Z M 6.25098 16 C 6.25098 13.699 7.69998 12.25 10.001 12.25 C 12.302 12.25 13.751 13.699 13.751 16 H 6.25098 Z'/%3E%3C/svg%3E";
        var w = 20;
        var h = 20;
        if (!this.adminBadgeImg) {
            var img = new Image();
            img.src = svgData;
            img.crossOrigin = "Anonymous";
            img.onload = function () {
                _this.adminBadgeImg = img;
                _this.context.save();
                ctx.drawImage(img, x, y, w, h);
                _this.context.restore();
            };
        }
        else {
            this.context.save();
            ctx.drawImage(this.adminBadgeImg, x, y, w, h);
            this.context.restore();
        }
    };
    Renderer.prototype.drawCellRect = function (x, y, color) {
        this.context.save();
        this.context.lineWidth = 2 * this.scale;
        this.context.strokeStyle = color;
        this.context.translate(x + 2, y + 2);
        this.context.strokeRect(0, 0, this.tilesize * this.scale - 4, this.tilesize * this.scale - 4);
        this.context.restore();
    };
    Renderer.prototype.drawRectStroke = function (x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, this.tilesize * this.scale * width, this.tilesize * this.scale * height);
        this.context.fill();
        this.context.lineWidth = 5;
        this.context.strokeStyle = "black";
        this.context.strokeRect(x, y, this.tilesize * this.scale * width, this.tilesize * this.scale * height);
    };
    Renderer.prototype.drawRect = function (x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, this.tilesize * this.scale * width, this.tilesize * this.scale * height);
    };
    Renderer.prototype.drawCellHighlight = function (x, y, color) {
        var s = this.scale, ts = this.tilesize, tx = x * ts * s, ty = y * ts * s;
        this.drawCellRect(tx, ty, color);
    };
    Renderer.prototype.drawTargetCell = function () {
        var mouse = this.game.getMouseGridPosition();
        if (this.game.targetCellVisible && !(mouse.x === this.game.selectedX && mouse.y === this.game.selectedY)) {
            this.drawCellHighlight(mouse.x, mouse.y, this.game.targetColor);
        }
    };
    Renderer.prototype.drawAttackTargetCell = function () {
        var mouse = this.game.getMouseGridPosition(), entity = this.game.getEntityAt(mouse.x, mouse.y), s = this.scale;
        if (entity) {
            this.drawCellRect(entity.x * s, entity.y * s, "rgba(255, 0, 0, 0.5)");
        }
    };
    Renderer.prototype.drawPathingCells = function () {
        var pathingGrid = this.game.pathingGrid;
        var entityGrid = this.game.entityGrid;
        if (pathingGrid && this.game.debug && this.game.debugPathing) {
            for (var y = 0; y < pathingGrid.length; y += 1) {
                for (var x = 0; x < pathingGrid[y].length; x += 1) {
                    if (pathingGrid[y][x] === 1 && this.game.camera.isVisiblePosition(x, y)) {
                        this.drawCellHighlight(x, y, "rgba(50, 50, 255, 0.5)");
                    }
                }
            }
        }
        if (entityGrid && this.game.debug && this.game.debugPathing) {
            for (var y = 0; y < entityGrid.length; y += 1) {
                for (var x = 0; x < entityGrid[y].length; x += 1) {
                    if (this.game.camera.isVisiblePosition(x, y) && Object.keys(entityGrid[y][x]).length) {
                        this.drawCellHighlight(x, y, "rgba(255, 255, 0, 0.5)");
                    }
                }
            }
        }
    };
    Renderer.prototype.drawSelectedCell = function () {
        var sprite = this.game.cursors["target"], anim = this.game.targetAnimation, os = this.upscaledRendering ? 1 : this.scale, ds = this.upscaledRendering ? this.scale : 1;
        if (this.game.selectedCellVisible) {
            if (this.mobile || this.tablet) {
                if (this.game.drawTarget) {
                    var x = this.game.selectedX;
                    var y = this.game.selectedY;
                    this.drawCellHighlight(this.game.selectedX, this.game.selectedY, "rgb(51, 255, 0)");
                    this.lastTargetPos = { x: x, y: y };
                    this.game.drawTarget = false;
                }
            }
            else {
                if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
                    var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ts = 16, dx = this.game.selectedX * ts * s, dy = this.game.selectedY * ts * s, dw = w * ds, dh = h * ds;
                    this.context.save();
                    this.context.translate(dx, dy);
                    this.context.drawImage(sprite.image, x, y, w, h, 0, 0, dw, dh);
                    this.context.restore();
                }
            }
        }
    };
    Renderer.prototype.clearScaledRect = function (ctx, x, y, w, h) {
        var s = this.scale;
        ctx.clearRect(x * s, y * s, w * s, h * s);
    };
    Renderer.prototype.drawCursor = function () {
        var mx = this.game.mouse.x, my = this.game.mouse.y, s = this.scale, os = this.upscaledRendering ? 1 : this.scale;
        this.context.save();
        if (this.game.currentCursor && this.game.currentCursor.isLoaded) {
            this.context.drawImage(this.game.currentCursor.image, 0, 0, 14 * os, 14 * os, mx, my, 14 * s, 14 * s);
        }
        this.context.restore();
    };
    Renderer.prototype.drawScaledImage = function (ctx, image, x, y, w, h, dx, dy) {
        var s = this.upscaledRendering ? 1 : this.scale;
        _.each(arguments, function (arg) {
            if (_.isUndefined(arg) || _.isNaN(arg) || _.isNull(arg) || arg < 0) {
                console.error("x:" + x + " y:" + y + " w:" + w + " h:" + h + " dx:" + dx + " dy:" + dy);
                throw Error("A problem occured when trying to draw on the canvas");
            }
        });
        ctx.drawImage(image, x * s, y * s, w * s, h * s, dx * this.scale, dy * this.scale, w * this.scale, h * this.scale);
    };
    Renderer.prototype.drawTile = function (ctx, tileid, cellid) {
        var s = this.upscaledRendering ? 1 : this.scale;
        if (tileid !== -1) {
            var tileset = this.getTileset(tileid);
            if (!tileset) {
                console.log("~~~~tileid", tileid);
                return;
            }
            if (!tileset.image) {
                tileset.image = this.game.map._loadTileset("img/1/".concat(tileset.name, ".png"));
            }
            else {
                this.drawScaledImage(ctx, tileset.image, getX(tileid - tileset.firstgid + 2, tileset.columns / s) * this.tilesize, Math.floor((tileid - tileset.firstgid + 1) / (tileset.columns / s)) * this.tilesize, this.tilesize, this.tilesize, getX(cellid + 1, this.game.map.width) * this.tilesize, Math.floor(cellid / this.game.map.width) * this.tilesize);
            }
        }
    };
    Renderer.prototype.getTileset = function (tileId) {
        return this.game.map.tilesets.find(function (_a) {
            var firstgid = _a.firstgid, tilecount = _a.tilecount;
            return tileId >= firstgid && tileId <= firstgid + tilecount;
        });
    };
    Renderer.prototype.clearTile = function (ctx, gridW, cellid) {
        var s = this.scale, ts = this.tilesize, x = getX(cellid + 1, gridW) * ts * s, y = Math.floor(cellid / gridW) * ts * s, w = ts * s, h = w;
        ctx.clearRect(x, y, h, w);
    };
    Renderer.prototype.calculateBrightnessPerLevel = function (level) {
        var factor = (level - 6) * 25;
        var milliseconds = Math.floor(this.game.currentTime / 100);
        var ms = milliseconds % 10;
        var isEven = (Math.floor(milliseconds / 10) % 10) % 2;
        var brightness = this.brightnessMap[level];
        if (isEven) {
            if (ms <= 2) {
                brightness = brightness - Math.floor(factor * 1);
            }
            else if (ms === 3) {
                brightness = brightness - Math.floor(factor * 0.9);
            }
            else if (ms === 4) {
                brightness = brightness - Math.floor(factor * 0.75);
            }
            else if (ms === 5) {
                brightness = brightness - Math.floor(factor * 0.6);
            }
            else if (ms === 6) {
                brightness = brightness - Math.floor(factor * 0.45);
            }
            else if (ms === 7) {
                brightness = brightness - Math.floor(factor * 0.3);
            }
            else if (ms === 8) {
                brightness = brightness - Math.floor(factor * 0.15);
            }
            else if (ms === 9) {
                brightness = brightness - Math.floor(factor * 0);
            }
        }
        else {
            if (ms === 0) {
                brightness = brightness - Math.floor(factor * 0);
            }
            else if (ms === 1) {
                brightness = brightness - Math.floor(factor * 0.15);
            }
            else if (ms === 2) {
                brightness = brightness - Math.floor(factor * 0.3);
            }
            else if (ms === 3) {
                brightness = brightness - Math.floor(factor * 0.45);
            }
            else if (ms === 4) {
                brightness = brightness - Math.floor(factor * 0.6);
            }
            else if (ms === 5) {
                brightness = brightness - Math.floor(factor * 0.75);
            }
            else if (ms === 6) {
                brightness = brightness - Math.floor(factor * 0.9);
            }
            else if (ms >= 7) {
                brightness = brightness - Math.floor(factor * 1);
            }
        }
        return brightness;
    };
    Renderer.prototype.drawCape = function (entity) {
        if (!entity.cape || entity.isDead)
            return;
        var sprite = this.game.getSprite("cape");
        var anim = entity.currentAnimation;
        var spriteImage = sprite.image;
        if (entity.capeLevel >= 7) {
            spriteImage = sprite.image7;
        }
        if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
            var os = this.upscaledRendering ? 1 : this.scale;
            var ds = this.upscaledRendering ? this.scale : 1;
            var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ox = sprite.offsetX * s, oy = sprite.offsetY * s, dw = w * ds, dh = h * ds;
            var filter = "";
            if (entity === null || entity === void 0 ? void 0 : entity.settings.effects) {
                if (typeof entity.capeHue === "number") {
                    filter += " hue-rotate(".concat(entity.settings.capeHue, "deg)");
                }
                if (typeof (entity === null || entity === void 0 ? void 0 : entity.capeSaturate) === "number") {
                    filter += " saturate(".concat(entity.settings.capeSaturate, "%)");
                }
                if (typeof (entity === null || entity === void 0 ? void 0 : entity.capeContrast) === "number") {
                    filter += " contrast(".concat(entity.settings.capeContrast, "%)");
                }
                if (typeof (entity === null || entity === void 0 ? void 0 : entity.capeBrightness) === "number") {
                    filter += " brightness(".concat(entity.settings.capeBrightness, ")");
                }
            }
            this.context.filter = filter;
            this.context.drawImage(spriteImage, x, y, w, h, ox, oy, dw, dh);
            this.context.filter = "none";
        }
    };
    Renderer.prototype.drawShield = function (entity) {
        var _a;
        if (!entity.shieldName || entity.isDead)
            return;
        var sprite = this.game.getSprite(entity.shieldName);
        var anim = entity.currentAnimation;
        var spriteImage = sprite.image;
        var isFilterApplied = false;
        if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
            var os = this.upscaledRendering ? 1 : this.scale;
            var ds = this.upscaledRendering ? this.scale : 1;
            var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ox = sprite.offsetX * s, oy = sprite.offsetY * s, dw = w * ds, dh = h * ds;
            if (entity.shieldLevel >= 7 && ((_a = this.game.player) === null || _a === void 0 ? void 0 : _a.settings.effects)) {
                isFilterApplied = true;
                var brightness = this.calculateBrightnessPerLevel(entity.shieldLevel);
                this.context.filter = "brightness(".concat(brightness, "%)");
            }
            this.context.drawImage(spriteImage, x, y, w, h, ox, oy, dw, dh);
            if (isFilterApplied) {
                this.context.filter = "brightness(100%)";
            }
        }
    };
    Renderer.prototype.drawHelm = function (entity) {
        var _a, _b;
        if (entity.isDead)
            return;
        var sprite = this.game.getSprite(entity.helmName);
        var anim = entity.currentAnimation;
        var spriteImage = sprite.image;
        if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
            var os = this.upscaledRendering ? 1 : this.scale;
            var ds = this.upscaledRendering ? this.scale : 1;
            var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ox = sprite.offsetX * s, oy = sprite.offsetY * s, dw = w * ds, dh = h * ds;
            this.context.filter = "";
            if (entity.helmLevel >= 7 && ((_a = this.game.player) === null || _a === void 0 ? void 0 : _a.settings.effects)) {
                var brightness = this.calculateBrightnessPerLevel(entity.helmLevel);
                this.context.filter += "brightness(".concat(brightness, "%) ");
            }
            if (entity.isFrozen || entity.isSlowed) {
                this.context.filter = "sepia(100%) hue-rotate(190deg) saturate(500%)";
            }
            else {
                if (entity.type === "mob" && Types.isMiniBoss(entity)) {
                    this.context.filter = "grayscale(100%) sepia(100%) saturate(150%) hue-rotate(260deg)";
                }
                else if (entity.isPoisoned && !Types.isBoss(entity.kind)) {
                    this.context.filter = "grayscale(100%) sepia(100%) hue-rotate(90deg)";
                }
            }
            if ([
                "helmhorned",
                "helmfrozen",
                "helmdiamond",
                "helmemerald",
                "helmexecutioner",
                "helmtemplar",
                "helmdragon",
                "helmmoon",
                "helchristmas",
                "helmdemon",
                "helmmystical",
                "helmimmortal",
                "helmpaladin",
            ].includes(sprite.name) &&
                ((_b = entity.helmBonus) === null || _b === void 0 ? void 0 : _b.length)) {
                spriteImage = sprite.imageunique;
            }
            this.context.drawImage(spriteImage, x, y, w, h, ox, oy, dw, dh);
            this.context.filter = "none";
        }
    };
    Renderer.prototype.setDrawEntityName = function (isDrawEntityName) {
        this.isDrawEntityName = isDrawEntityName;
    };
    Renderer.prototype.drawEntity = function (entity) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        var sprite = entity.sprite, shadow = this.game.shadows["small"], anim = entity.currentAnimation, os = this.upscaledRendering ? 1 : this.scale, ds = this.upscaledRendering ? this.scale : 1;
        if (anim && (sprite === null || sprite === void 0 ? void 0 : sprite.width)) {
            var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ox = sprite.offsetX * s, oy = sprite.offsetY * s, dx = entity.x * s, dy = entity.y * s, dw = w * ds, dh = h * ds;
            if (entity.isFading) {
                this.context.save();
                this.context.globalAlpha = entity.fadingAlpha;
            }
            if (this.isDrawEntityName && !this.mobile && !this.tablet) {
                this.drawEntityName(entity);
            }
            this.context.save();
            if (entity.flipSpriteX) {
                this.context.translate(dx + this.tilesize * s, dy);
                this.context.scale(-1, 1);
            }
            else if (entity.flipSpriteY) {
                this.context.translate(dx, dy + dh);
                this.context.scale(1, -1);
            }
            else {
                this.context.translate(dx, dy);
            }
            if (entity.angled) {
                this.context.translate(8, 8);
                this.context.rotate(entity.getAngle());
            }
            if (entity.isVisible()) {
                if (entity.hasShadow()) {
                    this.context.drawImage(shadow.image, 0, 0, shadow.width * os, shadow.height * os, 0, entity.shadowOffsetY * ds, shadow.width * os * ds, shadow.height * os * ds);
                }
                if (entity instanceof Character && entity.auras.length && ((_a = this.game.player) === null || _a === void 0 ? void 0 : _a.settings.effects)) {
                    entity.auras.forEach(function (aura) {
                        var sprite = null;
                        var anim = null;
                        if (aura === "drainlife") {
                            sprite = _this.game.getSprite("aura-drainlife");
                            anim = _this.game.drainLifeAnimation;
                        }
                        else if (aura === "thunderstorm") {
                            sprite = _this.game.getSprite("aura-thunderstorm");
                            anim = _this.game.thunderstormAnimation;
                        }
                        else if (aura === "highhealth") {
                            sprite = _this.game.getSprite("aura-highhealth");
                            anim = _this.game.highHealthAnimation;
                        }
                        else if (aura === "freeze") {
                            sprite = _this.game.getSprite("aura-freeze");
                            anim = _this.game.freezeAnimation;
                        }
                        else if (aura === "lowerresistance") {
                            sprite = _this.game.getSprite("aura-lowerresistance");
                            anim = _this.game.resistanceAnimation;
                        }
                        else if (aura === "arcane") {
                            sprite = _this.game.getSprite("aura-arcane");
                            anim = _this.game.arcaneAnimation;
                        }
                        else if (aura === "paladin") {
                            sprite = _this.game.getSprite("aura-paladin");
                            anim = _this.game.paladinAnimation;
                        }
                        else if (aura === "health-regenerate") {
                            sprite = _this.game.getSprite("aura-health-regenerate");
                            anim = _this.game.healthRegenerateAnimation;
                        }
                        if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
                            var os = _this.upscaledRendering ? 1 : _this.scale;
                            var ds = _this.upscaledRendering ? _this.scale : 1;
                            var frame = anim.currentFrame, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, dw = w * ds, dh = h * ds, ox = sprite.offsetX * s, oy = sprite.offsetY * s;
                            _this.context.drawImage(sprite.image, x, y, w, h, ox, oy, dw, dh);
                        }
                    });
                }
                var isFilterApplied = false;
                var spriteImage = sprite.image;
                if (entity instanceof Player) {
                    if (entity.capeOrientation !== Types.Orientations.UP) {
                        this.drawCape(entity);
                    }
                    if (entity.capeOrientation === Types.Orientations.UP) {
                        this.drawShield(entity);
                        if (!entity.invincible) {
                            this.drawHelm(entity);
                        }
                    }
                    if (sprite.name === entity.armorName && entity.armorLevel >= 7 && ((_b = this.game.player) === null || _b === void 0 ? void 0 : _b.settings.effects)) {
                        isFilterApplied = true;
                        var brightness = this.calculateBrightnessPerLevel(entity.armorLevel);
                        this.context.filter = "brightness(".concat(brightness, "%)");
                    }
                }
                else if (entity instanceof Pet && entity.level >= 7 && ((_c = this.game.player) === null || _c === void 0 ? void 0 : _c.settings.effects)) {
                    isFilterApplied = true;
                    var brightness = this.calculateBrightnessPerLevel(entity.level);
                    this.context.filter = "brightness(".concat(brightness, "%)");
                }
                if (entity.isFrozen || entity.isSlowed) {
                    this.context.filter = "sepia(100%) hue-rotate(190deg) saturate(500%)";
                }
                else {
                    if (entity.type === "mob" && Types.isMiniBoss(entity)) {
                        this.context.filter = "grayscale(100%) sepia(100%) saturate(150%) hue-rotate(260deg)";
                    }
                    else if (entity.isPoisoned && !Types.isBoss(entity.kind)) {
                        this.context.filter = "grayscale(100%) sepia(100%) hue-rotate(90deg)";
                    }
                }
                this.context.drawImage(spriteImage, x, y, w, h, ox, oy, dw, dh);
                this.context.filter = "none";
                if (isFilterApplied) {
                    this.context.filter = "brightness(100%)";
                }
                if (entity instanceof Player) {
                    if (entity.capeOrientation === Types.Orientations.UP) {
                        this.drawCape(entity);
                    }
                    if (entity.capeOrientation !== Types.Orientations.UP) {
                        if (!entity.invincible) {
                            this.drawHelm(entity);
                        }
                        this.drawShield(entity);
                    }
                }
                if (entity instanceof Item && entity.kind !== Types.Entities.CAKE) {
                    var sparks = this.game.getSprite("sparks"), anim = this.game.sparksAnimation, frame = anim.currentFrame, sx = sparks.width * frame.index * os, sy = sparks.height * anim.row * os, sw = sparks.width * os, sh = sparks.width * os;
                    this.context.drawImage(sparks.image, sx, sy, sw, sh, sparks.offsetX * s, sparks.offsetY * s, sw * ds, sh * ds);
                }
            }
            if (entity instanceof Player && !entity.isDead && entity.hasWeapon()) {
                var weapon = this.game.getSprite(entity.getWeaponName());
                if (weapon === null || weapon === void 0 ? void 0 : weapon.width) {
                    var weaponAnimData = weapon.animationData[anim.name];
                    var index = frame.index < weaponAnimData.length ? frame.index : frame.index % weaponAnimData.length;
                    var wx = weapon.width * index * os;
                    var wy = weapon.height * anim.row * os;
                    var ww = weapon.width * os;
                    var wh = weapon.height * os;
                    var isFilterApplied = false;
                    if (entity.weaponLevel >= 7 && ((_d = this.game.player) === null || _d === void 0 ? void 0 : _d.settings.effects)) {
                        isFilterApplied = true;
                        var brightness = this.calculateBrightnessPerLevel(entity.weaponLevel);
                        this.context.filter = "brightness(".concat(brightness, "%)");
                    }
                    this.context.drawImage(weapon.image, wx, wy, ww, wh, weapon.offsetX * s, weapon.offsetY * s, ww * ds, wh * ds);
                    if (isFilterApplied) {
                        this.context.filter = "brightness(100%)";
                    }
                    if (typeof entity.weaponLevel === "number" && entity.weaponLevel >= 7 && ((_e = this.game.player) === null || _e === void 0 ? void 0 : _e.settings.effects)) {
                        var effect = "magic";
                        if (entity.isWeaponUnique) {
                            effect = "flame";
                        }
                        else if (entity.weaponRuneword) {
                            effect = "cold";
                        }
                        var sprite = this.game.getSprite("weapon-effect-".concat(effect));
                        var anim = this.game.weaponEffectAnimation;
                        var image = "";
                        if (entity.weaponLevel === 8) {
                            image = "8";
                        }
                        else if (entity.weaponLevel >= 9) {
                            image = "9";
                        }
                        if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
                            var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ts = 20, dx = -12 * s, dy = -4 * s, dw = w * ds, dh = h * ds;
                            this.context.save();
                            if (entity.capeOrientation === Types.Orientations.UP) {
                                (dy = -12 * s), (dx = 10 * s);
                                this.context.scale(1, -1);
                            }
                            else if (entity.capeOrientation === Types.Orientations.LEFT) {
                                dx = 8 * s;
                                (dy = -12 * s), this.context.scale(1, -1);
                            }
                            else if (entity.capeOrientation === Types.Orientations.RIGHT) {
                                dx = 8 * s;
                                (dy = -12 * s), this.context.scale(1, -1);
                            }
                            this.context.drawImage(sprite["image".concat(image)], x, y, w, h, dx, dy, dw, dh);
                            this.context.restore();
                        }
                    }
                }
            }
            if (entity instanceof Character && entity.sprite.name === "anvil") {
                var sprite = null;
                var spriteName = null;
                var anim = this.game.anvilAnimation;
                if (this.game.anvilRecipe || this.game.isAnvilChestpurple) {
                    if (this.game.anvilRecipe === "powderquantum") {
                        spriteName = "anvil-powder";
                    }
                    else {
                        spriteName = "anvil-recipe";
                    }
                }
                else if (this.game.isAnvilSuccess) {
                    spriteName = "anvil-success";
                }
                else if (this.game.isAnvilFail || this.game.isAnvilChestred) {
                    spriteName = "anvil-fail";
                }
                else if (this.game.isAnvilTransmute || this.game.isAnvilChestgreen) {
                    spriteName = "anvil-transmute";
                }
                else if (this.game.isAnvilChestblue || this.game.isAnvilRuneword) {
                    spriteName = "anvil-chestblue";
                }
                if (spriteName) {
                    sprite = this.game.getSprite(spriteName);
                }
                if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
                    var os = this.upscaledRendering ? 1 : this.scale;
                    var ds = this.upscaledRendering ? this.scale : 1;
                    var entityX = entity.x, entityY = entity.y;
                    var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ts = -12, dx = entityX * s, dy = entityY * s, dw = w * ds, dh = h * ds;
                    this.context.translate(0, ts * -ds);
                    this.context.drawImage(sprite.image, x, y, w, h, 0, 0, dw, dh);
                }
            }
            if (entity instanceof Character && entity.isLevelup) {
                var sprite = this.game.getSprite("levelup");
                var anim = this.game.levelupAnimation;
                if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
                    var os = this.upscaledRendering ? 1 : this.scale;
                    var ds = this.upscaledRendering ? this.scale : 1;
                    var entityX = entity.x, entityY = entity.y;
                    var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ts = 16, dx = entityX * s, dy = entityY * s, dw = w * ds, dh = h * ds;
                    this.context.translate(0, ts * -ds);
                    this.context.drawImage(sprite.image, x, y, w, h, 0, 0, dw, dh);
                    this.context.translate(0, ts * ds);
                }
            }
            if (entity instanceof Player && entity.defenseSkillName) {
                var sprite = this.game.getSprite("skill-".concat(entity.defenseSkillName));
                var anim = entity.defenseSkillName === "resistances"
                    ? this.game.skillResistanceAnimation
                    : this.game.defenseSkillAnimation;
                if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
                    var os = this.upscaledRendering ? 1 : this.scale;
                    var ds = this.upscaledRendering ? this.scale : 1;
                    var entityX = entity.x, entityY = entity.y;
                    var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ts = 16, dx = entityX * s, dy = entityY * s, dw = w * ds, dh = h * ds, ox = sprite.offsetX * s, oy = sprite.offsetY * s;
                    this.context.drawImage(sprite.image, x, y, w, h, ox, oy, dw, dh);
                }
            }
            if (entity instanceof Player && typeof entity.castSkill === "number") {
                var skillName = Types.skillToNameMap[entity.castSkill];
                var sprite = skillName === "cold" || skillName === "lightning"
                    ? this.game.getSprite("skill-cast")
                    : this.game.getSprite("skill-cast-".concat(Types.skillToNameMap[entity.castSkill]));
                var anim = this.game.skillCastAnimation;
                if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
                    var os = this.upscaledRendering ? 1 : this.scale;
                    var ds = this.upscaledRendering ? this.scale : 1;
                    var entityX = entity.x, entityY = entity.y;
                    var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ts = 16, dx = entityX * s, dy = entityY * s, dw = w * ds, dh = h * ds, ox = sprite.offsetX * s, oy = sprite.offsetY * s;
                    this.context.drawImage(sprite.image, x, y, w, h, ox, oy, dw, dh);
                }
            }
            if (entity instanceof Player && typeof entity.curseId === "number") {
                var sprite;
                var anim;
                switch (entity.curseId) {
                    case 0:
                        sprite = this.game.getSprite("curse-health");
                        anim = this.game.curseHealthAnimation;
                        break;
                    case 1: {
                        sprite = this.game.getSprite("curse-resistance");
                        anim = this.game.curseResistanceAnimation;
                        break;
                    }
                }
                if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
                    var os = this.upscaledRendering ? 1 : this.scale;
                    var ds = this.upscaledRendering ? this.scale : 1;
                    var entityX = entity.x, entityY = entity.y;
                    var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ts = 16, dx = entityX * s, dy = entityY * s, dw = w * ds, dh = h * ds, ox = sprite.offsetX * s, oy = sprite.offsetY * s;
                    this.context.drawImage(sprite.image, x, y, w, h, ox, oy, dw, dh);
                }
            }
            if (entity instanceof Character && typeof entity.skillAnimation === "number") {
                var sprite = this.game.getSprite("skill-".concat(Types.skillToNameMap[entity.skillAnimation]));
                var anim = this.game["skill".concat(_.capitalize(Types.skillToNameMap[entity.skillAnimation]), "Animation")];
                if ((sprite === null || sprite === void 0 ? void 0 : sprite.width) && anim) {
                    var os = this.upscaledRendering ? 1 : this.scale;
                    var ds = this.upscaledRendering ? this.scale : 1;
                    var entityX = entity.x, entityY = entity.y;
                    var frame = anim.currentFrame, s = this.scale, x = frame.x * os, y = frame.y * os, w = sprite.width * os, h = sprite.height * os, ts = 16, dx = entityX * s, dy = entityY * s, dw = w * ds, dh = h * ds, ox = sprite.offsetX * s, oy = sprite.offsetY * s;
                    this.context.drawImage(sprite.image, x, y, w, h, ox, oy, dw, dh);
                }
            }
            this.context.restore();
            if (entity.isFading) {
                this.context.restore();
            }
        }
    };
    Renderer.prototype.drawEntities = function (dirtyOnly) {
        var self = this;
        var entities = this.game.getForEachVisibleEntityByDepth();
        entities.forEach(function (entity) {
            if (entity.isLoaded) {
                if (dirtyOnly) {
                    if (entity.isDirty) {
                        self.drawEntity(entity);
                        entity.isDirty = false;
                        entity.oldDirtyRect = entity.dirtyRect;
                        entity.dirtyRect = null;
                    }
                }
                else {
                    self.drawEntity(entity);
                }
            }
        });
    };
    Renderer.prototype.drawDirtyEntities = function () {
        this.drawEntities(true);
    };
    Renderer.prototype.clearDirtyRect = function (r) {
        this.context.clearRect(r.x, r.y, r.w, r.h);
    };
    Renderer.prototype.clearDirtyRects = function () {
        var self = this;
        var count = 0;
        this.game.forEachVisibleEntityByDepth(function (entity) {
            if (entity.isDirty && entity.oldDirtyRect) {
                self.clearDirtyRect(entity.oldDirtyRect);
                count += 1;
            }
        });
        var animatedTileCallback = function (tile) {
            if (tile.isDirty) {
                self.clearDirtyRect(tile.dirtyRect);
                count += 1;
            }
        };
        this.game.forEachAnimatedTile(animatedTileCallback);
        this.game.forEachHighAnimatedTile(animatedTileCallback);
        if (this.game.clearTarget && this.lastTargetPos) {
            var last = this.lastTargetPos;
            var rect = this.getTargetBoundingRect(last.x, last.y);
            this.clearDirtyRect(rect);
            this.game.clearTarget = false;
            count += 1;
        }
        if (count > 0) {
        }
    };
    Renderer.prototype.getEntityBoundingRect = function (entity) {
        var rect = {}, s = this.scale, spr;
        if (entity instanceof Player && entity.hasWeapon()) {
            var weapon = this.game.getSprite(entity.getWeaponName());
            spr = weapon;
        }
        else {
            spr = entity.sprite;
        }
        if (spr) {
            rect.x = (entity.x + spr.offsetX - this.camera.x) * s;
            rect.y = (entity.y + spr.offsetY - this.camera.y) * s;
            rect.w = spr.width * s;
            rect.h = spr.height * s;
            rect.left = rect.x;
            rect.right = rect.x + rect.w;
            rect.top = rect.y;
            rect.bottom = rect.y + rect.h;
        }
        return rect;
    };
    Renderer.prototype.getTileBoundingRect = function (tile) {
        var rect = {}, gridW = this.game.map.width, s = this.scale, ts = this.tilesize, cellid = tile.index;
        rect.x = (getX(cellid + 1, gridW) * ts - this.camera.x) * s;
        rect.y = (Math.floor(cellid / gridW) * ts - this.camera.y) * s;
        rect.w = ts * s;
        rect.h = ts * s;
        rect.left = rect.x;
        rect.right = rect.x + rect.w;
        rect.top = rect.y;
        rect.bottom = rect.y + rect.h;
        return rect;
    };
    Renderer.prototype.getTargetBoundingRect = function (x, y) {
        var rect = {}, s = this.scale, ts = this.tilesize, tx = x || this.game.selectedX, ty = y || this.game.selectedY;
        rect.x = (tx * ts - this.camera.x) * s;
        rect.y = (ty * ts - this.camera.y) * s;
        rect.w = ts * s;
        rect.h = ts * s;
        rect.left = rect.x;
        rect.right = rect.x + rect.w;
        rect.top = rect.y;
        rect.bottom = rect.y + rect.h;
        return rect;
    };
    Renderer.prototype.isIntersecting = function (rect1, rect2) {
        return !(rect2.left > rect1.right ||
            rect2.right < rect1.left ||
            rect2.top > rect1.bottom ||
            rect2.bottom < rect1.top);
    };
    Renderer.prototype.drawEntityName = function (entity) {
        var _a, _b, _c;
        this.context.save();
        if (entity.name && entity instanceof Player) {
            var isSelf = entity.id === this.game.playerId;
            var color = isSelf ? "#fcda5c" : "white";
            if (!isSelf && (entity === null || entity === void 0 ? void 0 : entity.partyId) && ((_a = this.game.player) === null || _a === void 0 ? void 0 : _a.partyId) === (entity === null || entity === void 0 ? void 0 : entity.partyId)) {
                color = "#35ee35";
            }
            var entityName = "";
            if (((_c = (_b = this.game.player) === null || _b === void 0 ? void 0 : _b.partyLeader) === null || _c === void 0 ? void 0 : _c.id) === entity.id) {
                entityName += "[P] ";
            }
            entityName += entity.name;
            var isAdmin = this.game.admins.includes(entity === null || entity === void 0 ? void 0 : entity.name);
            this.drawText(entityName, (entity.x + 8) * this.scale, (entity.y + entity.nameOffsetY) * this.scale, true, color);
            if (isAdmin) {
                this.drawAdminBadge((entity.x + 16) * this.scale, (entity.y + entity.nameOffsetY) * this.scale);
            }
        }
        this.context.restore();
    };
    Renderer.prototype.drawTerrain = function () {
        var _this = this;
        this.game.forEachVisibleTile(function (id, index) {
            if (!_this.game.map.isHighTile(id) && !_this.game.map.isAnimatedTile(id)) {
                _this.drawTile(_this.background, id, index);
            }
        }, 1);
    };
    Renderer.prototype.drawAnimatedTiles = function (dirtyOnly) {
        var _this = this;
        this.animatedTileCount = 0;
        this.game.forEachAnimatedTile(function (tile) {
            if (dirtyOnly) {
                if (tile.isDirty) {
                    _this.drawTile(_this.context, tile.id, tile.index);
                    tile.isDirty = false;
                }
            }
            else {
                _this.drawTile(_this.context, tile.id, tile.index);
                _this.animatedTileCount += 1;
            }
        });
    };
    Renderer.prototype.drawDirtyAnimatedTiles = function () {
        this.drawAnimatedTiles(true);
    };
    Renderer.prototype.drawHighAnimatedTiles = function (dirtyOnly) {
        var _this = this;
        this.highAnimatedTileCount = 0;
        this.game.forEachHighAnimatedTile(function (tile) {
            if (dirtyOnly) {
                if (tile.isDirty) {
                    _this.drawTile(_this.context, tile.id, tile.index);
                    tile.isDirty = false;
                }
            }
            else {
                _this.drawTile(_this.context, tile.id, tile.index);
                _this.highAnimatedTileCount += 1;
            }
        });
    };
    Renderer.prototype.drawHighTiles = function (ctx) {
        var _this = this;
        this.highTileCount = 0;
        this.game.forEachVisibleTile(function (id, index) {
            if (_this.game.map.isHighTile(id) && !_this.game.map.isAnimatedTile(id)) {
                _this.drawTile(ctx, id, index);
                _this.highTileCount += 1;
            }
        }, 1);
    };
    Renderer.prototype.drawBackground = function (ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Renderer.prototype.drawFPS = function () {
        var nowTime = new Date(), diffTime = nowTime.getTime() - this.lastTime.getTime();
        if (diffTime >= 1000) {
            this.realFPS = this.frameCount;
            this.frameCount = 0;
            this.lastTime = nowTime;
        }
        this.frameCount++;
        this.drawText("FPS: " + this.realFPS, 20, 20, false);
    };
    Renderer.prototype.drawDebugInfo = function () {
        if (this.game.debug) {
            this.drawFPS();
            this.drawText("A: " + this.animatedTileCount, 20, 40, false);
            this.drawText("H: " + this.highTileCount, 80, 40, false);
            if (this.game.player) {
                this.drawText("X: " + this.game.player.gridX, 20, 60, false);
                this.drawText("Y: " + this.game.player.gridY, 80, 60, false);
            }
        }
    };
    Renderer.prototype.drawCombatInfo = function () {
        var self = this;
        switch (this.scale) {
            case 2:
                this.setFontSize(20);
                break;
            case 3:
                this.setFontSize(30);
                break;
        }
        this.game.infoManager.forEachInfo(function (info) {
            self.context.save();
            self.context.globalAlpha = info.opacity;
            self.drawText(info.value, (info.x + 8) * self.scale, Math.floor(info.y * self.scale), true, info.fillColor, info.strokeColor);
            self.context.restore();
        });
        this.initFont();
    };
    Renderer.prototype.setCameraView = function (ctx) {
        ctx.translate(-this.camera.x * this.scale, -this.camera.y * this.scale);
    };
    Renderer.prototype.clearScreen = function (ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Renderer.prototype.loadPlayerImage = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        var hasShield = this.game.player.shieldName;
        var hasCape = this.game.player.cape;
        var totalCount = 3 + (hasShield ? 1 : 0) + (hasCape ? 1 : 0);
        var currentCount = 0;
        var helmSprite = this.game.getSprite(this.game.player.getHelmName());
        var weaponSprite = this.game.getSprite(this.game.player.getWeaponName());
        var armorSprite = this.game.player.getArmorSprite();
        var shieldSprite;
        var capeSprite;
        if (this.game.player.shieldName) {
            shieldSprite = this.game.getSprite(this.game.player.shieldName);
        }
        if (this.game.player.cape) {
            capeSprite = this.game.getSprite("cape");
        }
        if ((_a = helmSprite === null || helmSprite === void 0 ? void 0 : helmSprite.image) === null || _a === void 0 ? void 0 : _a.width) {
            currentCount += 1;
        }
        if ((_b = weaponSprite === null || weaponSprite === void 0 ? void 0 : weaponSprite.image) === null || _b === void 0 ? void 0 : _b.width) {
            currentCount += 1;
        }
        if ((_c = armorSprite === null || armorSprite === void 0 ? void 0 : armorSprite.image) === null || _c === void 0 ? void 0 : _c.width) {
            currentCount += 1;
        }
        if (hasShield && ((_d = shieldSprite === null || shieldSprite === void 0 ? void 0 : shieldSprite.image) === null || _d === void 0 ? void 0 : _d.width)) {
            currentCount += 1;
        }
        if (hasCape && ((_e = capeSprite === null || capeSprite === void 0 ? void 0 : capeSprite.image) === null || _e === void 0 ? void 0 : _e.width)) {
            currentCount += 1;
        }
        if (totalCount === currentCount) {
            this.getPlayerImage({ weaponSprite: weaponSprite, helmSprite: helmSprite, armorSprite: armorSprite, shieldSprite: shieldSprite, capeSprite: capeSprite });
        }
        else {
            setTimeout(function () { return _this.loadPlayerImage(); }, 550);
        }
    };
    Renderer.prototype.getPlayerImage = function (_a) {
        var _b, _c, _d;
        var weaponSprite = _a.weaponSprite, helmSprite = _a.helmSprite, armorSprite = _a.armorSprite, shieldSprite = _a.shieldSprite, capeSprite = _a.capeSprite;
        var canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), os = this.upscaledRendering ? 1 : this.scale, spriteAnim = (_b = armorSprite.animationData) === null || _b === void 0 ? void 0 : _b["idle_down"];
        if (!spriteAnim)
            return;
        var row = spriteAnim.row, w = armorSprite.width * os, h = armorSprite.height * os, y = row * h, ww = weaponSprite.width * os, wh = weaponSprite.height * os, wy = wh * row, offsetX = (weaponSprite.offsetX - armorSprite.offsetX) * os + 2, offsetY = (weaponSprite.offsetY - armorSprite.offsetY) * os + 2, shadow = this.game.shadows["small"], sw = shadow.width * os, sh = shadow.height * os, ox = -armorSprite.offsetX * os + 2, oy = -armorSprite.offsetY * os + 4;
        canvas.width = w;
        canvas.height = h;
        var helmImage = helmSprite.image;
        if ([
            "helmhorned",
            "helmfrozen",
            "helmdiamond",
            "helmemerald",
            "helmexecutioner",
            "helmtemplar",
            "helmdragon",
            "helmmoon",
            "helmchristmas",
            "helmdemon",
            "helmmystical",
            "helmimmortal",
            "helmpaladin",
        ].includes(this.game.player.helmName) &&
            ((_c = this.game.player.helmBonus) === null || _c === void 0 ? void 0 : _c.length)) {
            helmImage = helmSprite.imageunique;
        }
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(shadow.image, 0, 0, sw, sh, ox, oy, sw, sh);
        if (this.game.player.cape) {
            var capeImage = capeSprite.image;
            if (this.game.player.capeLevel >= 7 && ((_d = this.game.player) === null || _d === void 0 ? void 0 : _d.settings.effects)) {
                capeImage = capeSprite.image7;
            }
            ctx.drawImage(capeImage, 0, y, w, h, 2, 2, w, h);
        }
        ctx.drawImage(armorSprite.image, 0, y, w, h, 2, 2, w, h);
        ctx.drawImage(helmImage, 0, y, w, h, 2, 2, w, h);
        if (this.game.player.shieldName) {
            ctx.drawImage(shieldSprite.image, 0, y, w, h, 2, 2, w, h);
        }
        ctx.drawImage(weaponSprite.image, 0, wy, ww, wh, offsetX, offsetY, ww, wh);
        this.game.storage.savePlayer(canvas.toDataURL("image/png"));
    };
    Renderer.prototype.renderStaticCanvases = function () {
        this.background.save();
        this.setCameraView(this.background);
        this.drawTerrain();
        this.background.restore();
        if (this.mobile || this.tablet) {
            this.clearScreen(this.foreground);
            this.foreground.save();
            this.setCameraView(this.foreground);
            this.drawHighTiles(this.foreground);
            this.foreground.restore();
        }
    };
    Renderer.prototype.renderFrame = function () {
        if (this.mobile || this.tablet) {
            this.renderFrameMobile();
        }
        else {
            this.renderFrameDesktop();
        }
    };
    Renderer.prototype.renderFrameDesktop = function () {
        this.clearScreen(this.context);
        this.context.save();
        this.setCameraView(this.context);
        this.drawAnimatedTiles();
        if (this.game.started && this.game.cursorVisible) {
            this.drawSelectedCell();
            this.drawTargetCell();
        }
        this.drawPathingCells();
        this.drawEntities();
        this.drawCombatInfo();
        this.drawHighTiles(this.context);
        this.drawHighAnimatedTiles();
        this.context.restore();
        if (this.game.cursorVisible)
            this.drawCursor();
        this.drawDebugInfo();
    };
    Renderer.prototype.renderFrameMobile = function () {
        this.clearDirtyRects();
        this.preventFlickeringBug();
        this.context.save();
        this.setCameraView(this.context);
        this.drawDirtyAnimatedTiles();
        this.drawSelectedCell();
        this.drawDirtyEntities();
        this.context.restore();
    };
    Renderer.prototype.preventFlickeringBug = function () {
        if (this.fixFlickeringTimer.isOver(this.game.currentTime)) {
            this.background.fillRect(0, 0, 0, 0);
            this.context.fillRect(0, 0, 0, 0);
            this.foreground.fillRect(0, 0, 0, 0);
        }
    };
    return Renderer;
}());
var getX = function (id, w) {
    if (id == 0) {
        return 0;
    }
    return id % w == 0 ? w - 1 : (id % w) - 1;
};
export default Renderer;
