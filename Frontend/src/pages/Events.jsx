"use client"

import { useState } from "react"
import { ArrowUpRight, Calendar, MapPin, ExternalLink, Linkedin, Instagram, Github, Twitter } from "lucide-react"
import manipal from "/events/manipal.jpg";
import nakshatra from "/events/nakshatra.webp";
import acehack from "/events/acehack.jpg";
import hackaccino from "/events/hackaccino.jpg";
import hackvsit from "/events/hackvsit.webp";
import RollingGallery from '../components/RollingGallery';

// Sample events data
const events = [
  {
    id: 1,
    name: "Code-ए-Manipal",
    image: manipal,
    date: "March 21-22, 2025",
    location: "Manipal University, Jaipur, Rajasthan",
    mode: "Offline",
    website: "https://codemanipal.geekroom.in/",
    applyLink: "https://example.com/techsummit/apply",
    socialLinks: ["https://linkedin.com/in/techsummit", "https://instagram.com/techsummit"],
  },
  {
    id: 2,
    name: "Code Nakshatra",
    image: nakshatra,
    date: "April 3-4, 2025",
    location: "TIIPS, Greater Noida, UP",
    mode: "Offline",
    website: "https://code-nakshatra.xyz/",
    applyLink: "https://example.com/aiconf/apply",
    socialLinks: ["https://twitter.com/aiconf", "https://github.com/aiconf"],
  },
  {
    id: 3,
    name: "Hackaccino 3.0",
    image: hackaccino,
    date: "April 5-6, 2025",
    location: "Bennett University, Greater Noida, UP",
    mode: "Hybrid",
    website: "https://hackaccino.tech/",
    applyLink: "https://example.com/blockchain/apply",
    socialLinks: ["https://linkedin.com/in/blockchainsummit"],
  },
  {
    id: 4,
    name: "AceHack 4.0",
    image: acehack,
    date: "March 29-30, 2025",
    location: "UEM Jaipur, Rajasthan",
    mode: "Offline",
    website: "https://example.com/devopsdays",
    applyLink: "https://example.com/devopsdays/apply",
    socialLinks: ["https://twitter.com/devopsdays", "https://github.com/devopsdays"],
  },
  {
    id: 5,
    name: "HackVSIT 6.0",
    image: hackvsit,
    date: "April 25-26, 2025",
    location: "VIPS, New Delhi",
    mode: "Offline",
    website: "https://example.com/cloudexpo",
    applyLink: "https://example.com/cloudexpo/apply",
    socialLinks: ["https://linkedin.com/in/cloudexpo", "https://instagram.com/cloudexpo"],
  },
  {
    id: 6,
    name: "Cybersecurity Forum",
    image: "/placeholder.svg?height=400&width=600",
    date: "August 15-17, 2025",
    location: "London, UK",
    mode: "Hybrid",
    website: "https://example.com/cybersec",
    applyLink: "https://example.com/cybersec/apply",
    socialLinks: ["https://twitter.com/cybersec", "https://github.com/cybersec"],
  },
  {
    id: 7,
    name: "Mobile App Development Workshop",
    image: "/placeholder.svg?height=400&width=600",
    date: "September 5-7, 2025",
    location: "Berlin, Germany",
    mode: "Offline",
    website: "https://example.com/mobiledev",
    applyLink: "https://example.com/mobiledev/apply",
    socialLinks: ["https://linkedin.com/in/mobiledev", "https://instagram.com/mobiledev"],
  },
  {
    id: 8,
    name: "Data Science Conference",
    image: "/placeholder.svg?height=400&width=600",
    date: "October 10-12, 2025",
    location: "Virtual Event",
    mode: "Online",
    website: "https://example.com/datascience",
    applyLink: "https://example.com/datascience/apply",
    socialLinks: ["https://twitter.com/datascience", "https://github.com/datascience"],
  },
  {
    id: 9,
    name: "Web3 Innovation Summit",
    image: "/placeholder.svg?height=400&width=600",
    date: "November 20-22, 2025",
    location: "Singapore",
    mode: "Hybrid",
    website: "https://example.com/web3",
    applyLink: "https://example.com/web3/apply",
    socialLinks: [
      "https://linkedin.com/in/web3summit",
      "https://twitter.com/web3summit",
      "https://github.com/web3summit",
    ],
  },
]

// Event Card Component
const EventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getSocialIcon = (url) => {
    if (url.includes("linkedin")) return <Linkedin className="h-5 w-5 text-[#0A66C2]" strokeWidth={2.5} />
    if (url.includes("instagram")) return <Instagram className="h-5 w-5 text-[#E1306C]" strokeWidth={2.5} />
    if (url.includes("github")) return <Github className="h-5 w-5 text-[#181717]" strokeWidth={2.5} />
    if (url.includes("twitter")) return <Twitter className="h-5 w-5 text-[#1DA1F2]" strokeWidth={2.5} />
    return <ExternalLink className="h-5 w-5" />
  }

  const getModeColor = (mode) => {
    switch (mode) {
      case "Online":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Offline":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "Hybrid":
        return "bg-amber-50 text-amber-700 border-amber-200"
      default:
        return "bg-blue-50 text-blue-700 border-blue-200"
    }
  }

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
          className={`absolute top-4 right-4 z-20 px-3 py-1 text-xs font-semibold rounded-full border ${getModeColor(event.mode)}`}
        >
          {event.mode}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-100 line-clamp-1">{event.name}</h3>
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

        <a
          href={event.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium text-center rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transform hover:scale-[1.02]"
        >
          Apply Now
        </a>
      </div>
    </div>
  )
}

// Main Events Page Component
export default function Events() {
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
            Discover and participate in the most exciting tech events around the world.
          </p>
        </div>

        <RollingGallery autoplay={true} pauseOnHover={true} />

        <div className="grid grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}

