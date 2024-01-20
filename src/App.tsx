/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./App.css";
import { Fonts } from "./Fonts";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Auth from "./components/Auth";
import { BarcodeReader } from "./view/BarcodeReaderView";

const theme = extendTheme({
  fonts: {
    heading: "Agbalumo",
    body: "Libre Baskerville",
  },
});

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Auth />} /> */}
          <Route path="/barcode" element={<BarcodeReader />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
