import { io } from "socket.io-client";

const socket = io("https://smart-school-e0fm.onrender.com", {
  transports: ["websocket"],
});

export default socket;