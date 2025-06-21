/* eslint-disable no-unused-vars */
import { useState } from "react";
import InputField from "./InputField.jsx";
import { useForm } from "react-hook-form";
import { useCreateProblemStatementMutation } from "../../../redux/features/problemStatements/problemStatements.js";
import Swal from "sweetalert2";

const AddProblemStatement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [createProblemStatement, { isLoading }] =
    useCreateProblemStatementMutation();

  const onSubmit = async (data) => {
    try {
      await createProblemStatement(data).unwrap();
      Swal.fire({
        title: "Problem Statement Added",
        text: "Your problem statement has been created successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });

      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to add problem statement. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-4">
        Add New Problem Statement
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter problem statement title"
          register={register}
        />

        <InputField
          label="Image URL"
          name="image"
          placeholder="Enter image URL"
          register={register}
        />

        <InputField
          label="Designation"
          name="designation"
          placeholder="Enter designation"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          type="textarea"
          placeholder="Enter problem description"
          register={register}
        />

        <InputField
          label="Location"
          name="location"
          placeholder="Enter location"
          register={register}
        />

        <InputField
          label="Duration"
          name="Duration"
          placeholder="Enter duration"
          register={register}
        />

        <InputField
          label="Company"
          name="company"
          placeholder="Enter company name"
          register={register}
        />

        <InputField
          label="Requirements"
          name="requirements"
          placeholder="Enter requirements"
          register={register}
        />

        <InputField
          label="Communication Skills"
          name="communicationSkills"
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
          label="Experience Required"
          name="Experience"
          placeholder="Enter required experience"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? (
            <span>Adding..</span>
          ) : (
            <span>Add Problem Statement</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProblemStatement;
