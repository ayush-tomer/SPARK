import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import project1 from "../assets/Community-Pictures/project-1.jpg";
import project2 from "../assets/Community-Pictures/project-2.jpg";
import project4 from "../assets/Community-Pictures/project-4.jpg";
import project5 from "../assets/Community-Pictures/project-5.jpg";
import project6 from "../assets/Community-Pictures/project-6.jpg";
import project7 from "../assets/Community-Pictures/project-7.jpg";
import CommunityCard from "./CommunityCard";
import Banner from "../assets/Community-Pictures/spartan-soldiers.jpg";
import GridDistortion from "../components/Distortion";

const eventsData = [
  {
    id: 1,
    title: "GeekRoom",
    college: "MSIT",
    description:
      "Geek Room is a widespread coding community with over 25000+ active coders nationwide...",
    members: 25000,
    activeSince: 2018,
    images: [project1],
    link: "https://www.geekroom.in/",
  },
  {
    id: 2,
    title: "GDG-MSIT",
    college: "MSIT",
    description:
      "When you join a Google Developer Group, you'll have the opportunity to learn new skills...",
    members: 5000,
    activeSince: 2020,
    images: [project2],
    link: "https://gdg.community.dev/",
  },
  {
    id: 3,
    title: "GDG-MAIT",
    college: "MAIT",
    description:
      "Learn about a range of technical topics and gain new skills through hands-on workshops...",
    members: 3000,
    activeSince: 2019,
    images: [project2],
    link: "https://cse.mait.ac.in/",
  },
];

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");

  useEffect(() => {
    let filteredEvents = eventsData.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );

    if (filter !== "all") {
      filteredEvents = filteredEvents.filter(
        (event) => event.college === filter
      );
    }

    filteredEvents.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "members") return b.members - a.members;
      if (sort === "activeSince") return a.activeSince - b.activeSince;
    });

    setEvents(filteredEvents);
  }, [filter, search, sort]);

  const colleges = [...new Set(eventsData.map((event) => event.college))];

  return (
    <div className="container mx-auto p-6">
      <motion.div
        className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Hero Section */}
        <div className="absolute inset-0 flex flex-col items-center justify-center w-11/12 md:w-2/3 bg-neutral-200/45 p-4 md:p-8 rounded-xl text-center mx-auto z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-700 to-black text-transparent bg-clip-text mb-4">
            Be the Part of SPARK
          </h1>

          <a
            href="#events"
            className="bg-red-800 hover:bg-amber-700 transition ease-in-out delay-150 text-white mt-4 py-3 px-6 rounded-xl text-lg font-medium"
          >
            Explore Communities
          </a>
        </div>

        {/* Grid Distortion Background */}
        <div className="absolute inset-0 z-0">
          <GridDistortion
            imageSrc={Banner}
            grid={10}
            mouse={0.1}
            strength={0.15}
            relaxation={0.9}
            className="custom-class"
          />
        </div>
      </motion.div>

      {/* Search, Filter & Sort */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
          Tech Communities
        </h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="border py-2 px-4 w-full sm:w-auto rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border py-2 px-4 w-full sm:w-auto rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="title">Sort by Title</option>
            <option value="members">Sort by Members</option>
            <option value="activeSince">Sort by Active Since</option>
          </select>
          <select
            className="border py-2 px-4 w-full sm:w-auto rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Colleges</option>
            {colleges.map((college, index) => (
              <option key={index} value={college}>
                {college}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Events Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white rounded-md text-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {events.map((event) => (
          <CommunityCard key={event.id} event={event} />
        ))}
      </motion.div>
    </div>
  );
};

export default EventList;
