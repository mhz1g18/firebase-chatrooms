import { useRef, useState } from "react";
import { FC } from "react";
import {
  useCollectionData,
  useCollectionDataOnce,
} from "react-firebase-hooks/firestore";
import { ChatRoom, Message } from "../@types";
import { auth, firestore } from "../utils/firebase";
import firebase from "firebase/app";
import SendIcon from "@material-ui/icons/Send";
import ChatMessage from "./ChatMessage";
import { useEffect } from "react";
import { RouteComponentProps, useHistory, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import ChatRoomButtons from "./ChatRoomButtons";
import { useChatroom } from "../context/context";

interface ChatRoomRouteParams {
  chatroomId: string;
}

const ChatBody: FC = () => {
  const { chatroomId } = useParams<ChatRoomRouteParams>();
  const { room, setRoom } = useChatroom();
  const history = useHistory();

  const chatroomRef = firestore.collection("chatrooms");
  const chatroomQuery = chatroomRef.where("id", "==", chatroomId);

  const messagesRef = firestore.collection("messages");
  const messagesQuery = messagesRef
    .where("chatroomId", "==", chatroomId)
    .orderBy("createdAt")
    .limit(50);

  const [messages] = useCollectionData(messagesQuery, {
    idField: "id",
    transform: (msg) => msg as Message,
  });

  const [chatroom, loading] = useCollectionDataOnce(chatroomQuery, {
    idField: "id",
    transform: (room) => room as ChatRoom,
  });

  const [formValue, setFormValue] = useState<string>("");
  const dummyRef = useRef<HTMLDivElement | null>(null);

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  };

  const onSubmiHandler = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!formValue.length) return;

    if (auth.currentUser) {
      const { uid, photoURL } = auth.currentUser;

      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        chatroomId,
      });

      setFormValue("");
    }
  };

  useEffect(() => {
    dummyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return <Spinner />;
  }

  if (!chatroom || !chatroom.length) {
    history.push("/");
  }

  return (
    <>
      <div className="chat-body">
        {messages &&
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        <div ref={dummyRef}></div>
      </div>
      <form onSubmit={onSubmiHandler}>
        <input value={formValue} onChange={onInputHandler} />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </>
  );
};

export default ChatBody;
