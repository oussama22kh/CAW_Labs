import { useState } from "react";

export default  function DisplayTab({table}) {
    const [tab, setTab] = useState(table);
    const remove = (key) => {
      let temp = tab.filter((item) => item !== tab[key]);
      setTab(temp);
    };
    return (
      <>
        <ul>
          {tab.map((i, key) => (
            <li key={key} onClick={() => remove(key)}>
              Element {key} is : {i}
            </li>
          ))}
        </ul>
      </>
    );
  };