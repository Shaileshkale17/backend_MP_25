import express from "express";
import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../Controllers/authController.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

// GET all users
router.get("/", getAllUsers);

// GET user by ID
router.get("/:id", getUserById);

// POST create new user
router.post("/", createUser);

// PUT update user
router.put("/:id", updateUser);

// DELETE delete user
router.delete("/:id", deleteUser);

export default router;
