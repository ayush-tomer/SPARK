/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import InputField from "./InputField.jsx";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useUpdateCommunityMutation,
  useGetAllCommunitiesQuery,
} from "../../../redux/features/community/communityApi.js";
import Loading from "../../../components/Admin/Loading.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../../../utilis/baseUrl.js";

const UpdateCommunity = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetAllCommunitiesQuery();
  const communityData = data?.data?.find((item) => item._id === id);
  const [updateCommunity] = useUpdateCommunityMutation();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (communityData) {
      setValue("title", communityData.title);
      setValue("description", communityData.description);
      setValue("location", communityData.location);
      setValue("members", communityData.members);
      setValue("url", communityData.url);
      setValue("college", communityData.college);
      setValue("image", communityData.image);
    }
  }, [communityData, setValue]);

  const onSubmit = async (data) => {
    const updatedCommunityData = {
      title: data.title,
      description: data.description,
      location: data.location,
      members: Number(data.members),
      url: data.url,
      college: data.college,
      image: data.image || communityData.image,
    };

    try {
      await axios.put(
        `${getBaseUrl()}/api/community/update-community/${id}`,
        updatedCommunityData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: "Community Updated",
        text: "Your community details have been updated successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      await refetch();
    } catch (error) {
      console.error("Failed to update community.");
      alert("Failed to update community.");
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching community data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Update Community
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter community title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter community description"
          type="textarea"
          register={register}
        />

        <InputField
          label="Location"
          name="location"
          placeholder="Enter community location"
          register={register}
        />

        <InputField
          label="Members"
          name="members"
          type="number"
          placeholder="Enter number of members"
          register={register}
        />

        <InputField
          label="Website URL"
          name="url"
          type="text"
          placeholder="Enter community website URL"
          register={register}
        />

        <InputField
          label="College"
          name="college"
          type="text"
          placeholder="Enter associated college"
          register={register}
        />

        <InputField
          label="Image URL"
          name="image"
          type="text"
          placeholder="Enter community image URL"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Community
        </button>
      </form>
    </div>
  );
};

export default UpdateCommunity;
