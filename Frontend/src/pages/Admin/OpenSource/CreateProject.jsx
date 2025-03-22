/* eslint-disable no-unused-vars */
import { useState } from "react";
import InputField from "./InputField.jsx";
import { useForm } from "react-hook-form";
import { useAddProjectMutation } from "../../../redux/features/projects/projectsApi.js";
import Swal from "sweetalert2";

const AddProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addProject, { isLoading }] = useAddProjectMutation();

  const onSubmit = async (data) => {
    try {
      await addProject(data).unwrap();
      Swal.fire({
        title: "Project Added",
        text: "Your project has been created successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to add project. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-4">
        Add New Project
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Project Name"
          name="Name"
          placeholder="Enter project name"
          register={register}
        />

        <InputField
          label="Author"
          name="author"
          placeholder="Enter author name"
          register={register}
        />

        <InputField
          label="Tech Stack"
          name="TechStack"
          placeholder="Enter technologies used"
          register={register}
        />

        <InputField
          label="GitHub Link"
          name="GitHub"
          placeholder="Enter GitHub repo link"
          register={register}
        />

        <InputField
          label="Project Category"
          name="category"
          placeholder="Enter project category"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          type="textarea"
          placeholder="Enter project description"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="image"
          type="text"
          placeholder="Enter project image URL"
          register={register}
        />
        <InputField
          label="ProblemStatement"
          name="ProblemStatement"
          type="text"
          placeholder="Enter project image URL"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? <span>Adding..</span> : <span>Add Project</span>}
        </button>
      </form>
    </div>
  );
};

export default AddProject;
