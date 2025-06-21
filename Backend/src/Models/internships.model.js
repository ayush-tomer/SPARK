import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  Duration: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  requirements: {
    type: Array,
    required: true,
  },
  communitionSkills: {
    type: String,
    required: true,
  },
  whyToJoin: {
    type: String,
    required: true,
  },
  Experience: {
    type: String,
    required: true,
  },
});

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;
