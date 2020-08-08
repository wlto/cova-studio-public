import React, { useReducer } from "react"
import AppContextReducer from "./AppContextReducer"

const AppContext  = React.createContext()
const initialState = {
  menuVisible: false,
  initialLoad: true
}

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppContextReducer, initialState)

  return (
    <AppContext.Provider value={{state, dispatch}} >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }