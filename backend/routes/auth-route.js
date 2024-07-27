const express = require("express")
const route = express.Router()

 const AuthController = require("../controllers/auth-controller")
 const  ActivateController = require("../controllers/activate-controller")
 const authMiddleware = require("../middleware/auth-middleware")
const authController = require("../controllers/auth-controller")


  route.post("/send-otp",AuthController.sendOtp)
  route.post("/verify-otp",AuthController.verifyOtp)
  route.post("/activate-user",authMiddleware,ActivateController.activate)
  route.get("/refresh",authController.refresh)
  route.post("/logout",authMiddleware,authController.logout)

module.exports = route