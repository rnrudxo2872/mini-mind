"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ejs_1 = __importDefault(require("ejs"));
var express_1 = __importDefault(require("express"));
var server = (0, express_1.default)();
server.set("views", process.cwd() + "/src/views");
server.set("view engine", "ejs");
server.set("x-powered-by", false);
server.engine("html", ejs_1.default.renderFile);
server.use("/assets", express_1.default.static(process.cwd() + "/dist/client"));
server.use("/", function (req, res) { return res.render("main.html"); });
exports.default = server;
