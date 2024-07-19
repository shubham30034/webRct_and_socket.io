
const otpService = require("../services/otp-service")
const hashService = require("../services/hash-service")
   

 class AuthController{

    
   async sendOtp(req,res){
    try {
        const phone = req.body.phone

        if(!phone){
           res.status(400).json({
               success : false,
               message : "please enter phone number"
           })
        }
   
      try {
        const otp = await otpService.generateOtp()
        console.log(otp);

    //   2min
        const ttl = 1000*60*2 
        const expires = Date.now()+ ttl
        const data = `${phone}.${otp}.${expires}`
        const hash = await hashService.hashOtp(data)


//    send otp


     try {
       await otpService.sendBySms(phone,otp)


  return res.status(200).json({
    success : true,
    message : "otp sent successfuly",
    hash : `${hash}.${expires}`,
    phone
  })

     } catch (error) {
          console.log(error);
          res.status(400).json({
            success : false,
            message : "error while sending the otp"
          })
     }

      } catch (error) {
        return res.error(400).json({
            success : false,
            message : "error while generating otp"
        })
      }
       
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success : false,
            message : "internal server error"
        })
        
    }
     
    }

  async verifyOtp(req,res){
    //  logic
    const{otp,hash,phone} = req.body
   
    if(!otp || !hash || !phone){
      return res.status(400).json({
        success : false,
        message : "Please Provide Valid Data"
      })
    }


    const[hashedOtp,expires] = hash.split(".")
    
    if(Date.now()>expires){
      return res.status(400).json({
        success : false,
        message : "Otp has been Expired"
      })
    }


   const data = `${phone}.${otp}.${expires}`

   const isValid = otpService.verifyOtp(hashedOtp,data)

   if(!isValid){
     res.status(400).json({
      success : false,
      message:"Invalid Token"
     })
   }


    let user;
    let accesstoken;
    let refreshToken;



  }

 }


 module.exports = new AuthController()