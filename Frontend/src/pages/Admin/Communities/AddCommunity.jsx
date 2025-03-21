/* eslint-disable no-unused-vars */
import { useState } from "react";
import InputField from "./InputField.jsx";
import { useForm } from "react-hook-form";
import { useAddCommunityMutation } from "../../../redux/features/Community/CommunityApi.js";
import Swal from "sweetalert2";

const AddCommunity = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addCommunity, { isLoading }] = useAddCommunityMutation();

  const onSubmit = async (data) => {
    try {
      await addCommunity(data).unwrap();
      Swal.fire({
        title: "Community Added",
        text: "Your community has been created successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });

      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to add community. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-4">
        Add New Community
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
          placeholder="Number of members"
          register={register}
        />

        <InputField
          label="Website URL"
          name="url"
          type="text"
          placeholder="Community website URL"
          register={register}
        />

        <InputField
          label="College Name"
          name="college"
          placeholder="Enter college name"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="image"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? <span>Adding..</span> : <span>Add Community</span>}
        </button>
      </form>
    </div>
  );
};

export default AddCommunity;
