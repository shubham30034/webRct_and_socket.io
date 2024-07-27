const FileSupported = require("../services/fileUpload-service");
const User = require("../model/user-model");

class ActivateController {
  async activate(req, res) {
    try {
      // Destructure request body and files
      const { name } = req.body;
      const { avatar } = req.files;

      // Get the user from the request (assuming authentication middleware is used)
      const user = req.user;

      // Check if user exists
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      // Validate input
      if (!name || !avatar) {
        return res.status(400).json({
          success: false,
          message: "Name and avatar are required.",
        });
      }
      

      // Check file type
      const supportedTypes = ["jpg", "png"];
      const fileType = avatar.name.split(".").pop().toLowerCase();

      if (!supportedTypes.includes(fileType)) {
        return res.status(400).json({
          success: false,
          message:
            "File type is not supported. Supported types are jpg and png.",
        });
      }

      // Upload avatar to Cloudinary
      const upload = await FileSupported.uploadToCloudinary(avatar, "CodeHelp");

      if (!upload || !upload.secure_url) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload avatar.",
        });
      }

      // Update user information
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          name: name,
          avatar: upload.secure_url,
          activated: true,
        },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(500).json({
          success: false,
          message: "Unable to update user.",
        });
      }

      // Return success response
      return res.json({
        success: true,
        message: "User activated successfully.",
        data: {
          user:updatedUser
        },
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error.message, // Include error message for debugging
      });
    }
  }
}

module.exports = new ActivateController(); // Corrected export syntax
