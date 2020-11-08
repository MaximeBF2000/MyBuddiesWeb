import React, { useState } from "react"
import { DeleteForever, Group } from "@material-ui/icons"
import { useStore } from "../context/context"
import { firebase } from "../hooks/firebase"

import DeleteConvModal from "./DeleteConvModal"
import ManagePeopleModal from "./ManagePeopleModal"

export default function MessageHeader() {
	const [peopleModalOpen, setPeopleModalOpen] = useState(false)
	const [deleteConvModalOpen, setDeleteConvModalOpen] = useState(false)
	const { currentConversation, dispatch } = useStore()

	const openPeopleModal = () => {
		if (currentConversation) {
			setPeopleModalOpen(true)
		}
	}
	const openDeleteConvModal = () => {
		if (currentConversation) {
			setDeleteConvModalOpen(true)
		}
	}
	const signOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => dispatch({ type: "SET_USER", payload: null }))
	}

	return (
		<>
			<div className="messagesHeader">
				<div className="convTitle">
					{currentConversation?.title || "No conversation selected"}
				</div>
				<div className="manageConv">
					<span title="Manage people in the group">
						<Group
							className="managePeopleBtn handleConvBtn"
							onClick={openPeopleModal}
						/>
					</span>
					<span title="Delete the conversation (irreversible)">
						<DeleteForever
							className="deleteConvBtn handleConvBtn"
							onClick={openDeleteConvModal}
						/>
					</span>
					<button className="logOutBtn" onClick={signOut}>
						Sign Out
					</button>
				</div>
			</div>
			<ManagePeopleModal
				isOpen={peopleModalOpen}
				onClose={() => setPeopleModalOpen(false)}
			/>
			<DeleteConvModal
				isOpen={deleteConvModalOpen}
				onClose={() => setDeleteConvModalOpen(false)}
			/>
		</>
	)
}
