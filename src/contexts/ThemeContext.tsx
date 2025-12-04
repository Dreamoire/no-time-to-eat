import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ThemeState = {
	theme: boolean;
	setTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeState>({
	theme: false,
	setTheme: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<boolean>(false);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	return useContext(ThemeContext);
};
