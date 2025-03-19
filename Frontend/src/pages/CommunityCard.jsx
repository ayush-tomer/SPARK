import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CommunityCard({ event }) {
  const images =
    event.images && event.images.length > 0 ? event.images : [event.image]; // Ensure it's always an array
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Auto-slide images every 3 seconds if multiple images exist
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  // Manual navigation handlers
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      {/* Card Component */}
      <motion.div
        className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        whileHover={{ y: -5 }}
      >
        {/* Image Section */}
        <div className="relative w-full h-56 overflow-hidden">
          <img
            src={images[currentImage]}
            alt={event.title}
            className="w-full h-full object-cover rounded-t-xl transition-opacity duration-500"
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
          <h2 className="md:text-2xl text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {event.title}
          </h2>
          <p className="md:text-xl text-sm text-gray-600 dark:text-gray-300 mb-4">
            {event.description.slice(0, 80)}...
          </p>

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
            {/* Close Button */}
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span className="sr-only">Close</span>
            </button>

            {/* Event Title & Description */}
            <div>
              <h2 className="text-2xl font-semibold">{event.title}</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
                {event.description}
              </p>
            </div>

            {/* Image Gallery in Dialog */}
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

              {/* Indicators */}
              <div className="flex justify-center space-x-2 mt-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentImage ? "bg-white w-3" : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Additional Event Details */}
            <div className="grid gap-4 py-4">
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {event.location}
                  </span>
                </div>
              )}

              {event.participants && (
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {event.participants} participants
                  </span>
                </div>
              )}
            </div>

            {/* External Links */}
            <div className="flex gap-2 mt-4">
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Event
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
