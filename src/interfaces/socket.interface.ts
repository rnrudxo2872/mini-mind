export interface SocketRoom {
  num: number;
  name: string;
  userName: string;
}

export interface SocketUser {
  id: string;
  hasRoomsCnt: number;
  rooms: string[];
}
