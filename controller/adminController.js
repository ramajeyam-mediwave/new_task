const UserDetails = require("../models/UserDetail");
const { Sequelize } = require("sequelize");





exports.deleteUserDetailByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  try {
    const user = await UserDetails.findOne({
      where: { mobileNumber }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await UserDetails.destroy({
      where: { mobileNumber }
    });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
