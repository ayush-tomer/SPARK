import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import logo from "../../assets/logo.jpg"; // Import your logo
// import Loader from "./Loader";
import { useState,useEffect } from "react";

const HeroSection = () => {
  // const navigate = useNavigate();

  const handleLogoClick = () => {
    // Navigate to the ChatGPT page
    navigate("/chatgpt");
  };

  return (
    <div className="flex flex-col items-center mt-3 lg:mt-5 relative">
      <span className="text-4xl sm:text-5xl lg:text-8xl text-center tracking-wide mb-3 font-serif bg-gradient-to-r from-indigo-600 to-violet-400 text-transparent bg-clip-text ">
        SPARK
      </span>
      <h2 className="text-4xl sm:text-4xl lg:text-6xl text-center bg-gradien tracking-wide p-4 ">
        Let's Collaborate, Connect & Grow
        <span className="bg-gradient-to-r from-orange-600 to-violet-700 text-transparent bg-clip-text">
          {" "}
          for Students & Professionalists
        </span>
      </h2>
      <p className="mt-10 text-4xl text-center text-neutral-500 max-w-4xl">
        Empower your creativity and bring your ideas to one of the most trusted
        platform
      </p>
    </div>
  );
};

export default HeroSection;
