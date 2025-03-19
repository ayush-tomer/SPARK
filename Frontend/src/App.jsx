import Aurora from "./components/Background.jsx";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="relative  w-full overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 -z-10 scale-y-[-1]">
        <Aurora
          colorStops={["#3e32a8", "#323aa8", "#4432a8"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Navbar - Always Visible */}
      <div className="fixed top-0 left-0 w-full z-50 ">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
