import React from "react";
import { Smile } from "react-feather";

export const StartScreen = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>
        I hope that this simple app will make it more enjoyable for you to learn
        new words and expressions. Here, the main principles are simplicity and
        gamification. This app is intended to be used as a learning supplement
        and is not aiming to provide a comprehensive word-learning
        functionality!
      </p>
      <h3>
        Enjoy! <Smile color="darkorange" />
      </h3>
    </div>
  );
};
