import merge from "lodash/merge";
import { ACHIEVEMENT_COUNT } from "../../shared/js/types/achievements";
import { COW_COUNT, DMG_TOTAL, GHOST_COUNT, GOLEM_COUNT, KILLS_TOTAL, MAGE_COUNT, MINI_BOSS_COUNT, OCULOTHORAX_COUNT, RAT_COUNT, RAT3_COUNT, SKELETON_COUNT, SKELETON3_COUNT, SKELETON4_COUNT, SKELETONARCHER_COUNT, SKELETONBERSERKER_COUNT, SPECTRE_COUNT, WEREWOLF_COUNT, WRAITH_COUNT, WRAITH2_COUNT, YETI_COUNT, } from "./achievements";
var defaultData = {
    hasAlreadyPlayed: false,
    player: {
        name: "",
        weapon: "",
        armor: "",
        image: "",
        password: "",
        expansion1: false,
        expansion2: false,
    },
    settings: {
        music: true,
        musicVolume: 0.7,
        sound: true,
        soundVolume: 0.7,
        showEntityName: true,
        showDamageInfo: true,
        showAnvilOdds: false,
        showHealthAboveBars: false,
        capeHue: 0,
        capeSaturate: 0,
        capeContrast: 0,
        capeBrightness: 1,
        debug: false,
        effects: true,
    },
    achievements: {
        ratCount: 0,
        rat3Count: 0,
        skeletonCount: 0,
        spectreCount: 0,
        yetiCount: 0,
        werewolfCount: 0,
        skeleton3Count: 0,
        wraithCount: 0,
        cowCount: 0,
        mageCount: 0,
        golemCount: 0,
        oculothoraxCount: 0,
        skeleton4Count: 0,
        ghostCount: 0,
        skeletonBerserkerCount: 0,
        skeletonArcherCount: 0,
        wraith2Count: 0,
        miniBossCount: 0,
        totalKills: 0,
        totalDmg: 0,
        totalRevives: 0,
        magicStones: [0, 0, 0, 0, 0, 0],
    },
    achievement: new Array(ACHIEVEMENT_COUNT).fill(0),
};
var Storage = (function () {
    function Storage() {
        if (this.hasLocalStorage() && window.localStorage.data) {
            this.data = merge(defaultData, JSON.parse(window.localStorage.data));
        }
        else {
            this.data = defaultData;
        }
        this.save();
    }
    Storage.prototype.hasLocalStorage = function () {
        return !!window.localStorage;
    };
    Storage.prototype.save = function () {
        if (this.hasLocalStorage()) {
            localStorage.data = JSON.stringify(this.data);
        }
    };
    Storage.prototype.clear = function () {
        if (this.hasLocalStorage()) {
            this.data = defaultData;
            this.save();
        }
    };
    Storage.prototype.hasAlreadyPlayed = function () {
        return this.data.hasAlreadyPlayed;
    };
    Storage.prototype.initPlayer = function (name, account, expansion1, expansion2) {
        this.data.hasAlreadyPlayed = true;
        this.setPlayerName(name);
        this.setPlayerAccount(account);
        this.setPlayerExpanson1(expansion1);
        this.setPlayerExpanson2(expansion2);
    };
    Storage.prototype.setPlayerName = function (name) {
        this.data.player.name = name;
        this.save();
    };
    Storage.prototype.setPlayerExpanson1 = function (expansion1) {
        this.data.player.expansion1 = expansion1;
        this.save();
    };
    Storage.prototype.setPlayerExpanson2 = function (expansion2) {
        this.data.player.expansion2 = expansion2;
        this.save();
    };
    Storage.prototype.getPlayerExpanson1 = function () {
        return this.data.player.expansion1;
    };
    Storage.prototype.getPlayerExpanson2 = function () {
        return this.data.player.expansion2;
    };
    Storage.prototype.setPlayerAccount = function (account) {
        this.data.player.account = account;
        this.save();
    };
    Storage.prototype.setPlayerPassword = function (password) {
        this.data.player.password = password;
        this.save();
    };
    Storage.prototype.setPlayerImage = function (img) {
        this.data.player.image = img;
        this.save();
    };
    Storage.prototype.setPlayerArmor = function (armor) {
        this.data.player.armor = armor;
        this.save();
    };
    Storage.prototype.setPlayerWeapon = function (weapon) {
        this.data.player.weapon = weapon;
        this.save();
    };
    Storage.prototype.setAchievement = function (rawAchievement) {
        var achievement = rawAchievement;
        if (typeof achievement === "string") {
            achievement = JSON.parse(rawAchievement);
        }
        this.data.achievement = achievement;
        this.save();
    };
    Storage.prototype.setMusicEnabled = function (enabled) {
        this.data.settings.music = enabled;
        this.save();
    };
    Storage.prototype.setMusicVolume = function (volume) {
        this.data.settings.musicVolume = volume;
        this.save();
    };
    Storage.prototype.setSoundEnabled = function (enabled) {
        this.data.settings.sound = enabled;
        this.save();
    };
    Storage.prototype.setSoundVolume = function (volume) {
        this.data.settings.soundVolume = volume;
        this.save();
    };
    Storage.prototype.setShowEntityNameEnabled = function (enabled) {
        this.data.settings.showEntityName = enabled;
        this.save();
    };
    Storage.prototype.setShowDamageInfoEnabled = function (enabled) {
        this.data.settings.showDamageInfo = enabled;
        this.save();
    };
    Storage.prototype.setDebug = function (enabled) {
        this.data.settings.debug = enabled;
        this.save();
    };
    Storage.prototype.isMusicEnabled = function () {
        if (typeof this.data.settings.music !== "boolean" || this.data.settings.music) {
            return true;
        }
        return false;
    };
    Storage.prototype.isSoundEnabled = function () {
        if (typeof this.data.settings.sound !== "boolean" || this.data.settings.sound) {
            return true;
        }
        return false;
    };
    Storage.prototype.showEntityNameEnabled = function () {
        if (typeof this.data.settings.showEntityName !== "boolean" || this.data.settings.showEntityName) {
            return true;
        }
        return false;
    };
    Storage.prototype.showDamageInfoEnabled = function () {
        if (typeof this.data.settings.showDamageInfo !== "boolean" || this.data.settings.showDamageInfo) {
            return true;
        }
        return false;
    };
    Storage.prototype.showAnvilOddsEnabled = function () {
        if (typeof this.data.settings.showAnvilOdds !== "boolean")
            return false;
        return this.data.settings.showAnvilOdds;
    };
    Storage.prototype.debugEnabled = function () {
        if (typeof this.data.settings.debug !== "boolean")
            return false;
        return this.data.settings.debug;
    };
    Storage.prototype.showHealthAboveBarsEnabled = function () {
        if (typeof this.data.settings.showHealthAboveBars !== "boolean")
            return false;
        return this.data.settings.showHealthAboveBars;
    };
    Storage.prototype.savePlayer = function (img) {
        this.setPlayerImage(img);
    };
    Storage.prototype.hasUnlockedAchievement = function (id) {
        return this.data.achievement[id - 1];
    };
    Storage.prototype.unlockAchievement = function (id) {
        if (!this.hasUnlockedAchievement(id)) {
            this.data.achievement[id - 1] = 1;
            this.save();
            return true;
        }
        return false;
    };
    Storage.prototype.getAchievements = function () {
        return this.data.achievement;
    };
    Storage.prototype.getAchievementCount = function () {
        return this.data.achievement.filter(Boolean).length;
    };
    Storage.prototype.getRatCount = function () {
        return this.data.achievements.ratCount;
    };
    Storage.prototype.incrementRatCount = function () {
        if (this.data.achievements.ratCount < RAT_COUNT) {
            this.data.achievements.ratCount++;
            this.save();
        }
    };
    Storage.prototype.getSkeletonCount = function () {
        return this.data.achievements.skeletonCount;
    };
    Storage.prototype.incrementSkeletonCount = function () {
        if (this.data.achievements.skeletonCount < SKELETON_COUNT) {
            this.data.achievements.skeletonCount++;
            this.save();
        }
    };
    Storage.prototype.getSpectreCount = function () {
        return this.data.achievements.spectreCount;
    };
    Storage.prototype.incrementSpectreCount = function () {
        if (!this.data.achievements.spectreCount) {
            this.data.achievements.spectreCount = 0;
        }
        if (this.data.achievements.spectreCount < SPECTRE_COUNT) {
            this.data.achievements.spectreCount++;
            this.save();
        }
    };
    Storage.prototype.getWerewolfCount = function () {
        return this.data.achievements.werewolfCount;
    };
    Storage.prototype.incrementWerewolfCount = function () {
        if (!this.data.achievements.werewolfCount) {
            this.data.achievements.werewolfCount = 0;
        }
        if (this.data.achievements.werewolfCount < WEREWOLF_COUNT) {
            this.data.achievements.werewolfCount++;
            this.save();
        }
    };
    Storage.prototype.getYetiCount = function () {
        return this.data.achievements.yetiCount;
    };
    Storage.prototype.incrementYetiCount = function () {
        if (!this.data.achievements.yetiCount) {
            this.data.achievements.yetiCount = 0;
        }
        if (this.data.achievements.yetiCount < YETI_COUNT) {
            this.data.achievements.yetiCount++;
            this.save();
        }
    };
    Storage.prototype.getSkeleton3Count = function () {
        return this.data.achievements.skeleton3Count;
    };
    Storage.prototype.incrementSkeleton3Count = function () {
        if (!this.data.achievements.skeleton3Count) {
            this.data.achievements.skeleton3Count = 0;
        }
        if (this.data.achievements.skeleton3Count < SKELETON3_COUNT) {
            this.data.achievements.skeleton3Count++;
            this.save();
        }
    };
    Storage.prototype.getWraithCount = function () {
        return this.data.achievements.wraithCount;
    };
    Storage.prototype.incrementWraithCount = function () {
        if (!this.data.achievements.wraithCount) {
            this.data.achievements.wraithCount = 0;
        }
        if (this.data.achievements.wraithCount < WRAITH_COUNT) {
            this.data.achievements.wraithCount++;
            this.save();
        }
    };
    Storage.prototype.getCowCount = function () {
        return this.data.achievements.cowCount;
    };
    Storage.prototype.incrementCowCount = function () {
        if (!this.data.achievements.cowCount) {
            this.data.achievements.cowCount = 0;
        }
        if (this.data.achievements.cowCount < COW_COUNT) {
            this.data.achievements.cowCount++;
            this.save();
        }
    };
    Storage.prototype.getRat3Count = function () {
        return this.data.achievements.rat3Count;
    };
    Storage.prototype.incrementRat3Count = function () {
        if (this.data.achievements.rat3Count < RAT3_COUNT) {
            this.data.achievements.rat3Count++;
            this.save();
        }
    };
    Storage.prototype.getGolemCount = function () {
        return this.data.achievements.golemCount;
    };
    Storage.prototype.incrementGolemCount = function () {
        if (!this.data.achievements.golemCount) {
            this.data.achievements.golemCount = 0;
        }
        if (this.data.achievements.golemCount < GOLEM_COUNT) {
            this.data.achievements.golemCount++;
            this.save();
        }
    };
    Storage.prototype.getOculothoraxCount = function () {
        return this.data.achievements.oculothoraxCount;
    };
    Storage.prototype.incrementOculothoraxCount = function () {
        if (!this.data.achievements.oculothoraxCount) {
            this.data.achievements.oculothoraxCount = 0;
        }
        if (this.data.achievements.oculothoraxCount < OCULOTHORAX_COUNT) {
            this.data.achievements.oculothoraxCount++;
            this.save();
        }
    };
    Storage.prototype.getSkeleton4Count = function () {
        return this.data.achievements.skeleton4Count;
    };
    Storage.prototype.incrementSkeleton4Count = function () {
        if (!this.data.achievements.skeleton4Count) {
            this.data.achievements.skeleton4Count = 0;
        }
        if (this.data.achievements.skeleton4Count < SKELETON4_COUNT) {
            this.data.achievements.skeleton4Count++;
            this.save();
        }
    };
    Storage.prototype.getSkeletonBerserkerCount = function () {
        return this.data.achievements.skeletonBerserkerCount;
    };
    Storage.prototype.incrementSkeletonBerserkerCount = function () {
        if (!this.data.achievements.skeletonBerserkerCount) {
            this.data.achievements.skeletonBerserkerCount = 0;
        }
        if (this.data.achievements.skeletonBerserkerCount < SKELETONBERSERKER_COUNT) {
            this.data.achievements.skeletonBerserkerCount++;
            this.save();
        }
    };
    Storage.prototype.getSkeletonArcherCount = function () {
        return this.data.achievements.skeletonArcherCount;
    };
    Storage.prototype.incrementSkeletonArcherCount = function () {
        if (!this.data.achievements.skeletonArcherCount) {
            this.data.achievements.skeletonArcherCount = 0;
        }
        if (this.data.achievements.skeletonArcherCount < SKELETONARCHER_COUNT) {
            this.data.achievements.skeletonArcherCount++;
            this.save();
        }
    };
    Storage.prototype.getGhostCount = function () {
        return this.data.achievements.ghostCount;
    };
    Storage.prototype.incrementGhostCount = function () {
        if (!this.data.achievements.ghostCount) {
            this.data.achievements.ghostCount = 0;
        }
        if (this.data.achievements.ghostCount < GHOST_COUNT) {
            this.data.achievements.ghostCount++;
            this.save();
        }
    };
    Storage.prototype.getWraith2Count = function () {
        return this.data.achievements.wraith2Count;
    };
    Storage.prototype.incrementWraith2Count = function () {
        if (!this.data.achievements.wraith2Count) {
            this.data.achievements.wraith2Count = 0;
        }
        if (this.data.achievements.wraith2Count < WRAITH2_COUNT) {
            this.data.achievements.wraith2Count++;
            this.save();
        }
    };
    Storage.prototype.getMageCount = function () {
        return this.data.achievements.mageCount;
    };
    Storage.prototype.incrementMageCount = function () {
        if (!this.data.achievements.mageCount) {
            this.data.achievements.mageCount = 0;
        }
        if (this.data.achievements.mageCount < MAGE_COUNT) {
            this.data.achievements.mageCount++;
            this.save();
        }
    };
    Storage.prototype.getMiniBossCount = function () {
        return this.data.achievements.miniBossCount;
    };
    Storage.prototype.incrementMiniBossCount = function () {
        if (!this.data.achievements.miniBossCount) {
            this.data.achievements.miniBossCount = 0;
        }
        if (this.data.achievements.miniBossCount < MINI_BOSS_COUNT) {
            this.data.achievements.miniBossCount++;
            this.save();
        }
    };
    Storage.prototype.getTotalDamageTaken = function () {
        return this.data.achievements.totalDmg;
    };
    Storage.prototype.addDamage = function (damage) {
        if (this.data.achievements.totalDmg < DMG_TOTAL) {
            this.data.achievements.totalDmg += damage;
            this.save();
        }
    };
    Storage.prototype.getTotalKills = function () {
        return this.data.achievements.totalKills;
    };
    Storage.prototype.incrementTotalKills = function () {
        if (this.data.achievements.totalKills < KILLS_TOTAL) {
            this.data.achievements.totalKills++;
            this.save();
        }
    };
    Storage.prototype.getTotalRevives = function () {
        return this.data.achievements.totalRevives;
    };
    Storage.prototype.incrementRevives = function () {
        if (this.data.achievements.totalRevives < 5) {
            this.data.achievements.totalRevives++;
            this.save();
        }
    };
    Storage.prototype.hasAllMagicStones = function () {
        return !this.data.achievements.magicStones.some(function (x) { return x === 0; });
    };
    Storage.prototype.activateMagicStone = function (x) {
        if (!this.data.achievements.magicStones.includes(x)) {
            var index = this.data.achievements.magicStones.findIndex(function (value) { return value === 0; });
            this.data.achievements.magicStones[index] = x;
            this.save();
        }
    };
    return Storage;
}());
var storage = new Storage();
export default storage;
