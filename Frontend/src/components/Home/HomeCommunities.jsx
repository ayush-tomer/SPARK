"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CommunitiesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full p-10 text-white overflow-hidden">
      <div className="mb-8">
        <p className="text-gray-400  px-5 text-left text-lg">
          hackathons, seminars...
        </p>
        <h2 className="md:text-9xl text-6xl text-center md:text-left bg-gradient-to-r from-orange-600 to-violet-700 text-transparent bg-clip-text font-semibold font-bebas-neue px-5 mb-10 animate-fade-in">
          COMMUNITIES
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Informative Paragraph */}
          <div className="flex flex-col justify-center items-center text-center px-6">
            <p className="text-lg md:text-2xl leading-relaxed max-w-lg">
              Communities play a vital role in shaping{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-400 text-transparent bg-clip-text">
                learning
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-400 text-transparent bg-clip-text">
                growth
              </span>
              . They provide a platform to connect with like-minded individuals,
              exchange{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-400 text-transparent bg-clip-text">
                knowledge
              </span>
              , and gain exposure to real-world experiences. Being part of a
              strong community enhances{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-400 text-transparent bg-clip-text">
                skills
              </span>{" "}
              and broadens perspectives, helping individuals to advance in their
              careers and personal development.
            </p>
          </div>

          {/* Right side - Community cards with staggered layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* First column - slightly higher */}
            <div className="flex flex-col gap-4">
              {/* Eyantra card */}
              <motion.div
                className="bg-[radial-gradient(circle,_#763249_30%,_black_100%)] backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center h-48"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-xs">
                    <div className="text-center">
                      <div className="font-bold">eyantra</div>
                      <div className="text-[8px]">IIT</div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm mt-2">Robotics society</p>
                <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded-full text-sm transition-colors">
                  Join community
                </button>
              </motion.div>

              {/* Third card */}
              <motion.div
                className="bg-[radial-gradient(circle,_#763249_30%,_black_100%)] backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center h-48"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mb-2">
                  <div className="w-16 h-16 rounded-full bg-green-700 flex items-center justify-center text-white">
                    <span className="text-xl">G</span>
                  </div>
                </div>
                <p className="text-center text-sm mt-2">GDG</p>
                <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded-full text-sm transition-colors">
                  Join community
                </button>
              </motion.div>
            </div>

            {/* Second column - slightly lower */}
            <div className="flex flex-col gap-4 mt-8">
              {/* Microsoft card */}
              <motion.div
                className="bg-[radial-gradient(circle,_#763249_30%,_black_100%)] backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center h-48"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-20 h-20 flex items-center justify-center mb-2">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <img
                      src="/home/gdg.webp"
                      className="text-xl rounded-full"
                    />
                  </div>
                </div>
                <p className="text-center text-sm mt-2">STUDENT CHAPTER</p>
                <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded-full text-sm transition-colors">
                  Join community
                </button>
              </motion.div>

              {/* Fourth card */}
              <motion.div
                className="bg-[radial-gradient(circle,_#763249_30%,_black_100%)] backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center h-48"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center mb-2">
                  <div className="w-16 h-16 rounded-full bg-yellow-600 flex items-center justify-center text-white">
                    <span className="text-xl">I</span>
                  </div>
                </div>
                <p className="text-center text-sm mt-2">IEEE</p>
                <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded-full text-sm transition-colors">
                  Join community
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunitiesPage;
