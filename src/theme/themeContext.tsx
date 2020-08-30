import React, { FC, useState } from "react";

interface IThemeContext {
  isDark: boolean;
  handleThemeChange(toDark: boolean): void;
}

export const ThemeContext = React.createContext<IThemeContext>({
  isDark: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleThemeChange: () => {},
});

const ThemeContextProvider: FC = (props) => {
  const [isDark, setIsDark] = useState(false);
  const handleThemeChange = (toDark: boolean) => {
    localStorage.setItem("isDark", `${toDark}`);
    setIsDark(toDark);
  };
  return (
    <ThemeContext.Provider
      value={{
        handleThemeChange,
        isDark,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
