/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { SiGithub } from "react-icons/si";

//Main Project
export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Project Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.Name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h2 className="text-xl font-bold text-white">{project.Name}</h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Author and Date */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <span className="text-md text-gray-700 dark:text-gray-300">
              {project.author}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-gray-800 dark:text-white mb-2">
            Tech Stack:
          </h3>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {" "}
            {/* Increased gap for better spacing */}
            <span className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900">
              {project.techStack}
            </span>
            <span className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
              {project.category}
            </span>
          </div>

          {/* GitHub Link */}
          {project.GitHub && (
            <div className="mt-3 sm:mt-4 flex">
              <motion.a
                href={project.GitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SiGithub className="w-8 h-8 sm:w-10 sm:h-10 text-purple-100" />
                <span className="md:ml-1 md:text-lg text-md text-purple-400">
                  Github
                </span>
              </motion.a>
            </div>
          )}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
        >
          {isExpanded ? "Hide Details" : "Show Details"}
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                Problem Statement:
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {project.ProblemStatement}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
