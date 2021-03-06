import React, { useRef, useState } from "react";
import { Input, Button, Checkbox, message } from "antd";
import { RiLockPasswordLine } from "react-icons/ri";
import EduLogo from "../../assets/img/pair_programming.svg";
import { AiOutlineMail, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { User } from "../../utils/apiLists";
import "./LoginP.css";

const LoginP = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    setLoading(true);
    const email = emailRef.current.input.value;
    const password = passRef.current.input.value;

    const url = `https://tec-server-api.herokuapp.com/api/v1/${User.login}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await res.json();

    if (!result.e) {
      localStorage.setItem("jwt", JSON.stringify(result.token));
      setLoading(false);
      message
        .success(`Login successful`, 1.5)
        .then(() => message.success("Redirecting", 1.5));

      setTimeout(() => {
        window.location = `/adminDashboard/${result.user._id}`;
      }, 3000);
    } else {
      setLoading(false);
      message.error(`Login Failed, incorrect email or password`, 1.5);
    }
  };
  return (
    <div className="login__page" data-aos="flip-left" data-aos-duration="500">
      <div className="login__page__form">
        <div className="login__page__left">
          <h2>Login</h2>
          <p>Earn money being a tutor</p>
          {/* <Button 
                 style={{
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    borderRadius: 20,
                 }}
                > <FcGoogle /><span className='google' > Sign In with Google</span></Button>
                <Divider plain>or Sign in with Email</Divider> */}
          <form className="login__page__form__group">
            <div className="login__page__email">
              <label className="label">Email*</label>
              <Input
                placeholder="Enter Email"
                prefix={<AiOutlineMail />}
                ref={emailRef}
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className="login__page__password">
              <label className="label">Password*</label>

              <Input.Password
                placeholder="Enter password"
                prefix={<RiLockPasswordLine />}
                iconRender={(visible) =>
                  visible ? <AiFillEye /> : <AiFillEyeInvisible />
                }
                ref={passRef}
                autoComplete="false"
              />
            </div>
            <div className="login__page__checkbox">
              <div>
                <Checkbox>
                  <span>Remember me</span>
                </Checkbox>
              </div>
              <div>
                <span>
                  <Link to="/forgot">Forget password?</Link>
                </span>
              </div>
            </div>
            <div className="login__page__submit">
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  borderRadius: 20,
                }}
                onClick={handleClick}
              >
                Submit
              </Button>
            </div>
            <p>
              <span style={{ fontWeight: 700 }}>Not registered yet?</span>{" "}
              <span>
                <Link to="/register">Create an account</Link>
              </span>
            </p>
          </form>
        </div>
        <div className="login__page__right">
          <img src={EduLogo} />
        </div>
      </div>
    </div>
  );
};

export default LoginP;
