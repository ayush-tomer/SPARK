import React, { useState } from 'react';
import InternshipCard from '../components/InternshipCard';
import {motion} from 'framer-motion';
import GridDistortion from '../components/Distortion';
import Banner from "../assets/Internships-pictures/Internship.webp"

export default function Internships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const internships = [
    {
        title: "Software Engineering Internship",
        description: "Gain hands-on experience in full-stack development, working with modern technologies and real-world applications.",
        image: "/placeholder.svg?height=300&width=500",
        location: "Remote / San Francisco",
        duration: "6 months (Fall 2024)",
        category: "Software Engineering",
        requirements: [
            "Proficiency in JavaScript, React, and Node.js",
            "Experience with databases like MongoDB or PostgreSQL",
            "Understanding of REST APIs and microservices",
            "Strong problem-solving skills"
        ]
    },
    {
        title: "Graphic Design Internship",
        description: "Work on creative design projects, including branding, UI/UX, and marketing materials for digital and print media.",
        image: "/placeholder.svg?height=300&width=500",
        location: "Remote / Los Angeles",
        duration: "3 months (Summer 2024)",
        category: "Design",
        requirements: [
            "Proficiency in Adobe Photoshop, Illustrator, and Figma",
            "Strong understanding of typography and color theory",
            "Experience in UI/UX design is a plus",
            "Ability to create engaging and aesthetically pleasing designs"
        ]
    },
    {
        title: "Data Science Internship",
        description: "Learn and apply data science techniques, including data analysis, machine learning, and predictive modeling.",
        image: "/placeholder.svg?height=300&width=500",
        location: "Remote / Chicago",
        duration: "4 months (Spring 2024)",
        category: "Data Science",
        requirements: [
            "Knowledge of Python, R, or SQL",
            "Understanding of machine learning algorithms",
            "Experience with data visualization tools like Tableau or Matplotlib",
            "Ability to interpret and analyze complex datasets"
        ]
    },
    {
        title: "Content Writing Internship",
        description: "Join our editorial team to create engaging blog posts, articles, and website content for various industries.",
        image: "/placeholder.svg?height=300&width=500",
        location: "Remote / Boston",
        duration: "3 months (Winter 2024)",
        category: "Content Writing",
        requirements: [
            "Excellent writing and grammar skills",
            "Ability to conduct thorough research on various topics",
            "Familiarity with SEO best practices",
            "Experience with content management systems like WordPress is a plus"
        ]
    },
    {
        title: "Cybersecurity Internship",
        description: "Learn and implement security best practices to protect systems and networks from cyber threats.",
        image: "/placeholder.svg?height=300&width=500",
        location: "Remote / Washington D.C.",
        duration: "6 months (Fall 2024)",
        category: "Cybersecurity",
        requirements: [
            "Basic understanding of cybersecurity principles",
            "Familiarity with penetration testing and ethical hacking tools",
            "Knowledge of network security and cryptography",
            "Experience with Linux and scripting languages is a plus"
        ]
    },
    {
        title: "Marketing Internship",
        description: "Assist in digital marketing campaigns, social media management, and content strategy to boost brand visibility.",
        image: "/placeholder.svg?height=300&width=500",
        location: "Remote / New York",
        duration: "4 months (Summer 2024)",
        category: "Marketing",
        requirements: [
            "Familiarity with social media platforms and trends",
            "Basic understanding of SEO and Google Analytics",
            "Excellent communication and analytical skills",
            "Ability to create engaging content for different marketing channels"
        ]
    },
    {
        title: "Business Development Internship",
        description: "Work on market research, client outreach, and partnership development to drive business growth.",
        image: "/placeholder.svg?height=300&width=500",
        location: "Remote / Austin",
        duration: "5 months (Spring 2024)",
        category: "Business Development",
        requirements: [
            "Strong interpersonal and negotiation skills",
            "Ability to analyze market trends and competitors",
            "Experience with CRM software is a plus",
            "Entrepreneurial mindset and problem-solving abilities"
        ]
    },
    {
        title: "HR & Recruitment Internship",
        description: "Assist in talent acquisition, employee engagement, and HR operations to support organizational growth.",
        image: "/placeholder.svg?height=300&width=500",
        location: "Remote / Seattle",
        duration: "3 months (Winter 2024)",
        category: "Human Resources",
        requirements: [
            "Strong communication and organizational skills",
            "Familiarity with recruitment tools and HR software",
            "Understanding of employee engagement strategies",
            "Ability to handle confidential information professionally"
        ]
    },
    {
        title: "Finance Internship",
        description: "Gain practical experience in financial analysis, investment research, and corporate finance.",
        image: "/placeholder.svg?height=300&width=500",
        location: "Remote / Miami",
        duration: "6 months (Spring 2024)",
        category: "Finance",
        requirements: [
            "Basic knowledge of financial statements and accounting principles",
            "Proficiency in Excel and financial modeling",
            "Understanding of investment strategies and risk assessment",
            "Strong analytical and problem-solving skills"
        ]
    },
    {
        title: "Product Management Internship",
        description: "Work on product roadmaps, customer feedback analysis, and feature development strategies.",
        image: "/placeholder.svg?height=300&width=500",
        location: "Remote / Silicon Valley",
        duration: "4 months (Summer 2024)",
        category: "Product Management",
        requirements: [
            "Strong analytical and problem-solving skills",
            "Familiarity with Agile and Scrum methodologies",
            "Experience with project management tools like Jira or Trello",
            "Ability to collaborate with cross-functional teams"
        ]
    }
];

const categories = ["All", ...new Set(internships.map((i) => i.category))];

// Filter logic
const filteredInternships = internships.filter(
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
    <h1 className="text-8xl font-bold bg-gradient-to-r from-orange-600 to-violet-700 text-center text-transparent bg-clip-text mb-5">
          Internships
        </h1>
    <div className="flex justify-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Search internships..."
        className="border p-2 rounded-md w-64"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="border p-2 rounded-md"
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
    <div className="flex flex-wrap justify-center gap-6">
      {filteredInternships.length > 0 ? (
        filteredInternships.map((internship, index) => (
          <InternshipCard key={index} internship={internship} />
        ))
      ) : (
        <p className="text-center text-gray-500">No internships found.</p>
      )}
    </div>
  </div>
    </div>
);
}

{/*  */}