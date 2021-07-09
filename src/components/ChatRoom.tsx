import { useRef, useState } from "react";
import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ChatRoomButtons from "./ChatRoomButtons";
import ChatBody from "./ChatBody";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";

const ChatRoom: FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ChatRoomButtons />
      </Route>
      <Route exact path="/create">
        <CreateRoom />
      </Route>
      <Route exact path="/join">
        <JoinRoom />
      </Route>
      <Route path="/:chatroomId">
        <ChatBody />
      </Route>
    </Switch>
  );
};

export default ChatRoom;
