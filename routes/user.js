const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/user-details", userController.createUserDetail);
router.get("/get-user-details", userController.getAllUserDetails);
router.get("/get-active-user", userController.getActiveUsers);



module.exports = router;



























