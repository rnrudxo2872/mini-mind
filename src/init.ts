import socketIO from "socket.io";
import server from "./server";

const PORT = process.env.PORT || 8000;

const httpServer = server.listen(PORT, () =>
  console.log(`server now listen ${PORT}😊`)
);
const IO = new socketIO.Server().listen(httpServer);
IO.on("connection", (socket) => console.log(socket.id));
