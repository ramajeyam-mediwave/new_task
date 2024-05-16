require("dotenv").config();
const twilio = require("twilio");
const OTPs = require("../models/otp");
const UserDetail = require("../models/UserDetail");
const UserDetails = require("../models/UserDetail");

const accountSid = "ACf89ac8f3bc208236802d2911212cf284";
const authToken = "ba5274bac8b959350aff12e4303973ca";
const client = twilio(accountSid, authToken);

exports.signup = async (req, res) => {
  const { mobileNumber } = req.body;

  // Check if mobileNumber is provided
  if (!mobileNumber) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  try {
    // Generate OTP (random 6-digit number)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP via Twilio SMS
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: "+13517775218", // Twilio phone number
      to: mobileNumber, // Mobile number provided in the request body
    });

    // You can optionally store the OTP in a database or session for verification

    await OTPs.create({
      mobileNumber,
      otp,
    });
    console.log(otp, "otp");
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { mobileNumber, otp } = req.body;

  // Check if mobileNumber and otp are provided
  if (!mobileNumber || !otp) {
    return res
      .status(400)
      .json({ error: "Mobile number and OTP are required" });
  }

  try {
    // Find the OTP entry in the database
    const otpEntry = await OTPs.findOne({ where: { mobileNumber, otp } });

    // Check if OTP entry exists and is not expired
    if (
      otpEntry &&
      otpEntry.createdAt.getTime() + 5 * 60 * 1000 >= Date.now()
    ) {
      // OTP is verified
      // Return success response along with the mobile number
      return res.status(200).json({
        message: "OTP verified successfully",
        mobileNumber: mobileNumber,
      });
    } else {
      return res.status(401).json({ error: "Invalid OTP or OTP expired" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createUserDetail = async (req, res) => {
  const { name, email ,mobileNumber } = req.body;

  // Validate that username and email are provided
  if (!name || !email) {
    return res.status(400).json({ error: "Username and email are required" });
  }

  try {
    const userDetail = await UserDetails.create({ name, email ,mobileNumber});
    return res.status(201).json(userDetail);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.getAllUserDetails = async (req, res) => {
  try {
    const userDetails = await UserDetail.findAll();
    return res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserDetailByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.params;
  try {
    const userDetail = await UserDetail.findOne({ where: { mobileNumber } });
    if (!userDetail) {
      return res.status(404).json({ error: "User detail not found" });
    }
    return res.status(200).json(userDetail);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUserDetailByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.params;
  try {
    const [updatedRowsCount] = await UserDetail.update(req.body, {
      where: { mobileNumber },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "User detail not found" });
    }
    return res
      .status(200)
      .json({ message: "User detail updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUserDetailByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.params;
  try {
    const deletedRowCount = await UserDetail.destroy({
      where: { mobileNumber },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "User detail not found" });
    }
    return res
      .status(200)
      .json({ message: "User detail deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
