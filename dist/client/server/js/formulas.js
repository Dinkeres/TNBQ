import { Types } from "../../shared/js/gametypes";
import { randomInt } from "./utils";
var Formulas = {};
Formulas.resistanceDamage = function (damage, resistance) {
    if (resistance === void 0) { resistance = 0; }
    return resistance > 0 ? damage - Math.round((damage * resistance) / 100) : damage;
};
Formulas.minMaxDamage = function (_a) {
    var weapon = _a.weapon, weaponLevel = _a.weaponLevel, isWeaponUnique = _a.isWeaponUnique, isWeaponSuperior = _a.isWeaponSuperior, playerLevel = _a.playerLevel, minDamage = _a.minDamage, maxDamage = _a.maxDamage, attackDamageBonus = _a.attackDamage, drainLife = _a.drainLife, magicDamage = _a.magicDamage, flameDamage = _a.flameDamage, lightningDamage = _a.lightningDamage, coldDamage = _a.coldDamage, poisonDamage = _a.poisonDamage, partyAttackDamage = _a.partyAttackDamage, _b = _a.magicResistance, magicResistance = _b === void 0 ? 0 : _b, _c = _a.flameResistance, flameResistance = _c === void 0 ? 0 : _c, _d = _a.lightningResistance, lightningResistance = _d === void 0 ? 0 : _d, _e = _a.coldResistance, coldResistance = _e === void 0 ? 0 : _e, _f = _a.poisonResistance, poisonResistance = _f === void 0 ? 0 : _f;
    var attackDamage = Math.ceil((Types.getWeaponDamage(weapon, weaponLevel, isWeaponUnique, isWeaponSuperior) + attackDamageBonus) * 1.2 +
        playerLevel / 2);
    var baseDamage = attackDamage + drainLife;
    var elementDamage = Formulas.resistanceDamage(magicDamage, magicResistance) +
        Formulas.resistanceDamage(flameDamage, flameResistance) +
        Formulas.resistanceDamage(lightningDamage, lightningResistance) +
        Formulas.resistanceDamage(coldDamage, coldResistance) +
        Formulas.resistanceDamage(poisonDamage, poisonResistance);
    var min = baseDamage + minDamage + Math.round(Math.pow(0.7, Math.floor(playerLevel / 10)) * playerLevel);
    var max = baseDamage + maxDamage + Math.round(Math.pow(1.075, Math.floor(playerLevel / 10)) * playerLevel);
    if (min > max) {
        min = max;
    }
    if (partyAttackDamage) {
        min = Math.round((partyAttackDamage / 100) * min) + min;
        max = Math.round((partyAttackDamage / 100) * max) + max;
        attackDamage = Math.round((partyAttackDamage / 100) * attackDamage) + attackDamage;
    }
    return {
        min: min,
        max: max,
        attackDamage: attackDamage,
        elementDamage: elementDamage,
    };
};
Formulas.dmg = function (stats) {
    var _a = Formulas.minMaxDamage(stats), min = _a.min, max = _a.max, attackDamage = _a.attackDamage, elementDamage = _a.elementDamage;
    var dmg = randomInt(min, max);
    if (dmg + elementDamage <= 0) {
        dmg = randomInt(0, 3);
        return { dmg: dmg, attackDamage: dmg, elementDamage: elementDamage };
    }
    else {
        return { dmg: dmg, attackDamage: attackDamage, elementDamage: elementDamage };
    }
};
Formulas.mobDefense = function (_a) {
    var armorLevel = _a.armorLevel;
    var defense = armorLevel ? Math.round(armorLevel * randomInt(1.75, 3.5)) : 0;
    return defense;
};
Formulas.minMaxDefense = function (_a) {
    var helm = _a.helm, helmLevel = _a.helmLevel, isHelmUnique = _a.isHelmUnique, isHelmSuperior = _a.isHelmSuperior, armor = _a.armor, armorLevel = _a.armorLevel, isArmorUnique = _a.isArmorUnique, isArmorSuperior = _a.isArmorSuperior, playerLevel = _a.playerLevel, defense = _a.defense, absorbedDamage = _a.absorbedDamage, belt = _a.belt, beltLevel = _a.beltLevel, isBeltUnique = _a.isBeltUnique, isBeltSuperior = _a.isBeltSuperior, shield = _a.shield, shieldLevel = _a.shieldLevel, isShieldUnique = _a.isShieldUnique, isShieldSuperior = _a.isShieldSuperior, partyDefense = _a.partyDefense, cape = _a.cape, capeLevel = _a.capeLevel, isCapeUnique = _a.isCapeUnique, isCapeSuperior = _a.isCapeSuperior, skillDefense = _a.skillDefense;
    var helmDefense = Types.getArmorDefense(helm, helmLevel, isHelmUnique, isHelmSuperior);
    var armorDefense = Types.getArmorDefense(armor, armorLevel, isArmorUnique, isArmorSuperior);
    var beltDefense = Types.getArmorDefense(belt, beltLevel, isBeltUnique, isBeltSuperior);
    var capeDefense = Types.getArmorDefense(cape, capeLevel, isCapeUnique, isCapeSuperior);
    var shieldDefense = Types.getArmorDefense(shield, shieldLevel, isShieldUnique, isShieldSuperior);
    var min = Math.ceil((helmDefense + armorDefense + beltDefense + capeDefense + shieldDefense + defense) * 1.2) +
        absorbedDamage;
    var max = min + Math.ceil(Math.pow(1.075, playerLevel));
    var maxSkillDefense = 0;
    var maxParty = 0;
    if (skillDefense) {
        maxSkillDefense = Math.round((skillDefense / 100) * max);
    }
    if (partyDefense) {
        maxParty = Math.round((partyDefense / 100) * max);
    }
    min = min + maxSkillDefense + maxParty;
    max = max + maxSkillDefense + maxParty;
    return {
        min: min,
        max: max,
    };
};
Formulas.dmgFromMob = function (_a) {
    var weaponLevel = _a.weaponLevel;
    return Math.ceil(weaponLevel * randomInt(12, 16));
};
Formulas.playerDefense = function (_a) {
    var helm = _a.helm, helmLevel = _a.helmLevel, isHelmUnique = _a.isHelmUnique, isHelmSuperior = _a.isHelmSuperior, armor = _a.armor, armorLevel = _a.armorLevel, isArmorUnique = _a.isArmorUnique, isArmorSuperior = _a.isArmorSuperior, playerLevel = _a.playerLevel, defense = _a.defense, absorbedDamage = _a.absorbedDamage, belt = _a.belt, beltLevel = _a.beltLevel, isBeltUnique = _a.isBeltUnique, isBeltSuperior = _a.isBeltSuperior, shield = _a.shield, shieldLevel = _a.shieldLevel, isShieldUnique = _a.isShieldUnique, isShieldSuperior = _a.isShieldSuperior, partyDefense = _a.partyDefense, cape = _a.cape, capeLevel = _a.capeLevel, isCapeUnique = _a.isCapeUnique, isCapeSuperior = _a.isCapeSuperior, skillDefense = _a.skillDefense;
    var _b = Formulas.minMaxDefense({
        helm: helm,
        helmLevel: helmLevel,
        isHelmUnique: isHelmUnique,
        isHelmSuperior: isHelmSuperior,
        armor: armor,
        armorLevel: armorLevel,
        isArmorUnique: isArmorUnique,
        isArmorSuperior: isArmorSuperior,
        playerLevel: playerLevel,
        defense: defense,
        absorbedDamage: absorbedDamage,
        belt: belt,
        beltLevel: beltLevel,
        isBeltUnique: isBeltUnique,
        isBeltSuperior: isBeltSuperior,
        shield: shield,
        shieldLevel: shieldLevel,
        isShieldUnique: isShieldUnique,
        isShieldSuperior: isShieldSuperior,
        partyDefense: partyDefense,
        cape: cape,
        capeLevel: capeLevel,
        isCapeUnique: isCapeUnique,
        isCapeSuperior: isCapeSuperior,
        skillDefense: skillDefense,
    }), min = _b.min, max = _b.max;
    return randomInt(min, max);
};
Formulas.hp = function (_a) {
    var helmLevel = _a.helmLevel, armorLevel = _a.armorLevel, playerLevel = _a.playerLevel, beltLevel = _a.beltLevel, shieldLevel = _a.shieldLevel;
    var baseHp = 80;
    var helmHp = Types.getArmorHealthBonus(helmLevel);
    var armorHp = Types.getArmorHealthBonus(armorLevel);
    var beltHp = Types.getArmorHealthBonus(beltLevel);
    var shieldHp = Types.getArmorHealthBonus(shieldLevel);
    var playerLevelHp = playerLevel * 6;
    return baseHp + helmHp + armorHp + beltHp + shieldHp + playerLevelHp;
};
export default Formulas;
