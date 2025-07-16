export const detectCodeSnippet = (message) => {
	if (message.includes("```")) {
		const blocks = message.split("```");
		return blocks;
	}
};

export const isCodeBlock = (message) => {
	if (
		(message.includes("{") && message.includes("}")) ||
		(message.includes("[") && message.includes("]")) ||
		message.includes("#") ||
		message.includes(";")
	) {
		return true;
	}
	return false;
};

export const extractCodeNames = (message) => {
	const codeBlockRegex = /```([a-zA-Z0-9_]+)?([\s\S]*?)```/g;

	let matches;
	const codeNames = [];

	while ((matches = codeBlockRegex.exec(message)) !== null) {
		const codeName = matches[1] || ""; // Use empty string if language is missing
		codeNames.push(codeName);
	}

	return codeNames;
};
