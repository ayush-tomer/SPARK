import problemStatement from "../Models/problemStatement.model.js";

// Create problemStatement
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
    communicationSkills, // Fixed typo
    whyToJoin,
    Experience,
  } = req.body;

  try {
    // Check for missing fields
    const missingFields = [];
    if (!title) missingFields.push("Title");
    if (!image) missingFields.push("Image");
    if (!designation) missingFields.push("Designation");
    if (!description) missingFields.push("Description");
    if (!location) missingFields.push("Location");
    if (!Duration) missingFields.push("Duration");
    if (!company) missingFields.push("Company");
    if (!requirements) missingFields.push("Requirements");
    if (!communicationSkills) missingFields.push("Communication Skills");
    if (!whyToJoin) missingFields.push("Why To Join");
    if (!Experience) missingFields.push("Experience");

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: true,
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    // Check if title already exists
    const existingStatement = await problemStatement.findOne({ title });
    if (existingStatement) {
      return res.status(409).json({
        message: "Problem statement with this title already exists",
        error: true,
      });
    }

    // Create new problem statement
    const newStatement = new problemStatement({
      title,
      image,
      designation,
      description,
      location,
      Duration,
      company,
      requirements,
      communicationSkills, // Fixed typo
      whyToJoin,
      Experience,
    });

    await newStatement.save();
    res.status(201).json({
      message: "Problem statement created successfully",
      error: false,
      data: newStatement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

// Delete problemStatement
export const DeleteStatement = async (req, res) => {
  const { id } = req.params;
  try {
    const statement = await problemStatement.findById(id);
    if (!statement) {
      return res.status(404).json({
        message: "Problem statement not found",
        error: true,
      });
    }

    await problemStatement.findByIdAndDelete(id);
    res.status(200).json({
      message: "Problem statement deleted successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

// Update problemStatement
export const UpdateStatement = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedStatement = await problemStatement.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedStatement) {
      return res.status(404).json({
        message: "Problem statement not found",
        error: true,
      });
    }

    res.status(200).json({
      message: "Problem statement updated successfully",
      error: false,
      data: updatedStatement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

// Get all problemStatements
export const GetStatements = async (req, res) => {
  try {
    const statements = await problemStatement.find();
    if (statements.length === 0) {
      return res.status(404).json({
        message: "No problem statements found",
        error: true,
      });
    }

    res.status(200).json({
      message: "All problem statements retrieved successfully",
      error: false,
      data: statements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

// Get a single problemStatement
export const GetStatement = async (req, res) => {
  const { id } = req.params;
  try {
    const statement = await problemStatement.findById(id);
    if (!statement) {
      return res.status(404).json({
        message: "Problem statement not found",
        error: true,
      });
    }

    res.status(200).json({
      message: "Problem statement retrieved successfully",
      error: false,
      data: statement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};
