import React, { useState, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { palette } from "../../Utils/theme";

export const GamePicker = ({ games, onSelect, selected }) => {
  const selectedGame = games.find(e => e.path === selected);
  const isSelectedValid = () => games.map(e => e.path).includes(selected);

  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <Tabs
        value={isSelectedValid() ? selected : "/"}
        onChange={(e, value) => {
          onSelect(value);
        }}
        indicatorColor="primary"
        textColor="primary"
        centered
        style={{ marginBottom: "10px" }}
      >
        <Tab
          label="home"
          value="/"
          key={"/"}
          style={{ color: palette.textColor }}
        />
        {games.map(e => (
          <Tab
            label={e.label}
            value={e.path}
            key={e.path}
            style={{ color: palette.textColor }}
          />
        ))}
      </Tabs>
      <span style={{ fontStyle: "italic", color: "gray" }}>
        {selectedGame
          ? selectedGame.desc
          : "Select a game to start practicing!"}
      </span>
    </div>
  );
};
