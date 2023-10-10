import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Poll from "./Poll";

import { extendTheme, ChakraProvider, ColorModeScript } from "@chakra-ui/react";


const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: `'Lato', sans-serif`
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        background: "linear-gradient(to right, #043836, #011f1e, #011f1e)"
        // background: "#011f1e",
      },
    },
  },
});

// const theme = extendTheme({ colors })

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
