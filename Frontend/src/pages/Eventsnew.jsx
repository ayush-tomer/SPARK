import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RollingGallery from "../components/RollingGallery";
import AddEventModal from "../components/CreateEvents";

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
          <p className="text-gray-400">{event.Date} • {event.Location} • {event.Mode}</p>

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
                        <p className="font-bold">{eventDetail.Event[1].eventTitle}</p>
                        <p>{eventDetail.Event[0].time}</p>
                        <p>{eventDetail.Event[2].description}</p>
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
        className="bg-gray-900 text-white p-4 rounded-xl shadow-lg cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsDialogOpen(true)}
      >
        <img src={event.banner} alt={event.title} className="w-full h-40 object-cover rounded-lg" />
        <h2 className="text-xl font-bold mt-2">{event.title}</h2>
        <p className="text-gray-400">{event.Date} - {event.Location}</p>
        <p className="text-gray-400">Mode: {event.Mode}</p>
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
