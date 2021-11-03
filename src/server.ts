import ejs from "ejs";
import express from "express";

const server = express();

server.set("views", `${process.cwd()}/src/views`);
server.set("view engine", "ejs");
server.set("x-powered-by", false);
server.engine("html", ejs.renderFile);

server.use("/assets", express.static(`${process.cwd()}/dist/client`));
server.use("/chat-icon", express.static(`${process.cwd()}/src/assets`));
server.use("/favicons", express.static(`${process.cwd()}/src/favicons`));

server.use("/", (req, res) => res.render("main.html"));

export default server;
