/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import InternshipCard from "../components/InternshipCard";
import { motion } from "framer-motion";
import GridDistortion from "../components/Distortion";
import Banner from "../assets/Internships-pictures/Internship.webp";

export default function Internships() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/internship/getAll-internship"
        );
        const result = await response.json();

        console.log("Fetched Data:", result);

        if (result && Array.isArray(result.data)) {
          setData(result.data);
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

  // Ensure data exists before mapping
  const categories = ["All", ...new Set(data.map((i) => i.category))];

  // Filter logic
  const filteredInternships = data.filter(
    (internship) =>
      (filter === "All" || internship.category.includes(filter)) &&
      (internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6">
      <motion.div
        className="relative w-full h-[70vh] mb-10"
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
      <div className="min-h-screen p-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r mt-10  from-orange-600 to-violet-700 text-center text-transparent bg-clip-text mb-8">
          Internships
        </h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search internships..."
            className="border p-2 rounded-md w-full max-w-xs md:max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border p-2 rounded-md w-full max-w-xs md:max-w-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Internship Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.length > 0 ? (
            filteredInternships.map((internship, index) => (
              <InternshipCard key={index} internship={internship} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No internships found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
