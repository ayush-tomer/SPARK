/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signUp, signIn, checkUsernameExists } from "../auth";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock, Mail, User, UserCircle } from "lucide-react";

export default function Login() {
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

        const response = await signUp(email, password, fullName, username);
        if (response.success) {
          console.log("✅ Signed Up User:", response.user);
          navigate("/");
        } else {
          setErrorMessage(response.error || "An error occurred");
        }
      } else {
        const response = await signIn(email, password);
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
            <h2 className="text-3xl font-bold text-indigo-400">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
          </motion.div>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
            >
              {errorMessage}
            </motion.div>
          )}

          <div className="space-y-5">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
            {isSignUp && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleAuth}
              disabled={loading}
              className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50"
            >
              {loading
                ? "Processing.."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </button>
            <p
              className="text-center text-gray-400 cursor-pointer mt-4"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
