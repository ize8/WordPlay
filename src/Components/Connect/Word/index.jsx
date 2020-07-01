import React, { useRef, useEffect, useState } from "react";

export const Word = ({
  entry,
  display,
  disabled,
  style = {},
  onClick,
  fill
}) => {
  const targetRef = useRef();
  const [dim, setDim] = useState();

  useEffect(() => {
    const dimensions = targetRef.current.getBoundingClientRect().toJSON();
    if (dimensions) {
      setDim(dimensions);
    }
  }, []);

  return (
    <div
      onClick={disabled ? () => {} : onClick}
      ref={targetRef}
      style={{
        margin: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        border: "1px solid gray",
        borderRadius: "10px",
        boxShadow: disabled ? null : "3px 3px 6px black",
        maxWidth: "300px",
        cursor: disabled ? null : "pointer",
        backgroundColor: fill || "gainsboro",
        ...style
      }}
    >
      <span>{entry ? entry[display] || "" : ""}</span>
    </div>
  );
};
