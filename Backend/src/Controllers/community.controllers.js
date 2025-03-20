import Community from "../Models/communities.model.js";

//Create Community :
export const CreateCommunity = async (req, res) => {
  const { image, title, description, location, members, url, college } =
    req.body;
  try {
    if (!title) {
      return res
        .status(400)
        .json({ message: "Title Field cant be empty", error: true });
    }
    if (!image) {
      return res
        .status(400)
        .json({ message: "Image Field cant be empty", error: true });
    }
    if (!description) {
      return res
        .status(400)
        .json({ message: "Description Field cant be empty", error: true });
    }
    if (!location) {
      return res
        .status(400)
        .json({ message: "Location Field cant be empty", error: true });
    }
    if (!members) {
      return res
        .status(400)
        .json({ message: "Title Field cant be empty", error: true });
    }
    if (!url) {
      return res
        .status(400)
        .json({ message: "Title Field cant be empty", error: true });
    }
    if (!college) {
      return res
        .status(400)
        .json({ message: "Title Field cant be empty", error: true });
    }
    const community = await Community.findOne({ title });
    if (community) {
      return res
        .status(401)
        .json({ message: "event already exists", error: true });
    }

    const newCommunity = new Community({
      title,
      image,
      location,
      description,
      members,
      url,
      college,
    });

    if (newCommunity) {
      await newCommunity.save();
      res.status(200).json({
        message: "Community CreatedSuccesfully",
        error: false,
        data: newCommunity,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Internal Server Issue" });
  }
};

// Update Community :
export const UpdateCommunity = async (req, res) => {
  const { id } = req.params;
  const { image, title, description, location, members, url, college } =
    req.body;
  try {
    if (
      !title &&
      !location &&
      !description &&
      !members &&
      !image &&
      !members &&
      !url &&
      !college
    ) {
      return res
        .status(400)
        .json({ message: "No Data gven to update", error: true });
    }

    const community = await Community.findOne({ _id: id });
    if (!community) {
      return res
        .status(401)
        .json({ message: "Nothing to Update", error: true });
    }

    if (title) {
      community.title = title;
    }
    if (location) {
      community.location = location;
    }
    if (description) {
      community.description = description;
    }
    if (members) {
      community.members = members;
    }
    if (url) {
      community.url = url;
    }
    if (college) {
      community.college = college;
    }

    await community.save();

    res.status(200).json({ message: "Updated Successfully", error: false });
  } catch (error) {
    console.log(error);
  }
};

//getSingle Community :
export const getSingleCommunity = async (req, res) => {
  const { id } = req.params;
  try {
    const community = await Community.findOne({ _id: id });
    if (!community) {
      return res
        .status(401)
        .json({ message: "No Comunity Exists", error: true });
    }
    res.status(200).json({
      message: "Community retrieved Successfully",
      error: false,
      data: community,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Internal Server Issue" });
  }
};

//get All Communities :
export const getAllCommunity = async (req, res) => {
  try {
    const communities = await Community.find();
    if (!communities) {
      return res
        .status(401)
        .json({ error: true, message: "No Communities exists" });
    }
    res.status(200).json({
      message: "All Comunities retrieved Successfully",
      error: false,
      data: communities,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Internal Server Issue" });
  }
};

//Delete Community :
export const DeleteCommunity = async (req, res) => {
  const { id } = req.params;
  try {
    const community = await Community.findOne({ _id: id });
    if (!community) {
      return res
        .status(401)
        .json({ message: "No Community Found", error: true });
    }

    await community.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Deleted Successfully", error: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Internal Server Issue" });
  }
};
