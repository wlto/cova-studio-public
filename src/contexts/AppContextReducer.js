const AppContextReducer = (state, action) => {
  switch (action.type) {
    case `TOGGLE_MENU`:
      return {
        ...state,
        menuVisible: !state.menuVisible
      }
    case `OPEN_MENU`:
      return {
        ...state,
        menuVisible: true
      }
    case `CLOSE_MENU`:
      return {
        ...state,
        menuVisible: false
      }
    case `TURN_OFF_INITIAL_LOAD`:
      return {
        ...state,
        initialLoad: false
      }
    default:
      return {
        ...state
      }
  }
}

export default AppContextReducer