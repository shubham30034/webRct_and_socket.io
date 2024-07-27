const User = require("../model/user-model");

class UserService {
  // Method to find a user based on the filter
  async findUser(filter) {
    try {
      const user = await User.findOne(filter);
      return user;
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  }

  // Method to create a new user
  async createUser(data) {
    try {
      // Log data to check what is being passed
      console.log("Creating user with data:", data);

      // Use the create method to add a new user
      const user = await User.create(data);

      // Log the created user
      console.log("Created user:", user);

      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

module.exports = new UserService();
