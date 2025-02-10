import Projects from "../Models/projects.model.js";

//Posting of Project :
export const CreateProject = async (req, res) => {
  const { Name, author, description, TechStack, GitHub, ProblemStatement } =
    req.body;
  try {
    if (
      !Name ||
      !author ||
      !description ||
      !TechStack ||
      !GitHub ||
      !ProblemStatement
    ) {
      return res
        .status(400)
        .json({ message: "No field can be empty", error: true });
    }

    const project = new Projects({
      Name,
      author,
      description,
      TechStack,
      GitHub,
      ProblemStatement,
    });

    await project.save();

    res
      .status(200)
      .json({ message: "Project has been created", error: false, data: movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//Updating Movie :
export const Update = async (req, res) => {
  const { id } = req.params;
  const { Name, author, description, TechStack, GitHub, ProblemStatement } =
    req.body;
  try {
    if (
      !Name &&
      !author &&
      !description &&
      !TechStack &&
      !GitHub &&
      !ProblemStatement
    ) {
      return res
        .status(400)
        .json({ message: "No field can be empty", error: true });
    }

    const project = await Projects.findOne({ id });
    if (!project) {
      return res
        .status(400)
        .json({ message: "No such Movie found", error: true });
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

    if (TechStack) {
      project.ProblemStatement = ProblemStatement;
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
    const project = await Projects.findOne({ id });

    if (!project) {
      return res
        .status(500)
        .json({ message: "No such Movie exists", error: true });
    }

    await Projects.deleteOne({ id });

    res
      .status(200)
      .json({ message: "Project deleted Successfully", error: true });
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
export const GetSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.find();
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
