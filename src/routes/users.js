const express = require("express");
const usersController = require("../controller/users.js");

const router = express.Router();

// Create - POST
router.post("/", usersController.createNewUser);

// Read - GET
router.get("/", usersController.getAllUsers);

// Update - PATCH
router.patch("/:id", usersController.updateUser);

// Delete - DELETE
router.delete("/:id", usersController.deleteUser);

module.exports = router;
