import { Link } from "react-router-dom";
import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} from "../../../redux/features/projects/projectsApi.js";

const ManageProjects = () => {
  const { data, refetch } = useGetAllProjectsQuery();
  const projects = data?.data || [];

  const [deleteProject] = useDeleteProjectMutation();

  // Handle deleting a project
  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id).unwrap();
      alert("Project deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete project:", error.message);
      alert("Failed to delete project. Please try again.");
    }
  };

  return (
    <section className="py-6 bg-blueGray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b bg-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-blueGray-700">
              All Projects
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
                    "Name",
                    "Author",
                    "Description",
                    "Tech Stack",
                    "GitHub",
                    "Category",
                    "ProblemStatement",
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
                {projects.map((project, index) => (
                  <tr key={project._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">
                      {project.Name.split(" ").slice(0, 2).join(" ")}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {project.author.split(" ").slice(0, 2).join(" ")}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {project.description.split(" ").slice(0, 3).join(" ") +
                        "..."}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {project.TechStack.split(",").slice(0, 2).join(", ") +
                        "..."}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <a
                        href={project.GitHub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        GitHub
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm">{project.category}</td>
                    <td className="px-4 py-3 text-sm space-x-2">
                      <Link
                        to={`/dashboard/update-projects/${project._id}`}
                        className="text-indigo-600 text-xs font-semibold hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
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

export default ManageProjects;
