export var PLAYER_MAX_SKILL_TIMEOUT = 60;
export var defenseSkillDurationMap = [
    function () { return 900; },
    function (itemLevel) { return itemLevel * 750; },
    function (itemLevel) { return itemLevel * 1000; },
];
export var attackSkillDurationMap = [function () { return 1200; }, function () { return 1500; }, function () { return 1000; }, function () { return 1050; }, function () { return 1000; }];
var defenseSkillDescriptionMap = [
    "+#% Instant health regeneration",
    "+#% Defense for # seconds and clear curses",
    "+#% All resistances for # seconds",
];
var attackSkillDescriptionMap = [
    "Cast a # damage magic ball",
    "Cast a # damage flame pillar",
    "Cast a # damage lightning strike",
    "Cast a # damage ice spike",
    "Cast a # damage poison curse",
];
export var defenseSkillType = [
    "regenerateHealthSkill",
    "defenseSkill",
    "resistancesSkill",
];
export var attackSkillType = [
    "magicSkill",
    "flameSkill",
    "lightningSkill",
    "coldSkill",
    "poisonSkill",
];
export var scrollToSkillMap = [
    "scrollupgradeelementmagic",
    "scrollupgradeelementflame",
    "scrollupgradeelementlightning",
    "scrollupgradeelementcold",
    "scrollupgradeelementpoison",
];
export var skillToNameMap = ["magic", "flame", "lightning", "cold", "poison"];
export var attackSkillToDamageType = ["magicDamage", "flameDamage", "lightningDamage", "coldDamage", "poisonDamage"];
export var attackSkillToResistanceType = [
    "magicResistance",
    "flameResistance",
    "lightningResistance",
    "coldResistance",
    "poisonResistance",
];
export var calculateSkillTimeout = function (timeout) {
    return timeout > PLAYER_MAX_SKILL_TIMEOUT ? PLAYER_MAX_SKILL_TIMEOUT : timeout;
};
export var defenseSkillDelay = [20000, 20000, 20000];
export var attackSkillDelay = [5000, 5000, 5000, 5000, 5000];
export var defenseSkillTypeAnimationMap = ["heal", "defense", "resistances"];
export var attackSkillTypeAnimationMap = ["magic", "flame", "lightning", "cold", "poison"];
export var getDefenseSkill = function (rawSkill, level) {
    var regenerateHealthSkillPerLevel = [5, 10, 15, 20, 25, 30, 40, 50, 75, 100];
    var defenseSkillPerLevel = [5, 10, 15, 20, 25, 30, 40, 50, 75, 100];
    var resistanceSkillPerLevel = [5, 10, 15, 20, 25, 30, 40, 50, 75, 90];
    var skillPerLevel = [regenerateHealthSkillPerLevel, defenseSkillPerLevel, resistanceSkillPerLevel];
    var skill = null;
    var type = defenseSkillType[rawSkill];
    var stats = skillPerLevel[rawSkill][level - 1];
    var description = defenseSkillDescriptionMap[rawSkill].replace("#", "".concat(stats));
    if (type === "defenseSkill" || type === "resistancesSkill") {
        description = description.replace("#", defenseSkillDurationMap[rawSkill](level) / 1000);
    }
    skill = { type: type, stats: stats, description: description };
    return skill;
};
export var getAttackSkill = function (_a) {
    var skill = _a.skill, level = _a.level, bonus = _a.bonus, _b = _a.resistance, resistance = _b === void 0 ? 0 : _b, itemClass = _a.itemClass;
    var magicSkillPerLevel = [5, 15, 30, 50, 75, 100, 135, 180, 240, 340];
    var flameSkillPerLevel = [5, 15, 30, 50, 75, 100, 135, 180, 240, 340];
    var lightningSkillPerLevel = [5, 15, 30, 50, 75, 100, 135, 180, 240, 340];
    var coldSkillPerLevel = [5, 15, 30, 50, 75, 100, 135, 180, 240, 340];
    var poisonSkillPerLevel = [5, 15, 30, 50, 75, 100, 135, 180, 240, 340];
    var skillMultipliers = [
        [1.3, 1.4],
        [1.1, 1.6],
        [0.3, 2.8],
        [1.2, 1.5],
        [1.2, 1.8],
    ];
    var skillPerLevel = [
        magicSkillPerLevel,
        flameSkillPerLevel,
        lightningSkillPerLevel,
        coldSkillPerLevel,
        poisonSkillPerLevel,
    ];
    var skillPlayerBaseElementBonus = [
        bonus.magicDamage,
        bonus.flameDamage,
        bonus.lightningDamage,
        bonus.coldDamage,
        bonus.poisonDamage,
    ];
    var skillPlayerBonus = [
        bonus.magicDamagePercent,
        bonus.flameDamagePercent,
        bonus.lightningDamagePercent,
        bonus.coldDamagePercent,
        bonus.poisonDamagePercent,
    ];
    var itemClassMultiplier = itemClass === "legendary" ? 1.25 : 1;
    var type = attackSkillType[skill];
    var stats = skillPerLevel[skill][level - 1];
    var multiplier = skillMultipliers[skill];
    var baseElementDamageBonus = skillPlayerBaseElementBonus[skill];
    var baseDmg = Math.round((stats + stats * (skillPlayerBonus[skill] / 100)) * itemClassMultiplier) + baseElementDamageBonus;
    var baseMin = Math.round(baseDmg * multiplier[0]);
    var baseMax = Math.round(baseDmg * multiplier[1]);
    var min = Math.round(baseMin - baseMin * (resistance / 100));
    var max = Math.round(baseMax - baseMax * (resistance / 100));
    var description = attackSkillDescriptionMap[skill].replace("#", "".concat(min, "-").concat(max));
    return { type: type, stats: stats, description: description, min: min, max: max };
};
