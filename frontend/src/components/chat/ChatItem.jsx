import ReactMarkdown from 'react-markdown';
import reactGFM from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import styles from "./ChatItem.module.css";
import 'highlight.js/styles/atom-one-dark.css';

import botIcon from "/logos/bot.png";
import { useAuth } from "../../context/AuthContext";

const ChatItem = (props) => {
	const auth = useAuth();

	const botMsg = (
		<div className={`${styles.parent} ${styles.bot_parent}`}>
			<div className={styles.avatar}>
				<img src={botIcon} alt="chat bot icon" />
			</div>
			<div className={`${styles.msg} markdown-body`}>
				<ReactMarkdown remarkPlugins={[reactGFM]} rehypePlugins={[rehypeHighlight]}>
					{props.content}
				</ReactMarkdown>
			</div>
		</div>
	);

	const userMsg = (
		<div className={`${styles.parent} ${styles.user_parent}`}>
			<div className={`${styles.avatar} ${styles.user_avatar}`}>
  				{auth?.user?.name?.split(" ")[0]?.[0] || ""}
  				{auth?.user?.name?.split(" ")[1]?.[0] || ""}
			</div>

			<div className={styles.msg}>
				<p>{props.content}</p>
			</div>
		</div>
	);

	return (
		<>
			{props.role === "assistant" && botMsg}
			{props.role === "user" && userMsg}
		</>
	);
};

export default ChatItem;
