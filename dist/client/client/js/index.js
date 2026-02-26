import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
import "jquery-ui/ui/widgets/resizable";
import "jquery-ui/ui/widgets/tooltip";
import "jquery-ui/ui/widgets/dialog";
import "jquery-ui/ui/widgets/slider";
import "jquery-countdown";
import "jquery.qrcode";
import "jquery-ui-touch-punch";
import "jquery-contextmenu";
import "../css/main.css";
import "../css/achievements.css";
import "../css/inspector.css";
import "../css/store.css";
import "../css/party.css";
import "../css/chat.css";
import "../css/settings.css";
import "../css/skills.css";
import "jquery-ui/themes/base/all.css";
import "jquery-contextmenu/dist/jquery.contextMenu.css";
import "../css/contextmenu.css";
import "../css/gold.css";
import * as Sentry from "@sentry/browser";
import { Types } from "../../shared/js/gametypes";
import { INVENTORY_SLOT_COUNT, MERCHANT_SLOT_RANGE } from "../../shared/js/slots";
import { toArray } from "../../shared/js/utils";
import App from "./app";
import Detect from "./detect";
import Game from "./game";
import { TRANSITIONEND } from "./utils";
var app;
var game;
var initApp = function () {
    Sentry.init({
        dsn: process.env.SENTRY_DNS,
        beforeSend: function (event, hint) {
            if (process.env.NODE_ENV === "development") {
                console.error(hint.originalException || hint.syntheticException);
                return null;
            }
            return event;
        },
    });
    $(document).ready(function () {
        app = new App();
        app.center();
        if (Detect.isWindows()) {
            $("body").addClass("windows");
        }
        if (Detect.isOpera()) {
            $("body").addClass("opera");
        }
        if (Detect.isFirefoxAndroid()) {
            $("#chatinput").removeAttr("placeholder");
        }
        $("body").click(function () {
            if ($("#parchment").hasClass("credits")) {
                app.toggleScrollContent("credits");
            }
            if ($("#parchment").hasClass("legal")) {
                app.toggleScrollContent("legal");
            }
            if ($("#parchment").hasClass("about")) {
                app.toggleScrollContent("about");
            }
        });
        $(".barbutton").click(function () {
            $(this).toggleClass("active");
        });
        $("#chatbutton").on("click", function () {
            if ($("#chatbutton").hasClass("active")) {
                app.showChat();
            }
            else {
                app.hideChat();
            }
        });
        $("#achievementsbutton").click(function () {
            var isOpened = $("#achievements").hasClass("active");
            app.hideWindows();
            if (!isOpened) {
                app.toggleAchievements();
            }
            if (app.blinkInterval) {
                clearInterval(app.blinkInterval);
            }
            $(this).removeClass("blink");
        });
        $("#completedbutton").click(function () {
            var isOpened = $("#completed").hasClass("active") || $("#parchment").hasClass("about");
            $("#completed").removeClass("boss-check");
            app.hideWindows();
            if (!isOpened) {
                if ($("#transaction-hash").text()) {
                    app.toggleCompleted();
                }
                else {
                    app.toggleAbout();
                }
            }
        });
        $("#player-count").on("click", function () {
            app.togglePopulationInfo($("#population").hasClass("visible"));
        });
        $("#bar-container").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        $("#healthbar, #hitpoints").click(function () {
            app.togglePlayerInfo();
        });
        $("#weapon, #armor").on("click", function () {
            app.toggleInventory(true);
        });
        $("#skill-attack").click(function () {
            game.useSkill(1);
        });
        $("#skill-defense").on("click", function () {
            game.useSkill(2);
        });
        $(".clickable").click(function (event) {
            event.stopPropagation();
        });
        $("#toggle-credits").click(function () {
            app.toggleScrollContent("credits");
        });
        $("#toggle-legal").click(function () {
            app.toggleScrollContent("legal");
            if (game.renderer.mobile) {
                if ($("#parchment").hasClass("legal")) {
                    $(this).text("close");
                }
                else {
                    $(this).text("Privacy");
                }
            }
        });
        $("#create-new > .link").click(function () {
            app.animateParchment("loadcharacter", "confirmation");
        });
        $("#create-new-account span").click(function () {
            app.animateParchment("createcharacter", "createaccount");
        });
        $("#create-new-account-ok span").click(function () {
            app.animateParchment("createaccount", "createcharacter");
        });
        $("#continue span").click(function () {
            app.storage.clear();
            app.animateParchment("confirmation", "createcharacter");
            $("body").removeClass("returning");
            app.clearValidationErrors();
        });
        $("#cancel span").click(function () {
            app.animateParchment("confirmation", "loadcharacter");
        });
        $("#back-to-login .link").on("click", function () {
            $("#nameinput").val("");
            $("#accountinput").val("");
            app.animateParchment("createcharacter", "loadcharacter");
        });
        $(".ribbon").click(function () {
            app.toggleScrollContent("about");
        });
        $("#nameinput").bind("keyup", function () {
            app.toggleButton();
        });
        $("#accountinput").bind("keyup", function () {
            app.toggleButton();
        });
        $("#previous").click(function () {
            var $achievements = $("#achievements");
            if (app.currentPage === 1) {
                return false;
            }
            else {
                app.currentPage -= 1;
                $achievements.removeClass().addClass("active page" + app.currentPage);
            }
        });
        $("#next").click(function () {
            var $achievements = $("#achievements"), $lists = $("#lists"), nbPages = $lists.children("ul").length;
            if (app.currentPage === nbPages) {
                return false;
            }
            else {
                app.currentPage += 1;
                $achievements.removeClass().addClass("active page" + app.currentPage);
            }
        });
        $("#notifications div").bind(TRANSITIONEND, app.resetMessagesPosition.bind(app));
        $(".close").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            app.hideWindows();
        });
        $(".twitter").click(function () {
            var url = $(this).attr("href");
            app.openPopup("twitter", url);
            return false;
        });
        $(".facebook").click(function () {
            var url = $(this).attr("href");
            app.openPopup("facebook", url);
            return false;
        });
        var data = app.storage.data;
        var _a = (data === null || data === void 0 ? void 0 : data.player) || {}, playerName = _a.name, playerImage = _a.image;
        var parchmentClass = $("#parchment").attr("class");
        var parchment = $("article#".concat(parchmentClass));
        if (playerName) {
            parchment.find(".playername").text(playerName).show();
            parchment.find(".no-playername").hide();
            $("#loginnameinput").hide();
            parchment.find(".login-play-button").show();
        }
        else {
            parchment.find(".playername").hide();
            parchment.find(".no-playername").show();
        }
        if (playerImage) {
            $(".playerimage").attr("src", playerImage);
        }
        else {
            $(".playerimage").hide();
        }
        $("#forget-player .link").on("click", function () {
            $(".playerimage").hide();
            var clickedParchmentClass = $("#parchment").attr("class");
            var clickedParchment = $("article#".concat(clickedParchmentClass));
            clickedParchment.find(".no-playername").show();
            $("#loginnameinput").val("").show();
            clickedParchment.find(".playername").hide();
            clickedParchment.find(".playerimage").hide();
            clickedParchment.find(".login-play-button").show();
            $("#forget-player").hide();
            app.animateParchment("loadcharacter", "loadcharacter");
        });
        $(".play span").click(function () {
            app.tryStartingGame();
        });
        document.addEventListener("touchstart", function () { }, false);
        $("#resize-check").bind(TRANSITIONEND, app.resizeUi.bind(app));
        $("#minimize").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            app.hideChat();
        });
        console.info("App initialized.");
        initGame();
    });
};
var initGame = function () {
    var canvas = document.getElementById("entities"), background = document.getElementById("background"), foreground = document.getElementById("foreground"), input = document.getElementById("chatinput");
    game = new Game(app);
    game.setup("#bubbles", canvas, background, foreground, input);
    game.setStorage(app.storage);
    game.setStore(app.store);
    app.setGame(game);
    if (app.isDesktop && app.supportsWorkers) {
        game.loadMap();
    }
    game.onGameStart(function () {
        app.initEquipmentIcons();
        if (game.hasNeverStarted) {
            game.chat_callback({
                message: "Welcome ".concat(game.player.name, " to NBQ Join our\n        <a href=\"https://discord.gg/GerkX8BfYy\" target=\"_blank\">Discord</a> communityto interact with other players, form farming parties, post your items for sale or askto buy some items you are looking for in\n        <a href=\"https://discord.com/channels/971429295186665533/1153320202826690571\" target=\"_blank\"> #trade</a>, discuss item price in\n        <a href=\"https://discord.com/channels/971429295186665533/1149266734998618182\"target=\"_blank\"> #\u2060price-discussions</a>,check out the latest release information in\n        <a href=\"https://discord.com/channels/971429295186665533/975048934064013403\"target=\"_blank\"> #\u2060releases</a>, you\u2019ll also be able to !link your NBQ & Discord accounts to be able to or !getroles in\n        <a href=\"https://discord.com/channels/971429295186665533/971429767842779146\">#\u2060support</a> channel\n      "),
                type: "event",
            });
        }
    });
    game.onDisconnect(function (message) {
        $("#gold-death-wrapper").hide();
        $("#death")
            .find("p")
            .first()
            .html(message + "<em>Please reload the page.</em>");
        $("#respawn").hide();
    });
    game.onPlayerDeath(function () {
        app.toggleScrollContent("death");
        $("body").addClass("death");
    });
    game.onGameCompleted(function (_a) {
        var hash = _a.hash, fightAgain = _a.fightAgain, _b = _a.show, show = _b === void 0 ? false : _b;
        if (hash) {
            game.player.hash = hash;
            $("#completed").find("#transaction-hash").attr("href", "https://".concat(game.explorer, ".com/block/").concat(hash)).text(hash);
            $("#container-payout-hash").show();
        }
        $("#completedbutton").addClass("completed");
        if (show) {
            $("#completed").addClass("active");
            $("#completedbutton").addClass("active");
        }
        if (fightAgain) {
            $("#completed").addClass("boss-check");
            $("#fight-again")
                .off("click")
                .on("click", function () {
                game.client.sendBossCheck(true);
                app.hideWindows();
            });
        }
    });
    game.onMissingAccount(function () {
        $("#missing-account").addClass("active");
        $("#missing-account-btn")
            .off("click")
            .on("click", function () {
            game.client.sendBossCheck(true);
            app.hideWindows();
        });
    });
    game.onBossCheckFailed(function (message) {
        $("#min-level").text(message);
        $("#failed").addClass("active");
    });
    game.onPlayerEquipmentChange(function () {
        app.initEquipmentIcons();
    });
    game.onPlayerStartInvincible(function () {
        $("#hitpoints").addClass("invincible");
    });
    game.onPlayerStopInvincible(function () {
        $("#hitpoints").removeClass("invincible");
    });
    game.onChatMessage(function (_a) {
        var name = _a.name, message = _a.message, type = _a.type;
        if (!$("#text-window").is(":visible") && !["event", "loot", "info"].includes(type)) {
            $("#chatbutton").addClass("blink");
        }
        var textList = $("#text-list");
        var scrollToBottom = false;
        if (textList[0].scrollHeight - textList.scrollTop() - Math.floor(textList.outerHeight()) <= 100) {
            scrollToBottom = true;
        }
        var className = name === game.storage.data.player.name ? "active" : "";
        if (type) {
            className = type;
        }
        var isAdmin = game.admins.includes(name);
        var badge = "";
        if (isAdmin) {
            badge = '<span class="chat-mod-icon" title="moderator"></span>';
        }
        $("<div/>", {
            class: className,
            html: "<span>".concat(name ? "".concat(name, ": ") : "", "</span>").concat(badge ? badge : "", "<span>").concat(message, "</span>"),
        }).appendTo("#text-list");
        var messages = $("#text-list > div");
        if (messages.length > 100) {
            messages.first().remove();
        }
        if (scrollToBottom) {
            app.scrollChatToBottom();
        }
    });
    game.onNbPlayersChange(function () {
        if ($("#party").hasClass("active")) {
            app.updatePartyPanel();
        }
        if ($("#population").hasClass("visible")) {
            app.updatePopulationList();
        }
        var setWorldPlayersString = function (string) {
            $("#instance-population").find("span:nth-child(2)").text(string);
            $("#player-count").find("span:nth-child(2)").text(string);
        };
        $("#player-count").find("span.count").text(game.worldPlayers.length);
        $("#instance-population").find("span").text(game.worldPlayers.length);
        if (game.worldPlayers.length === 1) {
            setWorldPlayersString("player");
        }
        else {
            setWorldPlayersString("players");
        }
    });
    game.onAchievementUnlock(function (id, name, payout) {
        app.unlockAchievement(id, name, payout);
    });
    game.onNotification(app.showMessage.bind(app));
    app.initHealthBar();
    app.initTargetHud();
    app.initExpBar();
    $("#nameinput").val("");
    if (game.renderer.mobile || game.renderer.tablet) {
        $("#foreground").bind("touchstart", function (event) {
            app.center();
            app.setMouseCoordinates(event.originalEvent.touches[0]);
            game.click();
        });
    }
    else {
        $("#foreground").click(function (event) {
            app.center();
            app.setMouseCoordinates(event);
            game === null || game === void 0 ? void 0 : game.click();
        });
        $("#text-window")
            .draggable()
            .resizable({
            minHeight: $("#container").height() / 4,
            minWidth: $("#container").width() / 3,
        })
            .on("click", function (event) {
            if (!$(event.target).is("#chatinput") && !$(".panel").hasClass("visible")) {
                {
                    $("#foreground").trigger(event);
                }
            }
        });
    }
    $("body")
        .off("click")
        .on("click", function (event) {
        if ($("#parchment").hasClass("credits")) {
            if (game.started) {
                app.closeInGameScroll("credits");
            }
            else {
                app.toggleScrollContent("credits");
            }
        }
        if ($("#parchment").hasClass("legal")) {
            if (game.started) {
                app.closeInGameScroll("legal");
            }
            else {
                app.toggleScrollContent("legal");
            }
        }
        if ($("#parchment").hasClass("about")) {
            if (game.started) {
                app.closeInGameScroll("about");
            }
            else {
                app.toggleScrollContent("about");
            }
        }
        if (event.target.id === "foreground") {
            game.click();
        }
    });
    $("#respawn").on("click", function () {
        if ($("#respawn").hasClass("disabled"))
            return;
        $("#respawn").addClass("disabled");
        game.audioManager.playSound("revive");
        game.respawn();
        $("body").removeClass("death");
        $("parchment").removeClass("death");
    });
    $(document).mousemove(function (event) {
        app.setMouseCoordinates(event);
        if (game.started) {
            game.movecursor();
        }
    });
    $(document).on("keyup", function (e) {
        var key = e.which;
        if (!game.player || game.player.isDead) {
            return;
        }
        if (typeof game.cursorOverSocket === "number") {
            game.cursorOverSocket = null;
            $(".ui-tooltip .socket-container div").removeClass("item-faded");
            $(".ui-tooltip .main-item > div:not(.item-header,.socket-item-container)").removeClass("invisible");
            $(".ui-tooltip .socket-item-container").empty();
        }
        if (game.started && !$("#chatinput").is(":focus")) {
            switch (key) {
                case Types.Keys.LEFT:
                case Types.Keys.A:
                    game.player.moveLeft = false;
                    game.player.disableKeyboardNpcTalk = false;
                    break;
                case Types.Keys.RIGHT:
                case Types.Keys.D:
                    game.player.moveRight = false;
                    game.player.disableKeyboardNpcTalk = false;
                    break;
                case Types.Keys.UP:
                case Types.Keys.W:
                    game.player.moveUp = false;
                    game.player.disableKeyboardNpcTalk = false;
                    break;
                case Types.Keys.DOWN:
                case Types.Keys.S:
                    game.player.moveDown = false;
                    game.player.disableKeyboardNpcTalk = false;
                    break;
                case Types.Keys.SPACE:
                    if (game.debug) {
                        game.togglePathingGrid();
                    }
                    break;
                default:
                    break;
            }
        }
    });
    $(document).on("keydown", function (e) {
        if (!game.started)
            return;
        if ($("#chatinput").is(":focus") || $("textarea").is(":focus"))
            return;
        if ($("#player-account-input").is(":focus") && e.keyCode !== Types.Keys.ESC)
            return;
        if (!game.player || game.player.isDead) {
            return;
        }
        var slotSocketCount = game.slotSocketCount, slotSockets = game.slotSockets;
        if (slotSocketCount) {
            if ([Types.Keys[1], Types.Keys.KEYPAD_1].includes(e.keyCode)) {
                game.cursorOverSocket = 1;
            }
            else if ([Types.Keys[2], Types.Keys.KEYPAD_2].includes(e.keyCode) && slotSocketCount >= 2) {
                game.cursorOverSocket = 2;
            }
            else if ([Types.Keys[3], Types.Keys.KEYPAD_3].includes(e.keyCode) && slotSocketCount >= 3) {
                game.cursorOverSocket = 3;
            }
            else if ([Types.Keys[4], Types.Keys.KEYPAD_4].includes(e.keyCode) && slotSocketCount >= 4) {
                game.cursorOverSocket = 4;
            }
            else if ([Types.Keys[5], Types.Keys.KEYPAD_5].includes(e.keyCode) && slotSocketCount >= 5) {
                game.cursorOverSocket = 5;
            }
            else if ([Types.Keys[6], Types.Keys.KEYPAD_6].includes(e.keyCode) && slotSocketCount === 6) {
                game.cursorOverSocket = 6;
            }
            if (typeof game.cursorOverSocket === "number") {
                $(".ui-tooltip .socket-container div:not(:nth-child(".concat(game.cursorOverSocket, "))")).addClass("item-faded");
                $(".ui-tooltip .main-item > div:not(.item-header,.socket-item-container)").addClass("invisible");
                var rawSocket = slotSockets[game.cursorOverSocket - 1];
                if (rawSocket) {
                    var socketContent = "";
                    if (typeof rawSocket === "string") {
                        var _a = (rawSocket || "").split("|"), socketItem = _a[0], socketLevel = _a[1], socketBonus = _a[2];
                        socketContent = game.generateItemTooltipContent({
                            isSocketItem: true,
                            item: socketItem,
                            level: parseInt(socketLevel, 10),
                            rawBonus: toArray(socketBonus),
                        });
                    }
                    else {
                        socketContent = game.generateItemTooltipContent({
                            isSocketItem: true,
                            item: "rune-".concat(Types.RuneList[rawSocket - 1]),
                        });
                    }
                    $(".ui-tooltip .socket-item-container").html(socketContent);
                }
                return;
            }
        }
        switch (e.keyCode) {
            case Types.Keys.ESC:
                app.hideWindows();
                break;
            case Types.Keys.ENTER:
                if ($(".ui-dialog").is(":visible")) {
                    if ($("#dialog-delete-item").dialog("isOpen")) {
                        game.deleteItemFromSlot();
                        $("#dialog-delete-item").dialog("close");
                    }
                    else if ($("#dialog-merchant-item").dialog("isOpen")) {
                        var _b = game.confirmedSoldItemToMerchant, fromSlot = _b.fromSlot, toSlot = _b.toSlot, transferedQuantity = _b.transferedQuantity, confirmed = _b.confirmed;
                        clearTimeout(game.onSendMoveItemTimeout);
                        game.onSendMoveItemTimeout = null;
                        game.dropItem(fromSlot, toSlot, transferedQuantity, confirmed);
                        game.confirmedSoldItemToMerchant = null;
                        $("#dialog-merchant-item").dialog("close");
                    }
                }
                else if (!$("#text-window").is(":visible")) {
                    app.showChat();
                }
                break;
            case Types.Keys.DELETE:
            case Types.Keys.BACKSPACE:
                if (typeof game.hoverSlotToDelete === "number") {
                    clearTimeout(game.onSendMoveItemTimeout);
                    game.onSendMoveItemTimeout = null;
                    if ($("#merchant").hasClass("visible")) {
                        if (game.hoverSlotToDelete < INVENTORY_SLOT_COUNT) {
                            game.dropItem(game.hoverSlotToDelete, MERCHANT_SLOT_RANGE);
                        }
                    }
                    else {
                        game.dropItem(game.hoverSlotToDelete, -1);
                    }
                    game.hoverSlotToDelete = null;
                }
                break;
            case Types.Keys.LEFT:
            case Types.Keys.A:
                game.player.moveLeft = true;
                break;
            case Types.Keys.RIGHT:
            case Types.Keys.D:
                game.player.moveRight = true;
                break;
            case Types.Keys.UP:
            case Types.Keys.W:
                game.player.moveUp = true;
                break;
            case Types.Keys.DOWN:
            case Types.Keys.S:
                game.player.moveDown = true;
                break;
            case Types.Keys[1]:
            case Types.Keys.KEYPAD_1:
                game.useSkill(1);
                break;
            case Types.Keys[2]:
            case Types.Keys.KEYPAD_2:
                game.useSkill(2);
                break;
            case Types.Keys.I:
                app.toggleInventory(true);
                break;
            case Types.Keys.C:
                app.togglePlayerInfo();
                break;
            case Types.Keys.Q:
                $("#achievementsbutton").click();
                break;
            case Types.Keys.H:
                $("#completedbutton").click();
                break;
            case Types.Keys.O:
                $("#settings-button").click();
                break;
            case Types.Keys.P:
                $("#party-button").trigger("click");
                break;
            default:
                break;
        }
    });
    $("#chatinput").on("keydown", function (e) {
        var $chat = $("#chatinput");
        if (e.keyCode === Types.Keys.ENTER) {
            if ($chat.val() !== "") {
                if (game.player) {
                    game.say($chat.val());
                }
                $chat.val("");
            }
            else {
                e.stopPropagation();
                app.hideChat();
            }
        }
        else if (e.keyCode === Types.Keys.ESC) {
            app.hideChat();
            $chat.val("");
        }
    });
    $("#settings-button").on("click", function () {
        app.toggleSettings();
    });
    $("#party-button").on("click", function () {
        app.togglePartyWindow();
    });
    $("#mute-music-checkbox").on("change", function () {
        app.toggleMuteMusic();
    });
    $("#mute-sound-checkbox").on("change", function () {
        app.toggleMuteSound();
    });
    $("#entity-name-checkbox").on("change", function () {
        app.toggleEntityName();
    });
    $("#damage-info-checkbox").on("change", function () {
        app.toggleDamageInfo();
    });
    $("#pvp-checkbox").on("change", function () {
        app.togglePvP();
    });
    $("#party-checkbox").on("change", function () {
        app.toggleParty();
    });
    $("#trade-checkbox").on("change", function () {
        app.toggleTrade();
    });
    $("#debug-checkbox").on("change", function () {
        app.toggleDebug();
    });
    $("#effects-checkbox").on("change", function () {
        app.toggleEffects();
    });
    $(document).on("keydown.loginform", function (e) {
        if (e.keyCode === Types.Keys.ENTER) {
            if (!game.started &&
                (app.loginFormActive() ||
                    app.createNewCharacterFormActive() ||
                    app.createPasswordFormActive() ||
                    app.enterPasswordFormActive())) {
                if (document.activeElement.tagName === "INPUT") {
                    $(document.activeElement).trigger("blur");
                }
                app.tryStartingGame();
                return false;
            }
        }
    });
};
initApp();
