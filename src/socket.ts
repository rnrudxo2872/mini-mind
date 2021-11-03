import { Server } from "http";
import socketIO, { Socket } from "socket.io";
import { MessageDTO } from "./interfaces/msg.interface";
import { SocketRoom, SocketUser } from "./interfaces/socket.interface";

class ChatSocket {
  IO: socketIO.Server;
  userList: Map<string, SocketUser>;

  constructor(server: Server) {
    this.IO = new socketIO.Server({ serveClient: false }).listen(server);
    this.userList = new Map();

    this.IO.on("connection", (socket: Socket) => {
      const rooms: SocketRoom[] = [];

      this.userList.set(socket.id, {
        hasRoomsCnt: 0,
        id: socket.id,
        rooms: [],
      });

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

        if (!this.isValidCreateRoom(socket.id)) return;
        this.setUserInfo(socket.id);

        rooms.push({ num: rooms.length, name, userName: socket.id });
        console.log(rooms);
      });
    });
  }

  setUserInfo(id: string) {
    const userInfo = this.userList.get(id);
    if (userInfo) {
      userInfo.hasRoomsCnt++;
      this.userList.set(id, userInfo);
    }
  }

  isValidCreateRoom(userName: string) {
    if (this.isLimitCreate(userName)) return false;
    return true;
  }

  isLimitCreate(userName: string) {
    const userObj = this.userList.get(userName);
    console.log(userObj?.hasRoomsCnt);
    if (userObj && userObj.hasRoomsCnt > 2) return true;
    return false;
  }
}

export default ChatSocket;
