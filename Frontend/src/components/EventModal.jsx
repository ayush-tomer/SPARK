"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X, Calendar, MapPin, Globe, ExternalLink, Clock, Award, Users, ChevronDown, ChevronUp } from "lucide-react"

// Function to get remaining time until deadline
const useCountdown = (targetDate) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return timeLeft
}

// Custom Badge component
const Badge = ({ children, className }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}

// Custom Button component
const Button = ({ children, onClick, className, disabled, variant = "primary", size = "md", icon }) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-600",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
  }

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-md",
    icon: "p-2 rounded-full",
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}

// Custom Tabs components
const Tabs = ({ children, className }) => {
  return <div className={`w-full ${className}`}>{children}</div>
}

const TabsList = ({ children, className }) => {
  return <div className={`flex border-b ${className}`}>{children}</div>
}

const TabsTrigger = ({ children, value, isActive, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px ${
        isActive
          ? "border-indigo-600 text-indigo-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      } ${className}`}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ children, value, activeValue, className }) => {
  if (value !== activeValue) return null
  return <div className={`focus:outline-none ${className}`}>{children}</div>
}

// Custom Accordion components
const Accordion = ({ children, className }) => {
  return <div className={`divide-y divide-gray-200 ${className}`}>{children}</div>
}

const AccordionItem = ({ children, value, className }) => {
  return <div className={`py-3 ${className}`}>{children}</div>
}

const AccordionTrigger = ({ children, isOpen, onClick, className }) => {
  return (
    <button
      className={`flex justify-between w-full py-2 text-left font-medium text-gray-900 dark:text-white ${className}`}
      onClick={onClick}
    >
      {children}
      <span className="ml-6 flex-shrink-0">
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-indigo-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-indigo-500" />
        )}
      </span>
    </button>
  )
}

const AccordionContent = ({ children, isOpen, className }) => {
  if (!isOpen) return null
  return <div className={`pt-2 pb-1 text-gray-600 dark:text-gray-300 ${className}`}>{children}</div>
}

// Modal component that uses createPortal to render at the document root
export const EventModal = ({ event, isOpen, onClose }) => {
  const modalRef = useRef(null)
  const navbarRef = useRef(null)
  const timeLeft = useCountdown(event.applicationDeadline || "2025-12-31")
  const [activeTab, setActiveTab] = useState("overview")
  const [openAccordionItems, setOpenAccordionItems] = useState({})
  const [mounted, setMounted] = useState(false)
  const [isNavSticky, setIsNavSticky] = useState(false)

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Toggle accordion item
  const toggleAccordion = (itemId) => {
    setOpenAccordionItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  // Handle sticky navbar on scroll
  useEffect(() => {
    if (!isOpen || !mounted) return

    const handleScroll = () => {
      const scrollContainer = modalRef.current.querySelector(".modal-scroll-container")
      if (!scrollContainer || !navbarRef.current) return

      const navbarPosition = navbarRef.current.getBoundingClientRect().top
      const modalTop = modalRef.current.getBoundingClientRect().top

      // Check if navbar has reached the top of the modal
      setIsNavSticky(navbarPosition <= modalTop)
    }

    const scrollContainer = modalRef.current.querySelector(".modal-scroll-container")
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isOpen, mounted])

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"

      // Add event listener to prevent scroll on the modal content
      const modalContent = modalRef.current
      const preventBackgroundScroll = (e) => {
        // Only allow scrolling within the modal content
        const isScrollingModalContent = modalContent && modalContent.contains(e.target)
        if (!isScrollingModalContent) {
          e.preventDefault()
        }
      }

      // Add wheel event listener to the document
      document.addEventListener("wheel", preventBackgroundScroll, { passive: false })
      document.addEventListener("touchmove", preventBackgroundScroll, { passive: false })

      return () => {
        document.body.style.overflow = "auto"
        document.removeEventListener("wheel", preventBackgroundScroll)
        document.removeEventListener("touchmove", preventBackgroundScroll)
      }
    }

    return undefined
  }, [isOpen])

  if (!isOpen || !mounted) return null

  // Modal content
  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in-0 zoom-in-95 duration-300"
      >
        {/* Scrollable container for all content including banner */}
        <div className="flex-1 overflow-y-auto modal-scroll-container">
          {/* Banner */}
          <div className="relative w-full h-auto md:h-[16rem] overflow-hidden">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.name}
              className="absolute inset-0 w-full h-auto object-fit"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
              <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm p-4 rounded-lg inline-block max-w-3xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
                  {event.name}
                </h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    {event.date}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    {event.location}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">{event.mode}</Badge>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md z-20"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Tabs Navigation - becomes sticky */}
          <div
            ref={navbarRef}
            className={`${isNavSticky ? "sticky top-0 shadow-md z-10" : ""} bg-white dark:bg-gray-900 border-b`}
          >
            <TabsList className="w-full justify-start px-6 py-3 h-auto overflow-x-auto flex-nowrap">
              <TabsTrigger
                value="overview"
                isActive={activeTab === "overview"}
                onClick={setActiveTab}
                className="text-sm font-medium whitespace-nowrap"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                isActive={activeTab === "schedule"}
                onClick={setActiveTab}
                className="text-sm font-medium whitespace-nowrap"
              >
                Schedule
              </TabsTrigger>
              <TabsTrigger
                value="prizes"
                isActive={activeTab === "prizes"}
                onClick={setActiveTab}
                className="text-sm font-medium whitespace-nowrap"
              >
                Prizes
              </TabsTrigger>
              <TabsTrigger
                value="sponsors"
                isActive={activeTab === "sponsors"}
                onClick={setActiveTab}
                className="text-sm font-medium whitespace-nowrap"
              >
                Sponsors
              </TabsTrigger>
              <TabsTrigger
                value="faqs"
                isActive={activeTab === "faqs"}
                onClick={setActiveTab}
                className="text-sm font-medium whitespace-nowrap"
              >
                FAQs
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <Tabs className="w-full">
            {/* Overview Tab */}
            <TabsContent value="overview" activeValue={activeTab} className="p-6 md:p-8">
              <div className="grid gap-6">
                {/* Description */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-2">
                      <span className="text-indigo-600 dark:text-indigo-300">📝</span>
                    </span>
                    About the Event
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {event.description || "Join us for this exciting event!"}
                  </p>
                </div>

                {/* Application Deadline */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 flex items-center text-gray-900 dark:text-white">
                    <Clock className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                    Application Closes In
                  </h3>
                  <div className="grid grid-cols-4 gap-3 text-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                      <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.days}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Days</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                      <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.hours}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Hours</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                      <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.minutes}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Minutes</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                      <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{timeLeft.seconds}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Seconds</div>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                    disabled={timeLeft.isExpired}
                    onClick={() => window.open(event.applyLink, "_blank")}
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                    onClick={() => window.open(event.website, "_blank")}
                  >
                    <Globe className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                    Visit Website
                  </Button>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Connect with us</h3>
                  <div className="flex gap-2">
                    {event.socialLinks &&
                      event.socialLinks.map((link, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="icon"
                          className="rounded-full border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                          onClick={() => window.open(link, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" activeValue={activeTab} className="p-6 md:p-8">
              {event.schedule ? (
                <div className="space-y-8">
                  {event.schedule.map((day, dayIndex) => (
                    <div key={dayIndex} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{day.day}</h3>
                      <div className="space-y-4">
                        {day.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex gap-4 border-l-2 border-indigo-600 pl-4 pb-4">
                            <div className="min-w-[5rem] text-sm font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded text-center">
                              {event.time}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                              {event.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{event.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
                  <Calendar className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Schedule will be announced soon.</p>
                </div>
              )}
            </TabsContent>

            {/* Prizes Tab */}
            <TabsContent value="prizes" activeValue={activeTab} className="p-6 md:p-8">
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
                  <Award className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Prize Pool
                </h3>

                {/* Winners section */}
                <div className="grid grid-cols-3 gap-4 mb-10 px-4">
                  {/* 2nd Place */}
                  <div className="order-1 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-100 flex items-center justify-center mb-3 shadow-lg border-4 border-white dark:border-gray-700">
                      <Award className="w-10 h-10 text-gray-700" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">2nd Place</h4>
                      <p className="font-semibold text-xl bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                        $3,000
                      </p>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="order-0 flex flex-col items-center transform scale-110 z-10">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-200 flex items-center justify-center mb-3 shadow-lg border-4 border-white dark:border-gray-700">
                      <Award className="w-12 h-12 text-yellow-700" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-xl text-gray-900 dark:text-white">1st Place</h4>
                      <p className="font-semibold text-2xl bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">
                        $5,000
                      </p>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="order-2 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-700 to-amber-500 flex items-center justify-center mb-3 shadow-lg border-4 border-white dark:border-gray-700">
                      <Award className="w-10 h-10 text-amber-100" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">3rd Place</h4>
                      <p className="font-semibold text-xl bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
                        $1,500
                      </p>
                    </div>
                  </div>
                </div>

                {/* Track prizes */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Track Prizes</h4>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {event.prizePools ? (
                      event.prizePools.map((prize, index) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <h4 className="font-medium text-sm text-indigo-600 dark:text-indigo-400 mb-1">
                            {prize.track}
                          </h4>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{prize.prize}</div>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                          <h4 className="font-medium text-sm text-indigo-600 dark:text-indigo-400 mb-1">Best UI/UX</h4>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">$1,000</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                          <h4 className="font-medium text-sm text-indigo-600 dark:text-indigo-400 mb-1">
                            AI Innovation
                          </h4>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">$1,000</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                          <h4 className="font-medium text-sm text-indigo-600 dark:text-indigo-400 mb-1">
                            Sustainability
                          </h4>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">$1,000</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Sponsors Tab */}
            <TabsContent value="sponsors" activeValue={activeTab} className="p-6 md:p-8">
              {event.sponsors ? (
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
                    <Users className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                    Our Sponsors
                  </h3>

                  {/* Group sponsors by tier */}
                  {["Platinum", "Gold", "Silver"].map((tier) => {
                    const tierSponsors = event.sponsors?.filter((s) => s.tier === tier)
                    if (!tierSponsors || tierSponsors.length === 0) return null

                    return (
                      <div key={tier} className="mb-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
                        <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">{tier} Sponsors</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {tierSponsors.map((sponsor, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full h-24 flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                                <img
                                  src={sponsor.logo || "/placeholder.svg"}
                                  alt={sponsor.name}
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                {sponsor.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
                  <Users className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Sponsor information will be available soon.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faqs" activeValue={activeTab} className="p-6 md:p-8">
              {event.faqs ? (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
                  <Accordion className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    {event.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`} className="py-3">
                        <AccordionTrigger
                          isOpen={openAccordionItems[`faq-${index}`]}
                          onClick={() => toggleAccordion(`faq-${index}`)}
                          className="text-left hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent
                          isOpen={openAccordionItems[`faq-${index}`]}
                          className="pt-3 pb-1 text-gray-600 dark:text-gray-300 pl-4 border-l-2 border-indigo-200 dark:border-indigo-800 ml-2 mt-2"
                        >
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">FAQs will be added soon.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )

  // Use createPortal to render the modal at the document root
  return createPortal(modalContent, document.body)
}

