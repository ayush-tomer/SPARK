"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  MapPin,
  ExternalLink,
  Linkedin,
  Instagram,
  Github,
  Twitter,
} from "lucide-react";
import RollingGallery from "../components/RollingGallery";
import { EventButton } from "../components/EventButton";
import events from "../json/events";
import {
  CustomButton,
  EventFormModal,
  EventCards,
} from "../components/EventAdd";

// Event Card Component
const EventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSocialIcon = (url) => {
    if (url.includes("linkedin"))
      return <Linkedin className="h-5 w-5 text-[#0A66C2]" strokeWidth={2.5} />;
    if (url.includes("instagram"))
      return <Instagram className="h-5 w-5 text-[#E1306C]" strokeWidth={2.5} />;
    if (url.includes("github"))
      return <Github className="h-5 w-5 text-[#181717]" strokeWidth={2.5} />;
    if (url.includes("twitter"))
      return <Twitter className="h-5 w-5 text-[#1DA1F2]" strokeWidth={2.5} />;
    return <ExternalLink className="h-5 w-5" />;
  };

  const getModeColor = (mode) => {
    switch (mode) {
      case "Online":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Offline":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Hybrid":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden bg-[#232323] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 border border-gray-100 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Glass effect top bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      {/* Image container */}
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.name}
          fill
          className={`object-cover transition-transform duration-700`}
        />
        <div
          className={`absolute top-4 right-4 z-20 px-3 py-1 text-xs font-semibold rounded-full border ${getModeColor(
            event.mode
          )}`}
        >
          {event.mode}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-100 line-clamp-1">
            {event.name}
          </h3>
          <a
            href={event.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md"
          >
            <ArrowUpRight className="h-5 w-5 text-gray-700" />
          </a>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-2">
            <Calendar className="h-5 w-5 mr-3 flex-shrink-0 text-indigo-500" />
            <span className="text-sm font-medium">{event.date}</span>
          </div>

          <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-2">
            <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-indigo-500" />
            <span className="text-sm font-medium">{event.location}</span>
          </div>
        </div>

        {event.socialLinks && event.socialLinks.length > 0 && (
          <div className="flex gap-2 mb-6 justify-center">
            {event.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-indigo-100 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
              >
                {getSocialIcon(link)}
              </a>
            ))}
          </div>
        )}
        <EventButton event={event}>View Details</EventButton>
      </div>
    </div>
  );
};

// Main Events Page Component
export default function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitEvent = (data) => {
    setEventData(data);
    console.log("Event data submitted:", data);
  };

  return (
    <div className="min-h-screen mt-10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
        <div className="flex justify-center mb-8">
          <CustomButton
            onClick={handleOpenModal}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            Add New Event
          </CustomButton>
        </div>
        <EventFormModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitEvent} />

        <div className="grid grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {eventData && (
        <div className="mt-8">
          <div className="max-w-md mx-auto">
            <EventCards event={eventData} />
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
