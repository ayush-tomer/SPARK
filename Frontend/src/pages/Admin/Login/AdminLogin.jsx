/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from "../../../utilis/baseUrl.js";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/Admin/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const auth = response.data;
      if (auth.accessToken) {
        localStorage.setItem("token", auth.accessToken);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Token has been expired");
          navigate("/");
        }, 3600 * 1000);
      }
      Swal.fire({
        title: "Admin Login SuccessFull",
        text: "Admin Token generated!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Welcome",
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setMessage("Please Provide a valid email and Password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center font-Montesarrat">
      <div className="w-full max-w-sm mx-auto bg-purple-700/85 shadow-xl rounded px-8 pt-6 pb-8 mb-4 border">
        <h2 className="text-4xl text-center mt-2 py-4 font-semibold mb-8">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <label
              className="block text-black text-md font-bold mb-2 "
              htmlFor="userName"
            >
              userName :
            </label>
            <input
              type="text"
              placeholder="userName"
              name="userName"
              id="userName"
              className="shadow appearance-none bg-neutral-100 rounded w-full py-2 px-3 leading-tight text-purple-900 focus:outline-none focus:shadow border"
              {...register("userName", { required: true })}
            />
          </div>
          <div className="mb-8">
            <label
              className="block text-black text-md font-bold mb-2 "
              htmlFor="password"
            >
              Password :
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="shadow appearance-none bg-neutral-100 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow border text-purple-900 "
              {...register("Password", { required: true })}
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-primary px-5 py-2 w-full text-xl rounded-md font-semibold border md:mt-2 sm:mt-3 hover:bg-blue-600 hover:text-white delay-150  ease-in-out">
              Login
            </button>

            {message && <p className="text-red-500 text-sm">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
