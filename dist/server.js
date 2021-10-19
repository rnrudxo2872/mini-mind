"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var server = (0, express_1.default)();
server.set("views", process.cwd() + "/src/views");
server.set("view engine", "pug");
server.set("x-powered-by", false);
server.use("/", function (req, res) { return res.render("main"); });
exports.default = server;
