const crypto = require("crypto")
require('dotenv').config();
const hashedService = require("./hash-service")

const smsSid = process.env.SMS_SID
const smsAuthToken = process.env.SMS_AUTH_TOKEN
const twillo = require("twilio")(smsSid,smsAuthToken,{
    lazyLoading : true
})

class OtpService{

    generateOtp(){
      const otp = crypto.randomInt(1000,9999)

      return otp

    }

    async sendBySms(phone,otp){
        
     return await twillo.messages.create({
      to:phone,
      from:process.env.SMS_FROM_NUMBER,
      body: `your otp is ${otp}`
     })
    }

    verifyOtp(hashedOtp,data){
      const verify = hashedService.hashOtp(data)

     return hashedOtp === verify

    }

}

module.exports = new OtpService();