const usersModel = require("../models/users");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const [data] = await usersModel.getCallUsers();
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
const createNewUsers = async (req, res) => {
  const { body } = req;

  // Cek apakah body kosong
  if (!body.username || !body.email || !body.password) {
    return res.status(400).json({
      message: "Bad Request: username, email, and password are required",
    });
  }

  try {
    await usersModel.createNewUsers(body);
    res.status(201).json({
      message: "User created successfully",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error.message,
    });
  }
};

// Update User
const updateUsers = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  // Cek apakah ID ada dan data yang diupdate valid
  if (!id) {
    return res.status(400).json({ message: "Bad Request: ID is required" });
  }
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "Bad Request: No data provided" });
  }

  try {
    const result = await usersModel.updateUserById(id, body);

    // Cek apakah ada data yang terupdate (affectedRows > 0)
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedFields: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error.message,
    });
  }
};

// Delete User
const deleteUsers = async (req, res) => {
  const { id } = req.params;

  // Cek apakah ID ada
  if (!id) {
    return res.status(400).json({ message: "Bad Request: ID is required" });
  }

  try {
    const result = await usersModel.deleteUsers(id);

    // Cek apakah user ditemukan
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUsers,
  updateUsers,
  deleteUsers,
};
