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
import * as _ from "lodash";
import { Types } from "../../shared/js/gametypes";
var Messages = {};
module.exports = Messages;
Messages.Spawn = (function () {
    function Message(entity) {
        this.entity = entity;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.SPAWN, this.entity.getState()];
    };
    return Message;
}());
Messages.SpawnBatch = (function () {
    function Message(entities) {
        this.entities = entities;
    }
    Message.prototype.serialize = function () {
        var spawn = [Types.Messages.SPAWN_BATCH];
        return spawn.concat(this.entities.map(function (entity) { return entity.getState(); }));
    };
    return Message;
}());
Messages.Despawn = (function () {
    function Message(entityId) {
        this.entityId = entityId;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.DESPAWN, this.entityId];
    };
    return Message;
}());
Messages.Move = (function () {
    function Message(entity) {
        this.entity = entity;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.MOVE, this.entity.id, this.entity.x, this.entity.y];
    };
    return Message;
}());
Messages.LootMove = (function () {
    function Message(entity, item) {
        this.entity = entity;
        this.item = item;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.LOOTMOVE, this.entity.id, this.item.id];
    };
    return Message;
}());
Messages.Attack = (function () {
    function Message(attackerId, targetId) {
        this.attackerId = attackerId;
        this.targetId = targetId;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.ATTACK, this.attackerId, this.targetId];
    };
    return Message;
}());
Messages.Raise = (function () {
    function Message(mobId, targetId) {
        this.mobId = mobId;
        this.targetId = targetId;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.RAISE, this.mobId, this.targetId];
    };
    return Message;
}());
Messages.Unraise = (function () {
    function Message(mobId, targetId) {
        this.mobId = mobId;
        this.targetId = targetId;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.UNRAISE, this.mobId];
    };
    return Message;
}());
Messages.Taunt = (function () {
    function Message(mobId) {
        this.mobId = mobId;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.TAUNT, this.mobId];
    };
    return Message;
}());
Messages.CowLevelStart = (function () {
    function Message(coords) {
        this.coords = coords;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.COWLEVEL_START, this.coords.x, this.coords.y];
    };
    return Message;
}());
Messages.CowLevelEnd = (function () {
    function Message(isCompleted) {
        this.isCompleted = isCompleted;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.COWLEVEL_END, this.isCompleted];
    };
    return Message;
}());
Messages.MinotaurLevelStart = (function () {
    function Message(coords) {
        this.coords = coords;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.MINOTAURLEVEL_START];
    };
    return Message;
}());
Messages.MinotaurLevelEnd = (function () {
    function Message(isCompleted) {
        this.isCompleted = isCompleted;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.MINOTAURLEVEL_END];
    };
    return Message;
}());
Messages.ChaliceLevelStart = (function () {
    function Message(coords) {
        this.coords = coords;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.CHALICELEVEL_START];
    };
    return Message;
}());
Messages.ChaliceLevelEnd = (function () {
    function Message(isCompleted) {
        this.isCompleted = isCompleted;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.CHALICELEVEL_END, this.isCompleted];
    };
    return Message;
}());
Messages.TempleLevelStart = (function () {
    function Message(coords) {
        this.coords = coords;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.TEMPLELEVEL_START];
    };
    return Message;
}());
Messages.TempleLevelEnd = (function () {
    function Message() {
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.TEMPLELEVEL_END];
    };
    return Message;
}());
Messages.StoneLevelStart = (function () {
    function Message(coords) {
        this.coords = coords;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.STONELEVEL_START];
    };
    return Message;
}());
Messages.StoneLevelEnd = (function () {
    function Message(isCompleted) {
        this.isCompleted = isCompleted;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.STONELEVEL_END];
    };
    return Message;
}());
Messages.GatewayLevelStart = (function () {
    function Message(coords) {
        this.coords = coords;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.GATEWAYLEVEL_START];
    };
    return Message;
}());
Messages.GatewayLevelEnd = (function () {
    function Message(isCompleted) {
        this.isCompleted = isCompleted;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.GATEWAYLEVEL_END];
    };
    return Message;
}());
Messages.LevelInProgress = (function () {
    function Message(levelClock, level) {
        this.levelClock = levelClock;
        this.level = level;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.LEVEL_INPROGRESS, this.levelClock, this.level];
    };
    return Message;
}());
Messages.Health = (function () {
    function Message(health) {
        this.health = health;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.HEALTH, this.health];
    };
    return Message;
}());
Messages.HealthEntity = (function () {
    function Message(health) {
        this.health = health;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.HEALTH_ENTITY, this.health];
    };
    return Message;
}());
Messages.Frozen = (function () {
    function Message(entityId, duration) {
        this.entityId = entityId;
        this.duration = duration;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.FROZEN, this.entityId, this.duration];
    };
    return Message;
}());
Messages.Slowed = (function () {
    function Message(entityId, duration) {
        this.entityId = entityId;
        this.duration = duration;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.SLOWED, this.entityId, this.duration];
    };
    return Message;
}());
Messages.Poisoned = (function () {
    function Message(entityId, duration) {
        this.entityId = entityId;
        this.duration = duration;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.POISONED, this.entityId, this.duration];
    };
    return Message;
}());
Messages.Cursed = (function () {
    function Message(entityId, curseId, duration) {
        this.entityId = entityId;
        this.curseId = curseId;
        this.duration = duration;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.CURSED, this.entityId, this.curseId, this.duration];
    };
    return Message;
}());
Messages.Stats = (function () {
    function Message(stats) {
        this.stats = stats;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.STATS, this.stats];
    };
    return Message;
}());
Messages.SetBonus = (function () {
    function Message(bonus) {
        this.bonus = bonus;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.SETBONUS, this.bonus];
    };
    return Message;
}());
Messages.Settings = (function () {
    function Message(player, settings) {
        this.player = player;
        this.settings = settings;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.SETTINGS, this.player.id, this.settings];
    };
    return Message;
}());
Messages.EquipItem = (function () {
    function Message(player, item) {
        this.player = player;
        this.item = item;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.EQUIP, this.player.id, this.item];
    };
    return Message;
}());
Messages.Auras = (function () {
    function Message(player) {
        this.player = player;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.AURAS, this.player.id, this.player.auras];
    };
    return Message;
}());
Messages.Skill = (function () {
    function Message(player, skill) {
        this.player = player;
        this.skill = skill;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.SKILL, this.player.id, this.skill];
    };
    return Message;
}());
Messages.Drop = (function () {
    function Message(mob, item) {
        this.mob = mob;
        this.item = item;
    }
    Message.prototype.serialize = function () {
        var drop = [
            Types.Messages.DROP,
            __assign(__assign(__assign({}, this.item), { mobId: this.mob.id, itemId: this.item.id, kind: this.item.kind, mobHateList: _.map(this.mob.hateList, "id"), partyId: this.item.partyId }), (this.item.amount ? { amount: this.item.amount } : null)),
        ];
        return drop;
    };
    return Message;
}());
Messages.Chat = (function () {
    function Message(player, message, type, deductedGold) {
        this.player = player;
        this.message = message;
        this.type = type;
        this.deductedGold = deductedGold;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.CHAT, this.player.id, this.player.name, this.message, this.type, this.deductedGold];
    };
    return Message;
}());
Messages.Teleport = (function () {
    function Message(entity) {
        this.entity = entity;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.TELEPORT, this.entity.id, this.entity.x, this.entity.y, this.entity.orientation];
    };
    return Message;
}());
Messages.AnvilUpgrade = (function () {
    function Message(isSuccess) {
        this.isSuccess = isSuccess;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.ANVIL_UPGRADE, this.isSuccess];
    };
    return Message;
}());
Messages.AnvilRecipe = (function () {
    function Message(recipe) {
        this.recipe = recipe;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.ANVIL_RECIPE, this.recipe];
    };
    return Message;
}());
Messages.AnvilOdds = (function () {
    function Message(message) {
        this.message = message;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.ANVIL_ODDS, this.message];
    };
    return Message;
}());
Messages.Damage = (function () {
    function Message(entity, dmg, hp, maxHitPoints, isCritical, isBlocked) {
        this.entity = entity;
        this.dmg = dmg;
        this.hp = hp;
        this.maxHitPoints = maxHitPoints;
        this.isCritical = isCritical;
        this.isBlocked = isBlocked;
    }
    Message.prototype.serialize = function () {
        return [
            Types.Messages.DAMAGE,
            this.entity.id,
            this.dmg,
            this.hp,
            this.maxHitPoints,
            this.isCritical,
            this.isBlocked,
        ];
    };
    return Message;
}());
Messages.Population = (function () {
    function Message(players, levelupPlayer) {
        this.players = players;
        this.levelupPlayer = levelupPlayer;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.POPULATION, this.players, this.levelupPlayer];
    };
    return Message;
}());
Messages.Kill = (function () {
    function Message(mob, level, playerExp, exp) {
        this.mob = mob;
        this.level = level;
        this.playerExp = playerExp;
        this.exp = exp;
    }
    Message.prototype.serialize = function () {
        var _a;
        return [
            Types.Messages.KILL,
            {
                kind: this.mob.kind,
                level: this.level,
                playerExp: this.playerExp,
                exp: this.exp,
                isMiniBoss: !!(((_a = this.mob.enchants) === null || _a === void 0 ? void 0 : _a.length) >= 3) && !Types.isBoss(this.mob.kind),
            },
        ];
    };
    return Message;
}());
Messages.List = (function () {
    function Message(ids) {
        this.ids = ids;
    }
    Message.prototype.serialize = function () {
        var list = this.ids;
        list.unshift(Types.Messages.LIST);
        return list;
    };
    return Message;
}());
Messages.Destroy = (function () {
    function Message(entity) {
        this.entity = entity;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.DESTROY, this.entity.id];
    };
    return Message;
}());
Messages.Blink = (function () {
    function Message(item) {
        this.item = item;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.BLINK, this.item.id];
    };
    return Message;
}());
Messages.Party = (function () {
    function Message(action, info) {
        this.action = action;
        this.info = info;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.PARTY, this.action].concat(this.info);
    };
    return Message;
}());
Messages.SoulStone = (function () {
    function Message(item) {
        this.item = item;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.SOULSTONE, this.item];
    };
    return Message;
}());
Messages.Trade = (function () {
    function Message(action, info) {
        this.action = action;
        this.info = info;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.TRADE, this.action, this.info];
    };
    return Message;
}());
Messages.MerchantLog = (function () {
    function Message(log) {
        this.log = log;
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.MERCHANT.LOG, this.log];
    };
    return Message;
}());
Messages.Hash = (function () {
    function Message() {
    }
    Message.prototype.serialize = function () {
        return [Types.Messages.HASH];
    };
    return Message;
}());
export default Messages;
