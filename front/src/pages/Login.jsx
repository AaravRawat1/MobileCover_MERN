import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {backend_URL} from "../components/config"
axios.defaults.withCredentials = true;

const Login = ({ setIsAuthenticated, setUserName, setIsSeller }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const userLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        backend_URL + "/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.msg === "Logedin") {
        setIsAuthenticated(true);
        setUserName(response.data.username);
        toast.success(response.data.msg);
        setIsSeller(response.data.isSeller);
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error(response.data);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center  flex-col gap-2 h-screen ">
      <span className="text-3xl tracking-tighter">
        welcome to <span className="text-[#3576DF] font-bold tracking-normal">Verzatile</span>
      </span>
      <span className="text-xl tracking-tighter">Enter Account Details</span>
      <form
        onSubmit={userLoginSubmit}
        className="flex items-center flex-col justify-between gap-3"
      >
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-[300px] px-2 py-1 rounded-md outline-none text-black"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-[300px] px-2 py-1 rounded-md outline-none text-black"
        />
      
          <input
            type="submit"
            value="Login"
            className="bg-[#3576DF] px-2 py-1 rounded-xl outline-none"
          />
      
      </form>
      <div className="mb-48">
        Don't have account?{" "}
        <Link className="text-[#3576DF]" to="/signup">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Login;