/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from "../../../utilis/baseUrl.js";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

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
          alert("Token has expired");
          navigate("/");
        }, 3600 * 1000);
      }
      Swal.fire({
        title: "Admin Login Successful",
        text: "Admin Token generated!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Welcome",
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setMessage("Please provide a valid username and password");
    }
  };

  return (
    <div className="relative mt-32 md:mt-20 flex items-center justify-center w-full overflow-hidden text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-auto p-1"
      >
        <div className="relative backdrop-blur-xl bg-gray-900/40 border border-gray-800/50 rounded-2xl shadow-lg overflow-hidden p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="inline-block mb-4 p-3 rounded-full bg-indigo-600/20 backdrop-blur-md"
            >
              <Lock className="w-8 h-8 text-indigo-400" />
            </motion.div>
            <h2 className="text-3xl font-bold text-indigo-400">Admin Login</h2>
          </motion.div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
            >
              {message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              name="userName"
              id="userName"
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("userName", { required: true })}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("Password", { required: true })}
            />

            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
