import * as Sentry from "@sentry/node";
import { postMessageToDiscordModeratorDebugChannel } from "./discord";
Sentry.init({
    dsn: process.env.SENTRY_DNS,
    beforeSend: function (event, hint) {
        var _a, _b;
        if (process.env.NODE_ENV === "development") {
            console.error(hint.originalException || hint.syntheticException);
            return null;
        }
        var message = ((_a = hint.originalException) === null || _a === void 0 ? void 0 : _a.message) || ((_b = hint.syntheticException) === null || _b === void 0 ? void 0 : _b.message);
        if (typeof message === "string" && (message === null || message === void 0 ? void 0 : message.includes("while still locked"))) {
            return null;
        }
        postMessageToDiscordModeratorDebugChannel(message);
        return event;
    },
});
process.on("uncaughtException", function (err) {
    console.log("Error", err);
    Sentry.captureException(err);
});
process.on("exit", function (code) {
    Sentry.captureException(new Error("Exiting with code"), { extra: { code: code } });
    process.exit(code);
});
process.on("unhandledRejection", function (reason, promise) {
    Sentry.captureException(new Error("Unhandled promise rejection"), {
        extra: { reason: reason, promise: promise },
    });
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    console.log("Error", reason);
});
export { Sentry };
