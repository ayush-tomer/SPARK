import {
  useDeleteCommunityMutation,
  useGetAllCommunitiesQuery,
} from "../../../redux/features/community/communityApi.js";
import { Link } from "react-router-dom";

const ManageCommunities = () => {
  const { data, refetch } = useGetAllCommunitiesQuery();
  const communities = data?.data || [];

  const [deleteCommunity] = useDeleteCommunityMutation();
  // Handle deleting a book
  const handleDeleteBook = async (id) => {
    try {
      await deleteCommunity(id).unwrap();
      alert("Community deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete book:", error.message);
      alert("Failed to delete book. Please try again.");
    }
  };

  // Handle navigating to Edit Book page
  // const handleEditClick = (id) => {
  //     navigate(`dashboard/edit-book/${id}`);
  // };
  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-full mb-12 xl:mb-0 px-4 mx-auto mt-20">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-2xl ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 mt-2">
                <h3 className="font-semibold text-blueGray-700 text-xl">
                  All Communities
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xl font-bold uppercase px-3 py-1 rounded-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    #
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    title
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Description
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Location
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    members
                  </th>

                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    college
                  </th>
                </tr>
              </thead>

              <tbody>
                {communities &&
                  communities.map((communities, index) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {index + 1}
                      </th>

                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                        {communities.title}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                        {communities.description
                          ?.split(" ")
                          .slice(0, 5)
                          .join(" ") + "..."}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                        {communities.location}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                        {communities.members}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                        {communities.college?.split(" ").slice(0, 1).join(" ") +
                          "..."}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 space-x-4">
                        <Link
                          to={`/dashboard/edit-communities/${communities._id}`}
                          className="font-medium text-indigo-600 gap-2 hover:text-indigo-700 mr-2 hover:underline underline-offset-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteBook(communities._id)}
                          className="font-medium bg-red-500 py-1 px-3 ml-4 rounded-full text-white mr-2"
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

export default ManageCommunities;
