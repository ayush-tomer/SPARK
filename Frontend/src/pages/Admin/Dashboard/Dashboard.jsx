import { useEffect, useState } from "react";
import getBaseUrl from "../../../utilis/baseUrl.js";
import axios from "axios";
import Loading from "../../../components/Admin/Loading.jsx";
import { MdIncompleteCircle } from "react-icons/md";
import RevenueChart from "./RevenueChart.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
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
  console.log(data);
  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {data?.totalCommunities}
            </span>
            <span className="block text-gray-500">Total Communities</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {data?.totalInternships}
            </span>
            <span className="block text-gray-500">Total Internships</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">
              {data?.totalProjects}
            </span>
            <span className="inline-block text-xl text-gray-500 font-semibold"></span>
            <span className="block text-gray-500">Total Projects</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdIncompleteCircle className="size-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {data?.totalproblemStatement}
            </span>
            <span className="block text-gray-500">Total Problem Statement</span>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-4">
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-5 py-6 font-semibold border-b border-gray-100 text-center text-2xl">
            Statistics
          </div>
          <div className="p-4">
            <div className="flex items-center justify-center px-4 py-6 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              <RevenueChart />
            </div>
          </div>
        </div>

        {/* Internship */}
        <div className="row-span-3 bg-white shadow rounded-lg md:h-[240px]">
          {/* Header */}
          <div className="flex flex-col items-center justify-center px-6 py-5 font-semibold border-b border-gray-100 w-full">
            <span className="text-2xl md:mb-10">Internships</span>

            {/* Buttons */}
            <div className="flex flex-col w-full gap-4">
              <Link
                to="/dashboard/add-new-internship"
                className="w-full px-4 py-3 bg-purple-500 text-white font-bold rounded-md shadow-md hover:bg-purple-600 transition duration-300 text-center"
              >
                Add Internship
              </Link>
              <Link
                to="/dashboard/manage-internships"
                className="w-full px-4 py-3 bg-purple-500 text-white font-bold rounded-md shadow-md hover:bg-purple-600 transition duration-300 text-center"
              >
                Manage Internships
              </Link>
            </div>
          </div>

          {/* Content */}
          <div
            className="overflow-y-auto md:mt-7"
            style={{ maxHeight: "24rem" }}
          >
            <div className="flex items-center p-8 bg-white shadow rounded-lg">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-2xl font-bold">139</span>
                <span className="block text-gray-500">
                  Website visits (last day)
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg md:mt-6 md:h-[167px]">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path
                  fill="#fff"
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">02</span>
              <span className="block text-gray-500">Orders left</span>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="row-span-3 bg-white shadow rounded-lg md:h-[240px]">
          {/* Header */}
          <div className="flex flex-col items-center justify-center px-6 py-5 font-semibold border-b border-gray-100 w-full">
            <span className="text-2xl md:mb-10">Projects</span>

            {/* Buttons */}
            <div className="flex flex-col w-full gap-4">
              <Link
                to="/dashboard/add-new-project"
                className="w-full px-4 py-3 bg-purple-500 text-white font-bold rounded-md shadow-md hover:bg-purple-600 transition duration-300 text-center"
              >
                Add Project
              </Link>
              <Link
                to="/dashboard/manage-projects"
                className="w-full px-4 py-3 bg-purple-500 text-white font-bold rounded-md shadow-md hover:bg-purple-600 transition duration-300 text-center"
              >
                Manage Projects
              </Link>
            </div>
            <div className="flex flex-col md:mt-14 bg-white md:h-[310px] items-center justify-center px-6 py- font-semibold border-b border-gray-100 w-full">
              <span className="text-2xl md:mb-14">Problem Statements</span>
              <div className="flex flex-col w-full gap-4">
                <Link
                  to="/dashboard/add-new-problemStatements"
                  className="w-full px-4 py-3 bg-purple-500 text-white font-bold rounded-md shadow-md hover:bg-purple-600 transition duration-300 text-center"
                >
                  Add Statements
                </Link>
                <Link
                  to="/dashboard/manage-problemStatements"
                  className="w-full px-4 py-3 bg-purple-500 text-white font-bold rounded-md shadow-md hover:bg-purple-600 transition duration-300 text-center"
                >
                  Manage Statements
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
