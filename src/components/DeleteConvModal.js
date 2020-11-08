import React from "react"
import { Modal, Button } from "@material-ui/core"
import { useStore } from "../context/context"
import { fireStore } from "../hooks/firebase"

export default function DeleteConvModal({ isOpen, onClose }) {
	const { currentConversation, dispatch } = useStore()

	const deleteConversation = () => {
		fireStore
			.collection("conversations")
			.doc(currentConversation.id)
			.delete()
			.then(() => {
				dispatch({ type: "SET_CURRENT_CONVERSATION", payload: null })
				onClose()
			})
	}

	return (
		<Modal className="modal deleteConvModal" open={isOpen} onClose={onClose}>
			<div className="box">
				<h3 className="modalTitle">
					Are you sure you want to delete the conversation :{" "}
					{currentConversation?.title}
				</h3>
				<div className="actionButtons">
					<Button
						className="button deleteBtn"
            onClick={deleteConversation}
            variant="outlined"
						color="primary"
					>
						Yes, Delete
					</Button>
					<Button
						className="button cancelBtn"
						onClick={() => onClose()}
						variant="outlined"
						color="secondary"
					>
						No, Cancel
					</Button>
				</div>
			</div>
		</Modal>
	)
}
