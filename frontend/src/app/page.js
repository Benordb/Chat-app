"use client";
import { useAuth } from "@/components/utils/authProvider";
import Cookies from "js-cookie";
import { api } from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState();

  const { user } = useAuth();
  const socket = useRef(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.warn("No token found");
      return;
    }
    socket.current = io("http://localhost:3005", {
      auth: {
        token,
      },
    });

    socket.current.on("messageReceived", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [message]);

  const createMessage = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.warn("No token found");
        return;
      }
      const res = await api.post(
        "/user/message",
        {
          to: "6715c0b25a9afcfe4c6de441",
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        const sentMessage = { from: user.user._id, message: message };
        socket.current.emit("sendMessage", sentMessage);
        setMessages((prevMessages) => [...prevMessages, sentMessage]);
        setMessage("");
        console.log("Message sent successfully:", res.data);
      } else {
        console.error("Failed to send message:", res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const getUserMessagesUserID = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.warn("No token found");
          return;
        }
        const res = await api.get(`/user/message/user/${user.user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUserMessagesUserID();
  }, []);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.warn("No token found");
          return;
        }
        const res = await api.get(`/user/message/user/${user.user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAllUsers();
  }, [user]);

  return (
    <div className="w-screen h-screen flex gap-4">
      <div className="h-full w-16 bg-neutral-700">navbar</div>
      <div className="w-full h-full flex">
        <div className="w-80 bg-neutral-700 h-full"></div>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="h-24 bg-neutral-700 w-full"></div>
          <div className="h-full  w-full overflow-hidden">
            {!messages
              ? null
              : messages.map((item, index) => (
                  <div
                    className={
                      item.from === user.user._id
                        ? "text-green-400 text-end"
                        : null
                    }
                    key={index}
                  >
                    {item.message}
                  </div>
                ))}
          </div>
          <div className="flex gap-2 w-full px-12 pb-6">
            <input
              value={message}
              onChange={(e) => {
                socket.current.emit("typing", {
                  from: user.user._id,
                  to: "6715c0b25a9afcfe4c6de441",
                });
                setMessage(e.target.value);
              }}
              type="text"
              className="h-12 w-full bg-neutral-700 rounded-full px-8"
            />
            <button
              onClick={createMessage}
              className="h-12 w-12 bg-neutral-700 rounded-full"
            >
              icon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
