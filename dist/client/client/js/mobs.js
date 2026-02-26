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
import Mob from "./mob";
import Timer from "./timer";
export var Mobs = {
    Rat: (function (_super) {
        __extends(Rat, _super);
        function Rat(id, props) {
            var _this = _super.call(this, id, Types.Entities.RAT, props) || this;
            _this.moveSpeed = 350;
            _this.idleSpeed = 700;
            _this.shadowOffsetY = -2;
            _this.isAggressive = false;
            return _this;
        }
        return Rat;
    }(Mob)),
    Skeleton: (function (_super) {
        __extends(Skeleton, _super);
        function Skeleton(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETON, props) || this;
            _this.moveSpeed = 350;
            _this.atkSpeed = 100;
            _this.idleSpeed = 800;
            _this.shadowOffsetY = 1;
            _this.setAttackRate(1300);
            return _this;
        }
        return Skeleton;
    }(Mob)),
    Skeleton2: (function (_super) {
        __extends(Skeleton, _super);
        function Skeleton(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETON2, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 100;
            _this.idleSpeed = 800;
            _this.walkSpeed = 200;
            _this.shadowOffsetY = 1;
            _this.setAttackRate(1300);
            return _this;
        }
        return Skeleton;
    }(Mob)),
    Spectre: (function (_super) {
        __extends(Spectre, _super);
        function Spectre(id, props) {
            var _this = _super.call(this, id, Types.Entities.SPECTRE, props) || this;
            _this.moveSpeed = 150;
            _this.atkSpeed = 50;
            _this.idleSpeed = 200;
            _this.walkSpeed = 200;
            _this.shadowOffsetY = 1;
            _this.setAttackRate(900);
            return _this;
        }
        return Spectre;
    }(Mob)),
    Goblin: (function (_super) {
        __extends(Goblin, _super);
        function Goblin(id, props) {
            var _this = _super.call(this, id, Types.Entities.GOBLIN, props) || this;
            _this.moveSpeed = 150;
            _this.atkSpeed = 60;
            _this.idleSpeed = 600;
            _this.setAttackRate(700);
            return _this;
        }
        return Goblin;
    }(Mob)),
    Ogre: (function (_super) {
        __extends(Ogre, _super);
        function Ogre(id, props) {
            var _this = _super.call(this, id, Types.Entities.OGRE, props) || this;
            _this.moveSpeed = 300;
            _this.atkSpeed = 100;
            _this.idleSpeed = 600;
            return _this;
        }
        return Ogre;
    }(Mob)),
    Crab: (function (_super) {
        __extends(Crab, _super);
        function Crab(id, props) {
            var _this = _super.call(this, id, Types.Entities.CRAB, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 40;
            _this.idleSpeed = 500;
            return _this;
        }
        return Crab;
    }(Mob)),
    Snake: (function (_super) {
        __extends(Snake, _super);
        function Snake(id, props) {
            var _this = _super.call(this, id, Types.Entities.SNAKE, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 40;
            _this.idleSpeed = 250;
            _this.walkSpeed = 100;
            _this.shadowOffsetY = -4;
            return _this;
        }
        return Snake;
    }(Mob)),
    Eye: (function (_super) {
        __extends(Eye, _super);
        function Eye(id, props) {
            var _this = _super.call(this, id, Types.Entities.EYE, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 40;
            _this.idleSpeed = 50;
            return _this;
        }
        return Eye;
    }(Mob)),
    Bat: (function (_super) {
        __extends(Bat, _super);
        function Bat(id, props) {
            var _this = _super.call(this, id, Types.Entities.BAT, props) || this;
            _this.moveSpeed = 120;
            _this.atkSpeed = 90;
            _this.idleSpeed = 90;
            _this.walkSpeed = 85;
            _this.isAggressive = false;
            return _this;
        }
        return Bat;
    }(Mob)),
    Wizard: (function (_super) {
        __extends(Wizard, _super);
        function Wizard(id, props) {
            var _this = _super.call(this, id, Types.Entities.WIZARD, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 100;
            _this.idleSpeed = 150;
            return _this;
        }
        return Wizard;
    }(Mob)),
    Deathknight: (function (_super) {
        __extends(Deathknight, _super);
        function Deathknight(id, props) {
            var _this = _super.call(this, id, Types.Entities.DEATHKNIGHT, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 220;
            _this.walkSpeed = 100;
            _this.idleSpeed = 450;
            _this.setAttackRate(800);
            _this.aggroRange = 3;
            return _this;
        }
        Deathknight.prototype.idle = function (orientation) {
            if (!this.hasTarget()) {
                _super.prototype.idle.call(this, Types.Orientations.DOWN);
            }
            else {
                _super.prototype.idle.call(this, orientation);
            }
        };
        return Deathknight;
    }(Mob)),
    Boss: (function (_super) {
        __extends(Boss, _super);
        function Boss(id, props) {
            var _this = _super.call(this, id, Types.Entities.BOSS, props) || this;
            _this.moveSpeed = 300;
            _this.atkSpeed = 50;
            _this.idleSpeed = 400;
            _this.atkRate = 2000;
            _this.attackCooldown = new Timer(_this.atkRate);
            _this.aggroRange = 3;
            return _this;
        }
        Boss.prototype.idle = function (orientation) {
            if (!this.hasTarget()) {
                _super.prototype.idle.call(this, Types.Orientations.DOWN);
            }
            else {
                _super.prototype.idle.call(this, orientation);
            }
        };
        return Boss;
    }(Mob)),
    Rat2: (function (_super) {
        __extends(Rat2, _super);
        function Rat2(id, props) {
            var _this = _super.call(this, id, Types.Entities.RAT2, props) || this;
            _this.moveSpeed = 350;
            _this.idleSpeed = 700;
            _this.shadowOffsetY = -2;
            _this.isAggressive = false;
            return _this;
        }
        return Rat2;
    }(Mob)),
    Bat2: (function (_super) {
        __extends(Bat2, _super);
        function Bat2(id, props) {
            var _this = _super.call(this, id, Types.Entities.BAT2, props) || this;
            _this.moveSpeed = 120;
            _this.atkSpeed = 90;
            _this.idleSpeed = 90;
            _this.walkSpeed = 85;
            _this.isAggressive = false;
            return _this;
        }
        return Bat2;
    }(Mob)),
    Goblin2: (function (_super) {
        __extends(Goblin2, _super);
        function Goblin2(id, props) {
            var _this = _super.call(this, id, Types.Entities.GOBLIN2, props) || this;
            _this.moveSpeed = 150;
            _this.atkSpeed = 60;
            _this.idleSpeed = 600;
            _this.setAttackRate(700);
            return _this;
        }
        return Goblin2;
    }(Mob)),
    Yeti: (function (_super) {
        __extends(Yeti, _super);
        function Yeti(id, props) {
            var _this = _super.call(this, id, Types.Entities.YETI, props) || this;
            _this.moveSpeed = 300;
            _this.atkSpeed = 100;
            _this.idleSpeed = 600;
            return _this;
        }
        return Yeti;
    }(Mob)),
    Werewolf: (function (_super) {
        __extends(Werewolf, _super);
        function Werewolf(id, props) {
            var _this = _super.call(this, id, Types.Entities.WEREWOLF, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 80;
            _this.idleSpeed = 600;
            return _this;
        }
        return Werewolf;
    }(Mob)),
    Skeleton3: (function (_super) {
        __extends(Skeleton3, _super);
        function Skeleton3(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETON3, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 100;
            _this.idleSpeed = 800;
            _this.walkSpeed = 200;
            _this.shadowOffsetY = 1;
            _this.aggroRange = 3;
            _this.setAttackRate(1300);
            return _this;
        }
        return Skeleton3;
    }(Mob)),
    SkeletonCommander: (function (_super) {
        __extends(SkeletonCommander, _super);
        function SkeletonCommander(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETONCOMMANDER, props) || this;
            _this.moveSpeed = 300;
            _this.atkSpeed = 50;
            _this.idleSpeed = 400;
            _this.atkRate = 2000;
            _this.attackCooldown = new Timer(_this.atkRate);
            _this.aggroRange = 3;
            return _this;
        }
        SkeletonCommander.prototype.idle = function (orientation) {
            if (!this.hasTarget()) {
                _super.prototype.idle.call(this, Types.Orientations.DOWN);
            }
            else {
                _super.prototype.idle.call(this, orientation);
            }
        };
        return SkeletonCommander;
    }(Mob)),
    Snake2: (function (_super) {
        __extends(Snake2, _super);
        function Snake2(id, props) {
            var _this = _super.call(this, id, Types.Entities.SNAKE2, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 40;
            _this.idleSpeed = 250;
            _this.walkSpeed = 100;
            _this.shadowOffsetY = -4;
            _this.aggroRange = 3;
            return _this;
        }
        return Snake2;
    }(Mob)),
    Wraith: (function (_super) {
        __extends(Wraith, _super);
        function Wraith(id, props) {
            var _this = _super.call(this, id, Types.Entities.WRAITH, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 220;
            _this.walkSpeed = 100;
            _this.idleSpeed = 450;
            _this.setAttackRate(800);
            _this.aggroRange = 3;
            return _this;
        }
        return Wraith;
    }(Mob)),
    Zombie: (function (_super) {
        __extends(Zombie, _super);
        function Zombie(id, props) {
            var _this = _super.call(this, id, Types.Entities.ZOMBIE, props) || this;
            _this.atkSpeed = 50;
            _this.raiseSpeed = 250;
            _this.moveSpeed = 220;
            _this.walkSpeed = 100;
            _this.idleSpeed = 450;
            _this.setAttackRate(800);
            _this.isAggressive = false;
            return _this;
        }
        Zombie.prototype.idle = function (orientation) {
            if (!this.hasTarget()) {
                _super.prototype.idle.call(this, Types.Orientations.DOWN);
            }
            else {
                _super.prototype.idle.call(this, orientation);
            }
        };
        return Zombie;
    }(Mob)),
    Necromancer: (function (_super) {
        __extends(Necromancer, _super);
        function Necromancer(id, props) {
            var _this = _super.call(this, id, Types.Entities.NECROMANCER, props) || this;
            _this.moveSpeed = 300;
            _this.atkSpeed = 100;
            _this.raiseSpeed = 250;
            _this.idleSpeed = 400;
            _this.atkRate = 2000;
            _this.raiseRate = 1250;
            _this.attackCooldown = new Timer(_this.atkRate);
            _this.raiseCooldown = new Timer(_this.raiseRate);
            _this.aggroRange = 3;
            _this.auras = ["drainlife"];
            return _this;
        }
        Necromancer.prototype.idle = function (orientation) {
            if (!this.hasTarget()) {
                _super.prototype.idle.call(this, Types.Orientations.DOWN);
            }
            else {
                _super.prototype.idle.call(this, orientation);
            }
        };
        return Necromancer;
    }(Mob)),
    Cow: (function (_super) {
        __extends(Cow, _super);
        function Cow(id, props) {
            var _this = _super.call(this, id, Types.Entities.COW, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 100;
            _this.idleSpeed = 800;
            _this.walkSpeed = 200;
            _this.shadowOffsetY = 1;
            _this.aggroRange = 3;
            _this.setAttackRate(1300);
            return _this;
        }
        return Cow;
    }(Mob)),
    CowKing: (function (_super) {
        __extends(CowKing, _super);
        function CowKing(id, props) {
            var _this = _super.call(this, id, Types.Entities.COWKING, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 100;
            _this.idleSpeed = 800;
            _this.walkSpeed = 200;
            _this.shadowOffsetY = 1;
            _this.aggroRange = 3;
            _this.auras = ["thunderstorm"];
            _this.setAttackRate(1300);
            return _this;
        }
        return CowKing;
    }(Mob)),
    Minotaur: (function (_super) {
        __extends(Minotaur, _super);
        function Minotaur(id, props) {
            var _this = _super.call(this, id, Types.Entities.MINOTAUR, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 100;
            _this.idleSpeed = 800;
            _this.walkSpeed = 200;
            _this.shadowOffsetY = 1;
            _this.aggroRange = 5;
            _this.auras = ["freeze"];
            _this.setAttackRate(1300);
            return _this;
        }
        return Minotaur;
    }(Mob)),
    Rat3: (function (_super) {
        __extends(Rat3, _super);
        function Rat3(id, props) {
            var _this = _super.call(this, id, Types.Entities.RAT3, props) || this;
            _this.moveSpeed = 350;
            _this.idleSpeed = 700;
            _this.shadowOffsetY = -2;
            _this.isAggressive = true;
            return _this;
        }
        return Rat3;
    }(Mob)),
    Skeleton4: (function (_super) {
        __extends(Skeleton4, _super);
        function Skeleton4(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETON4, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 50;
            _this.idleSpeed = 400;
            _this.walkSpeed = 100;
            _this.shadowOffsetY = 1;
            _this.aggroRange = 2;
            _this.setAttackRate(1300);
            return _this;
        }
        return Skeleton4;
    }(Mob)),
    Golem: (function (_super) {
        __extends(Golem, _super);
        function Golem(id, props) {
            var _this = _super.call(this, id, Types.Entities.GOLEM, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 75;
            _this.idleSpeed = 800;
            _this.walkSpeed = 200;
            _this.shadowOffsetY = 1;
            _this.aggroRange = 2;
            _this.hurtDelay = 500;
            _this.setAttackRate(1600);
            return _this;
        }
        return Golem;
    }(Mob)),
    Worm: (function (_super) {
        __extends(Worm, _super);
        function Worm(id, props) {
            var _this = _super.call(this, id, Types.Entities.WORM, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 100;
            _this.idleSpeed = 800;
            _this.walkSpeed = 200;
            _this.shadowOffsetY = 1;
            _this.aggroRange = 4;
            _this.setAttackRate(1300);
            return _this;
        }
        Worm.prototype.hasShadow = function () {
            return false;
        };
        return Worm;
    }(Mob)),
    Snake3: (function (_super) {
        __extends(Snake3, _super);
        function Snake3(id, props) {
            var _this = _super.call(this, id, Types.Entities.SNAKE3, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 40;
            _this.idleSpeed = 250;
            _this.walkSpeed = 100;
            _this.shadowOffsetY = -4;
            _this.aggroRange = 2;
            return _this;
        }
        return Snake3;
    }(Mob)),
    Snake4: (function (_super) {
        __extends(Snake4, _super);
        function Snake4(id, props) {
            var _this = _super.call(this, id, Types.Entities.SNAKE4, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 40;
            _this.idleSpeed = 250;
            _this.walkSpeed = 100;
            _this.shadowOffsetY = -4;
            _this.aggroRange = 2;
            return _this;
        }
        return Snake4;
    }(Mob)),
    Wraith2: (function (_super) {
        __extends(Wraith2, _super);
        function Wraith2(id, props) {
            var _this = _super.call(this, id, Types.Entities.WRAITH2, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 220;
            _this.walkSpeed = 100;
            _this.idleSpeed = 450;
            _this.setAttackRate(800);
            _this.aggroRange = 2;
            return _this;
        }
        return Wraith2;
    }(Mob)),
    Ghost: (function (_super) {
        __extends(Ghost, _super);
        function Ghost(id, props) {
            var _this = _super.call(this, id, Types.Entities.GHOST, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 220;
            _this.walkSpeed = 100;
            _this.idleSpeed = 450;
            _this.setAttackRate(800);
            _this.aggroRange = 4;
            return _this;
        }
        return Ghost;
    }(Mob)),
    Mage: (function (_super) {
        __extends(Mage, _super);
        function Mage(id, props) {
            var _this = _super.call(this, id, Types.Entities.MAGE, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 250;
            _this.raiseSpeed = 150;
            _this.raiseRate = 1000;
            _this.setAttackRate(800);
            _this.raiseCooldown = new Timer(_this.raiseRate);
            _this.aggroRange = 4;
            _this.castRange = 6;
            return _this;
        }
        return Mage;
    }(Mob)),
    Shaman: (function (_super) {
        __extends(Shaman, _super);
        function Shaman(id, props) {
            var _this = _super.call(this, id, Types.Entities.SHAMAN, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 150;
            _this.raiseSpeed = 75;
            _this.raise2Speed = 35;
            _this.raiseRate = 1800;
            _this.setAttackRate(800);
            _this.raiseCooldown = new Timer(_this.raiseRate);
            _this.aggroRange = 5;
            _this.castRange = 6;
            return _this;
        }
        return Shaman;
    }(Mob)),
    SkeletonTemplar: (function (_super) {
        __extends(SkeletonTemplar, _super);
        function SkeletonTemplar(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETONTEMPLAR, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 150;
            _this.setAttackRate(3000);
            _this.aggroRange = 5;
            return _this;
        }
        return SkeletonTemplar;
    }(Mob)),
    SkeletonTemplar2: (function (_super) {
        __extends(SkeletonTemplar2, _super);
        function SkeletonTemplar2(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETONTEMPLAR2, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 150;
            _this.setAttackRate(3000);
            _this.aggroRange = 5;
            return _this;
        }
        return SkeletonTemplar2;
    }(Mob)),
    Spider: (function (_super) {
        __extends(Spider, _super);
        function Spider(id, props) {
            var _this = _super.call(this, id, Types.Entities.SPIDER, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 150;
            _this.setAttackRate(1200);
            _this.aggroRange = 3;
            return _this;
        }
        return Spider;
    }(Mob)),
    Spider2: (function (_super) {
        __extends(Spider2, _super);
        function Spider2(id, props) {
            var _this = _super.call(this, id, Types.Entities.SPIDER2, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 150;
            _this.setAttackRate(1200);
            _this.aggroRange = 3;
            return _this;
        }
        return Spider2;
    }(Mob)),
    SpiderQueen: (function (_super) {
        __extends(SpiderQueen, _super);
        function SpiderQueen(id, props) {
            var _this = _super.call(this, id, Types.Entities.SPIDERQUEEN, props) || this;
            _this.atkSpeed = 75;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 150;
            _this.setAttackRate(1500);
            _this.aggroRange = 4;
            return _this;
        }
        return SpiderQueen;
    }(Mob)),
    Butcher: (function (_super) {
        __extends(Butcher, _super);
        function Butcher(id, props) {
            var _this = _super.call(this, id, Types.Entities.BUTCHER, props) || this;
            _this.atkSpeed = 75;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 150;
            _this.setAttackRate(1500);
            _this.aggroRange = 5;
            _this.hurtDelay = 100;
            _this.taunt = "fresh-meat";
            return _this;
        }
        return Butcher;
    }(Mob)),
    Oculothorax: (function (_super) {
        __extends(Oculothorax, _super);
        function Oculothorax(id, props) {
            var _this = _super.call(this, id, Types.Entities.OCULOTHORAX, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 150;
            _this.setAttackRate(1200);
            _this.aggroRange = 2;
            return _this;
        }
        return Oculothorax;
    }(Mob)),
    Kobold: (function (_super) {
        __extends(Kobold, _super);
        function Kobold(id, props) {
            var _this = _super.call(this, id, Types.Entities.KOBOLD, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 150;
            _this.setAttackRate(1200);
            _this.aggroRange = 3;
            return _this;
        }
        return Kobold;
    }(Mob)),
    SkeletonBerserker: (function (_super) {
        __extends(SkeletonBerserker, _super);
        function SkeletonBerserker(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETONBERSERKER, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 150;
            _this.setAttackRate(1200);
            _this.aggroRange = 3;
            return _this;
        }
        return SkeletonBerserker;
    }(Mob)),
    SkeletonArcher: (function (_super) {
        __extends(SkeletonArcher, _super);
        function SkeletonArcher(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETONARCHER, props) || this;
            _this.atkSpeed = 50;
            _this.moveSpeed = 200;
            _this.walkSpeed = 100;
            _this.idleSpeed = 250;
            _this.raiseSpeed = 150;
            _this.raiseRate = 1000;
            _this.setAttackRate(800);
            _this.raiseCooldown = new Timer(_this.raiseRate);
            _this.aggroRange = 4;
            _this.castRange = 6;
            return _this;
        }
        return SkeletonArcher;
    }(Mob)),
    SkeletonScythe1: (function (_super) {
        __extends(SkeletonScythe1, _super);
        function SkeletonScythe1(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETONSCYTHE1, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 50;
            _this.idleSpeed = 400;
            _this.walkSpeed = 100;
            _this.shadowOffsetY = 1;
            _this.aggroRange = 4;
            _this.setAttackRate(1500);
            return _this;
        }
        return SkeletonScythe1;
    }(Mob)),
    SkeletonAxe1: (function (_super) {
        __extends(SkeletonAxe1, _super);
        function SkeletonAxe1(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETONAXE1, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 50;
            _this.idleSpeed = 400;
            _this.walkSpeed = 100;
            _this.shadowOffsetY = 1;
            _this.aggroRange = 4;
            _this.setAttackRate(1200);
            return _this;
        }
        return SkeletonAxe1;
    }(Mob)),
    SkeletonAxe2: (function (_super) {
        __extends(SkeletonAxe2, _super);
        function SkeletonAxe2(id, props) {
            var _this = _super.call(this, id, Types.Entities.SKELETONAXE2, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 50;
            _this.idleSpeed = 400;
            _this.walkSpeed = 100;
            _this.shadowOffsetY = 1;
            _this.aggroRange = 4;
            _this.setAttackRate(1200);
            return _this;
        }
        return SkeletonAxe2;
    }(Mob)),
    DeathBringer: (function (_super) {
        __extends(DeathBringer, _super);
        function DeathBringer(id, props) {
            var _this = _super.call(this, id, Types.Entities.DEATHBRINGER, props) || this;
            _this.moveSpeed = 400;
            _this.atkSpeed = 100;
            _this.raiseSpeed = 125;
            _this.idleSpeed = 100;
            _this.atkRate = 2000;
            _this.raiseRate = 1000;
            _this.attackCooldown = new Timer(_this.atkRate);
            _this.raiseCooldown = new Timer(_this.raiseRate);
            _this.aggroRange = 5;
            _this.hurtDelay = 200;
            return _this;
        }
        DeathBringer.prototype.idle = function (orientation) {
            if (!this.hasTarget()) {
                _super.prototype.idle.call(this, Types.Orientations.DOWN);
            }
            else {
                _super.prototype.idle.call(this, orientation);
            }
        };
        return DeathBringer;
    }(Mob)),
    DeathAngel: (function (_super) {
        __extends(DeathAngel, _super);
        function DeathAngel(id, props) {
            var _this = _super.call(this, id, Types.Entities.DEATHANGEL, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 100;
            _this.raiseSpeed = 125;
            _this.idleSpeed = 100;
            _this.atkRate = 2000;
            _this.raiseRate = 1000;
            _this.attackCooldown = new Timer(_this.atkRate);
            _this.raiseCooldown = new Timer(_this.raiseRate);
            _this.aggroRange = 5;
            _this.hurtDelay = 200;
            return _this;
        }
        DeathAngel.prototype.idle = function (orientation) {
            if (!this.hasTarget()) {
                _super.prototype.idle.call(this, Types.Orientations.DOWN);
            }
            else {
                _super.prototype.idle.call(this, orientation);
            }
        };
        return DeathAngel;
    }(Mob)),
};
export default Mobs;
