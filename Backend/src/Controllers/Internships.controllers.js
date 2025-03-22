import Internship from "../Models/internships.model.js";

//Create Internship :
export const CreateInternship = async (req, res) => {
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

    const internship = await Internship.findOne({ title });
    if (internship) {
      return res
        .status(401)
        .json({ message: "Internal Server issue", error: true });
    }

    const newInternship = new Internship({
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

    if (newInternship) {
      await newInternship.save();
      res.status(200).json({
        message: "Internship created Successfully",
        error: false,
        data: newInternship,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server issue", error: true });
  }
};

// Delete Internship :
export const DeleteInternship = async (req, res) => {
  const { id } = req.params;
  try {
    const internship = await Internship.findOne({ _id: id });
    if (!internship) {
      return res
        .status(401)
        .json({ message: "No Internship Retrieved", error: true });
    }

    await internship.deleteOne({ _id: id });
    res
      .status(200)
      .json({ message: "Internship deleted Successfully", error: true });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Internal Server issue", error: true });
  }
};

// Update internship :
export const UpdateInternship = async (req, res) => {
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

    const internship = await Internship.findById({ _id: id });
    if (!internship) {
      return res
        .status(401)
        .json({ message: "No Internship exists", error: true });
    }

    if (title) {
      internship.title = title;
    }
    if (image) {
      internship.image = image;
    }
    if (designation) {
      internship.designation = designation;
    }
    if (description) {
      internship.description = description;
    }
    if (location) {
      internship.location = location;
    }
    if (Duration) {
      internship.Duration = Duration;
    }
    if (company) {
      internship.company = company;
    }
    if (requirements) {
      internship.requirements = requirements;
    }
    if (communitionSkills) {
      internship.communitionSkills = communitionSkills;
    }
    if (whyToJoin) {
      internship.whyToJoin = whyToJoin;
    }
    if (Experience) {
      internship.Experience = Experience;
    }

    await internship.save();

    res
      .status(200)
      .json({ message: "Updated Internship Successfully", error: false });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Internal Server issue", error: true });
  }
};

// Getall internships:
export const GetInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    if (!internships) {
      return res
        .status(400)
        .json({ message: "No Internships Retrieved", error: true });
    }

    res.status(200).json({
      message: "All Internships Retrieved",
      error: false,
      data: internships,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Internal Server issue", error: true });
  }
};

// Get Internship :
export const GetInternship = async (req, res) => {
  const { id } = req.params;
  try {
    const internship = await Internship.findOne({ _id: id });
    if (!internship) {
      return res
        .status(401)
        .json({ message: "No Internship Retrieved", error: true });
    }

    res.status(200).json({
      message: "Internship Retrieved Successfully",
      error: false,
      data: internship,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Internal Server issue", error: true });
  }
};
