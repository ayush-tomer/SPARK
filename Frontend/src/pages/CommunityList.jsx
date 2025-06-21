import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CommunityCard from "./CommunityCard";
import Banner from "../assets/Community-Pictures/spartan-soldiers.jpg";
import GridDistortion from "../components/Distortion";

const api_url = "http://localhost:8080/api/community/get-community";

const EventList = () => {
  const [data, setData] = useState([]); // Store fetched data
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]); // Store filtered & sorted events
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api_url);
        const result = await response.json();

        console.log("Fetched Data:", result); // Debug API response

        if (result && Array.isArray(result.data)) {
          setData(result.data); // Set data correctly
        } else {
          console.error("Invalid API response format:", result);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated Data State:", data); // Debug state update

    if (!Array.isArray(data)) return; // Ensure data is an array

    let filteredEvents = data.filter((event) =>
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
    });

    setEvents(filteredEvents);
  }, [filter, search, sort, data]);

  // Extract unique colleges for filter dropdown
  const colleges = [...new Set(data.map((event) => event.college))];

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <motion.div
        className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center self-center w-11/12 h-1/2 md:w-2/3 bg-neutral-200/45 p-4 md:p-8 rounded-xl text-center mx-auto z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-700 to-black text-transparent bg-clip-text mb-4">
            Be a Part of SPARK
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
        <div className="flex flex-col mb-10 mt-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-600 to-violet-700 text-center text-transparent bg-clip-text mb-5">
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
        {events.length > 0 ? (
          events.map((event) => <CommunityCard key={event._id} event={event} />)
        ) : (
          <p className="text-center text-lg col-span-full">
            No communities found.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default EventList;
