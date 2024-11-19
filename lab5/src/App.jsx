import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)
  const [i,seti]=useState(0)
  return (
    <>
    
      <h1>Button {i} was clicked </h1>
      <div>
        <button onClick={() => {
          setCount((count) => count + 1)
          seti(1)
          }}>
          Click me  {count}
        </button>
          {(count % 2==0)?<p> Not Cliked </p> : <p> Cliked </p>}
      </div>
      <div>
        <button onClick={()=>seti(2)}>
            clickme
        </button>
      </div>
      <div>
        <button onClick={()=>seti(3)}>
            Button 3
        </button>
      </div>
      
    </>
  )
}

export default App
