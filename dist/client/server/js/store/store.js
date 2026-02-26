import BigNumber from "bignumber.js";
import { Types } from "../../../shared/js/gametypes";
import { nodeCache } from "./cache";
var NODE_ENV = process.env.NODE_ENV;
var isDevelopmentAmounts = NODE_ENV === "development";
var Store = (function () {
    function Store() {
        this.storeItems = [
            {
                id: Types.Store.EXPANSION2,
                nano: 0,
                ban: 0,
                usd: isDevelopmentAmounts ? 0.01 : 5,
                isAvailable: true,
            },
            {
                id: Types.Store.SCROLLUPGRADESACRED,
                nano: 0,
                ban: 0,
                usd: isDevelopmentAmounts ? 0.05 : 1.5,
                isAvailable: true,
            },
            {
                id: Types.Store.SCROLLUPGRADELEGENDARY,
                nano: 0,
                ban: 0,
                usd: isDevelopmentAmounts ? 0.1 : 1.5,
                isAvailable: true,
            },
            {
                id: Types.Store.CAPE,
                nano: 0,
                ban: 0,
                usd: isDevelopmentAmounts ? 0.12 : 1.25,
                isAvailable: true,
            },
            {
                id: Types.Store.PET,
                nano: 0,
                ban: 0,
                usd: isDevelopmentAmounts ? 0.12 : 1.5,
                isAvailable: true,
            },
        ];
    }
    Store.prototype.getItems = function () {
        var nanoToUsd = nodeCache.get("PRICE_NANO_USD");
        var banToUsd = nodeCache.get("PRICE_BAN_USD");
        if (!nanoToUsd || !banToUsd) {
            return [];
        }
        this.storeItems.map(function (item) {
            item.nano = parseFloat(new BigNumber(item.usd).dividedBy(nanoToUsd).toFormat(3));
            item.ban = parseInt("".concat(new BigNumber(item.usd).dividedBy(banToUsd).toNumber()), 10);
            return item;
        });
        return this.storeItems;
    };
    return Store;
}());
var store = new Store();
export { store };
