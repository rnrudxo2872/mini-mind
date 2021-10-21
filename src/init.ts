import socketIO from "socket.io";
import { MessageDTO } from "./interfaces/msg.interface";
import server from "./server";

const PORT = process.env.PORT || 8000;

const httpServer = server.listen(PORT, () =>
  console.log(`server now listen ${PORT}😊`)
);

const IO = new socketIO.Server({ serveClient: false }).listen(httpServer);
IO.on("connection", (socket) => {
  socket.on("sendMsg", (input: MessageDTO) => {
    socket.broadcast.emit("getMsg", input);
  });
});
