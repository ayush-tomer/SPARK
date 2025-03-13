import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, signIn, checkUsernameExists } from "../auth";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (loading) return;

    setErrorMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { success, exists, error } = await checkUsernameExists(username);
        if (!success) {
          setErrorMessage(error || "Error checking username");
          setLoading(false);
          return;
        }
        if (exists) {
          setErrorMessage("Username not available");
          setLoading(false);
          return;
        }

        let response = await signUp(email, password, fullName, username);
        if (response.success) {
          console.log("✅ Signed Up User:", response.user);
          navigate("/");
        } else {
          setErrorMessage(response.error || "An error occurred");
        }
      } else {
        let response = await signIn(email, password);
        if (response.success) {
          console.log("✅ Signed In User:", response.user);
          navigate("/");
        } else {
          setErrorMessage(response.error || "An error occurred");
        }
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"
    >
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        {errorMessage && (
          <div className="bg-red-700 text-white p-3 rounded-md mb-4">
            {errorMessage}
          </div>
        )}
        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-4 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 text-lg"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 text-lg"
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 text-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-6 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 text-lg"
        />
        <button
          onClick={handleAuth}
          className={`w-full p-4 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:from-purple-600 hover:to-blue-600 transition-colors duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-400">
            {isSignUp ? "Already have an account?" : "New here?"}
          </span>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gray-200 font-semibold cursor-pointer hover:underline ml-1"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
