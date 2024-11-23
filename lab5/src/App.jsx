import { useState } from "react";
import DisplayTab from "./components/DisplayTab";
import Exo1 from "./components/Exo1";
function App() {
  return (
    <>
      <Exo1/>
      <div id="Exo2">
        <h1>Exo2</h1>
        <DisplayTab table={["hello", "world", "from", "react"]}/>
        <DisplayTab table={["hi", "from", "js"]}/>
      </div>
    </>
  );
}

export default App;
