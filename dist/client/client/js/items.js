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
import { Types } from "../../shared/js/gametypes";
import Item from "./item";
var Items = {
    Sword: (function (_super) {
        __extends(Sword, _super);
        function Sword(id) {
            var _this = _super.call(this, id, Types.Entities.SWORD, "weapon") || this;
            _this.lootMessage = "You pick up a sword";
            return _this;
        }
        return Sword;
    }(Item)),
    Axe: (function (_super) {
        __extends(Axe, _super);
        function Axe(id) {
            var _this = _super.call(this, id, Types.Entities.AXE, "weapon") || this;
            _this.lootMessage = "You pick up an axe";
            return _this;
        }
        return Axe;
    }(Item)),
    MorningStar: (function (_super) {
        __extends(MorningStar, _super);
        function MorningStar(id) {
            var _this = _super.call(this, id, Types.Entities.MORNINGSTAR, "weapon") || this;
            _this.lootMessage = "You pick up a morning star";
            return _this;
        }
        return MorningStar;
    }(Item)),
    BlueAxe: (function (_super) {
        __extends(BlueAxe, _super);
        function BlueAxe(id) {
            var _this = _super.call(this, id, Types.Entities.BLUEAXE, "weapon") || this;
            _this.lootMessage = "You pick up a frozen axe";
            return _this;
        }
        return BlueAxe;
    }(Item)),
    BlueMorningStar: (function (_super) {
        __extends(BlueMorningStar, _super);
        function BlueMorningStar(id) {
            var _this = _super.call(this, id, Types.Entities.BLUEMORNINGSTAR, "weapon") || this;
            _this.lootMessage = "You pick up a frozen morning star";
            return _this;
        }
        return BlueMorningStar;
    }(Item)),
    RedSword: (function (_super) {
        __extends(RedSword, _super);
        function RedSword(id) {
            var _this = _super.call(this, id, Types.Entities.REDSWORD, "weapon") || this;
            _this.lootMessage = "You pick up a blazing sword";
            return _this;
        }
        return RedSword;
    }(Item)),
    BlueSword: (function (_super) {
        __extends(BlueSword, _super);
        function BlueSword(id) {
            var _this = _super.call(this, id, Types.Entities.BLUESWORD, "weapon") || this;
            _this.lootMessage = "You pick up a magic sword";
            return _this;
        }
        return BlueSword;
    }(Item)),
    GoldenSword: (function (_super) {
        __extends(GoldenSword, _super);
        function GoldenSword(id) {
            var _this = _super.call(this, id, Types.Entities.GOLDENSWORD, "weapon") || this;
            _this.lootMessage = "You pick up a golden sword";
            return _this;
        }
        return GoldenSword;
    }(Item)),
    FrozenSword: (function (_super) {
        __extends(FrozenSword, _super);
        function FrozenSword(id) {
            var _this = _super.call(this, id, Types.Entities.FROZENSWORD, "weapon") || this;
            _this.lootMessage = "You pick up a sapphire sword";
            return _this;
        }
        return FrozenSword;
    }(Item)),
    DiamondSword: (function (_super) {
        __extends(DiamondSword, _super);
        function DiamondSword(id) {
            var _this = _super.call(this, id, Types.Entities.DIAMONDSWORD, "weapon") || this;
            _this.lootMessage = "You pick up a diamond sword";
            return _this;
        }
        return DiamondSword;
    }(Item)),
    MinotaurAxe: (function (_super) {
        __extends(MinotaurAxe, _super);
        function MinotaurAxe(id) {
            var _this = _super.call(this, id, Types.Entities.MINOTAURAXE, "weapon") || this;
            _this.lootMessage = "You pick up a minotaur axe";
            return _this;
        }
        return MinotaurAxe;
    }(Item)),
    EmeraldSword: (function (_super) {
        __extends(EmeraldSword, _super);
        function EmeraldSword(id) {
            var _this = _super.call(this, id, Types.Entities.EMERALDSWORD, "weapon") || this;
            _this.lootMessage = "You pick up an emerald sword";
            return _this;
        }
        return EmeraldSword;
    }(Item)),
    MoonSword: (function (_super) {
        __extends(MoonSword, _super);
        function MoonSword(id) {
            var _this = _super.call(this, id, Types.Entities.MOONSWORD, "weapon") || this;
            _this.lootMessage = "You pick up a moon sword";
            return _this;
        }
        return MoonSword;
    }(Item)),
    ChristmasSword: (function (_super) {
        __extends(ChristmasSword, _super);
        function ChristmasSword(id) {
            var _this = _super.call(this, id, Types.Entities.CHRISTMASSWORD, "weapon") || this;
            _this.lootMessage = "You pick up a christmas sword";
            return _this;
        }
        return ChristmasSword;
    }(Item)),
    MoonHachet: (function (_super) {
        __extends(MoonHachet, _super);
        function MoonHachet(id) {
            var _this = _super.call(this, id, Types.Entities.MOONHACHET, "weapon") || this;
            _this.lootMessage = "You pick up a moon hatchet";
            return _this;
        }
        return MoonHachet;
    }(Item)),
    ChristmasHachet: (function (_super) {
        __extends(ChristmasHachet, _super);
        function ChristmasHachet(id) {
            var _this = _super.call(this, id, Types.Entities.CHRISTMASHACHET, "weapon") || this;
            _this.lootMessage = "You pick up a christmas hatchet";
            return _this;
        }
        return ChristmasHachet;
    }(Item)),
    MoonMaul: (function (_super) {
        __extends(MoonMaul, _super);
        function MoonMaul(id) {
            var _this = _super.call(this, id, Types.Entities.MOONMAUL, "weapon") || this;
            _this.lootMessage = "You pick up a moon maul";
            return _this;
        }
        return MoonMaul;
    }(Item)),
    ChristmasMaul: (function (_super) {
        __extends(ChristmasMaul, _super);
        function ChristmasMaul(id) {
            var _this = _super.call(this, id, Types.Entities.CHRISTMASMAUL, "weapon") || this;
            _this.lootMessage = "You pick up a christmas maul";
            return _this;
        }
        return ChristmasMaul;
    }(Item)),
    DemonMaul: (function (_super) {
        __extends(DemonMaul, _super);
        function DemonMaul(id) {
            var _this = _super.call(this, id, Types.Entities.DEMONMAUL, "weapon") || this;
            _this.lootMessage = "You pick up a demon maul";
            return _this;
        }
        return DemonMaul;
    }(Item)),
    TemplarSword: (function (_super) {
        __extends(TemplarSword, _super);
        function TemplarSword(id) {
            var _this = _super.call(this, id, Types.Entities.TEMPLARSWORD, "weapon") || this;
            _this.lootMessage = "You pick up a templar sword";
            return _this;
        }
        return TemplarSword;
    }(Item)),
    SpikeGlaive: (function (_super) {
        __extends(SpikeGlaive, _super);
        function SpikeGlaive(id) {
            var _this = _super.call(this, id, Types.Entities.SPIKEGLAIVE, "weapon") || this;
            _this.lootMessage = "You pick up a spike glaive";
            return _this;
        }
        return SpikeGlaive;
    }(Item)),
    EclypseDagger: (function (_super) {
        __extends(EclypseDagger, _super);
        function EclypseDagger(id) {
            var _this = _super.call(this, id, Types.Entities.ECLYPSEDAGGER, "weapon") || this;
            _this.lootMessage = "You pick up an eclypse dagger";
            return _this;
        }
        return EclypseDagger;
    }(Item)),
    DemonAxe: (function (_super) {
        __extends(DemonAxe, _super);
        function DemonAxe(id) {
            var _this = _super.call(this, id, Types.Entities.DEMONAXE, "weapon") || this;
            _this.lootMessage = "You pick up a demon axe";
            return _this;
        }
        return DemonAxe;
    }(Item)),
    DemonSickle: (function (_super) {
        __extends(DemonSickle, _super);
        function DemonSickle(id) {
            var _this = _super.call(this, id, Types.Entities.DEMONSICKLE, "weapon") || this;
            _this.lootMessage = "You pick up a demon sickle";
            return _this;
        }
        return DemonSickle;
    }(Item)),
    PaladinAxe: (function (_super) {
        __extends(PaladinAxe, _super);
        function PaladinAxe(id) {
            var _this = _super.call(this, id, Types.Entities.PALADINAXE, "weapon") || this;
            _this.lootMessage = "You pick up a paladin axe";
            return _this;
        }
        return PaladinAxe;
    }(Item)),
    ImmortalDagger: (function (_super) {
        __extends(ImmortalDagger, _super);
        function ImmortalDagger(id) {
            var _this = _super.call(this, id, Types.Entities.IMMORTALDAGGER, "weapon") || this;
            _this.lootMessage = "You pick up an immortal dagger";
            return _this;
        }
        return ImmortalDagger;
    }(Item)),
    ImmortalSword: (function (_super) {
        __extends(ImmortalSword, _super);
        function ImmortalSword(id) {
            var _this = _super.call(this, id, Types.Entities.IMMORTALSWORD, "weapon") || this;
            _this.lootMessage = "You pick up an immortal sword";
            return _this;
        }
        return ImmortalSword;
    }(Item)),
    ImmortalAxe: (function (_super) {
        __extends(ImmortalAxe, _super);
        function ImmortalAxe(id) {
            var _this = _super.call(this, id, Types.Entities.IMMORTALAXE, "weapon") || this;
            _this.lootMessage = "You pick up Immortarion, the Timeless Cleaver";
            return _this;
        }
        return ImmortalAxe;
    }(Item)),
    ExecutionerSword: (function (_super) {
        __extends(ExecutionerSword, _super);
        function ExecutionerSword(id) {
            var _this = _super.call(this, id, Types.Entities.EXECUTIONERSWORD, "weapon") || this;
            _this.lootMessage = "You pick up an executioner sword";
            return _this;
        }
        return ExecutionerSword;
    }(Item)),
    MysticalSword: (function (_super) {
        __extends(MysticalSword, _super);
        function MysticalSword(id) {
            var _this = _super.call(this, id, Types.Entities.MYSTICALSWORD, "weapon") || this;
            _this.lootMessage = "You pick up a mystical sword";
            return _this;
        }
        return MysticalSword;
    }(Item)),
    MysticalDagger: (function (_super) {
        __extends(MysticalDagger, _super);
        function MysticalDagger(id) {
            var _this = _super.call(this, id, Types.Entities.MYSTICALDAGGER, "weapon") || this;
            _this.lootMessage = "You pick up a mystical dagger";
            return _this;
        }
        return MysticalDagger;
    }(Item)),
    DragonSword: (function (_super) {
        __extends(DragonSword, _super);
        function DragonSword(id) {
            var _this = _super.call(this, id, Types.Entities.DRAGONSWORD, "weapon") || this;
            _this.lootMessage = "You pick up a dragon sword";
            return _this;
        }
        return DragonSword;
    }(Item)),
    HellHammer: (function (_super) {
        __extends(HellHammer, _super);
        function HellHammer(id) {
            var _this = _super.call(this, id, Types.Entities.HELLHAMMER, "weapon") || this;
            _this.lootMessage = "You pick up a hell hammer";
            return _this;
        }
        return HellHammer;
    }(Item)),
    Maul: (function (_super) {
        __extends(Maul, _super);
        function Maul(id) {
            var _this = _super.call(this, id, Types.Entities.MAUL, "weapon") || this;
            _this.lootMessage = "You pick up a Maul";
            return _this;
        }
        return Maul;
    }(Item)),
    WizardSword: (function (_super) {
        __extends(WizardSword, _super);
        function WizardSword(id) {
            var _this = _super.call(this, id, Types.Entities.WIZARDSWORD, "weapon") || this;
            _this.lootMessage = "You pick up a Wizard sword";
            return _this;
        }
        return WizardSword;
    }(Item)),
    HelmLeather: (function (_super) {
        __extends(HelmLeather, _super);
        function HelmLeather(id) {
            var _this = _super.call(this, id, Types.Entities.HELMLEATHER, "helm") || this;
            _this.lootMessage = "You pick up a leather helm";
            return _this;
        }
        return HelmLeather;
    }(Item)),
    HelmMail: (function (_super) {
        __extends(HelmMail, _super);
        function HelmMail(id) {
            var _this = _super.call(this, id, Types.Entities.HELMMAIL, "helm") || this;
            _this.lootMessage = "You pick up a mail helm";
            return _this;
        }
        return HelmMail;
    }(Item)),
    HelmPlate: (function (_super) {
        __extends(HelmPlate, _super);
        function HelmPlate(id) {
            var _this = _super.call(this, id, Types.Entities.HELMPLATE, "helm") || this;
            _this.lootMessage = "You pick up a plate helm";
            return _this;
        }
        return HelmPlate;
    }(Item)),
    HelmRed: (function (_super) {
        __extends(HelmRed, _super);
        function HelmRed(id) {
            var _this = _super.call(this, id, Types.Entities.HELMRED, "helm") || this;
            _this.lootMessage = "You pick up a ruby helm";
            return _this;
        }
        return HelmRed;
    }(Item)),
    HelmGolden: (function (_super) {
        __extends(HelmGolden, _super);
        function HelmGolden(id) {
            var _this = _super.call(this, id, Types.Entities.HELMGOLDEN, "helm") || this;
            _this.lootMessage = "You pick up a golden helm";
            return _this;
        }
        return HelmGolden;
    }(Item)),
    HelmBlue: (function (_super) {
        __extends(HelmBlue, _super);
        function HelmBlue(id) {
            var _this = _super.call(this, id, Types.Entities.HELMBLUE, "helm") || this;
            _this.lootMessage = "You pick up a frozen helm";
            return _this;
        }
        return HelmBlue;
    }(Item)),
    HelmHorned: (function (_super) {
        __extends(HelmHorned, _super);
        function HelmHorned(id) {
            var _this = _super.call(this, id, Types.Entities.HELMHORNED, "helm") || this;
            _this.lootMessage = "You pick up a horned helm";
            return _this;
        }
        return HelmHorned;
    }(Item)),
    HelmFrozen: (function (_super) {
        __extends(HelmFrozen, _super);
        function HelmFrozen(id) {
            var _this = _super.call(this, id, Types.Entities.HELMFROZEN, "helm") || this;
            _this.lootMessage = "You pick up a sapphire helm";
            return _this;
        }
        return HelmFrozen;
    }(Item)),
    HelmDiamond: (function (_super) {
        __extends(HelmDiamond, _super);
        function HelmDiamond(id) {
            var _this = _super.call(this, id, Types.Entities.HELMDIAMOND, "helm") || this;
            _this.lootMessage = "You pick up a diamond helm";
            return _this;
        }
        return HelmDiamond;
    }(Item)),
    HelmEmerald: (function (_super) {
        __extends(HelmEmerald, _super);
        function HelmEmerald(id) {
            var _this = _super.call(this, id, Types.Entities.HELMEMERALD, "helm") || this;
            _this.lootMessage = "You pick up an emerald helm";
            return _this;
        }
        return HelmEmerald;
    }(Item)),
    HelmExecutioner: (function (_super) {
        __extends(HelmExecutioner, _super);
        function HelmExecutioner(id) {
            var _this = _super.call(this, id, Types.Entities.HELMEXECUTIONER, "helm") || this;
            _this.lootMessage = "You pick up an executioner helm";
            return _this;
        }
        return HelmExecutioner;
    }(Item)),
    HelmTemplar: (function (_super) {
        __extends(HelmTemplar, _super);
        function HelmTemplar(id) {
            var _this = _super.call(this, id, Types.Entities.HELMTEMPLAR, "helm") || this;
            _this.lootMessage = "You pick up a templar helm";
            return _this;
        }
        return HelmTemplar;
    }(Item)),
    HelmDragon: (function (_super) {
        __extends(HelmDragon, _super);
        function HelmDragon(id) {
            var _this = _super.call(this, id, Types.Entities.HELMDRAGON, "helm") || this;
            _this.lootMessage = "You pick up a dragon helm";
            return _this;
        }
        return HelmDragon;
    }(Item)),
    HelmMoon: (function (_super) {
        __extends(HelmMoon, _super);
        function HelmMoon(id) {
            var _this = _super.call(this, id, Types.Entities.HELMMOON, "helm") || this;
            _this.lootMessage = "You pick up a moon helm";
            return _this;
        }
        return HelmMoon;
    }(Item)),
    HelmChristmas: (function (_super) {
        __extends(HelmChristmas, _super);
        function HelmChristmas(id) {
            var _this = _super.call(this, id, Types.Entities.HELMCHRISTMAS, "helm") || this;
            _this.lootMessage = "You pick up a christmas helm";
            return _this;
        }
        return HelmChristmas;
    }(Item)),
    HelmDemon: (function (_super) {
        __extends(HelmDemon, _super);
        function HelmDemon(id) {
            var _this = _super.call(this, id, Types.Entities.HELMDEMON, "helm") || this;
            _this.lootMessage = "You pick up a demon helm";
            return _this;
        }
        return HelmDemon;
    }(Item)),
    HelmMystical: (function (_super) {
        __extends(HelmMystical, _super);
        function HelmMystical(id) {
            var _this = _super.call(this, id, Types.Entities.HELMMYSTICAL, "helm") || this;
            _this.lootMessage = "You pick up a mystical helm";
            return _this;
        }
        return HelmMystical;
    }(Item)),
    HelmImmortal: (function (_super) {
        __extends(HelmImmortal, _super);
        function HelmImmortal(id) {
            var _this = _super.call(this, id, Types.Entities.HELMIMMORTAL, "helm") || this;
            _this.lootMessage = "You pick up an immortal helm";
            return _this;
        }
        return HelmImmortal;
    }(Item)),
    HelmPaladin: (function (_super) {
        __extends(HelmPaladin, _super);
        function HelmPaladin(id) {
            var _this = _super.call(this, id, Types.Entities.HELMPALADIN, "helm") || this;
            _this.lootMessage = "You pick up a paladin helm";
            return _this;
        }
        return HelmPaladin;
    }(Item)),
    HelmClown: (function (_super) {
        __extends(HelmClown, _super);
        function HelmClown(id) {
            var _this = _super.call(this, id, Types.Entities.HELMCLOWN, "helm") || this;
            _this.lootMessage = "You pick up a clown helm";
            return _this;
        }
        return HelmClown;
    }(Item)),
    HelmPumkin: (function (_super) {
        __extends(HelmPumkin, _super);
        function HelmPumkin(id) {
            var _this = _super.call(this, id, Types.Entities.HELMPUMKIN, "helm") || this;
            _this.lootMessage = "You pick up a pumpkin helm";
            return _this;
        }
        return HelmPumkin;
    }(Item)),
    LeatherArmor: (function (_super) {
        __extends(LeatherArmor, _super);
        function LeatherArmor(id) {
            var _this = _super.call(this, id, Types.Entities.LEATHERARMOR, "armor") || this;
            _this.lootMessage = "You pick up a leather armor";
            return _this;
        }
        return LeatherArmor;
    }(Item)),
    MailArmor: (function (_super) {
        __extends(MailArmor, _super);
        function MailArmor(id) {
            var _this = _super.call(this, id, Types.Entities.MAILARMOR, "armor") || this;
            _this.lootMessage = "You pick up a mail armor";
            return _this;
        }
        return MailArmor;
    }(Item)),
    PlateArmor: (function (_super) {
        __extends(PlateArmor, _super);
        function PlateArmor(id) {
            var _this = _super.call(this, id, Types.Entities.PLATEARMOR, "armor") || this;
            _this.lootMessage = "You pick up a plate armor";
            return _this;
        }
        return PlateArmor;
    }(Item)),
    RedArmor: (function (_super) {
        __extends(RedArmor, _super);
        function RedArmor(id) {
            var _this = _super.call(this, id, Types.Entities.REDARMOR, "armor") || this;
            _this.lootMessage = "You pick up a ruby armor";
            return _this;
        }
        return RedArmor;
    }(Item)),
    GoldenArmor: (function (_super) {
        __extends(GoldenArmor, _super);
        function GoldenArmor(id) {
            var _this = _super.call(this, id, Types.Entities.GOLDENARMOR, "armor") || this;
            _this.lootMessage = "You pick up a golden armor";
            return _this;
        }
        return GoldenArmor;
    }(Item)),
    BlueArmor: (function (_super) {
        __extends(BlueArmor, _super);
        function BlueArmor(id) {
            var _this = _super.call(this, id, Types.Entities.BLUEARMOR, "armor") || this;
            _this.lootMessage = "You pick up a frozen armor";
            return _this;
        }
        return BlueArmor;
    }(Item)),
    HornedArmor: (function (_super) {
        __extends(HornedArmor, _super);
        function HornedArmor(id) {
            var _this = _super.call(this, id, Types.Entities.HORNEDARMOR, "armor") || this;
            _this.lootMessage = "You pick up a horned armor";
            return _this;
        }
        return HornedArmor;
    }(Item)),
    FrozenArmor: (function (_super) {
        __extends(FrozenArmor, _super);
        function FrozenArmor(id) {
            var _this = _super.call(this, id, Types.Entities.FROZENARMOR, "armor") || this;
            _this.lootMessage = "You pick up a sapphire armor";
            return _this;
        }
        return FrozenArmor;
    }(Item)),
    DiamondArmor: (function (_super) {
        __extends(DiamondArmor, _super);
        function DiamondArmor(id) {
            var _this = _super.call(this, id, Types.Entities.DIAMONDARMOR, "armor") || this;
            _this.lootMessage = "You pick up a diamond armor";
            return _this;
        }
        return DiamondArmor;
    }(Item)),
    EmeraldArmor: (function (_super) {
        __extends(EmeraldArmor, _super);
        function EmeraldArmor(id) {
            var _this = _super.call(this, id, Types.Entities.EMERALDARMOR, "armor") || this;
            _this.lootMessage = "You pick up an emerald armor";
            return _this;
        }
        return EmeraldArmor;
    }(Item)),
    TemplarArmor: (function (_super) {
        __extends(TemplarArmor, _super);
        function TemplarArmor(id) {
            var _this = _super.call(this, id, Types.Entities.TEMPLARARMOR, "armor") || this;
            _this.lootMessage = "You pick up a templar armor";
            return _this;
        }
        return TemplarArmor;
    }(Item)),
    DragonArmor: (function (_super) {
        __extends(DragonArmor, _super);
        function DragonArmor(id) {
            var _this = _super.call(this, id, Types.Entities.DRAGONARMOR, "armor") || this;
            _this.lootMessage = "You pick up a dragon armor";
            return _this;
        }
        return DragonArmor;
    }(Item)),
    MoonArmor: (function (_super) {
        __extends(MoonArmor, _super);
        function MoonArmor(id) {
            var _this = _super.call(this, id, Types.Entities.MOONARMOR, "armor") || this;
            _this.lootMessage = "You pick up a moon armor";
            return _this;
        }
        return MoonArmor;
    }(Item)),
    ChristmasArmor: (function (_super) {
        __extends(ChristmasArmor, _super);
        function ChristmasArmor(id) {
            var _this = _super.call(this, id, Types.Entities.CHRISTMASARMOR, "armor") || this;
            _this.lootMessage = "You pick up a christmas armor";
            return _this;
        }
        return ChristmasArmor;
    }(Item)),
    DemonArmor: (function (_super) {
        __extends(DemonArmor, _super);
        function DemonArmor(id) {
            var _this = _super.call(this, id, Types.Entities.DEMONARMOR, "armor") || this;
            _this.lootMessage = "You pick up a demon armor";
            return _this;
        }
        return DemonArmor;
    }(Item)),
    MysticalArmor: (function (_super) {
        __extends(MysticalArmor, _super);
        function MysticalArmor(id) {
            var _this = _super.call(this, id, Types.Entities.MYSTICALARMOR, "armor") || this;
            _this.lootMessage = "You pick up a mystical armor";
            return _this;
        }
        return MysticalArmor;
    }(Item)),
    ImmortalArmor: (function (_super) {
        __extends(ImmortalArmor, _super);
        function ImmortalArmor(id) {
            var _this = _super.call(this, id, Types.Entities.IMMORTALARMOR, "armor") || this;
            _this.lootMessage = "You pick up an immortal armor";
            return _this;
        }
        return ImmortalArmor;
    }(Item)),
    PaladinArmor: (function (_super) {
        __extends(PaladinArmor, _super);
        function PaladinArmor(id) {
            var _this = _super.call(this, id, Types.Entities.PALADINARMOR, "armor") || this;
            _this.lootMessage = "You pick up a paladin armor";
            return _this;
        }
        return PaladinArmor;
    }(Item)),
    BeltLeather: (function (_super) {
        __extends(BeltLeather, _super);
        function BeltLeather(id) {
            var _this = _super.call(this, id, Types.Entities.BELTLEATHER, "belt") || this;
            _this.lootMessage = "You pick up a leather belt";
            return _this;
        }
        return BeltLeather;
    }(Item)),
    BeltPlated: (function (_super) {
        __extends(BeltPlated, _super);
        function BeltPlated(id) {
            var _this = _super.call(this, id, Types.Entities.BELTPLATED, "belt") || this;
            _this.lootMessage = "You pick up a plated belt";
            return _this;
        }
        return BeltPlated;
    }(Item)),
    BeltFrozen: (function (_super) {
        __extends(BeltFrozen, _super);
        function BeltFrozen(id) {
            var _this = _super.call(this, id, Types.Entities.BELTFROZEN, "belt") || this;
            _this.lootMessage = "You pick up a sapphire belt";
            return _this;
        }
        return BeltFrozen;
    }(Item)),
    BeltHorned: (function (_super) {
        __extends(BeltHorned, _super);
        function BeltHorned(id) {
            var _this = _super.call(this, id, Types.Entities.BELTHORNED, "belt") || this;
            _this.lootMessage = "You pick up a horned belt";
            return _this;
        }
        return BeltHorned;
    }(Item)),
    BeltDiamond: (function (_super) {
        __extends(BeltDiamond, _super);
        function BeltDiamond(id) {
            var _this = _super.call(this, id, Types.Entities.BELTDIAMOND, "belt") || this;
            _this.lootMessage = "You pick up a diamond belt";
            return _this;
        }
        return BeltDiamond;
    }(Item)),
    BeltMinotaur: (function (_super) {
        __extends(BeltMinotaur, _super);
        function BeltMinotaur(id) {
            var _this = _super.call(this, id, Types.Entities.BELTMINOTAUR, "belt") || this;
            _this.lootMessage = "You pick up a minotaur belt";
            return _this;
        }
        return BeltMinotaur;
    }(Item)),
    BeltEmerald: (function (_super) {
        __extends(BeltEmerald, _super);
        function BeltEmerald(id) {
            var _this = _super.call(this, id, Types.Entities.BELTEMERALD, "belt") || this;
            _this.lootMessage = "You pick up an emerald belt";
            return _this;
        }
        return BeltEmerald;
    }(Item)),
    BeltExecutioner: (function (_super) {
        __extends(BeltExecutioner, _super);
        function BeltExecutioner(id) {
            var _this = _super.call(this, id, Types.Entities.BELTEXECUTIONER, "belt") || this;
            _this.lootMessage = "You pick up an executioner belt";
            return _this;
        }
        return BeltExecutioner;
    }(Item)),
    BeltTemplar: (function (_super) {
        __extends(BeltTemplar, _super);
        function BeltTemplar(id) {
            var _this = _super.call(this, id, Types.Entities.BELTTEMPLAR, "belt") || this;
            _this.lootMessage = "You pick up a templar belt";
            return _this;
        }
        return BeltTemplar;
    }(Item)),
    BeltDemon: (function (_super) {
        __extends(BeltDemon, _super);
        function BeltDemon(id) {
            var _this = _super.call(this, id, Types.Entities.BELTDEMON, "belt") || this;
            _this.lootMessage = "You pick up a demon belt";
            return _this;
        }
        return BeltDemon;
    }(Item)),
    BeltMoon: (function (_super) {
        __extends(BeltMoon, _super);
        function BeltMoon(id) {
            var _this = _super.call(this, id, Types.Entities.BELTMOON, "belt") || this;
            _this.lootMessage = "You pick up a moon belt";
            return _this;
        }
        return BeltMoon;
    }(Item)),
    BeltChristmas: (function (_super) {
        __extends(BeltChristmas, _super);
        function BeltChristmas(id) {
            var _this = _super.call(this, id, Types.Entities.BELTCHRISTMAS, "belt") || this;
            _this.lootMessage = "You pick up a christmas belt";
            return _this;
        }
        return BeltChristmas;
    }(Item)),
    BeltMystical: (function (_super) {
        __extends(BeltMystical, _super);
        function BeltMystical(id) {
            var _this = _super.call(this, id, Types.Entities.BELTMYSTICAL, "belt") || this;
            _this.lootMessage = "You pick up a mystical belt";
            return _this;
        }
        return BeltMystical;
    }(Item)),
    BeltPaladin: (function (_super) {
        __extends(BeltPaladin, _super);
        function BeltPaladin(id) {
            var _this = _super.call(this, id, Types.Entities.BELTPALADIN, "belt") || this;
            _this.lootMessage = "You pick up a paladin belt";
            return _this;
        }
        return BeltPaladin;
    }(Item)),
    BeltImmortal: (function (_super) {
        __extends(BeltImmortal, _super);
        function BeltImmortal(id) {
            var _this = _super.call(this, id, Types.Entities.BELTIMMORTAL, "belt") || this;
            _this.lootMessage = "You pick up an immortal belt";
            return _this;
        }
        return BeltImmortal;
    }(Item)),
    BeltGoldwrap: (function (_super) {
        __extends(BeltGoldwrap, _super);
        function BeltGoldwrap(id) {
            var _this = _super.call(this, id, Types.Entities.BELTGOLDWRAP, "belt") || this;
            _this.lootMessage = "You pick up a goldwrap";
            return _this;
        }
        return BeltGoldwrap;
    }(Item)),
    Cape: (function (_super) {
        __extends(Cape, _super);
        function Cape(id) {
            var _this = _super.call(this, id, Types.Entities.CAPE, "cape") || this;
            _this.lootMessage = "You pick up a cape";
            return _this;
        }
        return Cape;
    }(Item)),
    ShieldWood: (function (_super) {
        __extends(ShieldWood, _super);
        function ShieldWood(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDWOOD, "shield") || this;
            _this.lootMessage = "You pick up a wood shield";
            return _this;
        }
        return ShieldWood;
    }(Item)),
    ShieldIron: (function (_super) {
        __extends(ShieldIron, _super);
        function ShieldIron(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDIRON, "shield") || this;
            _this.lootMessage = "You pick up an iron shield";
            return _this;
        }
        return ShieldIron;
    }(Item)),
    ShieldPlate: (function (_super) {
        __extends(ShieldPlate, _super);
        function ShieldPlate(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDPLATE, "shield") || this;
            _this.lootMessage = "You pick up a plate shield";
            return _this;
        }
        return ShieldPlate;
    }(Item)),
    ShieldRed: (function (_super) {
        __extends(ShieldRed, _super);
        function ShieldRed(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDRED, "shield") || this;
            _this.lootMessage = "You pick up a red shield";
            return _this;
        }
        return ShieldRed;
    }(Item)),
    ShieldGolden: (function (_super) {
        __extends(ShieldGolden, _super);
        function ShieldGolden(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDGOLDEN, "shield") || this;
            _this.lootMessage = "You pick up a golden shield";
            return _this;
        }
        return ShieldGolden;
    }(Item)),
    ShieldBlue: (function (_super) {
        __extends(ShieldBlue, _super);
        function ShieldBlue(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDBLUE, "shield") || this;
            _this.lootMessage = "You pick up a frozen shield";
            return _this;
        }
        return ShieldBlue;
    }(Item)),
    ShieldHorned: (function (_super) {
        __extends(ShieldHorned, _super);
        function ShieldHorned(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDHORNED, "shield") || this;
            _this.lootMessage = "You pick up a horned shield";
            return _this;
        }
        return ShieldHorned;
    }(Item)),
    ShieldFrozen: (function (_super) {
        __extends(ShieldFrozen, _super);
        function ShieldFrozen(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDFROZEN, "shield") || this;
            _this.lootMessage = "You pick up a sapphire shield";
            return _this;
        }
        return ShieldFrozen;
    }(Item)),
    ShieldDiamond: (function (_super) {
        __extends(ShieldDiamond, _super);
        function ShieldDiamond(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDDIAMOND, "shield") || this;
            _this.lootMessage = "You pick up a diamond shield";
            return _this;
        }
        return ShieldDiamond;
    }(Item)),
    ShieldEmerald: (function (_super) {
        __extends(ShieldEmerald, _super);
        function ShieldEmerald(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDEMERALD, "shield") || this;
            _this.lootMessage = "You pick up an emerald shield";
            return _this;
        }
        return ShieldEmerald;
    }(Item)),
    ShieldTemplar: (function (_super) {
        __extends(ShieldTemplar, _super);
        function ShieldTemplar(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDTEMPLAR, "shield") || this;
            _this.lootMessage = "You pick up a templar shield";
            return _this;
        }
        return ShieldTemplar;
    }(Item)),
    ShieldExecutioner: (function (_super) {
        __extends(ShieldExecutioner, _super);
        function ShieldExecutioner(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDEXECUTIONER, "shield") || this;
            _this.lootMessage = "You pick up an executioner shield";
            return _this;
        }
        return ShieldExecutioner;
    }(Item)),
    ShieldDragon: (function (_super) {
        __extends(ShieldDragon, _super);
        function ShieldDragon(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDDRAGON, "shield") || this;
            _this.lootMessage = "You pick up a dragon shield";
            return _this;
        }
        return ShieldDragon;
    }(Item)),
    ShieldMoon: (function (_super) {
        __extends(ShieldMoon, _super);
        function ShieldMoon(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDMOON, "shield") || this;
            _this.lootMessage = "You pick up a moon shield";
            return _this;
        }
        return ShieldMoon;
    }(Item)),
    ShieldChristmas: (function (_super) {
        __extends(ShieldChristmas, _super);
        function ShieldChristmas(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDCHRISTMAS, "shield") || this;
            _this.lootMessage = "You pick up a christmas shield";
            return _this;
        }
        return ShieldChristmas;
    }(Item)),
    ShieldMystical: (function (_super) {
        __extends(ShieldMystical, _super);
        function ShieldMystical(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDMYSTICAL, "shield") || this;
            _this.lootMessage = "You pick up a mystical shield";
            return _this;
        }
        return ShieldMystical;
    }(Item)),
    ShieldDemon: (function (_super) {
        __extends(ShieldDemon, _super);
        function ShieldDemon(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDDEMON, "shield") || this;
            _this.lootMessage = "You pick up a demon shield";
            return _this;
        }
        return ShieldDemon;
    }(Item)),
    ShieldPaladin: (function (_super) {
        __extends(ShieldPaladin, _super);
        function ShieldPaladin(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDPALADIN, "shield") || this;
            _this.lootMessage = "You pick up a paladin shield";
            return _this;
        }
        return ShieldPaladin;
    }(Item)),
    ShieldImmortal: (function (_super) {
        __extends(ShieldImmortal, _super);
        function ShieldImmortal(id) {
            var _this = _super.call(this, id, Types.Entities.SHIELDIMMORTAL, "shield") || this;
            _this.lootMessage = "You pick up an immortal shield";
            return _this;
        }
        return ShieldImmortal;
    }(Item)),
    Flask: (function (_super) {
        __extends(Flask, _super);
        function Flask(id) {
            var _this = _super.call(this, id, Types.Entities.FLASK, "object") || this;
            _this.lootMessage = "You drink a health potion";
            return _this;
        }
        return Flask;
    }(Item)),
    RejuvenationPotion: (function (_super) {
        __extends(RejuvenationPotion, _super);
        function RejuvenationPotion(id) {
            var _this = _super.call(this, id, Types.Entities.REJUVENATIONPOTION, "object") || this;
            _this.lootMessage = "You drink a rejuvenation potion";
            return _this;
        }
        return RejuvenationPotion;
    }(Item)),
    PoisonPotion: (function (_super) {
        __extends(PoisonPotion, _super);
        function PoisonPotion(id) {
            var _this = _super.call(this, id, Types.Entities.POISONPOTION, "object") || this;
            _this.lootMessage = "You drink a poisonous potion";
            return _this;
        }
        return PoisonPotion;
    }(Item)),
    NanoPotion: (function (_super) {
        __extends(NanoPotion, _super);
        function NanoPotion(id) {
            var _this = _super.call(this, id, Types.Entities.NANOPOTION, "object") || this;
            _this.lootMessage = "You drink a NANO potion";
            return _this;
        }
        return NanoPotion;
    }(Item)),
    BananoPotion: (function (_super) {
        __extends(BananoPotion, _super);
        function BananoPotion(id) {
            var _this = _super.call(this, id, Types.Entities.BANANOPOTION, "object") || this;
            _this.lootMessage = "You drink a BANANO potion";
            return _this;
        }
        return BananoPotion;
    }(Item)),
    RuneSat: (function (_super) {
        __extends(RuneSat, _super);
        function RuneSat(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.SAT, "rune") || this;
            _this.lootMessage = "You pick up a SAT Rune";
            return _this;
        }
        return RuneSat;
    }(Item)),
    RuneAl: (function (_super) {
        __extends(RuneAl, _super);
        function RuneAl(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.AL, "rune") || this;
            _this.lootMessage = "You pick up an AL Rune";
            return _this;
        }
        return RuneAl;
    }(Item)),
    RuneBul: (function (_super) {
        __extends(RuneBul, _super);
        function RuneBul(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.BUL, "rune") || this;
            _this.lootMessage = "You pick up a BUL Rune";
            return _this;
        }
        return RuneBul;
    }(Item)),
    RuneNan: (function (_super) {
        __extends(RuneNan, _super);
        function RuneNan(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.NAN, "rune") || this;
            _this.lootMessage = "You pick up a NAN Rune";
            return _this;
        }
        return RuneNan;
    }(Item)),
    RuneMir: (function (_super) {
        __extends(RuneMir, _super);
        function RuneMir(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.MIR, "rune") || this;
            _this.lootMessage = "You pick up a MIR Rune";
            return _this;
        }
        return RuneMir;
    }(Item)),
    RuneGel: (function (_super) {
        __extends(RuneGel, _super);
        function RuneGel(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.GEL, "rune") || this;
            _this.lootMessage = "You pick up a GEL Rune";
            return _this;
        }
        return RuneGel;
    }(Item)),
    RuneDo: (function (_super) {
        __extends(RuneDo, _super);
        function RuneDo(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.DO, "rune") || this;
            _this.lootMessage = "You pick up a DO Rune";
            return _this;
        }
        return RuneDo;
    }(Item)),
    RuneBan: (function (_super) {
        __extends(RuneBan, _super);
        function RuneBan(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.BAN, "rune") || this;
            _this.lootMessage = "You pick up a BAN Rune";
            return _this;
        }
        return RuneBan;
    }(Item)),
    RuneSol: (function (_super) {
        __extends(RuneSol, _super);
        function RuneSol(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.SOL, "rune") || this;
            _this.lootMessage = "You pick up a SOL Rune";
            return _this;
        }
        return RuneSol;
    }(Item)),
    RuneUm: (function (_super) {
        __extends(RuneUm, _super);
        function RuneUm(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.UM, "rune") || this;
            _this.lootMessage = "You pick up an UM Rune";
            return _this;
        }
        return RuneUm;
    }(Item)),
    RuneHex: (function (_super) {
        __extends(RuneHex, _super);
        function RuneHex(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.HEX, "rune") || this;
            _this.lootMessage = "You pick up a HEX Rune";
            return _this;
        }
        return RuneHex;
    }(Item)),
    RuneZal: (function (_super) {
        __extends(RuneZal, _super);
        function RuneZal(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.ZAL, "rune") || this;
            _this.lootMessage = "You pick up a ZAL Rune";
            return _this;
        }
        return RuneZal;
    }(Item)),
    RuneVie: (function (_super) {
        __extends(RuneVie, _super);
        function RuneVie(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.VIE, "rune") || this;
            _this.lootMessage = "You pick up a VIE Rune";
            return _this;
        }
        return RuneVie;
    }(Item)),
    RuneEth: (function (_super) {
        __extends(RuneEth, _super);
        function RuneEth(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.ETH, "rune") || this;
            _this.lootMessage = "You pick up an ETH Rune";
            return _this;
        }
        return RuneEth;
    }(Item)),
    RuneBtc: (function (_super) {
        __extends(RuneBtc, _super);
        function RuneBtc(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.BTC, "rune") || this;
            _this.lootMessage = "You pick up a BTC Rune";
            return _this;
        }
        return RuneBtc;
    }(Item)),
    RuneVax: (function (_super) {
        __extends(RuneVax, _super);
        function RuneVax(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.VAX, "rune") || this;
            _this.lootMessage = "You pick up a VAX Rune";
            return _this;
        }
        return RuneVax;
    }(Item)),
    RunePor: (function (_super) {
        __extends(RunePor, _super);
        function RunePor(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.POR, "rune") || this;
            _this.lootMessage = "You pick up a POR Rune";
            return _this;
        }
        return RunePor;
    }(Item)),
    RuneLas: (function (_super) {
        __extends(RuneLas, _super);
        function RuneLas(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.LAS, "rune") || this;
            _this.lootMessage = "You pick up a LAS Rune";
            return _this;
        }
        return RuneLas;
    }(Item)),
    RuneCham: (function (_super) {
        __extends(RuneCham, _super);
        function RuneCham(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.CHAM, "rune") || this;
            _this.lootMessage = "You pick up a CHAM Rune";
            return _this;
        }
        return RuneCham;
    }(Item)),
    RuneDur: (function (_super) {
        __extends(RuneDur, _super);
        function RuneDur(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.DUR, "rune") || this;
            _this.lootMessage = "You pick up a DUR Rune";
            return _this;
        }
        return RuneDur;
    }(Item)),
    RuneXno: (function (_super) {
        __extends(RuneXno, _super);
        function RuneXno(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.XNO, "rune") || this;
            _this.lootMessage = "You pick up a XNO Rune";
            return _this;
        }
        return RuneXno;
    }(Item)),
    RuneFal: (function (_super) {
        __extends(RuneFal, _super);
        function RuneFal(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.FAL, "rune") || this;
            _this.lootMessage = "You pick up a FAL Rune";
            return _this;
        }
        return RuneFal;
    }(Item)),
    RuneKul: (function (_super) {
        __extends(RuneKul, _super);
        function RuneKul(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.KUL, "rune") || this;
            _this.lootMessage = "You pick up a KUL Rune";
            return _this;
        }
        return RuneKul;
    }(Item)),
    RuneMer: (function (_super) {
        __extends(RuneMer, _super);
        function RuneMer(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.MER, "rune") || this;
            _this.lootMessage = "You pick up a MER Rune";
            return _this;
        }
        return RuneMer;
    }(Item)),
    RuneQua: (function (_super) {
        __extends(RuneQua, _super);
        function RuneQua(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.QUA, "rune") || this;
            _this.lootMessage = "You pick up a QUA Rune";
            return _this;
        }
        return RuneQua;
    }(Item)),
    RuneGul: (function (_super) {
        __extends(RuneGul, _super);
        function RuneGul(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.GUL, "rune") || this;
            _this.lootMessage = "You pick up a GUL Rune";
            return _this;
        }
        return RuneGul;
    }(Item)),
    RuneBer: (function (_super) {
        __extends(RuneBer, _super);
        function RuneBer(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.BER, "rune") || this;
            _this.lootMessage = "You pick up a BER Rune";
            return _this;
        }
        return RuneBer;
    }(Item)),
    RuneTor: (function (_super) {
        __extends(RuneTor, _super);
        function RuneTor(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.TOR, "rune") || this;
            _this.lootMessage = "You pick up a TOR Rune";
            return _this;
        }
        return RuneTor;
    }(Item)),
    RuneJah: (function (_super) {
        __extends(RuneJah, _super);
        function RuneJah(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.JAH, "rune") || this;
            _this.lootMessage = "You pick up a JAH Rune";
            return _this;
        }
        return RuneJah;
    }(Item)),
    RuneShi: (function (_super) {
        __extends(RuneShi, _super);
        function RuneShi(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.SHI, "rune") || this;
            _this.lootMessage = "You pick up a SHI Rune";
            return _this;
        }
        return RuneShi;
    }(Item)),
    RuneVod: (function (_super) {
        __extends(RuneVod, _super);
        function RuneVod(id) {
            var _this = _super.call(this, id, Types.Entities.RUNE.VOD, "rune") || this;
            _this.lootMessage = "You pick up a VOD Rune";
            return _this;
        }
        return RuneVod;
    }(Item)),
    GemRuby: (function (_super) {
        __extends(GemRuby, _super);
        function GemRuby(id) {
            var _this = _super.call(this, id, Types.Entities.GEMRUBY, "object") || this;
            _this.lootMessage = "You pick up a Ruby";
            return _this;
        }
        return GemRuby;
    }(Item)),
    GemEmerald: (function (_super) {
        __extends(GemEmerald, _super);
        function GemEmerald(id) {
            var _this = _super.call(this, id, Types.Entities.GEMEMERALD, "object") || this;
            _this.lootMessage = "You pick up an Emerald";
            return _this;
        }
        return GemEmerald;
    }(Item)),
    GemAmethyst: (function (_super) {
        __extends(GemAmethyst, _super);
        function GemAmethyst(id) {
            var _this = _super.call(this, id, Types.Entities.GEMAMETHYST, "object") || this;
            _this.lootMessage = "You pick up an Amethyst";
            return _this;
        }
        return GemAmethyst;
    }(Item)),
    GemTopaz: (function (_super) {
        __extends(GemTopaz, _super);
        function GemTopaz(id) {
            var _this = _super.call(this, id, Types.Entities.GEMTOPAZ, "object") || this;
            _this.lootMessage = "You pick up a Topaz";
            return _this;
        }
        return GemTopaz;
    }(Item)),
    GemSapphire: (function (_super) {
        __extends(GemSapphire, _super);
        function GemSapphire(id) {
            var _this = _super.call(this, id, Types.Entities.GEMSAPPHIRE, "object") || this;
            _this.lootMessage = "You pick up a Sapphire";
            return _this;
        }
        return GemSapphire;
    }(Item)),
    Gold: (function (_super) {
        __extends(Gold, _super);
        function Gold(id, props) {
            var _this = _super.call(this, id, Types.Entities.GOLD, "object", props) || this;
            _this.lootMessage = "You pick up amount gold";
            return _this;
        }
        return Gold;
    }(Item)),
    NanoCoin: (function (_super) {
        __extends(NanoCoin, _super);
        function NanoCoin(id) {
            var _this = _super.call(this, id, Types.Entities.NANOCOIN, "object") || this;
            _this.lootMessage = "You pick up amount XNO";
            return _this;
        }
        return NanoCoin;
    }(Item)),
    BananoCoin: (function (_super) {
        __extends(BananoCoin, _super);
        function BananoCoin(id) {
            var _this = _super.call(this, id, Types.Entities.BANANOCOIN, "object") || this;
            _this.lootMessage = "You pick up amount BAN";
            return _this;
        }
        return BananoCoin;
    }(Item)),
    BarBronze: (function (_super) {
        __extends(BarBronze, _super);
        function BarBronze(id) {
            var _this = _super.call(this, id, Types.Entities.BARBRONZE, "object") || this;
            _this.lootMessage = "You pick up a Bronze Bar";
            return _this;
        }
        return BarBronze;
    }(Item)),
    BarSilver: (function (_super) {
        __extends(BarSilver, _super);
        function BarSilver(id) {
            var _this = _super.call(this, id, Types.Entities.BARSILVER, "object") || this;
            _this.lootMessage = "You pick up a Silver Bar";
            return _this;
        }
        return BarSilver;
    }(Item)),
    BarGold: (function (_super) {
        __extends(BarGold, _super);
        function BarGold(id) {
            var _this = _super.call(this, id, Types.Entities.BARGOLD, "object") || this;
            _this.lootMessage = "You pick up a Gold Bar";
            return _this;
        }
        return BarGold;
    }(Item)),
    BarPlatinum: (function (_super) {
        __extends(BarPlatinum, _super);
        function BarPlatinum(id) {
            var _this = _super.call(this, id, Types.Entities.BARPLATINUM, "object") || this;
            _this.lootMessage = "You pick up a Platinum Bar";
            return _this;
        }
        return BarPlatinum;
    }(Item)),
    RingBronze: (function (_super) {
        __extends(RingBronze, _super);
        function RingBronze(id) {
            var _this = _super.call(this, id, Types.Entities.RINGBRONZE, "ring") || this;
            _this.lootMessage = "You pick up a bronze ring";
            return _this;
        }
        return RingBronze;
    }(Item)),
    RingSilver: (function (_super) {
        __extends(RingSilver, _super);
        function RingSilver(id) {
            var _this = _super.call(this, id, Types.Entities.RINGSILVER, "ring") || this;
            _this.lootMessage = "You pick up a silver ring";
            return _this;
        }
        return RingSilver;
    }(Item)),
    RingGold: (function (_super) {
        __extends(RingGold, _super);
        function RingGold(id) {
            var _this = _super.call(this, id, Types.Entities.RINGGOLD, "ring") || this;
            _this.lootMessage = "You pick up a gold ring";
            return _this;
        }
        return RingGold;
    }(Item)),
    RingPlatinum: (function (_super) {
        __extends(RingPlatinum, _super);
        function RingPlatinum(id) {
            var _this = _super.call(this, id, Types.Entities.RINGPLATINUM, "ring") || this;
            _this.lootMessage = "You pick up a platinum ring";
            return _this;
        }
        return RingPlatinum;
    }(Item)),
    RingNecromancer: (function (_super) {
        __extends(RingNecromancer, _super);
        function RingNecromancer(id) {
            var _this = _super.call(this, id, Types.Entities.RINGNECROMANCER, "ring") || this;
            _this.lootMessage = "You pick up the Necromancer Death Wish";
            return _this;
        }
        return RingNecromancer;
    }(Item)),
    RingRaiStone: (function (_super) {
        __extends(RingRaiStone, _super);
        function RingRaiStone(id) {
            var _this = _super.call(this, id, Types.Entities.RINGRAISTONE, "ring") || this;
            _this.lootMessage = "You pick up the Rai Stone";
            return _this;
        }
        return RingRaiStone;
    }(Item)),
    RingFountain: (function (_super) {
        __extends(RingFountain, _super);
        function RingFountain(id) {
            var _this = _super.call(this, id, Types.Entities.RINGFOUNTAIN, "ring") || this;
            _this.lootMessage = "You pick up the Fountain of Youth";
            return _this;
        }
        return RingFountain;
    }(Item)),
    RingPumkin: (function (_super) {
        __extends(RingPumkin, _super);
        function RingPumkin(id) {
            var _this = _super.call(this, id, Types.Entities.RINGPUMKIN, "ring") || this;
            _this.lootMessage = "You pick up the Special event Pumpkin ring";
            return _this;
        }
        return RingPumkin;
    }(Item)),
    RingBadOmen: (function (_super) {
        __extends(RingBadOmen, _super);
        function RingBadOmen(id) {
            var _this = _super.call(this, id, Types.Entities.RINGBADOMEN, "ring") || this;
            _this.lootMessage = "You pick up the Bad Omen ring";
            return _this;
        }
        return RingBadOmen;
    }(Item)),
    RingBloodBand: (function (_super) {
        __extends(RingBloodBand, _super);
        function RingBloodBand(id) {
            var _this = _super.call(this, id, Types.Entities.RINGBLOODBAND, "ring") || this;
            _this.lootMessage = "You pick up the Blood Band ring";
            return _this;
        }
        return RingBloodBand;
    }(Item)),
    RingMinotaur: (function (_super) {
        __extends(RingMinotaur, _super);
        function RingMinotaur(id) {
            var _this = _super.call(this, id, Types.Entities.RINGMINOTAUR, "ring") || this;
            _this.lootMessage = "You pick up the Minotaur Hell Freeze";
            return _this;
        }
        return RingMinotaur;
    }(Item)),
    RingMystical: (function (_super) {
        __extends(RingMystical, _super);
        function RingMystical(id) {
            var _this = _super.call(this, id, Types.Entities.RINGMYSTICAL, "ring") || this;
            _this.lootMessage = "You pick up the Oculus";
            return _this;
        }
        return RingMystical;
    }(Item)),
    RingBalrog: (function (_super) {
        __extends(RingBalrog, _super);
        function RingBalrog(id) {
            var _this = _super.call(this, id, Types.Entities.RINGBALROG, "ring") || this;
            _this.lootMessage = "You pick up the Ring of Power";
            return _this;
        }
        return RingBalrog;
    }(Item)),
    RingConqueror: (function (_super) {
        __extends(RingConqueror, _super);
        function RingConqueror(id) {
            var _this = _super.call(this, id, Types.Entities.RINGCONQUEROR, "ring") || this;
            _this.lootMessage = "You pick up a conqueror ring";
            return _this;
        }
        return RingConqueror;
    }(Item)),
    RingHeaven: (function (_super) {
        __extends(RingHeaven, _super);
        function RingHeaven(id) {
            var _this = _super.call(this, id, Types.Entities.RINGHEAVEN, "ring") || this;
            _this.lootMessage = "You pick up a touch of heaven ring";
            return _this;
        }
        return RingHeaven;
    }(Item)),
    RingWizard: (function (_super) {
        __extends(RingWizard, _super);
        function RingWizard(id) {
            var _this = _super.call(this, id, Types.Entities.RINGWIZARD, "ring") || this;
            _this.lootMessage = "You pick up a wizard ring";
            return _this;
        }
        return RingWizard;
    }(Item)),
    RingGreed: (function (_super) {
        __extends(RingGreed, _super);
        function RingGreed(id) {
            var _this = _super.call(this, id, Types.Entities.RINGGREED, "ring") || this;
            _this.lootMessage = "You pick up a ring of greed";
            return _this;
        }
        return RingGreed;
    }(Item)),
    RingImmortal: (function (_super) {
        __extends(RingImmortal, _super);
        function RingImmortal(id) {
            var _this = _super.call(this, id, Types.Entities.RINGIMMORTAL, "ring") || this;
            _this.lootMessage = "You pick up a Eternity Band of the Ancients";
            return _this;
        }
        return RingImmortal;
    }(Item)),
    RingPaladin: (function (_super) {
        __extends(RingPaladin, _super);
        function RingPaladin(id) {
            var _this = _super.call(this, id, Types.Entities.RINGPALADIN, "ring") || this;
            _this.lootMessage = "You pick up a  Holy Protector's Seal";
            return _this;
        }
        return RingPaladin;
    }(Item)),
    AmuletSilver: (function (_super) {
        __extends(AmuletSilver, _super);
        function AmuletSilver(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETSILVER, "amulet") || this;
            _this.lootMessage = "You pick up a silver amulet";
            return _this;
        }
        return AmuletSilver;
    }(Item)),
    AmuletGold: (function (_super) {
        __extends(AmuletGold, _super);
        function AmuletGold(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETGOLD, "amulet") || this;
            _this.lootMessage = "You pick up a gold amulet";
            return _this;
        }
        return AmuletGold;
    }(Item)),
    AmuletPlatinum: (function (_super) {
        __extends(AmuletPlatinum, _super);
        function AmuletPlatinum(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETPLATINUM, "amulet") || this;
            _this.lootMessage = "You pick up a platinum amulet";
            return _this;
        }
        return AmuletPlatinum;
    }(Item)),
    AmuletCow: (function (_super) {
        __extends(AmuletCow, _super);
        function AmuletCow(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETCOW, "amulet") || this;
            _this.lootMessage = "You pick up the Holy Cow King Talisman";
            return _this;
        }
        return AmuletCow;
    }(Item)),
    AmuletFrozen: (function (_super) {
        __extends(AmuletFrozen, _super);
        function AmuletFrozen(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETFROZEN, "amulet") || this;
            _this.lootMessage = "You pick up the Frozen Heart";
            return _this;
        }
        return AmuletFrozen;
    }(Item)),
    AmuletDemon: (function (_super) {
        __extends(AmuletDemon, _super);
        function AmuletDemon(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETDEMON, "amulet") || this;
            _this.lootMessage = "You pick up the Fiend";
            return _this;
        }
        return AmuletDemon;
    }(Item)),
    AmuletMoon: (function (_super) {
        __extends(AmuletMoon, _super);
        function AmuletMoon(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETMOON, "amulet") || this;
            _this.lootMessage = "You pick up the Crescent";
            return _this;
        }
        return AmuletMoon;
    }(Item)),
    AmuletChristmas: (function (_super) {
        __extends(AmuletChristmas, _super);
        function AmuletChristmas(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETCHRISTMAS, "amulet") || this;
            _this.lootMessage = "You pick up the Yule";
            return _this;
        }
        return AmuletChristmas;
    }(Item)),
    AmuletStar: (function (_super) {
        __extends(AmuletStar, _super);
        function AmuletStar(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETSTAR, "amulet") || this;
            _this.lootMessage = "You pick up the North Star";
            return _this;
        }
        return AmuletStar;
    }(Item)),
    AmuletSkull: (function (_super) {
        __extends(AmuletSkull, _super);
        function AmuletSkull(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETSKULL, "amulet") || this;
            _this.lootMessage = "You pick up the White Death";
            return _this;
        }
        return AmuletSkull;
    }(Item)),
    AmuletDragon: (function (_super) {
        __extends(AmuletDragon, _super);
        function AmuletDragon(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETDRAGON, "amulet") || this;
            _this.lootMessage = "You pick up the Dragon Eye";
            return _this;
        }
        return AmuletDragon;
    }(Item)),
    AmuletEye: (function (_super) {
        __extends(AmuletEye, _super);
        function AmuletEye(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETEYE, "amulet") || this;
            _this.lootMessage = "You pick up the All-Seeing Eye";
            return _this;
        }
        return AmuletEye;
    }(Item)),
    AmuletGreed: (function (_super) {
        __extends(AmuletGreed, _super);
        function AmuletGreed(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETGREED, "amulet") || this;
            _this.lootMessage = "You pick up the amulet of Greed";
            return _this;
        }
        return AmuletGreed;
    }(Item)),
    AmuletImmortal: (function (_super) {
        __extends(AmuletImmortal, _super);
        function AmuletImmortal(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETIMMORTAL, "amulet") || this;
            _this.lootMessage = "You pick up the Necklace of the Timeless Soul";
            return _this;
        }
        return AmuletImmortal;
    }(Item)),
    AmuletPaladin: (function (_super) {
        __extends(AmuletPaladin, _super);
        function AmuletPaladin(id) {
            var _this = _super.call(this, id, Types.Entities.AMULETPALADIN, "amulet") || this;
            _this.lootMessage = "You pick up the Celestial Ward Amulet";
            return _this;
        }
        return AmuletPaladin;
    }(Item)),
    ChestBlue: (function (_super) {
        __extends(ChestBlue, _super);
        function ChestBlue(id) {
            var _this = _super.call(this, id, Types.Entities.CHESTBLUE, "chest") || this;
            _this.lootMessage = "You pick up a blue chest";
            return _this;
        }
        return ChestBlue;
    }(Item)),
    ChestGreen: (function (_super) {
        __extends(ChestGreen, _super);
        function ChestGreen(id) {
            var _this = _super.call(this, id, Types.Entities.CHESTGREEN, "chest") || this;
            _this.lootMessage = "You pick up a green chest";
            return _this;
        }
        return ChestGreen;
    }(Item)),
    ChestPurple: (function (_super) {
        __extends(ChestPurple, _super);
        function ChestPurple(id) {
            var _this = _super.call(this, id, Types.Entities.CHESTPURPLE, "chest") || this;
            _this.lootMessage = "You pick up a purple chest";
            return _this;
        }
        return ChestPurple;
    }(Item)),
    ChristmasPresent: (function (_super) {
        __extends(ChristmasPresent, _super);
        function ChristmasPresent(id) {
            var _this = _super.call(this, id, Types.Entities.CHRISTMASPRESENT, "chest") || this;
            _this.lootMessage = "You pick up a Christmas Present";
            return _this;
        }
        return ChristmasPresent;
    }(Item)),
    ChestDead: (function (_super) {
        __extends(ChestDead, _super);
        function ChestDead(id) {
            var _this = _super.call(this, id, Types.Entities.CHESTDEAD, "chest") || this;
            _this.lootMessage = "You pick up a dead chest";
            return _this;
        }
        return ChestDead;
    }(Item)),
    ChestRed: (function (_super) {
        __extends(ChestRed, _super);
        function ChestRed(id) {
            var _this = _super.call(this, id, Types.Entities.CHESTRED, "chest") || this;
            _this.lootMessage = "You pick up a red chest";
            return _this;
        }
        return ChestRed;
    }(Item)),
    Expansion2Voucher: (function (_super) {
        __extends(Expansion2Voucher, _super);
        function Expansion2Voucher(id) {
            var _this = _super.call(this, id, Types.Entities.EXPANSION2VOUCHER, "consumable") || this;
            _this.lootMessage = "You pick up the Lost Temple Expansion Voucher ";
            return _this;
        }
        return Expansion2Voucher;
    }(Item)),
    ScrollUpgradeLow: (function (_super) {
        __extends(ScrollUpgradeLow, _super);
        function ScrollUpgradeLow(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADELOW, "scroll") || this;
            _this.lootMessage = "You pick up a low class upgrade scroll";
            return _this;
        }
        return ScrollUpgradeLow;
    }(Item)),
    ScrollUpgradeMedium: (function (_super) {
        __extends(ScrollUpgradeMedium, _super);
        function ScrollUpgradeMedium(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADEMEDIUM, "scroll") || this;
            _this.lootMessage = "You pick up a medium class upgrade scroll";
            return _this;
        }
        return ScrollUpgradeMedium;
    }(Item)),
    ScrollUpgradeHigh: (function (_super) {
        __extends(ScrollUpgradeHigh, _super);
        function ScrollUpgradeHigh(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADEHIGH, "scroll") || this;
            _this.lootMessage = "You pick up a high class upgrade scroll";
            return _this;
        }
        return ScrollUpgradeHigh;
    }(Item)),
    ScrollUpgradeLegendary: (function (_super) {
        __extends(ScrollUpgradeLegendary, _super);
        function ScrollUpgradeLegendary(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADELEGENDARY, "scroll") || this;
            _this.lootMessage = "You pick up a legendary class upgrade scroll";
            return _this;
        }
        return ScrollUpgradeLegendary;
    }(Item)),
    ScrollUpgradeElementMagic: (function (_super) {
        __extends(ScrollUpgradeElementMagic, _super);
        function ScrollUpgradeElementMagic(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADEELEMENTMAGIC, "scroll") || this;
            _this.lootMessage = "You pick up a magic element upgrade scroll";
            return _this;
        }
        return ScrollUpgradeElementMagic;
    }(Item)),
    ScrollUpgradeElementFlame: (function (_super) {
        __extends(ScrollUpgradeElementFlame, _super);
        function ScrollUpgradeElementFlame(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADEELEMENTFLAME, "scroll") || this;
            _this.lootMessage = "You pick up a flame element upgrade scroll";
            return _this;
        }
        return ScrollUpgradeElementFlame;
    }(Item)),
    ScrollUpgradeElementLightning: (function (_super) {
        __extends(ScrollUpgradeElementLightning, _super);
        function ScrollUpgradeElementLightning(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADEELEMENTLIGHTNING, "scroll") || this;
            _this.lootMessage = "You pick up a lightning element upgrade scroll";
            return _this;
        }
        return ScrollUpgradeElementLightning;
    }(Item)),
    ScrollUpgradeElementCold: (function (_super) {
        __extends(ScrollUpgradeElementCold, _super);
        function ScrollUpgradeElementCold(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADEELEMENTCOLD, "scroll") || this;
            _this.lootMessage = "You pick up a cold element upgrade scroll";
            return _this;
        }
        return ScrollUpgradeElementCold;
    }(Item)),
    ScrollUpgradeElementPoison: (function (_super) {
        __extends(ScrollUpgradeElementPoison, _super);
        function ScrollUpgradeElementPoison(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADEELEMENTPOISON, "scroll") || this;
            _this.lootMessage = "You pick up a poison element upgrade scroll";
            return _this;
        }
        return ScrollUpgradeElementPoison;
    }(Item)),
    ScrollUpgradeSkillRandom: (function (_super) {
        __extends(ScrollUpgradeSkillRandom, _super);
        function ScrollUpgradeSkillRandom(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADESKILLRANDOM, "scroll") || this;
            _this.lootMessage = "You pick up a random skill upgrade scroll";
            return _this;
        }
        return ScrollUpgradeSkillRandom;
    }(Item)),
    ScrollUpgradeBlessed: (function (_super) {
        __extends(ScrollUpgradeBlessed, _super);
        function ScrollUpgradeBlessed(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADEBLESSED, "scroll") || this;
            _this.lootMessage = "You pick up a blessed high class upgrade scroll";
            return _this;
        }
        return ScrollUpgradeBlessed;
    }(Item)),
    ScrollUpgradeSacred: (function (_super) {
        __extends(ScrollUpgradeSacred, _super);
        function ScrollUpgradeSacred(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLUPGRADESACRED, "scroll") || this;
            _this.lootMessage = "You pick up a sacred legendary class upgrade scroll";
            return _this;
        }
        return ScrollUpgradeSacred;
    }(Item)),
    ScrollTransmute: (function (_super) {
        __extends(ScrollTransmute, _super);
        function ScrollTransmute(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLTRANSMUTE, "scroll") || this;
            _this.lootMessage = "You pick up a transmute scroll";
            return _this;
        }
        return ScrollTransmute;
    }(Item)),
    ScrollTransmuteBlessed: (function (_super) {
        __extends(ScrollTransmute, _super);
        function ScrollTransmute(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLTRANSMUTEBLESSED, "scroll") || this;
            _this.lootMessage = "You pick up a blessed transmute scroll";
            return _this;
        }
        return ScrollTransmute;
    }(Item)),
    ScrollTransmutePet: (function (_super) {
        __extends(ScrollTransmutePet, _super);
        function ScrollTransmutePet(id) {
            var _this = _super.call(this, id, Types.Entities.SCROLLTRANSMUTEPET, "scroll") || this;
            _this.lootMessage = "You pick up a pet transmute scroll";
            return _this;
        }
        return ScrollTransmutePet;
    }(Item)),
    StoneSocket: (function (_super) {
        __extends(StoneSocket, _super);
        function StoneSocket(id) {
            var _this = _super.call(this, id, Types.Entities.STONESOCKET, "stone") || this;
            _this.lootMessage = "You pick up a socket stone";
            return _this;
        }
        return StoneSocket;
    }(Item)),
    StoneSocketBlessed: (function (_super) {
        __extends(StoneSocketBlessed, _super);
        function StoneSocketBlessed(id) {
            var _this = _super.call(this, id, Types.Entities.STONESOCKETBLESSED, "stone") || this;
            _this.lootMessage = "You pick up a blessed socket stone";
            return _this;
        }
        return StoneSocketBlessed;
    }(Item)),
    StoneTeleport: (function (_super) {
        __extends(StoneTeleport, _super);
        function StoneTeleport(id) {
            var _this = _super.call(this, id, Types.Entities.STONETELEPORT, "stone") || this;
            _this.lootMessage = "You pick up a Teleport Stone";
            return _this;
        }
        return StoneTeleport;
    }(Item)),
    StoneDragon: (function (_super) {
        __extends(StoneDragon, _super);
        function StoneDragon(id) {
            var _this = _super.call(this, id, Types.Entities.STONEDRAGON, "stone") || this;
            _this.lootMessage = "You pick up a dragon stone";
            return _this;
        }
        return StoneDragon;
    }(Item)),
    StoneHero: (function (_super) {
        __extends(StoneHero, _super);
        function StoneHero(id) {
            var _this = _super.call(this, id, Types.Entities.STONEHERO, "stone") || this;
            _this.lootMessage = "You pick up a hero emblem";
            return _this;
        }
        return StoneHero;
    }(Item)),
    JewelSkull: (function (_super) {
        __extends(JewelSkull, _super);
        function JewelSkull(id) {
            var _this = _super.call(this, id, Types.Entities.JEWELSKULL, "jewel") || this;
            _this.lootMessage = "You pick up a skull jewel";
            return _this;
        }
        return JewelSkull;
    }(Item)),
    SkeletonKey: (function (_super) {
        __extends(SkeletonKey, _super);
        function SkeletonKey(id) {
            var _this = _super.call(this, id, Types.Entities.SKELETONKEY, "object") || this;
            _this.lootMessage = "You pick up the Skeleton Key";
            return _this;
        }
        return SkeletonKey;
    }(Item)),
    RaiblocksTL: (function (_super) {
        __extends(RaiblocksTL, _super);
        function RaiblocksTL(id) {
            var _this = _super.call(this, id, Types.Entities.RAIBLOCKSTL, "object") || this;
            _this.lootMessage = "You pick up a Raiblocks artifact part";
            return _this;
        }
        return RaiblocksTL;
    }(Item)),
    RaiblocksBL: (function (_super) {
        __extends(RaiblocksBL, _super);
        function RaiblocksBL(id) {
            var _this = _super.call(this, id, Types.Entities.RAIBLOCKSBL, "object") || this;
            _this.lootMessage = "You pick up a Raiblocks artifact part";
            return _this;
        }
        return RaiblocksBL;
    }(Item)),
    RaiblocksBR: (function (_super) {
        __extends(RaiblocksBR, _super);
        function RaiblocksBR(id) {
            var _this = _super.call(this, id, Types.Entities.RAIBLOCKSBR, "object") || this;
            _this.lootMessage = "You pick up a Raiblocks artifact part";
            return _this;
        }
        return RaiblocksBR;
    }(Item)),
    RaiblocksTR: (function (_super) {
        __extends(RaiblocksTR, _super);
        function RaiblocksTR(id) {
            var _this = _super.call(this, id, Types.Entities.RAIBLOCKSTR, "object") || this;
            _this.lootMessage = "You pick up a Raiblocks artifact part";
            return _this;
        }
        return RaiblocksTR;
    }(Item)),
    WirtLeg: (function (_super) {
        __extends(WirtLeg, _super);
        function WirtLeg(id) {
            var _this = _super.call(this, id, Types.Entities.WIRTLEG, "object") || this;
            _this.lootMessage = "You pick up Wirt's leg";
            return _this;
        }
        return WirtLeg;
    }(Item)),
    SkeletonKingCage: (function (_super) {
        __extends(SkeletonKingCage, _super);
        function SkeletonKingCage(id) {
            var _this = _super.call(this, id, Types.Entities.SKELETONKINGCAGE, "object") || this;
            _this.lootMessage = "You pick up the Skeleton King's thoracic cage";
            return _this;
        }
        return SkeletonKingCage;
    }(Item)),
    NecromancerHeart: (function (_super) {
        __extends(NecromancerHeart, _super);
        function NecromancerHeart(id) {
            var _this = _super.call(this, id, Types.Entities.NECROMANCERHEART, "object") || this;
            _this.lootMessage = "You pick up the Necromancer's heart";
            return _this;
        }
        return NecromancerHeart;
    }(Item)),
    CowkingHorn: (function (_super) {
        __extends(CowkingHorn, _super);
        function CowkingHorn(id) {
            var _this = _super.call(this, id, Types.Entities.COWKINGHORN, "object") || this;
            _this.lootMessage = "You pick up the Cow King's horn";
            return _this;
        }
        return CowkingHorn;
    }(Item)),
    Chalice: (function (_super) {
        __extends(Chalice, _super);
        function Chalice(id) {
            var _this = _super.call(this, id, Types.Entities.CHALICE, "object") || this;
            _this.lootMessage = "You pick up the Golden Chalice";
            return _this;
        }
        return Chalice;
    }(Item)),
    SoulStone: (function (_super) {
        __extends(SoulStone, _super);
        function SoulStone(id) {
            var _this = _super.call(this, id, Types.Entities.SOULSTONE, "object") || this;
            _this.lootMessage = "You pick up the Soul Stone";
            return _this;
        }
        return SoulStone;
    }(Item)),
    Nft: (function (_super) {
        __extends(Nft, _super);
        function Nft(id) {
            var _this = _super.call(this, id, Types.Entities.NFT, "object") || this;
            _this.lootMessage = "You pick up the Stone NFT";
            return _this;
        }
        return Nft;
    }(Item)),
    Wing: (function (_super) {
        __extends(Wing, _super);
        function Wing(id) {
            var _this = _super.call(this, id, Types.Entities.WING, "object") || this;
            _this.lootMessage = "You pick up a Dragon Wing";
            return _this;
        }
        return Wing;
    }(Item)),
    Crystal: (function (_super) {
        __extends(Crystal, _super);
        function Crystal(id) {
            var _this = _super.call(this, id, Types.Entities.CRYSTAL, "object") || this;
            _this.lootMessage = "You pick up the Crystal";
            return _this;
        }
        return Crystal;
    }(Item)),
    PowderBlack: (function (_super) {
        __extends(PowderBlack, _super);
        function PowderBlack(id) {
            var _this = _super.call(this, id, Types.Entities.POWDERBLACK, "object") || this;
            _this.lootMessage = "You pick up the Soul powder";
            return _this;
        }
        return PowderBlack;
    }(Item)),
    PowderBlue: (function (_super) {
        __extends(PowderBlue, _super);
        function PowderBlue(id) {
            var _this = _super.call(this, id, Types.Entities.POWDERBLUE, "object") || this;
            _this.lootMessage = "You pick up the Illusion powder";
            return _this;
        }
        return PowderBlue;
    }(Item)),
    PowderGold: (function (_super) {
        __extends(PowderGold, _super);
        function PowderGold(id) {
            var _this = _super.call(this, id, Types.Entities.POWDERGOLD, "object") || this;
            _this.lootMessage = "You pick up the BTC maxi powder";
            return _this;
        }
        return PowderGold;
    }(Item)),
    PowderGreen: (function (_super) {
        __extends(PowderGreen, _super);
        function PowderGreen(id) {
            var _this = _super.call(this, id, Types.Entities.POWDERGREEN, "object") || this;
            _this.lootMessage = "You pick up the Poison powder";
            return _this;
        }
        return PowderGreen;
    }(Item)),
    PowderRed: (function (_super) {
        __extends(PowderRed, _super);
        function PowderRed(id) {
            var _this = _super.call(this, id, Types.Entities.POWDERRED, "object") || this;
            _this.lootMessage = "You pick up the Blood powder";
            return _this;
        }
        return PowderRed;
    }(Item)),
    PowderQuantum: (function (_super) {
        __extends(PowderQuantum, _super);
        function PowderQuantum(id) {
            var _this = _super.call(this, id, Types.Entities.POWDERQUANTUM, "object") || this;
            _this.lootMessage = "You pick up the Quantum powder";
            return _this;
        }
        return PowderQuantum;
    }(Item)),
    Pickaxe: (function (_super) {
        __extends(Pickaxe, _super);
        function Pickaxe(id) {
            var _this = _super.call(this, id, Types.Entities.PICKAXE, "object") || this;
            _this.lootMessage = "You pick up a Pickaxe";
            return _this;
        }
        return Pickaxe;
    }(Item)),
    Mushrooms: (function (_super) {
        __extends(Mushrooms, _super);
        function Mushrooms(id) {
            var _this = _super.call(this, id, Types.Entities.MUSHROOMS, "object") || this;
            _this.lootMessage = "You pick up some Mushrooms";
            return _this;
        }
        return Mushrooms;
    }(Item)),
    Iou: (function (_super) {
        __extends(Iou, _super);
        function Iou(id) {
            var _this = _super.call(this, id, Types.Entities.IOU, "object") || this;
            _this.lootMessage = "You pick up an Iou";
            return _this;
        }
        return Iou;
    }(Item)),
    Cake: (function (_super) {
        __extends(Cake, _super);
        function Cake(id) {
            var _this = _super.call(this, id, Types.Entities.CAKE, "object") || this;
            _this.lootMessage = "You eat a cake";
            return _this;
        }
        return Cake;
    }(Item)),
    PetEgg: (function (_super) {
        __extends(PetEgg, _super);
        function PetEgg(id) {
            var _this = _super.call(this, id, Types.Entities.PETEGG, "object") || this;
            _this.lootMessage = "You pick up a Pet Egg";
            return _this;
        }
        return PetEgg;
    }(Item)),
    PetCollar: (function (_super) {
        __extends(PetCollar, _super);
        function PetCollar(id, props) {
            var _this = _super.call(this, id, Types.Entities.PETCOLLAR, "object", props) || this;
            _this.lootMessage = "You pick up a Pet Collar";
            return _this;
        }
        return PetCollar;
    }(Item)),
    PetDino: (function (_super) {
        __extends(PetDino, _super);
        function PetDino(id) {
            var _this = _super.call(this, id, Types.Entities.PETDINO, "object") || this;
            _this.lootMessage = "You pick up a Dino Pet";
            return _this;
        }
        return PetDino;
    }(Item)),
    PetBat: (function (_super) {
        __extends(PetBat, _super);
        function PetBat(id) {
            var _this = _super.call(this, id, Types.Entities.PETBAT, "object") || this;
            _this.lootMessage = "You pick up a Bat Pet";
            return _this;
        }
        return PetBat;
    }(Item)),
    PetCat: (function (_super) {
        __extends(PetCat, _super);
        function PetCat(id) {
            var _this = _super.call(this, id, Types.Entities.PETCAT, "object") || this;
            _this.lootMessage = "You pick up a Cat Pet";
            return _this;
        }
        return PetCat;
    }(Item)),
    PetDog: (function (_super) {
        __extends(PetDog, _super);
        function PetDog(id) {
            var _this = _super.call(this, id, Types.Entities.PETDOG, "object") || this;
            _this.lootMessage = "You pick up a Dog Pet";
            return _this;
        }
        return PetDog;
    }(Item)),
    PetAxolotl: (function (_super) {
        __extends(PetAxolotl, _super);
        function PetAxolotl(id) {
            var _this = _super.call(this, id, Types.Entities.PETAXOLOTL, "object") || this;
            _this.lootMessage = "You pick up a Axolotl Pet";
            return _this;
        }
        return PetAxolotl;
    }(Item)),
    PetFox: (function (_super) {
        __extends(PetFox, _super);
        function PetFox(id) {
            var _this = _super.call(this, id, Types.Entities.PETFOX, "object") || this;
            _this.lootMessage = "You pick up a Fox Pet";
            return _this;
        }
        return PetFox;
    }(Item)),
    PetTurtle: (function (_super) {
        __extends(PetTurtle, _super);
        function PetTurtle(id) {
            var _this = _super.call(this, id, Types.Entities.PETTURTLE, "object") || this;
            _this.lootMessage = "You pick up a Turtle Pet";
            return _this;
        }
        return PetTurtle;
    }(Item)),
    PetDuck: (function (_super) {
        __extends(PetDuck, _super);
        function PetDuck(id) {
            var _this = _super.call(this, id, Types.Entities.PETDUCK, "object") || this;
            _this.lootMessage = "You pick up a Duck Pet";
            return _this;
        }
        return PetDuck;
    }(Item)),
    PetDeer: (function (_super) {
        __extends(PetDeer, _super);
        function PetDeer(id) {
            var _this = _super.call(this, id, Types.Entities.PETDEER, "object") || this;
            _this.lootMessage = "You pick up a Deer Pet";
            return _this;
        }
        return PetDeer;
    }(Item)),
    PetReinDeer: (function (_super) {
        __extends(PetReinDeer, _super);
        function PetReinDeer(id) {
            var _this = _super.call(this, id, Types.Entities.PETREINDEER, "object") || this;
            _this.lootMessage = "You pick up a ReinDeer Pet";
            return _this;
        }
        return PetReinDeer;
    }(Item)),
    PetMonkey: (function (_super) {
        __extends(PetMonkey, _super);
        function PetMonkey(id) {
            var _this = _super.call(this, id, Types.Entities.PETMONKEY, "object") || this;
            _this.lootMessage = "You pick up a Monkey Pet";
            return _this;
        }
        return PetMonkey;
    }(Item)),
    PetHellhound: (function (_super) {
        __extends(PetHellhound, _super);
        function PetHellhound(id) {
            var _this = _super.call(this, id, Types.Entities.PETHELLHOUND, "object") || this;
            _this.lootMessage = "You pick up a Hellhound Pet";
            return _this;
        }
        return PetHellhound;
    }(Item)),
    PetDragon: (function (_super) {
        __extends(PetDragon, _super);
        function PetDragon(id) {
            var _this = _super.call(this, id, Types.Entities.PETDRAGON, "object") || this;
            _this.lootMessage = "You pick up a Dragon Pet";
            return _this;
        }
        return PetDragon;
    }(Item)),
    PetMouse: (function (_super) {
        __extends(PetMouse, _super);
        function PetMouse(id) {
            var _this = _super.call(this, id, Types.Entities.PETMOUSE, "object") || this;
            _this.lootMessage = "You pick up a Mouse Pet";
            return _this;
        }
        return PetMouse;
    }(Item)),
    PetHedgehog: (function (_super) {
        __extends(PetHedgehog, _super);
        function PetHedgehog(id) {
            var _this = _super.call(this, id, Types.Entities.PETHEDGEHOG, "object") || this;
            _this.lootMessage = "You pick up a Hedgehog Pet";
            return _this;
        }
        return PetHedgehog;
    }(Item)),
    Burger: (function (_super) {
        __extends(Burger, _super);
        function Burger(id) {
            var _this = _super.call(this, id, Types.Entities.BURGER, "object") || this;
            _this.lootMessage = "You can haz rat burger";
            return _this;
        }
        return Burger;
    }(Item)),
    Firefoxpotion: (function (_super) {
        __extends(Firefoxpotion, _super);
        function Firefoxpotion(id) {
            var _this = _super.call(this, id, Types.Entities.FIREFOXPOTION, "object") || this;
            _this.lootMessage = "You feel the power of Firefox!";
            return _this;
        }
        Firefoxpotion.prototype.onLoot = function (player) {
            player.startInvincibility();
        };
        return Firefoxpotion;
    }(Item)),
};
export default Items;
