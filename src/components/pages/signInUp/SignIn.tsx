import React, { useRef } from "react";
import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { validEmail, validPassword, validUserName } from "../../../utils/regex";
import axios from "../../../api/axios";

type Props = {};

const SignIn = (props: Props) => {
  const uName = useRef<HTMLInputElement>(null);
  const passwrd = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<{
    uName: boolean;
    passwrd: boolean;
  }>({
    uName: false,
    passwrd: false,
  });
  const [showPasswrd, setShowPasswrd] = useState<boolean>(false);

  const showPasswrdHandler = () => {
    setShowPasswrd(!showPasswrd);
  };
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleCheckSubmit()) {
      axios.get(`users?username=${uName.current!.value}`).then((res: any) => {
        if (!res.data.length) {
          console.log("invalid information :D (no username like this)");
        } else if (res.data[0].password !== passwrd.current!.value) {
          console.log("invalid information :D (wrong password)");
        } else {
          // log in
          console.log("Success!");
          sessionStorage.setItem("username", uName.current!.value);

          navigate("/");
        }
      });
      console.log("pass");
    } else {
      alert("error");
    }
    // email, passwrd bla bla bla
  };

  const handleCheckSubmit = (): boolean => {
    // check username by regex
    error.uName = !validUserName.test(uName.current!.value);
    // check password by regex
    error.passwrd = !validPassword.test(passwrd.current!.value);

    setError({ ...error });

    console.log("=======");
    console.log("email:", error.uName);
    console.log("pass:", error.passwrd);

    return !(error.uName || error.passwrd);
  };

  return (
    <div className="sign-in-up">
      <h2 className="page-title">Sign in</h2>

      <form action="" onSubmit={handleSubmit}>
        <div className={error.uName ? "error input" : "input"}>
          <input
            autoComplete="off"
            ref={uName}
            id="uName"
            type="text"
            placeholder="Usernme"
          />
        </div>
        <div className={error.passwrd ? "error input" : "input"}>
          <input
            autoComplete="off"
            ref={passwrd}
            id="passwrd"
            type={showPasswrd ? "text" : "password"}
            placeholder="Password"
          />
          <div className="show-passwrd" onClick={showPasswrdHandler}>
            {showPasswrd ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <div className="btns">
          <button className="btn" type="submit">
            Sign in
          </button>
          <Link to="/sign-up">Create account </Link>
        </div>
        <p className="error">
          {(error.uName || error.passwrd) && <>Please insert valid values.</>}
        </p>
      </form>
    </div>
  );
};

export default SignIn;
