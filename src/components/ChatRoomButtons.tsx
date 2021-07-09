import { FC } from "react";
import { useHistory } from "react-router-dom";

const ChatRoomButtons: FC = () => {
  const history = useHistory();
  const joinButtonHandler = () => {
    history.push("/join");
  };

  const createButtonHandler = () => {
    history.push("/create");
  };

  return (
    <div className="chatroom-buttons">
      <button onClick={joinButtonHandler}>Join</button>
      <button onClick={createButtonHandler}>Create</button>
    </div>
  );
};

export default ChatRoomButtons;
