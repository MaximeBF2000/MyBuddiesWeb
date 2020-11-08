import React from "react"
import { useStore } from "../context/context"
import { firebase, GoogleAuthProvider } from "../hooks/firebase"

export default function Login() {
  const { dispatch } = useStore()

	const login = async () => {
		try {
      const res = await firebase.auth().signInWithPopup(GoogleAuthProvider)
      dispatch({ type: "SET_USER", payload: res.user })
    } catch (err) {
      console.error(err.message)
    }
	}

	return (
		<div className="login">
			<div className="box">
				<h1 className="title">MyBuddies Web - Login</h1>
				<button className="loginBtn" onClick={login}>
					Login with Google
				</button>
			</div>
		</div>
	)
}
