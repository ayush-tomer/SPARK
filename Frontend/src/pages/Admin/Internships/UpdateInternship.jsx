/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import InputField from "./InputField.jsx";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useUpdateInternshipMutation,
  useGetAllInternshipsQuery,
} from "../../../redux/features/internships/internshipsApi.js";
import Loading from "../../../components/Admin/Loading.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../../../utilis/baseUrl.js";

const UpdateInternship = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetAllInternshipsQuery();
  const internshipData = data?.data?.find((item) => item._id === id);
  const [updateInternship] = useUpdateInternshipMutation();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (internshipData) {
      setValue("title", internshipData.title);
      setValue("image", internshipData.image);
      setValue("designation", internshipData.designation);
      setValue("description", internshipData.description);
      setValue("location", internshipData.location);
      setValue("duration", internshipData.duration);
      setValue("company", internshipData.company);
      setValue("requirements", internshipData.requirements);
      setValue("communicationSkills", internshipData.communicationSkills);
      setValue("whyToJoin", internshipData.whyToJoin);
      setValue("experience", internshipData.experience);
    }
  }, [internshipData, setValue]);

  const onSubmit = async (data) => {
    const updatedInternshipData = {
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
        `${getBaseUrl()}/api/internship/update-internship/${id}`,
        updatedInternshipData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: "Internship Updated",
        text: "The internship details have been successfully updated!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      await refetch();
    } catch (error) {
      console.error("Failed to update internship.");
      alert("Failed to update internship.");
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching internship data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Update Internship
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter internship title"
          register={register}
        />

        <InputField
          label="Image URL"
          name="image"
          type="text"
          placeholder="Enter internship image URL"
          register={register}
        />

        <InputField
          label="Designation"
          name="designation"
          placeholder="Enter internship designation"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter internship description"
          type="textarea"
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
          name="duration"
          placeholder="Enter internship duration (e.g. 3 months)"
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
          placeholder="Enter requirements (e.g. skills needed)"
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
          placeholder="Enter reason to join this internship"
          register={register}
        />

        <InputField
          label="Experience"
          name="experience"
          placeholder="Enter experience level (e.g. Fresher, 1 year+)"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Internship
        </button>
      </form>
    </div>
  );
};

export default UpdateInternship;
