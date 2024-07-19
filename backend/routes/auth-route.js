const express = require("express")
const route = express.Router()

 const AuthController = require("../controllers/auth-controller")


  route.get("/send-otp",AuthController.sendOtp)
  route.post("/verify-otp",AuthController.verifyOtp)

module.exports = route