import { FC } from "react";
import { auth } from "../utils/firebase";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useChatroom } from "../context/context";
import { useHistory } from "react-router-dom";

const SignOut: FC = () => {
  const { room, setRoom } = useChatroom();
  const history = useHistory();

  const signOutHandler = () => {
    auth.signOut();
  };

  const quitRoomHandler = () => {
    if (setRoom) {
      setRoom(null);
      history.push("/");
    }
  };

  const [user] = useAuthState(auth);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {room && (
        <button className="signout-button" onClick={quitRoomHandler}>
          Quit Room
        </button>
      )}
      {auth.currentUser && (
        <button className="signout-button" onClick={signOutHandler}>
          <SignOutIcon /> Sign Out
        </button>
      )}
    </div>
  );
};

export default SignOut;
