"use client"

import { useState } from "react"
import {
  X,
  Plus,
  Trash,
  ArrowUpRight,
  Calendar,
  MapPin,
  ExternalLink,
  Linkedin,
  Instagram,
  Github,
  Twitter,
} from "lucide-react"
import events from "../json/events";
import { EventButton } from "../components/EventButton";

// Custom Button Component
export function CustomButton  ({ onClick, children, className = "" })  {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

// Event Card Component (using your structure)
export function EventCards ({ event }) {
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
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div
          className={`absolute top-4 right-4 z-20 px-3 py-1 text-xs font-semibold rounded-full border ${getModeColor(
            event.mode,
          )}`}
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
        <EventButton event={event}>View Details</EventButton>
      </div>
    </div>
  )
}

// Event Form Modal Component
export function EventFormModal ({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    image: "",
    date: "",
    location: "",
    mode: "Offline",
    website: "",
    applyLink: "",
    socialLinks: [""],
    description: "",
    applicationDeadline: "",
    prizePools: [{ track: "", prize: "" }],
    sponsors: [{ name: "", logo: "", tier: "" }],
    schedule: [
      {
        day: "",
        events: [{ time: "", title: "", description: "" }],
      },
    ],
    faqs: [{ question: "", answer: "" }],
  })

  // For image preview
  const [imagePreview, setImagePreview] = useState(null)
  const [cards, setCards] = useState([]); // State to store multiple cards

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Create a URL for the image preview
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      // Store the file in formData
      setFormData((prev) => ({
        ...prev,
        image: previewUrl, // Store the preview URL for now
      }))
    }
  }

  const handleSocialLinkChange = (index, value) => {
    const newSocialLinks = [...formData.socialLinks]
    newSocialLinks[index] = value
    setFormData((prev) => ({ ...prev, socialLinks: newSocialLinks }))
  }

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, ""],
    }))
  }

  const removeSocialLink = (index) => {
    const newSocialLinks = [...formData.socialLinks]
    newSocialLinks.splice(index, 1)
    setFormData((prev) => ({ ...prev, socialLinks: newSocialLinks }))
  }

  const handlePrizePoolChange = (index, field, value) => {
    const newPrizePools = [...formData.prizePools]
    newPrizePools[index] = { ...newPrizePools[index], [field]: value }
    setFormData((prev) => ({ ...prev, prizePools: newPrizePools }))
  }

  const addPrizePool = () => {
    setFormData((prev) => ({
      ...prev,
      prizePools: [...prev.prizePools, { track: "", prize: "" }],
    }))
  }

  const removePrizePool = (index) => {
    const newPrizePools = [...formData.prizePools]
    newPrizePools.splice(index, 1)
    setFormData((prev) => ({ ...prev, prizePools: newPrizePools }))
  }

  const handleSponsorChange = (index, field, value) => {
    const newSponsors = [...formData.sponsors]
    newSponsors[index] = { ...newSponsors[index], [field]: value }
    setFormData((prev) => ({ ...prev, sponsors: newSponsors }))
  }

  const addSponsor = () => {
    setFormData((prev) => ({
      ...prev,
      sponsors: [...prev.sponsors, { name: "", logo: "", tier: "" }],
    }))
  }

  const removeSponsor = (index) => {
    const newSponsors = [...formData.sponsors]
    newSponsors.splice(index, 1)
    setFormData((prev) => ({ ...prev, sponsors: newSponsors }))
  }

  const handleScheduleDayChange = (index, value) => {
    const newSchedule = [...formData.schedule]
    newSchedule[index] = { ...newSchedule[index], day: value }
    setFormData((prev) => ({ ...prev, schedule: newSchedule }))
  }

  const handleScheduleEventChange = (dayIndex, eventIndex, field, value) => {
    const newSchedule = [...formData.schedule]
    newSchedule[dayIndex].events[eventIndex] = {
      ...newSchedule[dayIndex].events[eventIndex],
      [field]: value,
    }
    setFormData((prev) => ({ ...prev, schedule: newSchedule }))
  }

  const addScheduleDay = () => {
    setFormData((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { day: "", events: [{ time: "", title: "", description: "" }] }],
    }))
  }

  const removeScheduleDay = (index) => {
    const newSchedule = [...formData.schedule]
    newSchedule.splice(index, 1)
    setFormData((prev) => ({ ...prev, schedule: newSchedule }))
  }

  const addScheduleEvent = (dayIndex) => {
    const newSchedule = [...formData.schedule]
    newSchedule[dayIndex].events.push({
      time: "",
      title: "",
      description: "",
    })
    setFormData((prev) => ({ ...prev, schedule: newSchedule }))
  }

  const removeScheduleEvent = (dayIndex, eventIndex) => {
    const newSchedule = [...formData.schedule]
    newSchedule[dayIndex].events.splice(eventIndex, 1)
    setFormData((prev) => ({ ...prev, schedule: newSchedule }))
  }

  const handleFAQChange = (index, field, value) => {
    const newFAQs = [...formData.faqs]
    newFAQs[index] = { ...newFAQs[index], [field]: value }
    setFormData((prev) => ({ ...prev, faqs: newFAQs }))
  }

  const addFAQ = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }))
  }

  const removeFAQ = (index) => {
    const newFAQs = [...formData.faqs]
    newFAQs.splice(index, 1)
    setFormData((prev) => ({ ...prev, faqs: newFAQs }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#232323] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#232323] p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">Add New Event</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Event Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Event Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-20 w-auto object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                  placeholder="e.g., March 21-22, 2025"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mode</label>
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Apply Link</label>
                <input
                  type="url"
                  name="applyLink"
                  value={formData.applyLink}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Application Deadline</label>
                <input
                  type="datetime-local"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Social Links</h3>
              <button
                type="button"
                onClick={addSocialLink}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Link
              </button>
            </div>
            {formData.socialLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="https://..."
                  required
                />
                {formData.socialLinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSocialLink(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Prize Pools */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Prize Pools</h3>
              <button
                type="button"
                onClick={addPrizePool}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Prize Pool
              </button>
            </div>
            {formData.prizePools.map((pool, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium mb-1">Track</label>
                  <input
                    type="text"
                    value={pool.track}
                    onChange={(e) => handlePrizePoolChange(index, "track", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Prize</label>
                  <input
                    type="text"
                    value={pool.prize}
                    onChange={(e) => handlePrizePoolChange(index, "prize", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                    placeholder="₹50,000"
                  />
                </div>
                {formData.prizePools.length > 1 && (
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removePrizePool(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sponsors */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Sponsors</h3>
              <button
                type="button"
                onClick={addSponsor}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Sponsor
              </button>
            </div>
            {formData.sponsors.map((sponsor, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={sponsor.name}
                    onChange={(e) => handleSponsorChange(index, "name", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Logo URL</label>
                  <input
                    type="text"
                    value={sponsor.logo}
                    onChange={(e) => handleSponsorChange(index, "logo", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tier</label>
                  <select
                    value={sponsor.tier}
                    onChange={(e) => handleSponsorChange(index, "tier", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Tier</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                  </select>
                </div>
                {formData.sponsors.length > 1 && (
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeSponsor(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Schedule</h3>
              <button
                type="button"
                onClick={addScheduleDay}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Day
              </button>
            </div>
            {formData.schedule.map((day, dayIndex) => (
              <div key={dayIndex} className="border p-4 rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Day</label>
                    <input
                      type="text"
                      value={day.day}
                      onChange={(e) => handleScheduleDayChange(dayIndex, e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                      placeholder="Day 1 (March 21)"
                    />
                  </div>
                  {formData.schedule.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeScheduleDay(dayIndex)}
                      className="p-2 text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium">Events</h4>
                    <button
                      type="button"
                      onClick={() => addScheduleEvent(dayIndex)}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Event
                    </button>
                  </div>

                  {day.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start border-t pt-2">
                      <div>
                        <label className="block text-xs font-medium mb-1">Time</label>
                        <input
                          type="text"
                          value={event.time}
                          onChange={(e) => handleScheduleEventChange(dayIndex, eventIndex, "time", e.target.value)}
                          className="w-full p-2 border rounded-md text-sm"
                          required
                          placeholder="09:00 AM"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Title</label>
                        <input
                          type="text"
                          value={event.title}
                          onChange={(e) => handleScheduleEventChange(dayIndex, eventIndex, "title", e.target.value)}
                          className="w-full p-2 border rounded-md text-sm"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-xs font-medium mb-1">Description</label>
                          <input
                            type="text"
                            value={event.description}
                            onChange={(e) =>
                              handleScheduleEventChange(dayIndex, eventIndex, "description", e.target.value)
                            }
                            className="w-full p-2 border rounded-md text-sm"
                            required
                          />
                        </div>
                        {day.events.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeScheduleEvent(dayIndex, eventIndex)}
                            className="p-2 text-red-500 hover:text-red-700 self-end"
                          >
                            <Trash className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">FAQs</h3>
              <button type="button" onClick={addFAQ} className="flex items-center text-blue-600 hover:text-blue-800">
                <Plus className="h-4 w-4 mr-1" /> Add FAQ
              </button>
            </div>
            {formData.faqs.map((faq, index) => (
              <div key={index} className="grid grid-cols-1 gap-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Question</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFAQChange(index, "question", e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  {formData.faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFAQ(index)}
                      className="p-2 text-red-500 hover:text-red-700 self-end"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleFAQChange(index, "answer", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

