const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/user-details", authController.createUserDetail);
router.get("/user-details", authController.getAllUserDetails);
router.get("/user-details/:mobileNumber", authController.getUserDetailByMobileNumber);
router.put("/user-details/:mobileNumber", authController.updateUserDetailByMobileNumber);
router.delete("/user-details/:mobileNumber", authController.deleteUserDetailByMobileNumber);

module.exports = router;
