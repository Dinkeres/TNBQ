var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as Sentry from "@sentry/browser";
import * as _ from "lodash";
import { kinds, Types } from "../../shared/js/gametypes";
import { itemGoldMap, merchantItems } from "../../shared/js/gold";
import { DELETE_SLOT, INVENTORY_SLOT_COUNT, MERCHANT_SLOT_COUNT, MERCHANT_SLOT_RANGE, Slot, STASH_SLOT_COUNT, STASH_SLOT_PAGES, STASH_SLOT_PER_PAGE, STASH_SLOT_RANGE, TRADE_SLOT_COUNT, TRADE_SLOT_RANGE, UPGRADE_SLOT_COUNT, UPGRADE_SLOT_RANGE, } from "../../shared/js/slots";
import { ACHIEVEMENT_CRYSTAL_INDEX, ACHIEVEMENT_HERO_INDEX, ACHIEVEMENT_NFT_INDEX, ACHIEVEMENT_WING_INDEX, } from "../../shared/js/types/achievements";
import { expForLevel } from "../../shared/js/types/experience";
import { setDescription } from "../../shared/js/types/set";
import { MIN_COW_LEVEL, MIN_MINOTAUR_LEVEL } from "../../shared/js/utils";
import { getEntityLocation } from "../../shared/js/utils";
import { randomInt, toArray, toString, validateQuantity } from "../../shared/js/utils";
import { getAchievements } from "./achievements";
import Animation from "./animation";
import AudioManager from "./audio";
import BubbleManager from "./bubble";
import Character from "./character";
import Chest from "./chest";
import EntityFactory from "./entityfactory";
import Exceptions from "./exceptions";
import GameClient from "./gameclient";
import InfoManager from "./infomanager";
import Item from "./item";
import Map from "./map";
import Mob from "./mob";
import Npc from "./npc";
import Pathfinder from "./pathfinder";
import Pet from "./pet";
import Player from "./player";
import Renderer from "./renderer";
import Spell from "./spell";
import Sprite from "./sprite";
import AnimatedTile from "./tile";
import Transition from "./transition";
import Updater from "./updater";
import Warrior from "./warrior";
var Game = (function () {
    function Game(app) {
        var _this = this;
        this.onRemoveTarget = function () {
            $("#inspector").fadeOut("fast");
            $("#inspector .level").text("");
            $("#inspector .health").text("");
            if (_this.player) {
                _this.player.inspecting = null;
            }
        };
        this.isCharacterZoning = false;
        this.app = app;
        this.ready = false;
        this.started = false;
        this.isLoaded = false;
        this.hasNeverStarted = true;
        this.isUpgradeItemSent = false;
        this.anvilRecipe = null;
        this.isAnvilSuccess = false;
        this.isAnvilFail = false;
        this.isAnvilTransmute = false;
        this.isAnvilRuneword = false;
        this.isAnvilChestblue = false;
        this.isAnvilChestgreen = false;
        this.isAnvilChestpurple = false;
        this.isChristmasPresent = false;
        this.isAnvilChestdead = false;
        this.isAnvilChestred = false;
        this.anvilAnimationTimeout = null;
        this.cowPortalStart = false;
        this.cowLevelPortalCoords = null;
        this.minotaurPortalStart = false;
        this.minotaurLevelPortalCoords = { x: 34, y: 498 };
        this.stonePortalStart = false;
        this.stoneLevelPortalCoords = { x: 97, y: 728 };
        this.gatewayPortalStart = false;
        this.gatewayLevelPortalCoords = { x: 13, y: 777 };
        this.deathAngelLevelPortalCoords = { x: 98, y: 764 };
        this.network = null;
        this.explorer = null;
        this.hoverSlotToDelete = null;
        this.isTeleporting = false;
        this.showAnvilOdds = false;
        this.showHealthAboveBars = false;
        this.confirmedSoldItemToMerchant = null;
        this.itemToDelete = null;
        this.isPanelOpened = false;
        this.isDragStarted = false;
        this.onSendMoveItemTimeout = null;
        this.renderer = null;
        this.updater = null;
        this.pathfinder = null;
        this.chatinput = null;
        this.bubbleManager = null;
        this.audioManager = null;
        this.targetAnimation = null;
        this.sparksAnimation = null;
        this.levelupAnimation = null;
        this.drainLifeAnimation = null;
        this.thunderstormAnimation = null;
        this.highHealthAnimation = null;
        this.freezeAnimation = null;
        this.resistanceAnimation = null;
        this.arcaneAnimation = null;
        this.paladinAnimation = null;
        this.healthRegenerateAnimation = null;
        this.anvilAnimation = null;
        this.defenseSkillAnimation = null;
        this.skillResistanceAnimation = null;
        this.skillCastAnimation = null;
        this.skillMagicAnimation = null;
        this.skillFlameAnimation = null;
        this.skillLightningAnimation = null;
        this.skillColdAnimation = null;
        this.skillPoisonAnimation = null;
        this.curseHealthAnimation = null;
        this.curseResistanceAnimation = null;
        this.weaponEffectAnimation = null;
        this.partyInvites = [];
        this.partyInvitees = [];
        this.expansion1 = false;
        this.expansion2 = false;
        this.player = new Warrior("player", { name: "" });
        this.worldPlayers = [];
        this.entities = {};
        this.deathpositions = {};
        this.entityGrid = null;
        this.pathingGrid = null;
        this.renderingGrid = null;
        this.itemGrid = null;
        this.currentCursor = null;
        this.mouse = { x: 0, y: 0 };
        this.zoningQueue = [];
        this.previousClickPosition = null;
        this.currentStashPage = 0;
        this.cursorVisible = true;
        this.selectedX = 0;
        this.selectedY = 0;
        this.selectedCellVisible = false;
        this.targetColor = "rgba(255, 255, 255, 0.5)";
        this.targetCellVisible = true;
        this.hoveringTarget = false;
        this.hoveringPlayer = false;
        this.pvp = false;
        this.partyEnabled = false;
        this.tradeEnabled = false;
        this.hoveringPlayerPvP = false;
        this.showEffects = true;
        this.hoveringMob = false;
        this.hoveringItem = false;
        this.hoveringCollidingTile = false;
        this.activatedMagicStones = [];
        this.activatedBlueFlames = [];
        this.isAltarChaliceActivated = false;
        this.altarChaliceNpcId = null;
        this.altarSoulStoneNpcId = null;
        this.treeNpcId = null;
        this.traps = [];
        this.statues = [];
        this.gatewayFxNpcId = null;
        this.slotSockets = null;
        this.slotSocketCount = null;
        this.infoManager = new InfoManager(this);
        this.currentZoning = null;
        this.cursors = {};
        this.sprites = {};
        this.animatedTiles = null;
        this.highAnimatedTiles = null;
        this.debugPathing = false;
        this.admins = [];
    }
    Game.prototype.setup = function ($bubbleContainer, canvas, background, foreground, input) {
        this.setBubbleManager(new BubbleManager($bubbleContainer));
        this.setRenderer(new Renderer(this, canvas, background, foreground));
        this.setChatInput(input);
    };
    Game.prototype.setStorage = function (storage) {
        this.storage = storage;
    };
    Game.prototype.setStore = function (store) {
        this.store = store;
    };
    Game.prototype.setRenderer = function (renderer) {
        this.renderer = renderer;
    };
    Game.prototype.setUpdater = function (updater) {
        this.updater = updater;
    };
    Game.prototype.setPathfinder = function (pathfinder) {
        this.pathfinder = pathfinder;
    };
    Game.prototype.setChatInput = function (element) {
        this.chatinput = element;
    };
    Game.prototype.setBubbleManager = function (bubbleManager) {
        this.bubbleManager = bubbleManager;
    };
    Game.prototype.setShowAnvilOdds = function (enabled) {
        this.showAnvilOdds = enabled;
    };
    Game.prototype.setShowHealthAboveBars = function (enabled) {
        this.showHealthAboveBars = enabled;
    };
    Game.prototype.loadMap = function () {
        this.map = new Map(!this.renderer.upscaledRendering, this);
    };
    Game.prototype.initPlayer = function () {
        if (this.storage.hasAlreadyPlayed() && this.storage.data.player) {
            if (this.storage.data.player.armor && this.storage.data.player.weapon) {
                this.player.setSpriteName(this.storage.data.player.armor);
                this.player.setWeaponName(this.storage.data.player.weapon);
            }
        }
        this.player.setSprite(this.getSprite(this.player.getSpriteName()));
        this.player.idle();
        console.debug("Finished initPlayer");
    };
    Game.prototype.initShadows = function () {
        this.shadows = {};
        this.shadows["small"] = this.getSprite("shadow16");
    };
    Game.prototype.initCursors = function () {
        this.cursors["hand"] = this.getSprite("hand");
        this.cursors["attack"] = this.getSprite("attack");
        this.cursors["loot"] = this.getSprite("loot");
        this.cursors["target"] = this.getSprite("target");
        this.cursors["arrow"] = this.getSprite("arrow");
        this.cursors["talk"] = this.getSprite("talk");
        this.cursors["join"] = this.getSprite("talk");
    };
    Game.prototype.initAnimations = function () {
        this.targetAnimation = new Animation("idle_down", 4, 0, 16, 16);
        this.targetAnimation.setSpeed(50);
        this.sparksAnimation = new Animation("idle_down", 6, 0, 16, 16);
        this.sparksAnimation.setSpeed(120);
        this.levelupAnimation = new Animation("idle_down", 4, 0, 16, 16);
        this.levelupAnimation.setSpeed(50);
        this.drainLifeAnimation = new Animation("idle_down", 5, 0, 16, 8);
        this.drainLifeAnimation.setSpeed(200);
        this.thunderstormAnimation = new Animation("idle_down", 6, 0, 16, 8);
        this.thunderstormAnimation.setSpeed(200);
        this.highHealthAnimation = new Animation("idle_down", 6, 0, 16, 8);
        this.highHealthAnimation.setSpeed(140);
        this.freezeAnimation = new Animation("idle_down", 8, 0, 16, 8);
        this.freezeAnimation.setSpeed(140);
        this.resistanceAnimation = new Animation("idle_down", 7, 0, 16, 8);
        this.resistanceAnimation.setSpeed(140);
        this.arcaneAnimation = new Animation("idle_down", 4, 0, 36, 15);
        this.arcaneAnimation.setSpeed(140);
        this.paladinAnimation = new Animation("idle_down", 4, 0, 38, 41);
        this.paladinAnimation.setSpeed(140);
        this.healthRegenerateAnimation = new Animation("idle_down", 5, 0, 16, 11);
        this.healthRegenerateAnimation.setSpeed(140);
        this.anvilAnimation = new Animation("idle_down", 4, 0, 15, 8);
        this.anvilAnimation.setSpeed(80);
        this.defenseSkillAnimation = new Animation("idle_down", 8, 0, 32, 32);
        this.defenseSkillAnimation.setSpeed(125);
        this.skillResistanceAnimation = new Animation("idle_down", 24, 0, 30, 36);
        this.skillResistanceAnimation.setSpeed(25);
        this.skillCastAnimation = new Animation("idle_down", 17 + 1, 0, 48, 48);
        this.skillCastAnimation.setSpeed(50);
        this.skillMagicAnimation = new Animation("idle_down", 12 + 1, 0, 64, 64);
        this.skillMagicAnimation.setSpeed(100);
        this.skillFlameAnimation = new Animation("idle_down", 12 + 1, 0, 34, 58);
        this.skillFlameAnimation.setSpeed(125);
        this.skillLightningAnimation = new Animation("idle_down", 8 + 1, 0, 28, 50);
        this.skillLightningAnimation.setSpeed(125);
        this.skillColdAnimation = new Animation("idle_down", 14 + 1, 0, 72, 72);
        this.skillColdAnimation.setSpeed(75);
        this.skillPoisonAnimation = new Animation("idle_down", 8 + 1, 0, 24, 60);
        this.skillPoisonAnimation.setSpeed(125);
        this.weaponEffectAnimation = new Animation("idle_down", 6, 0, 20, 20);
        this.weaponEffectAnimation.setSpeed(140);
        this.curseHealthAnimation = new Animation("idle_down", 17 + 1, 0, 20, 20);
        this.curseHealthAnimation.setSpeed(25);
        this.curseResistanceAnimation = new Animation("idle_down", 17 + 1, 0, 20, 20);
        this.curseResistanceAnimation.setSpeed(100);
    };
    Game.prototype.initSettings = function (settings) {
        var _this = this;
        var _a = this.storage.data.settings, _b = _a.musicVolume, musicVolume = _b === void 0 ? 0.6 : _b, _c = _a.soundVolume, soundVolume = _c === void 0 ? 0.6 : _c;
        if (!this.storage.isMusicEnabled()) {
            this.audioManager.disableMusic();
        }
        else {
            $("#mute-music-checkbox").prop("checked", true);
            this.audioManager.updateMusicVolume(musicVolume);
        }
        if (!this.storage.isSoundEnabled()) {
            this.audioManager.disableSound();
        }
        else {
            $("#mute-sound-checkbox").prop("checked", true);
            this.audioManager.updateSoundVolume(soundVolume);
        }
        var handleMusic = $("#music-handle");
        $("#music-slider").slider({
            min: 0,
            max: 100,
            value: Math.round(musicVolume * 100),
            create: function () {
                handleMusic.text("".concat(Math.round(musicVolume * 100), "%"));
            },
            slide: function (_event, ui) {
                handleMusic.text("".concat(ui.value, "%"));
                _this.storage.setMusicVolume(ui.value / 100);
                _this.audioManager.updateMusicVolume(ui.value / 100);
            },
        });
        var handleSound = $("#sound-handle");
        $("#sound-slider").slider({
            min: 0,
            max: 100,
            value: Math.round(soundVolume * 100),
            create: function () {
                handleSound.text("".concat(Math.round(soundVolume * 100), "%"));
            },
            slide: function (_event, ui) {
                handleSound.text("".concat(ui.value, "%"));
                _this.storage.setSoundVolume(ui.value / 100);
                _this.audioManager.updateSoundVolume(ui.value / 100);
            },
        });
        if (this.storage.showEntityNameEnabled()) {
            this.renderer.setDrawEntityName(true);
            $("#entity-name-checkbox").prop("checked", settings.playerNames);
        }
        else {
            this.renderer.setDrawEntityName(false);
        }
        if (this.storage.showDamageInfoEnabled()) {
            this.infoManager.setShowDamageInfo(true);
            $("#damage-info-checkbox").prop("checked", settings.damageInfo);
        }
        else {
            this.infoManager.setShowDamageInfo(false);
        }
        this.showEffects = settings.effects;
        $("#effects-checkbox").prop("checked", settings.effects);
        this.pvp = settings.pvp;
        $("#pvp-checkbox").prop("checked", settings.pvp);
        this.partyEnabled = settings.partyEnabled;
        $("#party-checkbox").prop("checked", settings.partyEnabled);
        this.tradeEnabled = settings.tradeEnabled;
        $("#trade-checkbox").prop("checked", settings.tradeEnabled);
        this.debug = this.storage.debugEnabled();
        $("#debug-checkbox").prop("checked", this.debug);
        if (this.storage.showAnvilOddsEnabled()) {
            this.setShowAnvilOdds(true);
            $("#anvil-odds-checkbox").prop("checked", true);
        }
        else {
            this.setShowAnvilOdds(false);
        }
        if (this.storage.showHealthAboveBarsEnabled()) {
            this.setShowAnvilOdds(true);
            $("#health-above-bars-checkbox").prop("checked", true);
        }
        else {
            this.setShowAnvilOdds(false);
        }
        this.player.capeHue = settings.capeHue;
        var handleHue = $("#cape-hue-handle");
        $("#cape-hue-slider").slider({
            min: -180,
            max: 180,
            value: settings.capeHue,
            create: function () {
                handleHue.text(settings.capeHue);
            },
            slide: function (_event, ui) {
                handleHue.text(ui.value);
                _this.player.setCapeHue(ui.value);
                _this.updateCapePreview();
            },
            change: function (_event, ui) {
                _this.client.sendSettings({ capeHue: ui.value });
            },
        });
        this.player.capeSaturate = settings.capeSaturate;
        var handleSaturate = $("#cape-saturate-handle");
        $("#cape-saturate-slider").slider({
            min: 0,
            max: 400,
            value: settings.capeSaturate,
            create: function () {
                handleSaturate.text("".concat(settings.capeSaturate, "%"));
            },
            slide: function (_event, ui) {
                handleSaturate.text("".concat(ui.value, "%"));
                _this.player.setCapeSaturate(ui.value);
                _this.updateCapePreview();
            },
            change: function (_event, ui) {
                _this.client.sendSettings({ capeSaturate: ui.value });
            },
        });
        this.player.capeContrast = settings.capeContrast;
        var handleContrast = $("#cape-contrast-handle");
        $("#cape-contrast-slider").slider({
            min: 0,
            max: 300,
            value: settings.capeContrast,
            create: function () {
                handleContrast.text("".concat(settings.capeContrast, "%"));
            },
            slide: function (_event, ui) {
                handleContrast.text("".concat(ui.value, "%"));
                _this.player.setCapeContrast(ui.value);
                _this.updateCapePreview();
            },
            change: function (_event, ui) {
                _this.client.sendSettings({ capeContrast: ui.value });
            },
        });
        this.player.capeBrightness = settings.capeBrightness;
        var handleBrightness = $("#cape-brightness-handle");
        $("#cape-brightness-slider").slider({
            min: 0,
            max: 10,
            value: settings.capeBrightness,
            create: function () {
                handleBrightness.text("".concat(settings.capeBrightness));
            },
            slide: function (_event, ui) {
                handleBrightness.text("".concat(ui.value));
                _this.player.setCapeBrightness(ui.value);
                _this.updateCapePreview();
            },
            change: function (_event, ui) {
                _this.client.sendSettings({ capeBrightness: ui.value });
            },
        });
        this.updateCapePreview();
    };
    Game.prototype.updateCapePreview = function () {
        var hue = this.player.capeHue;
        var saturate = this.player.capeSaturate;
        var contrast = this.player.capeContrast;
        var brightness = this.player.capeBrightness;
        $("#settings-cape-preview").css("filter", "hue-rotate(".concat(hue, "deg) saturate(").concat(saturate, "%) contrast(").concat(contrast, "%) brightness(").concat(brightness, ")"));
    };
    Game.prototype.toggleCapeSliders = function (isEnabled) {
        $("#cape-hue-slider").slider(isEnabled ? "enable" : "disable");
        $("#cape-saturate-slider").slider(isEnabled ? "enable" : "disable");
        $("#cape-contrast-slider").slider(isEnabled ? "enable" : "disable");
        $("#cape-brightness-slider").slider(isEnabled ? "enable" : "disable");
    };
    Game.prototype.initTooltips = function () {
        var self = this;
        $(document).tooltip({
            items: "[data-item]",
            track: true,
            position: { my: "left bottom-10", at: "left bottom", collision: "flipfit" },
            close: function () {
                self.hoverSlotToDelete = null;
                self.slotSockets = null;
                self.slotSocketCount = null;
            },
            content: function () {
                if (!self.player)
                    return;
                var element = $(this);
                var item = element.attr("data-item");
                var level = parseInt(element.attr("data-level") || "1", 10);
                var rawBonus = toArray(element.attr("data-bonus"));
                var rawSkill = element.attr("data-skill") ? Number(element.attr("data-skill")) : null;
                var rawSocket = toArray(element.attr("data-socket"));
                var slot = parseInt(element.parent().attr("data-slot") || "0", 10);
                var isEquippedItemSlot = Object.values(Slot).includes(slot);
                var amount = parseInt(element.attr("data-amount") || "0", 10);
                self.slotSockets = rawSocket;
                self.slotSocketCount = rawSocket === null || rawSocket === void 0 ? void 0 : rawSocket.length;
                self.hoverSlotToDelete = slot;
                var setName = null;
                var setParts = [];
                var currentSet = null;
                var currentSetDescription = "";
                var setBonus = [];
                if (isEquippedItemSlot) {
                    currentSet = Types.kindAsStringToSet[item];
                    var playerItems_1 = self.player.getEquipment().filter(Boolean);
                    if (currentSet && (setDescription === null || setDescription === void 0 ? void 0 : setDescription[currentSet])) {
                        currentSetDescription = setDescription === null || setDescription === void 0 ? void 0 : setDescription[currentSet];
                    }
                    if (currentSet) {
                        setName = "* ".concat(_.capitalize(currentSet), " Set *");
                        setParts = Types.setItemsNameMap[currentSet].map(function (description, index) {
                            var isActive = false;
                            var setPart = Types.setItems[currentSet][index];
                            if (typeof setPart === "string") {
                                isActive = playerItems_1.includes(setPart);
                            }
                            else if (Array.isArray(setPart)) {
                                isActive = setPart.some(function (part) { return playerItems_1.includes(part); });
                            }
                            return {
                                description: description,
                                isActive: isActive,
                            };
                        });
                        if (self.player.setBonus[currentSet]) {
                            var setPartCount = self.player.setBonus[currentSet];
                            if (setPartCount === Types.setItems[currentSet].length) {
                                setPartCount = Object.keys(Types.setBonus[currentSet]).length;
                            }
                            setBonus = Types.getSetBonus(currentSet, setPartCount);
                        }
                    }
                }
                var content = self.generateItemTooltipContent({
                    element: element,
                    item: item,
                    level: level,
                    rawBonus: rawBonus,
                    rawSkill: rawSkill,
                    rawSocket: rawSocket,
                    playerBonus: self.player.bonus,
                    amount: amount,
                    currentSet: currentSet,
                    currentSetDescription: currentSetDescription,
                    setName: setName,
                    setParts: setParts,
                    setBonus: setBonus,
                });
                return content;
            },
        });
    };
    Game.prototype.generateItemTooltipContent = function (_a) {
        var _b;
        var _c = _a.isSocketItem, isSocketItem = _c === void 0 ? false : _c, _d = _a.element, element = _d === void 0 ? null : _d, item = _a.item, level = _a.level, rawBonus = _a.rawBonus, rawSkill = _a.rawSkill, rawSocket = _a.rawSocket, playerBonus = _a.playerBonus, amount = _a.amount, currentSet = _a.currentSet, currentSetDescription = _a.currentSetDescription, setName = _a.setName, setParts = _a.setParts, setBonus = _a.setBonus;
        var _e = Types.getItemDetails({
            item: item,
            level: level,
            rawBonus: rawBonus,
            rawSkill: rawSkill,
            rawSocket: rawSocket,
            playerBonus: playerBonus,
            amount: amount,
        }), name = _e.name, weight = _e.weight, isUnique = _e.isUnique, isRune = _e.isRune, isRuneword = _e.isRuneword, isJewel = _e.isJewel, isStone = _e.isStone, isSuperior = _e.isSuperior, itemClass = _e.itemClass, defense = _e.defense, damage = _e.damage, healthBonus = _e.healthBonus, magicDamage = _e.magicDamage, flameDamage = _e.flameDamage, lightningDamage = _e.lightningDamage, pierceDamage = _e.pierceDamage, _f = _e.bonus, bonus = _f === void 0 ? [] : _f, skill = _e.skill, requirement = _e.requirement, description = _e.description, _g = _e.partyBonus, partyBonus = _g === void 0 ? [] : _g, _h = _e.runeBonus, runeBonus = _h === void 0 ? [] : _h, runeRank = _e.runeRank, socket = _e.socket, goldAmount = _e.goldAmount;
        var isQuantity = Types.isQuantity(item);
        var isConsumable = Types.isConsumable(item);
        var isLevelVisible = level &&
            !isRune &&
            !isJewel &&
            !isStone &&
            !Types.isSingle(item) &&
            !Types.isNotStackableItem(item) &&
            !isQuantity &&
            !isConsumable;
        var isMerchantVisible = $("#merchant").hasClass("visible");
        var buyOrSell = "";
        if (isMerchantVisible && element) {
            if (element.closest("#inventory")[0]) {
                buyOrSell = "Sell";
            }
            else if (element.closest("#merchant")[0]) {
                buyOrSell = "Buy";
            }
        }
        var itemName = Types.getDisplayName(item, false);
        var type = kinds[item][1];
        var isRing = Types.isRing(item);
        var isAmulet = Types.isAmulet(item);
        currentSet = _.has(Types.kindAsStringToSet, item) ? Types.kindAsStringToSet[item] : "";
        var setRingOrAmuletDisplay = (isRing || isAmulet || Types.isSuperUnique(item)) && currentSet ? "".concat(_.capitalize(currentSet), " set ") : "";
        var itemDisplayName = Types.isSuperUnique(item) ? type : itemName;
        return "<div class=\"".concat(bonus.length >= 8 && currentSet && setBonus.length ? "extended" : "", " ").concat(isSocketItem ? "socket-item" : "item-tooltip-wrapper main-item", "\">\n        <div class=\"item-header\">\n          <div class=\"item-title").concat(isUnique ? " unique" : "").concat(isRune || isRuneword ? " rune" : "", "\">\n            ").concat(isSuperior ? '<span class="item-superior">Superior</span>' : "", "\n            ").concat(name).concat(isLevelVisible ? " (+".concat(level, ")") : "").concat(isJewel ? " lv.".concat(level) : "", "\n            ").concat(runeRank ? " (#".concat(runeRank, ")") : "", "\n            ").concat(socket ? " <span class=\"item-socket\">(".concat(socket, ")</span>") : "", "\n\n          \n          </div>\n          ").concat(itemClass
            ? "<div class=\"item-class\">(".concat(isUnique ? "Unique " : "").concat(isRuneword ? "Runeword ".concat(itemDisplayName) : "").concat(setRingOrAmuletDisplay).concat(!isRuneword ? itemDisplayName : "", " ").concat(itemClass, " class item)</div>")
            : "", "\n          ").concat(weight ? "<div class=\"item-weight\">Weapon Weight: <strong>".concat(weight, "</strong></div>}") : "", "}\n          ").concat(socket
            ? "<div class=\"socket-container\">\n              ".concat(_.range(0, socket)
                .map(function (index) {
                var image = "none";
                var isUnique = false;
                if (typeof rawSocket[index] === "number") {
                    var rune = Types.getRuneNameFromItem(rawSocket[index]);
                    image = rune ? "url(img/2/item-rune-".concat(rune, ".png)") : "none";
                }
                else if (Types.isJewel(rawSocket[index])) {
                    var _a = rawSocket[index].split("|") || [], rawJewelLevel = _a[1], jewelBonus = _a[2];
                    var jewelLevel = parseInt(rawJewelLevel);
                    var imageIndex = Types.getJewelSkinIndex(jewelLevel);
                    isUnique = Types.isUnique("jewelskull", jewelBonus, jewelLevel);
                    image = "url(img/2/item-jewelskull".concat(imageIndex, ".png)");
                }
                return "<div class=\"item-rune ".concat(isUnique ? "item-unique" : "", "\" style=\"background-image: ").concat(image, "; position: relative;\"></div>");
            })
                .join(""), "</div>")
            : "", "\n        </div>\n        <div class=\"socket-item-container\"></div>\n        ").concat(defense ? "<div class=\"item-description\">Defense: ".concat(defense, "</div>") : "", "\n        ").concat(damage ? "<div class=\"item-description\">Attack: ".concat(damage, "</div>") : "", "\n        ").concat(magicDamage ? "<div class=\"item-bonus\">Magic damage: ".concat(magicDamage, "</div>") : "", "\n        ").concat(flameDamage ? "<div class=\"item-bonus\">Flame damage: ".concat(flameDamage, "</div>") : "", "\n        ").concat(lightningDamage ? "<div class=\"item-bonus\">Lightning damage: ".concat(lightningDamage, "</div>") : "", "\n        ").concat(pierceDamage ? "<div class=\"item-bonus\">Pierce damage: ".concat(pierceDamage, "</div>") : "", "\n        ").concat(healthBonus ? "<div class=\"item-bonus\">Health bonus: ".concat(healthBonus, "</div>") : "", "\n        ").concat(Array.isArray(bonus)
            ? bonus.map(function (_a) {
                var description = _a.description;
                return "<div class=\"item-bonus\">".concat(description, "</div>");
            }).join("")
            : "", "\n        ").concat(skill ? "<div class=\"item-skill\">".concat(skill.description, "</div>") : "", "\n        ").concat(runeBonus.length
            ? "<div>\n            ".concat(runeBonus.map(function (_a) {
                var description = _a.description;
                return "<div class=\"item-set-bonus\">".concat(description, "</div>");
            }).join(""), "\n          </div>")
            : "", "\n        ").concat(description
            ? "<div class=\"item-description\">".concat(amount ? description.replace(":amount:", this.formatGold(amount)) : description, "</div>")
            : "", "\n        ").concat(requirement ? "<div class=\"item-description\">Required lv.: ".concat(requirement, "</div>") : "", "\n        ").concat(currentSetDescription
            ? "<div class=\"item-setdescription\">Set Perk lv.:".concat((_b = this.player.bonus.setLevel) === null || _b === void 0 ? void 0 : _b[currentSet], ": ").concat(currentSetDescription, "</div>")
            : "", "\n       \n        ").concat(currentSet && setBonus.length
            ? "<div>\n            ".concat(currentSet && setBonus.length
                ? "<div class=\"item-set-description\">".concat(_.capitalize(currentSet), " set bonuses</div>")
                : "", "\n            ").concat(setBonus.map(function (_a) {
                var description = _a.description;
                return "<div class=\"item-set-bonus\">".concat(description, "</div>");
            }).join(""), "\n            ").concat(setName ? "<div class=\"item-set-name\">".concat(setName, "</div>") : "", "\n            ").concat(setParts === null || setParts === void 0 ? void 0 : setParts.map(function (_a) {
                var description = _a.description, isActive = _a.isActive;
                return "<div class=\"item-set-part ".concat(isActive ? "active" : "", "\">").concat(description, "</div>");
            }).join(""), "\n          </div>")
            : "", "\n        ").concat(partyBonus.length
            ? "<div>\n            ".concat(partyBonus.length ? "<div class=\"item-set-description\">Party Bonuses</div>" : "", "\n            ").concat(partyBonus.map(function (_a) {
                var description = _a.description;
                return "<div class=\"item-set-bonus\">".concat(description, "</div>");
            }).join(""), "\n          </div>")
            : "", "\n        ").concat(isMerchantVisible
            ? "<div class=\"gold-amount ".concat(!goldAmount ? "none" : "", "\">").concat(goldAmount
                ? "".concat(buyOrSell, " for ").concat(this.formatGold(goldAmount), " gold").concat(isQuantity ? " each" : "")
                : "Cannot be sold to merchant", "</div>")
            : "", "\n    </div>").replace(/\n/, "");
    };
    Game.prototype.initSendUpgradeItem = function () {
        var self = this;
        $("#upgrade-btn").on("click", function () {
            var _a;
            var item1 = (_a = self.player.upgrade[0]) === null || _a === void 0 ? void 0 : _a.item;
            if (self.player.upgrade.length >= 2 ||
                (self.player.upgrade.length === 1 &&
                    (Types.isChest(item1) || item1 === "cowkinghorn" || item1 === "petegg" || Types.isWeapon(item1))) ||
                Types.isConsumable(item1)) {
                var hasItemInLastSlot = self.player.upgrade.some(function (_a) {
                    var slot = _a.slot;
                    return slot === 10;
                });
                if (!self.isUpgradeItemSent && !hasItemInLastSlot) {
                    self.client.sendUpgradeItem();
                }
                self.isUpgradeItemSent = true;
            }
        });
    };
    Game.prototype.initUpgradeItemPreview = function () {
        var self = this;
        var previewSlot = $("#upgrade .item-slot:eq(10)");
        $("#upgrade-preview-btn").on("click", function () {
            var itemName;
            var itemLevel;
            var itemBonus;
            var itemSkill;
            var itemSkin;
            var itemSocket;
            var isUpgrade = false;
            var isItemUnique;
            var isItemSuperior;
            self.player.upgrade.forEach(function (_a) {
                var item = _a.item, rawLevel = _a.level, slot = _a.slot, bonus = _a.bonus, skill = _a.skill, skin = _a.skin, socket = _a.socket, isUnique = _a.isUnique, isSuperior = _a.isSuperior;
                if (slot === 0) {
                    itemName = item;
                    itemLevel = Number(rawLevel);
                    itemBonus = bonus;
                    itemSkill = skill;
                    itemSkin = skin;
                    itemSocket = socket;
                    isItemUnique = isUnique;
                    isItemSuperior = isSuperior;
                }
                else if (item.startsWith("scrollupgrade")) {
                    isUpgrade = true;
                }
            });
            var nextLevel = itemLevel + 1;
            if (isUpgrade && itemName && itemLevel) {
                if (previewSlot.is(":empty")) {
                    previewSlot.append(self.createItemDiv({
                        isUnique: isItemUnique,
                        isSuperior: isItemSuperior,
                        item: itemName,
                        level: nextLevel,
                        bonus: itemBonus,
                        skill: itemSkill,
                        skin: itemSkin,
                        socket: itemSocket,
                    }));
                }
            }
        });
    };
    Game.prototype.initDroppable = function () {
        var self = this;
        $(".item-droppable").droppable({
            greedy: true,
            over: function () { },
            out: function () { },
            drop: function (_event, ui) {
                var fromSlot = $(ui.draggable[0]).parent().data("slot");
                var toSlot = $(this).data("slot");
                clearTimeout(this.onSendMoveItemTimeout);
                this.onSendMoveItemTimeout = null;
                self.dropItem(fromSlot, toSlot);
                $(document).tooltip("enable");
            },
        });
    };
    Game.prototype.dropItem = function (fromSlot, toSlot, transferedQuantity, confirmed) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        if (transferedQuantity === void 0) { transferedQuantity = null; }
        if (confirmed === void 0) { confirmed = false; }
        if (fromSlot === toSlot || typeof fromSlot !== "number" || typeof toSlot !== "number") {
            return;
        }
        if (!this.onSendMoveItemTimeout) {
            this.onSendMoveItemTimeout = setTimeout(function () {
                _this.onSendMoveItemTimeout = null;
            }, 1000);
        }
        else {
            return;
        }
        var fromSlotEl = $("[data-slot=\"".concat(fromSlot, "\"]"));
        var fromItemEl = fromSlotEl.find(">div");
        var toSlotEl = $("[data-slot=\"".concat(toSlot, "\"]"));
        var toItemEl = toSlotEl.find(">div");
        var toItem = toItemEl.attr("data-item");
        var toLevel = Number(toItemEl.attr("data-level"));
        var item = fromItemEl.attr("data-item");
        var level = Number(fromItemEl.attr("data-level"));
        var quantity = Number(fromItemEl.attr("data-quantity")) || null;
        var bonus = toArray(fromItemEl.attr("data-bonus"));
        var socket = toArray(fromItemEl.attr("data-socket"));
        var skill = Number(fromItemEl.attr("data-skill")) || null;
        if (Types.isQuantity(item) && quantity > 1 && transferedQuantity === null && !toItem) {
            if ((fromSlot < INVENTORY_SLOT_COUNT || toSlot < INVENTORY_SLOT_COUNT) &&
                ((fromSlot >= STASH_SLOT_RANGE && fromSlot < STASH_SLOT_RANGE + STASH_SLOT_COUNT) ||
                    (toSlot >= STASH_SLOT_RANGE && toSlot < STASH_SLOT_RANGE + STASH_SLOT_COUNT) ||
                    (fromSlot >= TRADE_SLOT_RANGE && fromSlot < TRADE_SLOT_RANGE + TRADE_SLOT_COUNT) ||
                    (toSlot >= TRADE_SLOT_RANGE && toSlot < TRADE_SLOT_RANGE + TRADE_SLOT_COUNT) ||
                    (toSlot >= MERCHANT_SLOT_RANGE && toSlot < MERCHANT_SLOT_RANGE + MERCHANT_SLOT_COUNT))) {
                var isMerchantToSlot = toSlot >= MERCHANT_SLOT_RANGE && toSlot < MERCHANT_SLOT_RANGE + MERCHANT_SLOT_COUNT;
                var title = isMerchantToSlot ? "Choose quantity to sell" : null;
                this.openQuantityModal({ maxQuantity: quantity, quantity: isMerchantToSlot ? 1 : quantity, title: title }, function (selectedQuantity) {
                    clearTimeout(_this.onSendMoveItemTimeout);
                    _this.onSendMoveItemTimeout = null;
                    _this.dropItem(fromSlot, toSlot, selectedQuantity);
                });
                return;
            }
        }
        if (fromSlot >= MERCHANT_SLOT_RANGE &&
            fromSlot < MERCHANT_SLOT_RANGE + MERCHANT_SLOT_COUNT &&
            toSlot < INVENTORY_SLOT_COUNT) {
            var amount = (merchantItems[fromSlot - MERCHANT_SLOT_RANGE] || {}).amount;
            if (amount) {
                var maxQuantity = Math.floor(this.player.gold / amount);
                if (maxQuantity) {
                    this.openQuantityModal({ maxQuantity: maxQuantity, quantity: 1, title: "Choose quantity to buy" }, function (selectedQuantity) {
                        _this.client.sendBuyFromMerchant(fromSlot, toSlot, selectedQuantity);
                    });
                }
            }
            return;
        }
        if (toItem) {
            if (Object.values(Slot).includes(fromSlot) &&
                (!toLevel || !Types.isCorrectTypeForSlot(fromSlot, toItem) || toLevel > this.player.level)) {
                return;
            }
        }
        if (Object.values(Slot).includes(toSlot) && Types.getItemRequirement(item, level) > this.player.level) {
            return;
        }
        var isSuperior = Types.isSuperior(bonus);
        var isUnique = Types.isUnique(item, bonus);
        var isWarningDeleteOrSellItem = !level || level !== 1 || Types.isPetItem(item) || isUnique || isSuperior || (socket && socket.length >= 4);
        if (toSlot === -1) {
            if (isWarningDeleteOrSellItem) {
                this.itemToDelete = { fromSlot: fromSlot, toSlot: toSlot, transferedQuantity: transferedQuantity, isSuperior: isSuperior, isUnique: isUnique };
                $("#dialog-delete-item").dialog("open");
                this.slotToDelete = fromSlot;
                return;
            }
            fromItemEl.remove();
        }
        else if (toSlot >= MERCHANT_SLOT_RANGE && toSlot < MERCHANT_SLOT_RANGE + MERCHANT_SLOT_COUNT && !confirmed) {
            if (isWarningDeleteOrSellItem) {
                this.confirmedSoldItemToMerchant = {
                    fromSlot: fromSlot,
                    toSlot: toSlot,
                    transferedQuantity: transferedQuantity,
                    confirmed: true,
                    isSuperior: isSuperior,
                    isUnique: isUnique,
                    amount: itemGoldMap[item] * transferedQuantity,
                };
                $("#dialog-merchant-item").dialog("open");
                return;
            }
        }
        else {
            toSlotEl.append(fromItemEl.detach());
            if (toItemEl.length) {
                fromSlotEl.append(toItemEl.detach());
            }
        }
        if (toSlot >= MERCHANT_SLOT_RANGE && toSlot < MERCHANT_SLOT_RANGE + MERCHANT_SLOT_COUNT) {
            if (fromSlot < INVENTORY_SLOT_COUNT) {
                if (!this.isPanelOpened) {
                    this.client.sendBanPlayer("Player tried to sell item to Merchant.");
                    return;
                }
                this.client.sendSellToMerchant(fromSlot, transferedQuantity || 1);
            }
            return;
        }
        this.client.sendMoveItem(fromSlot, toSlot, transferedQuantity);
        if (typeof level === "number") {
            if (toSlot === Slot.WEAPON) {
                (_a = this.player) === null || _a === void 0 ? void 0 : _a.switchWeapon(item, level, bonus, socket, skill);
            }
            else if (toSlot === Slot.ARMOR) {
                (_b = this.player) === null || _b === void 0 ? void 0 : _b.switchArmor(this.getSprite(item), level, bonus, socket);
            }
            else if (toSlot === Slot.HELM) {
                (_c = this.player) === null || _c === void 0 ? void 0 : _c.switchHelm(item, level, bonus, socket);
            }
            else if (toSlot === Slot.CAPE) {
                (_d = this.player) === null || _d === void 0 ? void 0 : _d.switchCape(item, level, bonus);
            }
            else if (toSlot === Slot.SHIELD) {
                (_e = this.player) === null || _e === void 0 ? void 0 : _e.switchShield(item, level, bonus, socket, skill);
                this.setDefenseSkill(skill);
            }
        }
        var type = kinds[item][1];
        if (type === "helm" && $("#item-player .item-equip-helm").is(":empty")) {
            this.player.switchHelm("helmcloth", 1);
        }
        else if (type === "armor" && $("#item-player .item-equip-armor").is(":empty")) {
            this.player.switchArmor(this.getSprite("clotharmor"), 1);
        }
        else if (type === "weapon" && $("#item-player .item-equip-weapon").is(":empty")) {
            this.player.switchWeapon("dagger", 1);
        }
        else if (type === "cape" && $("#item-player .item-equip-cape").is(":empty")) {
            this.player.removeCape();
        }
        else if (type === "shield" && $("#item-player .item-equip-shield").is(":empty")) {
            this.player.removeShield();
        }
    };
    Game.prototype.openQuantityModal = function (_a, submit) {
        var maxQuantity = _a.maxQuantity, quantity = _a.quantity, title = _a.title;
        $("#container").addClass("prevent-click");
        var prepareSubmit = function () {
            var quantity = Number($("#transfer-quantity").val());
            if (validateQuantity(quantity) && quantity <= maxQuantity) {
                submit(quantity);
            }
            $("#container").removeClass("prevent-click");
            $("#dialog-quantity").dialog("close");
        };
        $("#dialog-quantity").dialog({
            dialogClass: "no-close",
            autoOpen: true,
            draggable: false,
            title: title || "Choose quantity to transfer",
            classes: {
                "ui-button": "btn",
            },
            buttons: [
                {
                    text: "Cancel",
                    class: "btn btn-default",
                    click: function () {
                        $(this).dialog("close");
                        $("#container").removeClass("prevent-click");
                    },
                },
                {
                    text: "Ok",
                    class: "btn",
                    click: prepareSubmit,
                },
            ],
        });
        $("#dialog-quantity").html("<div style=\"margin: 24px 0; text-align: center;\">\n        <input id=\"transfer-quantity\" type=\"number\" min=\"1\" max=\"".concat(maxQuantity, "\" style=\"width: 50%;font-family: 'GraphicPixel';\" />\n      </div>"));
        $("#transfer-quantity")
            .on("input", function (event) {
            var inputValue = parseInt($(event.target).val());
            if (inputValue && inputValue > maxQuantity) {
                $(event.target).val(maxQuantity);
            }
        })
            .on("keyup", function (e) {
            if (e.keyCode === Types.Keys.ENTER) {
                prepareSubmit();
            }
        })
            .val(quantity || maxQuantity)
            .trigger("focus")
            .trigger("select");
        $(".ui-button").removeClass("ui-button");
    };
    Game.prototype.deleteItemFromSlot = function () {
        if (typeof this.slotToDelete !== "number")
            return;
        this.client.sendMoveItem(this.slotToDelete, -1);
        $("[data-slot=\"".concat(this.slotToDelete, "\"] >div")).remove();
        this.hoverSlotToDelete = null;
    };
    Game.prototype.destroyDroppable = function () {
        $(".item-droppable.ui-droppable").droppable("destroy");
    };
    Game.prototype.initDraggable = function () {
        var self = this;
        $(".item-draggable:not(.item-faded)").draggable({
            zIndex: 100,
            revertDuration: 0,
            revert: true,
            containment: "#canvasborder",
            drag: function () { },
            start: function () {
                self.isDragStarted = true;
                $(document).tooltip("disable");
                $(this).parent().addClass("ui-droppable-origin");
                var item = $(this).attr("data-item");
                var type = kinds[item][1];
                if (["weapon", "helm", "armor", "belt", "cape", "shield", "chest", "ring", "amulet", "consumable"].includes(type) &&
                    $(".item-".concat(type)).is(":empty")) {
                    $(".item-".concat(type)).addClass("item-droppable");
                }
                else if (Types.isScroll(item)) {
                    $(".item-scroll").addClass("item-droppable");
                }
                else if (Types.isRune(item) || Types.isStone(item) || Types.isJewel(item)) {
                    $(".item-recipe").addClass("item-droppable");
                }
                else if (Types.isBar(item)) {
                    $(".item-trade").addClass("item-droppable");
                }
                else if (Types.isSingle(item)) {
                    $(".item-single").addClass("item-droppable");
                }
                else if (Types.isPetItem(item)) {
                    $(".item-pet").addClass("item-droppable");
                    if (item === "petegg") {
                        $(".item-equip-pet").removeClass("item-droppable");
                    }
                }
                if ($("#merchant").hasClass("visible") && $(this).closest("#inventory")[0]) {
                    if (itemGoldMap[item]) {
                        $(".item-merchant-empty").addClass("item-droppable");
                    }
                }
                $(".item-not-droppable").removeClass("item-droppable");
                self.initDroppable();
            },
            stop: function () {
                self.destroyDroppable();
                $(".ui-droppable-origin").removeClass("ui-droppable-origin");
                $(".item-weapon, .item-armor, .item-ring, .item-amulet, .item-belt, .item-shield, .item-helm, .item-cape, .item-pet, .item-chest, .item-scroll, .item-merchant").removeClass("item-droppable");
            },
        });
    };
    Game.prototype.destroyDraggable = function () {
        if (this.isDragStarted) {
            $(".item-draggable.ui-draggable").draggable("destroy");
            this.isDragStarted = false;
        }
    };
    Game.prototype.getIconPath = function (spriteName, level, skin) {
        var scale = this.renderer.getScaleFactor();
        var suffix = "";
        if (spriteName === "cape" && level >= 7) {
            suffix = "7";
        }
        else if (spriteName === "jewelskull" && level > 2) {
            suffix = Types.getJewelSkinIndex(level);
        }
        else if (skin) {
            suffix = "-".concat(skin);
        }
        return "img/".concat(scale, "/item-").concat(spriteName).concat(suffix, ".png");
    };
    Game.prototype.initOtherPlayerEquipmentSlots = function (player) {
        var container = $("#item-otherplayer");
        container.find(".item-weapon-slot").html("<div class=\"item-slot item-equip-weapon item-weapon\"></div>");
        container.find(".item-helm-slot").html("<div class=\"item-slot item-equip-helm item-helm\"></div>");
        container.find(".item-armor-slot").html("<div class=\"item-slot item-equip-armor item-armor\"></div>");
        container.find(".item-belt-slot").html("<div class=\"item-slot item-equip-belt item-belt\"></div>");
        container.find(".item-cape-slot").html("<div class=\"item-slot item-equip-cape item-cape\"></div>");
        container.find(".item-pet-slot").html("<div class=\"item-slot item-equip-pet item-pet\"></div>");
        container.find(".item-shield-slot").html("<div class=\"item-slot item-equip-shield item-shield\"></div>");
        container.find(".item-ring1-slot").html("<div class=\"item-slot item-equip-ring item-ring item-ring1\"></div>");
        container.find(".item-ring2-slot").html("<div class=\"item-slot item-equip-ring item-ring item-ring2\"></div>");
        container.find(".item-amulet-slot").html("<div class=\"item-slot item-equip-amulet item-amulet\"></div>");
        this.populateEquipmentInSlots(player, container);
    };
    Game.prototype.initPlayerEquipmentSlots = function () {
        var container = $("#item-player");
        container
            .find(".item-weapon-slot")
            .html("<div class=\"item-slot item-equip-weapon item-weapon\" data-slot=\"".concat(Slot.WEAPON, "\"></div>"));
        container
            .find(".item-helm-slot")
            .html("<div class=\"item-slot item-equip-helm item-helm\" data-slot=\"".concat(Slot.HELM, "\"></div>"));
        container
            .find(".item-armor-slot")
            .html("<div class=\"item-slot item-equip-armor item-armor\" data-slot=\"".concat(Slot.ARMOR, "\"></div>"));
        container
            .find(".item-belt-slot")
            .html("<div class=\"item-slot item-equip-belt item-belt\" data-slot=\"".concat(Slot.BELT, "\"></div>"));
        container
            .find(".item-cape-slot")
            .html("<div class=\"item-slot item-equip-cape item-cape\" data-slot=\"".concat(Slot.CAPE, "\"></div>"));
        container
            .find(".item-pet-slot")
            .html("<div class=\"item-slot item-equip-pet item-pet\" data-slot=\"".concat(Slot.PET, "\"></div>"));
        container
            .find(".item-shield-slot")
            .html("<div class=\"item-slot item-equip-shield item-shield\" data-slot=\"".concat(Slot.SHIELD, "\"></div>"));
        container
            .find(".item-ring1-slot")
            .html("<div class=\"item-slot item-equip-ring item-ring item-ring1\" data-slot=\"".concat(Slot.RING1, "\"></div>"));
        container
            .find(".item-ring2-slot")
            .html("<div class=\"item-slot item-equip-ring item-ring item-ring2\" data-slot=\"".concat(Slot.RING2, "\"></div>"));
        container
            .find(".item-amulet-slot")
            .html("<div class=\"item-slot item-equip-amulet item-amulet\" data-slot=\"".concat(Slot.AMULET, "\"></div>"));
        container
            .find(".item-delete-slot")
            .html("<div class=\"item-slot item-droppable item-delete\" data-slot=\"".concat(DELETE_SLOT, "\"></div>"));
        this.populateEquipmentInSlots(this.player, container);
    };
    Game.prototype.populateEquipmentInSlots = function (player, container) {
        var _this = this;
        if (player.weaponName && player.weaponName !== "dagger") {
            var isUnique = Types.isUnique(player.weaponName, player.weaponBonus);
            var isSuperior = Types.isSuperior(player.weaponBonus);
            var runeword = Types.getRunewordBonus({
                isUnique: isUnique,
                socket: player.weaponSocket,
                type: "weapon",
            }).runeword;
            container.find(".item-equip-weapon").html($("<div />", {
                class: "item-draggable ".concat(isUnique ? "item-unique" : "", " ").concat(isSuperior ? "item-superior" : "", " ").concat(!!runeword ? "item-runeword" : ""),
                css: {
                    "background-image": "url(\"".concat(this.getIconPath(player.weaponName), "\")"),
                },
                "data-item": player.weaponName,
                "data-level": player.weaponLevel,
                "data-bonus": toString(player.weaponBonus),
                "data-socket": toString(player.weaponSocket),
                "data-skill": player.attackSkill,
                click: function (event) {
                    _this.handleClick(event);
                },
            }));
        }
        if (player.helmName && player.helmName !== "helmcloth") {
            var isUnique = Types.isUnique(player.helmName, player.helmBonus);
            var isSuperior = Types.isSuperior(player.helmBonus);
            var runeword = Types.getRunewordBonus({
                isUnique: isUnique,
                socket: player.helmSocket,
                type: "helm",
            }).runeword;
            container.find(".item-equip-helm").html($("<div />", {
                class: "item-draggable ".concat(isUnique ? "item-unique" : "", " ").concat(isSuperior ? "item-superior" : "", " ").concat(!!runeword ? "item-runeword" : ""),
                css: {
                    "background-image": "url(\"".concat(this.getIconPath(player.helmName), "\")"),
                },
                "data-item": player.helmName,
                "data-level": player.helmLevel,
                "data-bonus": toString(player.helmBonus),
                "data-socket": toString(player.helmSocket),
                click: function (event) {
                    _this.handleClick(event);
                },
            }));
        }
        if (player.armorName && player.armorName !== "clotharmor") {
            var isUnique = Types.isUnique(player.armorName, player.armorBonus);
            var isSuperior = Types.isSuperior(player.armorBonus);
            var runeword = Types.getRunewordBonus({
                isUnique: isUnique,
                socket: player.armorSocket,
                type: "armor",
            }).runeword;
            container.find(".item-equip-armor").html($("<div />", {
                class: "item-draggable ".concat(isUnique ? "item-unique" : "", " ").concat(isSuperior ? "item-superior" : "", " ").concat(!!runeword ? "item-runeword" : ""),
                css: {
                    "background-image": "url(\"".concat(this.getIconPath(player.armorName), "\")"),
                },
                "data-item": player.armorName,
                "data-level": player.armorLevel,
                "data-bonus": toString(player.armorBonus),
                "data-socket": toString(player.armorSocket),
                click: function (event) {
                    _this.handleClick(event);
                },
            }));
        }
        if (player.beltName) {
            var isUnique = Types.isUnique(player.armorName, player.beltBonus);
            var isSuperior = Types.isSuperior(player.beltBonus);
            container.find(".item-equip-belt").html($("<div />", {
                class: "item-draggable ".concat(isUnique ? "item-unique" : "", " ").concat(isSuperior ? "item-superior" : ""),
                css: {
                    "background-image": "url(\"".concat(this.getIconPath(player.beltName), "\")"),
                },
                "data-item": player.beltName,
                "data-level": player.beltLevel,
                "data-bonus": toString(player.beltBonus),
                click: function (event) {
                    _this.handleClick(event);
                },
            }));
        }
        if (player.cape) {
            var isUnique = Types.isUnique(player.cape, player.capeBonus);
            var isSuperior = Types.isSuperior(player.capeBonus);
            container.find(".item-equip-cape").html($("<div />", {
                class: "item-draggable ".concat(isUnique ? "item-unique" : "", "  ").concat(isSuperior ? "item-superior" : ""),
                css: {
                    "background-image": "url(\"".concat(this.getIconPath(player.cape, player.capeLevel), "\")"),
                },
                "data-item": player.cape,
                "data-level": player.capeLevel,
                "data-bonus": toString(player.capeBonus),
                click: function (event) {
                    _this.handleClick(event);
                },
            }));
        }
        if (player.pet) {
            var isUnique = Types.isUnique(player.pet, player.petBonus);
            var isSuperior = Types.isSuperior(player.petBonus);
            container.find(".item-equip-pet").html($("<div />", {
                class: "item-draggable ".concat(isUnique ? "item-unique" : "", "  ").concat(isSuperior ? "item-superior" : ""),
                css: {
                    "background-image": "url(\"".concat(this.getIconPath(player.pet, player.petLevel, player.petSkin), "\")"),
                },
                "data-item": player.pet,
                "data-level": player.petLevel,
                "data-bonus": toString(player.petBonus),
                "data-socket": toString(player.petSocket),
                click: function (event) {
                    _this.handleClick(event);
                },
            }));
        }
        if (player.shieldName) {
            var isUnique = Types.isUnique(player.shieldName, player.shieldBonus);
            var isSuperior = Types.isSuperior(player.shieldBonus);
            var runeword = Types.getRunewordBonus({
                isUnique: isUnique,
                socket: player.shieldSocket,
                type: "shield",
            }).runeword;
            container.find(".item-equip-shield").html($("<div />", {
                class: "item-draggable ".concat(isUnique ? "item-unique" : "", " ").concat(isSuperior ? "item-superior" : "", " ").concat(!!runeword ? "item-runeword" : ""),
                css: {
                    "background-image": "url(\"".concat(this.getIconPath(player.shieldName), "\")"),
                },
                "data-item": player.shieldName,
                "data-level": player.shieldLevel,
                "data-bonus": toString(player.shieldBonus),
                "data-socket": toString(player.shieldSocket),
                "data-skill": player.defenseSkill,
                click: function (event) {
                    _this.handleClick(event);
                },
            }));
        }
        if (player.ring1Name) {
            container.find(".item-ring1").html($("<div />", {
                class: "item-draggable ".concat(Types.isUniqueRing(player.ring1Name, player.ring1Bonus) ? "item-unique" : ""),
                css: {
                    "background-image": "url(\"".concat(this.getIconPath(player.ring1Name), "\")"),
                },
                "data-item": player.ring1Name,
                "data-level": player.ring1Level,
                "data-bonus": toString(player.ring1Bonus),
                click: function (event) {
                    _this.handleClick(event);
                },
            }));
        }
        if (player.ring2Name) {
            container.find(".item-ring2").html($("<div />", {
                class: "item-draggable ".concat(Types.isUniqueRing(player.ring2Name, player.ring2Bonus) ? "item-unique" : ""),
                css: {
                    "background-image": "url(\"".concat(this.getIconPath(player.ring2Name), "\")"),
                },
                "data-item": player.ring2Name,
                "data-level": player.ring2Level,
                "data-bonus": toString(player.ring2Bonus),
                click: function (event) {
                    _this.handleClick(event);
                },
            }));
        }
        if (player.amuletName) {
            container.find(".item-equip-amulet").html($("<div />", {
                class: "item-draggable ".concat(Types.isUniqueAmulet(player.amuletName) ? "item-unique" : ""),
                css: {
                    "background-image": "url(\"".concat(this.getIconPath(player.amuletName), "\")"),
                },
                "data-item": player.amuletName,
                "data-level": player.amuletLevel,
                "data-bonus": toString(player.amuletBonus),
                click: function (event) {
                    _this.handleClick(event);
                },
            }));
        }
    };
    Game.prototype.initInventory = function () {
        $("#item-inventory").empty();
        for (var i = 0; i < INVENTORY_SLOT_COUNT; i++) {
            $("#item-inventory").append("<div class=\"item-slot item-inventory item-droppable\" data-slot=\"".concat(i, "\"></div>"));
        }
        this.initPlayerEquipmentSlots();
        this.updateInventory();
        this.updateRequirement();
    };
    Game.prototype.updateInventory = function () {
        var _this = this;
        if ($("#inventory").hasClass("visible")) {
            $("#inventory .item-draggable.ui-draggable").draggable("destroy");
        }
        $(".item-inventory").empty();
        this.player.inventory.forEach(function (_a) {
            var slot = _a.slot, item = __rest(_a, ["slot"]);
            $("#item-inventory .item-slot:eq(".concat(slot, ")")).append(_this.createItemDiv(item));
        });
        if ($("#inventory").hasClass("visible")) {
            this.initDraggable();
        }
        this.updateRequirement();
    };
    Game.prototype.initTeleportContextMenu = function () {
        var _this = this;
        var hasStoneTeleportInInventory = !!this.player.inventory.find(function (_a) {
            var item = _a.item;
            return item === "stoneteleport";
        });
        var contextMenu = $("party-player-list .player-name").data("contextMenu");
        if (contextMenu) {
            $("#party-player-list .player-name").data("contextMenu", "destroy");
            $("#party-player-list .player-name").contextMenu("destroy");
        }
        $("#party-player-list")
            .off("click")
            .on("click", function (event) {
            $("#foreground").trigger(event);
        });
        $.contextMenu({
            selector: "#party-player-list .player-name",
            build: function (_event) {
                var playerId = Number($(_event.target).attr("data-player-id"));
                var playerName = String($(_event.target).text().trim());
                return playerId
                    ? {
                        callback: function () {
                            if (hasStoneTeleportInInventory && !Object.keys(_this.player.attackers).length) {
                                _this.client.sendStoneTeleport(playerId);
                            }
                        },
                        items: {
                            player: {
                                name: hasStoneTeleportInInventory
                                    ? "Teleport to ".concat(playerName)
                                    : "you don't have Teleport stone in your inventory",
                                disabled: playerId === _this.player.id || !hasStoneTeleportInInventory,
                            },
                        },
                    }
                    : null;
            },
        });
    };
    Game.prototype.updateMerchant = function () {
        if ($("#merchant").hasClass("visible")) {
            $("#merchant .item-draggable.ui-draggable").draggable("destroy");
        }
        this.initMerchant();
        if ($("#merchant").hasClass("visible")) {
            this.initDraggable();
        }
    };
    Game.prototype.updateStash = function () {
        var _this = this;
        if ($("#stash").hasClass("visible")) {
            $("#stash .item-draggable.ui-draggable").draggable("destroy");
        }
        $(".item-stash").empty();
        this.player.stash.forEach(function (_a) {
            var slot = _a.slot, item = __rest(_a, ["slot"]);
            $("#item-stash .item-slot:eq(".concat(slot, ")")).append(_this.createItemDiv(item));
        });
        if ($("#stash").hasClass("visible")) {
            this.initDraggable();
        }
        this.updateRequirement();
    };
    Game.prototype.updateRequirement = function () {
        var self = this;
        $("[data-requirement]").each(function () {
            var requirement = $(this).data("requirement");
            var backgroundColor = "inherit";
            if (requirement > self.player.level) {
                backgroundColor = "rgba(158, 0, 0, 0.5)";
            }
            $(this).css("background-color", backgroundColor);
        });
    };
    Game.prototype.initUpgrade = function () {
        $("#upgrade-scroll").empty();
        for (var i = 1; i < 10; i++) {
            $("#upgrade-scroll").append("<div class=\"item-slot item-scroll item-recipe item-single\" data-slot=\"".concat(UPGRADE_SLOT_RANGE + i, "\"></div>"));
        }
        $("#upgrade-item")
            .empty()
            .append("<div class=\"item-slot item-upgrade item-weapon item-armor item-ring item-amulet item-belt item-helm item-cape item-pet item-shield item-chest item-consumable\" data-slot=\"".concat(UPGRADE_SLOT_RANGE, "\"></div>"));
        $("#upgrade-result")
            .empty()
            .append("<div class=\"item-slot item-upgraded\" data-slot=\"".concat(UPGRADE_SLOT_RANGE + UPGRADE_SLOT_COUNT - 1, "\"></div>"));
    };
    Game.prototype.initTrade = function () {
        $("#trade-player1-item").empty();
        $("#trade-player2-item").empty();
        for (var i = 0; i < 9; i++) {
            $("#trade-player1-item").append("<div class=\"item-slot item-trade item-weapon item-armor item-ring item-amulet item-belt item-helm item-cape item-pet item-shield item-chest item-scroll item-recipe item-consumable\" data-slot=\"".concat(TRADE_SLOT_RANGE + i, "\"></div>"));
            $("#trade-player2-item").append("<div class=\"item-slot item-trade\"></div>");
        }
    };
    Game.prototype.initMerchant = function () {
        var _a;
        $("#item-merchant").empty();
        for (var i = 0; i < MERCHANT_SLOT_COUNT; i++) {
            var slot = MERCHANT_SLOT_RANGE + i;
            $("#item-merchant").append("<div class=\"item-slot item-merchant ".concat(!merchantItems[i] ? "item-merchant-empty" : "", "\" data-slot=\"").concat(slot, "\"></div>"));
            if ((_a = merchantItems[i]) === null || _a === void 0 ? void 0 : _a.item) {
                $("#item-merchant .item-slot:eq(".concat(i, ")")).append(this.createItemDiv(merchantItems[i]));
            }
        }
    };
    Game.prototype.updateTradePlayer1 = function (isDraggable) {
        var _this = this;
        if (isDraggable === void 0) { isDraggable = true; }
        if ($("#trade").hasClass("visible")) {
            $("#trade-player1-item .item-draggable.ui-draggable").draggable("destroy");
        }
        $("#trade-player1-item .item-trade").empty();
        this.player.tradePlayer1.forEach(function (_a) {
            var slot = _a.slot, item = __rest(_a, ["slot"]);
            $("#trade-player1-item .item-slot:eq(".concat(slot, ")")).append(_this.createItemDiv(item, { isDraggable: isDraggable }));
        });
        $("#trade-player1-item .item-trade").toggleClass("item-not-droppable", !isDraggable);
        if ($("#trade").hasClass("visible")) {
            this.initDraggable();
        }
        this.updateRequirement();
    };
    Game.prototype.updateTradePlayer2 = function () {
        var _this = this;
        $("#trade-player2-item .item-trade").empty();
        this.player.tradePlayer2.forEach(function (_a) {
            var slot = _a.slot, item = __rest(_a, ["slot"]);
            $("#trade-player2-item .item-slot:eq(".concat(slot, ")")).append(_this.createItemDiv(item, { isDraggable: false }));
        });
        this.updateRequirement();
    };
    Game.prototype.createItemDiv = function (_a, _b) {
        var _this = this;
        var quantity = _a.quantity, isUnique = _a.isUnique, isSuperior = _a.isSuperior, item = _a.item, level = _a.level, bonus = _a.bonus, socket = _a.socket, skill = _a.skill, skin = _a.skin, requirement = _a.requirement, runeword = _a.runeword, amount = _a.amount;
        var _c = _b === void 0 ? {} : _b, _d = _c.isDraggable, isDraggable = _d === void 0 ? true : _d;
        if (socket) {
            var socketRequirement = Types.getHighestSocketRequirement(JSON.parse(socket));
            if (socketRequirement > requirement) {
                requirement = socketRequirement;
            }
        }
        return $("<div />", __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ class: "".concat(isDraggable ? "item-draggable" : "item-not-draggable", " ").concat(quantity ? "item-quantity" : "", " ").concat(isUnique ? "item-unique" : "", " ").concat(isSuperior ? "item-superior" : "", " ").concat(runeword ? "item-runeword" : ""), css: {
                "background-image": "url(\"".concat(this.getIconPath(item, level, skin), "\")"),
                position: "relative",
            }, "data-item": item, "data-level": level }, (quantity ? { "data-quantity": quantity } : null)), (bonus ? { "data-bonus": toString(bonus) } : null)), (socket ? { "data-socket": toString(socket) } : null)), (skill ? { "data-skill": skill } : null)), (skin ? { "data-skin": skin } : null)), (requirement ? { "data-requirement": requirement } : null)), (amount ? { "data-amount": amount } : null)), { click: function (event) {
                _this.handleClick(event);
            } }));
    };
    Game.prototype.handleClick = function (event) {
        if (!event.shiftKey) {
            return;
        }
        var slot = Number($(event.currentTarget).parent().attr("data-slot"));
        if (isNaN(slot))
            return;
        var item = $(event.currentTarget).attr("data-item");
        if (!item)
            return;
        var type = kinds[item][1];
        if (!type)
            return;
        var destination;
        var isEquipItem = false;
        var isUnEquipItem = false;
        if (slot >= Slot.WEAPON && slot <= Slot.HELM) {
            destination = $("#inventory");
            isUnEquipItem = true;
        }
        else if (slot < INVENTORY_SLOT_COUNT || slot === UPGRADE_SLOT_RANGE + UPGRADE_SLOT_COUNT - 1) {
            if ($("#upgrade").hasClass("visible")) {
                destination = $("#upgrade");
            }
            else if ($("#stash").hasClass("visible")) {
                destination = $("#stash");
            }
            else if ($("#trade").hasClass("visible")) {
                destination = $("#trade");
            }
            else if ($("#merchant").hasClass("visible")) {
                if (itemGoldMap[item]) {
                    destination = $("#merchant");
                }
            }
            else {
                destination = $("#inventory");
                isEquipItem = true;
            }
        }
        else if (slot >= STASH_SLOT_RANGE && slot < STASH_SLOT_RANGE + STASH_SLOT_COUNT) {
            if ($("#inventory").hasClass("visible")) {
                destination = $("#inventory");
            }
        }
        if (!destination)
            return;
        var matchType = type;
        if (Types.isRune(item) || Types.isStone(item) || Types.isJewel(item)) {
            matchType = "scroll";
        }
        else if (Types.isBar(item)) {
            matchType = "trade";
        }
        else if (Types.isSingle(item)) {
            matchType = "single";
        }
        var destinationSlot;
        if (isUnEquipItem) {
            destinationSlot = destination.find("#item-inventory .item-droppable:empty").first().attr("data-slot");
        }
        else if (isEquipItem) {
            destinationSlot =
                destination.find("#item-player .item-".concat(type, ":empty")).first().attr("data-slot") ||
                    destination.find("#item-player .item-".concat(type)).first().attr("data-slot");
        }
        else {
            destinationSlot = destination
                .find(".item-".concat(matchType, ":empty, .item-droppable:not(.item-delete):empty:visible, .item-merchant-empty:empty"))
                .first()
                .attr("data-slot");
        }
        if (!destinationSlot)
            return;
        this.dropItem(slot, Number(destinationSlot));
    };
    Game.prototype.updateUpgrade = function (_a) {
        var _this = this;
        var luckySlot = _a.luckySlot, isSuccess = _a.isSuccess;
        if ($("#inventory").hasClass("visible")) {
            $("#upgrade .item-draggable.ui-draggable").draggable("destroy");
        }
        $(".item-upgrade").empty();
        $(".item-upgraded").empty();
        $("#upgrade .item-slot").removeClass("item-upgrade-success-slot item-upgrade-fail-slot");
        if (luckySlot) {
            $("#upgrade .item-slot:eq(".concat(luckySlot, ")")).addClass("item-upgrade-success-slot");
            $(".item-scroll").find("> div").addClass("item-faded");
        }
        else {
            $(".item-scroll").empty();
        }
        if (isSuccess) {
            $("#upgrade-result .item-slot").addClass("item-upgrade-success-slot");
        }
        else if (isSuccess === false) {
            $("#upgrade-result .item-slot").addClass("item-upgrade-fail-slot");
        }
        var successRate;
        var itemLevel;
        var itemName;
        var itemBonus;
        var actionText = "upgrade";
        var uniqueText = "";
        var runeUpgrade = "";
        var rune = "";
        var isSuperior = false;
        var isTransmute = false;
        var isJewel = false;
        var jewelRequirement;
        var nextLevelRequirement;
        var runeCount = 0;
        var jewelCount = 0;
        var isRune = false;
        var nextLevel;
        var warningMessage = "";
        if (!this.player.upgrade.length) {
            return;
        }
        this.player.upgrade.forEach(function (_a) {
            var item = _a.item, rawLevel = _a.level, quantity = _a.quantity, slot = _a.slot, bonus = _a.bonus, socket = _a.socket, skill = _a.skill, skin = _a.skin, isUnique = _a.isUnique;
            if (slot === 0) {
                itemLevel = Number(rawLevel);
                nextLevel = itemLevel + 1;
                isSuperior = Types.isSuperior(bonus);
            }
            else {
                isSuperior = false;
                isTransmute = item.startsWith("scrolltransmute") || item.startsWith("scrolltransmuteblessed");
            }
            isRune = Types.isRune(item);
            if (isRune) {
                runeCount++;
            }
            isJewel = Types.isJewel(item);
            if (isJewel) {
                jewelCount++;
            }
            jewelRequirement = isJewel ? Types.getJewelRequirement(bonus) : null;
            if (slot === 0 && itemLevel) {
                itemName = item;
                itemBonus = bonus;
                var successRates = Types.getUpgradeSuccessRates();
                successRate = successRates[itemLevel - 1];
            }
            else if (slot) {
                if (itemName && item.startsWith("scrolltransmute")) {
                    var isBlessed = item.startsWith("scrolltransmuteblessed");
                    var _b = Types.getTransmuteSuccessRate(itemName, itemBonus, isBlessed) || {}, transmuteSuccessRate = _b.transmuteSuccessRate, uniqueSuccessRate = _b.uniqueSuccessRate;
                    if (item === "scrolltransmutepet") {
                        successRate = 99;
                        uniqueText = "";
                    }
                    else {
                        successRate = transmuteSuccessRate || uniqueSuccessRate;
                        uniqueText = uniqueSuccessRate === 100 ? "" : uniqueSuccessRate;
                    }
                    actionText = "transmute";
                }
                else if (itemLevel && (item.startsWith("scrollupgradeblessed") || item.startsWith("scrollupgradesacred"))) {
                    var blessedRates = Types.getBlessedSuccessRateBonus();
                    var blessedRate = blessedRates[itemLevel - 1];
                    successRate += blessedRate;
                }
                else if (!itemName && Types.isRune(item)) {
                    if (rune === "") {
                        rune = item;
                    }
                    else if (rune !== item && !item.startsWith("scrollupgrade")) {
                        rune = null;
                    }
                }
                else if (!item.startsWith("scrollupgrade")) {
                    successRate = null;
                }
                if (item.startsWith("scrollupgradeelement") || item.startsWith("scrollupgradeskillrandom")) {
                    successRate = 99;
                    uniqueText = "";
                }
            }
            if (item && Types.isEquipableItem(item)) {
                if (itemLevel) {
                    nextLevelRequirement = Types.getItemRequirement(item, nextLevel);
                    if (nextLevelRequirement > _this.player.level) {
                        warningMessage = "If upgraded,the item lvl requirement will be ".concat(nextLevelRequirement, ", you are lv. ").concat(_this.player.level, ", you'll not be able to equip it");
                    }
                }
            }
            else if (runeCount > 1) {
                warningMessage = "you need to socket runes 1 by 1 on your item to not mess up the order to create runewords.";
            }
            else if (jewelCount > 1) {
                warningMessage = "Jewels can only  be inserted  1 by 1 on your item sockets.";
            }
            else if (isRune) {
                var rune_1 = isRune ? Types.getRuneFromItem(item) : null;
                if (rune_1 && rune_1.requirement > _this.player.level) {
                    warningMessage = "If the rune is placed in an item, lv. requirement will be ".concat(rune_1.requirement, ", you are lv.").concat(_this.player.level, ", you'll not be able to equip it");
                }
            }
            else if (isJewel) {
                if (jewelRequirement > _this.player.level) {
                    warningMessage = "If the jewel is placed in an item, lv. requirement will be ".concat(jewelRequirement, ", you are lv.").concat(_this.player.level, ", you'll not be able to equip it");
                }
            }
            else if (_this.player.expansion2 && item === "expansion2voucher") {
                warningMessage = "You've already unlocked the Lost Temple expansion, the voucher will be rejected.";
            }
            $("#upgrade .item-slot:eq(".concat(slot, ")"))
                .removeClass("item-droppable")
                .append(_this.createItemDiv({ quantity: quantity, isUnique: isUnique, isSuperior: isSuperior, item: item, level: rawLevel, bonus: bonus, socket: socket, skill: skill, skin: skin }));
        });
        if (rune) {
            var runeName = Types.getRuneNameFromItem(rune);
            var runeRank = Types.runeKind[runeName].rank;
            var runeClass = Types.getItemClass(rune);
            var nextRune = Types.RuneList[runeRank];
            if (nextRune) {
                runeUpgrade = "Combine ".concat(runeRank < 18 ? 3 : 2, " ").concat(runeName.toUpperCase(), " runes with a ").concat(_.capitalize(runeClass), " Upgrade Scroll to forge 1 ").concat(nextRune.toUpperCase(), " rune");
            }
        }
        if (isTransmute && isSuperior) {
            warningMessage = "You cannot transmute a Superior item";
        }
        $("#upgrade-info")
            .html(warningMessage
            ? warningMessage
            : successRate
                ? "".concat(successRate, "% chance of successful ").concat(actionText).concat(uniqueText ? "<br />".concat(uniqueText, "% chance to be unique") : "")
                : runeUpgrade || "&nbsp;")
            .toggleClass("warning", !!warningMessage);
        if ($("#upgrade").hasClass("visible")) {
            this.initDraggable();
        }
    };
    Game.prototype.initStash = function () {
        var _this = this;
        $("#item-stash").empty();
        var counter = STASH_SLOT_RANGE;
        for (var i = 0; i < STASH_SLOT_PAGES; i++) {
            $("#item-stash").append("<div class=\"item-stash-page page-".concat(i, " ").concat(i === this.currentStashPage ? "visible" : "", "\"></div>"));
            for (var ii = 0; ii < STASH_SLOT_PER_PAGE; ii++) {
                $("#item-stash .item-stash-page.page-".concat(i)).append("<div class=\"item-slot item-stash item-droppable\" data-slot=\"".concat(counter, "\"></div>"));
                counter++;
            }
        }
        var togglePage = function () {
            $(".item-stash-page").removeClass("visible");
            $(".item-stash-page.page-".concat(_this.currentStashPage)).addClass("visible");
            $("#current-stash-page").text(_this.currentStashPage + 1);
            previousButton.toggleClass("disabled btn-default", _this.currentStashPage === 0);
            nextButton.toggleClass("disabled btn-default", _this.currentStashPage >= STASH_SLOT_PAGES - 1);
        };
        var previousButton = $("#item-stash-previous-page");
        var nextButton = $("#item-stash-next-page");
        previousButton.off("click").on("click", function () {
            if (_this.currentStashPage > 0) {
                _this.currentStashPage--;
                togglePage();
            }
        });
        nextButton.off("click").on("click", function () {
            if (_this.currentStashPage < STASH_SLOT_PAGES - 1) {
                _this.currentStashPage++;
                togglePage();
            }
        });
        togglePage();
        this.updateStash();
    };
    Game.prototype.useSkill = function (slot) {
        var _this = this;
        if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")
            return;
        var mobId = 0;
        if (slot === 1) {
            var _a = this.getMouseGridPosition(), x = _a.x, y = _a.y;
            var entity = this.getEntityAt(x, y, Mob) ||
                this.getEntityAt(x, y, Npc) ||
                (this.player.settings.pvp && this.getEntityAt(x, y, Player)) ||
                this.getNearestEntity();
            mobId = entity === null || entity === void 0 ? void 0 : entity.id;
            var isTree = mobId ? entity.kind === Types.Entities.TREE && this.player.attackSkill === 1 : false;
            var playerLocation = getEntityLocation({ x: this.player.gridX, y: this.player.gridY });
            var isTargetMinotaur = entity.kind === Types.Entities.MINOTAUR;
            if (isTargetMinotaur && playerLocation !== "minotaurcage") {
                return;
            }
            if (!mobId ||
                mobId === this.player.id ||
                ((Types.isNpc(entity.kind) || !(entity instanceof Character)) && !isTree)) {
                return;
            }
            if (mobId && entity instanceof Player && (!entity.settings.pvp || !this.pvp)) {
                var message = !entity.settings.pvp
                    ? "You can't attack a player that doesn't have PvP enabled."
                    : "You need to enable PvP before you can attack another player.";
                this.chat_callback({
                    message: message,
                    type: "error",
                });
                return;
            }
            if (this.player.attackSkillTimeout || typeof this.player.attackSkill !== "number" || !mobId) {
                return;
            }
            this.player.setSkillTargetId(mobId);
            if (isTree) {
                this.tryUnlockingAchievement("ZELDA");
            }
        }
        else if (slot === 2 && (this.player.defenseSkillTimeout || typeof this.player.defenseSkill !== "number"))
            return;
        var isAttackSkill = slot === 1;
        var skillName = isAttackSkill
            ? Types.attackSkillTypeAnimationMap[this.player.attackSkill]
            : Types.defenseSkillTypeAnimationMap[this.player.defenseSkill];
        var originalTimeout = isAttackSkill
            ? Math.floor(Types.attackSkillDelay[this.player.attackSkill])
            : Math.floor(Types.defenseSkillDelay[this.player.defenseSkill]);
        var timeout = Math.round(originalTimeout - originalTimeout * (Types.calculateSkillTimeout(this.player.bonus.skillTimeout) / 100));
        var skillSlot = $("[data-skill-slot=\"".concat(slot, "\"]"));
        skillSlot
            .addClass("disabled")
            .find(".skill-timeout")
            .addClass("active ".concat(skillName))
            .attr("style", "transition: width ".concat(timeout / 1000, "s linear;"));
        if (isAttackSkill) {
            this.player.attackSkillTimeout = setTimeout(function () {
                skillSlot.removeClass("disabled").find(".skill-timeout").attr("class", "skill-timeout").attr("style", "");
                if (_this.player) {
                    _this.player.attackSkillTimeout = null;
                }
            }, timeout);
        }
        else {
            if (this.player.defenseSkill === 2) {
                this.skillResistanceAnimation.reset();
            }
            else {
                this.defenseSkillAnimation.reset();
            }
            this.player.setDefenseSkillAnimation(skillName, Types.defenseSkillDurationMap[this.player.defenseSkill](this.player.shieldLevel));
            this.player.defenseSkillTimeout = setTimeout(function () {
                skillSlot.removeClass("disabled").find(".skill-timeout").attr("class", "skill-timeout").attr("style", "");
                _this.player.defenseSkillTimeout = null;
            }, timeout);
        }
        this.audioManager.playSound("skill-".concat(skillName));
        this.client.sendSkill(slot, mobId);
    };
    Game.prototype.setDefenseSkill = function (skill) {
        var skillName = Types.defenseSkillTypeAnimationMap[skill] || null;
        $("#skill-defense").attr("class", skillName ? "skill-".concat(skillName) : null);
    };
    Game.prototype.setAttackSkill = function (skill) {
        var skillName = Types.attackSkillTypeAnimationMap[skill] || null;
        $("#skill-attack").attr("class", skillName ? "skill-".concat(skillName) : null);
    };
    Game.prototype.initTransferGold = function () {
        var _this = this;
        $("#gold-stash").on("click", function () {
            var isStashTransfer = $("#stash").hasClass("visible");
            if (!isStashTransfer || !_this.player.goldStash)
                return;
            _this.openQuantityModal({ maxQuantity: _this.player.goldStash }, function (gold) {
                if (!_this.isPanelOpened) {
                    _this.client.sendBanPlayer("Player tried to transfer gold from Stash to Inventory.");
                    return;
                }
                _this.client.sendMoveGold(gold, "stash", "inventory");
            });
        });
        $("#gold-inventory").on("click", function () {
            var isStashTransfer = $("#stash").hasClass("visible");
            var isTradeTransfer = $("#trade").hasClass("visible");
            if ((!isStashTransfer && !isTradeTransfer) || !_this.player.gold)
                return;
            _this.openQuantityModal({ maxQuantity: _this.player.gold }, function (gold) {
                if (isStashTransfer) {
                    if (!_this.isPanelOpened) {
                        _this.client.sendBanPlayer("Player tried to transfer gold from Inventory to Stash.");
                        return;
                    }
                    _this.client.sendMoveGold(gold, "inventory", "stash");
                }
                else if (isTradeTransfer) {
                    _this.client.sendMoveGold(gold, "inventory", "trade");
                }
            });
        });
        $("#gold-player1").on("click", function () {
            var isTradeTransfer = $("#trade").hasClass("visible");
            if (!isTradeTransfer || !_this.player.goldTrade || $("#trade-player1-status-button").hasClass("disabled"))
                return;
            _this.openQuantityModal({ maxQuantity: _this.player.goldTrade }, function (gold) {
                _this.client.sendMoveGold(gold, "trade", "inventory");
            });
        });
    };
    Game.prototype.initAchievements = function () {
        var _this = this;
        var self = this;
        this.achievements = getAchievements(self.network);
        _.each(this.achievements, function (obj) {
            if (!obj.isCompleted) {
                obj.isCompleted = function () {
                    return true;
                };
            }
            if (!obj.hidden) {
                obj.hidden = false;
            }
        });
        this.app.initAchievementList(this.achievements);
        var unlockedAchievementIds = this.storage.data.achievement
            .map(function (unlocked, index) { return (unlocked ? index + 1 : false); })
            .filter(Boolean);
        var totalPayout = unlockedAchievementIds.reduce(function (acc, id) {
            var achievement = Object.values(self.achievements)[id - 1];
            acc += (achievement === null || achievement === void 0 ? void 0 : achievement[_this.network]) || 0;
            return acc;
        }, 0);
        this.app.initUnlockedAchievements(unlockedAchievementIds, totalPayout);
    };
    Game.prototype.getAchievementById = function (id) {
        var found = null;
        _.each(this.achievements, function (achievement) {
            if (achievement.id === parseInt(id)) {
                found = achievement;
            }
        });
        return found;
    };
    Game.prototype.initWaypoints = function (waypoints) {
        $("#waypoint-list").empty();
        var self = this;
        if (Array.isArray(waypoints)) {
            waypoints.forEach(function (status, index) {
                var statusClass = "";
                if (status === 0) {
                    statusClass = "disabled";
                }
                else if (status === 2) {
                    statusClass = "locked disabled expansion1";
                }
                $("<div/>", {
                    id: "waypoint-".concat(Types.waypoints[index].id),
                    "data-waypoint-id": Types.waypoints[index].id,
                    class: "waypoint-spaced-row waypoint-row ".concat(statusClass),
                    html: "\n            <div class=\"waypoint-icon\"></div>\n            <div class=\"waypoint-text\">".concat(Types.waypoints[index].name, "</div>\n            "),
                    click: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if ($(this).hasClass("locked") || $(this).hasClass("disabled") || $(this).hasClass("active"))
                            return;
                        if (!self.isPanelOpened) {
                            self.client.sendBanPlayer("Player tried to teleport without opening the Waypoint panel.");
                            return;
                        }
                        var id = parseInt($(this).data("waypoint-id"));
                        var clickedWaypoint = Types.waypoints.find(function (_a) {
                            var waypointId = _a.id;
                            return waypointId === id;
                        });
                        if (clickedWaypoint && self.player.waypoints[id - 1] === 1) {
                            var gridX = clickedWaypoint.gridX, gridY = clickedWaypoint.gridY;
                            self.app.closeWaypoint();
                            self.player.stop_pathing_callback({ x: gridX + 1, y: gridY, isWaypoint: true });
                            $("#foreground").off(".waypoint");
                        }
                    },
                }).appendTo("#waypoint-list");
                $(".waypoint-row").tooltip({
                    items: ".waypoint-row",
                    classes: {
                        "ui-tooltip": "waypoint-row",
                    },
                    track: true,
                    position: { my: "left bottom-10", at: "left bottom", collision: "flipfit" },
                    content: function () {
                        var _a, _b, _c;
                        if (!self.player)
                            return;
                        var waypointId = Number((_b = (_a = $(this)[0]) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.waypointId);
                        var content = undefined;
                        if (!self.player.expansion1 || !self.player.expansion2) {
                            content = (_c = Types.waypoints[waypointId - 1]) === null || _c === void 0 ? void 0 : _c.content;
                        }
                        return content;
                    },
                });
            });
        }
    };
    Game.prototype.activateWaypoint = function (id) {
        $("#waypoint-".concat(id)).removeClass("disabled locked").addClass("active");
    };
    Game.prototype.getSprite = function (name) {
        var _this = this;
        if (!this.sprites[name]) {
            this.loadSprite(name);
            this.sprites[name].onload_func = function () {
                if (name.endsWith("armor")) {
                    _this.sprites[name].createHurtSprite();
                }
            };
        }
        return this.sprites[name];
    };
    Game.prototype.loadSprite = function (name) {
        if (this.renderer.upscaledRendering) {
            this.spritesets[0][name] = new Sprite(name, 1, this.network);
        }
        else {
            this.spritesets[1][name] = new Sprite(name, 2, this.network);
            if (!this.renderer.mobile && !this.renderer.tablet) {
                this.spritesets[2][name] = new Sprite(name, 3, this.network);
            }
        }
    };
    Game.prototype.setSpriteScale = function (scale) {
        var _this = this;
        if (this.renderer.upscaledRendering) {
            this.sprites = this.spritesets[0];
        }
        else {
            this.sprites = this.spritesets[scale - 1];
            _.each(this.entities, function (entity) {
                entity.sprite = null;
                entity.setSprite(_this.getSprite(entity.getSpriteName()));
            });
            this.initShadows();
            this.initCursors();
        }
    };
    Game.prototype.loadSprites = function () {
        console.info("Loading sprites...");
        this.spritesets = [];
        this.spritesets[0] = {};
        this.spritesets[1] = {};
        this.spritesets[2] = {};
    };
    Game.prototype.setCursor = function (name, orientation) {
        if (orientation === void 0) { orientation = Types.Orientations.DOWN; }
        if (name in this.cursors) {
            this.currentCursor = this.cursors[name];
            this.currentCursorOrientation = orientation;
        }
        else {
            console.error("Unknown cursor name :" + name);
        }
    };
    Game.prototype.updateCursorLogic = function () {
        if (this.hoveringCollidingTile && this.started) {
            this.targetColor = "rgba(255, 50, 50, 0.5)";
        }
        else {
            this.targetColor = "rgba(255, 255, 255, 0.5)";
        }
        if (this.hoveringPlayer && this.started) {
            if (this.hoveringPlayerPvP) {
                this.setCursor("attack");
            }
            else {
                this.setCursor("hand");
            }
            this.hoveringTarget = false;
            this.hoveringMob = false;
            this.targetCellVisible = false;
        }
        else if (this.hoveringMob && this.started) {
            this.setCursor("attack");
            this.hoveringTarget = false;
            this.hoveringPlayer = false;
            this.targetCellVisible = false;
        }
        else if (this.hoveringNpc && this.started) {
            this.setCursor("talk");
            this.hoveringTarget = false;
            this.targetCellVisible = false;
        }
        else if ((this.hoveringItem || this.hoveringChest) && this.started) {
            this.setCursor("loot");
            this.hoveringTarget = false;
            this.targetCellVisible = true;
        }
        else {
            this.setCursor("hand");
            this.hoveringTarget = false;
            this.hoveringPlayer = false;
            this.targetCellVisible = true;
        }
    };
    Game.prototype.focusPlayer = function () {
        this.renderer.camera.lookAt(this.player);
    };
    Game.prototype.addEntity = function (entity) {
        var self = this;
        if (this.entities[entity.id] === undefined) {
            this.entities[entity.id] = entity;
            this.registerEntityPosition(entity);
            if (!(entity instanceof Item && entity.wasDropped) &&
                !(this.renderer.mobile || this.renderer.tablet) &&
                entity.kind !== Types.Entities.ZOMBIE) {
                if (entity.isFading) {
                    entity.fadeIn(this.currentTime);
                }
            }
            if (this.renderer.mobile || this.renderer.tablet) {
                entity.onDirty(function (e) {
                    if (self.camera.isVisible(e)) {
                        e.dirtyRect = self.renderer.getEntityBoundingRect(e);
                        self.checkOtherDirtyRects(e.dirtyRect, e, e.gridX, e.gridY);
                    }
                });
            }
        }
        else {
            console.error("This entity already exists : " + entity.id + " (" + entity.kind + ")");
        }
    };
    Game.prototype.removeEntity = function (entity) {
        if (entity.id in this.entities) {
            this.unregisterEntityPosition(entity);
            delete this.entities[entity.id];
        }
        else {
            console.error("Cannot remove entity. Unknown ID : " + entity.id);
        }
    };
    Game.prototype.addItem = function (item, x, y) {
        var sprite;
        sprite = this.getSprite(item.getSpriteName());
        item.setSprite(sprite);
        item.setGridPosition(x, y);
        item.setAnimation("idle", 150);
        this.addEntity(item);
    };
    Game.prototype.removeItem = function (item) {
        if (item) {
            this.removeFromItemGrid(item, item.gridX, item.gridY);
            this.removeFromRenderingGrid(item, item.gridX, item.gridY);
            delete this.entities[item.id];
        }
        else {
            console.error("Cannot remove item. Unknown ID : " + item.id);
        }
    };
    Game.prototype.initPathingGrid = function () {
        this.pathingGrid = [];
        for (var i = 0; i < this.map.height; i += 1) {
            this.pathingGrid[i] = [];
            for (var j = 0; j < this.map.width; j += 1) {
                this.pathingGrid[i][j] = this.map.grid[i][j];
            }
        }
        console.info("Initialized the pathing grid with static colliding cells.");
    };
    Game.prototype.initEntityGrid = function () {
        this.entityGrid = [];
        for (var i = 0; i < this.map.height; i += 1) {
            this.entityGrid[i] = [];
            for (var j = 0; j < this.map.width; j += 1) {
                this.entityGrid[i][j] = {};
            }
        }
        console.info("Initialized the entity grid.");
    };
    Game.prototype.initRenderingGrid = function () {
        this.renderingGrid = [];
        for (var i = 0; i < this.map.height; i += 1) {
            this.renderingGrid[i] = [];
            for (var j = 0; j < this.map.width; j += 1) {
                this.renderingGrid[i][j] = {};
            }
        }
        console.info("Initialized the rendering grid.");
    };
    Game.prototype.initItemGrid = function () {
        this.itemGrid = [];
        for (var i = 0; i < this.map.height; i += 1) {
            this.itemGrid[i] = [];
            for (var j = 0; j < this.map.width; j += 1) {
                this.itemGrid[i][j] = {};
            }
        }
        console.info("Initialized the item grid.");
    };
    Game.prototype.initAnimatedTiles = function () {
        var self = this, m = this.map;
        this.animatedTiles = [];
        this.highAnimatedTiles = [];
        this.forEachVisibleTile(function (id, index) {
            if (m.isAnimatedTile(id)) {
                var tile = new AnimatedTile(id, m.getTileAnimationLength(id), m.getTileAnimationDelay(id), m.getTileAnimationSkip(id), index), pos = self.map.tileIndexToGridPosition(tile.index);
                tile.x = pos.x;
                tile.y = pos.y;
                if (m.isHighTile(id)) {
                    self.highAnimatedTiles.push(tile);
                }
                else {
                    self.animatedTiles.push(tile);
                }
            }
        }, 1);
    };
    Game.prototype.addToRenderingGrid = function (entity, x, y) {
        if (!this.map.isOutOfBounds(x, y)) {
            this.renderingGrid[y][x][entity.id] = entity;
        }
    };
    Game.prototype.removeFromRenderingGrid = function (entity, x, y) {
        if (entity && this.renderingGrid[y][x] && entity.id in this.renderingGrid[y][x]) {
            delete this.renderingGrid[y][x][entity.id];
        }
    };
    Game.prototype.removeFromEntityGrid = function (entity, x, y) {
        if (this.entityGrid[y][x][entity.id]) {
            delete this.entityGrid[y][x][entity.id];
        }
    };
    Game.prototype.removeFromItemGrid = function (item, x, y) {
        if (item && this.itemGrid[y][x][item.id]) {
            delete this.itemGrid[y][x][item.id];
        }
    };
    Game.prototype.removeFromPathingGrid = function (x, y) {
        this.pathingGrid[y][x] = 0;
    };
    Game.prototype.registerEntityDualPosition = function (entity) {
        if (entity) {
            this.entityGrid[entity.gridY][entity.gridX][entity.id] = entity;
            this.addToRenderingGrid(entity, entity.gridX, entity.gridY);
            if (entity.nextGridX >= 0 && entity.nextGridY >= 0) {
                this.entityGrid[entity.nextGridY][entity.nextGridX][entity.id] = entity;
                if (!(entity instanceof Player) && !(entity instanceof Pet)) {
                    this.pathingGrid[entity.nextGridY][entity.nextGridX] = 1;
                }
            }
        }
    };
    Game.prototype.unregisterEntityPosition = function (entity) {
        if (entity) {
            this.removeFromEntityGrid(entity, entity.gridX, entity.gridY);
            this.removeFromPathingGrid(entity.gridX, entity.gridY);
            this.removeFromRenderingGrid(entity, entity.gridX, entity.gridY);
            if (entity.nextGridX >= 0 && entity.nextGridY >= 0) {
                this.removeFromEntityGrid(entity, entity.nextGridX, entity.nextGridY);
                this.removeFromPathingGrid(entity.nextGridX, entity.nextGridY);
            }
        }
    };
    Game.prototype.registerEntityPosition = function (entity) {
        var x = entity.gridX;
        var y = entity.gridY;
        if (entity) {
            if (entity instanceof Character || entity instanceof Chest) {
                this.entityGrid[y][x][entity.id] = entity;
                if (!(entity instanceof Player) && !(entity instanceof Pet) && !(entity instanceof Spell)) {
                    this.pathingGrid[y][x] = 1;
                }
                if (entity.kind === Types.Entities.MAGICSTONE ||
                    entity.kind === Types.Entities.ALTARCHALICE ||
                    entity.kind === Types.Entities.ALTARSOULSTONE ||
                    entity.kind === Types.Entities.TOMBDEATHANGEL ||
                    entity.kind === Types.Entities.TOMBANGEL ||
                    entity.kind === Types.Entities.TOMBCROSS ||
                    entity.kind === Types.Entities.TOMBSKULL ||
                    entity.kind === Types.Entities.GRIMOIRE ||
                    entity.kind === Types.Entities.DOORDEATHANGEL) {
                    this.entityGrid[y][x + 1][entity.id] = entity;
                    this.pathingGrid[y][x + 1] = 1;
                }
                if (entity.kind === Types.Entities.ALTARCHALICE || entity.kind === Types.Entities.ALTARSOULSTONE) {
                    this.entityGrid[y][x + 2][entity.id] = entity;
                    this.pathingGrid[y][x + 2] = 1;
                }
                if (entity.kind === Types.Entities.GRIMOIRE || entity.kind === Types.Entities.DOORDEATHANGEL) {
                    this.entityGrid[y - 1][x][entity.id] = entity;
                    this.entityGrid[y - 1][x + 1][entity.id] = entity;
                    this.pathingGrid[y - 1][x] = 1;
                    this.pathingGrid[y - 1][x + 1] = 1;
                }
                if (entity.kind === Types.Entities.TRAP ||
                    entity.kind === Types.Entities.TRAP2 ||
                    entity.kind === Types.Entities.TRAP3 ||
                    entity.kind === Types.Entities.BLUEFLAME) {
                    delete this.entityGrid[y][x][entity.id];
                    this.pathingGrid[y][x] = 0;
                }
            }
            if (entity instanceof Item) {
                this.itemGrid[y][x][entity.id] = entity;
            }
            this.addToRenderingGrid(entity, x, y);
        }
    };
    Game.prototype.setPlayerAccount = function (_a) {
        var username = _a.username, account = _a.account, network = _a.network, password = _a.password;
        if (username) {
            this.username = username;
        }
        this.account = account;
        this.network = network;
        this.explorer = network === "nano" ? "nanolooker" : "bananolooker";
        if (password) {
            this.password = password;
        }
    };
    Game.prototype.setServerOptions = function (host, port) {
        this.host = host;
        this.port = port;
    };
    Game.prototype.loadAudio = function () {
        this.audioManager = new AudioManager(this);
    };
    Game.prototype.initMusicAreas = function () {
        var self = this;
        _.each(this.map.musicAreas, function (area) {
            self.audioManager.addArea(area.x, area.y, area.w, area.h, area.id);
        });
    };
    Game.prototype.run = function () {
        var _this = this;
        var self = this;
        return new Promise(function (resolve) {
            if (self.isLoaded) {
                resolve(true);
                return;
            }
            _this.loadSprites();
            _this.setUpdater(new Updater(_this));
            _this.camera = _this.renderer.camera;
            _this.setSpriteScale(_this.renderer.scale);
            var wait = setInterval(function () {
                if (self.map.isLoaded) {
                    self.ready = true;
                    console.debug("Map loaded.");
                    self.loadAudio();
                    self.initMusicAreas();
                    self.initCursors();
                    self.initAnimations();
                    self.initShadows();
                    self.initEntityGrid();
                    self.initItemGrid();
                    self.initPathingGrid();
                    self.initRenderingGrid();
                    self.setPathfinder(new Pathfinder(self.map.width, self.map.height));
                    self.setCursor("hand");
                    clearInterval(wait);
                    self.isLoaded = true;
                    resolve(true);
                }
            }, 100);
        });
    };
    Game.prototype.tick = function () {
        this.currentTime = new Date().getTime();
        if (this.started) {
            this.updateCursorLogic();
            this.updater.update();
            this.renderer.renderFrame();
        }
        if (!this.isStopped) {
            window.requestAnimFrame(this.tick.bind(this));
        }
    };
    Game.prototype.start = function () {
        this.tick();
        this.hasNeverStarted = false;
        console.info("Game loop started.");
    };
    Game.prototype.stop = function () {
        console.info("Game stopped.");
        this.isStopped = true;
    };
    Game.prototype.entityIdExists = function (id) {
        return id in this.entities;
    };
    Game.prototype.getEntityById = function (id) {
        if (id in this.entities) {
            return this.entities[id];
        }
        else {
        }
    };
    Game.prototype.connect = function (action, started_callback) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4, self.run()];
                    case 1:
                        _a.sent();
                        this.client = new GameClient(this.host, this.port);
                        this.client.fail_callback = function (_a) {
                            var player = _a.player, admin = _a.admin, error = _a.error, reason = _a.reason, message = _a.message, until = _a.until, ip = _a.ip;
                            started_callback({
                                success: false,
                                error: error,
                                ip: ip,
                                player: player,
                                admin: admin,
                                reason: reason,
                                message: message,
                                until: until,
                            });
                            self.started = false;
                        };
                        this.client.connect(false);
                        this.client.onDispatched(function (host, port) {
                            console.debug("Dispatched to game server " + host + ":" + port);
                            self.client.host = host;
                            self.client.port = port;
                            self.client.connect();
                        });
                        this.client.onConnected(function () {
                            console.info("Starting client/server handshake");
                            self.player.name = self.username;
                            self.started = true;
                            if (action === "create") {
                                self.client.sendCreate({ name: self.username, account: self.account, password: self.password });
                            }
                            else {
                                self.client.sendLogin({
                                    name: self.username,
                                    account: self.account,
                                    password: self.password,
                                });
                            }
                        });
                        this.client.onEntityList(function (list) {
                            var entityIds = _.map(self.entities, "id"), knownIds = _.intersection(entityIds, list), newIds = _.difference(list, knownIds);
                            self.obsoleteEntities = _.reject(self.entities, function (entity) {
                                return _.includes(knownIds, entity.id) || entity.id === self.player.id;
                            });
                            self.removeObsoleteEntities();
                            if (_.size(newIds) > 0) {
                                self.client.sendWho(newIds);
                            }
                        });
                        this.client.onWelcome(function (_a) {
                            var id = _a.id, name = _a.name, account = _a.account, hash = _a.hash, x = _a.x, y = _a.y, hp = _a.hp, helm = _a.helm, armor = _a.armor, weapon = _a.weapon, belt = _a.belt, cape = _a.cape, pet = _a.pet, shield = _a.shield, ring1 = _a.ring1, ring2 = _a.ring2, amulet = _a.amulet, experience = _a.experience, gold = _a.gold, goldStash = _a.goldStash, goldTrade = _a.goldTrade, achievement = _a.achievement, inventory = _a.inventory, stash = _a.stash, trade = _a.trade, upgrade = _a.upgrade, nanoPotions = _a.nanoPotions, gems = _a.gems, artifact = _a.artifact, expansion1 = _a.expansion1, expansion2 = _a.expansion2, waypoints = _a.waypoints, depositAccount = _a.depositAccount, auras = _a.auras, cowLevelPortalCoords = _a.cowLevelPortalCoords, party = _a.party, settings = _a.settings, network = _a.network, isHurtByTrap = _a.isHurtByTrap, admins = _a.admins;
                            trade = JSON.parse(trade);
                            stash = JSON.parse(stash);
                            inventory = JSON.parse(inventory);
                            x = Number(x);
                            y = Number(y);
                            upgrade = JSON.parse(upgrade);
                            achievement = JSON.parse(achievement);
                            artifact = JSON.parse(artifact);
                            gems = JSON.parse(gems);
                            expansion1 = Number(expansion1);
                            expansion2 = Number(expansion2);
                            waypoints = JSON.parse(waypoints);
                            nanoPotions = Number(nanoPotions);
                            gold = Number(gold);
                            goldStash = Number(goldStash);
                            goldTrade = Number(goldTrade);
                            settings = typeof settings === "string" ? JSON.parse(settings) : settings;
                            self.player.setSettings(settings);
                            self.app.start();
                            Sentry.configureScope(function (scope) {
                                scope.setUser({ username: name });
                            });
                            console.info("Received player ID from server : " + id);
                            self.player.id = id;
                            self.playerId = id;
                            self.player.name = name;
                            if (account) {
                                self.account = account;
                            }
                            if (network) {
                                self.network = network;
                            }
                            var _b = helm.split(":"), helm = _b[0], helmLevel = _b[1], helmBonus = _b[2], helmSocket = _b[3];
                            var _c = armor.split(":"), armor = _c[0], armorLevel = _c[1], armorBonus = _c[2], armorSocket = _c[3];
                            var _d = weapon.split(":"), weapon = _d[0], weaponLevel = _d[1], weaponBonus = _d[2], weaponSocket = _d[3], attackSkill = _d[4];
                            var _e = (shield || "").split(":"), shield = _e[0], shieldLevel = _e[1], shieldBonus = _e[2], shieldSocket = _e[3], defenseSkill = _e[4];
                            self.player.expansion1 = expansion1;
                            self.player.expansion2 = expansion2;
                            self.storage.setPlayerExpanson1(expansion1);
                            self.storage.setPlayerExpanson2(expansion2);
                            self.storage.setPlayerName(name);
                            self.storage.setPlayerArmor(armor);
                            self.storage.setPlayerWeapon(weapon);
                            self.storage.setAchievement(achievement);
                            self.player.setGridPosition(x, y);
                            self.player.setMaxHitPoints(hp);
                            self.player.setHelmName(helm);
                            self.player.setHelmLevel(helmLevel);
                            self.player.setHelmBonus(helmBonus);
                            self.player.setHelmSocket(helmSocket);
                            self.player.setArmorName(armor);
                            self.player.setArmorLevel(armorLevel);
                            self.player.setArmorBonus(armorBonus);
                            self.player.setArmorSocket(armorSocket);
                            self.player.setSpriteName(armor);
                            self.player.setWeaponName(weapon);
                            self.player.setWeaponLevel(weaponLevel);
                            self.player.setWeaponBonus(weaponBonus);
                            self.player.setWeaponSocket(weaponSocket);
                            self.player.setBelt(belt);
                            self.player.setCape(cape);
                            self.player.setPet(pet);
                            self.player.setShieldName(shield);
                            self.player.setShieldLevel(shieldLevel);
                            self.player.setShieldBonus(shieldBonus);
                            self.player.setShieldSocket(shieldSocket);
                            self.player.setDefenseSkill(defenseSkill);
                            self.setDefenseSkill(defenseSkill);
                            self.player.setAttackSkill(attackSkill);
                            self.setAttackSkill(attackSkill);
                            self.player.setRing1(ring1);
                            self.player.setRing2(ring2);
                            self.player.setAmulet(amulet);
                            self.player.setAuras(auras);
                            self.initPlayer();
                            self.player.experience = experience;
                            self.player.level = Types.getLevel(experience);
                            self.player.setInventory(inventory);
                            self.player.setStash(stash);
                            self.player.setTrade(trade);
                            self.player.setUpgrade(upgrade);
                            self.setGold(gold);
                            self.setGoldStash(goldStash);
                            self.setGoldTrade(goldTrade);
                            self.setGoldTrade(0);
                            self.initSettings(settings);
                            self.toggleCapeSliders(!!cape);
                            self.updateBars();
                            self.updateExpBar();
                            self.resetCamera();
                            self.updatePlateauMode();
                            self.audioManager.updateMusic();
                            self.initAchievements();
                            self.initInventory();
                            self.initUpgrade();
                            self.initTrade();
                            self.initMerchant();
                            self.initStash();
                            self.initTooltips();
                            self.initSendUpgradeItem();
                            self.initUpgradeItemPreview();
                            self.initWaypoints(waypoints);
                            self.initTransferGold();
                            self.store.depositAccount = depositAccount;
                            self.player.nanoPotions = nanoPotions;
                            self.player.gems = gems;
                            self.player.artifact = artifact;
                            self.player.waypoints = waypoints;
                            self.player.skeletonKey = !!achievement[26];
                            self.cowLevelPortalCoords = cowLevelPortalCoords;
                            self.admins = admins;
                            if (party) {
                                var partyId = party.partyId, partyLeader = party.partyLeader, members = party.members;
                                self.player.setPartyId(partyId);
                                self.player.setPartyLeader(partyLeader);
                                self.player.setPartyMembers(members);
                            }
                            self.addEntity(self.player);
                            self.player.dirtyRect = self.renderer.getEntityBoundingRect(self.player);
                            setTimeout(function () {
                                self.tryUnlockingAchievement("STILL_ALIVE");
                            }, 1500);
                            self.app.updateNanoPotions(nanoPotions);
                            self.app.updateGems(gems);
                            self.app.updateArtifact(artifact);
                            self.app.initPlayerInfo();
                            self.app.initNanoPotions();
                            self.app.initTradePlayer1StatusButton();
                            self.storage.initPlayer(name, account, expansion1, expansion2);
                            self.renderer.loadPlayerImage();
                            if (isHurtByTrap) {
                                self.tryUnlockingAchievement("MISSTEP");
                            }
                            if (!self.storage.hasAlreadyPlayed() || self.player.level === 1) {
                                self.showNotification("Welcome to ".concat(network === "nano" ? "Nano" : "Banano", " BrowserQuest!"));
                                self.app.toggleInstructions();
                            }
                            else {
                                self.showNotification("Welcome Back. You are level " + self.player.level + ".");
                            }
                            if (hash) {
                                self.gamecompleted_callback({ hash: hash, fightAgain: false });
                            }
                            self.client.sendMoveItemsToInventory("upgrade");
                            setTimeout(function () {
                                self.client.sendMoveItemsToInventory("trade");
                            }, 850);
                            self.client.onAccount(function (_a) {
                                var account = _a.account, network = _a.network, depositAccount = _a.depositAccount;
                                self.store.depositAccount = depositAccount;
                                self.setPlayerAccount({ account: account, network: network });
                                self.app.initPlayerInfo();
                            });
                            self.player.onStartPathing(function (path) {
                                var i = path.length - 1, x = Number(path[i][0]), y = Number(path[i][1]);
                                if (self.player.isMovingToLoot()) {
                                    self.player.isLootMoving = false;
                                }
                                else if (!self.player.isAttacking()) {
                                    self.client.sendMove(x, y);
                                }
                                self.processPetInput();
                                self.selectedX = x;
                                self.selectedY = y;
                                self.selectedCellVisible = true;
                                if (self.renderer.mobile || self.renderer.tablet) {
                                    self.drawTarget = true;
                                    self.clearTarget = true;
                                    self.renderer.targetRect = self.renderer.getTargetBoundingRect();
                                    self.checkOtherDirtyRects(self.renderer.targetRect, null, self.selectedX, self.selectedY);
                                }
                            });
                            self.player.onCheckAggro(function () {
                                self.forEachMob(function (mob) {
                                    if (mob.isAggressive && !mob.isAttacking() && self.player.isNear(mob, mob.aggroRange) && !mob.isRaising()) {
                                        self.player.aggro(mob);
                                    }
                                });
                            });
                            self.player.onAggro(function (mob) {
                                if (!self.player.isDead && !mob.isWaitingToAttack(self.player) && !self.player.isAttackedBy(mob)) {
                                    self.player.log_info("Aggroed by " + mob.id + " at (" + self.player.gridX + ", " + self.player.gridY + ")");
                                    self.client.sendAggro(mob);
                                    mob.waitToAttack(self.player);
                                }
                            });
                            self.player.onBeforeStep(function () {
                                var blockingEntity = self.getEntityAt(self.player.nextGridX, self.player.nextGridY);
                                if (blockingEntity && blockingEntity.id !== self.playerId) {
                                    console.debug("Blocked by " + blockingEntity.id);
                                }
                                self.unregisterEntityPosition(self.player);
                            });
                            self.player.onStep(function () {
                                var _a = self.player, gridX = _a.gridX, gridY = _a.gridY;
                                var trap = self.getTrap(gridX, gridY);
                                if (trap === null || trap === void 0 ? void 0 : trap.id) {
                                    var entity = self.getEntityById(trap === null || trap === void 0 ? void 0 : trap.id);
                                    if (entity === null || entity === void 0 ? void 0 : entity.isActivated) {
                                        if (!self.player.isHurtByTrap) {
                                            self.player.isHurtByTrap = true;
                                            self.client.sendHurtTrap(trap);
                                            setTimeout(function () {
                                                if (self.player) {
                                                    self.player.isHurtByTrap = false;
                                                }
                                            }, 3000);
                                        }
                                    }
                                    else {
                                        self.client.sendActivateTrap(trap === null || trap === void 0 ? void 0 : trap.id);
                                    }
                                }
                                var statues = self.getStatues(gridX, gridY);
                                if (statues === null || statues === void 0 ? void 0 : statues.length) {
                                    statues.forEach(function (_a) {
                                        var id = _a.id;
                                        var entity = self.getEntityById(id);
                                        if (entity && !entity.isActivated) {
                                            entity.isActivated = true;
                                            self.client.sendActivateStatue(id);
                                        }
                                    });
                                }
                                if (self.player.hasNextStep()) {
                                    self.registerEntityDualPosition(self.player);
                                }
                                if (self.isZoningTile(gridX, gridY)) {
                                    self.isCharacterZoning = true;
                                    self.enqueueZoningFrom(gridX, gridY);
                                }
                                self.player.forEachAttacker(self.makeAttackerFollow);
                                var item = self.getItemAt(gridX, gridY);
                                if (item instanceof Item) {
                                    self.tryLootingItem(item);
                                }
                                if ((gridX <= 85 && gridY <= 179 && gridY > 178) || (gridX <= 85 && gridY <= 266 && gridY > 265)) {
                                    self.tryUnlockingAchievement("INTO_THE_WILD");
                                }
                                if (gridX <= 85 && gridY <= 293 && gridY > 292) {
                                    self.tryUnlockingAchievement("AT_WORLDS_END");
                                }
                                if (gridX <= 85 && gridY <= 100 && gridY > 99) {
                                    self.tryUnlockingAchievement("NO_MANS_LAND");
                                }
                                if (gridX <= 85 && gridY <= 51 && gridY > 50) {
                                    self.tryUnlockingAchievement("HOT_SPOT");
                                }
                                if (gridX <= 27 && gridY <= 123 && gridY > 112) {
                                    self.tryUnlockingAchievement("TOMB_RAIDER");
                                }
                                if (gridY > 444) {
                                    self.tryUnlockingAchievement("FREEZING_LANDS");
                                }
                                if (gridY >= 350 && gridY <= 365 && gridX <= 80) {
                                    self.tryUnlockingAchievement("WALK_ON_WATER");
                                }
                                if (gridY >= 328 && gridY <= 332 && gridX >= 13 && gridX <= 23) {
                                    self.tryUnlockingAchievement("WEN");
                                }
                                self.updatePlayerCheckpoint();
                                if (!self.player.isDead) {
                                    self.audioManager.updateMusic();
                                }
                            });
                            self.player.onStopPathing(function (_a) {
                                var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.playerId, playerId = _d === void 0 ? 0 : _d, _e = _a.orientation, orientation = _e === void 0 ? Types.Orientations.DOWN : _e, confirmed = _a.confirmed, isWaypoint = _a.isWaypoint, _f = _a.isStoneTeleport, isStoneTeleport = _f === void 0 ? false : _f, _g = _a.isTeleportSent, isTeleportSent = _g === void 0 ? false : _g;
                                self.unregisterEntityPosition(self.player);
                                if (isWaypoint || isStoneTeleport) {
                                    self.player.stop();
                                    self.player.nextStep();
                                    self.traps = [];
                                    self.statues = [];
                                }
                                if (self.player.hasTarget()) {
                                    self.player.lookAtTarget();
                                }
                                self.selectedCellVisible = false;
                                if (self.isItemAt(x, y)) {
                                    var item = self.getItemAt(x, y);
                                    self.tryLootingItem(item);
                                }
                                var isDoor = !isWaypoint && self.map.isDoor(x, y);
                                if ((!self.player.hasTarget() && isDoor) || isWaypoint || isStoneTeleport) {
                                    self.app.hideWindows();
                                    var dest = isWaypoint || isStoneTeleport ? { x: x, y: y, orientation: orientation } : self.map.getDoorDestination(x, y);
                                    if (!confirmed && !isStoneTeleport) {
                                        if (x === 71 && y === 21 && dest.x === 155 && dest.y === 96 && self.player.level <= 24) {
                                            self.client.sendBossCheck(false);
                                            return;
                                        }
                                        var message = "";
                                        var levelRequirement = 1;
                                        var isDoorAccessDenied = false;
                                        var isTempleDoor = dest.x === 156 && dest.y === 778;
                                        var isAzraelDoor = dest.x === 98 && dest.y === 764;
                                        var isGatewayDoor = dest.x === 13 && dest.y === 777;
                                        var isNecromancerDoor = dest.x === 127 && dest.y === 324;
                                        if (isTempleDoor) {
                                            levelRequirement = 67;
                                            if (self.player.level < levelRequirement) {
                                                isDoorAccessDenied = true;
                                                message = "You need lv.".concat(levelRequirement, " or above to enter the temple.");
                                            }
                                        }
                                        if (isAzraelDoor) {
                                            levelRequirement = 69;
                                            if (self.player.level < levelRequirement) {
                                                isDoorAccessDenied = true;
                                                message = "You need lv.".concat(levelRequirement, " or above to enter the temple.");
                                            }
                                            else if (dest.x === self.deathAngelLevelPortalCoords.x &&
                                                dest.y === self.deathAngelLevelPortalCoords.y) {
                                                self.client.sendTeleport(dest.x, dest.y, self.player.orientation);
                                                return;
                                            }
                                        }
                                        else if (isGatewayDoor) {
                                            levelRequirement = 68;
                                            if (self.player.level < levelRequirement) {
                                                isDoorAccessDenied = true;
                                                message = "You need lv.".concat(levelRequirement, " or above to enter the Gateway.");
                                            }
                                        }
                                        else if (isNecromancerDoor) {
                                            levelRequirement = 43;
                                            if (self.player.level < levelRequirement) {
                                                isDoorAccessDenied = true;
                                                message = "You need lv".concat(levelRequirement, " or above to enter");
                                            }
                                        }
                                        if (isDoorAccessDenied && message) {
                                            self.showNotification(message);
                                            self.audioManager.playSound("noloot", { force: true });
                                            return;
                                        }
                                    }
                                    var desty = dest.y;
                                    if (!isWaypoint) {
                                        if (dest.orientation === Types.Orientations.UP) {
                                            desty--;
                                        }
                                        else if (dest.orientation === Types.Orientations.DOWN) {
                                            desty++;
                                        }
                                    }
                                    self.player.setGridPosition(dest.x, desty);
                                    self.player.nextGridX = dest.x;
                                    self.player.nextGridY = desty;
                                    self.player.turnTo(dest.orientation);
                                    self.player.idle();
                                    if (!isTeleportSent) {
                                        if (isStoneTeleport && !confirmed) {
                                            self.client.sendStoneTeleport(playerId);
                                        }
                                        else {
                                            self.client.sendTeleport(dest.x, desty, self.player.orientation);
                                        }
                                    }
                                    if (self.renderer.mobile && dest.cameraX && dest.cameraY) {
                                        self.camera.setGridPosition(dest.cameraX, dest.cameraY);
                                        self.resetZone();
                                    }
                                    else {
                                        if (dest.portal) {
                                            self.assignBubbleTo(self.player);
                                        }
                                        else {
                                            self.camera.focusEntity(self.player);
                                            self.resetZone();
                                        }
                                    }
                                    if (_.size(self.player.attackers) > 0) {
                                        setTimeout(function () {
                                            self.tryUnlockingAchievement("COWARD");
                                        }, 500);
                                    }
                                    if (x === 131 && y === 651) {
                                        self.tryUnlockingAchievement("WAY_OF_WATER");
                                    }
                                    else if (x === 43 && y === 579) {
                                        self.tryUnlockingAchievement("PHARAOH");
                                    }
                                    self.player.forEachAttacker(function (attacker) {
                                        attacker.disengage();
                                        attacker.idle();
                                    });
                                    self.updatePlateauMode();
                                    self.checkUndergroundAchievement();
                                    if (self.renderer.mobile || self.renderer.tablet) {
                                        self.renderer.clearScreen(self.renderer.context);
                                    }
                                    if (dest.portal || isWaypoint || isStoneTeleport) {
                                        self.audioManager.playSound("teleport");
                                    }
                                    if (!self.player.isDead) {
                                        self.audioManager.updateMusic();
                                    }
                                    self.player.removeTarget();
                                    self.updateCursor();
                                }
                                if (self.player.target instanceof Npc && !isWaypoint) {
                                    self.makeNpcTalk(self.player.target);
                                }
                                else if (self.player.target instanceof Chest) {
                                    if (self.player.target.gridX === 154 && self.player.target.gridY === 365 && !self.player.skeletonKey) {
                                        self.showNotification("You need to find the Skeleton Key");
                                        self.audioManager.playSound("noloot");
                                    }
                                    else {
                                        self.client.sendOpen(self.player.target);
                                        self.audioManager.playSound("chest");
                                    }
                                }
                                self.player.forEachAttacker(function (attacker) {
                                    if (!attacker.isAdjacentNonDiagonal(self.player)) {
                                        attacker.follow(self.player);
                                    }
                                });
                                self.registerEntityPosition(self.player);
                            });
                            self.player.onRequestPath(function (x, y) {
                                var ignored = [self.player];
                                if (self.player.hasTarget()) {
                                    ignored.push(self.player.target);
                                }
                                return self.findPath(self.player, x, y, ignored);
                            });
                            self.player.onDeath(function () {
                                console.info(self.playerId + " is dead");
                                self.player.stopBlinking();
                                self.player.setSprite(self.getSprite("death"));
                                self.player.animate("death", 120, 1, function () {
                                    console.info(self.playerId + " was removed");
                                    self.removeEntity(self.player);
                                    self.removeFromRenderingGrid(self.player, self.player.gridX, self.player.gridY);
                                    self.player = null;
                                    self.client.disable();
                                    window.setTimeout(function () {
                                        var _a;
                                        $("#respawn").removeClass("disabled");
                                        if (!$("body").hasClass("death")) {
                                            (_a = self.playerdeath_callback) === null || _a === void 0 ? void 0 : _a.call(self);
                                        }
                                    }, 1000);
                                });
                                clearInterval(self.player.defenseSkillTimeout);
                                self.player.defenseSkillTimeout = null;
                                $("#skill-defense").removeClass("disabled").find(".skill-timeout").attr("class", "skill-timeout");
                                self.player.forEachAttacker(function (attacker) {
                                    attacker.disengage();
                                    self.player.removeAttacker(attacker);
                                });
                                self.audioManager.fadeOutCurrentMusic();
                                self.audioManager.playSound("death");
                            });
                            self.player.onHasMoved(function (player) {
                                self.assignBubbleTo(player);
                            });
                            self.player.onSwitchItem(function () {
                                var _a;
                                self.renderer.loadPlayerImage();
                                (_a = self.equipment_callback) === null || _a === void 0 ? void 0 : _a.call(self);
                            });
                            self.player.onInvincibleStart(function () {
                                self.invinciblestart_callback();
                                self.player.switchArmor(self.getSprite("firefox"), 1);
                            });
                            self.player.onInvincibleStop(function () {
                                self.invinciblestop_callback();
                            });
                            self.client.onSpawnItem(function (item, x, y) {
                                self.addItem(item, x, y);
                            });
                            self.client.onSpawnChest(function (chest, x, y) {
                                chest.setSprite(self.getSprite(chest.getSpriteName()));
                                chest.setGridPosition(x, y);
                                chest.setAnimation("idle_down", 150);
                                self.addEntity(chest);
                                chest.onOpen(function () {
                                    chest.stopBlinking();
                                    chest.setSprite(self.getSprite("death"));
                                    chest.setAnimation("death", 120, 1, function () {
                                        console.info(chest.id + " was removed");
                                        self.removeEntity(chest);
                                        self.removeFromRenderingGrid(chest, chest.gridX, chest.gridY);
                                        self.previousClickPosition = null;
                                    });
                                });
                            });
                            self.client.onSpawnCharacter(function (data) {
                                var id = data.id, kind = data.kind, isPet = data.isPet, name = data.name, x = data.x, y = data.y, targetId = data.targetId, orientation = data.orientation, resistances = data.resistances, element = data.element, enchants = data.enchants, isActivated = data.isActivated, bonus = data.bonus, petId = data.petId, ownerId = data.ownerId, skin = data.skin, settings = data.settings;
                                console;
                                if (kind === Types.Entities.GATEWAYFX) {
                                    self.gatewayFxNpcId = id;
                                }
                                var entity = self.getEntityById(id);
                                var isEntityExist = !!entity;
                                if (!isEntityExist) {
                                    try {
                                        if (id !== self.playerId) {
                                            if (isPet) {
                                                entity = EntityFactory.createEntity({ kind: kind, id: id, name: name, resistances: resistances, petId: petId });
                                                entity.bonus = bonus;
                                            }
                                            else {
                                                var owner = self.getEntityById(ownerId);
                                                var name_1 = ownerId ? "Pet of ".concat(owner === null || owner === void 0 ? void 0 : owner.name) : "";
                                                entity = EntityFactory.createEntity({ kind: kind, id: id, name: name_1, data: data });
                                                if (settings) {
                                                    entity.setSettings(settings);
                                                }
                                                if (owner) {
                                                    owner.petId = id;
                                                    owner.petEntity = entity;
                                                }
                                            }
                                            if (element) {
                                                entity.element = element;
                                            }
                                            if (enchants) {
                                                entity.enchants = enchants;
                                                if (enchants.includes("lightning")) {
                                                    if (!entity.auras.includes("thunderstorm")) {
                                                        entity.auras.push("thunderstorm");
                                                    }
                                                }
                                                if (enchants.includes("cold")) {
                                                    if (!entity.auras.includes("freeze")) {
                                                        entity.auras.push("freeze");
                                                    }
                                                }
                                            }
                                            if (bonus === null || bonus === void 0 ? void 0 : bonus.attackSpeed) {
                                                entity.setAttackSpeed(bonus === null || bonus === void 0 ? void 0 : bonus.attackSpeed);
                                            }
                                            if (entity instanceof Mob && (enchants === null || enchants === void 0 ? void 0 : enchants.includes("fast"))) {
                                                entity.setAttackSpeed(30);
                                            }
                                            if (entity.kind === Types.Entities.MAGE && element !== "spectral") {
                                                entity.setSprite(self.getSprite(entity.getSpriteName(element === "spectral" ? "" : element)));
                                            }
                                            else if (isPet) {
                                                entity.setSprite(self.getSprite(entity.getSpriteName(skin)));
                                            }
                                            else {
                                                entity.setSprite(self.getSprite(entity.getSpriteName()));
                                            }
                                            entity.setGridPosition(x, y);
                                            entity.setOrientation(orientation);
                                            if (entity.kind === Types.Entities.ZOMBIE) {
                                                entity.raise();
                                                setTimeout(function () {
                                                    entity.aggroRange = 10;
                                                    entity.isAggressive = true;
                                                }, 1000);
                                            }
                                            else if (entity.kind === Types.Entities.PORTALCOW && entity.gridX === 43 && entity.gridY === 211) {
                                                if (self.cowPortalStart) {
                                                    self.audioManager.playSound("portal-open");
                                                    entity.animate("raise", 75, 1, function () {
                                                        entity.idle();
                                                    });
                                                }
                                                else {
                                                    entity.idle();
                                                }
                                            }
                                            else if (entity.kind === Types.Entities.PORTALMINOTAUR && entity.gridX === 40 && entity.gridY === 210) {
                                                if (self.minotaurPortalStart) {
                                                    self.audioManager.playSound("portal-open");
                                                    entity.animate("raise", 75, 1, function () {
                                                        entity.idle();
                                                    });
                                                }
                                                else {
                                                    entity.idle();
                                                }
                                            }
                                            else if (entity.kind === Types.Entities.PORTALSTONE && entity.gridX === 71 && entity.gridY === 643) {
                                                if (self.stonePortalStart) {
                                                    self.audioManager.playSound("portal-open");
                                                    entity.animate("raise", 75, 1, function () {
                                                        entity.idle();
                                                    });
                                                }
                                                else {
                                                    entity.idle();
                                                }
                                            }
                                            else if (entity.kind === Types.Entities.PORTALGATEWAY && entity.gridX === 97 && entity.gridY === 545) {
                                                if (self.gatewayPortalStart) {
                                                    setTimeout(function () {
                                                        self.audioManager.playSound("portal-open");
                                                        entity.animate("raise", 75, 1, function () {
                                                            entity.idle();
                                                        });
                                                    }, 1500);
                                                }
                                                else {
                                                    entity.idle();
                                                }
                                            }
                                            else if (entity.kind === Types.Entities.DOORDEATHANGEL) {
                                                entity.isActivated = isActivated;
                                                if (entity.isActivated) {
                                                    entity.walk();
                                                }
                                                else {
                                                    entity.idle();
                                                }
                                            }
                                            else if (entity.kind === Types.Entities.MAGICSTONE) {
                                                entity.isActivated = isActivated;
                                                if (entity.isActivated) {
                                                    entity.walk();
                                                }
                                                else {
                                                    entity.idle();
                                                }
                                            }
                                            else if (entity.kind === Types.Entities.LEVER ||
                                                entity.kind === Types.Entities.LEVER2 ||
                                                entity.kind === Types.Entities.LEVER3) {
                                                entity.isActivated = isActivated;
                                                if (entity.isActivated) {
                                                    entity.walk();
                                                }
                                                else {
                                                    entity.idle();
                                                }
                                            }
                                            else if (entity.kind === Types.Entities.BLUEFLAME) {
                                                entity.isActivated = isActivated;
                                                entity.setVisible(isActivated);
                                                entity.idle();
                                            }
                                            else if (entity.kind === Types.Entities.ALTARCHALICE ||
                                                entity.kind === Types.Entities.ALTARSOULSTONE ||
                                                entity.kind === Types.Entities.HANDS) {
                                                if (entity.kind === Types.Entities.ALTARCHALICE) {
                                                    self.altarChaliceNpcId = entity.id;
                                                }
                                                else if (entity.kind === Types.Entities.ALTARSOULSTONE) {
                                                    self.altarSoulStoneNpcId = entity.id;
                                                }
                                                entity.isActivated = isActivated;
                                                if (entity.isActivated) {
                                                    entity.walk();
                                                }
                                                else {
                                                    entity.idle();
                                                }
                                            }
                                            else {
                                                if (entity.kind === Types.Entities.TRAP ||
                                                    entity.kind === Types.Entities.TRAP2 ||
                                                    entity.kind === Types.Entities.TRAP3) {
                                                    if (!self.traps.find(function (trap) { return trap.id === entity.id; })) {
                                                        self.traps.push({ id: entity.id, x: entity.gridX, y: entity.gridY });
                                                    }
                                                }
                                                else if (entity.kind === Types.Entities.STATUE || entity.kind === Types.Entities.STATUE2) {
                                                    if (!self.statues.find(function (statue) { return statue.id === entity.id; })) {
                                                        self.statues.push({ id: entity.id, x: entity.gridX, y: entity.gridY });
                                                    }
                                                }
                                                entity.idle();
                                            }
                                            if (entity.kind === Types.Entities.SECRETSTAIRS) {
                                                self.audioManager.playSound("secret-found");
                                            }
                                            self.addEntity(entity);
                                            if (entity instanceof Character) {
                                                if (!(entity instanceof Npc)) {
                                                    entity.onBeforeStep(function () {
                                                        self.unregisterEntityPosition(entity);
                                                    });
                                                    entity.onStep(function () {
                                                        if (!entity.isDying) {
                                                            self.registerEntityDualPosition(entity);
                                                            if (self.player && self.player.target === entity) {
                                                                self.makeAttackerFollow(self.player);
                                                            }
                                                            entity.forEachAttacker(function (attacker) {
                                                                if (attacker.isAdjacent(attacker.target)) {
                                                                    attacker.lookAtTarget();
                                                                }
                                                                else {
                                                                    attacker.follow(entity);
                                                                }
                                                            });
                                                        }
                                                    });
                                                    entity.onStopPathing(function () {
                                                        self.unregisterEntityPosition(entity);
                                                        if (entity.hasTarget() && entity.isAdjacent(entity.target)) {
                                                            entity.lookAtTarget();
                                                        }
                                                        if (entity instanceof Player) {
                                                            var gridX = entity.destination.gridX, gridY = entity.destination.gridY;
                                                            if (self.map.isDoor(gridX, gridY)) {
                                                                var dest = self.map.getDoorDestination(gridX, gridY);
                                                                entity.setGridPosition(dest.x, dest.y);
                                                            }
                                                        }
                                                        entity.forEachAttacker(function (attacker) {
                                                            if (!attacker.isAdjacentNonDiagonal(entity) && attacker.id !== self.playerId) {
                                                                attacker.follow(entity);
                                                            }
                                                        });
                                                        if (entity.spawnCharacterCoords) {
                                                            entity.gridX = entity.spawnCharacterCoords.x;
                                                            entity.gridY = entity.spawnCharacterCoords.y;
                                                        }
                                                        self.registerEntityPosition(entity);
                                                        entity.spawnCharacterCoords = null;
                                                    });
                                                    entity.onRequestPath(function (x, y) {
                                                        var ignored = [entity], ignoreTarget = function (target) {
                                                            ignored.push(target);
                                                            target.forEachAttacker(function (attacker) {
                                                                ignored.push(attacker);
                                                            });
                                                        };
                                                        if (entity.hasTarget()) {
                                                            ignoreTarget(entity.target);
                                                        }
                                                        else if (entity.previousTarget) {
                                                            ignoreTarget(entity.previousTarget);
                                                        }
                                                        return self.findPath(entity, x, y, ignored);
                                                    });
                                                }
                                                entity.onDeath(function () {
                                                    console.info(entity.id + " is dead");
                                                    if (entity instanceof Mob) {
                                                        self.deathpositions[entity.id] = {
                                                            x: entity.gridX,
                                                            y: entity.gridY,
                                                        };
                                                    }
                                                    entity.aggroRange = 0;
                                                    entity.stop();
                                                    entity.isDying = true;
                                                    var speed = 120;
                                                    var hasCustomDeathAnimation = [
                                                        Types.Entities.RAT,
                                                        Types.Entities.RAT2,
                                                        Types.Entities.RAT3,
                                                        Types.Entities.GOLEM,
                                                        Types.Entities.GHOST,
                                                        Types.Entities.WORM,
                                                        Types.Entities.OCULOTHORAX,
                                                        Types.Entities.SKELETONBERSERKER,
                                                        Types.Entities.SKELETONARCHER,
                                                        Types.Entities.SPIDERQUEEN,
                                                        Types.Entities.BUTCHER,
                                                        Types.Entities.SHAMAN,
                                                        Types.Entities.WORM,
                                                        Types.Entities.DEATHBRINGER,
                                                        Types.Entities.DEATHANGEL,
                                                    ].includes(entity.kind);
                                                    if ([Types.Entities.SPIDERQUEEN, Types.Entities.DEATHANGEL].includes(entity.kind)) {
                                                        speed = 250;
                                                    }
                                                    if (!hasCustomDeathAnimation) {
                                                        entity.setSprite(self.getSprite("death"));
                                                    }
                                                    if (isPet) {
                                                        self.removeEntity(entity);
                                                    }
                                                    else {
                                                        entity.animate("death", speed, 1, function () {
                                                            console.info(entity.id + " was removed");
                                                            self.removeEntity(entity);
                                                            self.removeFromRenderingGrid(entity, entity.gridX, entity.gridY);
                                                        });
                                                    }
                                                    entity.forEachAttacker(function (attacker) {
                                                        attacker.disengage();
                                                        self.player.removeAttacker(attacker);
                                                    });
                                                    if (self.player.target && self.player.target.id === entity.id) {
                                                        self.player.disengage();
                                                    }
                                                    self.removeFromEntityGrid(entity, entity.gridX, entity.gridY);
                                                    self.removeFromPathingGrid(entity.gridX, entity.gridY);
                                                    if (self.camera.isVisible(entity)) {
                                                        if (entity.kind === Types.Entities.DEATHANGEL) {
                                                            self.audioManager.playSound("deathangel-death");
                                                        }
                                                        else {
                                                            self.audioManager.playSound("kill" + Math.floor(Math.random() * 2 + 1));
                                                        }
                                                    }
                                                    self.updateCursor();
                                                });
                                                entity.onHasMoved(function (entity) {
                                                    self.assignBubbleTo(entity);
                                                });
                                            }
                                        }
                                    }
                                    catch (err) {
                                        console.error(err);
                                    }
                                }
                                else {
                                    if (isPet) {
                                        self.unregisterEntityPosition(entity);
                                        console.debug("PET " + entity.id + " already exists. Don't respawn, only relocate.");
                                        entity.setGridPosition(x, y);
                                        self.registerEntityPosition(entity);
                                        entity.spawnCharacterCoords = { x: x, y: y };
                                    }
                                    else {
                                        console.debug("Entity " + entity.id + " already exists. Don't respawn only relocate.");
                                    }
                                }
                                if (entity instanceof Player || entity instanceof Mob) {
                                    entity.hitPoints = data.hitPoints;
                                    entity.maxHitPoints = data.maxHitPoints;
                                }
                                if (entity instanceof Player && entity.id !== self.player.id) {
                                    self.unregisterEntityPosition(entity);
                                    var rawWeapon = data.weapon, rawHelm = data.helm, rawArmor = data.armor, amulet_1 = data.amulet, ring1_1 = data.ring1, ring2_1 = data.ring2, belt_1 = data.belt, level = data.level, auras_1 = data.auras, partyId = data.partyId, cape_1 = data.cape, pet_1 = data.pet, shield_1 = data.shield, settings_1 = data.settings;
                                    var _a = rawHelm.split(":"), helm_1 = _a[0], helmLevel_1 = _a[1], helmBonus_1 = _a[2], helmSocket_1 = _a[3];
                                    var _b = rawArmor.split(":"), armor_1 = _b[0], armorLevel_1 = _b[1], armorBonus_1 = _b[2], armorSocket_1 = _b[3];
                                    var _c = rawWeapon.split(":"), weapon_1 = _c[0], weaponLevel_1 = _c[1], weaponBonus_1 = _c[2], weaponSocket_1 = _c[3], weaponSkill = _c[4];
                                    entity.setWeaponName(weapon_1);
                                    entity.setWeaponLevel(weaponLevel_1);
                                    entity.setWeaponBonus(weaponBonus_1);
                                    entity.setWeaponSocket(weaponSocket_1);
                                    entity.setAttackSkill(weaponSkill);
                                    entity.setSpriteName(armor_1);
                                    entity.setArmorName(armor_1);
                                    entity.setArmorLevel(armorLevel_1);
                                    entity.setArmorBonus(armorBonus_1);
                                    entity.setArmorSocket(armorSocket_1);
                                    entity.setHelmName(helm_1);
                                    entity.setHelmLevel(helmLevel_1);
                                    entity.setHelmBonus(helmBonus_1);
                                    entity.setHelmSocket(helmSocket_1);
                                    entity.setBelt(belt_1);
                                    entity.setAmulet(amulet_1);
                                    entity.setRing1(ring1_1);
                                    entity.setRing2(ring2_1);
                                    entity.setAuras(auras_1);
                                    entity.setCape(cape_1);
                                    entity.setPet(pet_1);
                                    entity.setShield(shield_1);
                                    entity.setSettings(settings_1);
                                    entity.setPartyId(partyId);
                                    entity.setLevel(level);
                                    entity.setSprite(self.getSprite(entity.getSpriteName()));
                                    entity.setGridPosition(x, y);
                                    entity.setOrientation(orientation);
                                    self.registerEntityPosition(entity);
                                    if (isEntityExist) {
                                        entity.spawnCharacterCoords = { x: x, y: y };
                                    }
                                }
                                if (entity instanceof Mob) {
                                    if (targetId) {
                                        var player = self.getEntityById(targetId);
                                        if (player) {
                                            self.createAttackLink(entity, player);
                                        }
                                    }
                                }
                            });
                            self.client.onSpawnSpell(function (entity, x, y, orientation, originX, originY, element, casterId, targetId, isRaise2) {
                                if (isRaise2 === void 0) { isRaise2 = false; }
                                var caster = self.getEntityById(casterId);
                                if (!caster)
                                    return;
                                if ([Types.Entities.MAGESPELL, Types.Entities.ARROW, Types.Entities.DEATHANGELSPELL].includes(entity.kind)) {
                                    entity.setSprite(self.getSprite(entity.getSpriteName(!element || ["spectral"].includes(element) ? "" : element)));
                                }
                                else {
                                    entity.setSprite(self.getSprite(entity.getSpriteName()));
                                }
                                if (entity.kind === Types.Entities.DEATHBRINGERSPELL) {
                                    var target = self.getEntityById(targetId) || self.player;
                                    entity.setTarget(target);
                                    entity.setGridPosition(target.gridX, target.gridY);
                                }
                                else {
                                    entity.setGridPosition(caster.gridX, caster.gridY);
                                }
                                if (entity.kind === Types.Entities.MAGESPELL && !isRaise2) {
                                    entity.y = caster.y - 8;
                                }
                                else if (entity.kind === Types.Entities.STATUESPELL || entity.kind === Types.Entities.STATUE2SPELL) {
                                    entity.x = caster.x;
                                    entity.y = caster.y + 8;
                                }
                                else if (entity.kind === Types.Entities.ARROW) {
                                    entity.y = caster.y - 12;
                                    if (entity.x < self.player.x) {
                                        entity.x = caster.x + 16;
                                    }
                                    else if (entity.x > self.player.x) {
                                        entity.x = caster.x - 8;
                                    }
                                }
                                entity.setOrientation(orientation);
                                if (entity.kind === Types.Entities.DEATHANGELSPELL || (entity.kind === Types.Entities.MAGESPELL && isRaise2)) {
                                    entity.setTarget({ x: (x + originX * 8) * 16, y: (y + originY * 8) * 16 });
                                }
                                else if ([Types.Entities.MAGESPELL, Types.Entities.ARROW].includes(entity.kind)) {
                                    var target = self.getEntityById(targetId) || self.player;
                                    entity.setTarget({ x: target.x, y: target.y });
                                }
                                else if (entity.kind === Types.Entities.STATUESPELL || entity.kind === Types.Entities.STATUE2SPELL) {
                                    entity.setTarget({ x: x * 16, y: (y + 16) * 16 });
                                }
                                if (entity.kind === Types.Entities.DEATHBRINGERSPELL) {
                                    entity.animate("idle", entity.idleSpeed, 1, function () { return entity.die(); });
                                }
                                else {
                                    entity.idle();
                                }
                                self.addEntity(entity);
                                if (self.player.gridX === x && self.player.gridY === y) {
                                    self.makePlayerHurtFromSpell(entity);
                                }
                                entity.onDeath(function () {
                                    entity.isDead = true;
                                    console.info(entity.id + " is dead");
                                    if (Types.Entities.DEATHBRINGERSPELL) {
                                        self.removeEntity(entity);
                                        self.removeFromRenderingGrid(entity, entity.gridX, entity.gridY);
                                        return;
                                    }
                                    var speed = 120;
                                    var hasCustomDeathAnimation = [
                                        Types.Entities.DEATHANGELSPELL,
                                        Types.Entities.MAGESPELL,
                                        Types.Entities.STATUESPELL,
                                        Types.Entities.STATUE2SPELL,
                                    ].includes(entity.kind);
                                    if (!hasCustomDeathAnimation) {
                                        entity.setSprite(self.getSprite("death"));
                                    }
                                    entity.animate("death", speed, 1, function () {
                                        console.info("".concat(Types.getKindAsString(entity.kind), " (").concat(entity.id, ") was removed"));
                                        self.removeEntity(entity);
                                    });
                                });
                            });
                            self.client.onDespawnEntity(function (entityId) {
                                var _a, _b;
                                var entity = self.getEntityById(entityId);
                                if (entity) {
                                    console.info("Despawning " + Types.getKindAsString(entity.kind) + " (" + entity.id + ")");
                                    if (self.previousClickPosition) {
                                        var isNear = Math.abs(entity.gridX - self.previousClickPosition.x) <= 1 &&
                                            Math.abs(entity.gridY - self.previousClickPosition.y) <= 1;
                                        if (isNear) {
                                            self.previousClickPosition = null;
                                        }
                                    }
                                    if (entity instanceof Item) {
                                        self.removeItem(entity);
                                    }
                                    else if (entity instanceof Spell) {
                                        (_a = entity.death_callback) === null || _a === void 0 ? void 0 : _a.call(entity);
                                    }
                                    else if (entity instanceof Pet) {
                                        entity.die();
                                    }
                                    else if (entity instanceof Character) {
                                        if (!(entity instanceof Mob)) {
                                            entity.forEachAttacker(function (attacker) {
                                                if (attacker.canReachTarget()) {
                                                    attacker.hit();
                                                }
                                            });
                                        }
                                        if (!entity.isDead) {
                                            entity.die();
                                            if (entity instanceof Player && entity.petId) {
                                                (_b = self.getEntityById(entity.petId)) === null || _b === void 0 ? void 0 : _b.die();
                                            }
                                            else if (entity instanceof Pet) {
                                            }
                                        }
                                    }
                                    else if (entity instanceof Chest) {
                                        entity.open();
                                    }
                                    entity.clean();
                                }
                            });
                            self.client.onItemBlink(function (id) {
                                var item = self.getEntityById(id);
                                if (item) {
                                    item.blink(150);
                                }
                            });
                            self.client.onPartyCreate(function () {
                                self.partyInvites = [];
                                self.partyInvitees = [];
                                self.chat_callback({ message: "Party created!", type: "event" });
                            });
                            self.client.onPartyJoin(function (data) {
                                var partyId = data.partyId, partyLeader = data.partyLeader, members = data.members;
                                self.partyInvites = [];
                                if (partyLeader.name === self.player.name) {
                                    self.partyInvitees = self.partyInvitees.filter(function (invitee) { return invitee !== data.playerName; });
                                }
                                self.player.setPartyId(partyId);
                                self.player.setPartyLeader(partyLeader);
                                self.player.setPartyMembers(members);
                                members === null || members === void 0 ? void 0 : members.forEach(function (_a) {
                                    var _b;
                                    var id = _a.id;
                                    (_b = self.getEntityById(id)) === null || _b === void 0 ? void 0 : _b.setPartyId(partyId);
                                });
                                var message = "Party joined";
                                if (data.playerName !== self.player.name) {
                                    message = "".concat(data.playerName, " joined the party");
                                }
                                else if (members.length === 1 && partyLeader.name === self.player.name) {
                                    message = "Party created, you are the party leader";
                                }
                                self.app.updatePartyMembers(members);
                                self.chat_callback({ message: message, type: "info" });
                                self.nbplayers_callback();
                            });
                            self.client.onPartyRefuse(function (data) {
                                var partyId = data.partyId;
                                self.partyInvites = self.partyInvites.filter(function (invites) { return invites.partyId !== partyId; });
                                self.nbplayers_callback();
                            });
                            self.client.onPartyInvite(function (data) {
                                if (self.player.partyId)
                                    return;
                                var partyId = data.partyId, partyLeader = data.partyLeader;
                                self.partyInvites.push({ name: partyLeader.name, partyId: partyId });
                                if (!$("#party").hasClass("active")) {
                                    if (self.app.partyBlinkInterval) {
                                        clearInterval(self.app.partyBlinkInterval);
                                        self.app.partyBlinkInterval = null;
                                    }
                                    self.app.partyBlinkInterval = setInterval(function () {
                                        $("#party-button").toggleClass("blink");
                                    }, 500);
                                }
                                self.chat_callback({
                                    message: "".concat(partyLeader.name, " invite you to join the party. To accept open the party panel or type /party join ").concat(partyId),
                                    type: "info",
                                });
                            });
                            self.client.onPartyDeleteInvite(function (data) {
                                if (self.player.partyId)
                                    return;
                                var partyId = data.partyId;
                                self.partyInvites = self.partyInvites.filter(function (invites) { return invites.partyId !== partyId; });
                            });
                            self.client.onPartyLeave(function (data) {
                                var _a, _b;
                                var partyId = data.partyId, partyLeader = data.partyLeader, members = data.members, playerName = data.playerName;
                                if (!partyId) {
                                    (_a = self.player.partyMembers) === null || _a === void 0 ? void 0 : _a.forEach(function (_a) {
                                        var _b;
                                        var id = _a.id;
                                        (_b = self.getEntityById(id)) === null || _b === void 0 ? void 0 : _b.setPartyId(partyId);
                                    });
                                }
                                else {
                                    (_b = _.differenceWith(self.player.partyMembers, members, _.isEqual)) === null || _b === void 0 ? void 0 : _b.forEach(function (_a) {
                                        var _b;
                                        var id = _a.id;
                                        (_b = self.getEntityById(id)) === null || _b === void 0 ? void 0 : _b.setPartyId(undefined);
                                    });
                                }
                                self.player.setPartyId(partyId);
                                self.player.setPartyLeader(partyLeader);
                                self.player.setPartyMembers(members);
                                var message = "You left the party";
                                if (playerName !== self.player.name) {
                                    message = "".concat(playerName, " left the party");
                                    self.app.updatePartyMembers(members);
                                }
                                else {
                                    self.app.removePartyHealthBar();
                                    self.partyInvites = [];
                                    self.partyInvitees = [];
                                }
                                self.chat_callback({ message: message, type: "info" });
                                self.nbplayers_callback();
                            });
                            self.client.onPartyDisband(function () {
                                var _a;
                                self.partyInvites = [];
                                self.partyInvitees = [];
                                (_a = self.player.partyMembers) === null || _a === void 0 ? void 0 : _a.forEach(function (_a) {
                                    var _b;
                                    var id = _a.id;
                                    (_b = self.getEntityById(id)) === null || _b === void 0 ? void 0 : _b.setPartyId(undefined);
                                });
                                self.player.setPartyId(undefined);
                                self.player.setPartyLeader(undefined);
                                self.player.setPartyMembers(undefined);
                                self.chat_callback({ message: "Party was disbanded", type: "info" });
                                self.nbplayers_callback();
                                self.app.removePartyHealthBar();
                            });
                            self.client.onPartyInfo(function (message) {
                                self.chat_callback({ message: message, type: "info" });
                            });
                            self.client.onPartyError(function (message) {
                                self.chat_callback({ message: message, type: "error" });
                            });
                            self.client.onPartyLoot(function (_a) {
                                var playerName = _a.playerName, kind = _a.kind, isUnique = _a.isUnique, isSuperior = _a.isSuperior, jewelLevel = _a.jewelLevel;
                                var message = "";
                                if (isUnique) {
                                    message = "".concat(playerName, " received ").concat(isSuperior ? '<span class="item-superior"> a Superior</span>' : "").concat(isUnique && !isSuperior ? "the" : "", " <span class=\"item-unique\">").concat(Types.itemUniqueMap[Types.getKindAsString(kind)][0], "</span>");
                                }
                                else {
                                    message = "".concat(playerName, " received ").concat(jewelLevel ? "+".concat(jewelLevel) : "", " ").concat(EntityFactory.builders[kind]()
                                        .getLootMessage()
                                        .replace("You pick up", ""));
                                }
                                self.chat_callback({ message: message, type: "loot" });
                            });
                            self.client.onPartyHealth(function (member) {
                                self.app.updatePartyHealthBar(member);
                            });
                            self.client.onSoulStone(function (_a) {
                                var kind = _a.kind, isUnique = _a.isUnique;
                                var message = "";
                                if (isUnique) {
                                    message = "".concat(Types.itemUniqueMap[Types.getKindAsString(kind)][0]);
                                }
                                else {
                                    message = "".concat(EntityFactory.builders[kind]().getLootMessage().replace("You pick up", ""));
                                }
                                message += " resided within the Soul Stone";
                                self.chat_callback({ message: message, type: "loot" });
                            });
                            self.client.onTradeRequestSend(function (playerName) {
                                self.chat_callback({ message: "Trade request sent to ".concat(playerName), type: "event" });
                            });
                            self.client.onTradeRequestReceive(function (playerName) {
                                $("#container").addClass("prevent-click");
                                $("#dialog-trade-request").dialog({
                                    dialogClass: "no-close",
                                    autoOpen: true,
                                    draggable: false,
                                    title: "Trade request",
                                    text: "hello",
                                    classes: {
                                        "ui-button": "btn",
                                    },
                                    buttons: [
                                        {
                                            text: "Refuse",
                                            class: "btn btn-default",
                                            click: function () {
                                                self.client.sendTradeRequestRefuse(playerName);
                                                $(this).dialog("close");
                                                $("#container").removeClass("prevent-click");
                                            },
                                        },
                                        {
                                            text: "Accept",
                                            class: "btn",
                                            click: function () {
                                                self.client.sendTradeRequestAccept(playerName);
                                                $(this).dialog("close");
                                                $("#container").removeClass("prevent-click");
                                            },
                                        },
                                    ],
                                });
                                $("#dialog-trade-request").text("".concat(playerName, " wants to start trading with you."));
                                $(".ui-button").removeClass("ui-button");
                            });
                            self.client.onTradeStart(function (players) {
                                $("#trade-player1-status-button").removeClass("disabled");
                                if ($("#dialog-trade-request").dialog("instance")) {
                                    $("#dialog-trade-request").dialog("close");
                                }
                                players.forEach(function (_a) {
                                    var id = _a.id;
                                    if (self.entities[id].name === self.player.name) {
                                        $("#trade-player1-name").text(self.entities[id].name);
                                    }
                                    else {
                                        $("#trade-player2-name").text(self.entities[id].name);
                                    }
                                });
                                self.app.openTrade();
                            });
                            self.client.onTradeClose(function (_a) {
                                var playerName = _a.playerName, isCompleted = _a.isCompleted, isInventoryFull = _a.isInventoryFull;
                                var message = "";
                                if (isCompleted) {
                                    message = "trade completed";
                                }
                                else if (isInventoryFull) {
                                    message = "".concat(playerName === self.player.name ? "Your" : playerName, " inventory doesn't have enough space");
                                }
                                else {
                                    message = "".concat(playerName === self.player.name ? "You" : playerName, " closed the trade");
                                    if (playerName === self.player.name) {
                                    }
                                }
                                self.app.closeTrade(isCompleted);
                                self.player.tradePlayer1 = [];
                                self.chat_callback({
                                    message: message,
                                    type: "info",
                                });
                            });
                            self.client.onTradeInfo(function (message) {
                                self.chat_callback({ message: message, type: "info" });
                            });
                            self.client.onTradeError(function (message) {
                                self.chat_callback({ message: message, type: "error" });
                            });
                            self.client.onPlayer1MoveItem(function (items) {
                                self.player.setTradePlayer1(items);
                                self.updateTradePlayer1();
                            });
                            self.client.onPlayer2MoveItem(function (items) {
                                self.player.setTradePlayer2(items);
                                self.updateTradePlayer2();
                            });
                            self.client.onPlayer1Status(function (isAccepted) {
                                $("#trade-player1-status").find(".btn").toggleClass("disabled", isAccepted);
                                self.updateTradePlayer1(!isAccepted);
                            });
                            self.client.onPlayer2Status(function (isAccepted) {
                                $("#trade-player2-status").text(isAccepted ? "Accepted" : "Waiting ...");
                            });
                            self.client.onEntityMove(function (id, x, y) {
                                var entity = null;
                                if (id !== self.playerId) {
                                    entity = self.getEntityById(id);
                                    if (entity) {
                                        if (self.player.isAttackedBy(entity)) {
                                            self.tryUnlockingAchievement("COWARD");
                                        }
                                        entity.disengage();
                                        entity.idle();
                                        self.makeCharacterGoTo(entity, x, y);
                                    }
                                }
                            });
                            self.client.onEntityDestroy(function (id) {
                                var entity = self.getEntityById(id);
                                if (entity) {
                                    if (entity instanceof Item) {
                                        self.removeItem(entity);
                                    }
                                    else {
                                        self.removeEntity(entity);
                                    }
                                    console.debug("Entity was destroyed: " + entity.id);
                                }
                            });
                            self.client.onPlayerMoveToItem(function (playerId, itemId) {
                                var player, item;
                                if (playerId !== self.playerId) {
                                    player = self.getEntityById(playerId);
                                    item = self.getEntityById(itemId);
                                    if (player && item) {
                                        self.makeCharacterGoTo(player, item.gridX, item.gridY);
                                    }
                                }
                            });
                            self.client.onEntityAttack(function (attackerId, targetId) {
                                var attacker = self.getEntityById(attackerId);
                                var target = self.getEntityById(targetId);
                                if (attacker && target && attacker.id !== self.playerId) {
                                    console.debug(attacker.id + " attacks " + target.id);
                                    if (attacker &&
                                        target instanceof Player &&
                                        target.id !== self.playerId &&
                                        target.target &&
                                        target.target.id === attacker.id &&
                                        attacker.getDistanceToEntity(target) < 3) {
                                        setTimeout(function () {
                                            self.createAttackLink(attacker, target);
                                        }, 200);
                                    }
                                    else {
                                        self.createAttackLink(attacker, target);
                                    }
                                }
                            });
                            self.client.onEntityRaise(function (mobId, targetId) {
                                var mob = self.getEntityById(mobId);
                                if (mob) {
                                    if (mob.kind === Types.Entities.DEATHANGEL) {
                                        mob.setRaisingMode();
                                        self.audioManager.playSound("deathangel-spell");
                                        if (targetId === self.playerId) {
                                            self.client.sendCastSpell(mob.id, mob.gridX, mob.gridY);
                                        }
                                    }
                                    else if (mob.kind === Types.Entities.DEATHBRINGER) {
                                        mob.setRaisingMode();
                                        if (targetId === self.playerId) {
                                            self.client.sendCastSpell(mob.id, mob.gridX, mob.gridY);
                                        }
                                    }
                                    else if (mob.kind === Types.Entities.NECROMANCER) {
                                        mob.setRaisingMode();
                                        self.audioManager.playSound("raise");
                                    }
                                    else if (mob.kind === Types.Entities.MAGICSTONE) {
                                        self.audioManager.playSound("magicstone");
                                        self.activatedMagicStones.push(mobId);
                                        mob.animate("raise", mob.raiseSpeed, 1, function () { return mob.walk(); });
                                    }
                                    else if (mob.kind === Types.Entities.LEVER ||
                                        mob.kind === Types.Entities.LEVER2 ||
                                        mob.kind === Types.Entities.LEVER3) {
                                        if ([mob.kind === Types.Entities.LEVER, mob.kind === Types.Entities.LEVE2].includes(mob.kind)) {
                                            self.audioManager.playSound("lever");
                                        }
                                        else if (mob.kind === Types.Entities.LEVER3) {
                                            self.audioManager.playSound("lever3");
                                        }
                                        mob.animate("raise", mob.raiseSpeed, 1, function () { return mob.walk(); });
                                    }
                                    else if (mob.kind === Types.Entities.DOORDEATHANGEL) {
                                        mob.isActivated = true;
                                        mob.animate("raise", mob.raiseSpeed, 1, function () { return mob.walk(); });
                                    }
                                    else if (mob.kind === Types.Entities.BLUEFLAME) {
                                        self.activatedBlueFlames.push(mobId);
                                        mob.idle();
                                        mob.setVisible(true);
                                    }
                                    else if (mob.kind === Types.Entities.ALTARCHALICE) {
                                        self.isAltarChaliceActivated = true;
                                        mob.walk();
                                    }
                                    else if (mob.kind === Types.Entities.ALTARSOULSTONE) {
                                        self.audioManager.playSound("magic-blast");
                                        setTimeout(function () {
                                            self.audioManager.playSound("stone-break");
                                        }, 400);
                                        mob.animate("walk", 100, 1, function () { return mob.idle(); });
                                    }
                                    else if (mob.kind === Types.Entities.HANDS) {
                                        mob.walk();
                                        if (self.gatewayFxNpcId) {
                                            var gatewayFx_1 = self.getEntityById(self.gatewayFxNpcId);
                                            if (gatewayFx_1) {
                                                self.audioManager.playSound("powder", { delay: 0, volume: 0.25 });
                                                self.audioManager.playSound("static", { delay: 250 });
                                                gatewayFx_1.animate("raise", gatewayFx_1.raiseSpeed, 1, function () {
                                                    gatewayFx_1.idle();
                                                });
                                            }
                                        }
                                    }
                                    else if (mob.kind === Types.Entities.STATUE || mob.kind === Types.Entities.STATUE2) {
                                        if (mob.kind === Types.Entities.STATUE) {
                                            self.audioManager.playSound("fireball", { delay: 250 });
                                        }
                                        else if (mob.kind === Types.Entities.STATUE2) {
                                            self.audioManager.playSound("iceball", { delay: 250 });
                                        }
                                        mob.isActivated = true;
                                        mob.animate("raise", mob.raiseSpeed, 1, function () { return mob.idle(); });
                                    }
                                    else if ([Types.Entities.TRAP, Types.Entities.TRAP2, Types.Entities.TRAP3].includes(mob.kind)) {
                                        self.audioManager.playSound("trap");
                                        mob.raise();
                                        mob.isActivated = true;
                                        setTimeout(function () {
                                            var _a = self.player, gridX = _a.gridX, gridY = _a.gridY;
                                            var trap = self.getTrap(gridX, gridY);
                                            if ((trap === null || trap === void 0 ? void 0 : trap.id) === mob.id) {
                                                if (!self.player.isHurtByTrap) {
                                                    self.player.isHurtByTrap = true;
                                                    self.client.sendHurtTrap(trap);
                                                    setTimeout(function () {
                                                        if (self.player) {
                                                            self.player.isHurtByTrap = false;
                                                        }
                                                    }, 3000);
                                                }
                                            }
                                        }, 150);
                                        setTimeout(function () {
                                            mob.walk();
                                            setTimeout(function () {
                                                mob.unraise();
                                                mob.isActivated = false;
                                                setTimeout(function () {
                                                    mob.idle();
                                                }, 300);
                                            }, 750);
                                        }, 675);
                                    }
                                }
                            });
                            self.client.onEntityUnraise(function (mobId) {
                                var mob = self.getEntityById(mobId);
                                if (mob) {
                                    if (mob.kind === Types.Entities.MAGICSTONE) {
                                        self.activatedMagicStones = [];
                                        mob.idle();
                                    }
                                    else if (mob.kind === Types.Entities.LEVER || mob.kind === Types.Entities.LEVER2) {
                                        self.audioManager.playSound("lever");
                                        mob.animate("unraise", mob.raiseSpeed, 1, function () { return mob.idle(); });
                                    }
                                    else if (mob.kind === Types.Entities.BLUEFLAME) {
                                        self.activatedBlueFlames = [];
                                        mob.setVisible(false);
                                    }
                                    else if (mob.kind === Types.Entities.ALTARCHALICE) {
                                        self.isAltarChaliceActivated = false;
                                        mob.idle();
                                    }
                                    else if (mob.kind === Types.Entities.HANDS) {
                                        mob.idle();
                                    }
                                }
                            });
                            self.client.onPlayerDamageMob(function (_a) {
                                var id = _a.id, dmg = _a.dmg, hp = _a.hp, maxHitPoints = _a.maxHitPoints, isCritical = _a.isCritical, isBlocked = _a.isBlocked;
                                var mob = self.getEntityById(id);
                                if (mob && (dmg || isBlocked)) {
                                    self.infoManager.addDamageInfo({
                                        value: dmg,
                                        x: mob.x,
                                        y: mob.y - 15,
                                        type: "inflicted",
                                        isCritical: isCritical,
                                        isBlocked: isBlocked,
                                    });
                                }
                                if (self.player.hasTarget() || self.player.skillTargetId === id) {
                                    self.updateTarget(id, dmg, hp, maxHitPoints);
                                }
                            });
                            self.client.onPlayerKillMob(function (data) {
                                var kind = data.kind, level = data.level, playerExp = data.playerExp, exp = data.exp, isMiniBoss = data.isMiniBoss;
                                self.player.experience = playerExp;
                                if (self.player.level !== level || playerExp === expForLevel[expForLevel.length - 1]) {
                                    self.player.level = level;
                                    if (level === 71) {
                                        self.tryUnlockingAchievement("GRAND_MASTER");
                                    }
                                    self.updateRequirement();
                                }
                                if (exp) {
                                    self.updateExpBar();
                                    self.infoManager.addDamageInfo({
                                        value: "+" + exp + " exp",
                                        x: self.player.x,
                                        y: self.player.y - 15,
                                        type: "exp",
                                        duration: 3000,
                                    });
                                }
                                self.storage.incrementTotalKills();
                                self.tryUnlockingAchievement("HUNTER");
                                if (kind === Types.Entities.RAT) {
                                    self.storage.incrementRatCount();
                                    self.tryUnlockingAchievement("ANGRY_RATS");
                                }
                                else if (kind === Types.Entities.SKELETON || kind === Types.Entities.SKELETON2) {
                                    self.storage.incrementSkeletonCount();
                                    self.tryUnlockingAchievement("SKULL_COLLECTOR");
                                }
                                else if (kind === Types.Entities.SPECTRE) {
                                    self.storage.incrementSpectreCount();
                                    self.tryUnlockingAchievement("SPECTRE_COLLECTOR");
                                }
                                else if (kind === Types.Entities.BOSS) {
                                    self.client.sendRequestPayout(Types.Entities.BOSS);
                                }
                                else if (kind === Types.Entities.WEREWOLF) {
                                    self.storage.incrementWerewolfCount();
                                    self.tryUnlockingAchievement("BLOODLUST");
                                }
                                else if (kind === Types.Entities.YETI) {
                                    self.storage.incrementYetiCount();
                                    self.tryUnlockingAchievement("MYTH_OR_REAL");
                                }
                                else if (kind === Types.Entities.SKELETON3) {
                                    self.storage.incrementSkeleton3Count();
                                    self.tryUnlockingAchievement("RIP");
                                }
                                else if (kind === Types.Entities.WRAITH) {
                                    self.storage.incrementWraithCount();
                                    self.tryUnlockingAchievement("GHOSTBUSTERS");
                                }
                                else if (kind === Types.Entities.SKELETONCOMMANDER) {
                                    self.tryUnlockingAchievement("DEAD_NEVER_DIE");
                                }
                                else if (kind === Types.Entities.NECROMANCER) {
                                    self.tryUnlockingAchievement("BLACK_MAGIC");
                                }
                                else if (kind === Types.Entities.COW) {
                                    self.storage.incrementCowCount();
                                    self.tryUnlockingAchievement("HAMBURGER");
                                }
                                else if (kind === Types.Entities.COWKING) {
                                    self.tryUnlockingAchievement("COW_KING");
                                }
                                else if (kind === Types.Entities.RAT3) {
                                    self.storage.incrementRat3Count();
                                    self.tryUnlockingAchievement("ANTIDOTE");
                                }
                                else if (kind === Types.Entities.GOLEM) {
                                    self.storage.incrementGolemCount();
                                    self.tryUnlockingAchievement("UNBREAKABLE");
                                }
                                else if (kind === Types.Entities.OCULOTHORAX) {
                                    self.storage.incrementOculothoraxCount();
                                    self.tryUnlockingAchievement("CYCLOP");
                                }
                                else if (kind === Types.Entities.SKELETON4) {
                                    self.storage.incrementSkeleton4Count();
                                    self.tryUnlockingAchievement("TEMPLAR");
                                }
                                else if (kind === Types.Entities.GHOST) {
                                    self.storage.incrementGhostCount();
                                    self.tryUnlockingAchievement("BOO");
                                }
                                else if (kind === Types.Entities.SKELETONBERSERKER) {
                                    self.storage.incrementSkeletonBerserkerCount();
                                    self.tryUnlockingAchievement("VIKING");
                                }
                                else if (kind === Types.Entities.SKELETONARCHER) {
                                    self.storage.incrementSkeletonArcherCount();
                                    self.tryUnlockingAchievement("BULLSEYE");
                                }
                                else if (kind === Types.Entities.SPIDERQUEEN) {
                                    self.tryUnlockingAchievement("SPIDERQUEEN");
                                }
                                else if (kind === Types.Entities.BUTCHER) {
                                    self.tryUnlockingAchievement("BUTCHER");
                                }
                                else if (kind === Types.Entities.MAGE) {
                                    self.storage.incrementMageCount();
                                    self.tryUnlockingAchievement("ARCHMAGE");
                                }
                                else if (kind === Types.Entities.WRAITH2) {
                                    self.storage.incrementWraith2Count();
                                    self.tryUnlockingAchievement("SPECTRAL");
                                }
                                else if (kind === Types.Entities.SHAMAN) {
                                    self.tryUnlockingAchievement("SHAMAN");
                                }
                                else if (kind === Types.Entities.DEATHANGEL) {
                                    self.tryUnlockingAchievement("DEATHANGEL");
                                }
                                if (kind >= Types.Entities.RAT3 && isMiniBoss) {
                                    self.storage.incrementMiniBossCount();
                                    self.tryUnlockingAchievement("MINI_BOSS");
                                }
                                if (Math.floor((self.player.hitPoints * 100) / self.player.maxHitPoints) <= 1 && kind > Types.Entities.RAT2) {
                                    self.tryUnlockingAchievement("NOT_SAFU");
                                }
                            });
                            self.client.onPlayerChangeHealth(function (_a) {
                                var points = _a.points, dmg = _a.dmg, isRegen = _a.isRegen, isHurt = _a.isHurt, isBlocked = _a.isBlocked, attacker = _a.attacker;
                                var player = self.player;
                                var diff;
                                if (player && !player.isDead && !player.invincible) {
                                    diff = points - player.hitPoints;
                                    player.hitPoints = points;
                                    if (player.hitPoints <= 0) {
                                        player.die(attacker);
                                    }
                                    if (isHurt) {
                                        self.infoManager.addDamageInfo({ value: dmg, x: player.x, y: player.y - 15, type: "received", isBlocked: isBlocked });
                                        if (!isBlocked) {
                                            player.hurt();
                                            self.audioManager.playSound("hurt");
                                            self.storage.addDamage(dmg);
                                            self.tryUnlockingAchievement("MEATSHIELD");
                                            self === null || self === void 0 ? void 0 : self.playerhurt_callback();
                                        }
                                    }
                                    else if (!isRegen) {
                                        self.infoManager.addDamageInfo({ value: "+" + diff, x: player.x, y: player.y - 15, type: "healed" });
                                    }
                                    self.updateBars();
                                }
                            });
                            self.client.onEntityChangeHealth(function (_a) {
                                var _b;
                                var points = _a.points, id = _a.id;
                                var entity = self.getEntityById(id);
                                if (entity) {
                                    entity.hitPoints = points;
                                    if (((_b = self.lastHovered) === null || _b === void 0 ? void 0 : _b.id) === entity.id) {
                                        self.updateHoveredTarget(entity);
                                    }
                                }
                            });
                            self.client.onPlayerChangeStats(function (_a) {
                                var _b;
                                var maxHitPoints = _a.maxHitPoints, bonus = __rest(_a, ["maxHitPoints"]);
                                if (self.player.maxHitPoints !== maxHitPoints || self.player.invincible) {
                                    self.player.maxHitPoints = maxHitPoints;
                                    self.player.hitPoints = maxHitPoints;
                                    self.updateBars();
                                }
                                self.player.bonus = bonus;
                                $("#player-damage").text(bonus.damage);
                                $("#player-attackDamage").text(bonus.attackDamage);
                                $("#player-criticalHit").text(bonus.criticalHit);
                                $("#player-magicDamage").text(bonus.magicDamage);
                                $("#player-flameDamage").text(bonus.flameDamage);
                                $("#player-lightningDamage").text(bonus.lightningDamage);
                                $("#player-coldDamage").text(bonus.coldDamage);
                                $("#player-poisonDamage").text(bonus.poisonDamage);
                                $("#player-pierceDamage").text(bonus.pierceDamage);
                                $("#player-defense").text(bonus.defense);
                                $("#player-blockChance").text(bonus.blockChance);
                                $("#player-absorbedDamage").text(bonus.absorbedDamage);
                                $("#player-magicResistance").text(bonus.magicResistance);
                                $("#player-flameResistance").text(bonus.flameResistance);
                                $("#player-lightningResistance").text(bonus.lightningResistance);
                                $("#player-coldResistance").text(bonus.coldResistance);
                                $("#player-poisonResistance").text(bonus.poisonResistance);
                                $("#player-magicFind").text(bonus.magicFind);
                                $("#player-attackSpeed").text(bonus.attackSpeed);
                                $("#player-exp").text(bonus.exp);
                                $("#player-skillTimeout").text(bonus.skillTimeout);
                                $("#player-freezeChance").text(bonus.freezeChance);
                                $("#player-reduceFrozenChance").text(bonus.reduceFrozenChance);
                                $("#player-extraGold").text(bonus.extraGold);
                                $("#player-drainLife").text(bonus.drainLife);
                                $("#player-regenerateHealth").text(bonus.regenerateHealth);
                                self.player.setAttackSpeed(bonus.attackSpeed, (_b = self.player) === null || _b === void 0 ? void 0 : _b.weaponName);
                            });
                            self.client.onPlayerSettings(function (_a) {
                                var playerId = _a.playerId, settings = _a.settings;
                                var player = self.getEntityById(playerId);
                                if (!player)
                                    return;
                                if (typeof settings.capeHue === "number") {
                                    player.capeHue = settings.capeHue;
                                }
                                if (typeof settings.capeSaturate === "number") {
                                    player.capeSaturate = settings.capeSaturate;
                                }
                                if (typeof settings.capeContrast === "number") {
                                    player.capeContrast = settings.capeContrast;
                                }
                                if (typeof settings.pvp === "boolean") {
                                    player.pvp = settings.pvp;
                                }
                                if (typeof settings.partyEnabled === "boolean") {
                                    player.partyEnabled = settings.partyEnabled;
                                }
                                if (typeof settings.tradeEnabled === "boolean") {
                                    player.tradeEnabled = settings.tradeEnabled;
                                }
                            });
                            self.client.onSetBonus(function (bonus) {
                                self.player.setBonus = bonus;
                            });
                            self.client.onPlayerEquipItem(function (_a) {
                                var _b;
                                var playerId = _a.id, kind = _a.kind, level = _a.level, bonus = _a.bonus, socket = _a.socket, skill = _a.skill, skin = _a.skin, type = _a.type;
                                var player = self.getEntityById(playerId);
                                var name = Types.getKindAsString(kind);
                                if (player) {
                                    if (type === "helm") {
                                        player === null || player === void 0 ? void 0 : player.switchHelm(name, level, toString(bonus), toString(socket));
                                    }
                                    else if (type === "armor") {
                                        player === null || player === void 0 ? void 0 : player.switchArmor(self.getSprite(name), level, toString(bonus), toString(socket));
                                    }
                                    else if (type === "weapon") {
                                        player === null || player === void 0 ? void 0 : player.switchWeapon(name, level, toString(bonus), toString(socket), skill);
                                        if (playerId === ((_b = self.player) === null || _b === void 0 ? void 0 : _b.id) && name === "dagger") {
                                            $(".item-equip-weapon").empty();
                                        }
                                        if (playerId === self.player.id) {
                                            self.setAttackSkill(skill);
                                        }
                                    }
                                    else if (type === "cape") {
                                        if (!kind || !level || !bonus) {
                                            player.removeCape();
                                        }
                                        else {
                                            player.switchCape(name, level, toString(bonus));
                                        }
                                        if (playerId === self.player.id) {
                                            self.toggleCapeSliders(kind && level && bonus);
                                        }
                                    }
                                    else if (type === "pet") {
                                        if (!kind || !level || !bonus || !socket || !skin) {
                                            player.setPet(null);
                                        }
                                        else {
                                            player.setPet([name, level, toString(bonus), toString(socket), skin].filter(Boolean).join(":"));
                                        }
                                    }
                                    else if (type === "shield") {
                                        if (!kind || !level) {
                                            player.removeShield();
                                        }
                                        else {
                                            player.switchShield(name, level, toString(bonus), toString(socket), skill);
                                        }
                                        if (playerId === self.player.id) {
                                            self.setDefenseSkill(skill);
                                        }
                                    }
                                    else if (type === "belt") {
                                        player.setBelt([name, level, toString(bonus)].filter(Boolean).join(":"));
                                    }
                                    else if (type === "ring1") {
                                        player.setRing1([name, level, toString(bonus)].filter(Boolean).join(":"));
                                    }
                                    else if (type === "ring2") {
                                        player.setRing2([name, level, toString(bonus)].filter(Boolean).join(":"));
                                    }
                                    else if (type === "amulet") {
                                        player.setAmulet([name, level, toString(bonus)].filter(Boolean).join(":"));
                                    }
                                    if (player.id === self.player.id && !name) {
                                        $(".item-equip-".concat(type)).empty();
                                    }
                                }
                            });
                            self.client.onPlayerAuras(function (playerId, auras) {
                                var player = self.getEntityById(playerId);
                                if (player) {
                                    player.setAuras(auras);
                                }
                            });
                            self.client.onPlayerSkill(function (_a) {
                                var _b;
                                var playerId = _a.id, rawSkill = _a.skill;
                                var player = self.getEntityById(playerId);
                                var skill = rawSkill.skill, level = rawSkill.level, isAttackSkill = rawSkill.isAttackSkill, mobId = rawSkill.mobId;
                                if (player && (player.name === self.player.name || self.player.isNear(player, 16))) {
                                    if (isAttackSkill) {
                                        self.skillCastAnimation.reset();
                                        player.setCastSkill(skill);
                                        self.audioManager.playSound("skill-".concat(Types.skillToNameMap[skill]));
                                        var entity = self.getEntityById(mobId);
                                        if (entity) {
                                            self["skill".concat(_.capitalize(Types.skillToNameMap[skill]), "Animation")].reset();
                                            (_b = entity.setSkillAnimation) === null || _b === void 0 ? void 0 : _b.call(entity, skill);
                                        }
                                    }
                                    else {
                                        if (skill === 1) {
                                            player.clearCursed();
                                        }
                                        player.setDefenseSkillAnimation(Types.defenseSkillTypeAnimationMap[skill], Types.defenseSkillDurationMap[skill](level));
                                    }
                                }
                            });
                            self.client.onPlayerTeleport(function (id, x, y) {
                                var entity = null;
                                var currentOrientation;
                                if (id !== self.playerId) {
                                    entity = self.getEntityById(id);
                                    if (entity) {
                                        currentOrientation = entity.orientation;
                                        self.makeCharacterTeleportTo(entity, x, y);
                                        var pet_2 = entity.petId ? self.getEntityById(entity.petId) : null;
                                        if (pet_2) {
                                            self.makeCharacterTeleportTo(pet_2, x, y);
                                        }
                                        entity.setOrientation(currentOrientation);
                                        entity.forEachAttacker(function (attacker) {
                                            attacker.disengage();
                                            attacker.idle();
                                            attacker.stop();
                                        });
                                    }
                                }
                            });
                            self.client.onDropItem(function (item, mobId) {
                                var pos = self.getDeadMobPosition(mobId);
                                item.setSprite(self.getSprite(item.getSpriteName(item.skin)));
                                if (pos) {
                                    self.addItem(item, pos.x, pos.y);
                                    self.updateCursor();
                                }
                            });
                            self.client.onChatMessage(function (_a) {
                                var entityId = _a.entityId, name = _a.name, message = _a.message, type = _a.type, deductedGold = _a.deductedGold;
                                $("#gold-death-wrapper").toggleClass("visible", !!deductedGold);
                                $("#gold-death").text(deductedGold ? self.formatGold(deductedGold) : "");
                                var entity = self.getEntityById(entityId);
                                if (entity) {
                                    self.createBubble(entityId, message);
                                    self.assignBubbleTo(entity);
                                }
                                self.audioManager.playSound("chat");
                                self.chat_callback({ entityId: entityId, name: name, message: message, type: type });
                            });
                            self.client.onPopulationChange(function (players, levelupPlayer) {
                                self.worldPlayers = players;
                                players.map(function (_a) {
                                    var id = _a.id, bonus = _a.bonus;
                                    var entity = self.getEntityById(id);
                                    if (entity && bonus) {
                                        players.bonus = bonus;
                                    }
                                });
                                if (self.nbplayers_callback) {
                                    self.nbplayers_callback();
                                }
                                if (levelupPlayer) {
                                    if (self.entities[levelupPlayer]) {
                                        self.entities[levelupPlayer].setLevelup();
                                    }
                                    if (levelupPlayer === self.playerId) {
                                        self.audioManager.playSound("levelup");
                                    }
                                }
                            });
                            self.client.onStoneTeleportCheck(function (_a) {
                                var x = _a.x, y = _a.y, confirmed = _a.confirmed, playerId = _a.playerId;
                                self.player.stop_pathing_callback({
                                    x: x,
                                    y: y,
                                    confirmed: confirmed,
                                    isWaypoint: true,
                                    isTeleportSent: true,
                                    isStoneTeleport: true,
                                    playerId: playerId,
                                });
                            });
                            self.client.onBossCheck(function (data) {
                                var status = data.status, message = data.message, hash = data.hash, check = data.check;
                                if (status === "ok") {
                                    var position = parseInt(check[check.length - 1]);
                                    if (check[position] != position) {
                                        self.client.sendBanPlayer("Invalid check position");
                                    }
                                    else {
                                        self.player.stop_pathing_callback({ x: 71, y: 21, confirmed: true });
                                    }
                                }
                                else if (status === "failed") {
                                    self.bosscheckfailed_callback(message);
                                }
                                else if (status === "missing-account") {
                                    self.missingaccount_callback();
                                }
                                else if (status === "completed") {
                                    self.gamecompleted_callback({ hash: hash, fightAgain: true, show: true });
                                }
                            });
                            self.client.onDeathAngelCheck(function (_a) {
                                var x = _a.x, y = _a.y;
                                self.player.stop_pathing_callback({ x: x, y: y, confirmed: true, isWaypoint: true, isTeleportSent: true });
                            });
                            self.client.onReceiveNotification(function (data) {
                                var message = data.message, hash = data.hash, achievement = data.achievement;
                                if (hash) {
                                    self.gamecompleted_callback({ hash: hash });
                                }
                                if (achievement) {
                                    self.tryUnlockingAchievement(achievement, false);
                                }
                                setTimeout(function () {
                                    self.showNotification(message);
                                }, 250);
                            });
                            self.client.onReceiveInventory(function (data) {
                                self.player.setInventory(data);
                                self.updateInventory();
                                self.initTeleportContextMenu();
                            });
                            self.client.onReceiveMerchantSell(function () {
                                self.updateMerchant();
                            });
                            self.client.onReceiveMerchantLog(function (_a) {
                                var rawItem = _a.item, quantity = _a.quantity, amount = _a.amount, type = _a.type;
                                var verb = type === "buy" ? "bought" : "sold";
                                if (type === "sell") {
                                    self.updateMerchant();
                                }
                                var delimiter = Types.isJewel(rawItem) ? "|" : ":";
                                var item = rawItem.split(delimiter)[0];
                                var itemName = Types.getDisplayName(item);
                                var message = itemName
                                    ? "You ".concat(verb, " ").concat(quantity, " ").concat(itemName, " for ").concat(self.formatGold(amount), " gold")
                                    : "You ".concat(verb, " to merchant for ").concat(self.formatGold(amount), " gold");
                                self.chat_callback({ message: message, type: "loot" });
                            });
                            self.client.onReceiveStash(function (data) {
                                self.player.setStash(data);
                                self.updateStash();
                            });
                            self.client.onReceiveUpgrade(function (data, meta) {
                                var _a = meta || {}, luckySlot = _a.luckySlot, isLucky7 = _a.isLucky7, isMagic8 = _a.isMagic8, isSuccess = _a.isSuccess, recipe = _a.recipe;
                                self.isUpgradeItemSent = false;
                                self.player.setUpgrade(data);
                                if (data.length)
                                    self.updateUpgrade({ luckySlot: luckySlot, isSuccess: isSuccess });
                                if (isLucky7) {
                                    self.tryUnlockingAchievement("LUCKY7");
                                }
                                else if (isMagic8) {
                                }
                                else if (recipe === "powderquantum") {
                                    self.tryUnlockingAchievement("ALCHEMIST");
                                }
                            });
                            self.client.onReceiveAnvilUpgrade(function (_a) {
                                var isSuccess = _a.isSuccess, isTransmute = _a.isTransmute, isRuneword = _a.isRuneword, isChestblue = _a.isChestblue, isChestgreen = _a.isChestgreen, isChestpurple = _a.isChestpurple, isChristmasPresent = _a.isChristmasPresent, isChestdead = _a.isChestdead;
                                if (isSuccess) {
                                    self.setAnvilSuccess();
                                }
                                else if (isTransmute || isChestgreen) {
                                    self.setAnvilTransmute();
                                }
                                else if (isRuneword) {
                                    self.setAnvilRuneword();
                                }
                                else if (isChestblue) {
                                    self.setAnvilChestblue();
                                }
                                else if (isChestpurple) {
                                    self.setAnvilRecipe("chestpurple");
                                }
                                else if (isChristmasPresent) {
                                    self.setAnvilRecipe("christmaspresent");
                                }
                                else if (isChestdead) {
                                    self.setAnvilRecipe("chestdead");
                                }
                                else {
                                    self.setAnvilFail();
                                }
                            });
                            self.client.onReceiveAnvilOdds(function (message) {
                                if (self.showAnvilOdds) {
                                    self.chat_callback({
                                        message: message,
                                        type: "info",
                                    });
                                }
                            });
                            self.client.onReceiveAnvilRecipe(function (recipe) {
                                self.setAnvilRecipe(recipe);
                                if (recipe === "cowLevel" || recipe === "minotaurLevel") {
                                    self.app.closeUpgrade();
                                }
                                else if (recipe === "powderquantum") {
                                    self.audioManager.playSound("powder");
                                }
                            });
                            self.client.onReceiveStoreItems(function (items) {
                                self.store.addStoreItems(items);
                            });
                            self.client.onReceivePurchaseCompleted(function (payment) {
                                if (payment.id === Types.Store.EXPANSION1) {
                                    self.player.expansion1 = true;
                                }
                                else if (payment.id === Types.Store.EXPANSION2) {
                                    self.player.expansion2 = true;
                                }
                                self.store.purchaseCompleted(payment);
                            });
                            self.client.onReceivePurchaseError(function (error) {
                                self.store.purchaseError(error);
                            });
                            self.client.onReceiveWaypointsUpdate(function (waypoints) {
                                self.player.waypoints = waypoints;
                                self.initWaypoints(waypoints);
                            });
                            self.client.onReceiveCowLevelStart(function (_a) {
                                var x = _a.x, y = _a.y;
                                self.cowLevelPortalCoords = {
                                    x: x,
                                    y: y,
                                };
                                self.cowPortalStart = true;
                                setTimeout(function () {
                                    self.cowPortalStart = false;
                                }, 1200);
                            });
                            self.client.onReceiveLevelInProgress(function (levelClock, level) {
                                var selectedDate = new Date().valueOf() + levelClock * 1000;
                                $("#countdown")
                                    .removeClass()
                                    .addClass(level)
                                    .countdown(selectedDate.toString())
                                    .on("update.countdown", function (event) {
                                    $(this).html(event.strftime("%M:%S"));
                                })
                                    .on("finish.countdown", function () {
                                    var _this = this;
                                    $(this).html("Level closed.");
                                    setTimeout(function () {
                                        $(_this).html("");
                                    }, 5000);
                                });
                            });
                            self.client.onReceiveCowLevelEnd(function (isCompleted) {
                                if (!$("#countdown").hasClass("cow"))
                                    return;
                                $("#countdown").removeClass();
                                $("#countdown").countdown(0);
                                $("#countdown").countdown("remove");
                                self.cowLevelPortalCoords = null;
                                var teleportBackToTown = function () {
                                    if (self.player.gridY >= 464 && self.player.gridY <= 535) {
                                        var x_1 = randomInt(40, 45);
                                        var y_1 = randomInt(208, 213);
                                        self.player.stop_pathing_callback({ x: x_1, y: y_1, isWaypoint: true });
                                        if (isCompleted) {
                                            self.tryUnlockingAchievement("FARMER");
                                        }
                                    }
                                };
                                if (!self.isZoning()) {
                                    teleportBackToTown();
                                }
                                else {
                                    self.isTeleporting = true;
                                    setTimeout(function () {
                                        teleportBackToTown();
                                        self.isTeleporting = false;
                                    }, 200);
                                }
                            });
                            self.client.onReceiveMinotaurLevelStart(function () {
                                self.minotaurPortalStart = true;
                                setTimeout(function () {
                                    self.minotaurPortalStart = false;
                                }, 1200);
                            });
                            self.client.onReceiveMinotaurLevelEnd(function () {
                                if (!$("#countdown").hasClass("minotaur"))
                                    return;
                                $("#countdown").countdown(0);
                                $("#countdown").countdown("remove");
                                if (self.player.gridY >= 464 && self.player.gridY <= 535) {
                                    var x_2 = randomInt(40, 45);
                                    var y_2 = randomInt(208, 213);
                                    self.player.stop_pathing_callback({ x: x_2, y: y_2, isWaypoint: true });
                                }
                            });
                            self.client.onReceiveChaliceLevelStart(function () {
                            });
                            self.client.onReceiveChaliceLevelEnd(function (isCompleted) {
                                if (!$("#countdown").hasClass("chalice"))
                                    return;
                                $("#countdown").countdown(0);
                                $("#countdown").countdown("remove");
                                if (self.player.gridY >= 696 && self.player.gridY <= 733 && self.player.gridX <= 29) {
                                    var x_3 = isCompleted ? randomInt(40, 46) : randomInt(7, 9);
                                    var y_3 = randomInt(581, 585);
                                    self.player.stop_pathing_callback({ x: x_3, y: y_3, isWaypoint: true });
                                }
                                var entity = self.altarChaliceNpcId ? self.getEntityById(self.altarChaliceNpcId) : null;
                                if (entity) {
                                    entity.isActivated = false;
                                    entity.idle();
                                }
                            });
                            self.client.onReceiveTempleLevelStart(function () {
                            });
                            self.client.onReceiveTempleLevelEnd(function () {
                                if (!$("#countdown").hasClass("temple"))
                                    return;
                                $("#countdown").countdown(0);
                                $("#countdown").countdown("remove");
                                if (self.player.gridY >= 744 && self.player.gridX >= 84) {
                                    var x_4 = randomInt(40, 46);
                                    var y_4 = randomInt(581, 585);
                                    self.player.stop_pathing_callback({ x: x_4, y: y_4, isWaypoint: true });
                                }
                            });
                            self.client.onReceiveStoneLevelStart(function () {
                                self.stonePortalStart = true;
                                setTimeout(function () {
                                    self.stonePortalStart = false;
                                }, 1200);
                            });
                            self.client.onReceiveStoneLevelEnd(function () {
                                if (!$("#countdown").hasClass("stone"))
                                    return;
                                $("#countdown").countdown(0);
                                $("#countdown").countdown("remove");
                                if (self.player.gridY >= 696 &&
                                    self.player.gridY <= 733 &&
                                    self.player.gridX >= 85 &&
                                    self.player.gridX <= 112) {
                                    var x_5 = randomInt(66, 76);
                                    var y_5 = randomInt(638, 645);
                                    self.player.stop_pathing_callback({ x: x_5, y: y_5, isWaypoint: true });
                                }
                            });
                            self.client.onReceiveGatewayLevelStart(function () {
                                self.gatewayPortalStart = true;
                                setTimeout(function () {
                                    self.gatewayPortalStart = false;
                                }, 1200);
                            });
                            self.client.onReceiveGatewayLevelEnd(function () {
                                if (!$("#countdown").hasClass("gateway"))
                                    return;
                                $("#countdown").countdown(0);
                                $("#countdown").countdown("remove");
                                if (self.player.gridY >= 744 && self.player.gridY <= 781 && self.player.gridX <= 29) {
                                    var x_6 = randomInt(95, 100);
                                    var y_6 = randomInt(543, 548);
                                    self.player.stop_pathing_callback({ x: x_6, y: y_6, isWaypoint: true });
                                }
                            });
                            self.client.onFrozen(function (entityId, duration) {
                                var _a;
                                (_a = self.getEntityById(entityId)) === null || _a === void 0 ? void 0 : _a.setFrozen(duration);
                            });
                            self.client.onSlowed(function (entityId, duration) {
                                var _a;
                                (_a = self.getEntityById(entityId)) === null || _a === void 0 ? void 0 : _a.setSlowed(duration);
                            });
                            self.client.onPoisoned(function (entityId, duration) {
                                var _a;
                                (_a = self.getEntityById(entityId)) === null || _a === void 0 ? void 0 : _a.setPoisoned(duration);
                            });
                            self.client.onCursed(function (entityId, curseId, duration) {
                                var _a;
                                if (entityId === self.player.id) {
                                    self.audioManager.playSound("curse");
                                }
                                (_a = self.getEntityById(entityId)) === null || _a === void 0 ? void 0 : _a.setCursed(curseId, duration);
                            });
                            self.client.onTaunt(function (entityId) {
                                var _a;
                                var taunt = (_a = self.getEntityById(entityId)) === null || _a === void 0 ? void 0 : _a.taunt;
                                if (taunt) {
                                    self.audioManager.playSound(taunt);
                                }
                            });
                            self.client.onReceiveGold(function (gold) {
                                self.setGold(gold);
                            });
                            self.client.onReceiveGoldStash(function (gold) {
                                self.setGoldStash(gold);
                            });
                            self.client.onReceiveGoldTrade(function (gold) {
                                self.setGoldTrade(gold);
                            });
                            self.client.onReceiveGoldTrade2(function (gold) {
                                self.setGoldTrade2(gold);
                            });
                            self.client.onReceiveGoldBank(function (gold) {
                                var npc = self.getNpcAt(32, 208);
                                self.makeNpcTalk(npc, { byPass: true, talkIndex: 0, gold: gold });
                            });
                            self.client.onReceiveGoldBankWithdraw(function (gold) {
                                var npc = self.getNpcAt(32, 208);
                                npc.isTalkLocked = false;
                                self.makeNpcTalk(npc, { byPass: true, talkIndex: gold ? 1 : 2, gold: gold });
                            });
                            self.client.onDisconnected(function (message) {
                                var _a;
                                if (self.player) {
                                    self.player.die();
                                }
                                (_a = self.disconnect_callback) === null || _a === void 0 ? void 0 : _a.call(self, message);
                            });
                            self.gamestart_callback();
                            if (self.hasNeverStarted) {
                                self.start();
                                started_callback({ success: true });
                            }
                        });
                        return [2];
                }
            });
        });
    };
    Game.prototype.formatGold = function (gold) {
        return new Intl.NumberFormat("en-EN", {}).format(gold);
    };
    Game.prototype.setGold = function (gold) {
        this.player.setGold(gold);
        $("#gold-inventory-amount").text(this.formatGold(gold));
    };
    Game.prototype.setGoldStash = function (gold) {
        this.player.setGoldStash(gold);
        $("#gold-stash-amount").text(this.formatGold(gold));
    };
    Game.prototype.setGoldTrade = function (gold) {
        this.player.setGoldTrade(gold);
        $("#gold-player1-amount").text(this.formatGold(gold));
    };
    Game.prototype.setGoldTrade2 = function (gold) {
        $("#gold-player2-amount").text(this.formatGold(gold));
    };
    Game.prototype.setCoin = function (coin) {
        this.player.setCoin(coin);
    };
    Game.prototype.createAttackLink = function (attacker, target) {
        if (attacker.hasTarget()) {
            attacker.removeTarget();
        }
        attacker.engage(target);
        if (attacker.id !== this.playerId && !attacker.isDead) {
            target.addAttacker(attacker);
            if (attacker.kind === Types.Entities.ZOMBIE && Object.keys(target.attackers).length >= 15) {
                this.tryUnlockingAchievement("TICKLE_FROM_UNDER");
            }
        }
    };
    Game.prototype.getMouseGridPosition = function () {
        var mx = this.mouse.x, my = this.mouse.y, c = this.renderer.camera, s = this.renderer.scale, ts = this.renderer.tilesize, offsetX = mx % (ts * s), offsetY = my % (ts * s), x = (mx - offsetX) / (ts * s) + c.gridX, y = (my - offsetY) / (ts * s) + c.gridY;
        return { x: x, y: y };
    };
    Game.prototype.makeCharacterGoTo = function (character, x, y) {
        if (!this.map.isOutOfBounds(x, y)) {
            character.go(x, y);
        }
    };
    Game.prototype.makeCharacterTeleportTo = function (character, x, y) {
        if (!this.map.isOutOfBounds(x, y)) {
            this.unregisterEntityPosition(character);
            character.setGridPosition(x, y);
            this.registerEntityPosition(character);
            this.assignBubbleTo(character);
        }
        else {
            console.debug("Teleport out of bounds: " + x + ", " + y);
        }
    };
    Game.prototype.makePlayerAttackNext = function () {
        var pos = {
            x: this.player.gridX,
            y: this.player.gridY,
        };
        switch (this.player.orientation) {
            case Types.Orientations.DOWN:
                pos.y += 1;
                this.makePlayerAttackTo(pos);
                break;
            case Types.Orientations.UP:
                pos.y -= 1;
                this.makePlayerAttackTo(pos);
                break;
            case Types.Orientations.LEFT:
                pos.x -= 1;
                this.makePlayerAttackTo(pos);
                break;
            case Types.Orientations.RIGHT:
                pos.x += 1;
                this.makePlayerAttackTo(pos);
                break;
            default:
                break;
        }
    };
    Game.prototype.makePlayerAttackTo = function (pos) {
        var entity = this.getEntityAt(pos.x, pos.y);
        if (entity instanceof Mob) {
            this.makePlayerAttack(entity);
        }
    };
    Game.prototype.makePlayerGoTo = function (x, y) {
        this.makeCharacterGoTo(this.player, x, y);
    };
    Game.prototype.makePlayerGoToItem = function (item) {
        if (item) {
            this.player.isLootMoving = true;
            this.makePlayerGoTo(item.gridX, item.gridY);
            this.client.sendLootMove(item, item.gridX, item.gridY);
        }
    };
    Game.prototype.makePlayerTalkTo = function (npc) {
        if (npc) {
            this.player.setTarget(npc);
            this.player.follow(npc);
        }
    };
    Game.prototype.makePlayerOpenChest = function (chest) {
        if (chest) {
            this.player.setTarget(chest);
            this.player.follow(chest);
        }
    };
    Game.prototype.makePlayerAttack = function (mob) {
        this.createAttackLink(this.player, mob);
        this.client.sendAttack(mob);
    };
    Game.prototype.makePlayerHurtFromSpell = function (spell) {
        this.client.sendHurtSpell(spell);
    };
    Game.prototype.resetAnvilAnimation = function () {
        this.anvilRecipe = null;
        this.isAnvilFail = false;
        this.isAnvilSuccess = false;
        this.isAnvilTransmute = false;
        this.isAnvilRuneword = false;
        this.isAnvilChestblue = false;
        this.isAnvilChestgreen = false;
        this.isAnvilChestpurple = false;
        this.isChristmasPresent = false;
        this.isAnvilChestdead = false;
        this.isAnvilChestred = false;
        clearTimeout(this.anvilAnimationTimeout);
    };
    Game.prototype.setAnvilSuccess = function () {
        var _this = this;
        this.resetAnvilAnimation();
        this.isAnvilSuccess = true;
        this.anvilAnimationTimeout = setTimeout(function () {
            _this.isAnvilSuccess = false;
        }, 3000);
    };
    Game.prototype.setAnvilFail = function () {
        var _this = this;
        this.resetAnvilAnimation();
        this.isAnvilFail = true;
        this.anvilAnimationTimeout = setTimeout(function () {
            _this.isAnvilFail = false;
        }, 3000);
    };
    Game.prototype.setAnvilRecipe = function (recipe) {
        var _this = this;
        this.resetAnvilAnimation();
        this.anvilRecipe = recipe;
        this.anvilAnimationTimeout = setTimeout(function () {
            _this.anvilRecipe = null;
        }, 3000);
    };
    Game.prototype.setAnvilTransmute = function () {
        var _this = this;
        this.resetAnvilAnimation();
        this.isAnvilTransmute = true;
        this.anvilAnimationTimeout = setTimeout(function () {
            _this.isAnvilTransmute = false;
        }, 3000);
    };
    Game.prototype.setAnvilRuneword = function () {
        var _this = this;
        this.resetAnvilAnimation();
        this.isAnvilRuneword = true;
        this.anvilAnimationTimeout = setTimeout(function () {
            _this.isAnvilRuneword = false;
        }, 3000);
    };
    Game.prototype.setAnvilChestblue = function () {
        var _this = this;
        this.resetAnvilAnimation();
        this.isAnvilChestblue = true;
        this.anvilAnimationTimeout = setTimeout(function () {
            _this.isAnvilChestblue = false;
        }, 3000);
    };
    Game.prototype.makeNpcTalk = function (npc, _a) {
        var _b = _a === void 0 ? {} : _a, byPass = _b.byPass, talkIndex = _b.talkIndex, gold = _b.gold;
        var msg;
        if (npc) {
            this.previousClickPosition = null;
            if (npc.kind === Types.Entities.TREE ||
                npc.kind === Types.Entities.STATUE ||
                npc.kind === Types.Entities.STATUE2 ||
                npc.kind === Types.Entities.TRAP ||
                npc.kind === Types.Entities.TRAP2 ||
                npc.kind === Types.Entities.TRAP3)
                return;
            if (![
                Types.Entities.MAGICSTONE,
                Types.Entities.BLUEFLAME,
                Types.Entities.ALTARCHALICE,
                Types.Entities.ALTARSOULSTONE,
                Types.Entities.LEVER,
                Types.Entities.LEVER2,
                Types.Entities.LEVER3,
                Types.Entities.STATUE,
                Types.Entities.STATUE2,
            ].includes(npc.kind)) {
                if (npc.kind === Types.Entities.JANETYELLEN) {
                    if (byPass) {
                        msg = npc.talk(this, talkIndex).replace("{{gold}}", this.formatGold(gold));
                    }
                    else {
                        var isIouExchange = this.player.inventory.some(function (_a) {
                            var item = _a.item;
                            return typeof item === "string" && item.startsWith("iou");
                        });
                        if (!npc.isTalkLocked) {
                            this.client.sendGoldBank(isIouExchange);
                            if (isIouExchange) {
                                npc.isTalkLocked = true;
                            }
                        }
                        return;
                    }
                }
                else {
                    msg = npc.talk(this);
                }
                if (msg) {
                    this.createBubble(npc.id, msg);
                    this.assignBubbleTo(npc);
                    this.audioManager.playSound("npc");
                }
                else {
                    this.destroyBubble(npc.id);
                    this.audioManager.playSound("npc-end");
                }
                this.tryUnlockingAchievement("SMALL_TALK");
            }
            if (npc.kind === Types.Entities.NYAN) {
                this.tryUnlockingAchievement("NYAN");
            }
            else if (npc.kind === Types.Entities.RICK) {
                this.tryUnlockingAchievement("RICKROLLD");
            }
            else if (npc.kind === Types.Entities.ANVIL) {
                this.app.openUpgrade();
            }
            else if (npc.kind === Types.Entities.MERCHANT) {
                this.app.openMerchant();
            }
            else if (npc.kind === Types.Entities.SORCERER) {
                this.store.openStore();
            }
            else if (npc.kind === Types.Entities.STASH) {
                this.app.openStash();
            }
            else if (npc.kind === Types.Entities.WAYPOINTX ||
                npc.kind === Types.Entities.WAYPOINTN ||
                npc.kind === Types.Entities.WAYPOINTO) {
                var activeWaypoint = this.getWaypointFromGrid(npc.gridX, npc.gridY);
                this.app.openWaypoint(activeWaypoint);
                if (activeWaypoint && this.player.waypoints[activeWaypoint.id - 1] === 0) {
                    this.player.waypoints[activeWaypoint.id - 1] = 1;
                    this.activateWaypoint(activeWaypoint.id);
                    this.client.sendWaypoint(activeWaypoint.id);
                }
            }
            else if (npc.kind === Types.Entities.SATOSHI) {
                this.tryUnlockingAchievement("SATOSHI");
            }
            else if (npc.kind === Types.Entities.PORTALCOW) {
                if (this.player.level >= MIN_COW_LEVEL) {
                    if (npc.gridX === 43 && npc.gridY === 211) {
                        if (this.cowLevelPortalCoords) {
                            this.tryUnlockingAchievement("SECRET_LEVEL");
                            this.player.stop_pathing_callback({
                                x: this.cowLevelPortalCoords.x,
                                y: this.cowLevelPortalCoords.y,
                                isWaypoint: true,
                            });
                        }
                    }
                    else {
                        this.player.stop_pathing_callback({ x: 43, y: 212, isWaypoint: true });
                    }
                }
            }
            else if (npc.kind === Types.Entities.PORTALMINOTAUR) {
                if (this.player.level >= MIN_MINOTAUR_LEVEL) {
                    if (npc.gridX === 40 && npc.gridY === 210) {
                        if (this.minotaurLevelPortalCoords) {
                            this.player.stop_pathing_callback({
                                x: this.minotaurLevelPortalCoords.x,
                                y: this.minotaurLevelPortalCoords.y,
                                isWaypoint: true,
                            });
                        }
                    }
                    else {
                        this.player.stop_pathing_callback({ x: 40, y: 211, isWaypoint: true });
                    }
                }
            }
            else if (npc.kind === Types.Entities.PORTALSTONE) {
                if (npc.gridX === 71 && npc.gridY === 643) {
                    if (this.stoneLevelPortalCoords) {
                        this.player.stop_pathing_callback({
                            x: this.stoneLevelPortalCoords.x,
                            y: this.stoneLevelPortalCoords.y,
                            isWaypoint: true,
                        });
                    }
                }
                else {
                    this.player.stop_pathing_callback({ x: 71, y: 643, isWaypoint: true });
                }
            }
            else if (npc.kind === Types.Entities.PORTALGATEWAY) {
                if (npc.gridX === 97 && npc.gridY === 545) {
                    if (this.gatewayLevelPortalCoords) {
                        this.tryUnlockingAchievement("STARGATE");
                        this.player.stop_pathing_callback({
                            x: this.gatewayLevelPortalCoords.x,
                            y: this.gatewayLevelPortalCoords.y,
                            isWaypoint: true,
                        });
                    }
                }
                else {
                    this.player.stop_pathing_callback({ x: 97, y: 546, isWaypoint: true });
                }
            }
            else if (npc.kind === Types.Entities.DOORDEATHANGEL) {
                if (this.deathAngelLevelPortalCoords && npc.isActivated) {
                    this.player.stop_pathing_callback({
                        x: this.deathAngelLevelPortalCoords.x,
                        y: this.deathAngelLevelPortalCoords.y,
                        isWaypoint: true,
                    });
                }
            }
            else if (npc.kind === Types.Entities.MAGICSTONE) {
                if (!npc.isActivated) {
                    this.client.sendMagicStone(npc.id);
                }
                this.storage.activateMagicStone(npc.gridX);
                if (this.storage.hasAllMagicStones()) {
                    this.tryUnlockingAchievement("STONEHENGE");
                }
            }
            else if (npc.kind === Types.Entities.LEVER ||
                npc.kind === Types.Entities.LEVER2 ||
                npc.kind === Types.Entities.LEVER3) {
                if (!npc.isActivated) {
                    this.client.sendLever(npc.id);
                }
            }
            else if (npc.kind === Types.Entities.ALTARCHALICE) {
                if (!npc.isActivated) {
                    this.client.sendAltarChalice(npc.id);
                }
            }
            else if (npc.kind === Types.Entities.ALTARSOULSTONE) {
                if (!npc.isActivated) {
                    if (this.player.inventory.some(function (_a) {
                        var item = _a.item;
                        return typeof item === "string" && item.startsWith("soulstone");
                    })) {
                        if (this.player.inventory.length >= 24) {
                            this.showNotification("Your inventory is full.");
                            this.audioManager.playSound("noloot");
                        }
                        else {
                            this.client.sendAltarSoulStone(npc.id);
                        }
                    }
                }
            }
            else if (npc.kind === Types.Entities.FOSSIL) {
                if (!npc.isActivated && this.player.weaponName === "pickaxe") {
                    this.client.sendFossil(npc.id);
                }
            }
            else if (npc.kind === Types.Entities.OBELISK) {
                this.tryUnlockingAchievement("OBELISK");
            }
            else if (npc.kind === Types.Entities.HANDS) {
                if (!npc.isActivated) {
                    this.client.sendHands(npc.id);
                }
            }
            else if (npc.kind === Types.Entities.SECRETSTAIRS) {
                if (npc.gridX === 8 && npc.gridY === 683) {
                    this.player.stop_pathing_callback({ x: 7, y: 727, isWaypoint: true });
                    this.tryUnlockingAchievement("TOMB");
                }
                else if (npc.gridX === 19 && npc.gridY === 642) {
                    this.player.stop_pathing_callback({ x: 43, y: 728, isWaypoint: true });
                }
                else if (npc.gridX === 159 && npc.gridY === 597) {
                    this.player.stop_pathing_callback({ x: 136, y: 750, isWaypoint: true });
                }
            }
            else if (npc.kind === Types.Entities.SECRETSTAIRS2) {
                if (npc.gridX === 149 && npc.gridY === 548) {
                    this.player.stop_pathing_callback({ x: 127, y: 731, orientation: Types.Orientations.UP, isWaypoint: true });
                }
                else if (npc.gridX === 162 && npc.gridY === 548) {
                    this.player.stop_pathing_callback({ x: 155, y: 731, orientation: Types.Orientations.UP, isWaypoint: true });
                }
            }
            else if (npc.kind === Types.Entities.SECRETSTAIRSUP) {
                if (npc.gridX === 5 && npc.gridY === 728) {
                    this.player.stop_pathing_callback({ x: 7, y: 683, isWaypoint: true });
                }
                else if (npc.gridX === 41 && npc.gridY === 729) {
                    this.player.stop_pathing_callback({ x: 18, y: 642, isWaypoint: true });
                }
                else if (npc.gridX === 159 && npc.gridY === 778) {
                    this.player.stop_pathing_callback({ x: 43, y: 582, isWaypoint: true });
                }
                else if (npc.gridX === 116 && npc.gridY === 751) {
                    this.player.stop_pathing_callback({ x: 43, y: 545, isWaypoint: true });
                }
                else if (npc.gridX === 137 && npc.gridY === 751) {
                    this.player.stop_pathing_callback({ x: 160, y: 597, isWaypoint: true });
                }
            }
            else if (npc.kind === Types.Entities.GRIMOIRE) {
                this.tryUnlockingAchievement("GRIMOIRE");
                npc.walk();
            }
            else if (npc.kind === Types.Entities.ALKOR) {
                var isFound = this.player.inventory.some(function (_a) {
                    var item = _a.item;
                    return item === "nft";
                });
                if (isFound && !this.storage.getAchievements()[ACHIEVEMENT_NFT_INDEX]) {
                    this.tryUnlockingAchievement("NFT");
                }
            }
            else if (npc.kind === Types.Entities.OLAF) {
                var isFound = this.player.inventory.some(function (_a) {
                    var item = _a.item;
                    return item === "wing";
                });
                if (isFound && !this.storage.getAchievements()[ACHIEVEMENT_WING_INDEX]) {
                    this.tryUnlockingAchievement("WING");
                }
            }
            else if (npc.kind === Types.Entities.VICTOR) {
                var isFound = this.player.inventory.some(function (_a) {
                    var item = _a.item;
                    return item === "crystal";
                });
                if (isFound && !this.storage.getAchievements()[ACHIEVEMENT_CRYSTAL_INDEX]) {
                    this.tryUnlockingAchievement("CRYSTAL");
                }
            }
        }
    };
    Game.prototype.getWaypointFromGrid = function (x, y) {
        return Types.waypoints.find(function (_a) {
            var gridX = _a.gridX, gridY = _a.gridY;
            return gridX === x && gridY === y;
        });
    };
    Game.prototype.forEachEntity = function (callback) {
        _.each(this.entities, function (entity) {
            callback(entity);
        });
    };
    Game.prototype.forEachMob = function (callback) {
        _.each(this.entities, function (entity) {
            if (entity instanceof Mob) {
                callback(entity);
            }
        });
    };
    Game.prototype.forEachVisibleEntityByDepth = function (callback) {
        var self = this, m = this.map;
        this.camera.forEachVisiblePosition(function (x, y) {
            if (!m.isOutOfBounds(x, y)) {
                if (self.renderingGrid[y][x]) {
                    _.each(self.renderingGrid[y][x], function (entity) {
                        callback(entity);
                    });
                }
            }
        }, this.renderer.mobile ? 0 : 2);
    };
    Game.prototype.getForEachVisibleEntityByDepth = function () {
        var self = this;
        var m = this.map;
        var entities = [];
        this.camera.forEachVisiblePosition(function (x, y) {
            if (!m.isOutOfBounds(x, y)) {
                if (self.renderingGrid[y][x]) {
                    _.each(self.renderingGrid[y][x], function (entity) {
                        if (entity.kind === Types.Entities.TRAP ||
                            entity.kind === Types.Entities.TRAP2 ||
                            entity.kind === Types.Entities.TRAP3 ||
                            entity.kind === Types.Entities.FOSSIL) {
                            entities.unshift(entity);
                        }
                        else {
                            entities.push(entity);
                        }
                    });
                }
            }
        }, this.renderer.mobile ? 0 : 2);
        return entities;
    };
    Game.prototype.forEachVisibleTileIndex = function (callback, extra) {
        var m = this.map;
        this.camera.forEachVisiblePosition(function (x, y) {
            if (!m.isOutOfBounds(x, y)) {
                callback(m.GridPositionToTileIndex(x, y) - 1);
            }
        }, extra);
    };
    Game.prototype.forEachVisibleTile = function (callback, extra) {
        var m = this.map;
        this.forEachVisibleTileIndex(function (tileIndex) {
            if (_.isArray(m.data[tileIndex])) {
                _.each(m.data[tileIndex], function (id) {
                    callback(id - 1, tileIndex);
                });
            }
            else {
                if (_.isNaN(m.data[tileIndex] - 1)) {
                }
                else {
                    callback(m.data[tileIndex] - 1, tileIndex);
                }
            }
        }, extra);
    };
    Game.prototype.forEachAnimatedTile = function (callback) {
        if (this.animatedTiles) {
            _.each(this.animatedTiles, function (tile) {
                callback(tile);
            });
        }
    };
    Game.prototype.forEachHighAnimatedTile = function (callback) {
        if (this.highAnimatedTiles) {
            _.each(this.highAnimatedTiles, function (tile) {
                callback(tile);
            });
        }
    };
    Game.prototype.getEntityAt = function (x, y, instance) {
        if (instance === void 0) { instance = null; }
        if (this.map.isOutOfBounds(x, y) || !this.entityGrid) {
            return null;
        }
        var entities = this.entityGrid[y][x];
        var entity = null;
        if (_.size(entities) > 0) {
            if (instance) {
                entity = Object.values(entities).find(function (entity) { return entity instanceof instance; });
            }
            else {
                entity = entities[_.keys(entities)[0]];
            }
        }
        else {
            entity = this.getItemAt(x, y);
        }
        return entity;
    };
    Game.prototype.getAllEntitiesAt = function (x, y, instance) {
        if (instance === void 0) { instance = null; }
        if (this.map.isOutOfBounds(x, y) || !this.entityGrid) {
            return null;
        }
        var entities = this.entityGrid[y][x];
        if (_.size(entities) > 0) {
            entities = Object.values(entities);
            if (instance) {
                entities = entities.filter(function (entity) { return entity instanceof instance; });
            }
        }
        else {
            entities = [];
        }
        return entities;
    };
    Game.prototype.getPlayerAt = function (x, y) {
        var entity = this.getEntityAt(x, y, Player);
        if (entity && entity instanceof Player) {
            return entity;
        }
        return null;
    };
    Game.prototype.getPetAt = function (x, y) {
        var entity = this.getEntityAt(x, y, Pet);
        if (entity && entity instanceof Pet) {
            return entity;
        }
        return null;
    };
    Game.prototype.getMobAt = function (x, y) {
        var entity = this.getEntityAt(x, y, Mob);
        if (entity && entity instanceof Mob && !(entity instanceof Pet)) {
            return entity;
        }
        return null;
    };
    Game.prototype.getNpcAt = function (x, y) {
        var entity = this.getEntityAt(x, y, Npc);
        if (entity &&
            entity instanceof Npc &&
            entity.kind !== Types.Entities.TREE &&
            entity.kind !== Types.Entities.TRAP &&
            entity.kind !== Types.Entities.TRAP2 &&
            entity.kind !== Types.Entities.TRAP3) {
            return entity;
        }
        return null;
    };
    Game.prototype.getSpellAt = function (x, y) {
        var entity = this.getEntityAt(x, y, Spell);
        if (entity && entity instanceof Spell) {
            return entity;
        }
        return null;
    };
    Game.prototype.getChestAt = function (x, y) {
        var entity = this.getEntityAt(x, y, Chest);
        if (entity && entity instanceof Chest) {
            return entity;
        }
        return null;
    };
    Game.prototype.getItemAt = function (x, y) {
        var _this = this;
        if (this.map.isOutOfBounds(x, y) || !this.itemGrid) {
            return null;
        }
        var items = this.itemGrid[y][x];
        var item = null;
        if (_.size(items) > 0) {
            _.each(items, function (i) {
                if (Types.isExpendableItem(i.kind)) {
                    if (_this.renderingGrid[y][x][i.id]) {
                        item = i;
                    }
                    else {
                        _this.removeItem(i);
                    }
                }
            });
            if (!item) {
                _.keys(items).forEach(function (entityId) {
                    if (_this.renderingGrid[y][x][entityId]) {
                        item = items[entityId];
                    }
                    else {
                        _this.removeItem(items[entityId]);
                    }
                });
            }
        }
        return item;
    };
    Game.prototype.isEntityAt = function (x, y) {
        return !_.isNull(this.getEntityAt(x, y));
    };
    Game.prototype.isMobAt = function (x, y) {
        return !_.isNull(this.getMobAt(x, y));
    };
    Game.prototype.isPlayerAt = function (x, y) {
        return !_.isNull(this.getPlayerAt(x, y));
    };
    Game.prototype.isPetAt = function (x, y) {
        return !_.isNull(this.getPetAt(x, y));
    };
    Game.prototype.isItemAt = function (x, y) {
        return !_.isNull(this.getItemAt(x, y));
    };
    Game.prototype.isNpcAt = function (x, y) {
        return !_.isNull(this.getNpcAt(x, y));
    };
    Game.prototype.isSpellAt = function (x, y) {
        return !_.isNull(this.getSpellAt(x, y));
    };
    Game.prototype.isChestAt = function (x, y) {
        return !_.isNull(this.getChestAt(x, y));
    };
    Game.prototype.findPath = function (character, x, y, ignoreList) {
        var self = this, grid = this.pathingGrid, path = [];
        if (this.map.isColliding(x, y)) {
            return path;
        }
        if (this.pathfinder && character) {
            if (ignoreList) {
                _.each(ignoreList, function (entity) {
                    self.pathfinder.ignoreEntity(entity);
                });
            }
            path = this.pathfinder.findPath(grid, character, x, y, false);
            if (ignoreList) {
                this.pathfinder.clearIgnoreList();
            }
        }
        else {
            console.error("Error while finding the path to " + x + ", " + y + " for " + character.id);
        }
        return path;
    };
    Game.prototype.togglePathingGrid = function () {
        this.debugPathing = !this.debugPathing;
    };
    Game.prototype.movecursor = function () {
        var _a;
        var mouse = this.getMouseGridPosition(), x = mouse.x, y = mouse.y;
        this.cursorVisible = true;
        this.hoveringPlayerPvP = false;
        if (this.player && !this.renderer.mobile && !this.renderer.tablet) {
            this.hoveringCollidingTile = this.map.isColliding(x, y);
            this.hoveringPlateauTile = this.player.isOnPlateau ? !this.map.isPlateau(x, y) : this.map.isPlateau(x, y);
            this.hoveringMob = this.isMobAt(x, y);
            this.hoveringPlayer = this.isPlayerAt(x, y);
            this.hoveringPet = this.isPetAt(x, y);
            this.hoveringItem = this.isItemAt(x, y);
            this.hoveringNpc = this.isNpcAt(x, y);
            this.hoveringOtherPlayer = this.isPlayerAt(x, y);
            this.hoveringChest = this.isChestAt(x, y);
            if (this.hoveringMob ||
                this.hoveringPlayer ||
                this.hoveringPet ||
                this.hoveringNpc ||
                this.hoveringChest ||
                this.hoveringOtherPlayer ||
                this.player.target) {
                var entity = this.hoveringMob ||
                    this.hoveringPlayer ||
                    this.hoveringPet ||
                    this.hoveringNpc ||
                    this.hoveringChest ||
                    this.hoveringOtherPlayer
                    ? this.getEntityAt(x, y)
                    : this.player.target;
                if (this.hoveringPlayer && entity.id !== this.player.id && this.player.settings.pvp) {
                    this.hoveringPlayerPvP = entity.settings.pvp;
                }
                this.player.showTarget(entity);
                if (!entity.isHighlighted && this.renderer.supportsSilhouettes && !this.hoveringPlayer) {
                    if (this.lastHovered) {
                        this.lastHovered.setHighlight(false);
                    }
                    entity.setHighlight(true);
                }
                this.lastHovered = entity;
            }
            else if (this.player.inspecting || this.lastHovered) {
                (_a = this.lastHovered) === null || _a === void 0 ? void 0 : _a.setHighlight(null);
                this.onRemoveTarget();
                this.lastHovered = null;
            }
        }
    };
    Game.prototype.keys = function (pos) {
        var _a, _b;
        this.hoveringCollidingTile = false;
        this.hoveringPlateauTile = false;
        if ((pos.x === ((_a = this.previousClickPosition) === null || _a === void 0 ? void 0 : _a.x) && pos.y === ((_b = this.previousClickPosition) === null || _b === void 0 ? void 0 : _b.y)) || this.isZoning()) {
            return;
        }
        else {
            if (!this.player.disableKeyboardNpcTalk)
                this.previousClickPosition = pos;
        }
        if (!this.player.isMoving()) {
            this.cursorVisible = false;
            this.processInput(pos);
        }
    };
    Game.prototype.click = function () {
        var _a, _b;
        var pos = this.getMouseGridPosition();
        if (pos.x === ((_a = this.previousClickPosition) === null || _a === void 0 ? void 0 : _a.x) && pos.y === ((_b = this.previousClickPosition) === null || _b === void 0 ? void 0 : _b.y)) {
            return;
        }
        else {
            this.previousClickPosition = pos;
        }
        this.processInput(pos);
    };
    Game.prototype.processInput = function (pos) {
        var entity;
        if (this.started &&
            this.client.connection.connected &&
            this.player &&
            !this.isTeleporting &&
            !this.isZoning() &&
            !this.isZoningTile(this.player.nextGridX, this.player.nextGridY) &&
            !this.player.isDead &&
            !this.hoveringCollidingTile &&
            !this.hoveringPlateauTile &&
            this.map.grid) {
            entity = this.getMobAt(pos.x, pos.y) || this.getNpcAt(pos.x, pos.y) || this.getEntityAt(pos.x, pos.y);
            if ((entity === null || entity instanceof Item) &&
                pos.x >= 0 &&
                pos.y >= 0 &&
                this.map.grid[pos.y][pos.x] !== 1) {
                this.removeFromPathingGrid(pos.x, pos.y);
            }
            if (entity instanceof Mob || (this.pvp && entity instanceof Player && entity.settings.pvp)) {
                this.makePlayerAttack(entity);
            }
            else if (entity instanceof Item) {
                this.makePlayerGoToItem(entity);
            }
            else if (entity instanceof Npc) {
                if (this.player.isAdjacentNonDiagonal(entity) === false) {
                    this.makePlayerTalkTo(entity);
                }
                else {
                    if (!this.player.disableKeyboardNpcTalk) {
                        this.makeNpcTalk(entity);
                        if (this.player.moveUp || this.player.moveDown || this.player.moveLeft || this.player.moveRight) {
                            this.player.disableKeyboardNpcTalk = true;
                        }
                    }
                }
            }
            else if (entity instanceof Chest) {
                this.makePlayerOpenChest(entity);
            }
            else {
                this.makePlayerGoTo(pos.x, pos.y);
                if (this.isPanelOpened) {
                    this.app.hideWindows();
                }
            }
        }
    };
    Game.prototype.getNearestEntity = function () {
        var _a = this.player, gridX = _a.gridX, gridY = _a.gridY;
        var maxDistance = 16;
        var nearestEntityDistance = maxDistance;
        var nearestEntity = null;
        for (var k in this.entities) {
            if (this.entities[k] instanceof Mob || (this.pvp && this.entities[k] instanceof Player && this.entities[k].pvp)) {
                var _b = this.entities[k], mobGridX = _b.gridX, mobGridY = _b.gridY;
                var distance = Math.abs(gridX - mobGridX) + Math.abs(gridY - mobGridY);
                if (distance >= maxDistance || distance >= nearestEntityDistance)
                    continue;
                nearestEntityDistance = distance;
                nearestEntity = this.entities[k];
            }
        }
        if (nearestEntity) {
            return nearestEntity;
        }
    };
    Game.prototype.processPetInput = function () {
        var _a;
        if (this.player.petId) {
            var pet = this.getEntityById(this.player.petId);
            if (pet) {
                if (Array.isArray(this.player.path) && this.player.path.length) {
                    var petDestination = this.player.path[this.player.path.length - 2];
                    if (!Array.isArray(petDestination) || petDestination.length !== 2)
                        return;
                    if (pet.gridX !== petDestination[0] || pet.gridY !== petDestination[1]) {
                        pet.spawnCharacterCoords = null;
                        pet.go.apply(pet, petDestination);
                        (_a = this.client).sendMovePet.apply(_a, petDestination);
                    }
                }
            }
        }
    };
    Game.prototype.getTrap = function (x, y) {
        if (!this.traps.length)
            return;
        return this.traps.find(function (trap) { return (trap.x - x === 0 || trap.x - x === -1) && (trap.y - y === 0 || trap.y - y === 1); });
    };
    Game.prototype.getStatues = function (x, y) {
        if (!this.statues.length)
            return;
        return this.statues.filter(function (statue) { return Math.abs(statue.x - x) <= 8 && y - statue.y >= 0 && y - statue.y <= 16; });
    };
    Game.prototype.isMobOnSameTile = function (mob, x, y) {
        var X = x || mob.gridX;
        var Y = y || mob.gridY;
        var list = this.entityGrid[Y][X];
        var result = false;
        _.each(list, function (entity) {
            if (entity instanceof Mob && entity.id !== mob.id) {
                result = true;
            }
        });
        return result;
    };
    Game.prototype.getFreeAdjacentNonDiagonalPosition = function (entity) {
        var self = this, result = null;
        entity.forEachAdjacentNonDiagonalPosition(function (x, y, orientation) {
            if (!result && !self.map.isColliding(x, y) && !self.isMobAt(x, y)) {
                result = { x: x, y: y, o: orientation };
            }
        });
        return result;
    };
    Game.prototype.tryMovingToADifferentTile = function (character) {
        var attacker = character, target = character.target;
        if (attacker && target && target instanceof Player) {
            if (!target.isMoving() && attacker.getDistanceToEntity(target) === 0) {
                var pos;
                switch (target.orientation) {
                    case Types.Orientations.UP:
                        pos = {
                            x: target.gridX,
                            y: target.gridY - 1,
                            o: target.orientation,
                        };
                        break;
                    case Types.Orientations.DOWN:
                        pos = {
                            x: target.gridX,
                            y: target.gridY + 1,
                            o: target.orientation,
                        };
                        break;
                    case Types.Orientations.LEFT:
                        pos = {
                            x: target.gridX - 1,
                            y: target.gridY,
                            o: target.orientation,
                        };
                        break;
                    case Types.Orientations.RIGHT:
                        pos = {
                            x: target.gridX + 1,
                            y: target.gridY,
                            o: target.orientation,
                        };
                        break;
                }
                if (pos) {
                    attacker.previousTarget = target;
                    attacker.disengage();
                    attacker.idle();
                    this.makeCharacterGoTo(attacker, pos.x, pos.y);
                    target.adjacentTiles[pos.o] = true;
                    return true;
                }
            }
            if (!target.isMoving() && attacker.isAdjacentNonDiagonal(target) && this.isMobOnSameTile(attacker)) {
                var pos = this.getFreeAdjacentNonDiagonalPosition(target);
                if (pos && !target.adjacentTiles[pos.o]) {
                    if (this.player && this.player.target && attacker.id === this.player.target.id) {
                        return false;
                    }
                    attacker.previousTarget = target;
                    attacker.disengage();
                    attacker.idle();
                    this.makeCharacterGoTo(attacker, pos.x, pos.y);
                    target.adjacentTiles[pos.o] = true;
                    return true;
                }
            }
        }
        return false;
    };
    Game.prototype.onCharacterUpdate = function (character) {
        var _this = this;
        var time = this.currentTime;
        if (character.previousTarget && !character.isMoving() && character instanceof Mob) {
            var t = character.previousTarget;
            if (this.getEntityById(t.id)) {
                character.previousTarget = null;
                this.createAttackLink(character, t);
                return;
            }
        }
        if (character.isAttacking() && (!character.previousTarget || character.id === this.playerId)) {
            if (character.kind === Types.Entities.NECROMANCER ||
                character.kind === Types.Entities.DEATHANGEL ||
                character.kind === Types.Entities.DEATHBRINGER ||
                character.kind === Types.Entities.MAGE ||
                character.kind === Types.Entities.SKELETONARCHER ||
                character.kind === Types.Entities.SHAMAN) {
                if (character.isRaising()) {
                    if (character.canRaise(time)) {
                        character.stop();
                        character.nextStep();
                        var isRaise2 = false;
                        if (character.kind === Types.Entities.SHAMAN && randomInt(1, 3) === 3) {
                            character.raise2();
                            isRaise2 = true;
                        }
                        else {
                            character.raise();
                        }
                        if ([Types.Entities.MAGE, Types.Entities.SKELETONARCHER, Types.Entities.SHAMAN].includes(character.kind) &&
                            character &&
                            character.target &&
                            this.player &&
                            character.target.id === this.player.id) {
                            this.client.sendCastSpell(character.id, character.gridX, character.gridY, character.target.id, isRaise2);
                        }
                    }
                    return;
                }
            }
            var isMoving = this.tryMovingToADifferentTile(character);
            if (character.canAttack(time)) {
                if (!isMoving) {
                    if (character.hasTarget() && character.getOrientationTo(character.target) !== character.orientation) {
                        character.lookAtTarget();
                    }
                    character.hit();
                    if (character.id === this.playerId) {
                        this.client.sendHit(character.target);
                    }
                    if (character instanceof Player && this.camera.isVisible(character)) {
                        this.audioManager.playSound("hit" + Math.floor(Math.random() * 2 + 1));
                    }
                    if (character.hasTarget() &&
                        character.target.id === this.playerId &&
                        this.player &&
                        !this.player.invincible &&
                        character.type !== "player") {
                        setTimeout(function () {
                            _this.client.sendHurt(character);
                        }, character.hurtDelay);
                    }
                }
            }
            else {
                if (character.hasTarget() &&
                    character.isDiagonallyAdjacent(character.target) &&
                    character.target instanceof Player &&
                    !character.target.isMoving()) {
                    character.follow(character.target);
                }
            }
        }
    };
    Game.prototype.isZoningTile = function (x, y) {
        var c = this.camera;
        x = x - c.gridX;
        y = y - c.gridY;
        if (x === 0 || y === 0 || x === c.gridW - 1 || y === c.gridH - 1) {
            return true;
        }
        return false;
    };
    Game.prototype.getZoningOrientation = function (x, y) {
        var orientation = "", c = this.camera;
        x = x - c.gridX;
        y = y - c.gridY;
        if (x === 0) {
            orientation = Types.Orientations.LEFT;
        }
        else if (y === 0) {
            orientation = Types.Orientations.UP;
        }
        else if (x === c.gridW - 1) {
            orientation = Types.Orientations.RIGHT;
        }
        else if (y === c.gridH - 1) {
            orientation = Types.Orientations.DOWN;
        }
        return orientation;
    };
    Game.prototype.startZoningFrom = function (x, y) {
        this.zoningOrientation = this.getZoningOrientation(x, y);
        if (this.renderer.mobile || this.renderer.tablet) {
            var z = this.zoningOrientation, c = this.camera, ts = this.renderer.tilesize, x = c.x, y = c.y, xoffset = (c.gridW - 2) * ts, yoffset = (c.gridH - 2) * ts;
            if (z === Types.Orientations.LEFT || z === Types.Orientations.RIGHT) {
                x = z === Types.Orientations.LEFT ? c.x - xoffset : c.x + xoffset;
            }
            else if (z === Types.Orientations.UP || z === Types.Orientations.DOWN) {
                y = z === Types.Orientations.UP ? c.y - yoffset : c.y + yoffset;
            }
            c.setPosition(x, y);
            this.renderer.clearScreen(this.renderer.context);
            this.endZoning();
            this.forEachVisibleEntityByDepth(function (entity) {
                entity.setDirty();
            });
        }
        else {
            this.currentZoning = new Transition();
        }
        this.bubbleManager.clean();
        this.client.sendZone();
    };
    Game.prototype.enqueueZoningFrom = function (x, y) {
        if (!this.zoningQueue.some(function (_a) {
            var queueX = _a.x, queueY = _a.y;
            return x === queueX && y === queueY;
        })) {
            this.zoningQueue.push({ x: x, y: y });
        }
        if (this.zoningQueue.length === 1) {
            this.startZoningFrom(x, y);
        }
    };
    Game.prototype.endZoning = function () {
        this.currentZoning = null;
        this.isCharacterZoning = false;
        this.resetZone();
        this.zoningQueue.shift();
        if (this.zoningQueue.length > 0) {
            var pos = this.zoningQueue[0];
            this.startZoningFrom(pos.x, pos.y);
        }
    };
    Game.prototype.isZoning = function () {
        return !_.isNull(this.currentZoning) || this.isCharacterZoning;
    };
    Game.prototype.resetZone = function () {
        this.bubbleManager.clean();
        this.initAnimatedTiles();
        this.renderer.renderStaticCanvases();
    };
    Game.prototype.resetCamera = function () {
        this.camera.focusEntity(this.player);
        this.resetZone();
    };
    Game.prototype.say = function (message) {
        var _a, _b, _c, _d;
        var partyRegexp = /^\/party (create|join|invite|leave|remove|disband|leader)(.+)?/;
        var tradeRegexp = /^\/trade (.+)?/;
        if (message.startsWith("/party")) {
            var args = message.match(partyRegexp);
            if (args) {
                var action = args[1];
                var param = (args[2] || "").trim();
                switch (action) {
                    case "create":
                        this.client.sendPartyCreate();
                        break;
                    case "join":
                        if (param) {
                            this.client.sendPartyJoin(parseInt(param, 10));
                        }
                        else {
                            this.chat_callback({ message: "You must specify the party id you want to join", type: "error" });
                        }
                        break;
                    case "invite":
                        if (param) {
                            this.client.sendPartyInvite(String(param));
                        }
                        else {
                            this.chat_callback({
                                message: "You must specify the player you want to invite to the party",
                                type: "error",
                            });
                        }
                        break;
                    case "leave":
                        if (this.player.partyId) {
                            this.client.sendPartyLeave();
                        }
                        else {
                            this.chat_callback({
                                message: "You are not in a party",
                                type: "error",
                            });
                        }
                        break;
                    case "remove":
                        if (param) {
                            this.client.sendPartyRemove(param);
                        }
                        else {
                            this.chat_callback({
                                message: "You must specify the player name you want to remove from the party",
                                type: "error",
                            });
                        }
                        break;
                    case "disband":
                        if (!((_a = this.player.partyLeader) === null || _a === void 0 ? void 0 : _a.id)) {
                            this.chat_callback({
                                message: "You are not in a party",
                                type: "error",
                            });
                        }
                        else if (((_b = this.player.partyLeader) === null || _b === void 0 ? void 0 : _b.id) === this.player.id) {
                            this.client.sendPartyDisband(param);
                        }
                        else {
                            this.chat_callback({
                                message: "Only the party leader can disband the party",
                                type: "error",
                            });
                        }
                        break;
                    case "leader":
                        if (!((_c = this.player.partyLeader) === null || _c === void 0 ? void 0 : _c.id)) {
                            this.chat_callback({
                                message: "You are not in a party",
                                type: "error",
                            });
                        }
                        else if (((_d = this.player.partyLeader) === null || _d === void 0 ? void 0 : _d.id) === this.player.id) {
                        }
                        else {
                            this.chat_callback({
                                message: "Only the party leader can assign another player as the party leader",
                                type: "error",
                            });
                        }
                        break;
                    default:
                        this.chat_callback({
                            message: "invalid /party command",
                            type: "error",
                        });
                }
                return;
            }
        }
        else if (message.startsWith("/ban") && this.admins.includes(this.player.name)) {
            this.app.initBanDialog();
        }
        else if (message.startsWith("/trade")) {
            var args = message.match(tradeRegexp);
            var playerName = ((args === null || args === void 0 ? void 0 : args[1]) || "").trim();
            var isPlayerFound = false;
            if (!playerName || playerName === this.player.name) {
                this.chat_callback({
                    message: "Type a player name to trade with.",
                    type: "error",
                });
                return;
            }
            if (!this.storage.getAchievements()[ACHIEVEMENT_HERO_INDEX]) {
                this.chat_callback({
                    message: "You must kill the Skeleton King before you can trade.",
                    type: "error",
                });
                return;
            }
            if (this.player.gridY < 195 || this.player.gridY > 250 || this.player.gridX > 90) {
                this.chat_callback({
                    message: "You can only trade in town.",
                    type: "error",
                });
                return;
            }
            for (var i in this.entities) {
                if (this.entities[i].kind !== Types.Entities.WARRIOR) {
                    continue;
                }
                if (this.entities[i].name === playerName) {
                    isPlayerFound = true;
                    if (Math.abs(this.entities[i].gridX - this.player.gridX) > 3 ||
                        Math.abs(this.entities[i].gridY - this.player.gridY) > 3) {
                        this.chat_callback({
                            message: "You can only trade with ".concat(playerName, " if the player is 3 or less tiles away."),
                            type: "error",
                        });
                    }
                    else {
                        this.client.sendTradeRequest(playerName);
                    }
                    break;
                }
            }
            if (playerName && !isPlayerFound) {
                this.chat_callback({
                    message: "".concat(playerName, " is not online."),
                    type: "error",
                });
            }
            return;
        }
        else if (message.startsWith("/town")) {
            if (Object.keys(this.player.attackers).length || (this.player.gridY >= 195 && this.player.gridY <= 259)) {
                return;
            }
            var x = randomInt(33, 39);
            var y = randomInt(208, 211);
            this.player.stop_pathing_callback({ x: x, y: y, isWaypoint: true });
            return;
        }
        this.client.sendChat(message);
    };
    Game.prototype.createBubble = function (id, message) {
        this.bubbleManager.create(id, message, this.currentTime);
    };
    Game.prototype.destroyBubble = function (id) {
        this.bubbleManager.destroyBubble(id);
    };
    Game.prototype.assignBubbleTo = function (character) {
        var bubble = this.bubbleManager.getBubbleById(character.id);
        if (bubble) {
            var s = this.renderer.scale;
            var t = 16 * s;
            var x = (character.x - this.camera.x) * s;
            var w = parseInt(bubble.element.css("width")) + 24;
            var offsetX = w / 2 - t / 2;
            var offsetY;
            var y;
            if (character instanceof Npc) {
                offsetY = 0;
            }
            else {
                if (s === 2) {
                    if (this.renderer.mobile) {
                        offsetY = 0;
                    }
                    else {
                        offsetY = 15;
                    }
                }
                else {
                    offsetY = 12;
                }
            }
            if (character.kind === Types.Entities.GRIMOIRE) {
                offsetX -= 8 * s;
                offsetY += 22 * s;
            }
            y = (character.y - this.camera.y) * s - t * 2 - offsetY;
            bubble.element.css("left", x - offsetX + "px");
            bubble.element.css("top", y + "px");
        }
    };
    Game.prototype.respawn = function () {
        console.debug("Beginning respawn");
        this.entities = {};
        this.initEntityGrid();
        this.initPathingGrid();
        this.initRenderingGrid();
        this.player = new Warrior("player", this.username);
        this.player.account = this.account;
        this.app.initTargetHud();
        this.started = true;
        this.client.enable();
        this.client.sendLogin({ name: this.username, account: this.account, password: this.password });
        this.storage.incrementRevives();
        if (this.renderer.mobile || this.renderer.tablet) {
            this.renderer.clearScreen(this.renderer.context);
        }
        console.debug("Finished respawn");
        $("#parchment").removeClass("death");
    };
    Game.prototype.onGameStart = function (callback) {
        this.gamestart_callback = callback;
    };
    Game.prototype.onDisconnect = function (callback) {
        this.disconnect_callback = callback;
    };
    Game.prototype.onPlayerDeath = function (callback) {
        this.playerdeath_callback = callback;
    };
    Game.prototype.onGameCompleted = function (callback) {
        this.gamecompleted_callback = callback;
    };
    Game.prototype.onMissingAccount = function (callback) {
        this.missingaccount_callback = callback;
    };
    Game.prototype.onAccount = function (callback) {
        this.account_callback = callback;
    };
    Game.prototype.onBossCheckFailed = function (callback) {
        this.bosscheckfailed_callback = callback;
    };
    Game.prototype.onUpdateTarget = function (callback) {
        this.updatetarget_callback = callback;
    };
    Game.prototype.onPlayerExpChange = function (callback) {
        this.playerexp_callback = callback;
    };
    Game.prototype.onPlayerHealthChange = function (callback) {
        this.playerhp_callback = callback;
    };
    Game.prototype.onPlayerHurt = function (callback) {
        this.playerhurt_callback = callback;
    };
    Game.prototype.onPlayerEquipmentChange = function (callback) {
        this.equipment_callback = callback;
    };
    Game.prototype.onNbPlayersChange = function (callback) {
        this.nbplayers_callback = callback;
    };
    Game.prototype.onChatMessage = function (callback) {
        this.chat_callback = callback;
    };
    Game.prototype.onNotification = function (callback) {
        this.notification_callback = callback;
    };
    Game.prototype.onPlayerStartInvincible = function (callback) {
        this.invinciblestart_callback = callback;
    };
    Game.prototype.onPlayerStopInvincible = function (callback) {
        this.invinciblestop_callback = callback;
    };
    Game.prototype.resize = function () {
        var x = this.camera.x;
        var y = this.camera.y;
        this.renderer.rescale();
        this.camera = this.renderer.camera;
        this.camera.setPosition(x, y);
        this.renderer.renderStaticCanvases();
    };
    Game.prototype.updateBars = function () {
        if (this.player && this.playerhp_callback) {
            this.playerhp_callback(this.player.hitPoints, this.player.maxHitPoints);
            $("#player-hp").text(this.player.maxHitPoints);
        }
    };
    Game.prototype.updateExpBar = function () {
        if (this.player && this.playerexp_callback) {
            var expInThisLevel = this.player.experience - Types.expForLevel[this.player.level - 1];
            var expForLevelUp = Types.expForLevel[this.player.level] - Types.expForLevel[this.player.level - 1];
            this.playerexp_callback(expInThisLevel, expForLevelUp);
            $("#player-level").text(this.player.level);
        }
    };
    Game.prototype.updateTarget = function (targetId, dmg, hitPoints, maxHitPoints) {
        if ((this.player.hasTarget() || this.player.skillTargetId === targetId) && this.updatetarget_callback) {
            var target = this.getEntityById(targetId);
            if (!target)
                return;
            target.points = dmg;
            target.hitPoints = hitPoints;
            target.maxHitPoints = maxHitPoints;
            this.updatetarget_callback(target);
        }
    };
    Game.prototype.updateHoveredTarget = function (target) {
        this.updatetarget_callback(target);
    };
    Game.prototype.getDeadMobPosition = function (mobId) {
        var position;
        if (mobId in this.deathpositions) {
            position = this.deathpositions[mobId];
            delete this.deathpositions[mobId];
        }
        return position;
    };
    Game.prototype.onAchievementUnlock = function (callback) {
        this.unlock_callback = callback;
    };
    Game.prototype.tryUnlockingAchievement = function (name, send) {
        var _this = this;
        if (send === void 0) { send = true; }
        var achievement = null;
        var self = this;
        return new Promise(function (resolve) {
            if (name in _this.achievements) {
                achievement = _this.achievements[name];
                if (achievement.isCompleted() && self.storage.unlockAchievement(achievement.id)) {
                    if (self.unlock_callback) {
                        if (send) {
                            self.client.sendAchievement(achievement.id);
                        }
                        self.unlock_callback(achievement.id, achievement.name, achievement[self.network || "nano"]);
                        self.audioManager.playSound("achievement");
                        resolve();
                    }
                }
            }
        });
    };
    Game.prototype.showNotification = function (message, timeout) {
        if (timeout === void 0) { timeout = 3500; }
        if (this.notification_callback) {
            this.notification_callback(message, timeout);
        }
    };
    Game.prototype.removeObsoleteEntities = function () {
        var nb = _.size(this.obsoleteEntities), self = this;
        if (nb > 0) {
            _.each(this.obsoleteEntities, function (entity) {
                if (entity.id != self.player.id) {
                    self.removeEntity(entity);
                }
            });
            console.debug("Removed " +
                nb +
                " entities: " +
                _.map(_.reject(this.obsoleteEntities, function (id) {
                    return id === self.player.id;
                }), "id"));
            this.obsoleteEntities = null;
        }
    };
    Game.prototype.updateCursor = function () {
        if (!this.cursorVisible)
            var keepCursorHidden = true;
        this.movecursor();
        this.updateCursorLogic();
        if (keepCursorHidden)
            this.cursorVisible = false;
    };
    Game.prototype.updatePlateauMode = function () {
        if (this.map.isPlateau(this.player.gridX, this.player.gridY)) {
            this.player.isOnPlateau = true;
        }
        else {
            this.player.isOnPlateau = false;
        }
    };
    Game.prototype.updatePlayerCheckpoint = function () {
        var checkpoint = this.map.getCurrentCheckpoint(this.player);
        if (checkpoint) {
            var lastCheckpoint = this.player.lastCheckpoint;
            if (!lastCheckpoint || (lastCheckpoint && lastCheckpoint.id !== checkpoint.id)) {
                this.player.lastCheckpoint = checkpoint;
                this.client.sendCheck(checkpoint.id);
            }
        }
    };
    Game.prototype.checkUndergroundAchievement = function () {
        var music = this.audioManager.getSurroundingMusic(this.player);
        if (music) {
            if (music.name === "cave") {
                this.tryUnlockingAchievement("UNDERGROUND");
            }
        }
    };
    Game.prototype.makeAttackerFollow = function (attacker) {
        var target = attacker.target;
        if (attacker.isAdjacent(attacker.target)) {
            attacker.lookAtTarget();
        }
        else {
            attacker.follow(target);
        }
    };
    Game.prototype.forEachEntityAround = function (x, y, r, callback) {
        for (var i = x - r, max_i = x + r; i <= max_i; i += 1) {
            for (var j = y - r, max_j = y + r; j <= max_j; j += 1) {
                if (!this.map.isOutOfBounds(i, j)) {
                    _.each(this.renderingGrid[j][i], function (entity) {
                        callback(entity);
                    });
                }
            }
        }
    };
    Game.prototype.checkOtherDirtyRects = function (r1, source, x, y) {
        var r = this.renderer;
        this.forEachEntityAround(x, y, 2, function (e2) {
            if (source && source.id && e2.id === source.id) {
                return;
            }
            if (!e2.isDirty) {
                var r2 = r.getEntityBoundingRect(e2);
                if (r.isIntersecting(r1, r2)) {
                    e2.setDirty();
                }
            }
        });
        if (source && !source.hasOwnProperty("index")) {
            this.forEachAnimatedTile(function (tile) {
                if (!tile.isDirty) {
                    var r2 = r.getTileBoundingRect(tile);
                    if (r.isIntersecting(r1, r2)) {
                        tile.isDirty = true;
                    }
                }
            });
        }
        if (!this.drawTarget && this.selectedCellVisible) {
            var targetRect = r.getTargetBoundingRect();
            if (r.isIntersecting(r1, targetRect)) {
                this.drawTarget = true;
                this.renderer.targetRect = targetRect;
            }
        }
    };
    Game.prototype.tryLootingItem = function (item) {
        var _a, _b;
        try {
            this.player.loot(item, this.storage.getAchievements());
            this.client.sendLoot(item);
            this.removeItem(item);
            if (!this.player.partyId) {
                var params = {};
                if (item.kind === Types.Entities.GOLD) {
                    if ((_b = (_a = this.player) === null || _a === void 0 ? void 0 : _a.bonus) === null || _b === void 0 ? void 0 : _b.extraGold) {
                        params.amount = Math.floor((this.player.bonus.extraGold / 100) * item.amount + item.amount);
                    }
                }
                if (item.kind !== Types.Entities.SOULSTONE) {
                    this.showNotification(item.getLootMessage(params));
                }
            }
            if (item.type === "armor") {
                this.tryUnlockingAchievement("FAT_LOOT");
            }
            else if (item.type === "weapon") {
                this.tryUnlockingAchievement("A_TRUE_WARRIOR");
            }
            else if (item.kind === Types.Entities.CAKE) {
                this.tryUnlockingAchievement("FOR_SCIENCE");
            }
            else if (item.kind === Types.Entities.FIREFOXPOTION) {
                this.tryUnlockingAchievement("FOXY");
                this.audioManager.playSound("firefox");
            }
            else if (item.kind === Types.Entities.NANOPOTION || item.kind === Types.Entities.BANANOPOTION) {
                this.app.updateNanoPotions(this.player.nanoPotions);
                if (this.player.nanoPotions >= 5) {
                    this.tryUnlockingAchievement("NANO_POTIONS");
                }
            }
            else if (Types.Entities.Gems.includes(item.kind)) {
                this.app.updateGems(this.player.gems);
                if (!this.player.gems.some(function (found) { return !found; })) {
                    this.tryUnlockingAchievement("GEM_HUNTER");
                }
            }
            else if (Types.Entities.Artifact.includes(item.kind)) {
                this.app.updateArtifact(this.player.artifact);
                if (!this.player.artifact.some(function (found) { return !found; })) {
                    this.tryUnlockingAchievement("INDIANA_JONES");
                }
            }
            else if (item.kind === Types.Entities.SKELETONKEY) {
                this.tryUnlockingAchievement("SKELETON_KEY");
                this.player.skeletonKey = true;
            }
            else if (item.kind === Types.Entities.STONEHERO) {
                this.tryUnlockingAchievement("EMBLEM");
            }
            else if (item.kind === Types.Entities.SOULSTONE) {
                this.tryUnlockingAchievement("SOULSTONE");
            }
            else if (item.kind === Types.Entities.CHALICE) {
                this.tryUnlockingAchievement("CRUISADE");
            }
            else if (Types.isRune(item.kind)) {
                var rune = Types.getRuneFromItem(item.itemKind);
                if (rune.rank >= 25) {
                    this.tryUnlockingAchievement("RUNOLOGUE");
                }
            }
            if (Types.isHealingItem(item.kind)) {
                this.audioManager.playSound("heal");
            }
            else {
                this.audioManager.playSound("loot");
            }
            if (item.wasDropped && !item.playersInvolved.includes(this.playerId)) {
                this.tryUnlockingAchievement("NINJA_LOOT");
            }
        }
        catch (err) {
            if (err instanceof Exceptions.LootException) {
                this.showNotification(err.message);
                this.audioManager.playSound("noloot");
            }
            else {
                throw err;
            }
        }
    };
    return Game;
}());
export default Game;
