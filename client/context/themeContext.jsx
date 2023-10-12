import { createContext, useState } from "react";
import { log } from "react-modal/lib/helpers/ariaAppHider";


const ThemeContext = createContext()

const ThemeContextProvider = props => {

    const { children } = props

    const [theme, setTheme] = useState("day")

    const handleTheme = () => {
        if(theme === "day"){
            setTheme("night")
        } else if (theme === "night"){
            setTheme("day")
        }
    }

return (
<ThemeContext.Provider
value={{handleTheme}}>
    
    {children}

</ThemeContext.Provider>
)
}
 
export {ThemeContextProvider, ThemeContext}