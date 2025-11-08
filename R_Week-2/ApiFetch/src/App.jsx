import React from "react";
import JokeFetcher from "./JokeFetcher";

const App = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #226595ff, #dc9e9eff)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <JokeFetcher />
    </div>
  );
};

export default App;
