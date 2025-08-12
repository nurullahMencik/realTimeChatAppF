import { io } from "socket.io-client";


let socket = null;

export const getSocket = () => {
    if (!socket) {
        socket = io.connect("https://realtimechatappb.onrender.com");
    }
    return socket;
};