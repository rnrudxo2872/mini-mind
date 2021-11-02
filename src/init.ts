import socketIO from "socket.io";
import { MessageDTO } from "./interfaces/msg.interface";
import server from "./server";

const PORT = process.env.PORT || 8000;

const httpServer = server.listen(PORT, () =>
  console.log(`server now listen ${PORT}😊`)
);

const IO = new socketIO.Server({ serveClient: false }).listen(httpServer);

IO.on("connection", (socket) => {
  const rooms: string[] = [];

  socket.on("sendMsg", (input: MessageDTO) => {
    console.log(input);
    socket.broadcast.emit("getMsg", input);
  });

  socket.on("getRooms", (_) => {
    socket.emit("returnRooms", rooms);
  });

  socket.on("joinRoom", (data: any) => {
    const { num, name } = data;
  });

  socket.on("createRoom", (data: any) => {
    const { name }: { name: string } = data;
    rooms.push(name);
    console.log(rooms);
  });
});
