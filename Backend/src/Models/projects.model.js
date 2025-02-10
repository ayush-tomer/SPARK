import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  TechStack: {
    type: String,
    required: true,
  },
  GitHub: {
    type: String,
    required: true,
  },
  ProblemStatement: {
    type: String,
    required: true,
  },
});

const Projects = mongoose.model("Projects", ProjectSchema);

export default Projects;
