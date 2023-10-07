import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Eye } from "react-bootstrap-icons";
import InputGroup from "react-bootstrap/InputGroup";
import React, { CSSProperties, ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import { Container } from "react-bootstrap";
import { generateUsers } from "../data/users";

function LoginForm(props: {
  setInit: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (arg: boolean) => void;
  setVideoComplete: (arg: boolean) => void;
  init?: string | null;
  videoComplete: boolean;
}) {
  const [type, setType] = useState("password");
  const [userPassword, setUserPassword] = useState("visitor");
  const [userEmail, setUserEmail] = useState("visitor");
  const [errors, setErrors] = useState({ emailErr: false, passErr: false });
  const [loading, setLoading] = useState(false);
  const [loginCheckbox, setLoginCheckbox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const loginFormEl = document.querySelector("#login-form") as HTMLDivElement;
    const videoEl = document?.getElementById("video") as HTMLVideoElement;
    const navbarEl = document.querySelector("#layout-basic-navbar");
    document.onkeydown = function (evt: { key: string; keyCode: number }) {
      {
        evt = evt || window;
        let isEscape = false;
        if ("key" in evt) {
          isEscape = evt.key === "Escape" || evt.key === "Esc";
        } else {
          isEscape = evt["keycode"] === 27;
        }
        if (isEscape) {
          // loginFormEl.classList.add("invis")
          videoEl?.classList.add("begin");
          localStorage.setItem("hasExited", "true");

          setTimeout(() => {
            videoEl?.classList.add("invis");

            setTimeout(() => {
              (videoEl as HTMLVideoElement).pause();
              navbarEl?.classList.add("invis");
              props.setVideoComplete(true);
              loginFormEl?.classList.remove("invis");
              loginFormEl?.classList.add("vis");
              loginFormEl?.classList.add("fadein");
              props.setInit();
            }, 250);
          }, 5100);
        }
      }
    };
  }, []);

  const handleChangePasswordType = () => {
    setType(type === "password" ? "text" : "password");
  };

  const handleLogin = async (e: FormEvent, email: string, pass: string) => {
    setErrors({ passErr: false, emailErr: false });
    e.preventDefault();
    const navbarEl = document.querySelector("#layout-basic-navbar");
    const includesEmail = generateUsers()
      .map((u: { email: string; pass: string }) => u.email)
      .includes(email);
    const includesPass = generateUsers()
      .map((u: { email: string; pass: string }) => u.pass)
      .includes(pass);
    const bothIncorrect = !includesEmail && !includesPass;
    generateUsers().forEach(() => {
      if (includesEmail && includesPass === false) {
        setErrors({ emailErr: false, passErr: true });
      } else if (includesPass && includesEmail === false) {
        setErrors({ passErr: false, emailErr: true });
      } else if (bothIncorrect) {
        setErrors({ emailErr: true, passErr: true });
      } else {
        setLoading(true);
        setTimeout(() => {
          setErrors({ emailErr: false, passErr: false });
          props.setIsLoggedIn(true);
          localStorage.setItem("loggedin", "true");
          localStorage.setItem("init", "true");
          if (loginCheckbox) {
            localStorage.setItem("stayLoggedIn", "true");
            localStorage.setItem("email", email);
          } else {
            localStorage.removeItem("email");
            localStorage.removeItem("stayLoggedIn");
          }
          navbarEl?.classList.remove("invis");
          navbarEl?.classList.add("vis");
          navbarEl?.classList.add("fadein");
          setLoading(false);
          navigate("/houses");
        }, 2150);
      }
    });
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
    localStorage.setItem("email", e.target.value);
  };

  // const handleLoginCheckboxChange = () => {
  //   setLoginCheckbox(!loginCheckbox);
  // };

  useEffect(() => {
    if (localStorage.getItem('loggedin') === 'false' && localStorage.getItem('init') === 'false') {
      (document.querySelector("#login-form") as HTMLDivElement)?.classList.remove('vis');
      (document.querySelector("#login-form") as HTMLDivElement)?.classList.add('invis');
    }

  }, [])
  useEffect(() => {
    const loginFormEl = document.querySelector("#login-form") as HTMLDivElement;
    const navbarEl = document.querySelector("#layout-basic-navbar");
    const videoEl = document?.getElementById("video") as HTMLVideoElement;

    document.querySelector("#layout-basic-navbar")?.classList.add("invis")
    videoEl?.classList.add("vis");
    if (
      localStorage.getItem("init") === "false" &&
      localStorage.getItem("hasExited") === "false"
    ) {
      if (!localStorage.getItem("email")) localStorage.setItem("email", "");
      if (localStorage.getItem("hasExited") === "true") return;
      navbarEl?.classList.add("invis");
      document.querySelector("#layout-basic-navbar")?.classList.add("invis");

      setTimeout(() => {
        if (localStorage.getItem("hasExited") === "true") return;
        videoEl?.classList.remove("begin");
        videoEl?.classList.add("begin");
        navbarEl?.classList.add("invis");
      }, 23_000);

      setTimeout(() => {
        if (localStorage.getItem("hasExited") === "true") return;
        videoEl?.classList.add("invis");
        props.setVideoComplete(true);
        loginFormEl?.classList.remove("invis");
        loginFormEl?.classList.add("vis");
        loginFormEl?.classList.add("fadein");
        props.setInit();
      }, 28_000);
    }
  }, []);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "rgb(105, 23, 101)",
  };

  return (
    <Container id="login-container">
      {loading ? (
        <div
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={localStorage.getItem("loggedin") === "true" ? "mt-5" : ""}
        >
          <CircleLoader
            color={"rgb(105, 23, 101)"}
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <Form
          role="login"
          className="login-form layout-basic-form layout-basic-margin"
          id="login-form"
        >
          <h4>Login</h4>
          <Form.Group className="mb-1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              data-testid="login-input"
              autoComplete="true"
              value={userEmail}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleEmailInputChange(e)
              }
              id="login-email"
              className="layout-basic-input"
              type="email"
              placeholder="Email"
            />
          </Form.Group>

          {errors.emailErr ? (
            <div>
              <Form.Text
                data-testid="email-err"
                className="text"
                style={{ color: "red" }}
              >
                Invalid Email
              </Form.Text>
            </div>
          ) : null}

          <Form.Label>Password</Form.Label>
          <Form.Group className="mb-1 d-flex">
            <Form.Control
              data-testid="login-input"
              autoComplete="true"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              id="login-password"
              type={type}
              placeholder="Password"
            >
              {/* <Eye /> */}
            </Form.Control>
            <InputGroup.Text
              onClick={handleChangePasswordType}
              id="show-password"
            >
              <Eye onClick={handleChangePasswordType} />
            </InputGroup.Text>
          </Form.Group>

          {errors.passErr ? (
            <div>
              <Form.Text
                data-testid="pass-err"
                className="text"
                style={{ color: "red" }}
              >
                Invalid Password
              </Form.Text>
            </div>
          ) : null}

          <Form.Group className="ml-4 mt-3 mb-3">
            {/*  <Form.Check
              className="basic-check"
              type="checkbox"
              label="Remember me"
              checked={loginCheckbox}
              onChange={() => handleLoginCheckboxChange()}
            />*/}
            <Button
              data-testid="login-btn"
              disabled={userEmail.length === 0 || userPassword.length === 0}
              id="login-btn"
              onClick={(e: FormEvent) => handleLogin(e, userEmail, userPassword)}
              variant="secondary"
              type="submit"
              size="sm"
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      )}
    </Container>
  );
}

export default LoginForm;
