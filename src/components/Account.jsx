import React, { useRef, useState } from "react";
import { validateForm } from "../utils/checkAuthValidation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Cookies from "js-cookie";

const Account = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addUserToServer = async (email, username, password) => {
    let addUserResult = await fetch("http://localhost:5000/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });
    addUserResult = await addUserResult.json();
    return addUserResult;
  };
  const checkLogin = async (email, password) => {
    let checkLogin = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password,
      }),
    });
    checkLogin = await checkLogin.json();
    return checkLogin;
  };

  const authUser = async () => {
    let username =
      !isLoginForm && usernameRef !== null ? usernameRef.current.value : null;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let message = validateForm(email, password, isLoginForm, username);
    setErrMsg(message);
    if (message) return;
    let res = null;
    if (isLoginForm) {
      res = await checkLogin(email, password);
    } else {
      res = await addUserToServer(email, username, password);
    }
    if (res.status) {
      const uid = res.id;
      if (res.username) {
        username = res.username;
      }
      dispatch(addUser({ email, username, password, uid }));
      Cookies.set("authtoken", res.authtoken, { expires: 1 });
      navigate("/chat");
    } else {
      alert(res.message);
    }
  };
  return (
    <div className="text-center align-middle p-8 md:w-3/12 sm:w-3/4 md:mx-auto md:my-36 sm:my-8">
      <h1 className="text-4xl font-bold m-2">
        {isLoginForm ? "Login" : "Register"}
      </h1>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {!isLoginForm && (
          <input
            ref={usernameRef}
            type="username"
            placeholder="username"
            className="w-full h-12 rounded-md p-2 m-4 bg-slate-200 text-black border-none outline-none"
          ></input>
        )}
        <input
          ref={emailRef}
          type="email"
          placeholder="email address"
          className="w-full h-12 rounded-md p-2 m-4 bg-slate-200 text-black border-none outline-none"
        ></input>
        <input
          ref={passwordRef}
          type="password"
          placeholder="password"
          className="w-full h-12 rounded-md p-2 m-4 bg-slate-200 text-black border-none outline-none"
        ></input>
        <button
          type="submit"
          className="w-full h-12 rounded-md p-2 m-4 text-white text-2xl bg-blue-600"
          onClick={authUser}
        >
          {isLoginForm ? "Login" : "Register"}
        </button>
        <p className="text-red-600">{errMsg}</p>
        <p
          className="py-4 cursor-pointer"
          onClick={(_) => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm
            ? "New to Talk? Register Now"
            : "Already registered? Login Now."}
        </p>
      </form>
    </div>
  );
};

export default Account;
