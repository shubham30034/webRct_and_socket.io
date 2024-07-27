const jwt = require("jsonwebtoken");
const Refresh = require("../model/refreshToken-model")

// Environment variables should be read directly
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH = process.env.JWT_REFRESH;

class TokenService {
  async generateTokens(payload) {
    // Generate tokens synchronously
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1m"
    });
    console.log(accessToken);

    const refreshToken = jwt.sign(payload, JWT_REFRESH, {
      expiresIn: "1y"
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token,userId){
      try {
         await Refresh.create({
            token:token,
            userId:userId
         })
      } catch (error) {
        
      }
  }

  async verifyAccessToken(token){
    const result =  jwt.verify(token,JWT_SECRET)
    return result

  }

  async verifyRefreshToken(refreshToken){
    const result = jwt.verify(refreshToken,JWT_REFRESH)
    return result
  }

  async findRefreshToken(userId,refreshToken){
  const token =  await Refresh.findOne({userId:userId,token:refreshToken})
  return token
  }

  async updateRefreshToken(userId,refreshToken){
   return await Refresh.findOneAndUpdate({userId:userId},{token:refreshToken})
  }

  async removeToken(refreshToken){
   return   await Refresh.deleteOne({token:refreshToken})
  }


}

module.exports = new TokenService();
