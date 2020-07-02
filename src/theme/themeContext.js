import React, { useState } from "react";

export const ThemeContext = React.createContext({
  isDark: false,
  handleThemeChange: () => {},
});

const ThemeContextProvider = (props) => {
  const [isDark, setIsDark] = useState(false);
  const handleThemeChange = (toDark) => {
    localStorage.setItem("isDark", toDark);
    setIsDark(toDark);
  };
  return (
    <ThemeContext.Provider
      value={{
        handleThemeChange: handleThemeChange,
        isDark: isDark,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
