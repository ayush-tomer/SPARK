import React, { useState, useEffect } from "react";
import project1 from "../assets/Community-Pictures/project-1.jpg";
import project2 from "../assets/Community-Pictures/project-2.jpg";
import project4 from "../assets/Community-Pictures/project-4.jpg";
import project5 from "../assets/Community-Pictures/project-5.jpg";
import project6 from "../assets/Community-Pictures/project-6.jpg";
import project7 from "../assets/Community-Pictures/project-7.jpg";
import CommunityCard from "./CommunityCard";

const eventsData = [
  {
    id: 1,
    title: "GeekRoom",
    college: "MSIT",
    description:
      "Geek Room is a widespread coding community with over 25000+ active coders nationwide. It was started by three coding enthusiasts with the main objective to create a transparent community where sharing of ideas and helping other people is the main goal . Geek Room boasts of various hackathon winning teams, 6 independent institutes with Geek Room chapters and so much more.",
    images: [project1],
    link: "https://www.geekroom.in/",
  },
  {
    id: 2,
    title: "GDG-MSIT",
    college: "MSIT",
    description:
      "When you join a Google Developer Group, you'll have the opportunity to learn new skills in a variety of formats. You’ll also meet local developers virtually or in-person with similar interests in technology. The community prides itself on being an inclusive environment where everyone and anyone interested in tech - from beginner developers to experienced professionals are welcome to join.",
    images: [project2],
    link: "https://gdg.community.dev/gdg-on-campus-maharaja-surajmal-institute-of-technology-delhi-india/",
  },
  {
    id: 3,
    title: "GDG-MAIT",
    college: "MAIT",
    description:
      "Learn about a range of technical topics and gain new skills through hands-on workshops, training, events, talks, and meetups, online and in person.",
    images: [project2],
    link: "https://cse.mait.ac.in/index.php/societies-chapters/gdsc",
  },
  {
    id: 4,
    title: "Prakriti",
    college: "MSIT",
    description:
      "Prakriti is the environmental and humanitarian society of MSIT, that has been one of the most active and focused societies of the college since it's inception on March 3, 2010. We work to benifit society and nature around us in every way we can",
    images:[project4],
    link: "https://prakriti.msit.in/",
  },
  {
    id: 5,
    title: "Charusat-DS",
    college: "Charusat University",
    description:
      "Learning together as the community with similar interests and goals hence enriching people to get the best research experience. Striving to be a catalyst for an individual and collective success, making a lasting impact on the Data Science landscape. Cultivating an environment that supports continuous learning, networking, and knowledge sharing within the domain.",
    images: [project5],
    link: "https://charusat.edu.in/DataScienceClub/",
  },
  {
    id: 6,
    title: "Microsoft Student Club",
    college: "MSIT",
    description:
      "Hey there! 🌟 Microsoft Student Chapter at MSIT invites you to join the Microsoft Student Chapter at MSIT Community. It's a fantastic community where you can connect with fellow students who are passionate about technology and get involved in exciting projects and events. It's a great way to expand your knowledge, network, and have fun together",
    images: [project6],
    link: "https://www.linkedin.com/company/mscmsit/",
  },
  {
    id: 7,
    title: "GeekRoom - JIMS",
    college: "JIMS",
    description:
      "Geek Room is a widespread coding community with over 25000+ active coders nationwide. It was started by three coding enthusiasts with the main objective to create a transparent community where sharing of ideas and helping other people is the main goal ",
    images: [project1],
    link: "https://www.geekroom.in/",
  },
  {
    id: 8,
    title: "ACM - BVCOE",
    college: "BVCOE",
    description:
      "ACM-W BVP is a part of ACM-BVP which supports, celebrates, and advocates for the full engagement of women in all aspects of the computing field.",
    images: [project7],
    link: "https://bvcoe.acm.org/",
  },
  {
    id: 9,
    title: "GeekRoom - DTU",
    college: "DTU",
    description:
      "Geek Room is a widespread coding community with over 25000+ active coders nationwide. It was started by three coding enthusiasts with the main objective to create a transparent community where sharing of ideas and helping other people is the main goal .",
    images: [project1],
    link: "https://www.geekroom.in/",
  },
];

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let filteredEvents = [];

    if (filter === "all") {
      filteredEvents = eventsData;
    } else {
      filteredEvents = eventsData.filter((event) => event.college === filter);
    }

    setEvents(filteredEvents);
  }, [filter]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-violet-400/50 text-transparent bg-clip-text ">
          Tech Communities
        </h1>
        <select
          className="border py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Colleges</option>
          <option value="BVCOE">BVCOE </option>
          <option value="MSIT">MSIT</option>
          <option value="MAIT">MAIT</option>
          <option value="Charusat University">Charusat University</option>
          <option value="JIMS">JIMS</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 m-2 p-2 gap-6 text-white rounded-md text-2xl">
        {events.map((event) => (
          <CommunityCard key={event.id} event={event} />
        ))}{" "}
        ...
      </div>
    </div>
  );
};

export default EventList;
