import React from "react";

const events = [
  {
    id: 1,
    name: "Code-ए-Manipal",
    theme: "AI/ML",
    description: "Looking for roles in software and design department",
    image: "/events/manipal.jpg",
  },
  {
    id: 2,
    name: "HackVSIT",
    theme: "AI/ML",
    description: "Looking for roles in software and design department",
    image: "/events/hackvsit.webp",
  },
  {
    id: 3,
    name: "Hackaccino",
    theme: "AI/ML",
    description: "Looking for roles in software and design department",
    image: "/events/hackaccino.jpg",
  },
];

const HomeEvent = () => {
  return (
    <div className="p-8 mt-28">
      <p className="text-gray-400 ml-10 px-5 text-lg">hackathons, seminars...</p>
      <h2 className="md:text-9xl text-6xl text-center md:text-left md:ml-10 text-[#ffffff] font-semibold font-bebas-neue px-5 mb-10 animate-fade-in">EVENTS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-zinc-900 text-white p-4 rounded-xl shadow-lg border border-zinc-700"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-auto object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{event.name}</h3>
            <p className="text-purple-400 font-medium">Theme: {event.theme}</p>
            <p className="text-gray-400 text-sm mt-2">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeEvent;
