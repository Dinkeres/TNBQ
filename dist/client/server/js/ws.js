import express from "express";
import { createServer } from "http";
import * as _ from "lodash";
import path from "path";
import { Server as SocketServer } from "socket.io";
import { random } from "./utils";
var NODE_ENV = process.env.NODE_ENV;
var Server = (function () {
    function Server(port) {
        this._connections = {};
        this._counter = 0;
        this.port = port;
        this.io = null;
        var self = this;
        var app = express();
        var server = createServer(app);
        var cors = { origin: "*" };
        if (NODE_ENV === "development") {
            cors = { origin: "*" };
        }
        else {
            var whitelist_1 = [
                "https://nanobrowserquest.com",
                "https://www.nanobrowserquest.com",
                "https://bananobrowserquest.com",
                "https://www.bananobrowserquest.com",
            ];
            cors = {
                origin: function (origin, callback) {
                    if (whitelist_1.includes(origin)) {
                        callback(null, true);
                    }
                    else {
                        callback(new Error("Not allowed by CORS"));
                    }
                },
            };
        }
        this.io = new SocketServer(server, { cors: cors, allowEIO3: true });
        app.use(express.static(path.join(process.cwd(), "dist/client")));
        this.io.on("connection", function (connection) {
            var _a;
            console.info("~~~~~~~a user connected");
            var c = new Connection(self._createId(), connection, self);
            (_a = self.connection_callback) === null || _a === void 0 ? void 0 : _a.call(self, c);
            self.addConnection(c);
        });
        this.io.on("error", function (err) {
            console.error(err.stack);
            self.error_callback();
        });
        console.log("~~~~~~~~BEFORE BINDING LISTEN on port:".concat(port));
        console.info("Starting NanoBrowserQuest game server... on port ".concat(port));
        server
            .listen(port, function () {
            console.log("~~~~5");
            console.info("WS Server is now listening on *:" + port);
        })
            .on("error", function (err) {
            console.error("Server failed to start", err);
        });
    }
    Server.prototype._createId = function () {
        return "5" + random(99) + "" + this._counter++;
    };
    Server.prototype.broadcast = function (message) {
        this.forEachConnection(function (connection) {
            connection.send(message);
        });
    };
    Server.prototype.onRequestStatus = function (status_callback) {
        this.status_callback = status_callback;
    };
    Server.prototype.onConnect = function (callback) {
        this.connection_callback = callback;
    };
    Server.prototype.onError = function (callback) {
        this.error_callback = callback;
    };
    Server.prototype.forEachConnection = function (callback) {
        _.each(this._connections, callback);
    };
    Server.prototype.addConnection = function (connection) {
        this._connections[connection.id] = connection;
    };
    Server.prototype.removeConnection = function (id) {
        delete this._connections[id];
    };
    Server.prototype.getConnection = function (id) {
        return this._connections[id];
    };
    return Server;
}());
export { Server };
var Connection = (function () {
    function Connection(id, connection, server) {
        this._connection = connection;
        this._server = server;
        this.id = id;
        var self = this;
        connection.on("dispatch", function (message) {
            console.log("Received dispatch request", message);
            self._connection.emit("dispatched", { status: "OK", host: server.host, port: server.port });
        });
        connection.on("message", function (message) {
            var _a;
            (_a = self.listen_callback) === null || _a === void 0 ? void 0 : _a.call(self, message);
        });
        connection.on("disconnect", function () {
            var _a;
            (_a = self.close_callback) === null || _a === void 0 ? void 0 : _a.call(self);
            self._server.removeConnection(self.id);
        });
    }
    Connection.prototype.onClose = function (callback) {
        this.close_callback = callback;
    };
    Connection.prototype.listen = function (callback) {
        this.listen_callback = callback;
    };
    Connection.prototype.broadcast = function (_message) {
        throw "Not implemented";
    };
    Connection.prototype.send = function (message) {
        this._connection.emit("message", message);
    };
    Connection.prototype.sendUTF8 = function (data) {
        this._connection.send(data);
    };
    Connection.prototype.close = function (logError) {
        console.info("Closing connection to " + this._connection.remoteAddress + ". Error: " + logError);
        this._connection.disconnect();
    };
    return Connection;
}());
export { Connection };
export default Server;
