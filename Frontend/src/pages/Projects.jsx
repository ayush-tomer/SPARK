"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProjectCard from "../components/ProjectCard"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import GridDistortion from "../components/Distortion"
import Banner from "../assets/project-pictures/project.jpeg"

// Fake project data
const fakeProjects = [
  {
    id: 1,
    name: "AI Chatbot",
    description: "An AI-powered chatbot that provides career guidance.",
    author: "John Doe",
    date: "2024-03-10",
    techStack: ["React", "Node.js", "Botpress", "AI"],
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "A personal portfolio showcasing projects and skills.",
    author: "Jane Smith",
    date: "2024-02-15",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 3,
    name: "E-commerce Store",
    description: "An online store with real-time product filtering and checkout.",
    author: "Alice Johnson",
    date: "2024-01-28",
    techStack: ["React", "MongoDB", "Express.js", "Stripe"],
  },
  {
    id: 4,
    name: "Task Manager",
    description: "A productivity app for task tracking and reminders.",
    author: "Michael Brown",
    date: "2023-12-20",
    techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
  },
  {
    id: 5,
    name: "Weather App",
    description: "An app displaying real-time weather updates.",
    author: "Emily Davis",
    date: "2023-11-05",
    techStack: ["React", "OpenWeather API"],
  },
]

export default function Projects({ projects = fakeProjects }) {
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTech, setSelectedTech] = useState(new Set())
  const [sortOption, setSortOption] = useState("newest")

  const allTechStacks = [...new Set(projects.flatMap((project) => project.techStack))]

  useEffect(() => {
    let updatedProjects = [...projects]

    // Apply search filter
    if (searchTerm.trim()) {
      updatedProjects = updatedProjects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply tech stack filter only if techs are selected
    if (selectedTech.size > 0) {
      updatedProjects = updatedProjects.filter((project) =>
        [...selectedTech].every((tech) => project.techStack.includes(tech))
      )
    }

    // Apply sorting
    updatedProjects.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.date) - new Date(a.date)
        case "oldest":
          return new Date(a.date) - new Date(b.date)
        case "nameAsc":
          return a.name.localeCompare(b.name)
        case "nameDesc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    setFilteredProjects(updatedProjects)
  }, [projects, searchTerm, selectedTech, sortOption])

  const toggleTech = (tech) => {
    const newSelectedTech = new Set(selectedTech)
    if (newSelectedTech.has(tech)) {
      newSelectedTech.delete(tech)
    } else {
      newSelectedTech.add(tech)
    }
    setSelectedTech(newSelectedTech)
  }

  return (
    <div className= "container mx-auto p-6">
      <motion.div
        className="relative h-[70vh] mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Grid Distortion Background */}
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
        <motion.p
          className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          
        </motion.p>

        {/* Search and Sorting */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
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

            {/* Sort Dropdown */}
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
    onClick={() => document.getElementById("filterDialog").showModal()}
    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
  >
    Open Filters
  </button>
          </div>
        </div>

       {/* Tech Stack Filters in a Dialog */}
<div className="mb-8">


  {/* Open Filter Button */}
  

  {/* Dialog for Filters */}
  <dialog id="filterDialog" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Select Tech Stack</h3>

    {/* Checkboxes for each tech stack */}
    <div className="space-y-2">
      {allTechStacks.map((tech) => (
        <label key={tech} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedTech.has(tech)}
            onChange={() => toggleTech(tech)}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="text-gray-800 dark:text-white">{tech}</span>
        </label>
      ))}
    </div>

    {/* Buttons */}
    <div className="flex justify-end gap-2 mt-4">
      <button
        onClick={() => document.getElementById("filterDialog").close()}
        className="px-3 py-1.5 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        Close
      </button>
      <button
        onClick={() => document.getElementById("filterDialog").close()}
        className="px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700"
      >
        Apply
      </button>
    </div>
  </dialog>
</div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedTech(new Set())
                setSortOption("newest")
              }}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
