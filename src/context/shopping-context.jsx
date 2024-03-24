import reducer, { initState } from "../reducer/reducer";

const { createContext, useReducer } = require("react");

export const ShoppingContext = createContext()
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState)
    return (
        <ShoppingContext.Provider value={{ state, dispatch }}>
            {children}
        </ShoppingContext.Provider>
    )
}
export default Provider