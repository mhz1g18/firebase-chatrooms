import { useState } from "react";
import { createContext, FC, useContext } from "react";
import { ChatRoom } from "../@types";

interface ContextValues {
  room: ChatRoom | null;
  setRoom: Function;
}

const ChatContext = createContext<Partial<ContextValues>>({});

export const useChatroom = () => {
  const context = useContext(ChatContext);
  return context;
};

export const ChatProvider: FC<{}> = ({ children }) => {
  const [room, setRoom] = useState(null);
  return (
    <ChatContext.Provider value={{ room, setRoom }}>
      {children}
    </ChatContext.Provider>
  );
};
