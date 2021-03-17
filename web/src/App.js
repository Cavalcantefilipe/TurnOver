import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import GlobalStyles from "./styles/Global";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyles />
    </>
  );
}

export default App;