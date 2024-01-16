import React, { useRef, useState } from "react";
import { validateForm } from "../utils/checkAuthValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Account = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  const authUser = () => {
    const username =
      !isLoginForm && usernameRef !== null ? usernameRef.current.value : null;
    let message = validateForm(
      emailRef.current.value,
      passwordRef.current.value,
      isLoginForm,
      username
    );
    setErrMsg(message);
    if (message) return;
    if (isLoginForm) {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          navigate("/chat");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorCode + "-" + errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: usernameRef.current.value,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/chat");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorCode + "-" + errorMessage);
        });
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
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isLoginForm
            ? "New to Talk? Register Now"
            : "Already registered? Login Now."}
        </p>
      </form>
    </div>
  );
};

export default Account;
