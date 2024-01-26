import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import getToken from "../utils/getToken";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store);
  useEffect(() => {
    const authtoken = getToken();
    if (authtoken) {
      if (user?.uid) {
      } else {
        getUser(authtoken);
      }
      navigate("/chat");
    } else {
      navigate("/");
    }
  }, []);
  const getUser = async (authtoken) => {
    let getUserResult = await fetch("http://localhost:5000/api/user/get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authtoken,
      }),
    });
    getUserResult = await getUserResult.json();
    const { uid, email, username } = getUserResult;
    dispatch(addUser({ uid, email, username }));
  };
  return (
    <>
      <Outlet />
    </>
  );
};

export default Body;
