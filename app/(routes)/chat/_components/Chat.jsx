"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import { getSocket } from "@/socket";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Link from "next/link";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [recipientName, setRecipientName] = useState("Bekleniyor...");
  const socket = getSocket();

  const { username, room } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);

      // Gelen mesajın sahibinin karşı taraf olfugunu belırtme
      if (data.username !== username) {
        setRecipientName(data.username);
      }
    });
    return () => {
      socket.off("messageReturn");
    };
  }, [socket, username]);

  const sendMessage = async () => {
    if (message.trim() === "") {
      return; // Boş mesaj göndermeyi engelle
    }

    const date = new Date();
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date: `${date.getHours()}:${date.getMinutes()}`,
    };

    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="w-1/3 h-[600px] bg-gray-100 relative">
        <div className="bg-gray-700 h-20 w-full flex items-center p-2">
          <Link href={"/"} className="cursor-pointer">
            <MdOutlineArrowBackIos className="size-10" />
          </Link>
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <div className="ml-4">
            {" "}
            <h2 className="text-white text-lg font-bold">{recipientName}</h2>
            <p className="text-gray-400 text-sm">Çevrimiçi</p>{" "}
          </div>
        </div>
        <div className="w-full h-[400px] overflow-y-auto">
          {messageList.map((msg, index) => (
            <div
              key={index}
              className={`w-2/3 min-h-12 text-white text-m flex flex-col m-2 rounded-xl 
                ${
                  msg.username === username
                    ? "bg-green-700 ml-auto rounded-br-none"
                    : "bg-gray-700 rounded-bl-none"
                }`}
            >
              <div className="pl-1 pr-1 pt-1">{msg.message}</div>
              <div className="w-full flex justify-end pl-1 pr-1 pb-1 text-xs">
                {msg.username} - {msg.date}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-0 bottom-0 w-full flex">
          <input
            className="w-9/10 p-3 text-black outline-none placeholder-gray-400"
            type="text"
            placeholder="message send"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            className="w-1/10 bg-green-600 cursor-pointer rounded-full flex justify-center items-center"
          >
            <IoSend className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
