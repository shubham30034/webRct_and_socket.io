 const tokenService = require("../services/token-service")


const authMiddleware = async (req, res, next) => {
  try {
      const { accessToken } = req.cookies;

      if (!accessToken) {
          return res.status(401).json({
              success: false,
              message: "Unauthorized User: No access token provided",
          });
      }

      const userData = await tokenService.verifyAccessToken(accessToken);

      if (!userData) {
          return res.status(401).json({
              success: false,
              message: "Token cannot be verified or is expired",
          });
      }

      req.user = userData;

      // Proceed to the next middleware or route handler
      next();
  } catch (error) {
      console.error("Error in authMiddleware:", error.message);

      return res.status(401).json({
          success: false,
          message: "Authentication failed",
      });
  }
};

module.exports = authMiddleware;
