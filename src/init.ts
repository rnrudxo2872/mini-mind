import server from "./server";
import ChatSocket from "./socket";

const PORT = process.env.PORT || 8000;

const httpServer = server.listen(PORT, () =>
  console.log(`server now listen ${PORT}😊`)
);

const IO = new ChatSocket(httpServer).IO;
