import Projects from "../Models/projects.model.js";

//Posting of Project :
export const CreateProject = async (req, res) => {
  console.log("Received Data:", req.body); // 👀 Check incoming data

  const {
    Name,
    author,
    description,
    TechStack,
    GitHub,
    ProblemStatement,
    category,
    image,
  } = req.body;

  if (
    !Name?.trim() ||
    !author?.trim() ||
    !description?.trim() ||
    !TechStack?.length ||
    !GitHub?.trim() ||
    !ProblemStatement?.trim() ||
    !category?.trim() ||
    !image?.trim()
  ) {
    return res
      .status(400)
      .json({ message: "No field can be empty", error: true });
  }

  try {
    const project = new Projects({
      Name,
      author,
      description,
      TechStack,
      GitHub,
      ProblemStatement,
      category,
      image,
    });

    await project.save();

    res.status(201).json({
      message: "Project has been created successfully",
      error: false,
      data: project,
    });
  } catch (error) {
    console.error("Error in CreateProject:", error);
    res
      .status(500)
      .json({ message: error.message || "Internal Server Issue", error: true });
  }
};

//Updating Movie :
export const UpdateProject = async (req, res) => {
  const { id } = req.params;
  const {
    Name,
    author,
    description,
    TechStack,
    GitHub,
    ProblemStatement,
    category,
    image,
  } = req.body;
  try {
    if (
      !Name &&
      !author &&
      !description &&
      !TechStack &&
      !GitHub &&
      !ProblemStatement &&
      !category &&
      !image
    ) {
      return res
        .status(400)
        .json({ message: "No field can be empty", error: true });
    }

    const project = await Projects.findById({ _id: id });
    if (!project) {
      return res
        .status(400)
        .json({ message: "No such Project found", error: true });
    }

    if (Name) {
      project.Name = Name;
    }

    if (author) {
      project.author = author;
    }

    if (description) {
      project.description = description;
    }

    if (TechStack) {
      project.TechStack = TechStack;
    }

    if (GitHub) {
      project.GitHub = GitHub;
    }

    if (ProblemStatement) {
      project.ProblemStatement = ProblemStatement;
    }
    if (category) {
      project.category = category;
    }
    if (image) {
      project.image = image;
    }

    await project.save();
    res.status(200).json({
      message: "Project Updated Succesfully",
      data: project,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//Delete :
export const DeleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.findById({ _id: id });

    if (!project) {
      return res
        .status(500)
        .json({ message: "No such project exists", error: true });
    }

    await Projects.findByIdAndDelete({ _id: id });

    res
      .status(200)
      .json({ message: "Project deleted Successfully", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

// GetAll :
export const GetProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).json({
      message: "All The Projects are retrieved",
      error: false,
      data: projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server issue", error: true });
  }
};

//GetSingle :
export const GetProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.findOne({ _id: id });
    if (!project) {
      return res
        .status(400)
        .json({ message: "No such movie exist", error: true });
    }
    res.status(200).json({
      message: "The Project Retrieved",
      error: true,
      data: project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server issue", error: true });
  }
};
