import { useState } from "react";
import { FC } from "react";
import { firestore } from "../utils/firebase";
import SendIcon from "@material-ui/icons/Send";
import { useHistory } from "react-router-dom";
import { useChatroom } from "../context/context";

const JoinRoom: FC = () => {
  const chatroomRef = firestore.collection("chatrooms");
  const { setRoom } = useChatroom();
  const [roomId, setRoomId] = useState<string>("");
  const history = useHistory();

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const onSubmiHandler = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const snapshot = await chatroomRef.where("id", "==", roomId).get();
    const chatroom = snapshot.docs.map((doc) => doc.data());

    if (!chatroom || !chatroom.length) {
      setRoomId("No room with that id exists");
      return;
    }

    const { id } = chatroom[0];

    setRoom && setRoom(chatroom[0]);
    history.push(`/${id}`);
  };

  return (
    <div className="chatroom-buttons">
      <form onSubmit={onSubmiHandler}>
        <input placeholder="Room ID" value={roomId} onChange={onInputHandler} />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default JoinRoom;
