import { io } from "socket.io-client";

const SOCKET_URL = process.env.DomainUrl || window.location.origin;

const socket = io(SOCKET_URL, {
  path: "/socket.io",
  transports: ["websocket"],
  autoConnect: false,
  withCredentials: true,
});

const initializeSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
  return socket;
};

export { socket, initializeSocket };
