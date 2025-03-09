const express = require("express");
const usersController = require("../controller/users.js");

const router = express.Router();

// Create - POST
router.post("/", usersController.createNewUsers);

// Read - GET
router.get("/", usersController.getAllUsers);

// Update - PATCH
router.patch("/:id", usersController.updateUsers);

// Delete - DELETE
router.delete("/:id", usersController.deleteUsers);

module.exports = router;
