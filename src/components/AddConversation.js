import React, { useState } from "react"
import { useStore } from "../context/context"
import { fireStore } from "../hooks/firebase"
import { v4 as uuid } from "uuid"
import AddCircleIcon from "@material-ui/icons/AddCircle"

export default function AddConversation() {
	const [convName, setConvName] = useState("")
	const { user } = useStore()

	const handleSubmit = e => {
    e.preventDefault()
    const _id = uuid()
		fireStore.collection("conversations").doc(_id).set({
      id: _id,
			title: convName,
			photoUrl: "",
			peopleIncluded: [{ name: user.displayName, email: user.email }],
			messages: [],
		})
		setConvName("")
	}

	return (
		<form className="sidebarFooter" onSubmit={handleSubmit}>
			<input
				type="text"
				className="addConversationInput"
				placeholder="Add a new conversation here..."
				value={convName}
				onChange={e => setConvName(e.target.value)}
			/>
			<button type="submit" className="addConvSubBtn">
				<AddCircleIcon className="addConvSubIcon" fontSize="large" />
			</button>
		</form>
	)
}
