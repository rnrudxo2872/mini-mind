import { Server } from "http";
import socketIO, { Socket } from "socket.io";
import { MessageDTO } from "./interfaces/msg.interface";

class ChatSocket {
  IO: socketIO.Server;

  constructor(server: Server) {
    this.IO = new socketIO.Server({ serveClient: false }).listen(server);

    this.IO.on("connection", (socket: Socket) => {
      const rooms: { num: number; name: string; userName: string }[] = [];

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

        // if(isValidCreate())
        rooms.push({ num: rooms.length, name, userName: socket.id });
        console.log(rooms);
      });
    });
  }
}

export default ChatSocket;
