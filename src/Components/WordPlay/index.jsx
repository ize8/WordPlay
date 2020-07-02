import React from "react";
import { motion } from "framer-motion";

const Letter = ({ letter }) => (
  <motion.h1
    animate={{
      scale: [0.9, 1.2, 1],
      color: ["#000000", "#AAAAAA", "#0000DD"]
    }}
    transition={{
      yoyo: Infinity,
      duration: Math.floor(Math.random() * 10 + 5),
      repeatDelay: Math.floor(Math.random() * 5)
    }}
    style={{
      fontFamily: "Courier New",
      padding: "5px",
      border: "1px solid gray",
      borderRadius: "5px"
    }}
  >
    {letter}
  </motion.h1>
);

export const WordPlay = () => {
  return (
    <div
      className="WordPlay"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {"WordPlay".split("").map((e, i) => (
        <Letter letter={e} key={`${i}${e}`} />
      ))}
    </div>
  );
};
