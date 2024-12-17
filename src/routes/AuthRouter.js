const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
// const authMiddleWare = require("../middleware/authMiddleWare");
// const roleMiddleWare = require("../middleware/roleMiddleWare");
// router.get("/users", roleMiddleWare(['ADMIN']), authController.getUsers);

router.get("/users", authController.getAllUsers);

router.post("/registration", authController.registration);

router.post("/login", authController.login);

router.post("/reset_pass_req", authController.resetPasswwordRequest);

router.patch("/reset_pass", authController.resetPassword);


module.exports = router;