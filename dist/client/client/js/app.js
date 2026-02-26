import CryptoJS from "crypto-js";
import * as _ from "lodash";
import { Types } from "../../shared/js/gametypes";
import { calculateLowerResistances } from "../../shared/js/types/resistance";
import { isValidAccountAddress, toString } from "../../shared/js/utils";
import storage from "./storage";
import Store from "./store";
import { TRANSITIONEND } from "./utils";
var networkDividerMap = {
    nano: 100000,
    ban: 10000,
};
var MAX_CONTEXT_MENU_COUNT = 5;
var passwordKey = "Good Morning";
var App = (function () {
    function App() {
        var _a, _b;
        this.currentPage = 1;
        this.blinkInterval = null;
        this.achievementTimeout = null;
        this.isParchmentReady = true;
        this.ready = false;
        this.storage = storage;
        this.store = new Store(this);
        this.getUsernameField = function () { };
        this.getPlayButton = function () { };
        this.getAccountField = function () { };
        this.getPasswordField = function () { };
        this.getPasswordConfirmField = function () { };
        this.isDesktop = true;
        this.supportsWorkers = false;
        this.$play = null;
        this.$loginNameInput = null;
        this.$loginAccountInput = null;
        this.$loginPasswordInput = null;
        this.$createPasswordInput = null;
        this.$createPasswordConfirmInput = null;
        this.$nameInput = null;
        this.$accountInput = null;
        this.loginFormFields = [];
        this.createNewCharacterFormFields = [];
        this.watchNameInputInterval = setInterval(this.toggleButton.bind(this), 100);
        this.playButtonRestoreText = "";
        this.contextMenuTimeout = null;
        this.partyBlinkInterval = null;
        this.contextmenuCount = 0;
        this.isContextMenuBlocked = false;
        var _c = ((_b = (_a = this.storage) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.player) || {}, playerName = _c.name, account = _c.account;
        if (playerName) {
            this.frontPage = "loadcharacter";
            $("#loginnameinput").val(playerName);
            if (account) {
                $("#loginaccountinput").val(account);
            }
        }
        else {
            this.frontPage = "createcharacter";
        }
        document.getElementById("parchment").className = this.frontPage;
        this.initFormFields();
    }
    App.prototype.setGame = function (game) {
        this.game = game;
        this.isMobile = this.game.renderer.mobile;
        this.isTablet = this.game.renderer.tablet;
        this.isDesktop = !(this.isMobile || this.isTablet);
        this.supportsWorkers = !!window.Worker;
        this.ready = true;
    };
    App.prototype.checkContextmenuabuse = function () {
        var _this = this;
        if (this.isContextMenuBlocked || this.contextMenuTimeout) {
            this.game.chat_callback({
                message: "You've sent too many requests, you're blocked for 30 seconds",
                type: "error",
            });
            return false;
        }
        this.contextmenuCount += 1;
        if (this.contextmenuCount > MAX_CONTEXT_MENU_COUNT) {
            this.isContextMenuBlocked = true;
            this.contextMenuTimeout = setTimeout(function () {
                _this.contextmenuCount = 0;
                _this.contextMenuTimeout = null;
                _this.isContextMenuBlocked = false;
            }, 30000);
            return false;
        }
        return true;
    };
    App.prototype.initContextMenu = function () {
        var _this = this;
        $.contextMenu({
            selector: "#canvas",
            animation: { duration: 25, show: "fadeIn", hide: "fadeOut" },
            build: function (_event) {
                var _a = _this.game.getMouseGridPosition(), x = _a.x, y = _a.y;
                var player = _this.game.getPlayerAt(x, y);
                var isInParty = !!(player === null || player === void 0 ? void 0 : player.partyId);
                if (!player || player.id === _this.game.player.id) {
                    return null;
                }
                var items = {
                    player: {
                        name: player.name,
                        disabled: true,
                    },
                    trade: {
                        name: player.settings.tradeEnabled ? "Trade" : "Player has disabled Trade",
                        callback: function () {
                            if (_this.checkContextmenuabuse() && player.settings.tradeEnabled) {
                                _this.game.say("/trade ".concat(player.name));
                            }
                        },
                        disabled: !player.settings.tradeEnabled,
                    },
                    party: {
                        name: player.settings.partyEnabled ? (isInParty ? "In a party" : "Party") : "Player has Disabled Party",
                        callback: function () {
                            if (!isInParty && player.settings.partyEnabled) {
                                if (!_this.game.player.partyId && _this.checkContextmenuabuse()) {
                                    _this.game.say("/party create");
                                }
                                _this.game.say("/party invite ".concat(player.name));
                            }
                        },
                        disabled: isInParty || !player.settings.partyEnabled,
                    },
                    equipment: {
                        name: "View equipment",
                        callback: function () {
                            $("#otherplayer-name").html("Equipment of <var>".concat(player.name, "</var>"));
                            _this.openOtherPlayerEquipment(player);
                        },
                    },
                };
                return { items: items };
            },
        });
    };
    App.prototype.initFormFields = function () {
        var _this = this;
        this.$play = $(".play");
        this.getPlayButton = function () {
            var activeForm = this.getActiveForm();
            return activeForm ? activeForm.find(".play span, .play.button div") : null;
        };
        this.setPlayButtonState(true);
        this.$loginNameInput = $("#loginnameinput");
        this.$loginAccountInput = $("#loginaccountinput");
        this.$loginPasswordInput = $("#loginpasswordinput");
        this.$createPasswordInput = $("#createpasswordinput");
        this.$createPasswordConfirmInput = $("#createpasswordconfirminput");
        this.loginFormFields = [
            this.$loginNameInput,
            this.$loginAccountInput,
            this.$loginPasswordInput,
            this.$createPasswordInput,
            this.$createPasswordConfirmInput,
        ];
        this.$nameInput = $("#nameinput");
        this.$accountInput = $("#accountinput");
        this.createNewCharacterFormFields = [this.$nameInput, this.$accountInput, this.$createPasswordInput];
        this.getUsernameField = function () {
            if (_this.$nameInput.is(":visible")) {
                return _this.$nameInput;
            }
            if (_this.$loginNameInput.is(":visible")) {
                return _this.$loginNameInput;
            }
            if (_this.$nameInput.val()) {
                return _this.$nameInput;
            }
            return _this.$loginNameInput;
        };
        this.getAccountField = function () {
            if (_this.$accountInput.val()) {
                return _this.$accountInput;
            }
            if (_this.$loginAccountInput.val()) {
                return _this.$loginAccountInput;
            }
            return _this.$accountInput;
        };
        this.getPasswordField = function () {
            if (_this.$loginPasswordInput.is(":visible")) {
                return _this.$loginPasswordInput;
            }
            if (_this.$createPasswordInput.is(":visible")) {
                return _this.$createPasswordInput;
            }
            return undefined;
        };
        this.getPasswordConfirmField = function () {
            return _this.$createPasswordConfirmInput;
        };
        $("#have-account").on("click", function () {
            $("#accountinput").addClass("visible");
            $("#have-account").removeClass("visible");
        });
        this.setFocus();
    };
    App.prototype.center = function () {
        window.scrollTo(0, 1);
    };
    App.prototype.canStartGame = function () {
        if (this.isDesktop) {
            return this.game && this.game.map && this.game.map.isLoaded;
        }
        else {
            return this.game;
        }
    };
    App.prototype.tryStartingGame = function () {
        if (this.starting)
            return;
        var self = this;
        var action = this.$nameInput.val() ? "create" : "login";
        var username = this.getUsernameField().val();
        var account = this.getAccountField().val();
        var password = this.getPasswordField() ? this.getPasswordField().val() : undefined;
        var passwordConfirm = this.getPasswordConfirmField().is(":visible")
            ? this.getPasswordConfirmField().val()
            : undefined;
        var network = ((account === null || account === void 0 ? void 0 : account.split("_")) || [])[0];
        if (!network) {
            network = "nano";
            if (window.location.hostname === "bananobrowserquest.com") {
                network = "ban";
            }
        }
        if (!this.validateFormFields({ username: username, account: account, password: password, passwordConfirm: passwordConfirm }))
            return;
        if (password) {
            var encryptedPassword = CryptoJS.AES.encrypt(password, "@todo-define-secret".concat(passwordKey)).toString();
            this.storage.setPlayerPassword(encryptedPassword);
        }
        this.setPlayButtonState(false);
        if (!this.ready || !this.canStartGame()) {
            var watchCanStart = setInterval(function () {
                console.debug("waiting...");
                if (self.canStartGame()) {
                    clearInterval(watchCanStart);
                    self.startGame(action, username, account, network, password);
                }
            }, 100);
        }
        else {
            this.startGame(action, username, account, network, password);
        }
    };
    App.prototype.startGame = function (action, username, account, network, password) {
        var self = this;
        if (username && !this.game.started) {
            this.game.setPlayerAccount({ username: username, account: account, network: network, password: password });
            var config = { host: "localhost", port: 8000 };
            if (process.env.NODE_ENV !== "development") {
                config = { host: "", port: 8000 };
                if (window.location.host.endsWith("bananobrowserquest.com")) {
                    config.host = window.location.host.replace("ba", "");
                }
            }
            this.game.setServerOptions(config.host, config.port);
            if (!self.isDesktop) {
                self.game.loadMap();
            }
            this.center();
            this.game.connect(action, function (result) {
                var _a, _b;
                if (result.reason) {
                    if ((result === null || result === void 0 ? void 0 : result.error) === "banned") {
                        if (result.admin) {
                            $("#banned-admin").text(" By Admin: ".concat(result.admin));
                        }
                        $("#banned-player").text(result.player);
                        if (result.ip) {
                            $("#banned-ip").text("IP:".concat(result.ip));
                        }
                        $("#banned-reason").text(result.reason);
                        $("#banned-message").text(result.message);
                        if (result.until) {
                            $("#banned-until").text("(".concat(new Date(Number(result.until))));
                        }
                        $(".banned").show();
                        self.toggleScrollContent("banned");
                        return;
                    }
                    switch (result.reason) {
                        case "invalidlogin":
                            self.addValidationError(null, "The username or address you entered is incorrect.");
                            self.getUsernameField().focus();
                            self.setPlayButtonState(true);
                            break;
                        case "userexists":
                            self.addValidationError(self.getUsernameField(), "The username you entered is not available.");
                            self.setPlayButtonState(true);
                            break;
                        case "invalidusernameCreation":
                            self.addValidationError(self.getUsernameField(), "You created Too many characters Today, try again tomorrow.");
                            self.setPlayButtonState(true);
                            break;
                        case "invalidusername":
                            self.addValidationError(self.getUsernameField(), "The username you entered contains invalid characters or words.");
                            self.setPlayButtonState(true);
                            break;
                        case "loggedin":
                            self.addValidationError(self.getUsernameField(), "A player with the specified username is already logged in.");
                            self.setPlayButtonState(true);
                            break;
                        case "banned":
                            $(".banned").show();
                            self.toggleScrollContent("banned");
                            break;
                        case "invalidconnection":
                            self.animateParchment("loadcharacter", "invalidconnection");
                            break;
                        case "passwordcreate":
                            self.animateParchment("createcharacter", "createpassword");
                            break;
                        case "passwordlogin":
                            self.animateParchment("loadcharacter", "enterpassword");
                            var encryptedPassword = (_b = (_a = self.storage.data) === null || _a === void 0 ? void 0 : _a.player) === null || _b === void 0 ? void 0 : _b.password;
                            if (encryptedPassword) {
                                try {
                                    var bytes = CryptoJS.AES.decrypt(encryptedPassword, "@todo-define-secret".concat(passwordKey));
                                    var decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                                    $("#loginpasswordinput").val(decryptedPassword);
                                }
                                catch (err) {
                                    console.log("Invalid password decryption");
                                }
                            }
                            break;
                        case "passwordinvalid":
                            self.addValidationError(null, "The password is incorrect.");
                            self.setPlayButtonState(true);
                            break;
                        default:
                            self.addValidationError(null, "Failed to launch the game: " + (result.reason ? result.reason : "(reason unknown)"));
                            self.setPlayButtonState(true);
                            break;
                    }
                }
            });
        }
    };
    App.prototype.start = function () {
        this.hideIntro();
        $("body").addClass("started");
        $(document).off(".loginform");
        this.initDialog();
        this.initContextMenu();
    };
    App.prototype.initDialog = function () {
        var self = this;
        $("#dialog-delete-item").dialog({
            dialogClass: "no-close",
            autoOpen: false,
            draggable: false,
            title: "Delete item",
            open: function () {
                var _a, _b;
                $("#dialog-delete-item").html("Are you sure you want to delete this".concat((((_a = self.game.itemToDelete) === null || _a === void 0 ? void 0 : _a.isSuperior) ? '<span class="item-superior"> Superior</span>' : "") +
                    (((_b = self.game.itemToDelete) === null || _b === void 0 ? void 0 : _b.isUnique) ? '<span class="item-unique"> Unique</span>' : ""), " item?"));
            },
            buttons: [
                {
                    text: "Cancel",
                    class: "btn btn-default",
                    click: function () {
                        self.game.slotToDelete = null;
                        $(this).dialog("close");
                    },
                },
                {
                    text: "Ok",
                    class: "btn",
                    click: function () {
                        self.game.deleteItemFromSlot();
                        self.game.slotToDelete = null;
                        $(this).dialog("close");
                    },
                },
            ],
        });
        $("#dialog-merchant-item").dialog({
            dialogClass: "no-close",
            autoOpen: false,
            draggable: false,
            title: "Sell item to merchant",
            open: function () {
                var _a, _b, _c, _d;
                $("#dialog-merchant-item").html("Are you sure you want to sell ".concat(((_a = self.game.confirmedSoldItemToMerchant) === null || _a === void 0 ? void 0 : _a.transferedQuantity) > 1 ? "these" : "this").concat((((_b = self.game.confirmedSoldItemToMerchant) === null || _b === void 0 ? void 0 : _b.isSuperior) ? '<span class="item-superior"> Superior</span>' : "") +
                    (((_c = self.game.confirmedSoldItemToMerchant) === null || _c === void 0 ? void 0 : _c.isUnique) ? '<span class="item-unique"> Unique</span>' : ""), " item to the merchant for <span class=\"gold\">").concat((_d = self.game.confirmedSoldItemToMerchant) === null || _d === void 0 ? void 0 : _d.amount, "</span> gold?"));
            },
            buttons: [
                {
                    text: "Cancel",
                    class: "btn btn-default",
                    click: function () {
                        self.game.confirmedSoldItemToMerchant = null;
                        $(this).dialog("close");
                    },
                },
                {
                    text: "Ok",
                    class: "btn",
                    click: function () {
                        var _a = self.game.confirmedSoldItemToMerchant, fromSlot = _a.fromSlot, toSlot = _a.toSlot, transferedQuantity = _a.transferedQuantity, confirmed = _a.confirmed;
                        clearTimeout(self.game.onSendMoveItemTimeout);
                        self.game.onSendMoveItemTimeout = null;
                        self.game.dropItem(fromSlot, toSlot, transferedQuantity, confirmed);
                        self.game.confirmedSoldItemToMerchant = null;
                        $(this).dialog("close");
                    },
                },
            ],
        });
        $(".ui-dialog-buttonset").find(".ui-button").removeClass("ui-button ui-corner-all ui-widget");
    };
    App.prototype.initBanDialog = function () {
        var self = this;
        $(document)
            .off(".ban-player-reason")
            .on("change.ban-player-reason", "#ban-player-reason", function () {
            var selectedOption = $(this).val();
            console.log("Selected option:", selectedOption);
            if (selectedOption === "Inappropriate Name" && !$("#ban-player-message").val()) {
                $("#ban-player-message").text("Please contact running-coder in discord to change your name.");
            }
        });
        $("#dialog-ban-player").dialog({
            dialogClass: "no-close",
            autoOpen: false,
            draggable: false,
            title: "Ban Player",
            classes: {
                "ui-button": "btn",
            },
            buttons: [
                {
                    text: "Cancel",
                    class: "btn btn-default",
                    click: function () {
                        $(this).dialog("close");
                    },
                },
                {
                    text: "Ok",
                    class: "btn",
                    click: function () {
                        var player = $("#ban-player-name").val();
                        var reason = $("#ban-player-reason").val();
                        var duration = Number($("#ban-player-until").val()) || 365;
                        var message = $("#ban-player-message").val();
                        var isIPBan = $("#ban-player-ip").is(":checked");
                        var isChatBan = $("#ban-player-chatban").is(":checked");
                        self.game.client.sendManualBanPlayer({ player: player, reason: reason, duration: duration, message: message, isIPBan: isIPBan, isChatBan: isChatBan });
                        $(this).dialog("close");
                    },
                },
            ],
        });
        var reasons = ["spam", "misbehave", "cheating", "Inappropriate Language", , "Inappropriate Name", "other"];
        var durations = [1, 7, 365];
        $("#dialog-ban-player").html("<div style=\"margin: 24px 0; text-align: center;\">\n        <select id=\"ban-player-name\"  style=\"width: 50%;font-family: 'GraphicPixel';\" />\n        <option>Player</option>\n        ".concat(this.game.worldPlayers.map(function (_a) {
            var name = _a.name, ip = _a.ip;
            return "<option value=\"".concat(name, "\">").concat(name, "(").concat(ip || "unknown IP", ")</option>");
        }), "\n        </select>\n        </br>\n        <label>\n        <input type=\"checkbox\" checked id=\"ban-player-ip\" />Include IP ban\n        </label>\n        </br>\n        <label>\n        <input type=\"checkbox\" id=\"ban-player-chatban\" /> ChatBan Only\n        </label>\n        </br>\n        <select id=\"ban-player-until\"  style=\"width: 50%;font-family: 'GraphicPixel';\" />\n        <option>Duration</option>\n        ").concat(durations.map(function (days) { return "<option value=\"".concat(days, "\">").concat(days, "day(s)</option>"); }), "\n        </select>\n\n        <select id=\"ban-player-reason\"  style=\"width: 50%;font-family: 'GraphicPixel';\" />\n        <option>Reason</option>\n      ").concat(reasons.map(function (reason) { return "<option value=\"".concat(reason, "\">").concat(reason, "</option>"); }), "\n        </select>\n        <textarea id=\"ban-player-message\" rows=\"4\" placeholder=\"describe the reason for the ban (visible to the banned player)\"></textarea>\n      </div>"));
        $(".ui-dialog-buttonset").find(".ui-button").removeClass("ui-button ui-corner-all ui-widget");
        $("#dialog-ban-player").dialog("open");
    };
    App.prototype.setPlayButtonState = function (enabled) {
        var _this = this;
        var $playButton = this.getPlayButton();
        if (!$playButton)
            return;
        if ($playButton.find(".link").text() !== "Loading...") {
            this.playButtonRestoreText = $playButton.find(".link").text();
        }
        if (enabled) {
            this.starting = false;
            this.$play.removeClass("loading");
            $playButton.off("click").on("click", function () {
                _this.tryStartingGame();
            });
            if (!$playButton.hasClass("button")) {
                $playButton.find(".link").text(this.playButtonRestoreText);
            }
        }
        else {
            this.starting = true;
            this.$play.addClass("loading");
            $playButton.unbind("click");
            if (!$playButton.hasClass("button")) {
                $playButton.find(".link").text("Loading...");
            }
        }
    };
    App.prototype.updatePartyMembers = function (members) {
        var _this = this;
        var partyHtml = members
            .map(function (_a) {
            var _b;
            var id = _a.id, name = _a.name;
            var isPartyLeader = ((_b = _this.game.player.partyLeader) === null || _b === void 0 ? void 0 : _b.name) === name;
            var isSelf = _this.game.player.name === name;
            return "<div>\n      <div class=\"player-name ".concat(isSelf ? "self" : "", "\" data-player-id=\"").concat(id, "\">\n        ").concat(isPartyLeader ? "<span class='party-leader'>[P]</span>" : "").concat(name, "\n      </div>\n      <div class=\"player-health-bar-container\">\n        <div id=\"player-health-").concat(id, "\" class=\"player-health\"></div>\n        <div class=\"player-health-bar\"></div>\n      </div>\n    </div>");
        })
            .join("");
        $("#party-player-list").empty().html(partyHtml);
        this.game.initTeleportContextMenu();
    };
    App.prototype.updatePartyHealthBar = function (member) {
        var id = member.id, hp = member.hp, mHp = member.mHp;
        $("#player-health-".concat(id)).css("width", "".concat(Math.floor((hp * 100) / mHp), "%"));
    };
    App.prototype.removePartyHealthBar = function () {
        $("#party-player-list").empty();
    };
    App.prototype.getActiveForm = function () {
        if (this.loginFormActive())
            return $("#loadcharacter");
        else if (this.createNewCharacterFormActive())
            return $("#createcharacter");
        else if (this.createPasswordFormActive())
            return $("#createpassword");
        else if (this.enterPasswordFormActive())
            return $("#enterpassword");
        else
            return null;
    };
    App.prototype.loginFormActive = function () {
        return $("#parchment").hasClass("loadcharacter");
    };
    App.prototype.createNewCharacterFormActive = function () {
        return $("#parchment").hasClass("createcharacter");
    };
    App.prototype.createPasswordFormActive = function () {
        return $("#parchment").hasClass("createpassword");
    };
    App.prototype.enterPasswordFormActive = function () {
        return $("#parchment").hasClass("enterpassword");
    };
    App.prototype.validateFormFields = function (_a) {
        var username = _a.username, account = _a.account, password = _a.password, passwordConfirm = _a.passwordConfirm;
        this.clearValidationErrors();
        if (!username) {
            this.addValidationError(this.getUsernameField(), "Enter a character name.");
            return false;
        }
        if (account && !isValidAccountAddress(account)) {
            this.addValidationError(this.getAccountField(), "Enter a valid address starting with \"nano_\" or leave the field empty.");
            return false;
        }
        if (typeof password === "string" && (password.length < 4 || password.length > 24)) {
            this.addValidationError(this.getPasswordField(), "Password must be between 4 and 24 characters.");
            return false;
        }
        else if (typeof passwordConfirm === "string" && (passwordConfirm.length < 4 || passwordConfirm.length > 24)) {
            this.addValidationError(this.getPasswordConfirmField(), "Password confirm must be between 4 and 24 characters.");
            return false;
        }
        else if (typeof password === "string" && typeof passwordConfirm === "string" && password !== passwordConfirm) {
            this.addValidationError(this.getPasswordConfirmField(), "Password confirm must be the same as the password.");
            return false;
        }
        return true;
    };
    App.prototype.addValidationError = function (field, errorText) {
        var validationSummary = $(".validation-summary:visible");
        $("<span/>", {
            class: "validation-error blink",
            text: errorText,
        }).appendTo(validationSummary);
        if (field) {
            if (!this.game.started) {
                field.addClass("field-error").select();
            }
            field.on("keypress.validation", function () {
                field.removeClass("field-error").off(".validation");
                $(".validation-error").remove();
            });
        }
    };
    App.prototype.clearValidationErrors = function () {
        var fields = this.loginFormActive() ? this.loginFormFields : this.createNewCharacterFormFields;
        $.each(fields, function (i, field) {
            field.removeClass("field-error");
        });
        $(".validation-error").remove();
    };
    App.prototype.setMouseCoordinates = function (event) {
        var gamePos = $("#container").offset();
        var scale = this.game.renderer.getScaleFactor();
        var width = this.game.renderer.getWidth();
        var height = this.game.renderer.getHeight();
        var mouse = this.game.mouse;
        if (!gamePos)
            return;
        mouse.x = event.pageX - gamePos.left - (this.isMobile ? 0 : 5 * scale);
        mouse.y = event.pageY - gamePos.top - (this.isMobile ? 0 : 7 * scale);
        if (mouse.x <= 0) {
            mouse.x = 0;
        }
        else if (mouse.x >= width) {
            mouse.x = width - 1;
        }
        if (mouse.y <= 0) {
            mouse.y = 0;
        }
        else if (mouse.y >= height) {
            mouse.y = height - 1;
        }
    };
    App.prototype.initTargetHud = function () {
        var _a;
        var self = this;
        (_a = this.game.player) === null || _a === void 0 ? void 0 : _a.onSetTarget(function (target, name) {
            if (target.id === self.game.player.id ||
                target.kind === Types.Entities.TREE ||
                target.kind === Types.Entities.GATEWAYFX ||
                target.kind === Types.Entities.GATE) {
                return;
            }
            var inspector = $("#inspector");
            var isPlayer = target.kind === Types.Entities.WARRIOR;
            var isPet = target.type === "pet";
            var alias = isPlayer || isPet
                ? target.name
                : Types.getAliasFromName(Types.getKindAsString(target.kind)) || target.name || name;
            inspector.find(".name").toggleClass("mob", !isPlayer).text("".concat(alias));
            inspector.find(".name").toggleClass("is-boss", Types.isBoss(target.kind));
            inspector.find(".health").toggleClass("is-mini-boss", Types.isMiniBoss(target));
            inspector.find(".resistances").empty();
            if (target.hitPoints) {
                inspector.find(".health").css("width", Math.round((target.hitPoints / target.maxHitPoints) * 100) + "%");
            }
            else {
                inspector.find(".health").css("width", "0%");
            }
            var htmlEnchants = [];
            if (target === null || target === void 0 ? void 0 : target.enchants) {
                target === null || target === void 0 ? void 0 : target.enchants.map(function (enchant) {
                    var display = Types.enchantToDisplayMap[enchant];
                    htmlEnchants.push("<span class=\"".concat(enchant, "\">").concat(display, "</span>"));
                });
            }
            var level = !isPlayer ? Types.getMobLevel(target.kind) : target.level;
            if (level) {
                htmlEnchants.push("<span class=\"\">lv.".concat(level, "</span>"));
            }
            inspector.find(".enchants").html(htmlEnchants.join("<span>&bull;</span>"));
            var htmlResistances = [];
            if (target === null || target === void 0 ? void 0 : target.resistances) {
                Object.entries(calculateLowerResistances(target.resistances, self.game.player.bonus)).map(function (_a) {
                    var type = _a[0], percentage = _a[1];
                    if (!percentage)
                        return;
                    var display = Types.resistanceToDisplayMap[type];
                    var prefix = percentage === 100 ? "Immuned to" : "Resistance to";
                    htmlResistances.push("<span class=\"".concat(display, "\">").concat(prefix, " ").concat(_.capitalize(display), " ").concat(percentage !== 100 ? "".concat(percentage, "%") : "", "</span>"));
                });
            }
            inspector.find(".resistances").html(htmlResistances.join("<span>&bull;</span>"));
            inspector.fadeIn("fast");
        });
        self.game.onUpdateTarget(function (target) {
            var _a;
            if (((_a = self.game.player.inspecting) === null || _a === void 0 ? void 0 : _a.id) !== target.id) {
                return;
            }
            $("#inspector .health").css("width", Math.round((target.hitPoints / target.maxHitPoints) * 100) + "%");
            self.game.player.skillTargetId = null;
        });
    };
    App.prototype.initExpBar = function () {
        var self = this;
        var maxHeight = $("#expbar").height() || 0;
        this.game.onPlayerExpChange(function (expInThisLevel, expForLevelUp) {
            var barHeight = Math.round((maxHeight / expForLevelUp) * (expInThisLevel > 0 ? expInThisLevel : 0));
            $("#expbar").css("height", barHeight + "px");
        });
        $("#expbar").mouseover(function () {
            if (!self.game.player)
                return;
            var expInThisLevel = self.game.player.experience - Types.expForLevel[self.game.player.level - 1];
            var expForLevelUp = Types.expForLevel[self.game.player.level] - Types.expForLevel[self.game.player.level - 1];
            var expPercentThisLevel = (100 * expInThisLevel) / expForLevelUp;
            var expPercentAsString = "".concat(expPercentThisLevel * 100);
            var message = "You are level ".concat(self.game.player.level, ".");
            if (!isNaN(expForLevelUp)) {
                message += " ".concat(parseInt(expPercentAsString, 10) / 100, " % of this level done.");
            }
            self.game.showNotification(message);
        });
    };
    App.prototype.initHealthBar = function () {
        var scale = this.game.renderer.getScaleFactor();
        var healthMaxWidth = $("#healthbar").width() - 12 * scale;
        this.game.onPlayerHealthChange(function (hp, maxHitPoints) {
            var barWidth = Math.round((healthMaxWidth / maxHitPoints) * (hp > 0 ? hp : 0));
            $("#hitpoints").css("width", barWidth + "px");
        });
        this.game.onPlayerHurt(this.blinkHealthBar.bind(this));
    };
    App.prototype.initPlayerInfo = function () {
        var _this = this;
        var self = this;
        var _a = this.game, account = _a.account, network = _a.network;
        var name = this.game.player.name;
        $("#player-username").text(name);
        $("#completedbutton").addClass(network);
        var input = $("#player-account-input");
        var confirmBtn = $("#player-account-confirm");
        var linkBtn = $("#player-account-link");
        if (account.startsWith("ban_")) {
            this.game.explorer = "bananolooker";
        }
        if (account) {
            linkBtn.show();
            confirmBtn.hide();
            input.val(account).attr("readonly", "readonly");
            linkBtn.off(".open").on("click.open", function () {
                window.open("https://".concat(_this.game.explorer, ".com/account/").concat(account), "_blank");
            });
        }
        else {
            confirmBtn.attr("disabled", "disabled").addClass("disabled btn-default");
            linkBtn.hide();
            input.off(".validate").on("input.validate", function () {
                var value = input.val();
                var isValid = isValidAccountAddress(value);
                input.removeClass("field-error");
                $(".validation-error").remove();
                if (!isValid) {
                    confirmBtn.attr("disabled", "disabled").addClass("disabled btn-default");
                    self.addValidationError($("#player-account-input"), "Enter a valid address starting with \"nano_\"");
                }
                else {
                    confirmBtn.removeAttr("disabled").removeClass("disabled btn-default");
                }
            });
            confirmBtn.off(".confirm").on("click.confirm", function (e) {
                e.preventDefault();
                var value = input.val();
                if (!isValidAccountAddress(value)) {
                    self.addValidationError($("#player-account-input"), "Enter a valid address starting with \"nano_\"");
                }
                else {
                    self.game.client.sendAccount(value);
                }
            });
        }
    };
    App.prototype.blinkHealthBar = function () {
        var $hitpoints = $("#hitpoints");
        $hitpoints.addClass("white");
        setTimeout(function () {
            $hitpoints.removeClass("white");
        }, 500);
    };
    App.prototype.toggleButton = function () {
        var name = $("#parchment input").val();
        var $play = $("#createcharacter .play");
        if ((name === null || name === void 0 ? void 0 : name.length) > 0) {
            $play.removeClass("disabled");
            $("#character").removeClass("disabled");
        }
        else {
            $play.addClass("disabled");
            $("#character").addClass("disabled");
        }
    };
    App.prototype.hideIntro = function () {
        clearInterval(this.watchNameInputInterval);
        $("body").removeClass("intro");
        setTimeout(function () {
            $("body").addClass("game");
        }, 500);
    };
    App.prototype.scrollChatToBottom = function () {
        var chatBox = document.getElementById("text-list");
        chatBox.scrollTop = chatBox.scrollHeight;
    };
    App.prototype.showChat = function () {
        if (!this.game.started)
            return;
        $("#chatbutton").addClass("active").removeClass("blink");
        $("#text-window").show();
        this.scrollChatToBottom();
        $("#chatinput").trigger("focus");
    };
    App.prototype.hideChat = function () {
        if (!this.game.started)
            return;
        $("#chatinput").trigger("blur");
        $("#chatbutton").removeClass("active");
        $("#text-window").hide();
    };
    App.prototype.toggleInstructions = function () {
        $("#instructions").toggleClass("active");
    };
    App.prototype.toggleAchievements = function () {
        this.hideWindows();
        this.resetAchievementPage();
        $("#achievements").toggleClass("active");
    };
    App.prototype.toggleCompleted = function () {
        $("#completed").toggleClass("active");
    };
    App.prototype.toggleAbout = function () {
        if ($("body").hasClass("about")) {
            this.closeInGameScroll("about");
        }
        else {
            this.toggleScrollContent("about");
        }
    };
    App.prototype.toggleSettings = function () {
        var isActive = $("#settings").hasClass("active");
        if (isActive) {
            $(document.activeElement).blur();
        }
        this.hideWindows();
        $("#settings").toggleClass("active", !isActive);
        var input = $("#player-account-input");
        var inputIsReadonly = !!input.attr("readonly");
        if (!isActive) {
            if (!inputIsReadonly) {
                input.val("").removeClass("field-error");
                $(".validation-error").remove();
            }
        }
    };
    App.prototype.togglePartyWindow = function () {
        var isActive = $("#party").hasClass("active");
        this.hideWindows();
        $("#party").toggleClass("active", !isActive);
        if (!isActive) {
            clearInterval(this.partyBlinkInterval);
            $("#party-button").removeClass("blink");
            this.updatePartyPanel();
        }
    };
    App.prototype.updatePartyPanel = function () {
        var _this = this;
        var _a;
        var filteredPlayers = this.game.worldPlayers.filter(function (_a) {
            var name = _a.name;
            return name !== _this.game.player.name;
        });
        var partyPlayers = [];
        var otherPlayers = [];
        var partyPlayersHtml = "";
        var otherPlayersHtml = "";
        var _b = this.game.player, partyId = _b.partyId, partyLeader = _b.partyLeader;
        var isPartyLeader = partyId ? (partyLeader === null || partyLeader === void 0 ? void 0 : partyLeader.name) === ((_a = this.game.player) === null || _a === void 0 ? void 0 : _a.name) : false;
        if (partyId) {
            filteredPlayers.map(function (player) {
                if (player.partyId === partyId) {
                    partyPlayers.push(player);
                }
                else {
                    otherPlayers.push(player);
                }
            });
        }
        else {
            otherPlayers = filteredPlayers;
        }
        partyPlayersHtml += '<div class="party-header">Your party</div>';
        if (this.game.partyInvites.length) {
            this.game.partyInvites.forEach(function (_a) {
                var name = _a.name, joinPartyId = _a.partyId;
                partyPlayersHtml += "\n        <div class=\"row\">\n          <div class=\"player-name\">\n            ".concat(name, " invites you\n          </div>\n          <div>\n            <button class=\"btn small\" data-party-refuse=\"").concat(joinPartyId, "\">Refuse</button>\n            <button class=\"btn small\" data-party-join=\"").concat(joinPartyId, "\">Join</button>\n          </div>\n        </div>\n      ");
            });
        }
        else if (partyPlayers.length) {
            partyPlayers.forEach(function (_a) {
                var name = _a.name, level = _a.level, hash = _a.hash, network = _a.network;
                partyPlayersHtml += "\n        <div class=\"row\">\n          <div class=\"player-name party\">\n            ".concat(partyLeader.name === name ? "<span class='party-leader'>[P]</span>" : "", " ").concat(name, " <span class=\"payout-icon ").concat(network, " ").concat(hash ? "completed" : "", "\"></span> lv.").concat(level, "\n          </div>\n          ").concat(isPartyLeader ? "<button class=\"btn small\" data-party-remove=\"".concat(name, "\">Remove</button>") : "", "\n        </div>\n      ");
            });
        }
        else {
            partyPlayersHtml += "<div class=\"party-empty\">".concat(partyId
                ? "No players in your party"
                : "You are not in a party<br/><br/><button class=\"btn small\" data-party-create=\"\">Create party</button>", "</div>");
        }
        if (partyId) {
            partyPlayersHtml += "\n      <div class=\"row row-around\">\n        <button class=\"btn small\" data-party-leave=\"\">Leave</button>\n        ".concat(isPartyLeader && partyPlayers.length ? "<button class=\"btn small\" data-party-disband=\"\">Disband</button>" : "", "\n      </div>\n      ");
        }
        otherPlayersHtml += '<div class="party-header">World players</div>';
        if (otherPlayers.length) {
            otherPlayers.forEach(function (_a) {
                var name = _a.name, level = _a.level, hash = _a.hash, isInParty = _a.partyId, network = _a.network, partyEnabled = _a.partyEnabled;
                var isInviteSent = _this.game.partyInvitees.includes(name);
                otherPlayersHtml += "\n        <div class=\"row ".concat(partyId ? "" : "row-around", "\">\n          <div class=\"player-name\">\n            ").concat(name, " <span class=\"payout-icon ").concat(network, " ").concat(hash ? "completed" : "", "\"></span> lv.").concat(level, "\n          </div>\n          ").concat(!partyEnabled ? "<div>Player disabled party</div>" : "", "\n          ").concat(partyId && isInParty ? "<div>In a party</div>" : "", "\n          ").concat(!isInParty && isPartyLeader
                    ? "<button class=\"btn small ".concat(!partyEnabled || isInviteSent ? "disabled" : "", "\" data-party-invite=\"").concat(name, "\" ").concat(isInviteSent ? "disabled" : "", "\">Invite").concat(isInviteSent ? " sent" : "", "</button>")
                    : "", "\n        </div>\n      ");
            });
        }
        else {
            otherPlayersHtml += "<div class=\"party-empty\">No other player online</div>";
        }
        $("#party-players").html(partyPlayersHtml);
        $("#other-players").html(otherPlayersHtml);
        if (!partyId) {
            $("#party-players [data-party-create]")
                .off("click")
                .on("click", function (e) {
                $(e.currentTarget).addClass("disabled").attr("disabled", "disabled");
                _this.game.client.sendPartyCreate();
            });
            $("#party-players [data-party-join]")
                .off("click")
                .on("click", function (e) {
                $(e.currentTarget).addClass("disabled").attr("disabled", "disabled");
                var joinPartyId = $(e.currentTarget).data("party-join");
                _this.game.client.sendPartyJoin(joinPartyId);
            });
            $("#party-players [data-party-refuse]")
                .off("click")
                .on("click", function (e) {
                $(e.currentTarget).addClass("disabled").attr("disabled", "disabled");
                var refusePartyId = $(e.currentTarget).data("party-refuse");
                _this.game.client.sendPartyRefuse(refusePartyId);
            });
        }
        else {
            $("#party-players [data-party-leave]")
                .off("click")
                .on("click", function (e) {
                $(e.currentTarget).addClass("disabled").attr("disabled", "disabled");
                _this.game.client.sendPartyLeave();
            });
        }
        if (isPartyLeader) {
            $("#other-players [data-party-invite]")
                .off("click")
                .on("click", function (e) {
                $(e.currentTarget).addClass("disabled").attr("disabled", "disabled").text("Invite sent");
                var playerName = String($(e.currentTarget).data("party-invite"));
                if (playerName) {
                    _this.game.client.sendPartyInvite(playerName);
                    _this.game.partyInvitees.push(playerName);
                }
            });
            $("#party-players [data-party-remove]")
                .off("click")
                .on("click", function (e) {
                $(e.currentTarget).addClass("disabled").attr("disabled", "disabled");
                var playerName = String($(e.currentTarget).data("party-remove"));
                if (playerName) {
                    _this.game.client.sendPartyRemove(playerName);
                }
            });
            $("#party-players [data-party-disband]")
                .off("click")
                .on("click", function (e) {
                $(e.currentTarget).addClass("disabled").attr("disabled", "disabled");
                _this.game.client.sendPartyDisband();
            });
        }
    };
    App.prototype.resetAchievementPage = function () {
        var self = this;
        var $achievements = $("#achievements");
        if ($achievements.hasClass("active")) {
            $achievements.bind(TRANSITIONEND, function () {
                $achievements.removeClass("page" + self.currentPage).addClass("page1");
                self.currentPage = 1;
                $achievements.unbind(TRANSITIONEND);
            });
        }
        this.game.initAchievements();
    };
    App.prototype.updatePopulationList = function () {
        var _this = this;
        $("#player-list").empty();
        if (Array.isArray(this.game.worldPlayers)) {
            this.game.worldPlayers.forEach(function (_a) {
                var _b;
                var name = _a.name, level = _a.level, hash = _a.hash, network = _a.network;
                var className = "";
                if (name === _this.game.storage.data.player.name) {
                    className = "active";
                }
                else if ((_b = _this.game.player.partyMembers) === null || _b === void 0 ? void 0 : _b.find(function (_a) {
                    var playerName = _a.name;
                    return playerName === name;
                })) {
                    className = "party";
                }
                var isAdmin = _this.game.admins.includes(name);
                var badge = "";
                if (isAdmin) {
                    badge = '<span class="chat-mod-icon" title="moderator"></span>';
                }
                $("<div/>", {
                    class: className,
                    html: "\n            <span>".concat(name, "</span>\n            ").concat(badge, "\n            <span class=\"payout-icon ").concat(network, " ").concat(hash ? "completed" : "", "\" title=\"").concat(hash
                        ? "Killed the Skeleton King and received a ".concat(_this.game.player.network, " payout")
                        : "Did not complete the game to receive a ".concat(network, " payout"), "\"></span>\n            <span>lv.").concat(level, "</span>\n          "),
                }).appendTo("#player-list");
            });
        }
    };
    App.prototype.initEquipmentIcons = function () {
        var scale = this.game.renderer.getScaleFactor();
        var getIconPath = function (spriteName) {
            return "img/" + scale + "/item-" + spriteName + ".png";
        };
        var weapon = this.game.player.getWeaponName();
        var weaponLevel = this.game.player.getWeaponLevel();
        var weaponBonus = this.game.player.getWeaponBonus();
        var weaponSocket = this.game.player.getWeaponSocket();
        var armor = this.game.player.getArmorName();
        var armorLevel = this.game.player.getArmorLevel();
        var armorBonus = this.game.player.getArmorBonus();
        var armorSocket = this.game.player.getArmorSocket();
        var weaponPath = getIconPath(weapon);
        var armorPath = getIconPath(armor);
        $("#weapon")
            .css("background-image", 'url("' + weaponPath + '")')
            .attr("data-item", weapon)
            .attr("data-level", weaponLevel)
            .attr("data-bonus", toString(weaponBonus))
            .attr("data-socket", toString(weaponSocket));
        if (armor !== "firefox") {
            $("#armor")
                .css("background-image", 'url("' + armorPath + '")')
                .attr("data-item", armor)
                .attr("data-level", armorLevel)
                .attr("data-bonus", toString(armorBonus))
                .attr("data-socket", toString(armorSocket));
        }
    };
    App.prototype.hideWindows = function () {
        this.game.isPanelOpened = false;
        if ($("#dialog-quantity").hasClass("ui-dialog-content")) {
            $("#dialog-quantity").dialog("close");
        }
        if ($("#dialog-merchant-item").hasClass("ui-dialog-content")) {
            $("#dialog-merchant-item").dialog("close");
        }
        if ($("#achievements").hasClass("active")) {
            $("#achievements").removeClass("active");
            $("#achievementsbutton").removeClass("active");
        }
        $("#player").removeClass("visible");
        if ($("#instructions").hasClass("active")) {
            this.toggleInstructions();
        }
        if ($("body").hasClass("credits")) {
            this.closeInGameScroll("credits");
        }
        if ($("body").hasClass("legal")) {
            this.closeInGameScroll("legal");
        }
        if ($("body").hasClass("about")) {
            this.closeInGameScroll("about");
        }
        if ($("#completed").hasClass("active")) {
            this.toggleCompleted();
            $("#completedbutton").removeClass("active");
        }
        if ($("#missing-account").hasClass("active")) {
            $("#missing-account").removeClass("active");
        }
        if ($("#about").hasClass("active")) {
            this.toggleAbout();
            $("#completedbutton").removeClass("active");
        }
        if ($("#failed").hasClass("active")) {
            $("#failed").removeClass("active");
        }
        if ($("#population").hasClass("visible")) {
            $("#population").removeClass("visible");
        }
        if ($("#upgrade").hasClass("visible")) {
            this.closeUpgrade();
        }
        if ($("#trade").hasClass("visible")) {
            this.closeTrade();
        }
        if ($("#merchant").hasClass("visible")) {
            this.closeMerchant();
        }
        if ($("#inventory").hasClass("visible")) {
            this.closeInventory();
        }
        if ($("#waypoint").hasClass("visible")) {
            this.closeWaypoint();
        }
        if ($("#stash").hasClass("visible")) {
            this.closeStash();
        }
        if ($("#store").hasClass("active")) {
            this.store.closeStore();
        }
        if ($("#otherplayer-equipment").hasClass("visible")) {
            $("#otherplayer-equipment").removeClass("visible");
        }
        if ($("#settings").hasClass("active")) {
            $("#settings").removeClass("active");
            $("#settings-button").removeClass("active");
        }
        if ($("#party").hasClass("active")) {
            $("#party").removeClass("active");
            $("#party-button").removeClass("active");
        }
        $("#container").removeClass("prevent-click");
        this.closeOtherPlayerEquipment();
    };
    App.prototype.showAchievementNotification = function (id, name) {
        var $notif = $("#achievement-notification"), $name = $notif.find(".name"), $button = $("#achievementsbutton");
        $notif.removeClass().addClass("active achievement" + id);
        $name.text(name);
        if (this.game.storage.getAchievementCount() === 1) {
            this.blinkInterval = setInterval(function () {
                $button.toggleClass("blink");
            }, 500);
        }
        clearTimeout(this.achievementTimeout);
        this.achievementTimeout = setTimeout(function () {
            $notif.removeClass("active");
            $button.removeClass("blink");
        }, 5000);
    };
    App.prototype.displayUnlockedAchievement = function (id) {
        var $achievement = $("#achievements li.achievement" + id), achievement = this.game.getAchievementById(id);
        if (achievement && achievement.hidden) {
            this.setAchievementData($achievement, achievement.name, achievement.desc, achievement[this.game.network]);
        }
        $achievement.addClass("unlocked");
    };
    App.prototype.unlockAchievement = function (id, name, payout) {
        this.showAchievementNotification(id, name);
        this.displayUnlockedAchievement(id);
        var nb = parseInt($("#unlocked-achievements").text());
        var totalPayout = parseInt("".concat(parseFloat($("#unlocked-payout-achievements").text()) * networkDividerMap[this.game.network]), 10);
        $("#unlocked-achievements").text(nb + 1);
        $("#unlocked-payout-achievements").text((totalPayout + (payout || 0)) / networkDividerMap[this.game.network]);
    };
    App.prototype.initAchievementList = function (achievements) {
        var self = this, $lists = $("#lists"), $page = $("#page-tmpl"), $achievement = $("#achievement-tmpl"), page = 0, count = 0, $p = null;
        $lists.empty();
        var totalPayout = 0;
        var domain = this.game.network === "ban" ? "BananoBrowserQuest" : "NanoBrowserQuest";
        var currency = this.game.network === "ban" ? "ban" : "xno";
        _.each(achievements, function (achievement) {
            count++;
            var $a = $achievement.clone();
            $a.removeAttr("id");
            $a.addClass("achievement" + count);
            if (!achievement.hidden) {
                self.setAchievementData($a, achievement.name, achievement.desc, achievement[self.game.network]);
            }
            $a.find(".twitter").attr("href", "https://twitter.com/share?url=https%3A%2F%2F".concat(domain.toLowerCase(), ".com&text=I%20unlocked%20the%20%27") +
                achievement.name +
                "%27%20achievement%20on%20%23".concat(domain, "%20%23BrowserQuest%20$").concat(currency));
            $a.show();
            $a.find("a").click(function () {
                var url = $(this).attr("href");
                self.openPopup("twitter", url);
                return false;
            });
            totalPayout += achievement[self.game.network] || 0;
            if ((count - 1) % 4 === 0) {
                page++;
                $p = $page.clone();
                $p.attr("id", "page" + page);
                $p.show();
                $lists.append($p);
            }
            $p.append($a);
        });
        $("#total-achievements").text($("#achievements").find("li").length);
        $("#total-payout-achievements").html("\n        ".concat(this.getCurrencyPrefix(), "\n        <span>").concat(totalPayout / networkDividerMap[this.game.network], "</span>\n        ").concat(this.getCurrencySuffix(), "\n      "));
    };
    App.prototype.getCurrencyPrefix = function () {
        if (this.game.network === "ban") {
            return "";
        }
        else {
            return '<span class="arial-font" style="margin-right: 3px;">Ӿ</span>';
        }
    };
    App.prototype.getCurrencySuffix = function () {
        if (this.game.network === "ban") {
            return " BAN";
        }
        else {
            return "";
        }
    };
    App.prototype.initUnlockedAchievements = function (ids, totalPayout) {
        var self = this;
        _.each(ids, function (id) {
            self.displayUnlockedAchievement(id);
        });
        $("#unlocked-achievements").text(ids.length);
        $("#unlocked-payout-achievements").text(totalPayout / networkDividerMap[this.game.network]);
    };
    App.prototype.setAchievementData = function ($el, name, desc, payout) {
        $el.find(".achievement-name").html(name);
        $el.find(".achievement-description").html(desc);
        $el.find(".achievement-payout").html("\n        ".concat(payout ? this.getCurrencyPrefix() : "", "\n        <span>").concat(payout ? payout / networkDividerMap[this.game.network] : "", "</span>\n        ").concat(payout ? this.getCurrencySuffix() : "", "\n      "));
    };
    App.prototype.initNanoPotions = function () {
        $(".item-potion").addClass(this.game.network);
    };
    App.prototype.initTradePlayer1StatusButton = function () {
        var _this = this;
        $("#trade-player1-status-button")
            .off("click")
            .on("click", function (_a) {
            var target = _a.target;
            if ($(target).hasClass("disabled") && $("#trade-player2-status").text() === "Accepted") {
                return;
            }
            $(target).toggleClass("disabled");
            var isAccepted = $(target).hasClass("disabled");
            _this.game.client.sendTradePlayer1Status(isAccepted);
        });
    };
    App.prototype.updateNanoPotions = function (nanoPotions) {
        for (var i = 0; i < nanoPotions; i++) {
            if (i === 5)
                break;
            $("#potion-count").find(".item-potion:eq(".concat(i, ")")).addClass("active");
        }
    };
    App.prototype.updateGems = function (gems) {
        $("#achievements-unlocks-count")
            .find(".item-gem")
            .each(function (index, element) {
            if (gems[index] !== 0) {
                $(element).addClass("active");
            }
        });
    };
    App.prototype.updateArtifact = function (_artifact) {
    };
    App.prototype.toggleScrollContent = function (content) {
        var currentState = $("#parchment").attr("class");
        if (this.game.started) {
            $("#parchment").removeClass().addClass(content);
            $("body").removeClass("credits legal about").toggleClass(content);
            if (!this.game.player) {
                $("body").toggleClass("death");
            }
            if (content !== "about") {
                $("#completedbutton").removeClass("active");
            }
        }
        else {
            if (currentState !== "animate") {
                if (currentState === content) {
                    this.animateParchment(currentState, this.frontPage);
                }
                else {
                    this.animateParchment(currentState, content);
                }
            }
        }
    };
    App.prototype.closeInGameScroll = function (content) {
        $("body").removeClass(content);
        $("#parchment").removeClass(content);
        if (!this.game.player) {
            $("body").addClass("death");
        }
        if (content === "about") {
            $("#completedbutton").removeClass("active");
        }
    };
    App.prototype.togglePopulationInfo = function (isVisible) {
        this.hideWindows();
        $("#population").toggleClass("visible", !isVisible);
        if (!isVisible) {
            this.updatePopulationList();
        }
    };
    App.prototype.togglePlayerInfo = function () {
        $("#player").toggleClass("visible");
    };
    App.prototype.toggleMuteMusic = function () {
        var isEnabled = $("#mute-music-checkbox").is(":checked");
        this.storage.setMusicEnabled(isEnabled);
        if (isEnabled) {
            this.game.audioManager.enableMusic();
        }
        else {
            this.game.audioManager.disableMusic();
        }
    };
    App.prototype.toggleMuteSound = function () {
        var isEnabled = $("#mute-sound-checkbox").is(":checked");
        this.storage.setSoundEnabled(isEnabled);
        if (isEnabled) {
            this.game.audioManager.enableSound();
        }
        else {
            this.game.audioManager.disableSound();
        }
    };
    App.prototype.toggleEntityName = function () {
        var isChecked = $("#entity-name-checkbox").is(":checked");
        this.storage.setShowEntityNameEnabled(isChecked);
        this.game.renderer.setDrawEntityName(isChecked);
        this.game.client.sendSettings({ playerNames: isChecked });
    };
    App.prototype.toggleDamageInfo = function () {
        var isChecked = $("#damage-info-checkbox").is(":checked");
        this.storage.setShowDamageInfoEnabled(isChecked);
        this.game.infoManager.setShowDamageInfo(isChecked);
        this.game.client.sendSettings({ damageInfo: isChecked });
    };
    App.prototype.togglePvP = function () {
        var isChecked = $("#pvp-checkbox").is(":checked");
        this.game.pvp = isChecked;
        this.game.client.sendSettings({ pvp: isChecked });
    };
    App.prototype.toggleParty = function () {
        var isChecked = $("#party-checkbox").is(":checked");
        this.game.party = isChecked;
        this.game.client.sendSettings({ partyEnabled: isChecked });
    };
    App.prototype.toggleTrade = function () {
        var isChecked = $("#trade-checkbox").is(":checked");
        this.game.trade = isChecked;
        this.game.client.sendSettings({ tradeEnabled: isChecked });
    };
    App.prototype.toggleDebug = function () {
        var isChecked = $("#debug-checkbox").is(":checked");
        this.game.debug = isChecked;
        this.storage.setDebug(isChecked);
    };
    App.prototype.toggleEffects = function () {
        var isChecked = $("#effects-checkbox").is(":checked");
        this.game.player.settings.effects = isChecked;
        this.game.client.sendSettings({ effects: isChecked });
    };
    App.prototype.toggleAnvilOdds = function () {
        var isChecked = $("#anvil-odds-checkbox").is(":checked");
        this.storage.setShowAnvilOddsEnabled(isChecked);
        this.game.setShowAnvilOdds(isChecked);
    };
    App.prototype.toggleHealthAboveBars = function () {
        var isChecked = $("#health-above-bars-checkbox").is(":checked");
        this.storage.setShowHealthAboveBarsEnabled(isChecked);
        this.game.setShowHealthAboveBars(isChecked);
    };
    App.prototype.openInventory = function (onlyInventory) {
        if (onlyInventory === void 0) { onlyInventory = false; }
        this.game.isPanelOpened = true;
        if ($("#inventory").hasClass("visible"))
            return;
        if (onlyInventory) {
            this.hideWindows();
            $("#player").addClass("visible");
            $("#inventory .close").addClass("visible");
        }
        $("#inventory").addClass("visible");
        if ($("#upgrade").hasClass("visible")) {
            $("#inventory").addClass("upgrade");
        }
        else if ($("#trade").hasClass("visible")) {
            $("#inventory").addClass("trade");
        }
        else if ($("#merchant").hasClass("visible")) {
            $("#inventory").addClass("merchant");
        }
        this.game.initDraggable();
    };
    App.prototype.closeInventory = function () {
        if (!$("#inventory").hasClass("visible"))
            return;
        $("#inventory").removeClass("visible upgrade trade merchant");
        $("#inventory .close").removeClass("visible");
        $("#player").removeClass("visible");
        $(".ui-helper-hidden-accessible").empty();
        this.hideWindows();
        this.game.destroyDraggable();
    };
    App.prototype.toggleInventory = function (onlyInventory) {
        if (onlyInventory === void 0) { onlyInventory = false; }
        if ($("#inventory").hasClass("visible") &&
            ($("#inventory").hasClass("upgrade") ||
                $("#inventory").hasClass("trade") ||
                $("#inventory").hasClass("merchant") ||
                $("#stash").hasClass("visible"))) {
            this.hideWindows();
            this.openInventory(onlyInventory);
        }
        else {
            if (!$("#inventory").hasClass("visible")) {
                this.openInventory(onlyInventory);
            }
            else {
                this.closeInventory();
            }
        }
    };
    App.prototype.openOtherPlayerEquipment = function (player) {
        this.hideWindows();
        this.game.isPanelOpened = true;
        this.game.initOtherPlayerEquipmentSlots(player);
        $("#otherplayer-equipment").addClass("visible");
    };
    App.prototype.closeOtherPlayerEquipment = function () {
        $("#otherplayer-equipment").removeClass("visible");
    };
    App.prototype.openStash = function () {
        this.hideWindows();
        $("#stash").addClass("visible");
        this.openInventory();
    };
    App.prototype.closeStash = function () {
        $("#stash").removeClass("visible");
        this.closeInventory();
    };
    App.prototype.openTrade = function () {
        if ($("#trade").hasClass("visible"))
            return;
        this.hideWindows();
        $("#trade").addClass("visible");
        this.openInventory();
    };
    App.prototype.closeTrade = function (isCompleted) {
        if (isCompleted === void 0) { isCompleted = false; }
        if (!$("#trade").hasClass("visible"))
            return;
        $("#trade").removeClass("visible");
        this.closeInventory();
        $("#gold-player1-amount").text("0");
        $("#gold-player2-amount").text("0");
        if (!isCompleted) {
            this.game.client.sendTradeClose();
        }
        $("#trade-player1-item .item-slot").empty();
        $("#trade-player2-item .item-slot").empty();
        $("#trade-player1-item .item-trade").removeClass("item-not-droppable");
        $("#trade-player1-status").find(".btn").removeClass("disabled");
        $("#trade-player2-status").text("Waiting ...");
    };
    App.prototype.openMerchant = function () {
        if ($("#merchant").hasClass("visible"))
            return;
        this.hideWindows();
        this.toggleMerchant();
        this.openInventory();
    };
    App.prototype.closeMerchant = function () {
        if (!$("#merchant").hasClass("visible"))
            return;
        this.toggleMerchant();
        this.closeInventory();
    };
    App.prototype.toggleMerchant = function () {
        this.game.confirmedSoldItemToMerchant = null;
        $("#merchant").toggleClass("visible");
    };
    App.prototype.openUpgrade = function () {
        if ($("#upgrade").hasClass("visible"))
            return;
        this.hideWindows();
        $("#upgrade").addClass("visible");
        this.openInventory();
    };
    App.prototype.closeUpgrade = function () {
        if (!$("#upgrade").hasClass("visible"))
            return;
        $("#upgrade").removeClass("visible");
        $("#upgrade-info").text("").removeClass("warning");
        this.closeInventory();
        if (this.game.player.upgrade.length) {
            this.game.client.sendMoveItemsToInventory("upgrade");
        }
        $(".item-scroll").empty();
        $("#upgrade .item-slot").removeClass("item-upgrade-success-slot item-upgrade-fail-slot");
    };
    App.prototype.openWaypoint = function (activeWaypoint) {
        this.hideWindows();
        this.game.isPanelOpened = true;
        $("#waypoint").find(".active").removeClass("active");
        if (activeWaypoint) {
            $("#waypoint-".concat(activeWaypoint.id)).addClass("active");
        }
        $("#waypoint").addClass("visible");
    };
    App.prototype.closeWaypoint = function () {
        $("#waypoint").find(".active").removeClass("active");
        $("#waypoint").removeClass("visible");
    };
    App.prototype.openPopup = function (type, url) {
        var h = $(window).height() || 0, w = $(window).width() || 0, popupHeight, popupWidth, top, left;
        switch (type) {
            case "twitter":
                popupHeight = 450;
                popupWidth = 550;
                break;
            case "facebook":
                popupHeight = 400;
                popupWidth = 580;
                break;
        }
        top = h / 2 - popupHeight / 2;
        left = w / 2 - popupWidth / 2;
        var newWindow = window.open(url, "name", "height=" + popupHeight + ",width=" + popupWidth + ",top=" + top + ",left=" + left);
        newWindow === null || newWindow === void 0 ? void 0 : newWindow.focus();
    };
    App.prototype.animateParchment = function (origin, destination) {
        var self = this;
        var $parchment = $("#parchment");
        var duration = 1;
        this.clearValidationErrors();
        if (this.isMobile) {
            $parchment.removeClass(origin).addClass(destination);
        }
        else {
            if (this.isParchmentReady) {
                if (this.isTablet) {
                    duration = 0;
                }
                this.isParchmentReady = !this.isParchmentReady;
                $parchment.removeClass();
                $parchment.toggleClass("animate");
                setTimeout(function () {
                    $("#parchment").toggleClass("animate");
                    $parchment.addClass(destination);
                    self.setPlayButtonState(true);
                    self.setFocus();
                }, duration * 1000);
                setTimeout(function () {
                    self.isParchmentReady = !self.isParchmentReady;
                }, duration * 1000);
            }
        }
    };
    App.prototype.setFocus = function () {
        if ($("#nameinput").is(":visible")) {
            $("#nameinput").trigger("focus");
        }
        else if ($("#loginnameinput").is(":visible")) {
            $("#loginnameinput").trigger("focus");
        }
        else if ($("#loginpasswordinput").is(":visible")) {
            $("#loginpasswordinput").trigger("focus");
        }
        else if ($("#createpasswordinput").is(":visible")) {
            $("#createpasswordinput").trigger("focus");
        }
    };
    App.prototype.animateMessages = function () {
        var $messages = $("#notifications div");
        $messages.addClass("top");
    };
    App.prototype.resetMessagesPosition = function () {
        var message = $("#message2").text();
        $("#notifications div").removeClass("top");
        $("#message2").text("");
        $("#message1").text(message);
    };
    App.prototype.showMessage = function (message, timeout) {
        var $wrapper = $("#notifications div");
        var $message = $("#notifications #message2");
        this.animateMessages();
        $message.text(message);
        if (this.messageTimer) {
            this.resetMessageTimer();
        }
        this.messageTimer = setTimeout(function () {
            $wrapper.addClass("top");
        }, timeout || 5000);
    };
    App.prototype.resetMessageTimer = function () {
        clearTimeout(this.messageTimer);
    };
    App.prototype.resizeUi = function () {
        if (this.game) {
            if (this.game.started) {
                this.game.resize();
                this.initHealthBar();
                this.initTargetHud();
                this.initExpBar();
                this.game.updateBars();
            }
            else {
                var newScale = this.game.renderer.getScaleFactor();
                this.game.renderer.rescale(newScale);
            }
        }
    };
    return App;
}());
export default App;
