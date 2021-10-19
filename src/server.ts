import express from "express";

const server = express();

server.set("views", `${process.cwd()}/src/views`);
server.set("view engine", "pug");
server.set("x-powered-by", false);

server.use("/", (req, res) => res.render("main"));

export default server;
