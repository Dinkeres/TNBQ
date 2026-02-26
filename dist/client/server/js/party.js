import * as _ from "lodash";
import { Types } from "../../shared/js/gametypes";
import { getEntityLocation } from "../../shared/js/utils";
import Messages from "./message";
import { Sentry } from "./sentry";
export var MAX_PARTY_MEMBERS = 6;
var expPerPlayerMap = [100, 65, 50, 40, 30, 25];
var Party = (function () {
    function Party(id, player, server) {
        var _a;
        this.members = [];
        this.members = [];
        this.sentInvites = (_a = {},
            _a[player.id] = Date.now(),
            _a);
        this.id = id;
        this.server = server;
        this.partyLeader = {
            id: player.id,
            name: player.name,
        };
        this.lootMemberIndex = 0;
        this.hasPartyLeaderFirstLooted = false;
        this.addMember(player);
    }
    Party.prototype.getNextLootMemberId = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.isLooterInTown, isLooterInTown = _c === void 0 ? false : _c;
        var candidateIndex = this.lootMemberIndex;
        do {
            if (!this.members[candidateIndex]) {
                console.log("Skipped undefined member at index:", candidateIndex);
                candidateIndex = (candidateIndex + 1) % this.members.length;
                continue;
            }
            var player = this.server.getEntityById(this.members[candidateIndex].id);
            var playerLocation = getEntityLocation({ x: player.x, y: player.y });
            if (isLooterInTown || playerLocation !== "town") {
                console.log("Selected player:", player.id, player.name);
                this.lootMemberIndex = (candidateIndex + 1) % this.members.length;
                return player.id;
            }
            else {
                console.log("Skipped player:", player.id, player.name);
                player.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "You missed your party looting turn, you can't be sitting in town and looting items from party drops").serialize());
            }
            candidateIndex = (candidateIndex + 1) % this.members.length;
        } while (candidateIndex !== this.lootMemberIndex);
        console.log("No suitable player found. Defaulting to current looter.");
        return this.server.getEntityById(this.members[this.lootMemberIndex].id).id;
    };
    Party.prototype.addMember = function (player) {
        if (this.members.length === MAX_PARTY_MEMBERS) {
            player.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "The party is full").serialize());
            return;
        }
        else if (this.members.length > MAX_PARTY_MEMBERS) {
            this.server.databaseHandler.logEvent({ event: "addMember - disband", memberLength: this.members.length });
            this.disband();
            return;
        }
        if (!this.sentInvites[player.id]) {
            player.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "No invite was sent. Ask the party leader for an invite").serialize());
            return;
        }
        this.members.push({ id: player.id, name: player.name });
        player.setPartyId(this.id);
        this.server.pushToParty(this, new Messages.Party(Types.Messages.PARTY_ACTIONS.JOIN, [
            { playerName: player.name, members: this.members, partyId: this.id, partyLeader: this.partyLeader },
        ]));
        this.deleteInvite(player);
        this.updatePartyBonus();
    };
    Party.prototype.invite = function (player) {
        this.sentInvites[player.id] = new Date().valueOf();
        this.server.pushToPlayer(player, new Messages.Party(Types.Messages.PARTY_ACTIONS.INVITE, [{ partyId: this.id, partyLeader: this.partyLeader }]));
    };
    Party.prototype.deleteInvite = function (player) {
        delete this.sentInvites[player.id];
    };
    Party.prototype.refuse = function (player) {
        this.deleteInvite(player);
        this.server.pushToPlayer(player, new Messages.Party(Types.Messages.PARTY_ACTIONS.REFUSE, [{ partyId: this.id }]));
    };
    Party.prototype.updatePartyBonus = function () {
        var _this = this;
        this.forEachMember(function (member) {
            if (!member || !member.id) {
                return;
            }
            var player = _this.server.getEntityById(member.id);
            if (player) {
                player.calculatePartyBonus();
                player.sendPlayerStats();
            }
            else {
                Sentry.captureException(new Error("Missing entity ID in party"), {
                    extra: {
                        id: member.id,
                    },
                });
            }
        });
    };
    Party.prototype.shareExp = function (mob) {
        var _this = this;
        var baseExp = Types.getMobExp(mob.kind);
        var expPerPlayer = (baseExp * expPerPlayerMap[this.members.length - 1]) / 100;
        this.forEachMember(function (_a) {
            var id = _a.id;
            var player = _this.server.getEntityById(id);
            if (!player)
                return;
            var x = Math.abs(player.x - mob.x);
            var y = Math.abs(player.y - mob.y);
            if (x <= 50 && y <= 50) {
                _this.server.incrementExp(player, mob, expPerPlayer);
            }
        });
    };
    Party.prototype.removeMember = function (player) {
        var _this = this;
        var playerIndex = this.members.findIndex(function (_a) {
            var id = _a.id;
            return player.id === id;
        });
        if (playerIndex >= 0) {
            this.members.splice(playerIndex, 1);
            player.partyId = undefined;
            if (playerIndex === 0 && this.members.length) {
                this.partyLeader = this.members[0];
            }
            this.server.pushToParty(this, new Messages.Party(Types.Messages.PARTY_ACTIONS.LEAVE, {
                partyId: this.id,
                partyLeader: this.partyLeader,
                members: this.members,
                playerName: player.name,
            }));
            player.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.LEAVE, { playerName: player.name }).serialize());
            if (!this.members.length) {
                Object.keys(this.sentInvites).forEach(function (id) {
                    var invitedPlayer = _this.server.getEntityById(id);
                    invitedPlayer === null || invitedPlayer === void 0 ? void 0 : invitedPlayer.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.DELETE_INVITE, { partyId: _this.id }).serialize());
                });
                delete this.server.parties[this.id];
            }
            else {
                this.updatePartyBonus();
            }
        }
        else {
            player.send(new Messages.Party(Types.Messages.PARTY_ACTIONS.ERROR, "Player ".concat(player.name, " is not in the party")).serialize());
        }
    };
    Party.prototype.disband = function () {
        var _this = this;
        this.forEachMember(function (_a) {
            var id = _a.id;
            var player = _this.server.getEntityById(id);
            if (player) {
                _this.server.pushToPlayer(player, new Messages.Party(Types.Messages.PARTY_ACTIONS.DISBAND));
                player.setPartyId(undefined);
            }
        });
        this.updatePartyBonus();
        delete this.server.parties[this.id];
    };
    Party.prototype.forEachMember = function (iterator) {
        var _a, _b;
        if (!this.members.length || !((_b = (_a = this.members) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id))
            return;
        _.each(this.members, iterator);
    };
    Party.prototype.memberNames = function () {
        return _.map(this.members, function (name) {
            return name;
        });
    };
    return Party;
}());
export default Party;
