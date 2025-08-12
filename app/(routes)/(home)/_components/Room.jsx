"use client";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setRoom, setUsername } from "@/redux/chatSlice";

import { useRouter } from "next/navigation";
import { getSocket } from "@/socket";



const Room = () => {
  const socket = getSocket()
  const router = useRouter()
  const { username, room } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const sendRoom = async () => {
    try {
      await new Promise((resolve, reject) => {
        socket.emit("room", { room: room }, (response) => {
          if (response && response.status === "ok") {
            resolve();
          } else {
            reject(new Error("Odaya katılırken bir hata oluştu."));
          }
        });
      });

      router.push("/chat");
    } catch (error) {
      console.error(error.message);
      
    }
  };
    
    
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full md:w-1/2 lg:w-1/3 h-screen md:h-auto md:min-h-[500px] bg-amber-500 flex flex-col items-center gap-8 p-4 rounded-lg">
        <h1 className="text-2xl pt-2 text-black font-bold">WELCOME CHAT</h1>
        <div className="flex flex-col gap-4 w-full py-4">
          <input
            className="bg-blue-800 p-4 rounded-lg outline-none text-white placeholder-white"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
          />
          <input
            className="bg-blue-800 p-4 rounded-lg outline-none text-white placeholder-white"
            type="text"
            placeholder="Room"
            value={room}
            onChange={(e) => dispatch(setRoom(e.target.value))}
          />
        </div>
        <button
          className="w-full bg-red-600 hover:bg-red-700 p-4 rounded-lg cursor-pointer text-center text-white font-bold"
          onClick={sendRoom}
        >
          CHAT!
        </button>
        <div>{username},{room}</div>
      </div>
    </div>
  );
};

export default Room;
