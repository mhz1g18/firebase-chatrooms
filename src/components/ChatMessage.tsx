import { FC } from "react";
import { Message } from "../@types";
import { auth } from "../utils/firebase";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const { text, uid, photoURL } = message;
  const messageClass = uid === auth.currentUser?.uid ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="User Profile Picture" />
      <p className="chat-text">{text} </p>
    </div>
  );
};

export default ChatMessage;
