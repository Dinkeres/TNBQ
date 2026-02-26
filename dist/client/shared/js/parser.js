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
import Emitter from "component-emitter";
import CryptoJS from "crypto-js";
var key = 133;
var Encoder = (function () {
    function Encoder() {
    }
    Encoder.prototype.encode = function (packet) {
        return [CryptoJS.AES.encrypt(JSON.stringify(packet), "@todo-define-secret".concat(key)).toString()];
    };
    return Encoder;
}());
var Decoder = (function (_super) {
    __extends(Decoder, _super);
    function Decoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Decoder.prototype.add = function (chunk) {
        var bytes = CryptoJS.AES.decrypt(chunk, "@todo-define-secret".concat(key));
        var packet = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (this.isPacketValid(packet)) {
        }
        else {
        }
    };
    Decoder.prototype.isPacketValid = function (_a) {
        var type = _a.type, data = _a.data, nsp = _a.nsp, id = _a.id;
        var isNamespaceValid = typeof nsp === "string";
        var isAckIdValid = id === undefined || Number.isInteger(id);
        if (!isNamespaceValid || !isAckIdValid) {
            return false;
        }
        switch (type) {
            case 0:
                return data === undefined || typeof data === "object";
            case 1:
                return data === undefined;
            case 2:
                return Array.isArray(data) && data.length > 0;
            case 3:
                return Array.isArray(data);
            case 4:
                return typeof data === "object";
            default:
                return false;
        }
    };
    Decoder.prototype.destroy = function () { };
    return Decoder;
}(Emitter));
export default { Encoder: Encoder, Decoder: Decoder };
