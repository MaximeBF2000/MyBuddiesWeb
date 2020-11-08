import React, { useState, useEffect, useRef } from "react"
import { useStore } from "../context/context"
import useFirestore from "../hooks/useFirestore"

import MessageHeader from "./MessageHeader"
import AddMessage from "./AddMessage"

export default function Messages() {
	const [updatedCurrentConv, setUpdatedCurrentConv] = useState(null)
	const { currentConversation, user } = useStore()
	const conversations = useFirestore("conversations")

	// START - Scroll to bottom on new message
	const endMsgRef = useRef(null)

	useEffect(() => {
		setTimeout(() => endMsgRef.current.scrollIntoView(), 500)
	}, [currentConversation])

	useEffect(() => {
		const _updatedCurrentConv = conversations.find(
			convo => convo?.id === currentConversation?.id
		)
		setUpdatedCurrentConv(_updatedCurrentConv)
		endMsgRef.current.scrollIntoView()
	}, [conversations, currentConversation])
	// END

	return (
		<div className="messageContainer">
			<MessageHeader />
			<div className="messages">
				{updatedCurrentConv?.messages?.map((msg, i) => (
					<div
						className={`singleMessage ${
							msg?.from.email === user.email ? "fromMe" : "fromOther"
						}`}
						key={i}
					>
						<span className="msgFrom">{msg?.from.name}</span>
						<p className="msgContent">{msg.content}</p>
					</div>
				))}
				<div ref={endMsgRef} />
			</div>
			<AddMessage />
		</div>
	)
}
