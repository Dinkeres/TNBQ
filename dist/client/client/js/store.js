import BigNumber from "bignumber.js";
import { Types } from "../../shared/js/gametypes";
import { StoreItems } from "../../shared/js/store";
import { copyToClipboard, raiToRaw } from "./utils";
var Store = (function () {
    function Store(app) {
        this.app = app;
        this.depositAccount = null;
        this.isPurchaseSessionCreated = false;
        this.storeItems = StoreItems;
    }
    Store.prototype.openStore = function () {
        this.app.hideWindows();
        this.app.game.client.sendStoreItems();
        $("#store, #store-item-list").addClass("active");
        return;
    };
    Store.prototype.addStoreItems = function (items) {
        var _this = this;
        this.storeItems = this.storeItems
            .map(function (item) {
            var matchedItem = items.find(function (_a) {
                var id = _a.id;
                return item.id === id;
            });
            if (!matchedItem)
                return;
            var nano = matchedItem.nano, ban = matchedItem.ban, usd = matchedItem.usd, usdRegular = matchedItem.usdRegular, isAvailable = matchedItem.isAvailable;
            item.nano = nano;
            item.ban = ban;
            item.usd = usd;
            item.usdRegular = usdRegular;
            item.isAvailable = isAvailable;
            return item;
        })
            .filter(Boolean);
        $("#store-item-list").empty();
        this.storeItems.forEach(function (_a) {
            var id = _a.id, icon = _a.icon, name = _a.name, description = _a.description, confirmedMessage = _a.confirmedMessage, nano = _a.nano, ban = _a.ban, usd = _a.usd, usdRegular = _a.usdRegular, isAvailable = _a.isAvailable;
            var isLocked = (id === Types.Store.EXPANSION1 && !_this.app.game.player.expansion1) ||
                (id === Types.Store.EXPANSION2 && !_this.app.game.player.expansion2);
            var isDisabled = false;
            var price = _this.app.game.network === "nano" ? nano : ban;
            var isExpansion2Voucher = id === Types.Store.EXPANSION2 && _this.app.game.player.expansion2;
            var isExpansion2Purschsed = isExpansion2Voucher && !isLocked;
            var item = $("<div/>", {
                class: "item-wrapper item-name-".concat(icon),
                html: "\n            <div class=\"item-icon\">\n              <div class=\"".concat(icon, " ").concat(isLocked ? "locked" : "unlocked", " ").concat(isExpansion2Voucher ? "voucher" : "", "\"></div>\n            </div>\n            <p class=\"name\">").concat(name, "</p>\n            ").concat(description && !isExpansion2Purschsed ? "<p class=\"description\">".concat(description, "</p>") : "", "\n            ").concat(isExpansion2Purschsed ? "<p class=\"description\">".concat(confirmedMessage, "</p>") : "", "\n            <p class=\"prices\">\n              ").concat(_this.app.getCurrencyPrefix()).concat(price).concat(_this.app.getCurrencySuffix(), "\n              <span class=\"usd\"> \u2248 $").concat(usd.toFixed(2), "</span>\n              ").concat(usdRegular ? "<span class=\"usd line-through\">$".concat(usdRegular.toFixed(2), "</span>") : "", "\n            </p>\n            "),
            });
            item.append($("<button/>", {
                class: "btn ".concat(isDisabled ? "disabled" : ""),
                html: isAvailable
                    ? isExpansion2Voucher
                        ? "Purchased for this character, <small>you'll get a tradable voucher if you purchase the expansion again</small>"
                        : "Purchase"
                    : "Available soon",
                click: function () {
                    if (isDisabled)
                        return;
                    _this.selectStoreItemPurchase(id);
                },
            }));
            item.appendTo("#store-item-list");
        });
    };
    Store.prototype.closeStore = function () {
        $("#store, #store-item-list, #store-item-purchase").removeClass("active");
        $("#store-item-list").empty();
        if (this.isPurchaseSessionCreated) {
            this.app.game.client.sendPurchaseCancel();
            this.isPurchaseSessionCreated = false;
        }
    };
    Store.prototype.selectStoreItemPurchase = function (id) {
        var self = this;
        $("#store-item-list").removeClass("active");
        $("#store-item-purchase").empty().addClass("active");
        var item = this.storeItems.find(function (_a) {
            var itemId = _a.id;
            return id === itemId;
        });
        var icon = item.icon, name = item.name, description = item.description, requiresInventorySlot = item.requiresInventorySlot;
        var price = item[this.app.game.network];
        if (this.depositAccount) {
            this.app.game.client.sendPurchaseCreate(id, this.depositAccount);
            this.isPurchaseSessionCreated = true;
        }
        var isExpansion2Voucher = id === Types.Store.EXPANSION2 && this.app.game.player.expansion2;
        $("<div/>", {
            class: "item-wrapper",
            html: "\n          <div class=\"item-icon\">\n            <div class=\"".concat(icon, " locked ").concat(isExpansion2Voucher ? "voucher" : "", "\"></div>\n          </div>\n          <p class=\"name\">").concat(name, "</p>\n          ").concat(description ? "<p class=\"description\">".concat(description, "</p>") : "", "\n        "),
        }).appendTo("#store-item-purchase");
        if (!this.depositAccount) {
            $("<div/>", {
                class: "item-wrapper item-wrapper-large",
                html: "\n              <p class=\"name\">You need to enter your ".concat(this.app.game.network, "_ address<br/> in the Settings panel before being able to purchase an item from the store</p>\n            "),
            }).appendTo("#store-item-purchase");
        }
        if (requiresInventorySlot && this.app.game.player.inventory.length >= 24) {
            $("<div/>", {
                class: "item-wrapper item-wrapper-large",
                html: "\n            <p class=\"description\">Your inventory is full, delete an item before going through with the transaction.</p>\n          ",
            }).appendTo("#store-item-purchase");
        }
        else if (this.depositAccount) {
            $("<div/>", {
                class: "item-wrapper waiting-for-transaction",
                html: "\n            <p class=\"name\">Send ".concat(this.app.getCurrencyPrefix(), "<b>").concat(price, "</b>").concat(this.app.getCurrencySuffix(), " to</p>\n            <p class=\"nano-account\">").concat(self.depositAccount, "</p>\n            <br/>\n            <p class=\"name\"><img src=\"img/common/spinner2.gif\"> Waiting for transaction</p>\n            <br/>\n            <p class=\"note note-high-resolution\">* Make sure you send the exact amount to your deposit account</p>\n          "),
            }).appendTo("#store-item-purchase");
            $("<div/>", {
                class: "item-wrapper waiting-for-transaction",
                html: "\n          <p class=\"note note-high-resolution\">Scan the QR code with Natrium.</p>\n          <div id=\"qrcode\"></div>\n          <div class=\"or-line hide-on-mobile\"><span>OR</span></div>\n          <div id=\"store-account-button\"></div>\n          <div class=\"or-line hide-on-mobile\"><span>OR</span></div>\n          <p class=\"note note-high-resolution\">Use \n            <a href=\"https://nault.cc/send?to=".concat(self.depositAccount, "&amount=").concat(price, "\" target=\"_blank\">Nault.cc</a> to send the amount\n          </p>\n          <p class=\"note note-high-resolution\">* Not sure? <a href=\"https://www.youtube.com/watch?v=rvdOzv0pnSw\" target=\"_blank\">Watch a tutorial</a></p>\n        "),
            }).appendTo("#store-item-purchase");
            var copyTimeout_1 = undefined;
            $("<button/>", {
                class: "btn",
                text: "Copy to Clipboard",
                click: function () {
                    var _this = this;
                    copyToClipboard(self.depositAccount);
                    $(this).text("Copied!").addClass("disabled");
                    clearTimeout(copyTimeout_1);
                    copyTimeout_1 = setTimeout(function () {
                        $(_this).text("Copy to Clipboard").removeClass("disabled");
                    }, 3000);
                },
            }).appendTo("#store-account-button");
            var network = this.app.game.network;
            var text = "".concat(network, ":").concat(this.depositAccount, "?amount=").concat(new BigNumber(raiToRaw(price, network)).toString(10));
            $("#qrcode").qrcode({ width: 130, height: 130, text: text });
        }
        else {
        }
    };
    Store.prototype.purchaseCompleted = function (payment) {
        var item = this.storeItems.find(function (_a) {
            var id = _a.id;
            return payment.id === id;
        });
        var id = item.id, icon = item.icon, name = item.name, description = item.description, thankYouMessage = item.thankYouMessage, confirmedMessage = item.confirmedMessage;
        var isLocked = id !== Types.Store.EXPANSION1 || id !== Types.Store.EXPANSION2;
        this.app.game.tryUnlockingAchievement("XNO");
        var isExpansion2Voucher = id === Types.Store.EXPANSION2 && this.app.game.player.expansion2;
        $("#store-item-purchase").empty();
        $("<div/>", {
            class: "item-wrapper item-wrapper-full",
            html: "\n          <p class=\"title\">Transaction confirmed!</p>\n          <div class=\"item-icon\">\n              <div class=\"".concat(icon, " ").concat(isLocked ? "locked" : "unlocked", " ").concat(isExpansion2Voucher ? "voucher" : "", "\"></div>\n          </div>\n          <p class=\"name\">").concat(name, "</p>\n          ").concat(description ? "<p class=\"description\">".concat(description, "</p>") : "", "\n          <p class=\"description overflow-text\">\n            <a href=\"https://").concat(this.app.game.explorer, ".com/block/").concat(payment.hash, "\" target=\"_blank\">").concat(payment.hash, "</a>\n          </p>\n          <p class=\"description\">").concat(confirmedMessage).concat(thankYouMessage || "", "</p>\n        "),
        }).appendTo("#store-item-purchase");
    };
    Store.prototype.purchaseError = function (error) {
        var _a = (error || {}).message, message = _a === void 0 ? "An error happened. Try again later or contact the game admin if it persists." : _a;
        $(".waiting-for-transaction").remove();
        $("<div/>", {
            class: "item-wrapper item-wrapper-large",
            html: "\n          <p class=\"description\">".concat(message, "</p>\n        "),
        }).appendTo("#store-item-purchase");
    };
    return Store;
}());
export default Store;
