"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const server_1 = __importDefault(require("./server"));
const PORT = process.env.PORT || 8000;
const httpServer = server_1.default.listen(PORT, () => console.log(`server now listen ${PORT}😊`));
const IO = new socket_io_1.default.Server({ serveClient: false }).listen(httpServer);
IO.on("connection", (socket) => {
    socket.on("sendMsg", (input) => {
        console.log(input);
        socket.broadcast.emit("getMsg", input);
    });
});
