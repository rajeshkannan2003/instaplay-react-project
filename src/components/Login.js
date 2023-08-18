import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const [isLoadBtn, setIsLoadBtn] = useState(false);

  useEffect(() => {
    localStorage.clear();
    navigate("/");
  }, []);

  

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      if (!password) {
        setError({
          ...error,
          password: "Password is empty !",
          username: "username is empty !",
        });
      }
    } else {
      setError("");
      try {
        setIsLoadBtn(true);
        getTheToken(); 
      } catch (e) {
        alert("Login Failed ! ${e.message}");
      }
    }
  };
  setTimeout(() => {
    setIsLoadBtn(false);
  }, 10000);

  const getTheToken = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=4d265caa44130503291c287bbc69b125"
    );
    const gettoken = response.data.request_token;
    saveFormData(gettoken);
  };

  const saveFormData = (gettoken) => {
    axios
      .post(
        "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=8ec065dc5c7fd191cd99ead2b741b51f",
        {
          username: username,
          password: password,
          request_token: gettoken,
        }
      )
      .then((res) => {
        localStorage.setItem("newtoken", gettoken);
        localStorage.setItem("username", username);
        successMsg();
        getTimeout();
      })
      .catch((err) => {
        logMsg();
      });
  };
  const getTimeout = () => {
    setTimeout(() => {
      setTimeout(navigate("/home"));
    }, 1000);
  };

  const successMsg = () => {
    toast.success("Login Successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const logMsg = () => {
    toast.error("Invalid Username & Password", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleUser = (e) => {
    setError({ ...error, username: "" });
    setUsername(e.target.value);
  };
  const handlePass = (e) => {
    setError({ ...error, password: "" });
    setPassword(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="box">
        <h3 className="sign"> Sign in </h3>
        <p className="signp">Sign in to your Self Service Portal </p>
        <form onSubmit={onFormSubmit}>
          <div className="label-float">
            <input
              type="text"
              placeholder=" "
              value={username}
              onChange={(e) => handleUser(e)}
            />
            <label>Username</label>
            {error.username !== "" && (
              <p className="message">{error.username}</p>
            )}
          </div>
          <div className="label-float">
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => handlePass(e)}
            />
            <label>Password</label>
            {error.password !== "" && (
              <p className="message">{error.password}</p>
            )}
          </div>
          <div>
            <button className="loginbtn"n>
              {isLoadBtn ? <i class="fa fa-circle-o-notch fa-spin"></i> : ""}LOG
              IN
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
