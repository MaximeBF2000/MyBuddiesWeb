export default (state, action) => {
	const { type, payload } = action

	switch (type) {
		case "SET_USER":
			return { ...state, user: payload }
		case "SET_CURRENT_CONVERSATION":
			return { ...state, currentConversation: payload }
		default:
			return state
	}
}
