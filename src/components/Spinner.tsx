import { FC } from "react";
import "./spinner.css";

const Spinner: FC = () => {
  return (
    <div className="chatroom-buttons">
      <div className="loader">Loading...</div>
    </div>
  );
};

export default Spinner;
