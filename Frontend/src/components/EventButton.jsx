"use client"

import { useState } from "react"
import { EventModal } from "./EventModal"

export const EventButton = ({ event, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="block w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium text-center rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transform hover:scale-[1.02]"
      >
        {children || "View Event Details"}
      </button>

      <EventModal event={event} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

