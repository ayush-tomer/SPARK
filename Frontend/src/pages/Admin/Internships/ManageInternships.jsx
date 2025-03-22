import { Link } from "react-router-dom";
import {
  useGetAllInternshipsQuery,
  useDeleteInternshipMutation,
} from "../../../redux/features/internships/internshipsApi.js";

const ManageInternships = () => {
  const { data, refetch } = useGetAllInternshipsQuery();
  const internships = data?.data || [];

  const [deleteInternship] = useDeleteInternshipMutation();

  // Handle deleting an internship
  const handleDeleteInternship = async (id) => {
    try {
      await deleteInternship(id).unwrap();
      alert("Internship deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete internship:", error.message);
      alert("Failed to delete internship. Please try again.");
    }
  };

  return (
    <section className="py-6 bg-blueGray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b bg-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-blueGray-700">
              All Internships
            </h3>
            <button
              className="bg-indigo-500 text-white text-sm font-semibold uppercase px-4 py-2 rounded-md transition-all hover:bg-indigo-600"
              type="button"
            >
              See all
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-hidden lg:overflow-x-auto">
            <table className="w-full min-w-max bg-white border-collapse">
              {/* Table Head */}
              <thead className="bg-gray-200">
                <tr>
                  {[
                    "#",
                    "Title",
                    "Designation",
                    "Description",
                    "Location",
                    "Duration",
                    "Company",
                    "Experience",
                    "Actions",
                  ].map((heading, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 text-blueGray-500 text-xs uppercase font-semibold text-left"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {internships.map((internship, index) => (
                  <tr
                    key={internship._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">
                      {internship.title.split(" ").slice(0, 2).join(" ")}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {internship.designation.split(" ").slice(0, 2).join(" ") +
                        "..."}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {internship.description
                        ?.split(" ")
                        .slice(0, 1)
                        .join(" ") + "..."}
                    </td>
                    <td className="px-4 py-3 text-sm">{internship.location}</td>
                    <td className="px-4 py-3 text-sm">{internship.Duration}</td>
                    <td className="px-4 py-3 text-sm">{internship.company}</td>

                    <td className="px-4 py-3 text-sm">
                      {internship.Experience.split(" ").slice(0, 5).join(" ") +
                        "..."}
                    </td>
                    <td className="px-4 py-3 text-sm space-x-2">
                      <Link
                        to={`/dashboard/update-internships/${internship._id}`}
                        className="text-indigo-600 text-xs font-semibold hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteInternship(internship._id)}
                        className="text-red-500 text-xs font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageInternships;
