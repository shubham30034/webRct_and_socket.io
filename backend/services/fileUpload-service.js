const cloudinary = require('cloudinary').v2;

class FileSupported {

  // Validate file type
  support(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
  }

  // Upload file to Cloudinary
  async uploadToCloudinary(filePath, folder, quality) {
    try {
      const options = {
        folder: folder,
        resource_type: 'image', 
      };

      if (quality) {
        options.quality = quality;
      }

      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(filePath.tempFilePath, options);
      return uploadResult;

    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }
  }

}

module.exports = new FileSupported();
