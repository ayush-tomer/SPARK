import problemStatement from "../Models/problemStatement.model.js";

//Create problemStatement :
export const CreateStatement = async (req, res) => {
  const {
    title,
    image,
    designation,
    description,
    location,
    Duration,
    company,
    requirements,
    communitionSkills,
    whyToJoin,
    Experience,
  } = req.body;
  try {
    if (!title) {
      return res
        .status(400)
        .json({ error: true, message: "Title field is empty" });
    }
    if (!image) {
      return res
        .status(400)
        .json({ error: true, message: "Image field is empty" });
    }
    if (!designation) {
      return res
        .status(400)
        .json({ error: true, message: "Designation field is empty" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ error: true, message: "Description field is empty" });
    }
    if (!location) {
      return res
        .status(400)
        .json({ error: true, message: "Location field is empty" });
    }
    if (!Duration) {
      return res
        .status(400)
        .json({ error: true, message: "Duration field is empty" });
    }
    if (!company) {
      return res
        .status(400)
        .json({ error: true, message: "company field is empty" });
    }
    if (!requirements) {
      return res
        .status(400)
        .json({ error: true, message: "Requirements field is empty" });
    }
    if (!communitionSkills) {
      return res
        .status(400)
        .json({ error: true, message: "Comunication-Skills field is empty" });
    }
    if (!whyToJoin) {
      return res
        .status(400)
        .json({ error: true, message: "Why To Join field is empty" });
    }
    if (!Experience) {
      return res
        .status(400)
        .json({ error: true, message: "Experience field is empty" });
    }

    const Statement = await problemStatement.findOne({ title });
    if (Statement) {
      return res
        .status(401)
        .json({ message: "Internal Server issue", error: true });
    }

    const newproblemStatement = new Statement({
      title,
      image,
      designation,
      description,
      location,
      Duration,
      company,
      requirements,
      communitionSkills,
      whyToJoin,
      Experience,
    });

    if (newproblemStatement) {
      await newproblemStatement.save();
      res.status(200).json({
        message: "problemStatement created Successfully",
        error: false,
        data: newproblemStatement,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server issue", error: true });
  }
};

// Delete problemStatement :
export const DeleteStatement = async (req, res) => {
  const { id } = req.params;
  try {
    const ProblemStatement = await problemStatement.findByOne({ _id: id });
    if (!ProblemStatement) {
      return res
        .status(401)
        .json({ message: "No problemStatement Retrieved", error: true });
    }

    await ProblemStatement.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "problemStatement deleted Successfully", error: true });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Internal Server issue", error: true });
  }
};

// Update problemStatement :
export const UpdateStatement = async (req, res) => {
  const {
    title,
    image,
    designation,
    description,
    location,
    Duration,
    company,
    requirements,
    communitionSkills,
    whyToJoin,
    Experience,
  } = req.body;
  const { id } = req.params;
  try {
    if (
      !title &&
      !image &&
      !designation &&
      !description &&
      !location &&
      !Duration &&
      !company &&
      !requirements &&
      !communitionSkills &&
      !whyToJoin &&
      !Experience
    ) {
      return res
        .status(401)
        .json({ message: "No Field to change", error: true });
    }

    const ProblemStatement = await problemStatement.findById({ _id: id });
    if (!ProblemStatement) {
      return res
        .status(401)
        .json({ message: "No problemStatement exists", error: true });
    }

    if (title) {
      ProblemStatement.title = title;
    }
    if (image) {
      ProblemStatement.image = image;
    }
    if (designation) {
      ProblemStatement.designation = designation;
    }
    if (description) {
      ProblemStatement.description = description;
    }
    if (location) {
      ProblemStatement.location = location;
    }
    if (Duration) {
      ProblemStatement.Duration = Duration;
    }
    if (company) {
      ProblemStatement.company = company;
    }
    if (requirements) {
      ProblemStatement.requirements = requirements;
    }
    if (communitionSkills) {
      ProblemStatement.communitionSkills = communitionSkills;
    }
    if (whyToJoin) {
      ProblemStatement.whyToJoin = whyToJoin;
    }
    if (Experience) {
      ProblemStatement.Experience = Experience;
    }

    await ProblemStatement.save();

    res
      .status(200)
      .json({ message: "Updated problemStatement Successfully", error: false });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Internal Server issue", error: true });
  }
};

// Getall problemStatements :
export const GetStatements = async (req, res) => {
  try {
    const ProblemStatements = await problemStatement.find();
    if (!ProblemStatements) {
      return res
        .status(400)
        .json({ message: "No problemStatements Retrieved", error: true });
    }

    res.status(200).json({
      message: "All problemStatements Retrieved",
      error: false,
      data: ProblemStatements,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Internal Server issue", error: true });
  }
};

// Get problemStatement :
export const GetStatement = async (req, res) => {
  const { id } = req.params;
  try {
    const ProblemStatement = await problemStatement.findById({ _id: id });
    if (!ProblemStatement) {
      return res
        .status(401)
        .json({ message: "No problemStatement Retrieved", error: true });
    }

    res.status(200).json({
      message: "problemStatement Retrieved Successfully",
      error: false,
      data: ProblemStatement,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Internal Server issue", error: true });
  }
};
