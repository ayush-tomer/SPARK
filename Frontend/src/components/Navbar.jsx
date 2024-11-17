import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import logo from "../assets/logo.jpg"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const navItems = [
    'Social',
    'Community',
    'Events',
    'Projects',
    'About Us',
    'SignUp'
  ]

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setActiveIndex(prev => {
          if (prev < navItems.length - 1) return prev + 1
          clearInterval(timer)
          return prev
        })
      }, 90)
    return () => clearInterval(timer)
    } else {
      setActiveIndex(-1)
    }
  }, [isOpen])

  return (
    <nav className="p-4 relative">
      <div className="hidden md:flex justify-center items-center space-x-8">
        <div className="bg-[#292a2e] rounded-full px-8 py-2 flex space-x-8">
          <a href="#" className="text-white hover:text-purple-400 transition-colors">Social</a>
          <a href="#" className="text-white hover:text-purple-400 transition-colors">Community</a>
          <a href="#" className="text-white hover:text-purple-400 transition-colors">Events</a>
        </div>

        <div className="w-16 h-16 rounded-full flex items-center justify-center">
          <img src={logo} alt="Logo" className='rounded-full'/>
        </div>

        <div className="bg-[#292a2e] rounded-full px-8 py-2 flex space-x-8">
          <a href="#" className="text-white hover:text-purple-400 transition-colors">Projects</a>
          <a href="#" className="text-white hover:text-purple-400 transition-colors">About Us</a>
          <a href="#" className="text-white hover:text-purple-400 transition-colors">SignUp</a>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
           <img src={logo} alt="Logo" className='rounded-full'/>
          </div>
        </div>

        <button
          onClick={() => {
            setIsOpen(!isOpen)
            if (!isOpen) setActiveIndex(-1)
          }}
          className="fixed top-4 right-4 z-50  text-white p-2 rounded-full transition-colors"
        >
          <Menu size={24} />
        </button>

        {isOpen && (
          <div className="fixed top-0 right-0 h-full w-full bg-black/50 z-40">
            <div className="absolute top-0 right-0 h-full flex flex-col items-end pt-24 pr-6 space-y-4">
              {navItems.map((item, index) => (
                <div
                  key={item}
                  className={`transform transition-all duration-100 ${index <= activeIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                  style={{
                    transitionDelay: `${index * 0.02}s`
                  }}
                >
                  <a
                    href="#"
                    className="bg-[#1a1d24] text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors inline-block"
                  >
                    {item}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
