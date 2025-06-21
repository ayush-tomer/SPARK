import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RollingGallery from "../components/RollingGallery";
import AddEventModal from "../components/CreateEvents";
import {
  ArrowUpRight,
  Calendar,
  MapPin,
  Monitor,
  ExternalLink,
  Linkedin,
  Instagram,
  Github,
  Twitter,
} from "lucide-react";

const EventDialog = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Schedule", "Prices", "Sponsors", "FAQ"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center p-4 z-50">
      <motion.div
        className="bg-gray-900 text-white w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        {/* Event Banner Image */}
        <img src={event.banner} alt={event.title} className="w-full h-56 object-cover" />

        {/* Dialog Content */}
        <div className="p-4 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
          >
            ✕
          </button>

          {/* Event Title */}
          <h2 className="text-2xl font-bold mt-2">{event.title}</h2>
          <p className="text-gray-400">{event.Date} | {event.Location}</p>
          <p className="text-gray-400">  {event.Mode}</p>

          {/* Website & Apply */}
          <div className="flex gap-4 mt-2">
            <a href={event.Website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              🌐 Official Website
            </a>
            <a href={event.Apply} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
              ✍ Apply Now
            </a>
          </div>

          <p className="text-red-400 text-sm mt-1">⏳ Deadline: {event.Deadline}</p>

          {/* Navigation Tabs */}
          <nav className="flex gap-4 mt-4 border-b border-gray-700 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 ${activeTab === tab ? "border-b-2 border-blue-400 text-blue-400" : "text-gray-400"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Dynamic Content Based on Active Tab */}
          <div className="mt-4 max-h-64 overflow-y-auto">
            {activeTab === "Overview" && <p>{event.Description}</p>}

            {activeTab === "Schedule" && (
              <ul>
                {event.Schedule.map((day, index) => (
                  <li key={index} className="mt-2">
                    {day.Day.map((eventDetail, i) => (
                      <div key={i} className="mb-2">
                        <p className="font-bold">{eventDetail.Event[0].eventTitle}</p>
                        <p>{eventDetail.Event[0].time}</p>
                        <p>{eventDetail.Event[0].description}</p>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "Prices" && (
              <ul>
                {event.PricePool.map((prize, index) => (
                  <li key={index}>🥇 1st: {prize.First}, 🥈 2nd: {prize.Second}</li>
                ))}
              </ul>
            )}

            {activeTab === "Sponsors" && (
              <ul>
                {event.Sponsor.map((sponsor, index) => (
                  <li key={index} className="mt-2 flex items-center gap-2">
                    <img src={sponsor.Logo} alt={sponsor.Name} className="w-10 h-10" />
                    <span>{sponsor.Name} ({sponsor.Tier})</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "FAQ" && (
              <ul>
                {event.Faq.map((faq, index) => (
                  <li key={index} className="mt-2">
                    <p className="font-bold">❓ {faq.Questions}</p>
                    <p>💡 {faq.Answers}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const EventCard = ({ event }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <motion.div
        className="group relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer max-w-md mx-auto"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={() => setIsDialogOpen(true)}
      >
        {/* Glass effect card */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm z-10 opacity-0  transition-opacity duration-300"></div>

        {/* Card content */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 overflow-hidden">
          {/* Banner image with overlay */}
          <div className="relative h-64 overflow-hidden">
            <motion.img
              src={event.banner}
              alt={event.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

            {/* Floating date badge */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-gray-700 shadow-lg">
              <div className="text-white font-medium flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{event.Date}</span>
              </div>
            </div>
          </div>

          {/* Event details */}
          <div className="p-6 relative z-20">
            <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300">
              {event.title}
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="bg-gray-800/80 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-sm">{event.Location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <div className="bg-gray-800/80 p-2 rounded-lg">
                  <Monitor className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-sm">Mode: {event.Mode}</span>
              </div>
            </div>

            {/* View details button */}
            <motion.button
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Details
            </motion.button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-indigo-600/20 to-transparent rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-600/20 to-transparent rounded-tl-full"></div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isDialogOpen && <EventDialog event={event} onClose={() => setIsDialogOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/Events/events")
      .then((res) => res.json())
      .then((data) => setEvents(data.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="min-h-screen  p-8 text-white">
      <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-8xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Upcoming Events
            </span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Discover and participate in the most exciting tech events around the
            world.
          </p>
        </div>
        <RollingGallery autoplay={true} pauseOnHover={true} />
        <div className="flex justify-center">
        <AddEventModal/>
        </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-20">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      
    </div>
  );
};

export default Events;
