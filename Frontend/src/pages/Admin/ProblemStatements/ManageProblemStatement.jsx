import { Link } from "react-router-dom";
import {
  useGetProblemStatementsQuery,
  useDeleteProblemStatementMutation,
} from "../../../redux/features/problemStatements/problemStatements";

const ManageProblemStatements = () => {
  const { data, refetch } = useGetProblemStatementsQuery();
  const problemStatements = data?.data || [];

  const [deleteProblemStatement] = useDeleteProblemStatementMutation();

  // Handle deleting a problem statement
  const handleDeleteStatement = async (id) => {
    try {
      await deleteProblemStatement(id).unwrap();
      alert("Problem statement deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete problem statement:", error.message);
      alert("Failed to delete problem statement. Please try again.");
    }
  };

  return (
    <section className="py-6 bg-blueGray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b bg-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-blueGray-700">
              All Problem Statements
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
                {problemStatements.map((statement, index) => (
                  <tr key={statement._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">
                      {statement.title.split(" ").slice(0, 2).join(" ")}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {statement.designation.split(" ").slice(0, 2).join(" ") +
                        "..."}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {statement.description?.split(" ").slice(0, 1).join(" ") +
                        "..."}
                    </td>
                    <td className="px-4 py-3 text-sm">{statement.location}</td>
                    <td className="px-4 py-3 text-sm">{statement.Duration}</td>
                    <td className="px-4 py-3 text-sm">{statement.company}</td>

                    <td className="px-4 py-3 text-sm">
                      {statement.Experience.split(" ").slice(0, 5).join(" ") +
                        "..."}
                    </td>
                    <td className="px-4 py-3 text-sm space-x-2">
                      <Link
                        to={`/dashboard/update-problem-statements/${statement._id}`}
                        className="text-indigo-600 text-xs font-semibold hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteStatement(statement._id)}
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

export default ManageProblemStatements;
