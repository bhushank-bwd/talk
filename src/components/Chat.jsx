import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/fireBase";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="flex justify-between">
      <span>Logo</span>
      <button
        className="p-2 text-xl cursor-pointer bg-red-600 text-white m-2 rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Chat;
