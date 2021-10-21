"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var server_1 = __importDefault(require("./server"));
var PORT = process.env.PORT || 8000;
var httpServer = server_1.default.listen(PORT, function () {
    return console.log("server now listen " + PORT + "\uD83D\uDE0A");
});
var IO = new socket_io_1.default.Server({ serveClient: false }).listen(httpServer);
IO.on("connection", function (socket) {
    socket.on("sendMsg", function (input) {
        socket.broadcast.emit("getMsg", input);
    });
});
