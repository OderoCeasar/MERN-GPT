require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");


const userRoutes = require("./routes/user-routes.js");
const chatRoutes = require("./routes/chat-routes.js");
const session = require("express-session");

dotenv.config();
// console.log("Loaded OpenAI key:", process.env.OPENAI_API_KEY);clear

const app = express();

// Middlewares
app.use(cors({
	origin: "http://localhost:5173",  
	credentials: true,                
}));
app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(morgan("dev")); 
app.use(session({ secret: process.env.SESSION_SECRET }));



// Routes
app.use("/api/user/", userRoutes);
app.use("/api/chat/", chatRoutes);

// Connections and Listeners
mongoose
	// .connect(
	// 	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@new-cluster.syllbdh.mongodb.net/ai-chat-bot`
	// )
    .connect(process.env.MONGO_URI)
	.then(() => {
		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
			console.log("MongoDB connected successfully");
		});
	})
	.catch((err) => {
		console.error("MongoDB connection failed:", err);
	});
