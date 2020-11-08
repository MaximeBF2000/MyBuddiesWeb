import React, { useState } from "react"
import { useStore } from "../context/context"
import { fireStore } from "../hooks/firebase"

export default function AddUser() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const { currentConversation, user, dispatch } = useStore()

	const handleSubmit = e => {
    e.preventDefault()
    console.log({name, email})
		if (!(name && email))
			return alert("A user must have a name and a valid email adress")
		if (email === user.email)
			return alert("The user is already in the conversation")

		fireStore
			.collection("conversations")
			.doc(currentConversation.id)
			.update({
				peopleIncluded: [...currentConversation.peopleIncluded, { name, email }],
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
	}

	return (
		<form className="addUser" onSubmit={handleSubmit}>
			<input
				type="text"
				className="nameInput input"
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder="User display name..."
			/>
			<input
				type="text"
				className="mailInput input"
				value={email}
				onChange={e => setEmail(e.target.value)}
				placeholder="User email..."
			/>
			<button type="submit" className="submitBtn">
				Add user
			</button>
		</form>
	)
}
