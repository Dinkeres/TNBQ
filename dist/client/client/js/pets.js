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
import Pet from "./pet";
export var Pets = {
    Dino: (function (_super) {
        __extends(Dino, _super);
        function Dino(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_DINO, props) || this;
            _this.moveSpeed = 200;
            _this.atkSpeed = 100;
            _this.raiseSpeed = 125;
            _this.idleSpeed = 100;
            _this.atkRate = 2000;
            _this.raiseRate = 1000;
            return _this;
        }
        Dino.prototype.idle = function (orientation) {
            if (!this.hasTarget()) {
                _super.prototype.idle.call(this, Types.Orientations.DOWN);
            }
            else {
                _super.prototype.idle.call(this, orientation);
            }
        };
        return Dino;
    }(Pet)),
    Bat: (function (_super) {
        __extends(Bat, _super);
        function Bat(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_BAT, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 100;
            return _this;
        }
        return Bat;
    }(Pet)),
    Cat: (function (_super) {
        __extends(Cat, _super);
        function Cat(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_CAT, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 175;
            return _this;
        }
        return Cat;
    }(Pet)),
    Dog: (function (_super) {
        __extends(Dog, _super);
        function Dog(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_DOG, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 175;
            return _this;
        }
        return Dog;
    }(Pet)),
    Turtle: (function (_super) {
        __extends(Turtle, _super);
        function Turtle(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_TURTLE, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 200;
            return _this;
        }
        return Turtle;
    }(Pet)),
    Duck: (function (_super) {
        __extends(Duck, _super);
        function Duck(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_DUCK, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 200;
            return _this;
        }
        return Duck;
    }(Pet)),
    Deer: (function (_super) {
        __extends(Deer, _super);
        function Deer(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_DEER, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 200;
            return _this;
        }
        return Deer;
    }(Pet)),
    ReinDeer: (function (_super) {
        __extends(ReinDeer, _super);
        function ReinDeer(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_REINDEER, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 200;
            return _this;
        }
        return ReinDeer;
    }(Pet)),
    Monkey: (function (_super) {
        __extends(Monkey, _super);
        function Monkey(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_MONKEY, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 200;
            return _this;
        }
        return Monkey;
    }(Pet)),
    Hellhound: (function (_super) {
        __extends(Hellhound, _super);
        function Hellhound(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_HELLHOUND, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 200;
            return _this;
        }
        return Hellhound;
    }(Pet)),
    Dragon: (function (_super) {
        __extends(Dragon, _super);
        function Dragon(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_DRAGON, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 100;
            return _this;
        }
        return Dragon;
    }(Pet)),
    Axolotl: (function (_super) {
        __extends(Axolotl, _super);
        function Axolotl(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_AXOLOTL, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 175;
            return _this;
        }
        return Axolotl;
    }(Pet)),
    Fox: (function (_super) {
        __extends(Fox, _super);
        function Fox(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_FOX, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 175;
            return _this;
        }
        return Fox;
    }(Pet)),
    Mouse: (function (_super) {
        __extends(Mouse, _super);
        function Mouse(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_MOUSE, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 175;
            return _this;
        }
        return Mouse;
    }(Pet)),
    Hedgehog: (function (_super) {
        __extends(Hedgehog, _super);
        function Hedgehog(id, props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, id, Types.Entities.PET_HEDGEHOG, props) || this;
            _this.moveSpeed = 200;
            _this.idleSpeed = 175;
            return _this;
        }
        return Hedgehog;
    }(Pet)),
};
export default Pets;
