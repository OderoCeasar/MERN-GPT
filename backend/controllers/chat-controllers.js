const openai = require("../configs/open-ai-config");
const User = require("../models/user-model");

const generateChatCompletion = async (req, res) => {
	try {
		const { message } = req.body;
		const userId = res.locals?.jwtData?.id;

		if (!message || !userId) {
			return res.status(400).json({ message: "Message and user ID are required." });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(401).json({ message: "User not found or unauthorized." });
		}

		user.chats = user.chats || [];

		const chatHistory = user.chats.map(({ role, content }) => ({ role, content }));
		chatHistory.push({ role: "user", content: message });

		user.chats.push({ role: "user", content: message });

		let aiReply;
		try {
			const completion = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: chatHistory,
			});
			aiReply = completion.choices[0].message;
		} catch (err) {
			console.error("OpenAI API error:", err.message);
			return res.status(500).json({ message: "Failed to get response from OpenAI." });
		}

		user.chats.push(aiReply);
		await user.save();

		return res.status(200).json({ chats: user.chats });
	} catch (err) {
		console.error("Controller error:", err.message);
		return res.status(500).json({ message: "Internal Server Error", error: err.message });
	}
};



const getAllChats = async (req, res) => {
	try {
		const userId = res.locals?.jwtData?.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json({ message: "User not found or unauthorized." });
		}

		return res.status(200).json({ chats: user.chats || [] });
	} catch (err) {
		console.error("Get all chats error:", err.message);
		return res.status(500).json({ message: "Internal Server Error", error: err.message });
	}
};



const deleteAllChats = async (req, res) => {
	try {
		const userId = res.locals?.jwtData?.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json({ message: "User not found or unauthorized." });
		}

		user.chats = [];
		await user.save();

		return res.status(200).json({ message: "All chats deleted successfully.", chats: [] });
	} catch (err) {
		console.error("Delete chats error:", err.message);
		return res.status(500).json({ message: "Internal Server Error", error: err.message });
	}
};

module.exports = {
	generateChatCompletion,
	getAllChats,
	deleteAllChats,
};
