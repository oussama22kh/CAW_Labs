import { useState } from "react";

export default function Exo4() {
  const [params, setParams] = useState({
    width: 0,
    height: 0,
    bgColor: "#ffffff",
  });

  const [showDiv, setShowDiv] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDiv(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [id]: id === "width" || id === "height" ? Number(value) : value,
    }));
    console.log(params);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Exo 4</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "100px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "30px",
          }}
        >
          <label htmlFor="height">Height</label>
          <input
            id="height"
            value={params.height || ""}
            onChange={handleChange}
            type="number"
            placeholder="Enter height"
          />

          <label htmlFor="width">Width</label>
          <input
            id="width"
            value={params.width || ""}
            onChange={handleChange}
            type="number"
            placeholder="Enter width"
          />

          <label htmlFor="bgColor">Background Color</label>
          <input
            id="bgColor"
            value={params.bgColor}
            onChange={handleChange}
            type="color"
          />

          <button type="submit">Submit</button>
        </form>

        {showDiv && (
          <div
            style={{
              width: `${params.width}px`,
              height: `${params.height}px`,
              backgroundColor: params.bgColor,
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
