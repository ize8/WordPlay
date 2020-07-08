import React, { useState } from "react";
import { motion } from "framer-motion";

const Letter = ({ letter }) => {
  const [rotation, setRotation] = useState(0);
  return (
    <motion.h1
      onClick={() => setRotation(rotation === 0 ? 360 : 0)}
      initial={{ scale: 0.1 }}
      whileHover={{ scale: 1.2 }}
      animate={{
        scale: 1,
        color: ["#000000", "#AAAAAA", "#0000DD"],
        rotate: rotation
      }}
      transition={{
        color: {
          yoyo: Infinity,
          duration: Math.floor(Math.random() * 10 + 5),
          repeatDelay: Math.floor(Math.random() * 5)
        },
        default: {
          yoyo: false
        }
      }}
      style={{
        fontFamily: "Courier New",
        padding: "5px",
        border: "1px solid gray",
        borderRadius: "5px",
        boxShadow: "1px 1px 3px black",
        cursor: "pointer"
      }}
    >
      {letter}
    </motion.h1>
  );
};

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
