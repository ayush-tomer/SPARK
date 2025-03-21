import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col mt-20 md:flex-row justify-between items-center h-auto md:h-[30vh] rounded-t-[2.5rem] bg-[#442292] text-white md:px-32 px-8 py-12">
      {/* Left Side: SPARK */}
      <div className="w-full md:w-[45%] flex items-center justify-center md:justify-start mb-6 md:mb-0">
        <h1 className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] 
                       font-extrabold leading-none tracking-tighter 
                       text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
          SPARK
        </h1>
      </div>

      {/* Right Side: Connect with Us */}
      <div className="w-full md:w-[50%] flex flex-col justify-center items-center md:items-end space-y-4 md:space-y-6">
        <div className="text-center md:text-right">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">
            Connect with Us
          </h2>
          <p className="text-lg lg:text-xl text-gray-300">
            <span className="text-red-400">sparknans777@gmail.com</span>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 md:space-x-6">
          {[
            { icon: <FaFacebookF />, color: 'yellow' },
            { icon: <FaTwitter />, color: 'blue' },
            { icon: <FaInstagram />, color: 'pink' },
            { icon: <FaLinkedin />, color: 'blue' },
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className={`text-${item.color}-400 hover:text-${item.color}-500 
                          transform transition-all duration-300 
                          hover:scale-110 hover:-translate-y-1 text-2xl md:text-3xl`}
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-4 text-xs md:text-sm text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} All Rights Reserved | Designed with ❤️
        </div>
      </div>
    </footer>
  );
};

export default Footer;
