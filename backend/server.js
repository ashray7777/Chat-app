const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");  
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
//const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const port = process.env.PORT;

app.listen(
    port,
    console.log(`Server running on PORT ${port}`)
    );


    