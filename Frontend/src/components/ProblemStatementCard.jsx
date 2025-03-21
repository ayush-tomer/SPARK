/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import React from "react";

export default function ProblemStatementCard({ internship }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    communication: "",
    joinReason: "",
    experience: "",
  });

  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const images = internship.images || [internship.image];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application submitted successfully!");
    setShowApplyDialog(false);
  };

  return (
    <>
      {/* Internship Card */}
      <motion.div
        ref={cardRef}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Image Section */}
        <div className="relative w-full h-56 overflow-hidden">
          <motion.img
            key={currentImage}
            src={images[currentImage] || "/placeholder.svg"}
            alt={internship.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-2 rounded-full"
              >
                <ChevronLeft className="text-white h-5 w-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-2 rounded-full"
              >
                <ChevronRight className="text-white h-5 w-5" />
              </button>

              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentImage ? "bg-white w-3" : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {internship.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {internship.description}
          </p>

          {/* Additional Info */}
          <div className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
            {internship.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                <span>{internship.location}</span>
              </div>
            )}
            {internship.duration && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                <span>{internship.duration}</span>
              </div>
            )}
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 mt-4 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
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
                  Requirements:
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {internship.requirements?.map((req, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {req}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => setShowApplyDialog(true)}
                  className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Apply Dialog */}
      <AnimatePresence>
        {showApplyDialog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowApplyDialog(false)}
          >
            <motion.div
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                onClick={() => setShowApplyDialog(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Apply for {internship.title}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Communication and Speaking Skills
                  </label>
                  <textarea
                    name="communication"
                    value={formData.communication}
                    onChange={handleChange}
                    placeholder="Describe your communication skills and how you speak to leads with confidence to show the impact your agency can bring."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Why do you want to join this team?
                  </label>
                  <textarea
                    name="joinReason"
                    value={formData.joinReason}
                    onChange={handleChange}
                    placeholder="Tell us why you're interested in joining our team."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    What is your previous experience/proof of skill for this
                    role?
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Share your relevant experience and skills for this role."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows={3}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Submit Application
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
