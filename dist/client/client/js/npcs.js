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
import _ from "lodash";
import { Types } from "../../shared/js/gametypes";
import Npc from "./npc";
var Npcs = {
    Guard: (function (_super) {
        __extends(Guard, _super);
        function Guard(id) {
            return _super.call(this, id, Types.Entities.GUARD) || this;
        }
        return Guard;
    }(Npc)),
    King: (function (_super) {
        __extends(King, _super);
        function King(id) {
            return _super.call(this, id, Types.Entities.KING) || this;
        }
        return King;
    }(Npc)),
    Agent: (function (_super) {
        __extends(Agent, _super);
        function Agent(id) {
            return _super.call(this, id, Types.Entities.AGENT) || this;
        }
        return Agent;
    }(Npc)),
    Rick: (function (_super) {
        __extends(Rick, _super);
        function Rick(id) {
            return _super.call(this, id, Types.Entities.RICK) || this;
        }
        return Rick;
    }(Npc)),
    VillageGirl: (function (_super) {
        __extends(VillageGirl, _super);
        function VillageGirl(id) {
            return _super.call(this, id, Types.Entities.VILLAGEGIRL) || this;
        }
        return VillageGirl;
    }(Npc)),
    Villager: (function (_super) {
        __extends(Villager, _super);
        function Villager(id) {
            return _super.call(this, id, Types.Entities.VILLAGER) || this;
        }
        return Villager;
    }(Npc)),
    CarlosMatos: (function (_super) {
        __extends(CarlosMatos, _super);
        function CarlosMatos(id) {
            return _super.call(this, id, Types.Entities.CARLOSMATOS) || this;
        }
        return CarlosMatos;
    }(Npc)),
    JanetYellen: (function (_super) {
        __extends(JanetYellen, _super);
        function JanetYellen(id) {
            return _super.call(this, id, Types.Entities.JANETYELLEN) || this;
        }
        return JanetYellen;
    }(Npc)),
    Merchant: (function (_super) {
        __extends(Merchant, _super);
        function Merchant(id) {
            return _super.call(this, id, Types.Entities.MERCHANT) || this;
        }
        return Merchant;
    }(Npc)),
    Satoshi: (function (_super) {
        __extends(Satoshi, _super);
        function Satoshi(id) {
            return _super.call(this, id, Types.Entities.SATOSHI) || this;
        }
        return Satoshi;
    }(Npc)),
    Coder: (function (_super) {
        __extends(Coder, _super);
        function Coder(id) {
            return _super.call(this, id, Types.Entities.CODER) || this;
        }
        return Coder;
    }(Npc)),
    Scientist: (function (_super) {
        __extends(Scientist, _super);
        function Scientist(id) {
            return _super.call(this, id, Types.Entities.SCIENTIST) || this;
        }
        return Scientist;
    }(Npc)),
    Nyan: (function (_super) {
        __extends(Nyan, _super);
        function Nyan(id) {
            var _this = _super.call(this, id, Types.Entities.NYAN) || this;
            _this.idleSpeed = 50;
            return _this;
        }
        return Nyan;
    }(Npc)),
    Sorcerer: (function (_super) {
        __extends(Sorcerer, _super);
        function Sorcerer(id) {
            var _this = _super.call(this, id, Types.Entities.SORCERER) || this;
            _this.idleSpeed = 150;
            return _this;
        }
        return Sorcerer;
    }(Npc)),
    Priest: (function (_super) {
        __extends(Priest, _super);
        function Priest(id) {
            return _super.call(this, id, Types.Entities.PRIEST) || this;
        }
        return Priest;
    }(Npc)),
    BeachNpc: (function (_super) {
        __extends(BeachNpc, _super);
        function BeachNpc(id) {
            return _super.call(this, id, Types.Entities.BEACHNPC) || this;
        }
        return BeachNpc;
    }(Npc)),
    ForestNpc: (function (_super) {
        __extends(ForestNpc, _super);
        function ForestNpc(id) {
            return _super.call(this, id, Types.Entities.FORESTNPC) || this;
        }
        return ForestNpc;
    }(Npc)),
    DesertNpc: (function (_super) {
        __extends(DesertNpc, _super);
        function DesertNpc(id) {
            return _super.call(this, id, Types.Entities.DESERTNPC) || this;
        }
        return DesertNpc;
    }(Npc)),
    LavaNpc: (function (_super) {
        __extends(LavaNpc, _super);
        function LavaNpc(id) {
            return _super.call(this, id, Types.Entities.LAVANPC) || this;
        }
        LavaNpc.prototype.hasShadow = function () {
            return false;
        };
        return LavaNpc;
    }(Npc)),
    Octocat: (function (_super) {
        __extends(Octocat, _super);
        function Octocat(id) {
            return _super.call(this, id, Types.Entities.OCTOCAT) || this;
        }
        return Octocat;
    }(Npc)),
    Anvil: (function (_super) {
        __extends(Anvil, _super);
        function Anvil(id) {
            var _this = _super.call(this, id, Types.Entities.ANVIL) || this;
            _this.isFading = false;
            return _this;
        }
        return Anvil;
    }(Npc)),
    Waypointx: (function (_super) {
        __extends(Waypointx, _super);
        function Waypointx(id) {
            var _this = _super.call(this, id, Types.Entities.WAYPOINTX) || this;
            _this.isFading = false;
            return _this;
        }
        return Waypointx;
    }(Npc)),
    Waypointn: (function (_super) {
        __extends(Waypointn, _super);
        function Waypointn(id) {
            var _this = _super.call(this, id, Types.Entities.WAYPOINTN) || this;
            _this.isFading = false;
            return _this;
        }
        return Waypointn;
    }(Npc)),
    Waypointo: (function (_super) {
        __extends(Waypointo, _super);
        function Waypointo(id) {
            var _this = _super.call(this, id, Types.Entities.WAYPOINTO) || this;
            _this.isFading = false;
            return _this;
        }
        return Waypointo;
    }(Npc)),
    Stash: (function (_super) {
        __extends(Stash, _super);
        function Stash(id) {
            var _this = _super.call(this, id, Types.Entities.STASH) || this;
            _this.isFading = false;
            return _this;
        }
        return Stash;
    }(Npc)),
    PortalCow: (function (_super) {
        __extends(PortalCow, _super);
        function PortalCow(id) {
            return _super.call(this, id, Types.Entities.PORTALCOW) || this;
        }
        return PortalCow;
    }(Npc)),
    PortalMinotaur: (function (_super) {
        __extends(PortalMinotaur, _super);
        function PortalMinotaur(id) {
            return _super.call(this, id, Types.Entities.PORTALMINOTAUR) || this;
        }
        return PortalMinotaur;
    }(Npc)),
    PortalStone: (function (_super) {
        __extends(PortalStone, _super);
        function PortalStone(id) {
            return _super.call(this, id, Types.Entities.PORTALSTONE) || this;
        }
        return PortalStone;
    }(Npc)),
    PortalGateway: (function (_super) {
        __extends(PortalGateway, _super);
        function PortalGateway(id) {
            return _super.call(this, id, Types.Entities.PORTALGATEWAY) || this;
        }
        PortalGateway.prototype.hasShadow = function () {
            return false;
        };
        return PortalGateway;
    }(Npc)),
    GatewayFx: (function (_super) {
        __extends(GatewayFx, _super);
        function GatewayFx(id) {
            var _this = _super.call(this, id, Types.Entities.GATEWAYFX) || this;
            _this.raiseSpeed = 125;
            _this.idleSpeed = 250;
            return _this;
        }
        GatewayFx.prototype.hasShadow = function () {
            return false;
        };
        return GatewayFx;
    }(Npc)),
    Gate: (function (_super) {
        __extends(Gate, _super);
        function Gate(id) {
            var _this = _super.call(this, id, Types.Entities.GATE) || this;
            _this.idleSpeed = 250;
            return _this;
        }
        Gate.prototype.hasShadow = function () {
            return false;
        };
        return Gate;
    }(Npc)),
    MagicStone: (function (_super) {
        __extends(MagicStone, _super);
        function MagicStone(id) {
            var _this = _super.call(this, id, Types.Entities.MAGICSTONE) || this;
            _this.raiseRate = 1300;
            _this.isFading = false;
            return _this;
        }
        MagicStone.prototype.hasShadow = function () {
            return false;
        };
        return MagicStone;
    }(Npc)),
    BlueFlame: (function (_super) {
        __extends(BlueFlame, _super);
        function BlueFlame(id) {
            var _this = _super.call(this, id, Types.Entities.BLUEFLAME) || this;
            _this.raiseRate = 1300;
            return _this;
        }
        BlueFlame.prototype.hasShadow = function () {
            return false;
        };
        return BlueFlame;
    }(Npc)),
    AltarChalice: (function (_super) {
        __extends(AltarChalice, _super);
        function AltarChalice(id) {
            var _this = _super.call(this, id, Types.Entities.ALTARCHALICE) || this;
            _this.raiseRate = 1300;
            _this.isFading = false;
            return _this;
        }
        return AltarChalice;
    }(Npc)),
    AltarSoulStone: (function (_super) {
        __extends(AltarSoulStone, _super);
        function AltarSoulStone(id) {
            var _this = _super.call(this, id, Types.Entities.ALTARSOULSTONE) || this;
            _this.isFading = false;
            return _this;
        }
        AltarSoulStone.prototype.hasShadow = function () {
            return false;
        };
        return AltarSoulStone;
    }(Npc)),
    SecretStairs: (function (_super) {
        __extends(SecretStairs, _super);
        function SecretStairs(id) {
            return _super.call(this, id, Types.Entities.SECRETSTAIRS) || this;
        }
        SecretStairs.prototype.hasShadow = function () {
            return false;
        };
        return SecretStairs;
    }(Npc)),
    SecretStairs2: (function (_super) {
        __extends(SecretStairs2, _super);
        function SecretStairs2(id) {
            return _super.call(this, id, Types.Entities.SECRETSTAIRS2) || this;
        }
        SecretStairs2.prototype.hasShadow = function () {
            return false;
        };
        return SecretStairs2;
    }(Npc)),
    SecretStairsUp: (function (_super) {
        __extends(SecretStairsUp, _super);
        function SecretStairsUp(id) {
            var _this = _super.call(this, id, Types.Entities.SECRETSTAIRSUP) || this;
            _this.isFading = false;
            return _this;
        }
        SecretStairsUp.prototype.hasShadow = function () {
            return false;
        };
        return SecretStairsUp;
    }(Npc)),
    TombDeathAngel: (function (_super) {
        __extends(TombDeathAngel, _super);
        function TombDeathAngel(id) {
            var _this = _super.call(this, id, Types.Entities.TOMBDEATHANGEL) || this;
            _this.isFading = false;
            return _this;
        }
        TombDeathAngel.prototype.hasShadow = function () {
            return false;
        };
        return TombDeathAngel;
    }(Npc)),
    TombAngel: (function (_super) {
        __extends(TombAngel, _super);
        function TombAngel(id) {
            var _this = _super.call(this, id, Types.Entities.TOMBANGEL) || this;
            _this.isFading = false;
            return _this;
        }
        TombAngel.prototype.hasShadow = function () {
            return false;
        };
        return TombAngel;
    }(Npc)),
    TombCross: (function (_super) {
        __extends(TombCross, _super);
        function TombCross(id) {
            var _this = _super.call(this, id, Types.Entities.TOMBCROSS) || this;
            _this.isFading = false;
            return _this;
        }
        TombCross.prototype.hasShadow = function () {
            return false;
        };
        return TombCross;
    }(Npc)),
    TombSkull: (function (_super) {
        __extends(TombSkull, _super);
        function TombSkull(id) {
            var _this = _super.call(this, id, Types.Entities.TOMBSKULL) || this;
            _this.isFading = false;
            return _this;
        }
        TombSkull.prototype.hasShadow = function () {
            return false;
        };
        return TombSkull;
    }(Npc)),
    Lever: (function (_super) {
        __extends(Lever, _super);
        function Lever(id) {
            var _this = _super.call(this, id, Types.Entities.LEVER) || this;
            _this.raiseRate = 500;
            _this.isFading = false;
            return _this;
        }
        Lever.prototype.hasShadow = function () {
            return false;
        };
        return Lever;
    }(Npc)),
    Lever2: (function (_super) {
        __extends(Lever2, _super);
        function Lever2(id) {
            var _this = _super.call(this, id, Types.Entities.LEVER2) || this;
            _this.raiseRate = 500;
            _this.isFading = false;
            return _this;
        }
        Lever2.prototype.hasShadow = function () {
            return false;
        };
        return Lever2;
    }(Npc)),
    Lever3: (function (_super) {
        __extends(Lever3, _super);
        function Lever3(id) {
            var _this = _super.call(this, id, Types.Entities.LEVER3) || this;
            _this.raiseRate = 500;
            _this.isFading = false;
            return _this;
        }
        Lever3.prototype.hasShadow = function () {
            return false;
        };
        return Lever3;
    }(Npc)),
    Grimoire: (function (_super) {
        __extends(Grimoire, _super);
        function Grimoire(id) {
            var _this = _super.call(this, id, Types.Entities.GRIMOIRE) || this;
            _this.isFading = false;
            return _this;
        }
        Grimoire.prototype.hasShadow = function () {
            return false;
        };
        return Grimoire;
    }(Npc)),
    Fossil: (function (_super) {
        __extends(Fossil, _super);
        function Fossil(id) {
            var _this = _super.call(this, id, Types.Entities.FOSSIL) || this;
            _this.isFading = false;
            return _this;
        }
        Fossil.prototype.hasShadow = function () {
            return false;
        };
        return Fossil;
    }(Npc)),
    PanelSkeletonKey: (function (_super) {
        __extends(PanelSkeletonKey, _super);
        function PanelSkeletonKey(id) {
            var _this = _super.call(this, id, Types.Entities.PANELSKELETONKEY) || this;
            _this.isFading = false;
            return _this;
        }
        return PanelSkeletonKey;
    }(Npc)),
    Obelisk: (function (_super) {
        __extends(Obelisk, _super);
        function Obelisk(id) {
            var _this = _super.call(this, id, Types.Entities.OBELISK) || this;
            _this.isFading = false;
            _this.idleSpeed = 100;
            return _this;
        }
        return Obelisk;
    }(Npc)),
    Hands: (function (_super) {
        __extends(Hands, _super);
        function Hands(id) {
            var _this = _super.call(this, id, Types.Entities.HANDS) || this;
            _this.isFading = false;
            return _this;
        }
        Hands.prototype.hasShadow = function () {
            return false;
        };
        return Hands;
    }(Npc)),
    Alkor: (function (_super) {
        __extends(Alkor, _super);
        function Alkor(id) {
            var _this = _super.call(this, id, Types.Entities.ALKOR) || this;
            _this.isFading = false;
            return _this;
        }
        return Alkor;
    }(Npc)),
    Olaf: (function (_super) {
        __extends(Olaf, _super);
        function Olaf(id) {
            var _this = _super.call(this, id, Types.Entities.OLAF) || this;
            _this.isFading = false;
            return _this;
        }
        return Olaf;
    }(Npc)),
    Victor: (function (_super) {
        __extends(Victor, _super);
        function Victor(id) {
            var _this = _super.call(this, id, Types.Entities.VICTOR) || this;
            _this.isFading = false;
            return _this;
        }
        return Victor;
    }(Npc)),
    Fox: (function (_super) {
        __extends(Fox, _super);
        function Fox(id) {
            var _this = _super.call(this, id, Types.Entities.FOX) || this;
            _this.isFading = false;
            _this.playRandomAnimation();
            return _this;
        }
        Fox.prototype.playRandomAnimation = function () {
            var _this = this;
            var animations = ["walk", "idle", "atk", "raise", "unraise"];
            this.animate(_.shuffle(animations)[0], 100, 15);
            setTimeout(function () {
                _this.playRandomAnimation();
            }, 10000);
        };
        return Fox;
    }(Npc)),
    Tree: (function (_super) {
        __extends(Tree, _super);
        function Tree(id) {
            var _this = _super.call(this, id, Types.Entities.TREE) || this;
            _this.isFading = false;
            return _this;
        }
        Tree.prototype.hasShadow = function () {
            return false;
        };
        return Tree;
    }(Npc)),
    Trap: (function (_super) {
        __extends(Trap, _super);
        function Trap(id) {
            var _this = _super.call(this, id, Types.Entities.TRAP) || this;
            _this.isFading = false;
            return _this;
        }
        Trap.prototype.hasShadow = function () {
            return false;
        };
        return Trap;
    }(Npc)),
    Trap2: (function (_super) {
        __extends(Trap2, _super);
        function Trap2(id) {
            var _this = _super.call(this, id, Types.Entities.TRAP2) || this;
            _this.isFading = false;
            return _this;
        }
        Trap2.prototype.hasShadow = function () {
            return false;
        };
        return Trap2;
    }(Npc)),
    Trap3: (function (_super) {
        __extends(Trap3, _super);
        function Trap3(id) {
            var _this = _super.call(this, id, Types.Entities.TRAP3) || this;
            _this.isFading = false;
            return _this;
        }
        Trap3.prototype.hasShadow = function () {
            return false;
        };
        return Trap3;
    }(Npc)),
    DoorDeathAngel: (function (_super) {
        __extends(DoorDeathAngel, _super);
        function DoorDeathAngel(id) {
            var _this = _super.call(this, id, Types.Entities.DOORDEATHANGEL) || this;
            _this.isFading = false;
            return _this;
        }
        DoorDeathAngel.prototype.hasShadow = function () {
            return false;
        };
        return DoorDeathAngel;
    }(Npc)),
    Statue: (function (_super) {
        __extends(Statue, _super);
        function Statue(id) {
            var _this = _super.call(this, id, Types.Entities.STATUE) || this;
            _this.isFading = false;
            return _this;
        }
        Statue.prototype.hasShadow = function () {
            return false;
        };
        return Statue;
    }(Npc)),
    Statue2: (function (_super) {
        __extends(Statue2, _super);
        function Statue2(id) {
            var _this = _super.call(this, id, Types.Entities.STATUE2) || this;
            _this.isFading = false;
            return _this;
        }
        Statue2.prototype.hasShadow = function () {
            return false;
        };
        return Statue2;
    }(Npc)),
};
export default Npcs;
