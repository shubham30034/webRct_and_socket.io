const express = require("express");
const app = express();
const authController = require("./routes/auth-route");
const {dbConnect} = require("./utils/dbConnect")

dbConnect()

// Add the express.json() middleware before the routes
app.use(express.json());

app.use("/api/v1", authController);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`app listening successfully at ${PORT}`);
});
