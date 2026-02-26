import storage from "./storage";
var NANO_PAYOUT_MULTIPLIER = 10;
var BAN_PAYOUT_MULTIPLIER = 10;
export var DMG_TOTAL = 5000;
export var KILLS_TOTAL = 75;
export var RAT_COUNT = 15;
export var SKELETON_COUNT = 20;
export var ENEMY_COUNT = 75;
export var REVIVES_COUNT = 5;
export var DAMAGE_COUNT = 5000;
export var SPECTRE_COUNT = 20;
export var WEREWOLF_COUNT = 50;
export var YETI_COUNT = 75;
export var SKELETON3_COUNT = 100;
export var WRAITH_COUNT = 100;
export var COW_COUNT = 500;
export var RAT3_COUNT = 250;
export var GOLEM_COUNT = 250;
export var OCULOTHORAX_COUNT = 250;
export var SKELETON4_COUNT = 250;
export var GHOST_COUNT = 250;
export var SKELETONBERSERKER_COUNT = 250;
export var SKELETONARCHER_COUNT = 250;
export var MAGE_COUNT = 250;
export var WRAITH2_COUNT = 250;
export var MINI_BOSS_COUNT = 250;
export var getAchievements = function (network) {
    if (network === void 0) { network = "nano"; }
    return ({
        A_TRUE_WARRIOR: {
            id: 1,
            name: "A True Warrior",
            desc: "Find a new weapon",
            nano: 3 * NANO_PAYOUT_MULTIPLIER,
            ban: 75 * BAN_PAYOUT_MULTIPLIER,
        },
        INTO_THE_WILD: {
            id: 2,
            name: "Into the Wild",
            desc: "Venture outside the village",
            nano: 2 * NANO_PAYOUT_MULTIPLIER,
            ban: 50 * BAN_PAYOUT_MULTIPLIER,
        },
        ANGRY_RATS: {
            id: 3,
            name: "Angry Rats",
            desc: "Kill <small>".concat(storage.data.achievement[2] ? RAT_COUNT : storage.getRatCount(), "/</small>").concat(RAT_COUNT, " rats"),
            isCompleted: function () {
                return storage.getRatCount() >= RAT_COUNT;
            },
            nano: 5 * NANO_PAYOUT_MULTIPLIER,
            ban: 125 * BAN_PAYOUT_MULTIPLIER,
        },
        SMALL_TALK: {
            id: 4,
            name: "Small Talk",
            desc: "Talk to a non-player character",
            nano: 3 * NANO_PAYOUT_MULTIPLIER,
            ban: 75 * BAN_PAYOUT_MULTIPLIER,
        },
        FAT_LOOT: {
            id: 5,
            name: "Fat Loot",
            desc: "Get a new armor set",
            nano: 5 * NANO_PAYOUT_MULTIPLIER,
            ban: 125 * BAN_PAYOUT_MULTIPLIER,
        },
        UNDERGROUND: {
            id: 6,
            name: "Underground",
            desc: "Explore at least one cave",
            nano: 3 * NANO_PAYOUT_MULTIPLIER,
            ban: 75 * BAN_PAYOUT_MULTIPLIER,
        },
        AT_WORLDS_END: {
            id: 7,
            name: "At World's End",
            desc: "Reach the south shore",
            nano: 5 * NANO_PAYOUT_MULTIPLIER,
            ban: 125 * BAN_PAYOUT_MULTIPLIER,
        },
        COWARD: {
            id: 8,
            name: "Coward",
            desc: "Successfully escape an enemy",
            nano: 4 * NANO_PAYOUT_MULTIPLIER,
            ban: 100 * BAN_PAYOUT_MULTIPLIER,
        },
        TOMB_RAIDER: {
            id: 9,
            name: "Tomb Raider",
            desc: "Find the graveyard",
            nano: 5 * NANO_PAYOUT_MULTIPLIER,
            ban: 125 * BAN_PAYOUT_MULTIPLIER,
        },
        SKULL_COLLECTOR: {
            id: 10,
            name: "Skull Collector",
            desc: "Kill <small>".concat(storage.data.achievement[9] ? SKELETON_COUNT : storage.getSkeletonCount(), "/</small>").concat(SKELETON_COUNT, " skeletons"),
            isCompleted: function () {
                return storage.getSkeletonCount() >= SKELETON_COUNT;
            },
            nano: 8 * NANO_PAYOUT_MULTIPLIER,
            ban: 200 * BAN_PAYOUT_MULTIPLIER,
        },
        NINJA_LOOT: {
            id: 11,
            name: "Ninja Loot",
            desc: "Get an item you didn't fight for",
            nano: 4 * NANO_PAYOUT_MULTIPLIER,
            ban: 100 * BAN_PAYOUT_MULTIPLIER,
        },
        NO_MANS_LAND: {
            id: 12,
            name: "No Man's Land",
            desc: "Travel through the desert",
            nano: 3 * NANO_PAYOUT_MULTIPLIER,
            ban: 75 * BAN_PAYOUT_MULTIPLIER,
        },
        HUNTER: {
            id: 13,
            name: "Hunter",
            desc: "Kill <small>".concat(storage.data.achievement[12] ? ENEMY_COUNT : storage.getTotalKills(), "/</small>").concat(ENEMY_COUNT, " enemies"),
            isCompleted: function () {
                return storage.getTotalKills() >= ENEMY_COUNT;
            },
            nano: 4 * NANO_PAYOUT_MULTIPLIER,
            ban: 100 * BAN_PAYOUT_MULTIPLIER,
        },
        STILL_ALIVE: {
            id: 14,
            name: "Still Alive",
            desc: "Revive your character <small>".concat(storage.data.achievement[13] ? REVIVES_COUNT : storage.getTotalRevives(), "/</small>5 times"),
            isCompleted: function () {
                return storage.getTotalRevives() >= REVIVES_COUNT;
            },
            nano: 5 * NANO_PAYOUT_MULTIPLIER,
            ban: 125 * BAN_PAYOUT_MULTIPLIER,
        },
        MEATSHIELD: {
            id: 15,
            name: "Meatshield",
            desc: "Take <small>".concat(storage.data.achievement[14] ? DAMAGE_COUNT : storage.getTotalDamageTaken(), "/</small>").concat(DAMAGE_COUNT, " points of damage"),
            isCompleted: function () {
                return storage.getTotalDamageTaken() >= DAMAGE_COUNT;
            },
            nano: 7 * NANO_PAYOUT_MULTIPLIER,
            ban: 175 * BAN_PAYOUT_MULTIPLIER,
        },
        NYAN: {
            id: 16,
            name: "Nyan Cat",
            desc: "Find the Nyan cat",
            nano: 3 * NANO_PAYOUT_MULTIPLIER,
            ban: 75 * BAN_PAYOUT_MULTIPLIER,
        },
        HOT_SPOT: {
            id: 17,
            name: "Hot Spot",
            desc: "Enter the volcanic mountains",
            nano: 3 * NANO_PAYOUT_MULTIPLIER,
            ban: 75 * BAN_PAYOUT_MULTIPLIER,
        },
        SPECTRE_COLLECTOR: {
            id: 18,
            name: "No Fear",
            desc: "Kill <small>".concat(storage.data.achievement[17] ? SPECTRE_COUNT : storage.getSpectreCount(), "/</small>").concat(SPECTRE_COUNT, " spectres"),
            isCompleted: function () {
                return storage.getSpectreCount() >= SPECTRE_COUNT;
            },
            nano: 8 * NANO_PAYOUT_MULTIPLIER,
            ban: 200 * BAN_PAYOUT_MULTIPLIER,
        },
        GEM_HUNTER: {
            id: 19,
            name: "Gem Hunter",
            desc: "Collect all the hidden gems",
            nano: 8 * NANO_PAYOUT_MULTIPLIER,
            ban: 200 * BAN_PAYOUT_MULTIPLIER,
        },
        NANO_POTIONS: {
            id: 20,
            name: "Lucky Find",
            desc: network === "ban" ? "Collect 5 BANANO potions" : "Collect 5 NANO potions",
            nano: 8 * NANO_PAYOUT_MULTIPLIER,
            ban: 200 * BAN_PAYOUT_MULTIPLIER,
        },
        HERO: {
            id: 21,
            name: "Hero",
            desc: "Defeat the Skeleton King",
            nano: 25 * NANO_PAYOUT_MULTIPLIER,
            ban: 625 * BAN_PAYOUT_MULTIPLIER,
        },
        FOXY: {
            id: 22,
            name: "Firefox",
            desc: "Find the Firefox costume",
            hidden: true,
            nano: 2 * NANO_PAYOUT_MULTIPLIER,
            ban: 50 * BAN_PAYOUT_MULTIPLIER,
        },
        FOR_SCIENCE: {
            id: 23,
            name: "For Science",
            desc: "Enter into a portal",
            hidden: true,
            nano: 4 * NANO_PAYOUT_MULTIPLIER,
            ban: 100 * BAN_PAYOUT_MULTIPLIER,
        },
        RICKROLLD: {
            id: 24,
            name: "Rickroll'd",
            desc: "Take some singing lessons",
            hidden: true,
            nano: 6 * NANO_PAYOUT_MULTIPLIER,
            ban: 150 * BAN_PAYOUT_MULTIPLIER,
        },
        XNO: {
            id: 25,
            name: network === "ban" ? "BAN" : "XNO",
            desc: "Complete your first purchase!",
            hidden: false,
        },
        FREEZING_LANDS: {
            id: 26,
            name: "BrrRRrr",
            desc: "Enter the freezing lands",
            hidden: false,
        },
        SKELETON_KEY: {
            id: 27,
            name: "Unique Key",
            desc: "Find the skeleton key",
            hidden: false,
        },
        BLOODLUST: {
            id: 28,
            name: "Bloodlust",
            desc: "Defeat <small>".concat(storage.data.achievement[17] ? WEREWOLF_COUNT : storage.getWerewolfCount(), "/</small>").concat(WEREWOLF_COUNT, " Werewolves"),
            hidden: false,
            isCompleted: function () {
                return storage.getWerewolfCount() >= WEREWOLF_COUNT;
            },
        },
        SATOSHI: {
            id: 29,
            name: "Satoshi",
            desc: "Have a chat with Satoshi Nakamoto",
            hidden: false,
        },
        WEN: {
            id: 30,
            name: "WEN?",
            desc: "Find a very very large announcement",
            hidden: false,
        },
        INDIANA_JONES: {
            id: 31,
            name: "Indiana Jones",
            desc: "Reassemble the lost artifact",
            hidden: false,
        },
        MYTH_OR_REAL: {
            id: 32,
            name: "Myth or Real",
            desc: "Defeat <small>".concat(storage.data.achievement[31] ? YETI_COUNT : storage.getYetiCount(), "/</small>").concat(YETI_COUNT, " Yetis"),
            hidden: false,
            isCompleted: function () {
                return storage.getYetiCount() >= YETI_COUNT;
            },
        },
        RIP: {
            id: 33,
            name: "R.I.P.",
            desc: "Defeat <small>".concat(storage.data.achievement[32] ? SKELETON3_COUNT : storage.getSkeleton3Count(), "/</small>").concat(SKELETON3_COUNT, " Skeleton Guards"),
            hidden: false,
            isCompleted: function () {
                return storage.getSkeleton3Count() >= SKELETON3_COUNT;
            },
        },
        DEAD_NEVER_DIE: {
            id: 34,
            name: "What is dead may never die",
            desc: "Defeat the Skeleton Commander",
            hidden: false,
        },
        WALK_ON_WATER: {
            id: 35,
            name: "Walk on Water",
            desc: "Make your way through the floating ice",
            hidden: false,
        },
        GHOSTBUSTERS: {
            id: 36,
            name: "Ghostbusters",
            desc: "Kill <small>".concat(storage.data.achievement[35] ? WRAITH_COUNT : storage.getWraithCount(), "/</small>").concat(WRAITH_COUNT, " Wraiths"),
            hidden: false,
            isCompleted: function () {
                return storage.getWraithCount() >= WRAITH_COUNT;
            },
        },
        BLACK_MAGIC: {
            id: 37,
            name: "Black Magic",
            desc: "Defeat the Necromancer",
            hidden: false,
        },
        LUCKY7: {
            id: 38,
            name: "Lucky 7",
            desc: "Upgrade a high class item to +7",
            hidden: true,
        },
        NOT_SAFU: {
            id: 39,
            name: "Not Safu",
            desc: "Kill a monster with less than 1% HP left",
            hidden: true,
        },
        TICKLE_FROM_UNDER: {
            id: 40,
            name: "Tickle from Under",
            desc: "Be surrounded by 15 zombies",
            hidden: true,
        },
        SECRET_LEVEL: {
            id: 41,
            name: "Leap of faith",
            desc: "Jump into the void",
            hidden: false,
        },
        COW_KING: {
            id: 42,
            name: "I'm the Butcher",
            desc: "Defeat the Cow King",
            hidden: true,
        },
        HAMBURGER: {
            id: 43,
            name: "Hamburger",
            desc: "Kill <small>".concat(storage.data.achievement[42] ? COW_COUNT : storage.getCowCount(), "/</small>").concat(COW_COUNT, " cows"),
            hidden: true,
            isCompleted: function () {
                return storage.getCowCount() >= COW_COUNT;
            },
        },
        FARMER: {
            id: 44,
            name: "Pro Farmer",
            desc: "Kill every monster in the secret level",
            hidden: true,
        },
        ANTIDOTE: {
            id: 45,
            name: "Antidote",
            desc: "Kill <small>".concat(storage.data.achievement[44] ? RAT3_COUNT : storage.getRat3Count(), "/</small>").concat(RAT3_COUNT, " Poison Rats<br/><small>Get awarded 5 legendary scrolls.</small>"),
            isCompleted: function () {
                return storage.getRat3Count() >= RAT3_COUNT;
            },
        },
        DISCORD: {
            id: 46,
            name: "Discord",
            desc: "Link your account in Discord<br/><small>Earn 5 ".concat(!storage.getPlayerExpanson1() ? "medium" : storage.getPlayerExpanson2() ? "legendary" : "high", " upgrade scrolls</small>"),
        },
        NFT: {
            id: 47,
            name: "NFT",
            desc: "Retrieve the NFT Alkor is seeking<br/><small>Earn 5 legendary upgrade scrolls</small>",
        },
        UNBREAKABLE: {
            id: 48,
            name: "Unbreakable",
            desc: "Kill <small>".concat(storage.data.achievement[47] ? GOLEM_COUNT : storage.getGolemCount(), "/</small>").concat(GOLEM_COUNT, " Stone Golem<br/><small>Get awarded 5 legendary scrolls.</small>"),
            isCompleted: function () {
                return storage.getGolemCount() >= GOLEM_COUNT;
            },
        },
        WAY_OF_WATER: {
            id: 49,
            name: "Way Of Water",
            desc: "Get your toes wet",
        },
        CYCLOP: {
            id: 50,
            name: "Cyclop",
            desc: "kill <small>".concat(storage.data.achievement[49] ? OCULOTHORAX_COUNT : storage.getOculothoraxCount(), "/</small>").concat(OCULOTHORAX_COUNT, " Oculothorax<br/><small>Get awarded 5 legendary scrolls.</small>"),
            isCompleted: function () {
                return storage.getOculothoraxCount() >= OCULOTHORAX_COUNT;
            },
        },
        TEMPLAR: {
            id: 51,
            name: "Templar",
            desc: "Kill <small>".concat(storage.data.achievement[50] ? SKELETON4_COUNT : storage.getSkeleton4Count(), "/</small>").concat(SKELETON4_COUNT, " Crusader Skeletons<br/><small>Get awarded 5 legendary scrolls.</small>"),
            isCompleted: function () {
                return storage.getSkeleton4Count() >= SKELETON4_COUNT;
            },
        },
        WING: {
            id: 52,
            name: "Dragon",
            desc: "Retrieve the Dragon Wing Olaf is seeking<br/><small>Earn 5 legendary upgrade scrolls</small>",
        },
        STONEHENGE: {
            id: 53,
            name: "Stonehenge",
            desc: "Activate all magic stones",
        },
        SPIDERQUEEN: {
            id: 54,
            name: "Spider Queen",
            desc: "Defeat Arachneia",
        },
        CRUISADE: {
            id: 55,
            name: "Cruisade",
            desc: "Find the Holy Grail",
        },
        TOMB: {
            id: 56,
            name: "The Tomb",
            desc: "Enter the hidden Crypt",
        },
        ALCHEMIST: {
            id: 57,
            name: "Alchemist",
            desc: "Create the quantum powder",
        },
        STARGATE: {
            id: 58,
            name: "Stargate",
            desc: "Enter the gateway portal",
        },
        SOULSTONE: {
            id: 59,
            name: "Soul Stone",
            desc: "Find a mysterious gem with great powers",
        },
        BUTCHER: {
            id: 60,
            name: "Fresh Meat",
            desc: "Defeat the Butcher and release the souls he keeps captive",
        },
        BOO: {
            id: 61,
            name: "Boo",
            desc: "Kill <small>".concat(storage.data.achievement[60] ? GHOST_COUNT : storage.getGhostCount(), "/</small>").concat(GHOST_COUNT, " Ghosts<br/><small>Get awarded 5 legendary scrolls.</small>"),
            isCompleted: function () {
                return storage.getGhostCount() >= GHOST_COUNT;
            },
        },
        VIKING: {
            id: 62,
            name: "Viking",
            desc: "Kill <small>".concat(storage.data.achievement[61] ? SKELETONBERSERKER_COUNT : storage.getSkeletonBerserkerCount(), "/</small>").concat(SKELETONBERSERKER_COUNT, " Skeleton Berserkers<br/><small>Get awarded 5 legendary scrolls.</small>"),
            isCompleted: function () {
                return storage.getSkeletonBerserkerCount() >= SKELETONBERSERKER_COUNT;
            },
        },
        BULLSEYE: {
            id: 63,
            name: "Bullseye",
            desc: "Kill <small>".concat(storage.data.achievement[62] ? SKELETONARCHER_COUNT : storage.getSkeletonArcherCount(), "/</small>").concat(SKELETONARCHER_COUNT, " Skeleton Archers<br/><small>Get awarded 5 legendary scrolls.</small>"),
            isCompleted: function () {
                return storage.getSkeletonArcherCount() >= SKELETONARCHER_COUNT;
            },
        },
        SPECTRAL: {
            id: 64,
            name: "Spectral",
            desc: "Kill <small>".concat(storage.data.achievement[63] ? WRAITH2_COUNT : storage.getWraith2Count(), "/</small>").concat(WRAITH2_COUNT, " Spectral Wraiths<br/><small>Get awarded 5 legendary scrolls.</small>"),
            isCompleted: function () {
                return storage.getWraith2Count() >= WRAITH2_COUNT;
            },
        },
        ARCHMAGE: {
            id: 65,
            name: "Archmage",
            desc: "Kill <small>".concat(storage.data.achievement[64] ? MAGE_COUNT : storage.getMageCount(), "/</small>").concat(MAGE_COUNT, " Mages<br/><small>Get awarded 5 legendary scrolls.</small>"),
            isCompleted: function () {
                return storage.getMageCount() >= MAGE_COUNT;
            },
        },
        MINI_BOSS: {
            id: 66,
            name: "Mini-Boss",
            desc: "Kill <small>".concat(storage.data.achievement[65] ? MINI_BOSS_COUNT : storage.getMiniBossCount(), "/</small>").concat(MINI_BOSS_COUNT, " enchanted mini-bosses<br/><small>Get awarded 5 sacred scrolls.</small>"),
            isCompleted: function () {
                return storage.getMiniBossCount() >= MINI_BOSS_COUNT;
            },
        },
        CRYSTAL: {
            id: 67,
            name: "Crystal",
            desc: "Retrieve the Crystal Victor is seeking<br/><small>Earn 5 legendary upgrade scrolls</small>",
        },
        SHAMAN: {
            id: 68,
            name: "Shamanic Ritual",
            desc: "Defeat Zul'Gurak",
        },
        PHARAOH: {
            id: 69,
            name: "Pharaoh",
            desc: "Enter the Temple of Light",
        },
        DEATHANGEL: {
            id: 70,
            name: "Death Angel",
            desc: "Kill Azrael",
        },
        RUNOLOGUE: {
            id: 71,
            name: "Runologue",
            desc: "Find a rare rune (rank 25 or higher)",
        },
        BLACKSMITH: {
            id: 72,
            name: "Blacksmith",
            desc: "Forge a Runeword",
        },
        SACRED: {
            id: 73,
            name: "Sacred",
            desc: "Complete the Uber Cow level<br/><small>Earn 5 sacred upgrade scrolls</small>",
            hidden: true,
        },
        EMBLEM: {
            id: 74,
            name: "Hero Emblem",
            desc: "Find a powerful artifact able to enchant items to +6 without any risk",
            hidden: true,
        },
        OBELISK: {
            id: 75,
            name: "Obelisk",
            desc: "Find the Obelisk of Eternal Life<br/><small>Get 50 base health</small>",
            hidden: true,
        },
        MISSTEP: {
            id: 76,
            name: "Misstep",
            desc: "Die from a trap",
            hidden: true,
        },
        ZELDA: {
            id: 77,
            name: "ZELDA",
            desc: "Find the hidden stairs",
            hidden: true,
        },
        GRIMOIRE: {
            id: 78,
            name: "Grimoire",
            desc: "Find The Book of Azrael<br/><small>Get 10% to all resistances</small>",
            hidden: true,
        },
        ZAP: {
            id: 79,
            name: "Zap",
            desc: "Break the Soul Stone on the Altar",
            hidden: true,
        },
        GRAND_MASTER: {
            id: 80,
            name: "Grand Master",
            desc: "Reach lv.71<br/>",
            hidden: true,
        },
    });
};
