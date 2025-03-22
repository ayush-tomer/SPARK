/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import InputField from "./InputField.jsx";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useUpdateProjectMutation,
  useGetAllProjectsQuery,
} from "../../../redux/features/projects/projectsApi.js";
import Loading from "../../../components/Admin/Loading.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../../../utilis/baseUrl.js";

const UpdateProject = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetAllProjectsQuery();
  const projectData = data?.data?.find((item) => item._id === id);
  const [updateProject] = useUpdateProjectMutation();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (projectData) {
      setValue("name", projectData.Name);
      setValue("image", projectData.image);
      setValue("author", projectData.author);
      setValue("description", projectData.description);
      setValue("techStack", projectData.TechStack);
      setValue("github", projectData.GitHub);
      setValue("category", projectData.category);
      setValue("ProblemStatement", projectData.ProblemStatement);
    }
  }, [projectData, setValue]);

  const onSubmit = async (data) => {
    const updatedProjectData = {
      name: data.name,
      image: data.image,
      author: data.author,
      description: data.description,
      techStack: data.techStack,
      github: data.github,
      category: data.category,
      ProblemStatement: data.ProblemStatement,
    };

    try {
      await axios.put(
        `${getBaseUrl()}/api/projects/update-project/${id}`,
        updatedProjectData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: "Project Updated",
        text: "The project details have been successfully updated!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      await refetch();
    } catch (error) {
      console.error("Failed to update project.");
      alert("Failed to update project.");
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching project data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Project</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Project Name"
          name="name"
          placeholder="Enter project name"
          register={register}
        />

        <InputField
          label="Image URL"
          name="image"
          type="text"
          placeholder="Enter project image URL"
          register={register}
        />

        <InputField
          label="Author"
          name="author"
          placeholder="Enter project author"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter project description"
          type="textarea"
          register={register}
        />

        <InputField
          label="Tech Stack"
          name="techStack"
          placeholder="Enter tech stack used"
          register={register}
        />

        <InputField
          label="GitHub Repository"
          name="github"
          type="text"
          placeholder="Enter GitHub repository URL"
          register={register}
        />

        <InputField
          label="Category"
          name="category"
          placeholder="Enter project category (e.g. Web, AI, Mobile)"
          register={register}
        />
        <InputField
          label="ProblemStatement"
          name="ProblemStatement"
          placeholder="Enter project category (e.g. Web, AI, Mobile)"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
