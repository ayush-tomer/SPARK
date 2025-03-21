/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import getBaseUrl from "../../../utilis/baseUrl.js";
import Loading from "../../../components/Admin/Loading.jsx";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/Admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
      <aside className="hidden sm:flex sm:flex-col">
        <a
          href="/"
          className="inline-flex items-center justify-center h-20 w-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500"
        >
          <img
            src="data:image/png;base64,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"
            alt=""
          />
        </a>
        <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <a
              href="#"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Folders</span>
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </a>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-lg"
            >
              <span className="sr-only">Dashboard</span>
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </Link>
            <Link
              to="/dashboard/add-new-community"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Add Community</span>
              <HiViewGridAdd className="h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/manage-communities"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Documents</span>
              <MdOutlineManageHistory className="h-6 w-6" />
            </Link>
          </nav>
          <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
            <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
              <span className="sr-only">Settings</span>
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>
      <div className="flex-grow text-gray-800">
        <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
          <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
            <span className="sr-only">Menu</span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <div className="relative w-full max-w-md sm:-ml-2">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              role="search"
              placeholder="Search..."
              className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg"
            />
          </div>
          <div className="flex flex-shrink-0 items-center ml-auto">
            <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
              <span className="sr-only">User Menu</span>
              <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                <span className="font-semibold text-xl">Admin </span>
              </div>
              <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src={
                    "data:image/png;base64,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"
                  }
                  alt="user profile photo"
                  className="h-full w-full object-cover"
                />
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="hidden sm:block h-6 w-6 text-gray-300"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="border-l pl-3 ml-3 space-x-1">
              <button
                onClick={handleLogout}
                className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
              >
                <span className="sr-only">Log out</span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main className="p-6 sm:p-10 space-y-6 ">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold mb-2">Admin Dashboard</h1>
              <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
            </div>
            <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
              <Link
                to="/dashboard/manage-communities"
                className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Manage Books
              </Link>
              <Link
                to="/dashboard/add-new-book"
                className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Book
              </Link>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
