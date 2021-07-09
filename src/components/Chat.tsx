import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import ChatRoom from "./ChatRoom";
import SignIn from "./SignIn";
import Spinner from "./Spinner";

const Chat: FC = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <div className="chat">
        <Spinner />
      </div>
    );
  }
  return <div className="chat">{user ? <ChatRoom /> : <SignIn />}</div>;
};

export default Chat;
