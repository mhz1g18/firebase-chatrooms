import { useState } from "react";
import { FC } from "react";
import { auth, firestore } from "../utils/firebase";
import firebase from "firebase/app";
import SendIcon from "@material-ui/icons/Send";
import { v4 as uuid_v4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useChatroom } from "../context/context";

const CreateRoom: FC = () => {
  const chatroomRef = firestore.collection("chatrooms");
  const { setRoom } = useChatroom();
  const [roomName, setRoomName] = useState<string>("");
  const history = useHistory();

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const onSubmiHandler = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!roomName.length) return;

    if (auth.currentUser) {
      const id = uuid_v4();

      const room = await chatroomRef.add({
        name: roomName,
        uid: auth.currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        id,
      });

      setRoom &&
        setRoom({
          id,
          name: roomName,
        });

      history.push(`./${id}`);
    }
  };

  return (
    <div className="chatroom-buttons">
      <form onSubmit={onSubmiHandler}>
        <input
          placeholder="Room Name"
          value={roomName}
          onChange={onInputHandler}
        />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
