import { LocaleProvider } from "scripts/contexts/LocaleContext"
import { ThemeProvider } from "scripts/contexts/ThemeContext"

const BaseLayout = ({ children, localeContextValue, themeContextValue }) => {
    return (
        <LocaleProvider value={localeContextValue}>
            <ThemeProvider value={themeContextValue}>
                { children }
            </ThemeProvider>
        </LocaleProvider>
    )
}

export default  BaseLayout