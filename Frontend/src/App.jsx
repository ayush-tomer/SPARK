import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <div className="absolute inset-0 -z-10 min-h-screen-full overflow-x-hidden w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className="max-w-7xl mx-auto pt-20 px-6 overflow-x-hidden">
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
