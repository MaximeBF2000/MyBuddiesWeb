import React, { useState } from "react"
import { AddCircle } from "@material-ui/icons"
import { fireStore } from "../hooks/firebase"
import { useStore } from "../context/context"

export default function AddMessage() {
	const [message, setMessage] = useState("")
	const { currentConversation, user, dispatch } = useStore()

	const handleSubmit = e => {
		e.preventDefault()
		if (message) {
			if (currentConversation) {
				fireStore
					.collection("conversations")
					.doc(currentConversation.id)
					.update({
						messages: [
							...currentConversation.messages,
							{
								from: {
									name: currentConversation?.peopleIncluded.find(
										people => people.email === user.email
									).name,
									email: user.email,
								},
								content: message,
							},
						],
					})
					.then(() => {
						fireStore
							.collection("conversations")
							.doc(currentConversation.id)
							.get()
							.then(doc => {
								dispatch({
									type: "SET_CURRENT_CONVERSATION",
									payload: doc.data(),
								})
							})
					})
				setMessage("")
			} else {
				alert("You need to be in a conversation to write a message")
			}
		}
	}

	return (
		<form className="messageFooter" onSubmit={handleSubmit}>
			<input
				type="text"
				className="addMessageInput"
				placeholder="Add a new message here..."
				value={message}
				onChange={e => setMessage(e.target.value)}
			/>
			<button type="submit" className="addMsgSubBtn">
				<AddCircle className="addMsgSubIcon" fontSize="large" />
			</button>
		</form>
	)
}
