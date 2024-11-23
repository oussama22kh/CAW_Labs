import { useState } from "react";
import DisplayTab from "./components/DisplayTab";
import Exo1 from "./components/Exo1";
import Exo3 from "./components/Exo3";
import Exo4 from "./components/Exo4";
function App() {
  return (
    <>
      <Exo1 />
      <div
        style={{
          border: "1px solid black",
          width: "full",
        }}
      ></div>
      <div id="Exo2">
        <h1>Exo2</h1>
        <DisplayTab table={["hello", "world", "from", "react"]} />
        <DisplayTab table={["hi", "from", "js"]} />
      </div>
      <div
        style={{
          border: "1px solid black",
          width: "full",
        }}
      ></div>
      <Exo3 />
      <div
        style={{
          border: "1px solid black",
          width: "full",
        }}
      ></div>
      <Exo4 />
    </>
  );
}

export default App;
