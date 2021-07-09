import { FC } from "react";
import { useChatroom } from "../context/context";
import SignOut from "./SignOut";

const Header: FC = () => {
  const { room } = useChatroom();

  return (
    <div className="header">
      <h1>💬 {room && room.name}</h1>
      <SignOut />
    </div>
  );
};

export default Header;
