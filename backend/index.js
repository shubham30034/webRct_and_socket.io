const express = require("express");
const app = express();
const authController = require("./routes/auth-route");
const { dbConnect } = require("./utils/dbConnect");
const cors = require("cors");
let cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload")
const {cloudinaryConnect} = require("./utils/cloudinaryConnect")

// Connect to the database
dbConnect();
cloudinaryConnect()

// Middleware to parse JSON bodies
app.use(express.json({
    limit:"8mb"
}));
app.use(express.json())


app.use(cookieParser())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

// Middleware to handle CORS
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true
}));
// Use the authController for routes under /api/v1
app.use("/api/v1", authController);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`App listening successfully at ${PORT}`);
});
