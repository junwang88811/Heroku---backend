import User from "../models/User.js";

export const getProfile = (req, res) => {
  res.status(200).json({ user: req.user });
};

export const getUsers = async (req, res) => {
  const users = await User.find()
  res.status(200).json(users);
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user role
    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const userIndex = await User.findIndex((u) => u.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);
  res.status(200).json({ message: "User deleted successfully" });
};