import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../assets/logo.jpg";
import unknownUser from "/unknownUser.jpg";
import { app } from "../firebaseConfig";

const auth = getAuth(app);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleGuestClick = () => {
    alert("Please log in to access your profile.");
  };

  const navItems = [
    { name: "Social", path: "/social" },
    { name: "Community", path: "/community" },
    { name: "Events", path: "/events" },
    { name: "Projects", path: "/projects" },
    { name: "Internships", path: "/internships" },
    user ? { name: "Logout", path: "#", action: handleLogout } : { name: "SignIn", path: "/login" },
  ];

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => {
          if (prev < navItems.length - 1) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 90);
      return () => clearInterval(timer);
    } else {
      setActiveIndex(-1);
    }
  }, [isOpen]);

  return (
    <nav className="p-4 relative">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-center items-center space-x-8">
        <div className="bg-[#292a2e] rounded-full px-8 py-2 flex space-x-8">
          <Link to="/social" className="text-white hover:text-purple-400 transition-colors">Social</Link>
          <Link to="/community" className="text-white hover:text-purple-400 transition-colors">Community</Link>
          <Link to="/events" className="text-white hover:text-purple-400 transition-colors">Events</Link>
        </div>

        <Link to='/' className="w-16 h-16 rounded-full flex items-center justify-center">
          <img src={logo} alt="Logo" className="rounded-full" />
        </Link>

        <div className="bg-[#292a2e] rounded-full px-8 py-2 flex space-x-8">
          <Link to="/projects" className="text-white hover:text-purple-400 transition-colors">Projects</Link>
          <Link to="/internships" className="text-white hover:text-purple-400 transition-colors">Internships</Link>
          {user ? (
            <button onClick={handleLogout} className="text-white hover:text-purple-400 transition-colors">Logout</button>
          ) : (
            <Link to="/login" className="text-white hover:text-purple-400 transition-colors">SignIn</Link>
          )}
        </div>
      </div>

      {/* Profile Icon - Desktop (Right) */}
      <div className="hidden md:flex fixed top-7 right-7">
        {user ? (
          <Link to="/profile" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white text-lg font-bold leading-none cursor-pointer">
            {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
          </Link>
        ) : (
          <div onClick={handleGuestClick} className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
            <img src={unknownUser} alt="Guest" className="w-10 h-10 rounded-full" />
          </div>
        )}
      </div>

      {/* Profile Icon - Mobile (Left) */}
      <div className="md:hidden fixed top-5 left-5">
        {user ? (
          <Link to="/profile" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white text-lg font-bold leading-none cursor-pointer">
            {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
          </Link>
        ) : (
          <div onClick={handleGuestClick} className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
            <img src={unknownUser} alt="Guest" className="w-10 h-10 rounded-full" />
          </div>
        )}
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <div className="flex justify-center mb-4">
          <Link to="/" className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
            <img src={logo} alt="Logo" className="rounded-full" />
          </Link>
        </div>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setActiveIndex(-1);
          }}
          className="fixed top-4 right-4 z-50 text-white p-2 rounded-full transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
