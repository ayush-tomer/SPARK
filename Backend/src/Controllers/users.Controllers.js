import User from "../Models/users.model.js";

//Get- ALl Users :
export const GetUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res
        .status(400)
        .json({ message: "No Users retrievd", error: true });
    }
    res.status(200).json({
      message: "All Users retrieved Successfully",
      error: false,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//get Single user :
export const GetUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "No user found", error: true });
    }

    res.status(200).json({
      message: "User details Retrieved successfully",
      error: false,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//Delete User :
export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "No user found", error: true });
    }

    await User.findByIdAndDelete({ _id: id });
    res.json({ message: "User Deleted Successfully ", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//Update User :
export const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { UserName, email, password, isAdmin } = req.body;
  try {
    if (!UserName && !email && !password && !isAdmin) {
      return res
        .status(400)
        .json({ message: "No Field can be empty", error: true });
    }

    const user = await User.findById({ _id: id });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No such User found", error: true });
    }

    if (UserName) {
      user.UserName = UserName;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    if (isAdmin) {
      user.isAdmin = isAdmin;
    }

    await User.save();
    res.status(200).json({
      message: "User Updated Succesfully",
      data: user,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};
