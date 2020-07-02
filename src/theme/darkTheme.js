const darkTheme = {
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  props: {
    MuiTextField: {
      variant: "outlined",
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#005CAF",
    },
    secondary: {
      main: "#566C73",
    },
    error: {
      main: "#C1328E",
    },
    warning: {
      main: "#8B81C3",
    },
    info: {
      main: "#2EA9DF",
    },
    success: {
      main: "#00AA90",
    },
    background: {
      default: "#08192D",
      paper: "#0F2540",
    },
  },
};

export default darkTheme;
