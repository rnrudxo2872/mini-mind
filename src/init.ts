import server from "./server";

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`server now listen ${PORT}😊`));
