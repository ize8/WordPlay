import React, { useState, useEffect } from "react";
import { Word } from "./Word";
import { motion } from "framer-motion";
import { palette } from "../../Utils/theme";
import { Slider } from "@material-ui/core";

export const Connect = ({ list, options }) => {
  const [order, setOrder] = useState();
  const [selected, setSelected] = useState([]);
  const [items, setItems] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [win, setWin] = useState(false);
  const [toRemove, setToRemove] = useState([]);
  const [wordCount, setWordCount] = useState(list.length < 5 ? list.length : 5);

  const variants = {
    active: { opacity: 1 },
    removed: { opacity: 0.1 }
  };

  const shuffle = my_arr => {
    var arr = JSON.parse(JSON.stringify(my_arr));
    var i = arr.length,
      k,
      temp;
    while (--i > 0) {
      k = Math.floor(Math.random() * (i + 1));
      temp = arr[k];
      arr[k] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  useEffect(() => {
    onResetGame();
  }, [list, options, wordCount]);

  const onResetGame = () => {
    const newDisplayList = shuffle(
      list.map(e => {
        let ret = {};
        options.forEach(name => {
          ret[name] = e[name];
        });
        return ret;
      })
    ).slice(0, wordCount);
    setDisplayList(newDisplayList);
    const myArray = newDisplayList.map((e, i) => i);
    let newOrder = options.map(e => shuffle(myArray));
    setWin(false);
    setToRemove([]);
    setSelected(options.map(e => null));
    setOrder(newOrder);
  };

  useEffect(() => {
    if (order && checkMatch()) {
      setToRemove([
        ...toRemove,
        ...options.map((e, i) => selected[i] * options.length + i)
      ]);
      setSelected(options.map(e => null));
    }
  }, [selected]);

  useEffect(() => {
    if (toRemove.length === options.length * displayList.length) setWin(true);
    else setWin(false);
  }, [toRemove]);

  useEffect(() => {
    if (order) {
      const newItems = order[0].map((e, i) =>
        options?.map((tag, j) => ({
          key: `${i}c${j}r${tag}`,
          entry: displayList[order[j][i]],
          display: tag,
          columnNumber: j,
          onClick: () => onClicked(j, i),
          fill: selected[j] === i ? palette.selected : null
        }))
      );
      const merged = [].concat.apply([], newItems);
      setItems(merged);
    }
  }, [order, selected, displayList]);

  const checkMatch = () => {
    if (selected.includes(null)) return false;
    const compareTo = displayList[order[0][selected[0]]].simp;
    for (var i = 1; i < options.length; i++) {
      if (displayList[order[i][selected[i]]].simp !== compareTo) return false;
    }
    return true;
  };

  const onClicked = (col, row) => {
    setSelected(selected.map((e, i) => (i === col ? row : e)));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Slider
        min={0}
        max={list.length < 20 ? list.length : 20}
        value={wordCount}
        step={1}
        marks
        valueLabelDisplay="on"
        onChange={(e, value) => setWordCount(value)}
      />
      <h3>
        {win ? (
          <span onClick={onResetGame} style={{ cursor: "pointer" }}>
            YOU WON!
          </span>
        ) : (
          `${
            order ? (items.length - toRemove.length) / options.length : 0
          } items left!`
        )}
      </h3>
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: `repeat(${options.length}, auto)`,
          gridColumnGap: "10px",
          justifyItems: "stretch",
          alignItems: "center"
        }}
      >
        {items.map((item, i) => (
          <motion.div
            animate={toRemove.includes(i) ? "removed" : "active"}
            key={item.key}
            variants={variants}
          >
            <Word
              disabled={toRemove.includes(i) ? true : false}
              entry={item?.entry}
              display={item?.display}
              columnNumber={item?.columnNumber}
              onClick={item?.onClick}
              fill={item?.fill}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
