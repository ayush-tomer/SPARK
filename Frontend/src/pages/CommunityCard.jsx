import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import axios from "axios";

export default function CommunityCard({ event }) {
  const images =
    event.images && event.images.length > 0 ? event.images : [event.image];
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [formData, setFormData] = useState({ name: "", email: "" });
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
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${formData.name} - ${formData.email}`);
  };
  return (
    <>
      {/* Card Component */}
      <motion.div
        className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Section */}
        <div className="relative w-full h-56 overflow-hidden">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt={event.title}
            className="w-full h-full object-cover rounded-t-xl transition-opacity duration-500"
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

        {/* Text Content */}
        <div className="p-6">
          <motion.h2
            className="md:text-2xl text-xl font-semibold text-gray-800 dark:text-white mb-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {event.title}
          </motion.h2>
          <motion.p
            className="md:text-xl text-sm text-gray-600 dark:text-gray-300 mb-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {event.description.slice(0, 80)}...
          </motion.p>

          {/* Additional Info */}
          <div className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
            {event.members && (
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>{event.members} members</span>
              </div>
            )}
            {event.activeSince && (
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>Active since {event.activeSince}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setIsOpen(true)}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              Read More
            </button>

            <motion.button
              className="px-4 py-2 rounded-md text-white font-medium text-sm"
              style={{
                background: "linear-gradient(to right, #a855f7, #ec4899)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(event.link, "_blank")}
            >
              Join Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/70"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-900/100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Carousel in Dialog */}
            <div className="mt-4 relative">
              <h4 className="text-sm font-medium mb-2">Event Images</h4>
              <div className="relative flex items-center justify-center">
                <button
                  onClick={prevImage}
                  className="absolute left-2 bg-gray-800/50 p-2 rounded-full z-10"
                >
                  <ChevronLeft className="text-white h-5 w-5" />
                </button>

                <img
                  src={images[currentImage]}
                  alt={`Event ${currentImage}`}
                  className="h-72 w-full rounded-md object-cover transition-opacity duration-500"
                />

                <button
                  onClick={nextImage}
                  className="absolute right-2 bg-gray-800/50 p-2 rounded-full z-10"
                >
                  <ChevronRight className="text-white h-5 w-5" />
                </button>
              </div>
            </div>
            {/* Tabs Navigation */}
            <div className="flex space-x-6 border-b pb-2">
              {["about", "statistics", "apply"].map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 font-medium ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            <div className="py-4">
              {activeTab === "about" && (
                <div>
                  <h2 className="text-2xl font-semibold">{event.title}</h2>
                  <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
                    {event.description}
                  </p>
                </div>
              )}

              {activeTab === "statistics" && (
                <div className="text-lg text-gray-500 dark:text-gray-400 space-y-3">
                  {event.members && (
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>{event.members} members</span>
                    </div>
                  )}
                  {event.activeSince && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>Active since {event.activeSince}</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "apply" && (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 flex flex-col justify-center itece"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-2/3 p-2 border-none rounded-md"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-2/3 p-2 border-none rounded-md"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 w-1/3 text-white rounded-md bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    Apply Now
                  </button>
                </form>
              )}
            </div>

            {/* Official Website Buttons */}
            <motion.button
              onClick={() => window.open(event.link, "_blank")}
              className=" w-1/3 py-2 text-white bg-blue-600/30 rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Official Website
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
}
