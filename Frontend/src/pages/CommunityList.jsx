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
      "Geek Room is a widespread coding community with over 25000+ active coders nationwide. It was started by three coding enthusiasts with the main objective to create a transparent community where sharing of ideas and helping other people is the main goal . Geek Room boasts of various hackathon winning teams, 6 independent institutes with Geek Room chapters and so much more.",
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
      "When you join a Google Developer Group, you'll have the opportunity to learn new skills in a variety of formats. You’ll also meet local developers virtually or in-person with similar interests in technology. The community prides itself on being an inclusive environment where everyone and anyone interested in tech - from beginner developers to experienced professionals are welcome to join.",
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
      "Learn about a range of technical topics and gain new skills through hands-on workshops, training, events, talks, and meetups, online and in person.",
    members: 3000,
    activeSince: 2019,
    images: [project2],
    link: "https://cse.mait.ac.in/",
  },
  {
    id: 4,
    title: "Prakriti",
    college: "MSIT",
    description:
      "Prakriti is the environmental and humanitarian society of MSIT, that has been one of the most active and focused societies of the college since it's inception on March 3, 2010. We work to benifit society and nature around us in every way we can",
    members: 1500,
    activeSince: 2010,
    images: [project4],
    link: "https://prakriti.msit.in/",
  },
  {
    id: 5,
    title: "Charusat-DS",
    college: "Charusat University",
    description:
      "Learning together as the community with similar interests and goals hence enriching people to get the best research experience. Striving to be a catalyst for an individual and collective success, making a lasting impact on the Data Science landscape. Cultivating an environment that supports continuous learning, networking, and knowledge sharing within the domain.",
    members: 2000,
    activeSince: 2021,
    images: [project5],
    link: "https://charusat.edu.in/DataScienceClub/",
  },
  {
    id: 6,
    title: "Microsoft Student Club",
    college: "MSIT",
    description:
      "Hey there! 🌟 Microsoft Student Chapter at MSIT invites you to join the Microsoft Student Chapter at MSIT Community. It's a fantastic community where you can connect with fellow students who are passionate about technology and get involved in exciting projects and events. It's a great way to expand your knowledge, network, and have fun together",
    members: 4000,
    activeSince: 2017,
    images: [project6],
    link: "https://www.linkedin.com/company/mscmsit/",
  },
  {
    id: 7,
    title: "ACM - BVCOE",
    college: "BVCOE",
    description:
      "ACM-W BVP is a part of ACM-BVP which supports, celebrates, and advocates for the full engagement of women in all aspects of the computing field.",
    members: 3500,
    activeSince: 2015,
    images: [project7],
    link: "https://bvcoe.acm.org/",
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
        className="relative w-full h-[70vh] mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Text Section */}
        <div className="absolute inset-0 flex flex-col items-center justify-center h-1/2 w-2/3 self-center justify-self-center z-10 bg-neutral-200/45 p-8 rounded-xl text-center m-3">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-700 to-black text-transparent bg-clip-text mb-4">
            Be the Part of SPARK... Be a Part of a Community!!
          </h1>
          <p className="text-2xl text-black font-bold p-6 mt-3">
            Explore, participate, and grow with the top technology events hosted
            across the globe.
          </p>
          <a
            href="#events"
            className="bg-red-800 hover:bg-amber-700 transition ease-in-out delay-750 text-white mt-4 py-4 px-6 rounded-xl text-lg font-medium"
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

      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl mb:flex-none mb:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text mb-5">
          Tech Communities
        </h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="border py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="title">Sort by Title</option>
            <option value="members">Sort by Members</option>
            <option value="activeSince">Sort by Active Since</option>
          </select>
          <div className="relative">
            <select
              className="border py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
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

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 m-2 p-2 gap-6 text-white rounded-md text-2xl"
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