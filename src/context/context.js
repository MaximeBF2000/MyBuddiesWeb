import React, { createContext, useContext, useReducer } from "react"
import initialState from "./initState"
import reducer from "./reducer"

const GeneralContext = createContext(initialState)

export const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<GeneralContext.Provider value={{ ...state, dispatch }}>
			{children}
		</GeneralContext.Provider>
	)
}

export const useStore = () => useContext(GeneralContext)