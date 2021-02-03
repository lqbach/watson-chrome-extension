/*global chrome*/
import "./App.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

import { hot } from "react-hot-loader";

const App = (props) => {

  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default hot(module)(App);
