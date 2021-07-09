import { FC } from "react";
import firebase, { auth } from "../utils/firebase";

const SignIn: FC = () => {
  const signInHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="chatroom-buttons">
      <button className="signin-button" onClick={signInHandler}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
