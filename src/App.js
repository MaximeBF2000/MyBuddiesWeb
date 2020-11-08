import "regenerator-runtime/runtime"
import React from "react"
import "./styles/App.scss"
import { useStore } from "./context/context"

import Login from "./components/Login"
import Sidebar from "./components/Sidebar"
import Messages from "./components/Messages"

export default function App() {
	const { user } = useStore()

	return (
		<>
			{user ? (
				<>
					<Sidebar />
					<Messages />
				</>
			) : (
				<Login />
			)}
		</>
	)
}
