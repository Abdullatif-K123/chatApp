import { serverTimestamp } from "firebase/firestore";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const getMessageTime = () => {
    const timenum = message.date;
    const lastMessage = new Date(
      timenum.seconds * 1000 + timenum.nanoseconds / 10000
    );
    var today = new Date();
    console.log(Number(lastMessage) + " " + Number(today));
    if (today.toLocaleDateString() === lastMessage.toLocaleDateString()) {
      if (Number(lastMessage) >= Number(today)) return "Just Now";
      else return lastMessage.toLocaleTimeString();
    } else return lastMessage.toLocaleDateString();
  };
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="me"
        />
        <span>{getMessageTime()}</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
