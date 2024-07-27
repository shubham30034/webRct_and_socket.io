
const otpService = require("../services/otp-service")
const hashService = require("../services/hash-service")
const userService = require("../services/user-service")
const tokenService = require("../services/token-service")
const UserDto = require("../dtos/user-dtos")
   

 class AuthController{

    
  
  async sendOtp(req, res) {
    const phone = req.body.phone;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Please enter phone number"
      });
    }

    try {
      const otp = await otpService.generateOtp();
      console.log(otp);

      // 2min
      const ttl = 1000 * 60 * 2; // changed to 2 minutes from 60 minutes as it seems more appropriate for an OTP
      const expires = Date.now() + ttl;
      const data = `${phone}.${otp}.${expires}`;
      const hash = await hashService.hashOtp(data);

      try {
        // Uncomment this when you have the actual implementation
        // await otpService.sendBySms(phone, otp);

        return res.status(200).json({
          success: true,
          message: "OTP sent successfully",
          hash: `${hash}.${expires}`,
          phone,
          otp // Remove this in production to avoid exposing OTP
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          message: "Error while sending the OTP"
        });
      }

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error while generating OTP"
      });
    }
  }

    async verifyOtp(req, res) {
  
      try {
        // Destructure the required fields from the request body
        const { otp, hash, phone } = req.body;
    
        // Check if any of the required fields are missing
        if (!otp || !hash || !phone) {
          return res.status(400).json({
            success: false,
            message: "Please provide valid data"
          });
        }
    
        // Split the hash into hashed OTP and expiry time
        const [hashedOtp, expires] = hash.split(".");
    
        // Check if the OTP has expired
        if (Date.now() > +expires) {
          return res.status(400).json({
            success: false,
            message: "OTP has expired"
          });
        }
    
        // Verify the OTP
        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
    
        if (!isValid) {
          return res.status(400).json({
            success: false,
            message: "Invalid OTP"
          });
        }
    
        // Check if the user already exists
        let user = await userService.findUser({ phone });
    
        if (!user) {
          // Create a new user if not found
          user = await userService.createUser({ phone });
        }
    
        // Generate access and refresh tokens
        const { accessToken, refreshToken } = await tokenService.generateTokens({
          _id: user._id, 
          activated: false
        });


        await tokenService.storeRefreshToken(refreshToken,user._id)
      
    
        // Set the refresh token as a cookie
        res.cookie('refreshToken', refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          httpOnly: true
        });

        res.cookie('accessToken', accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          httpOnly: true
        });

        const userDto = new UserDto(user)
        
    
        // Return a success response with the access token
        return res.status(200).json({
          success: true,
          message: "login successful",
           data:{
            auth:true,
            user:userDto
           }
        });
    
      } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error"
        });
      }
    }



    async refresh(req, res) {
      try {
        // Get refresh token from cookies
        const { refreshToken: refreshTokenFromCookies } = req.cookies;
    
        // Ensure that the refresh token cookie is available
        if (!refreshTokenFromCookies) {
          return res.status(401).json({
            success: false,
            message: "Refresh token is missing",
          });
        }
    
        // Verify the refresh token
        let userData;
        try {
          userData = await tokenService.verifyRefreshToken(refreshTokenFromCookies);
        } catch (err) {
          console.error('Error verifying token:', err);
          return res.status(400).json({
            success: false,
            message: "Token verification failed",
          });
        }
    
        // If token verification fails
        if (!userData) {
          return res.status(401).json({
            success: false,
            message: "Token is invalid",
          });
        }
    
        // Find the refresh token in the database
        let token;
        try {
          token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookies);
        } catch (err) {
          console.error('Error finding refresh token:', err);
          return res.status(500).json({
            success: false,
            message: "Error finding refresh token",
          });
        }
    
        // If the token is not found in the database
        if (!token) {
          return res.status(403).json({
            success: false,
            message: "Refresh token not found",
          });
        }
    
        // Check if the user is valid
        let user;
        try {
          user = await userService.findUser({ _id: userData._id });
        } catch (err) {
          console.error('Error finding user:', err);
          return res.status(500).json({
            success: false,
            message: "Error finding user",
          });
        }
    
        // If the user is not found
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
    
        // Generate new tokens
        let newTokens;
        try {
          newTokens = await tokenService.generateTokens({ _id: userData._id });
        } catch (err) {
          console.error('Error generating tokens:', err);
          return res.status(500).json({
            success: false,
            message: "Error generating new tokens",
          });
        }
    
        // Update the refresh token in the database
        try {
          await tokenService.updateRefreshToken(userData._id, newTokens.refreshToken);
        } catch (err) {
          console.error('Error updating refresh token:', err);
          return res.status(500).json({
            success: false,
            message: "Unable to update refresh token",
          });
        }
    
        // Determine if the environment is production
        const isProduction = process.env.NODE_ENV === 'production';
    
        // Set the new refresh token cookie
        res.cookie('refreshToken', newTokens.refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          httpOnly: true,
          secure: isProduction, // Use secure cookies only in production
          sameSite: 'Strict',   // Prevents CSRF
        });
    
        // Set the new access token cookie
        res.cookie('accessToken', newTokens.accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          httpOnly: true,
          secure: isProduction,
          sameSite: 'Strict',
        });
    
        // Create a user DTO to send back to the client
        const userDto = new UserDto(user);
    
        // Send a successful response with the new tokens
        return res.status(200).json({
          success: true,
          message: "Tokens refreshed successfully",
          data: {
            auth: true,
            user: userDto
          }
        });
    
      } catch (error) {
        // Log unexpected errors and send an internal server error response
        console.error('Unexpected error in refresh:', error);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error"
        });
      }
    }
    

    async logout(req,res){
   const{refreshToken} = req.cookies
    // DELETE REFRESH TOKEN FROM THE DB

    await tokenService.removeToken(refreshToken)
    // DELETE COOKIES
    
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    res.status(200).json({
      success:true,
      message : "user logout successfuly",
      data:{
        auth:false,
        user:null
        
      }
    })

    }
    
    
    
    

 }


 module.exports = new AuthController()