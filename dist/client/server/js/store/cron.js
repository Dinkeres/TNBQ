var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import cron from "node-cron";
import fetch from "node-fetch";
import { nodeCache } from "./cache";
var _a = process.env, COINMARKETCAP_KEY = _a.COINMARKETCAP_KEY, NODE_ENV = _a.NODE_ENV;
var getNetworkUsdPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
    var nano, banano, err_1, err_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (NODE_ENV !== "production") {
                    nodeCache.set("PRICE_NANO_USD", 0.882418);
                    nodeCache.set("PRICE_BAN_USD", 0.0055262);
                    return [2];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 8]);
                return [4, getPriceFromCoinMarketCap()];
            case 2:
                (_a = _c.sent(), nano = _a.nano, banano = _a.banano);
                if (!nano || !banano) {
                    throw new Error("Failed to get CMC Nano/Banano price");
                }
                return [3, 8];
            case 3:
                err_1 = _c.sent();
                _c.label = 4;
            case 4:
                _c.trys.push([4, 6, , 7]);
                return [4, getPriceFromCoinGecko()];
            case 5:
                (_b = _c.sent(), nano = _b.nano, banano = _b.banano);
                return [3, 7];
            case 6:
                err_2 = _c.sent();
                return [3, 7];
            case 7: return [3, 8];
            case 8:
                nodeCache.set("PRICE_NANO_USD", nano);
                nodeCache.set("PRICE_BAN_USD", banano);
                return [2];
        }
    });
}); };
var getPriceFromCoinMarketCap = function () { return __awaiter(void 0, void 0, void 0, function () {
    var NANO_ID, BANANO_ID, nanoToUsd, banToUsd, res, data, nanoObj, resBan, dataBan, banObj, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                NANO_ID = 1567;
                BANANO_ID = 4704;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4, fetch("https://pro-api.coinmarketcap.com/v2/tools/price-conversion?symbol=xno&amount=1", {
                        headers: {
                            "X-CMC_PRO_API_KEY": COINMARKETCAP_KEY,
                        },
                    })];
            case 2:
                res = _a.sent();
                return [4, res.json()];
            case 3:
                data = (_a.sent()).data;
                nanoObj = data.find(function (_a) {
                    var id = _a.id;
                    return id === NANO_ID;
                });
                nanoToUsd = nanoObj.quote.USD.price;
                return [4, fetch("https://pro-api.coinmarketcap.com/v2/tools/price-conversion?symbol=ban&amount=1", {
                        headers: {
                            "X-CMC_PRO_API_KEY": COINMARKETCAP_KEY,
                        },
                    })];
            case 4:
                resBan = _a.sent();
                return [4, resBan.json()];
            case 5:
                dataBan = (_a.sent()).data;
                banObj = dataBan.find(function (_a) {
                    var id = _a.id;
                    return id === BANANO_ID;
                });
                banToUsd = banObj.quote.USD.price;
                return [2, { nano: nanoToUsd, banano: banToUsd }];
            case 6:
                err_3 = _a.sent();
                console.log("Err getPriceFromCoinMarketCap", err_3);
                return [2, null];
            case 7: return [2];
        }
    });
}); };
var getPriceFromCoinGecko = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, json, nanoToUsd, banToUsd, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4, fetch("https://api.coingecko.com/api/v3/simple/price?ids=nano,banano&vs_currencies=usd")];
            case 1:
                res = _a.sent();
                return [4, res.json()];
            case 2:
                json = _a.sent();
                nanoToUsd = json.nano.usd, banToUsd = json.banano.usd;
                return [2, { nano: nanoToUsd, banano: banToUsd }];
            case 3:
                err_4 = _a.sent();
                console.log("Err getPriceFromCoinGecko", err_4);
                return [2, null];
            case 4: return [2];
        }
    });
}); };
cron.schedule("*/10 * * * *", function () {
    getNetworkUsdPrice();
});
getNetworkUsdPrice();
