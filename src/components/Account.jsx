import React, { useRef, useState } from "react";
import { validateForm } from "../utils/checkAuthValidation";

const Account = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const toggleSignInForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  const authUser = () => {
    let message = validateForm(
      emailRef.current.value,
      passwordRef.current.value
    );
    setErrMsg(message);
    if (message) return;
  };
  return (
    <div className="text-center align-middle p-8 w-4/12 md:w-3/12 sm:w-3/4 md:mx-auto md:my-36 sm:my-8">
      <h1 className="text-4xl font-bold m-2">
        {isLoginForm ? "Login" : "Register"}
      </h1>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
            ? "New to Talk? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Account;
