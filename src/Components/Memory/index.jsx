import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Memory = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Memory Game ....
    </motion.div>
  );
};
