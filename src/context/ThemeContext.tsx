import React from 'react'

type InitialState = {
  theme: string
}

const initialState = {
  theme: 'light',
}

export const actions = {
  TOGGLE_THEME: 'TOGGLE_THEME',
}

export const ThemeContext = React.createContext<{ state: InitialState; dispatch: React.Dispatch<any> }>({
  state: initialState,
  dispatch: () => null,
})

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }
    default:
      return state
  }
}

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>
}
