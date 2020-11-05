import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useInterval from "../hooks/use-interval.hook";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import { GameContext } from "./GameContext";

function App() {
  const { numCookies, setNumCookies, calculateCookiesPerSecond } = useContext(
    GameContext
  );

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond;

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;

    return () => {
      document.title = "Cookie Clicker Workshop";
    };
  }, [numCookies]);

  useEffect(() => {
    if (localStorage.getItem("userLeft")) {
      const lastSession = new Date(
        JSON.parse(localStorage.getItem("userLeft"))
      );
      const newSession = new Date();
      const timeDifference =
        (newSession.getTime() - lastSession.getTime()) / 1000;
      setNumCookies(
        numCookies + Math.floor(timeDifference * calculateCookiesPerSecond)
      );
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
