import React from "react"
import { useStore } from "../context/context"

export default function ConversationItem({ conversation }) {
  const { dispatch } = useStore()

	const handleClick = () => {
    dispatch({ type: "SET_CURRENT_CONVERSATION", payload: conversation })
	}

	return (
		<div className="sidebarConversation" onClick={handleClick}>
			<img
				src={
					conversation?.img ||
					"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
				}
				alt="Picture of the conversation"
				className="conversationImg"
			/>
			<div className="conversationInfos">
				<div className="conversationTitle">{conversation?.title}</div>
				<p className="conversationLastText">
					{conversation?.messages[conversation?.messages.lenght - 1] ||
						"There is no message here."}
				</p>
			</div>
		</div>
	)
}
