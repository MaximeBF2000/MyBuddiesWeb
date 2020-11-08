import React from "react"
import { useStore } from "../context/context"
import useFirestore from "../hooks/useFirestore"

import ConversationItem from "./ConversationItem"
import AddConversation from "./AddConversation"

export default function Sidebar() {
	const { user } = useStore()
	const conversations = useFirestore("conversations")

	return (
		<aside className="sidebar">
			<div className="sidebarTop">
				<img
					src={
						user?.photoURL ||
						"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
					}
					alt="Profil picture"
					className="sidebarProfilPhoto"
				/>
				<h2 className="sidebarInfo">Welcome, {user?.displayName}</h2>
			</div>
			<div className="sidebarMain">
				{conversations.map((convo, i) => {
					if (convo?.peopleIncluded.find(people => people.email === user?.email)) {
						return (
							<ConversationItem
								conversation={convo}
								key={i}
							/>
						)
					}
				})}
			</div>
			<AddConversation />
		</aside>
	)
}
