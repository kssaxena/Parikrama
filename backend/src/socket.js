import { Server } from "socket.io";

let ioInstance;

const initSocketServer = (server) => {
  const allowedOrigins = [
    process.env.ORIGIN_1,
    process.env.ORIGIN_2,
    process.env.ORIGIN_3,
    process.env.ORIGIN_4,
    process.env.ORIGIN_5,
    process.env.ORIGIN_6,
  ]
    .filter(Boolean)
    .map((origin) => origin.trim());

  const io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
      },
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-admin-room", () => {
      socket.join("admins");
      console.log("Socket joined admins room:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  ioInstance = io;
  return io;
};

const getIo = () => {
  if (!ioInstance) {
    throw new Error("Socket server not initialized");
  }
  return ioInstance;
};

export { initSocketServer, getIo };
