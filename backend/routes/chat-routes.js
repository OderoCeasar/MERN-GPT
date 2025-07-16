const express = require("express");
const { verifyToken } = require("../utils/token-manager.js");
const { chatCompletionValidator, validate } = require("../utils/validators.js");
const {
	deleteAllChats,
	generateChatCompletion,
	getAllChats,
} = require("../controllers/chat-controllers.js");

const chatRoutes = express.Router();

// Test route
chatRoutes.get("/", (req, res, next) => {
	console.log("hi");
	res.send("hello from chatRoutes");
});

// Protected routes
chatRoutes.post(
	"/new",
	validate(chatCompletionValidator),
	verifyToken,
	generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, getAllChats);

chatRoutes.delete("/delete-all-chats", verifyToken, deleteAllChats);

module.exports = chatRoutes;
