/* eslint-disable no-unused-vars */
import { useState } from "react";
import InputField from "./InputField.jsx";
import { useForm } from "react-hook-form";
import { useAddInternshipMutation } from "../../../redux/features/internships/internshipsApi.js";
import Swal from "sweetalert2";

const AddInternship = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addInternship, { isLoading }] = useAddInternshipMutation();

  const onSubmit = async (data) => {
    try {
      await addInternship(data).unwrap();
      Swal.fire({
        title: "Internship Added",
        text: "Your internship has been created successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });

      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to add internship. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-4">
        Add New Internship
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter internship title"
          register={register}
        />

        <InputField
          label="Company"
          name="company"
          placeholder="Enter company name"
          register={register}
        />

        <InputField
          label="Designation"
          name="designation"
          placeholder="Enter job designation"
          register={register}
        />

        <InputField
          label="Location"
          name="location"
          placeholder="Enter internship location"
          register={register}
        />

        <InputField
          label="Duration"
          name="Duration"
          placeholder="Enter internship duration"
          register={register}
        />

        <InputField
          label="Experience Required"
          name="Experience"
          placeholder="Enter required experience"
          register={register}
        />

        <InputField
          label="Requirements"
          name="requirements"
          placeholder="Enter job requirements"
          register={register}
        />

        <InputField
          label="Communication Skills"
          name="communitionSkills"
          placeholder="Enter required communication skills"
          register={register}
        />

        <InputField
          label="Why to Join?"
          name="whyToJoin"
          placeholder="Enter benefits of joining"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          type="textarea"
          placeholder="Enter job description"
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
          {isLoading ? <span>Adding..</span> : <span>Add Internship</span>}
        </button>
      </form>
    </div>
  );
};

export default AddInternship;
