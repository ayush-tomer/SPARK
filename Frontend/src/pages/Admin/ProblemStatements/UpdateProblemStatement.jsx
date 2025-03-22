/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import InputField from "./InputField.jsx";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useUpdateProblemStatementMutation,
  useGetProblemStatementsQuery,
} from "../../../redux/features/problemStatements/problemStatements.js";
import Loading from "../../../components/Admin/Loading.jsx";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateProblemStatement = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetProblemStatementsQuery();
  const problemStatementData = data?.data?.find((item) => item._id === id);
  const [updateProblemStatement] = useUpdateProblemStatementMutation();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (problemStatementData) {
      setValue("title", problemStatementData.title);
      setValue("image", problemStatementData.image);
      setValue("designation", problemStatementData.designation);
      setValue("description", problemStatementData.description);
      setValue("location", problemStatementData.location);
      setValue("duration", problemStatementData.duration);
      setValue("company", problemStatementData.company);
      setValue("requirements", problemStatementData.requirements);
      setValue("communicationSkills", problemStatementData.communicationSkills);
      setValue("whyToJoin", problemStatementData.whyToJoin);
      setValue("experience", problemStatementData.experience);
    }
  }, [problemStatementData, setValue]);

  const onSubmit = async (data) => {
    const updatedProblemStatementData = {
      title: data.title,
      image: data.image,
      designation: data.designation,
      description: data.description,
      location: data.location,
      duration: data.duration,
      company: data.company,
      requirements: data.requirements,
      communicationSkills: data.communicationSkills,
      whyToJoin: data.whyToJoin,
      experience: data.experience,
    };

    try {
      await axios.put(
        `http://localhost:8080/api/problemStatement/update-Statement/${id}`,
        updatedProblemStatementData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: "Problem Statement Updated",
        text: "The problem statement details have been successfully updated!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      await refetch();
    } catch (error) {
      console.error("Failed to update problem statement.");
      alert("Failed to update problem statement.");
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching problem statement data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Update Problem Statement
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
          type="text"
          placeholder="Enter problem statement image URL"
          register={register}
        />

        <InputField
          label="Designation"
          name="designation"
          placeholder="Enter problem statement designation"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter problem statement description"
          type="textarea"
          register={register}
        />

        <InputField
          label="Location"
          name="location"
          placeholder="Enter problem statement location"
          register={register}
        />

        <InputField
          label="Duration"
          name="duration"
          placeholder="Enter problem statement duration"
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
          placeholder="Enter communication skills needed"
          register={register}
        />

        <InputField
          label="Why to Join"
          name="whyToJoin"
          placeholder="Enter reason to join this project"
          register={register}
        />

        <InputField
          label="Experience"
          name="experience"
          placeholder="Enter experience level (e.g. Beginner, Expert)"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Problem Statement
        </button>
      </form>
    </div>
  );
};

export default UpdateProblemStatement;
