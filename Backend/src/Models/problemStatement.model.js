import mongoose from "mongoose";

const problemStatementSchema = new mongoose.Schema({
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
    type: String,
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

const problemStatement = mongoose.model(
  "ProblemStatement",
  problemStatementSchema
);

export default problemStatement;
