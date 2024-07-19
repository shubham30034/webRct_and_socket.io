const mongoose = require("mongoose")

require("dotenv").config()

exports.dbConnect = async()=>{
    try {
      await  mongoose.connect(process.env.DB_URL) 
      console.log("Db connted Sucessfuly");
    } catch (error) {
          console.log(error,"error while connecting Db");
    }
}