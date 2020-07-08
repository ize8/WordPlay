import React from "react";
import { palette } from "../../../Utils/theme";

export const Word = React.memo(
  ({ entry, display, disabled, style = {}, onClick, fill }) => {
    return (
      <div
        onClick={disabled ? () => {} : onClick}
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
          backgroundColor: fill || palette.screenBackground,
          color: fill ? palette.selectedText : palette.textColor,
          ...style
        }}
      >
        <span>{entry ? entry[display] || "" : ""}</span>
      </div>
    );
  }
);
