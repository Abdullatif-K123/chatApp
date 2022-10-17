import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Inputs";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src="assets/phone-call.png" alt="phone-call" />
          <img src="assets/vidCall.png" alt="video-call" />
          <img src="assets/more.png" alt="more" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
