import React from "react";
import { Link } from "react-router-dom";
import img1 from "/events/hackvsit.webp";
import img2 from "/events/hackvsit.webp";
import img3 from "/events/hackvsit.webp";
import img4 from "/events/hackvsit.webp";
import img5 from "/events/hackvsit.webp";
import img6 from "/events/hackvsit.webp";
import img7 from "/events/hackvsit.webp";
import img8 from "/events/hackvsit.webp";
import img9 from "/events/hackvsit.webp";

const AboutUs = () => {
  return (
    <>
      <h1 className="md:text-9xl text-5xl text-center md:mr-10 bg-gradient-to-r from-orange-600 to-violet-700 text-transparent bg-clip-text font-semibold font-bebas-neue px-5 pt-20 mb-10 animate-fade-in">
        HERE COMES
      </h1>
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-xl sm:text-2xl md:text-3xl font-semibold w-[90%] sm:w-[70%] md:w-[40%] mx-auto rounded-full py-2 text-center">
        Features
      </div>

      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mx-auto mt-16 w-[85vw] h-[60vh]">
        <div className="grid grid-cols-5 grid-rows-7 md:w-[45%] h-full gap-3">
          <div className="bg-slate-400 col-span-3 row-span-3 rounded-2xl overflow-hidden hover:cursor-pointer">
            <img
              src={img1}
              alt="Logo"
              className="w-full h-full object-cover rounded-2xl hover:scale-[1.15] transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="bg-slate-900 col-span-2 row-span-3 rounded-2xl overflow-hidden hover:cursor-pointer">
            <img
              src={img2}
              alt="Logo"
              className="w-full h-full object-cover rounded-2xl hover:scale-[1.15] transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="bg-slate-400 col-span-2 row-span-4 rounded-2xl overflow-hidden hover:cursor-pointer">
            <img
              src={img3}
              alt="Logo"
              className="w-full h-full object-cover rounded-2xl hover:scale-[1.15] transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="bg-slate-400 col-span-3 row-span-4 rounded-2xl overflow-hidden hover:cursor-pointer">
            <img
              src={img4}
              alt="Logo"
              className="w-full h-full object-cover rounded-2xl hover:scale-[1.15] transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>

        <div className="grid grid-cols-9 grid-rows-5 md:w-[55%] h-full gap-3">
          <div className="bg-slate-400 col-span-3 row-span-3 rounded-2xl overflow-hidden hover:cursor-pointer">
            <img
              src={img5}
              alt="Logo"
              className="w-full h-full object-cover rounded-2xl hover:scale-[1.15] transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="bg-slate-400 col-span-6 row-span-3 rounded-2xl overflow-hidden hover:cursor-pointer">
            <img
              src={img6}
              alt="Logo"
              className="w-full h-full object-cover rounded-2xl hover:scale-[1.15] transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="bg-slate-400 col-span-2 row-span-2 rounded-2xl overflow-hidden hover:cursor-pointer">
            <img
              src={img7}
              alt="Logo"
              className="w-full h-full object-cover rounded-2xl hover:scale-[1.15] transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="bg-slate-400 col-span-5 row-span-2 rounded-2xl overflow-hidden hover:cursor-pointer">
            <img
              src={img8}
              alt="Logo"
              className="w-full h-full object-cover rounded-2xl hover:scale-[1.15] transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="bg-slate-900 col-span-2 row-span-2 rounded-2xl overflow-hidden hover:cursor-pointer">
            <img
              src={img9}
              alt="Logo"
              className="w-full h-full object-cover rounded-2xl hover:scale-[1.15] transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
