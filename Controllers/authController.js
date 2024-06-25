import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import { sendMail } from "../utils/email.js";
import { generateOTP } from "../utils/otp.js";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const otp = generateOTP();
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { otp, otpExpiry: Date.now() + 600000 } }, // OTP expiry after 10 minutes
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await sendMail(
      email,
      "Password Reset OTP",
      `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
    );
    res.status(200).json({ message: "OTP sent successfully", email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid, store user's ID in session
    req.session.userId = user._id;

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;

    // Check if user ID is stored in session
    if (!req.session.userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and clear OTP fields
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error resetting password" });
  }
};
