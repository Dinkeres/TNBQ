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
import BigNumber from "bignumber.js";
import * as _ from "lodash";
import forEach from "lodash/forEach";
import sanitizer from "sanitizer";
import { attackSkillType, defenseSkillType, scrollToSkillMap } from "../../shared/js//types/skill";
import { Types } from "../../shared/js/gametypes";
import { toArray } from "../../shared/js/utils";
export var sanitize = function (string) {
    return sanitizer.escape(sanitizer.sanitize(string));
};
export var random = function (range) {
    return Math.floor(Math.random() * range);
};
export var randomRange = function (min, max) {
    return min + Math.random() * (max - min);
};
export var randomInt = function (min, max) {
    if (max < min) {
        return min;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};
export var clamp = function (min, max, value) {
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    else {
        return value;
    }
};
export var randomOrientation = function () {
    var o, r = random(4);
    if (r === 0) {
        o = Types.Orientations.LEFT;
    }
    if (r === 1) {
        o = Types.Orientations.RIGHT;
    }
    if (r === 2) {
        o = Types.Orientations.UP;
    }
    if (r === 3) {
        o = Types.Orientations.DOWN;
    }
    return o;
};
export var Mixin = function (target, source) {
    if (source) {
        for (var key, keys = Object.keys(source), l = keys.length; l--;) {
            key = keys[l];
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};
export var distanceTo = function (x, y, x2, y2) {
    var distX = Math.abs(x - x2), distY = Math.abs(y - y2);
    return distX > distY ? distX : distY;
};
export var NaN2Zero = function (num) {
    if (isNaN(num * 1)) {
        return 0;
    }
    else {
        return num * 1;
    }
};
export var trueFalse = function (bool) {
    return bool === "true" ? true : false;
};
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
var NANO_PAYOUT_MULTIPLIER = 10;
var BAN_PAYOUT_MULTIPLIER = 10;
var classicAchievementMap = {
    nano: {
        A_TRUE_WARRIOR: 3 * NANO_PAYOUT_MULTIPLIER,
        INTO_THE_WILD: 2 * NANO_PAYOUT_MULTIPLIER,
        ANGRY_RATS: 5 * NANO_PAYOUT_MULTIPLIER,
        SMALL_TALK: 3 * NANO_PAYOUT_MULTIPLIER,
        FAT_LOOT: 5 * NANO_PAYOUT_MULTIPLIER,
        UNDERGROUND: 3 * NANO_PAYOUT_MULTIPLIER,
        AT_WORLDS_END: 5 * NANO_PAYOUT_MULTIPLIER,
        COWARD: 4 * NANO_PAYOUT_MULTIPLIER,
        TOMB_RAIDER: 5 * NANO_PAYOUT_MULTIPLIER,
        SKULL_COLLECTOR: 8 * NANO_PAYOUT_MULTIPLIER,
        NINJA_LOOT: 4 * NANO_PAYOUT_MULTIPLIER,
        NO_MANS_LAND: 3 * NANO_PAYOUT_MULTIPLIER,
        HUNTER: 4 * NANO_PAYOUT_MULTIPLIER,
        STILL_ALIVE: 5 * NANO_PAYOUT_MULTIPLIER,
        MEATSHIELD: 7 * NANO_PAYOUT_MULTIPLIER,
        NYAN: 3 * NANO_PAYOUT_MULTIPLIER,
        HOT_SPOT: 3 * NANO_PAYOUT_MULTIPLIER,
        SPECTRE_COLLECTOR: 8 * NANO_PAYOUT_MULTIPLIER,
        GEM_HUNTER: 8 * NANO_PAYOUT_MULTIPLIER,
        NANO_POTIONS: 8 * NANO_PAYOUT_MULTIPLIER,
        HERO: 25 * NANO_PAYOUT_MULTIPLIER,
        FOXY: 2 * NANO_PAYOUT_MULTIPLIER,
        FOR_SCIENCE: 4 * NANO_PAYOUT_MULTIPLIER,
        RICKROLLD: 6 * NANO_PAYOUT_MULTIPLIER,
    },
    ban: {
        A_TRUE_WARRIOR: 75 * BAN_PAYOUT_MULTIPLIER,
        INTO_THE_WILD: 50 * BAN_PAYOUT_MULTIPLIER,
        ANGRY_RATS: 125 * BAN_PAYOUT_MULTIPLIER,
        SMALL_TALK: 75 * BAN_PAYOUT_MULTIPLIER,
        FAT_LOOT: 125 * BAN_PAYOUT_MULTIPLIER,
        UNDERGROUND: 75 * BAN_PAYOUT_MULTIPLIER,
        AT_WORLDS_END: 125 * BAN_PAYOUT_MULTIPLIER,
        COWARD: 100 * BAN_PAYOUT_MULTIPLIER,
        TOMB_RAIDER: 125 * BAN_PAYOUT_MULTIPLIER,
        SKULL_COLLECTOR: 200 * BAN_PAYOUT_MULTIPLIER,
        NINJA_LOOT: 100 * BAN_PAYOUT_MULTIPLIER,
        NO_MANS_LAND: 75 * BAN_PAYOUT_MULTIPLIER,
        HUNTER: 100 * BAN_PAYOUT_MULTIPLIER,
        STILL_ALIVE: 125 * BAN_PAYOUT_MULTIPLIER,
        MEATSHIELD: 175 * BAN_PAYOUT_MULTIPLIER,
        NYAN: 75 * BAN_PAYOUT_MULTIPLIER,
        HOT_SPOT: 75 * BAN_PAYOUT_MULTIPLIER,
        SPECTRE_COLLECTOR: 200 * BAN_PAYOUT_MULTIPLIER,
        GEM_HUNTER: 200 * BAN_PAYOUT_MULTIPLIER,
        NANO_POTIONS: 200 * BAN_PAYOUT_MULTIPLIER,
        HERO: 625 * BAN_PAYOUT_MULTIPLIER,
        FOXY: 50 * BAN_PAYOUT_MULTIPLIER,
        FOR_SCIENCE: 100 * BAN_PAYOUT_MULTIPLIER,
        RICKROLLD: 150 * BAN_PAYOUT_MULTIPLIER,
    },
};
var networkDividerMap = {
    nano: 100000,
    ban: 10000,
};
var calculateMaxPayout = function (payouts, network) {
    var amount = 0;
    payouts.map(function (payout) {
        amount += payout;
    });
    return new BigNumber(amount).dividedBy(networkDividerMap[network]).toFixed();
};
export var getClassicMaxPayout = function (network) {
    if (network && classicAchievementMap[network]) {
        return calculateMaxPayout(Object.values(classicAchievementMap[network]), network);
    }
};
export var getClassicPayout = function (achievements, network) {
    if (network && achievements.length && classicAchievementMap[network]) {
        return getPayout(achievements, Object.values(classicAchievementMap[network]), network);
    }
};
var getPayout = function (achievements, payouts, network) {
    var amount = 0;
    achievements === null || achievements === void 0 ? void 0 : achievements.map(function (completed, index) {
        if (completed && payouts[index]) {
            amount += payouts[index];
        }
    });
    return raiToRaw(new BigNumber(amount).dividedBy(networkDividerMap[network]).toFixed(), network);
};
export var getRandomDefenseSkill = function () { return _.shuffle([0, 1, 2]).slice(0, 1); };
export var getRandomAttackSkill = function () { return _.shuffle([0, 1, 2, 3, 4]).slice(0, 1); };
export var isValidAddWeaponSkill = function (items) {
    if (items.length !== 1) {
        return false;
    }
    var _a = items[0].split(":"), item = _a[0], level = _a[1], bonus = _a[2], socket = _a[3], skill = _a[4];
    if (!Types.isWeapon(item) || Types.getKindFromString(item) < Types.Entities.GOLDENSWORD || skill) {
        return false;
    }
    if (!bonus) {
        bonus = JSON.stringify([]);
    }
    if (!socket) {
        socket = JSON.stringify([]);
    }
    skill = getRandomAttackSkill();
    return [item, level, bonus, socket, skill].join(":");
};
export var isValidUpgradeItems = function (items) {
    if (items.length !== 2) {
        return false;
    }
    var _a = items[0].split(":"), item = _a[0], level = _a[1];
    var isJewel = Types.isJewel(item);
    if (isJewel) {
        return false;
    }
    var isWeapon = Types.isWeapon(item);
    var isHelm = Types.isHelm(item);
    var isArmor = Types.isArmor(item);
    var isBelt = Types.isBelt(item);
    var isCape = Types.isCape(item);
    var isPet = Types.isPetItem(item) && item !== "petegg";
    var isShield = Types.isShield(item);
    var isRing = Types.isRing(item);
    var isAmulet = Types.isAmulet(item);
    if ((!isWeapon && !isHelm && !isArmor && !isBelt && !isCape && !isPet && !isShield && !isRing && !isAmulet) ||
        parseInt(level) === 10) {
        return false;
    }
    var scrollOrStone = items[1].split(":")[0];
    if (Types.isStone(scrollOrStone) && ["stonedragon", "stonehero"].includes(scrollOrStone)) {
        if ((scrollOrStone === "stonedragon" && parseInt(level) >= Types.StoneUpgrade.stonedragon) ||
            (scrollOrStone === "stonehero" && parseInt(level) >= Types.StoneUpgrade.stonehero)) {
            return false;
        }
        return true;
    }
    var isScroll = Types.isScroll(scrollOrStone) && scrollOrStone.startsWith("scrollupgrade");
    if (!isScroll) {
        return false;
    }
    var itemClass = Types.getItemClass(item, parseInt(level));
    var scrollClass = Types.getItemClass(scrollOrStone);
    var itemClassRank = Types.itemClassRank[itemClass];
    var scrollClassRank = Types.itemClassRank[scrollClass];
    if (scrollClassRank < itemClassRank) {
        return false;
    }
    return true;
};
export var isValidUpgradeElementItems = function (items) {
    if (items.length !== 2) {
        return false;
    }
    var _a = items[0].split(":"), item = _a[0], level = _a[1], bonus = _a[2], socket = _a[3], skill = _a[4];
    var isWeapon = Types.isWeapon(item);
    if (!isWeapon || !skill) {
        return false;
    }
    var scroll = items[1].split(":")[0];
    var isElementScroll = Types.isScroll(scroll) && scroll.startsWith("scrollupgradeelement");
    if (!isElementScroll) {
        return false;
    }
    var skillIndex = scrollToSkillMap.indexOf(scroll);
    var itemClass = Types.getItemClass(item, parseInt(level));
    var itemClassRank = Types.itemClassRank[itemClass];
    if (itemClassRank < Types.itemClassRank.high) {
        return false;
    }
    var randomNum = randomInt(1, 100);
    if (randomNum === 99) {
        return { item: 0 };
    }
    return { item: [item, level, bonus, socket, skillIndex].join(":") };
};
export var isValidUpgradeskillrandom = function (items) {
    if (items.length !== 2) {
        return false;
    }
    var _a = items[0].split(":"), item = _a[0], level = _a[1], bonus = _a[2], socket = _a[3], skill = _a[4];
    var scroll = items[1].split(":")[0];
    var isSkillRandomScroll = Types.isScroll(scroll) && scroll === "scrollupgradeskillrandom";
    if (!isSkillRandomScroll) {
        return false;
    }
    var isWeapon = Types.isWeapon(item);
    var isShield = Types.isShield(item);
    if ((!isWeapon && !isShield) || !skill) {
        return false;
    }
    var randomSkill = randomInt(0, (isWeapon ? attackSkillType.length : defenseSkillType.length) - 1);
    var itemClass = Types.getItemClass(item, parseInt(level));
    var itemClassRank = Types.itemClassRank[itemClass];
    if (itemClassRank < Types.itemClassRank.high) {
        return false;
    }
    var randomNum = randomInt(1, 100);
    if (randomNum === 99) {
        return { item: 0 };
    }
    return { item: [item, level, bonus, socket, randomSkill].join(":") };
};
export var isUpgradeSuccess = function (_a) {
    var level = _a.level, isLuckySlot = _a.isLuckySlot, isBlessed = _a.isBlessed, isGuaranteedSuccess = _a.isGuaranteedSuccess;
    var successRates = Types.getUpgradeSuccessRates();
    var successRate = !isGuaranteedSuccess ? successRates[parseInt(level) - 1] : 100;
    var random = randomInt(1, 100);
    console.info("Base Success rate ".concat(successRate));
    if (isLuckySlot) {
        var luckyRates = Types.getLuckySlotSuccessRateBonus();
        var bonusRate = luckyRates[parseInt(level) - 1];
        successRate += bonusRate;
        console.info("Lucky slot bonus rate ".concat(bonusRate, " granted, new success rate ").concat(successRate));
    }
    if (isBlessed) {
        var blessedRates = Types.getBlessedSuccessRateBonus();
        var blessedRate = blessedRates[parseInt(level) - 1];
        successRate += blessedRate;
        console.info("Blessed rate ".concat(blessedRate, " granted, new success rate ").concat(successRate));
    }
    if (successRate > 100) {
        successRate = 100;
    }
    console.info("Random ".concat(random, ", Success rate: ").concat(successRate, " -> ").concat(random <= successRate ? "SUCCESS" : "FAILURE"));
    return { isSuccess: random <= successRate, random: random, successRate: successRate };
};
export var isValidTransmuteItems = function (items) {
    var _a;
    if (items.length !== 2) {
        return false;
    }
    var _b = items[0].split(":"), item = _b[0], bonus = _b[2], socket = _b[3];
    if (!item) {
        return false;
    }
    socket = toArray(socket);
    bonus = toArray(bonus);
    if ((socket === null || socket === void 0 ? void 0 : socket.length) && ((_a = socket.filter(function (s) { return s !== 0; })) === null || _a === void 0 ? void 0 : _a.length)) {
        return false;
    }
    if (Array.isArray(bonus) && bonus.includes(43)) {
        return false;
    }
    var scroll = items[1].split(":")[0];
    var isScroll = ["scrolltransmute", "scrolltransmuteblessed"].includes(scroll);
    if (!isScroll) {
        return false;
    }
    var isBlessed = scroll === "scrolltransmuteblessed";
    var transmuteRate = Types.getTransmuteSuccessRate(item, bonus, isBlessed);
    if (!transmuteRate) {
        return false;
    }
    return transmuteRate;
};
export var isValidTransmutePet = function (items) {
    if (items.length !== 2 || !items[0].startsWith("pet") || !items[1].startsWith("scrolltransmutepet")) {
        return false;
    }
    var _a = items[0].split(":"), item = _a[0], level = _a[1], bonus = _a[2], socket = _a[3];
    var randomNum = randomInt(1, 100);
    if (randomNum === 99) {
        return false;
    }
    return __assign({ item: item, level: level, bonus: bonus }, (socket ? { socket: socket } : null));
};
export var getIsTransmuteSuccess = function (_a) {
    var _b = _a.transmuteSuccessRate, transmuteSuccessRate = _b === void 0 ? 0 : _b, _c = _a.uniqueSuccessRate, uniqueSuccessRate = _c === void 0 ? 0 : _c, isLuckySlot = _a.isLuckySlot;
    var randomNum = randomInt(1, 100);
    if (isLuckySlot) {
        transmuteSuccessRate = Math.ceil(transmuteSuccessRate * 1.25);
        uniqueSuccessRate = Math.ceil(uniqueSuccessRate * 1.25);
    }
    var isTransmuteSuccess = randomNum <= transmuteSuccessRate;
    var isUniqueSuccess = randomNum <= uniqueSuccessRate;
    console.info("Random ".concat(randomNum, ", Transmute success rate: ").concat(transmuteSuccessRate, " -> ").concat(randomNum <= transmuteSuccessRate ? "SUCCESS" : "FAILURE"));
    console.info("Random ".concat(randomNum, ", Unique Transmute success rate: ").concat(uniqueSuccessRate, " -> ").concat(randomNum <= uniqueSuccessRate ? "SUCCESS" : "FAILURE"));
    return __assign(__assign({ random: randomNum, transmuteSuccessRate: transmuteSuccessRate, uniqueSuccessRate: uniqueSuccessRate }, (transmuteSuccessRate ? { isTransmuteSuccess: isTransmuteSuccess } : null)), (uniqueSuccessRate ? { isUniqueSuccess: isUniqueSuccess } : null));
};
export var generateBlueChestItem = function () {
    var items = [
        { item: "helmhorned", uniqueChances: 40 },
        { item: "hornedarmor", uniqueChances: 40 },
        { item: "belthorned", uniqueChances: 40 },
        { item: "shieldhorned", uniqueChances: 30 },
        { item: "frozenarmor", uniqueChances: 40 },
        { item: "helmfrozen", uniqueChances: 40 },
        { item: "beltfrozen", uniqueChances: 40 },
        { item: "shieldfrozen", uniqueChances: 25 },
        { item: "frozensword", uniqueChances: 40 },
        { item: "diamondsword", uniqueChances: 20 },
        { item: "helmdiamond", uniqueChances: 20 },
        { item: "diamondarmor", uniqueChances: 20 },
        { item: "beltdiamond", uniqueChances: 20 },
        { item: "shielddiamond", uniqueChances: 15 },
        { item: "beltminotaur", uniqueChances: 10 },
        { item: "minotauraxe", uniqueChances: 10 },
        { item: "cape", uniqueChances: 5 },
    ];
    var scrolls = [
        { item: "scrollupgradehigh" },
        { item: "scrollupgradeblessed" },
        { item: "scrolltransmute" },
        { item: "stonesocket" },
        { item: "jewelskull", jewelLevel: randomInt(3, 4) },
    ];
    var ringOrAmulets = [
        { item: "ringraistone" },
        { item: "ringfountain" },
        { item: "ringminotaur" },
        { item: "amuletfrozen" },
    ];
    var randomCategory = random(100);
    var category = items;
    if (randomCategory < 10) {
        category = ringOrAmulets;
    }
    else if (randomCategory < 50) {
        category = scrolls;
    }
    var randomItem = random(category.length);
    return category[randomItem];
};
export var generateGreenChestItem = function () {
    var items = [
        { item: "beltminotaur", uniqueChances: 10 },
        { item: "minotauraxe", uniqueChances: 10 },
        { item: "emeraldsword", uniqueChances: 10 },
        { item: "helmemerald", uniqueChances: 10 },
        { item: "emeraldarmor", uniqueChances: 10 },
        { item: "beltemerald", uniqueChances: 10 },
        { item: "shieldemerald", uniqueChances: 10 },
        { item: "templarsword", uniqueChances: 10 },
        { item: "helmtemplar", uniqueChances: 10 },
        { item: "templararmor", uniqueChances: 10 },
        { item: "belttemplar", uniqueChances: 10 },
        { item: "shieldtemplar", uniqueChances: 10 },
        { item: "cape", uniqueChances: 5 },
    ];
    var scrolls = [
        { item: "scrollupgradelegendary" },
        { item: "scrollupgradeblessed" },
        { item: "scrolltransmute" },
        { item: "stonesocket" },
        { item: "jewelskull", jewelLevel: randomInt(3, 4) },
    ];
    var ringOrAmulets = [
        { item: "amuletplatinum" },
        { item: "ringplatinum" },
        { item: "ringminotaur" },
        { item: "amuletfrozen" },
        { item: "ringconqueror" },
    ];
    var randomCategory = random(100);
    var category = items;
    if (randomCategory < 10) {
        category = ringOrAmulets;
    }
    else if (randomCategory < 50) {
        category = scrolls;
    }
    var randomItem = random(category.length);
    return category[randomItem];
};
export var generateRedChestItem = function () {
    var items = [
        { item: "helmdemon", uniqueChances: 10 },
        { item: "beltdemon", uniqueChances: 10 },
        { item: "shielddemon", uniqueChances: 10 },
        { item: "demonaxe", uniqueChances: 10 },
        { item: "demonsickle", uniqueChances: 6 },
        { item: "demonarmor", uniqueChances: 10 },
        { item: "cape", uniqueChances: 5 },
    ];
    var scrolls = [
        { item: "scrolltransmute" },
        { item: "scrollupgradelegendary" },
        { item: "scrollupgradesacred" },
        { item: "stonesocket" },
        { item: "jewelskull", jewelLevel: randomInt(4, 5) },
    ];
    var ringOrAmulets = [
        { item: "ringraistone" },
        { item: "ringfountain" },
        { item: "ringbalrog" },
        { item: "ringbalrog" },
        { item: "ringheaven" },
        { item: "ringwizard" },
        { item: "ringconqueror" },
        { item: "amuletdemon" },
    ];
    var randomCategory = random(100);
    var category = items;
    if (randomCategory < 10) {
        var rune = getRandomRune(70, 12);
        return { item: "rune-".concat(rune), quantity: 1 };
    }
    else if (randomCategory < 20) {
        category = ringOrAmulets;
    }
    else if (randomCategory < 40) {
        category = scrolls;
    }
    var randomItem = random(category.length);
    return category[randomItem];
};
export var generatePurpleChestItem = function () {
    var items = [
        { item: "mysticalsword", uniqueChances: 8 },
        { item: "mysticaldagger", uniqueChances: 8 },
        { item: "helmmystical", uniqueChances: 8 },
        { item: "mysticalarmor", uniqueChances: 8 },
        { item: "beltmystical", uniqueChances: 8 },
        { item: "shieldmystical", uniqueChances: 8 },
        { item: "cape", uniqueChances: 4 },
    ];
    var scrolls = [
        { item: "scrollupgradelegendary" },
        { item: "scrollupgradesacred" },
        { item: "scrolltransmuteblessed" },
        { item: "scrolltransmutepet" },
        { item: "stonesocket" },
        { item: "stonesocketblessed" },
        { item: "stonedragon" },
        { item: "jewelskull", jewelLevel: 5 },
    ];
    var ringOrAmulets = [
        { item: "ringraistone" },
        { item: "ringfountain" },
        { item: "ringconqueror" },
        { item: "ringheaven" },
        { item: "ringwizard" },
        { item: "ringbalrog" },
        { item: "ringmystical" },
        { item: "ringgreed" },
        { item: "amuletmoon" },
        { item: "amuleteye" },
        { item: "amuletgreed" },
        { item: "helmclown" },
        { item: "beltgoldwrap" },
    ];
    var randomCategory = random(100);
    if (randomCategory < 30) {
        var rune = getRandomRune(70, 13);
        return { item: "rune-".concat(rune), quantity: 1 };
    }
    else if (randomCategory < 50) {
        return _.shuffle(ringOrAmulets)[0];
    }
    else if (randomCategory < 70) {
        return _.shuffle(scrolls)[0];
    }
    return _.shuffle(items)[0];
};
export var generateChristmasPresentItem = function () {
    var items = [
        { item: "christmassword", uniqueChances: 6 },
        { item: "christmashachet", uniqueChances: 6 },
        { item: "christmasmaul", uniqueChances: 6 },
        { item: "helmchristmas", uniqueChances: 6 },
        { item: "christmasarmor", uniqueChances: 6 },
        { item: "beltchristmas", uniqueChances: 6 },
        { item: "amuletchristmas", uniqueChances: 6 },
        { item: "shieldchristmas", uniqueChances: 6 },
    ];
    return _.shuffle(items)[0];
};
export var generateDeadChestItem = function () {
    var rune = getRandomRune(70, 10);
    return { item: "rune-".concat(rune), quantity: 1 };
};
export var generateRandomPet = function () {
    var pets = {
        petbat: 2,
        petcat: 5,
        petdog: 5,
        petaxolotl: 1,
        petmouse: 4,
        pethedgehog: 4,
        petfox: 2,
        petturtle: 1,
        petduck: 1,
        petdeer: 1,
        pethellhound: 1,
        petdragon: 3,
    };
    var randomPet = _.shuffle(Object.keys(pets))[0];
    var randomSkin = randomInt(1, pets[randomPet]);
    return {
        pet: randomPet,
        skin: randomSkin,
    };
};
export var getRandomPetCollarSkin = function () {
    var randomSkin = randomInt(1, 1);
    return randomSkin;
};
export var getRandomSockets = function (_a) {
    var kind = _a.kind, baseLevel = _a.baseLevel, _b = _a.isLuckySlot, isLuckySlot = _b === void 0 ? false : _b, _c = _a.isBlessed, isBlessed = _c === void 0 ? false : _c;
    var maxSockets = baseLevel < 10 ? 4 : 6;
    if (Types.isBelt(kind)) {
        maxSockets = 0;
    }
    else if (Types.isHelm(kind)) {
        maxSockets = 3;
    }
    var randomSocket = random(100);
    var socketCount = 0;
    if (maxSockets === 6) {
        if (randomSocket < 1) {
            socketCount = 6;
        }
        else if (randomSocket < 4) {
            socketCount = 5;
        }
        else if (randomSocket < 10) {
            socketCount = 4;
        }
        else if (randomSocket < 25) {
            socketCount = 3;
        }
        else if (randomSocket < 45) {
            socketCount = 2;
        }
        else if (randomSocket < 65) {
            socketCount = 1;
        }
        if (isLuckySlot && socketCount !== 6) {
            socketCount += 1;
        }
        if (isBlessed && socketCount !== 6) {
            socketCount += 1;
        }
    }
    else if (maxSockets === 4) {
        if (randomSocket < 3) {
            socketCount = 4;
        }
        else if (randomSocket < 10) {
            socketCount = 3;
        }
        else if (randomSocket < 25) {
            socketCount = 2;
        }
        else if (randomSocket < 45) {
            socketCount = 1;
        }
        if (isLuckySlot && socketCount !== 4) {
            socketCount += 1;
        }
        if (isBlessed && socketCount !== 4) {
            socketCount += 1;
        }
    }
    else if (maxSockets === 3) {
        if (randomSocket < 3) {
            socketCount = 3;
        }
        else if (randomSocket < 10) {
            socketCount = 2;
        }
        else if (randomSocket < 25) {
            socketCount = 1;
        }
        if (isLuckySlot && socketCount !== 3) {
            socketCount += 1;
        }
        if (isBlessed && socketCount !== 3) {
            socketCount += 1;
        }
    }
    return new Array(socketCount).fill(0);
};
export var isValidDowngradeRune = function (items) {
    if (items.length !== 2) {
        return false;
    }
    var runeIndex = items.findIndex(function (item) { return item.startsWith("rune-"); });
    var scrollIndex = items.findIndex(function (item) { return item.startsWith("scrollupgrade"); });
    if (runeIndex === -1 || scrollIndex === -1)
        return;
    var rune = items[runeIndex].split(":")[0];
    var scroll = items[scrollIndex].split(":")[0];
    var runeClass = Types.getItemClass(rune);
    var scrollClass = Types.getItemClass(scroll);
    if (Types.itemClassRank[scrollClass] < Types.itemClassRank[runeClass])
        return false;
    var runeRank = Types.getRuneFromItem(rune).rank;
    if (runeRank === 1)
        return;
    return runeRank - 1;
};
export var isValidUpgradeRunes = function (items) {
    if (items.length < 3 || items.length > 4) {
        return false;
    }
    var rune = "";
    var runeRank = 0;
    var runeQuantity = 0;
    var runeClass = null;
    var scrollClass = null;
    forEach(items, function (item) {
        var scrollOrRune = item.split(":")[0];
        if (!scrollOrRune.startsWith("scrollupgrade") && !Types.isRune(scrollOrRune))
            return false;
        if (scrollOrRune.startsWith("scrollupgrade")) {
            if (scrollClass)
                return false;
            scrollClass = Types.getItemClass(scrollOrRune);
        }
        else {
            if (!rune) {
                rune = scrollOrRune;
                runeRank = Types.getRuneFromItem(scrollOrRune).rank;
                runeClass = Types.getItemClass(scrollOrRune);
            }
            else if (scrollOrRune !== rune) {
                return false;
            }
            runeQuantity += 1;
        }
    });
    if (!runeClass || !scrollClass || !runeRank)
        return false;
    if (Types.itemClassRank[scrollClass] < Types.itemClassRank[runeClass])
        return false;
    if (runeRank > 30)
        return false;
    if (runeRank < 18 && runeQuantity !== 3)
        return false;
    if (runeRank >= 18 && runeQuantity !== 2)
        return false;
    return runeRank;
};
export var isValidSocketPetCollar = function (items) {
    return false;
    if (items.length !== 2) {
        return false;
    }
};
export var isValidSocketItem = function (items) {
    var runeIndex = items.findIndex(function (item) { return item.startsWith("rune-"); });
    var jewelIndex = items.findIndex(function (item) { return item.startsWith("jewel"); });
    var itemIndex = items.findIndex(function (item) { return !item.startsWith("rune-"); });
    if ((runeIndex === -1 && jewelIndex === -1) || itemIndex === -1)
        return false;
    var _a = items[itemIndex].split(":"), item = _a[0], level = _a[1], bonus = _a[2], rawSocket = _a[3], skill = _a[4];
    var socket;
    try {
        socket = JSON.parse(rawSocket);
    }
    catch (err) {
        return false;
    }
    if ((runeIndex === -1 && jewelIndex === -1) ||
        itemIndex === -1 ||
        !Types.isSocketItem(item) ||
        !(socket === null || socket === void 0 ? void 0 : socket.length) ||
        !socket.filter(function (slot) { return slot === 0; }).length) {
        return false;
    }
    var socketIndex = socket.findIndex(function (s) { return s === 0; });
    if (runeIndex >= 0) {
        var rank = Types.getRuneFromItem(items[runeIndex]).rank;
        if (!rank) {
            return false;
        }
        socket[socketIndex] = rank;
    }
    else if (jewelIndex >= 0) {
        socket[socketIndex] = items[jewelIndex];
    }
    var newItem = [item, level, bonus, JSON.stringify(socket), skill].filter(Boolean).join(":");
    return newItem;
};
export var isValidStoneSocket = function (items, isLuckySlot) {
    var filteredItems = items.filter(function (item) { return item !== 0; });
    var stoneIndex = filteredItems.findIndex(function (item) { return item.startsWith("stonesocket"); });
    if (stoneIndex === -1) {
        return false;
    }
    var isBlessed = stoneIndex >= 0 ? filteredItems[stoneIndex].startsWith("stonesocketblessed") : null;
    var _a = items[0].split(":"), item = _a[0], level = _a[1], bonus = _a[2], rawSocket = _a[3], skill = _a[4];
    var socket;
    var extractedItem;
    var socketCount;
    var isNewSocketItem = false;
    try {
        socket = JSON.parse(rawSocket);
    }
    catch (err) {
    }
    var kind = Types.getKindFromString(item);
    if (!kind || !Types.isEquipableItem(kind) || items.length !== 2 || stoneIndex === -1 || !Types.isSocketItem(item)) {
        return false;
    }
    var maxRerollSocket = Types.isUnique(item, bonus) ? 4 : 3;
    if (isBlessed) {
        maxRerollSocket += 2;
    }
    if ((socket === null || socket === void 0 ? void 0 : socket.length) && socket.filter(function (slot) { return slot !== 0; }).length) {
        var lastSocketIndex = socket.findIndex(function (i) { return i === 0; });
        if (lastSocketIndex === -1) {
            lastSocketIndex = socket.length;
        }
        if (!isBlessed) {
            extractedItem = random(2) === 1 ? socket[lastSocketIndex - 1] : null;
        }
        else {
            extractedItem = random(100) === 1 ? null : socket[lastSocketIndex - 1];
        }
        socket[lastSocketIndex - 1] = 0;
    }
    else if (!(socket === null || socket === void 0 ? void 0 : socket.length) || (socket === null || socket === void 0 ? void 0 : socket.length) < maxRerollSocket) {
        var baseLevel = Types.getBaseLevel(kind);
        socket = getRandomSockets({ kind: kind, baseLevel: baseLevel, isLuckySlot: isLuckySlot, isBlessed: isBlessed });
        socketCount = socket.length;
        isNewSocketItem = true;
    }
    else {
        return false;
    }
    var socketItem = [item, level, bonus || "[]", JSON.stringify(socket), skill].filter(Boolean).join(":");
    if (extractedItem) {
        if (typeof extractedItem === "number") {
            var runeName = Types.RuneList[extractedItem - 1];
            extractedItem = { item: "rune-".concat(runeName), quantity: 1 };
        }
        else {
            var _b = extractedItem.split("|"), itemJewel = _b[0], levelJewel = _b[1], bonusJewel = _b[2];
            extractedItem = {
                item: itemJewel,
                level: levelJewel,
                bonus: bonusJewel,
            };
        }
    }
    return { socketItem: socketItem, extractedItem: extractedItem, socketCount: socketCount, isNewSocketItem: isNewSocketItem };
};
export var getRandomJewelLevel = function (mobLevel) {
    var maxLevel = 1;
    if (mobLevel >= 60) {
        maxLevel = 5;
    }
    else if (mobLevel >= 45) {
        maxLevel = 4;
    }
    else if (mobLevel >= 30) {
        maxLevel = 3;
    }
    else if (mobLevel >= 13) {
        maxLevel = 2;
    }
    var randomNumber = random(100);
    var level = 1;
    if (maxLevel === 5) {
        if (randomNumber < 5) {
            level = 5;
        }
        else if (randomNumber < 38) {
            level = 4;
        }
        else {
            level = 3;
        }
    }
    else if (maxLevel === 4) {
        if (randomNumber < 10) {
            level = 4;
        }
        else if (randomNumber < 50) {
            level = 3;
        }
        else {
            level = 2;
        }
    }
    else if (maxLevel === 3) {
        if (randomNumber < 30) {
            level = 3;
        }
        else if (randomNumber < 80) {
            level = 2;
        }
        else {
            level = 1;
        }
    }
    else if (maxLevel === 2) {
        if (randomNumber < 40) {
            level = 2;
        }
        else {
            level = 1;
        }
    }
    return level;
};
export var getRandomRune = function (mobLevel, minLevel) {
    var runeOdds = {
        sat: 4,
        al: 8,
        bul: 8,
        nan: 12,
        mir: 12,
        gel: 20,
        do: 30,
        ban: 30,
        vie: 30,
        um: 50,
        hex: 100,
        zal: 200,
        sol: 300,
        eth: 400,
        btc: 500,
        vax: 1000,
        por: 2000,
        las: 3000,
        dur: 4000,
        fal: 5000,
        kul: 6000,
        mer: 8000,
        qua: 10000,
        gul: 14000,
        ber: 18000,
        cham: 20000,
        tor: 24000,
        xno: 30000,
        jah: 40000,
        shi: 50000,
        vod: 65000,
    };
    var runeList = Object.keys(runeOdds);
    if (mobLevel % 2) {
        mobLevel += 1;
    }
    if (mobLevel > runeList.length * 2) {
        mobLevel = runeList.length * 2;
    }
    var maxRuneIndex = mobLevel / 2 - 1;
    var minRuneIndex = minLevel || randomInt(0, Math.floor(maxRuneIndex / 2) - 4);
    if (minRuneIndex < 0) {
        minRuneIndex = 0;
    }
    var rune = "";
    var runeIndex = maxRuneIndex;
    while (!rune) {
        var possibleRune = runeList[runeIndex];
        var odds = runeOdds[possibleRune];
        var needsToHit = 1;
        if (odds > 133) {
            needsToHit = 133;
        }
        var randomRoll = random(odds);
        if (randomRoll === needsToHit) {
            rune = possibleRune;
        }
        else {
            runeIndex -= 1;
            if (runeIndex < minRuneIndex) {
                runeIndex = maxRuneIndex;
            }
        }
    }
    return rune;
};
export var generateSoulStoneItem = function () {
    var items = [
        { item: "demonaxe", uniqueChances: 10 },
        { item: "helmdemon", uniqueChances: 10 },
        { item: "demonarmor", uniqueChances: 10 },
        { item: "beltdemon", uniqueChances: 10 },
        { item: "shielddemon", uniqueChances: 10 },
        { item: "paladinaxe", uniqueChances: 6 },
        { item: "immortaldagger", uniqueChances: 6 },
        { item: "immortalsword", uniqueChances: 6 },
        { item: "spikeglaive", uniqueChances: 6 },
        { item: "eclypsedagger", uniqueChances: 6 },
    ];
    var scrolls = [
        { item: "scrollupgradelegendary" },
        { item: "scrollupgradesacred" },
        { item: "scrolltransmuteblessed" },
        { item: "stonedragon" },
    ];
    var ringOrAmulets = [
        { item: "amuletmoon" },
        { item: "amuletdemon" },
        { item: "ringbalrog" },
        { item: "ringconqueror" },
        { item: "ringheaven" },
        { item: "ringwizard" },
        { item: "ringgreed" },
        { item: "amuletstar" },
        { item: "amuletskull" },
        { item: "amuletdragon" },
        { item: "amuletgreed" },
    ];
    var randomCategory = random(100);
    if (randomCategory < 20) {
        var rune = getRandomRune(70, 13);
        return { item: "rune-".concat(rune), quantity: 1 };
    }
    else if (randomCategory < 25) {
        return _.shuffle(scrolls)[0];
    }
    else if (randomCategory < 35) {
        return _.shuffle(ringOrAmulets)[0];
    }
    else {
        return _.shuffle(items)[0];
    }
};
export var generateDroppedItem = function () {
    return undefined;
};
