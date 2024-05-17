const UserDetails = require("../models/UserDetail");
const { Sequelize } = require("sequelize");


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
      const userDetails = await UserDetails.findAll();
      return res.status(200).json(userDetails);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.getActiveUsers = async (req, res) => {
    try {
      const activeUsers = await UserDetails.count({
        where: { active_detail: 'active' }
      });
      return res.status(200).json(activeUsers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };