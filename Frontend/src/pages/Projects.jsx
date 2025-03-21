/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import GridDistortion from "../components/Distortion";
import Banner from "../assets/project-pictures/project.jpeg";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState(new Set());
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/projects/getAll-project"
        );
        console.log(response);
        setProjects(response.data.data);
        setFilteredProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const allTechStacks = [
    ...new Set(projects.flatMap((project) => project.TechStack || [])),
  ];

  useEffect(() => {
    let updatedProjects = [...projects];

    // Apply search filter
    if (searchTerm.trim()) {
      updatedProjects = updatedProjects.filter(
        (project) =>
          project.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply tech stack filter only if techs are selected
    if (selectedTech.size > 0) {
      updatedProjects = updatedProjects.filter((project) =>
        [...selectedTech].every((tech) => project.TechStack.includes(tech))
      );
    }

    // Apply sorting
    updatedProjects.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt); // Assuming backend has timestamps
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "nameAsc":
          return a.Name.localeCompare(b.Name);
        case "nameDesc":
          return b.Name.localeCompare(a.Name);
        default:
          return 0;
      }
    });

    setFilteredProjects(updatedProjects);
  }, [projects, searchTerm, selectedTech, sortOption]);

  const toggleTech = (tech) => {
    const newSelectedTech = new Set(selectedTech);
    if (newSelectedTech.has(tech)) {
      newSelectedTech.delete(tech);
    } else {
      newSelectedTech.add(tech);
    }
    setSelectedTech(newSelectedTech);
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        className="relative h-[70vh] mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 z-0">
          <GridDistortion
            imageSrc={Banner}
            grid={10}
            mouse={0.1}
            strength={0.15}
            relaxation={0.9}
            className="custom-class rounded-2xl md:mt-[2.5rem]"
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-7xl font-bold bg-gradient-to-r from-orange-600 to-violet-700 text-transparent bg-clip-text mb-10 p-2 pt-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Open Source Projects
        </motion.h1>

        {/* Search and Sorting */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative min-w-[200px]">
              <div className="flex items-center">
                <ArrowUpDown className="absolute left-3 text-gray-400 h-5 w-5" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full appearance-none pl-10 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="nameAsc">Name (A-Z)</option>
                  <option value="nameDesc">Name (Z-A)</option>
                </select>
              </div>
            </div>
            <button
              onClick={() =>
                document.getElementById("filterDialog").showModal()
              }
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Open Filters
            </button>
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedTech(new Set());
                setSortOption("newest");
              }}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
