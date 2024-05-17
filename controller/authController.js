require("dotenv").config();
const { Sequelize } = require("sequelize");
const twilio = require("twilio");
const otpTable = require("../models/otp");
const UserDetail = require("../models/UserDetail");
const UserDetails = require("../models/UserDetail");

const accountSid = "ACf89ac8f3bc208236802d2911212cf284";
const authToken = "ACf89ac8f3bc208236802d2911212cf284";
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

    await otpTable.create({
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
  const { mobileNumber } = req.query;
  const { otp } = req.body;

  // Log the received mobile number and OTP
  console.log("Received mobileNumber:", mobileNumber);
  console.log("Received OTP:", otp);

  // Check if mobileNumber and otp are provided
  if (!mobileNumber || !otp) {
    return res.status(400).json({ error: "Mobile number and OTP are required" });
  }

  try {
    // Find the OTP entry in the database
    const otpEntry = await otpTable.findOne({ where: { otp } });

    // Check if OTP entry exists and is not expired
    if (otpEntry && otpEntry.createdAt.getTime() + 5 * 60 * 1000 >= Date.now()) {
      // OTP is verified

      // Check if the user exists in the UserDetails table
      const userDetail = await UserDetails.findOne({ where: { mobileNumber } });

      if (userDetail) {
        // Return success response along with the token
        return res.status(200).json({
          message: "OTP verified successfully",
          mobileNumber: mobileNumber,
          name: userDetail.name, // Optionally return the user's name
        });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } else {
      return res.status(401).json({ error: "Invalid OTP or OTP expired" });
    }
  } catch (error) {
    console.error("Error during login:", error);
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

    const existingUser = await UserDetails.findOne({
      where: {
        [Sequelize.Op.or]: [
          { email },
          { mobileNumber }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({ error: "User with this email or mobile number already exists" });
    }

    function generateCustomerId() {
      const randomNum = Math.floor(100000 + Math.random() * 900000); 
      return `hp${randomNum}`;
    }

    const customerId = generateCustomerId();
    const userDetail = await UserDetails.create({ name, email ,mobileNumber,customerId});

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
