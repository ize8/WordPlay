import React from "react";
import { Smile } from "react-feather";
import { motion } from "framer-motion";

export const StartScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Welcome!</h1>
      <p>
        I hope that this simple app will make more enjoyable for you to learn
        new words and expressions. Here, the main principles are simplicity and
        gamification. This app is only intended to be used as a learning
        supplement and is not aiming to provide comprehensive word-learning
        functionality!
      </p>
      <h3
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center"
        }}
      >
        Enjoy! <Smile color="darkorange" style={{ marginLeft: "5px" }} />
      </h3>
    </motion.div>
  );
};
