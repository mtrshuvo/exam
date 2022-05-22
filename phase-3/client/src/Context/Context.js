import {createContext, useReducer} from "react"
import { Reducer } from "./Reducer";
const Initial_values = {
    user:{}
}

export const Context = createContext(Initial_values);

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, Initial_values);

    return (
        <Context.Provider value={
            {
                
                dispatch
            }
            }>
            {children}
        </Context.Provider>
    )
}