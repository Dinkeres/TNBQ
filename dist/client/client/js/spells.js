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
import Spell from "./spell";
import Timer from "./timer";
export var Spells = {
    MageSpell: (function (_super) {
        __extends(MageSpell, _super);
        function MageSpell(id) {
            var _this = _super.call(this, id, Types.Entities.MAGESPELL) || this;
            _this.moveSpeed = 130;
            _this.atkSpeed = 250;
            _this.idleSpeed = 100;
            _this.atkRate = 2000;
            _this.attackCooldown = new Timer(_this.atkRate);
            _this.aggroRange = 0;
            return _this;
        }
        return MageSpell;
    }(Spell)),
    Arrow: (function (_super) {
        __extends(Arrow, _super);
        function Arrow(id) {
            var _this = _super.call(this, id, Types.Entities.ARROW) || this;
            _this.moveSpeed = 130;
            _this.atkSpeed = 250;
            _this.idleSpeed = 100;
            _this.atkRate = 2000;
            _this.attackCooldown = new Timer(_this.atkRate);
            _this.aggroRange = 0;
            return _this;
        }
        return Arrow;
    }(Spell)),
    StatueSpell: (function (_super) {
        __extends(StatueSpell, _super);
        function StatueSpell(id) {
            var _this = _super.call(this, id, Types.Entities.STATUESPELL) || this;
            _this.moveSpeed = 130;
            _this.atkSpeed = 250;
            _this.idleSpeed = 100;
            _this.atkRate = 2000;
            _this.attackCooldown = new Timer(_this.atkRate);
            _this.aggroRange = 0;
            return _this;
        }
        return StatueSpell;
    }(Spell)),
    Statue2Spell: (function (_super) {
        __extends(Statue2Spell, _super);
        function Statue2Spell(id) {
            var _this = _super.call(this, id, Types.Entities.STATUE2SPELL) || this;
            _this.moveSpeed = 130;
            _this.atkSpeed = 250;
            _this.idleSpeed = 100;
            _this.atkRate = 2000;
            _this.attackCooldown = new Timer(_this.atkRate);
            _this.aggroRange = 0;
            return _this;
        }
        return Statue2Spell;
    }(Spell)),
    DeathBringerSpell: (function (_super) {
        __extends(DeathBringerSpell, _super);
        function DeathBringerSpell(id) {
            var _this = _super.call(this, id, Types.Entities.DEATHBRINGERSPELL) || this;
            _this.moveSpeed = 100;
            _this.atkSpeed = 250;
            _this.idleSpeed = 100;
            _this.atkRate = 2000;
            _this.attackCooldown = new Timer(_this.atkRate);
            _this.aggroRange = 0;
            return _this;
        }
        return DeathBringerSpell;
    }(Spell)),
    DeathAngelSpell: (function (_super) {
        __extends(DeathAngelSpell, _super);
        function DeathAngelSpell(id) {
            var _this = _super.call(this, id, Types.Entities.DEATHANGELSPELL) || this;
            _this.moveSpeed = 100;
            _this.atkSpeed = 250;
            _this.idleSpeed = 75;
            _this.atkRate = 2000;
            _this.attackCooldown = new Timer(_this.atkRate);
            _this.aggroRange = 0;
            return _this;
        }
        return DeathAngelSpell;
    }(Spell)),
};
export default Spells;
