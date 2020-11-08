import React from "react"
import { Modal } from "@material-ui/core"
import { useStore } from "../context/context"
import { fireStore } from "../hooks/firebase"
import DeleteIcon from "@material-ui/icons/Delete"

import AddUser from "./AddUser"

export default function DeleteConvModal({ isOpen, onClose }) {
	const { currentConversation, user, dispatch } = useStore()

	const deleteUser = userEmail => {
		fireStore
			.collection("conversations")
			.doc(currentConversation.id)
			.update({
				peopleIncluded: currentConversation?.peopleIncluded?.filter(
					people => people.email !== userEmail
				),
			})
			.then(() => {
				fireStore
					.collection("conversations")
					.doc(currentConversation.id)
					.get()
					.then(doc => {
						if (user.email === userEmail) {
							dispatch({
								type: "SET_CURRENT_CONVERSATION",
								payload: null,
							})
						} else {
							dispatch({
								type: "SET_CURRENT_CONVERSATION",
								payload: doc.data(),
							})
						}
					})
			})
	}

	return (
		<Modal className="modal managePeopleModal" open={isOpen} onClose={onClose}>
			<div className="box">
				<h3 className="modalTitle">People in the conversation</h3>
				<div className="peopleList">
					{currentConversation?.peopleIncluded?.map((people, i) => (
						<div className="peopleItem" key={i}>
							<div className="info">
								<div className="name">{people.name}</div>
								<div className="email">{people.email}</div>
							</div>
							<DeleteIcon
								className="deleteBtn"
								onClick={() => deleteUser(people.email)}
							/>
						</div>
					))}
				</div>
        <AddUser />
			</div>
		</Modal>
	)
}
