const usersModel = require("../models/users");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const data = await usersModel.getAllUsers();
    res.status(200).json({
      message: "GET All users success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error.message,
    });
  }
};

// Create New User
const createNewUser = async (req, res) => {
  const { body } = req;
  try {
    const newUser = await usersModel.createNewUser(body);
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create user",
      serverMessage: error.message,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedUser = await usersModel.updateUserById(id, body);
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      serverMessage: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await usersModel.deleteUser(id);
    res.status(200).json({
      message: `User with id ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
