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
import isEqual from "lodash/isEqual";
import { kinds, Types } from "../../shared/js/gametypes";
import { ACHIEVEMENT_CRYSTAL_INDEX, ACHIEVEMENT_NFT_INDEX, ACHIEVEMENT_OBELISK_INDEX, ACHIEVEMENT_WING_INDEX, } from "../../shared/js/types/achievements";
import { toArray, toNumber } from "../../shared/js/utils";
import { defaultSettings } from "./../../shared/js/settings";
import Character from "./character";
import Exceptions from "./exceptions";
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(id, name, account, kind) {
        var _this = _super.call(this, id, kind) || this;
        _this.type = "player";
        _this.name = name;
        _this.account = account;
        _this.level = 1;
        _this.nameOffsetY = -10;
        _this.spriteName = "clotharmor";
        _this.helmName = "helmcloth";
        _this.helmLevel = 1;
        _this.helmBonus = null;
        _this.armorName = "clotharmor";
        _this.armorLevel = 1;
        _this.armorBonus = null;
        _this.weaponName = "dagger";
        _this.weaponLevel = 1;
        _this.weaponBonus = null;
        _this.weaponRuneword = null;
        _this.isWeaponUnique = false;
        _this.beltName = null;
        _this.beltLevel = 1;
        _this.beltBonus = null;
        _this.cape = null;
        _this.capeLevel = null;
        _this.capeBonus = null;
        _this.capeHue = 0;
        _this.capeSaturate = 0;
        _this.capeContrast = 0;
        _this.capeBrightness = 1;
        _this.pet = null;
        _this.petLevel = null;
        _this.petBonus = null;
        _this.petSocket = null;
        _this.petSkin = null;
        _this.shieldName = null;
        _this.shieldLevel = 1;
        _this.shieldBonus = null;
        _this.inventory = [];
        _this.stash = [];
        _this.upgrade = [];
        _this.tradePlayer1 = [];
        _this.tradePlayer2 = [];
        _this.gems = [];
        _this.artifact = [];
        _this.expansion1 = false;
        _this.expansion2 = false;
        _this.waypoints = [];
        _this.skeletonKey = false;
        _this.nanoPotions = 0;
        _this.damage = "0";
        _this.absorb = "0";
        _this.ring1Name = null;
        _this.ring1Level = null;
        _this.ring1Bonus = null;
        _this.ring2Name = null;
        _this.ring2Level = null;
        _this.ring2Bonus = null;
        _this.amuletName = null;
        _this.amuletLevel = null;
        _this.amuletBonus = null;
        _this.auras = [];
        _this.setBonus = {};
        _this.bonus = {};
        _this.isLootMoving = false;
        _this.isSwitchingWeapon = true;
        _this.moveUp = false;
        _this.moveDown = false;
        _this.moveLeft = false;
        _this.moveRight = false;
        _this.disableKeyboardNpcTalk = false;
        _this.partyId = null;
        _this.partyLeader = null;
        _this.partyMembers = null;
        _this.settings = defaultSettings;
        return _this;
    }
    Player.prototype.setPartyId = function (partyId) {
        this.partyId = partyId;
    };
    Player.prototype.setPartyLeader = function (partyLeader) {
        this.partyLeader = partyLeader;
    };
    Player.prototype.setPartyMembers = function (partyMembers) {
        this.partyMembers = partyMembers;
    };
    Player.prototype.setCapeHue = function (hue) {
        this.capeHue = hue;
    };
    Player.prototype.setCapeSaturate = function (saturate) {
        this.capeSaturate = saturate;
    };
    Player.prototype.setPartyEnabled = function (enabled) {
        this.partyEnabled = enabled;
    };
    Player.prototype.setTradeEnabled = function (enabled) {
        this.tradeEnabled = enabled;
    };
    Player.prototype.setCapeContrast = function (contrast) {
        this.capeContrast = contrast;
    };
    Player.prototype.setCapeBrightness = function (brightness) {
        this.capeBrightness = brightness;
    };
    Player.prototype.loot = function (item, achievements) {
        if (item) {
            if (Types.Entities.Gems.includes(item.kind)) {
                var index = Types.Entities.Gems.indexOf(item.kind);
                if (index > -1 && this.gems[index] !== 0) {
                    throw new Exceptions.LootException("You already collected the ".concat(Types.getGemNameFromKind(item.kind), " gem."));
                }
                else {
                    this.gems[index] = 1;
                }
            }
            else if (Types.Entities.Artifact.includes(item.kind)) {
                var index = Types.Entities.Artifact.indexOf(item.kind);
                if (index > -1 && this.artifact[index] !== 0) {
                    throw new Exceptions.LootException("You already collected the ".concat(Types.getArtifactNameFromKind(item.kind), " part."));
                }
                else {
                    this.artifact[index] = 1;
                }
            }
            else if (item.kind === Types.Entities.SKELETONKEY) {
                if (this.skeletonKey) {
                    throw new Exceptions.LootException("You already have the Skeleton Key.");
                }
                else {
                    this.skeletonKey = true;
                }
            }
            else if (item.kind === Types.Entities.NANOPOTION || item.kind === Types.Entities.BANANOPOTION) {
                this.nanoPotions += 1;
            }
            else if (item.partyId && item.partyId !== this.partyId) {
                throw new Exceptions.LootException("Can't loot item, it belongs to a party.");
            }
            else if (["armor", "weapon", "belt", "cape", "shield", "ring", "amulet", "rune"].includes(item.type)) {
                if (this.inventory.length >= 24) {
                    throw new Exceptions.LootException("Your inventory is full.");
                }
            }
            else if (Types.isSingle(item.kind)) {
                var itemKind_1 = item.itemKind;
                var allItems = this.inventory
                    .concat(this.upgrade)
                    .concat(this.stash)
                    .concat([{ item: this.weaponName }]);
                var isFound = allItems.some(function (_a) {
                    var inventoryItem = _a.item;
                    return inventoryItem === itemKind_1;
                });
                if (!isFound && itemKind_1.startsWith("powder")) {
                    isFound = allItems.some(function (_a) {
                        var inventoryItem = _a.item;
                        return inventoryItem === "powderquantum";
                    });
                }
                if (isFound) {
                    throw new Exceptions.LootException("You already have this item.");
                }
                else if (item.kind === Types.Entities.NFT && achievements[ACHIEVEMENT_NFT_INDEX]) {
                    throw new Exceptions.LootException("You already completed the NFT achievement.");
                }
                else if (item.kind === Types.Entities.WING && achievements[ACHIEVEMENT_WING_INDEX]) {
                    throw new Exceptions.LootException("You already completed the Dragon Wing achievement.");
                }
                else if (item.kind === Types.Entities.CRYSTAL && achievements[ACHIEVEMENT_CRYSTAL_INDEX]) {
                    throw new Exceptions.LootException("You already completed the Crystal achievement.");
                }
                else if (item.kind === Types.Entities.PICKAXE && achievements[ACHIEVEMENT_OBELISK_INDEX]) {
                    throw new Exceptions.LootException("You already completed the Obelisk achievement.");
                }
            }
            else if (item.kind === Types.Entities.NANOCOIN && this.network !== "nano") {
                throw new Exceptions.LootException("You can't loot XNO coins.");
            }
            else if (item.kind === Types.Entities.BANANOCOIN && this.network !== "ban") {
                throw new Exceptions.LootException("You can't loot BAN coins.");
            }
            console.info("Player " + this.id + " has looted " + item.id);
            if (item.kind === Types.Entities.FIREFOXPOTION) {
                item.onLoot(this);
            }
        }
    };
    Player.prototype.isMovingToLoot = function () {
        return this.isLootMoving;
    };
    Player.prototype.getEquipment = function () {
        return [
            this.weaponName,
            this.helmName,
            this.armorName,
            this.beltName,
            this.shieldName,
            this.amuletName,
            this.ring1Name,
            this.ring2Name,
            this.pet,
        ];
    };
    Player.prototype.getSpriteName = function () {
        return this.spriteName;
    };
    Player.prototype.setSpriteName = function (name) {
        this.spriteName = name;
    };
    Player.prototype.getArmorSprite = function () {
        if (this.invincible) {
            return this.normalSprite;
        }
        else {
            return this.sprite;
        }
    };
    Player.prototype.getArmorName = function () {
        var sprite = this.getArmorSprite();
        return sprite.id;
    };
    Player.prototype.setArmorName = function (name) {
        this.armorName = name;
    };
    Player.prototype.getArmorLevel = function () {
        return this.armorLevel;
    };
    Player.prototype.setArmorLevel = function (level) {
        this.armorLevel = toNumber(level);
    };
    Player.prototype.getArmorBonus = function () {
        return this.armorBonus;
    };
    Player.prototype.getArmorSocket = function () {
        return this.armorSocket;
    };
    Player.prototype.setArmorBonus = function (bonus) {
        this.armorBonus = toArray(bonus);
    };
    Player.prototype.setArmorSocket = function (socket) {
        this.armorSocket = toArray(socket);
    };
    Player.prototype.getHelmSprite = function () {
        if (this.invincible) {
            return this.normalSprite;
        }
        else {
        }
    };
    Player.prototype.getHelmName = function () {
        return this.helmName;
    };
    Player.prototype.setHelmName = function (name) {
        this.helmName = name;
    };
    Player.prototype.getHelmLevel = function () {
        return this.helmLevel;
    };
    Player.prototype.setHelmLevel = function (level) {
        this.helmLevel = toNumber(level);
    };
    Player.prototype.getHelmBonus = function () {
        return this.helmBonus;
    };
    Player.prototype.getHelmSocket = function () {
        return this.helmSocket;
    };
    Player.prototype.setHelmBonus = function (bonus) {
        this.helmBonus = toArray(bonus);
    };
    Player.prototype.setHelmSocket = function (socket) {
        this.helmSocket = toArray(socket);
    };
    Player.prototype.getWeaponName = function () {
        return this.weaponName;
    };
    Player.prototype.setWeaponName = function (name) {
        this.weaponName = name;
    };
    Player.prototype.getWeaponLevel = function () {
        return this.weaponLevel;
    };
    Player.prototype.setWeaponLevel = function (level) {
        this.weaponLevel = toNumber(level);
    };
    Player.prototype.getWeaponBonus = function () {
        return this.weaponBonus;
    };
    Player.prototype.setWeaponBonus = function (bonus) {
        var _a;
        this.weaponBonus = toArray(bonus);
        this.isWeaponUnique = !!(this.weaponBonus && ((_a = this.weaponBonus) === null || _a === void 0 ? void 0 : _a.length) === 2);
    };
    Player.prototype.setWeaponSocket = function (socket) {
        this.weaponSocket = toArray(socket);
        this.weaponRuneword = Array.isArray(this.weaponSocket)
            ? Types.getRunewordBonus({
                isUnique: this.isWeaponUnique,
                socket: this.weaponSocket,
                type: "weapon",
            }).runeword
            : null;
    };
    Player.prototype.getWeaponSocket = function () {
        return this.weaponSocket;
    };
    Player.prototype.getShieldName = function () {
        return this.shieldName;
    };
    Player.prototype.setShieldName = function (name) {
        this.shieldName = name;
    };
    Player.prototype.getShieldLevel = function () {
        return this.shieldLevel;
    };
    Player.prototype.setShieldLevel = function (level) {
        this.shieldLevel = toNumber(level);
    };
    Player.prototype.getShieldBonus = function () {
        return this.shieldBonus;
    };
    Player.prototype.setShieldBonus = function (bonus) {
        this.shieldBonus = toArray(bonus);
    };
    Player.prototype.setShieldSocket = function (socket) {
        this.shieldSocket = toArray(socket);
    };
    Player.prototype.getShieldSocket = function () {
        return this.shieldSocket;
    };
    Player.prototype.getDefenseSkill = function () {
        return this.defenseSkill;
    };
    Player.prototype.setDefenseSkill = function (skill) {
        this.defenseSkill = toNumber(skill);
    };
    Player.prototype.getAttackSkill = function () {
        return this.attackSkill;
    };
    Player.prototype.setAttackSkill = function (skill) {
        this.attackSkill = toNumber(skill);
    };
    Player.prototype.setBelt = function (rawBelt) {
        if (rawBelt) {
            var _a = rawBelt.split(":"), belt = _a[0], level = _a[1], bonus = _a[2];
            this.beltName = belt;
            this.beltLevel = toNumber(level);
            this.beltBonus = toArray(bonus);
        }
        else {
            this.beltName = null;
            this.beltLevel = null;
            this.beltBonus = null;
        }
    };
    Player.prototype.setCape = function (rawCape) {
        if (rawCape) {
            var _a = rawCape.split(":"), cape = _a[0], level = _a[1], bonus = _a[2];
            this.cape = cape;
            this.capeLevel = toNumber(level);
            this.capeBonus = toArray(bonus);
        }
        else {
            this.cape = null;
            this.capeLevel = null;
            this.capeBonus = null;
        }
    };
    Player.prototype.setPet = function (rawPet) {
        if (rawPet) {
            var _a = rawPet.split(":"), pet = _a[0], level = _a[1], bonus = _a[2], socket = _a[3], skin = _a[4];
            this.pet = pet;
            this.petLevel = toNumber(level);
            this.petBonus = toArray(bonus);
            this.petSocket = toArray(socket);
            this.petSkin = toNumber(skin);
        }
        else {
            this.pet = null;
            this.petLevel = null;
            this.petBonus = null;
            this.petSocket = null;
            this.petSkin = null;
        }
    };
    Player.prototype.setShield = function (rawShield) {
        if (rawShield) {
            var _a = rawShield.split(":"), shield = _a[0], level = _a[1], bonus = _a[2], socket = _a[3], skill = _a[4];
            this.shieldName = shield;
            this.shieldLevel = toNumber(level);
            this.shieldBonus = toArray(bonus);
            this.shieldSocket = toArray(socket);
            this.defenseSkill = toNumber(skill);
        }
        else {
            this.shieldName = null;
            this.shieldLevel = null;
            this.shieldBonus = null;
            this.defenseSkill = null;
        }
    };
    Player.prototype.setSettings = function (settings) {
        if (settings.playerNames) {
            this.settings.playerNames = settings.playerNames;
        }
        if (settings.damageInfo) {
            this.settings.damageInfo = settings.damageInfo;
        }
        if (settings.capeHue) {
            this.settings.capeHue = settings.capeHue;
        }
        if (settings.capeSaturate) {
            this.settings.capeSaturate = settings.capeSaturate;
        }
        if (settings.capeContrast) {
            this.settings.capeContrast = settings.capeContrast;
        }
        if (settings.capeBrightness) {
            this.settings.capeBrightness = settings.capeBrightness;
        }
        if (settings.pvp) {
            this.settings.pvp = settings.pvp;
        }
        if (settings.partyEnabled) {
            this.settings.partyEnabled = settings.partyEnabled;
        }
        if (settings.tradeEnabled) {
            this.settings.tradeEnabled = settings.tradeEnabled;
        }
        if (settings.effects) {
            this.settings.effects = settings.effects;
        }
        if (settings.debug) {
            this.settings.debug = settings.debug;
        }
    };
    Player.prototype.setRing1 = function (ring) {
        if (ring) {
            var _a = ring.split(":"), name_1 = _a[0], level = _a[1], bonus = _a[2];
            this.ring1Name = name_1;
            this.ring1Level = toNumber(level);
            this.ring1Bonus = toArray(bonus);
        }
        else {
            this.ring1Name = null;
            this.ring1Level = null;
            this.ring1Bonus = null;
        }
    };
    Player.prototype.setRing2 = function (ring) {
        if (ring) {
            var _a = ring.split(":"), name_2 = _a[0], level = _a[1], bonus = _a[2];
            this.ring2Name = name_2;
            this.ring2Level = toNumber(level);
            this.ring2Bonus = toArray(bonus);
        }
        else {
            this.ring2Name = null;
            this.ring2Level = null;
            this.ring2Bonus = null;
        }
    };
    Player.prototype.setAmulet = function (amulet) {
        if (amulet) {
            var _a = amulet.split(":"), name_3 = _a[0], level = _a[1], bonus = _a[2];
            this.amuletName = name_3;
            this.amuletLevel = toNumber(level);
            this.amuletBonus = toArray(bonus);
        }
        else {
            this.amuletName = null;
            this.amuletLevel = null;
            this.amuletBonus = null;
        }
    };
    Player.prototype.setLevel = function (level) {
        this.level = level;
    };
    Player.prototype.setAuras = function (auras) {
        this.auras = auras || [];
    };
    Player.prototype.hasWeapon = function () {
        return this.weaponName !== null;
    };
    Player.prototype.switchWeapon = function (weapon, level, bonus, socket, skill) {
        var _a;
        var isDifferent = false;
        if (weapon !== this.getWeaponName()) {
            isDifferent = true;
            this.setWeaponName(weapon);
        }
        if (toNumber(level) !== this.getWeaponLevel()) {
            isDifferent = true;
            this.setWeaponLevel(level);
        }
        if (!isEqual(bonus, this.getWeaponBonus())) {
            isDifferent = true;
            this.setWeaponBonus(bonus);
        }
        if (!isEqual(socket, this.getWeaponSocket())) {
            isDifferent = true;
            this.setWeaponSocket(socket);
        }
        if (toNumber(skill) !== this.getAttackSkill()) {
            isDifferent = true;
            this.setAttackSkill(skill);
        }
        if (isDifferent) {
            (_a = this.switch_callback) === null || _a === void 0 ? void 0 : _a.call(this);
        }
    };
    Player.prototype.switchHelm = function (helm, level, bonus, socket) {
        var _a;
        var isDifferent = false;
        if (helm !== this.getHelmName()) {
            isDifferent = true;
            this.setHelmName(helm);
        }
        if (toNumber(level) !== this.getHelmLevel()) {
            isDifferent = true;
            this.setHelmLevel(level);
        }
        if (!isEqual(bonus, this.getHelmBonus())) {
            isDifferent = true;
            this.setHelmBonus(bonus);
        }
        if (!isEqual(socket, this.getHelmSocket())) {
            isDifferent = true;
            this.setHelmSocket(socket);
        }
        if (isDifferent) {
            (_a = this.switch_callback) === null || _a === void 0 ? void 0 : _a.call(this);
        }
    };
    Player.prototype.switchArmor = function (armorSprite, level, bonus, socket) {
        var _a;
        var isDifferent = false;
        if (armorSprite && armorSprite.id !== this.getSpriteName()) {
            isDifferent = true;
            this.setSprite(armorSprite);
            this.setSpriteName(armorSprite.id);
            this.setArmorName(armorSprite.id);
        }
        if (armorSprite.name !== "firefox" && level && level !== this.getArmorLevel()) {
            isDifferent = true;
            this.setArmorLevel(level);
        }
        if (bonus !== this.getArmorBonus()) {
            isDifferent = true;
            this.setArmorBonus(bonus);
        }
        if (socket !== this.getArmorSocket()) {
            isDifferent = true;
            this.setArmorSocket(socket);
        }
        if (armorSprite.name !== "firefox" && isDifferent) {
            (_a = this.switch_callback) === null || _a === void 0 ? void 0 : _a.call(this);
        }
    };
    Player.prototype.switchCape = function (cape, level, bonus) {
        var _a;
        var isDifferent = false;
        if (cape !== this.cape) {
            isDifferent = true;
            this.cape = cape;
        }
        if (level !== this.capeLevel) {
            isDifferent = true;
            this.capeLevel = level;
        }
        if (bonus !== this.capeBonus) {
            isDifferent = true;
            this.capeBonus = bonus;
        }
        if (isDifferent) {
            (_a = this.switch_callback) === null || _a === void 0 ? void 0 : _a.call(this);
        }
    };
    Player.prototype.switchShield = function (shield, level, bonus, socket, skill) {
        var _a;
        var isDifferent = false;
        if (shield !== this.getShieldName()) {
            isDifferent = true;
            this.setShieldName(shield);
        }
        if (level !== this.getShieldLevel()) {
            isDifferent = true;
            this.setShieldLevel(level);
        }
        if (toArray(bonus) !== this.getShieldBonus()) {
            isDifferent = true;
            this.setShieldBonus(bonus);
        }
        if (toArray(socket) !== this.getShieldSocket()) {
            isDifferent = true;
            this.setShieldSocket(bonus);
        }
        if (skill !== this.getDefenseSkill()) {
            isDifferent = true;
            this.setDefenseSkill(skill);
        }
        if (isDifferent) {
            (_a = this.switch_callback) === null || _a === void 0 ? void 0 : _a.call(this);
        }
    };
    Player.prototype.removeCape = function () {
        var _a;
        this.cape = null;
        this.capeLevel = null;
        this.capeBonus = null;
        (_a = this.switch_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    Player.prototype.removeShield = function () {
        var _a;
        this.shieldName = null;
        this.shieldLevel = null;
        this.shieldBonus = null;
        this.defenseSkill = null;
        (_a = this.switch_callback) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    Player.prototype.prepareRawItems = function (items) {
        return items
            .map(function (rawItem, slot) {
            if (!rawItem)
                return false;
            var delimiter = Types.isJewel(rawItem) ? "|" : ":";
            var _a = rawItem.split(delimiter), item = _a[0], levelOrQuantityOrAmount = _a[1], bonus = _a[2], socket = _a[3], skillOrSkin = _a[4];
            var isWeapon = kinds[item][1] === "weapon";
            var isHelm = kinds[item][1] === "helm";
            var isArmor = kinds[item][1] === "armor";
            var isBelt = kinds[item][1] === "belt";
            var isCape = kinds[item][1] === "cape";
            var isShield = kinds[item][1] === "shield";
            var isRing = kinds[item][1] === "ring";
            var isAmulet = kinds[item][1] === "amulet";
            var isChest = kinds[item][1] === "chest";
            var isJewel = kinds[item][1] === "jewel";
            var isPet = Types.isPetItem(item);
            var hasLevel = isWeapon || isHelm || isArmor || isBelt || isCape || isPet || isShield || isRing || isAmulet || isJewel;
            var level = hasLevel ? parseInt(levelOrQuantityOrAmount) : null;
            var isQuantity = Types.isScroll(item) ||
                isChest ||
                Types.isRune(item) ||
                Types.isStone(item) ||
                Types.isBar(item) ||
                Types.isConsumable(item);
            var amount = !hasLevel && !isQuantity && !Types.isSingle(item) && !Types.isChest(item) && !isPet
                ? parseInt(levelOrQuantityOrAmount)
                : null;
            var isUnique = Types.isUnique(item, bonus, isJewel ? level : undefined);
            var isSuperior = Types.isSuperior(bonus);
            var requirement = null;
            var quantity = null;
            var runeword = null;
            var skill = null;
            var skin = null;
            if (isJewel) {
                requirement = Types.getJewelRequirement(bonus);
            }
            else if (hasLevel) {
                requirement = Types.getItemRequirement(item, levelOrQuantityOrAmount);
                if (isWeapon || isHelm || isHelm || isArmor || isShield) {
                    (runeword = Types.getRunewordBonus({
                        isUnique: isUnique,
                        socket: toArray(socket),
                        type: kinds[item][1],
                    }).runeword);
                    skill = skillOrSkin;
                }
                else if (isPet) {
                    skin = skillOrSkin;
                }
            }
            else if (isQuantity) {
                quantity = parseInt(levelOrQuantityOrAmount);
            }
            return __assign(__assign(__assign(__assign(__assign({ item: item, bonus: bonus, socket: socket, slot: slot, requirement: requirement, isUnique: isUnique, isSuperior: isSuperior, runeword: runeword }, { level: level }), { quantity: quantity }), { skill: skill }), { skin: skin }), { amount: amount });
        })
            .filter(Boolean);
    };
    Player.prototype.setInventory = function (inventory) {
        this.inventory = this.prepareRawItems(inventory);
    };
    Player.prototype.setStash = function (stash) {
        this.stash = this.prepareRawItems(stash);
    };
    Player.prototype.setTrade = function (trade) {
        this.trade = this.prepareRawItems(trade);
    };
    Player.prototype.setUpgrade = function (upgrade) {
        this.upgrade = this.prepareRawItems(upgrade);
    };
    Player.prototype.setGold = function (gold) {
        this.gold = gold;
    };
    Player.prototype.setGoldStash = function (gold) {
        this.goldStash = gold;
    };
    Player.prototype.setGoldTrade = function (gold) {
        this.goldTrade = gold;
    };
    Player.prototype.setCoin = function (coin) {
        this.coin = coin;
    };
    Player.prototype.setTradePlayer1 = function (items) {
        this.tradePlayer1 = this.prepareRawItems(items);
    };
    Player.prototype.setTradePlayer2 = function (items) {
        this.tradePlayer2 = this.prepareRawItems(items);
    };
    Player.prototype.onSwitchItem = function (callback) {
        this.switch_callback = callback;
    };
    Player.prototype.onInvincibleStart = function (callback) {
        this.invinciblestart_callback = callback;
    };
    Player.prototype.onInvincibleStop = function (callback) {
        this.invinciblestop_callback = callback;
    };
    Player.prototype.startInvincibility = function () {
        var _this = this;
        var self = this;
        if (this.invincibleTimeout) {
            clearTimeout(this.invincibleTimeout);
            this.invincibleTimeout = null;
        }
        if (!this.invincible) {
            this.currentArmorSprite = this.getSprite();
            this.invincible = true;
            this.invinciblestart_callback();
        }
        this.invincibleTimeout = setTimeout(function () {
            _this.stopInvincibility();
            _this.setAnimation("idle_down", _this.idleSpeed);
            _this.idle(self.orientation);
        }, 10000);
    };
    Player.prototype.stopInvincibility = function () {
        this.invincible = false;
        this.invinciblestop_callback();
        if (this.invincibleTimeout) {
            clearTimeout(this.invincibleTimeout);
            this.invincibleTimeout = null;
        }
        if (this.currentArmorSprite) {
            this.setSprite(this.currentArmorSprite);
            this.setSpriteName(this.currentArmorSprite.id);
            this.currentArmorSprite = null;
        }
    };
    return Player;
}(Character));
export default Player;
