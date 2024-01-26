import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserToFireStore } from "../utils/userFireStore";
import { addFireStoreUserDocId, removeUser } from "../utils/userSlice";
import Contacts from "./Contacts";
import { deleteToken } from "../utils/getToken";

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const logout = () => {
    deleteToken();
    dispatch(removeUser());
    navigate("/");
  };
  const addUserIfNot = async () => {
    const fireStoreUser = await addUserToFireStore(user);
    dispatch(addFireStoreUserDocId(fireStoreUser));
  };
  useEffect(() => {
    if (user) addUserIfNot();
  }, [user]);

  return (
    <>
      <div className="flex justify-between">
        <span className="p-2 text-2xl font-semibold m-2 rounded-md">
          Logo Here
        </span>
        <button
          className="p-2 text-xl cursor-pointer bg-red-600 text-white m-2 rounded-md"
          onClick={logout}
        >
          Logout {user?.username}
        </button>
      </div>
      <div className="flex w-full">
        <Contacts />
      </div>
    </>
  );
};

export default Chat;
