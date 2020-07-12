/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import {
  markMe as getPinyinWithTones,
  getPin,
  getTone,
  putMark,
  splitPinyin
} from "./Pinyin";
import { Clipboard, Check } from "react-feather";
import { Input } from "@material-ui/core";

const uuid = () => nanoid(10);

const onlyValidPinyin = s =>
  [...s]
    .map(ch => ch.match(/[a-z]|[1-5]|[.,!?:]|\s/))
    .reduce((prev, curr) => (curr ? prev + curr : prev), "");

const pinyinColors = ["black", "blue", "darkorange", "red", "green", "black"];

export const DisplayPinyin = ({
  text,
  tones = true,
  color = true,
  innerStyle = {}
}) => {
  if (!text || text === "") return null;
  const pinyin = splitPinyin(onlyValidPinyin(text));
  const getColoredPinyin = () => {
    return pinyin.map(curr => {
      const tone = getTone(curr);
      const pin = getPin(curr);
      const col = color ? pinyinColors[tone] : "black";
      return (
        <span key={uuid()} style={{ color: col, ...innerStyle }}>
          {tones ? putMark(`${pin}${tone}`) + " " : `${curr} `}
        </span>
      );
    }, null);
  };
  if (text === "") return null;
  return <>{getColoredPinyin()}</>;
};

export const InputPinyin = ({ value, change, style = {} }) => {
  const [inFocus, setInFocus] = useState(false);
  const textInput = useRef(null);
  const [success, setSuccess] = useState(false);
  const [iconSize, setIconSize] = useState(25);

  const onChange = e => change(onlyValidPinyin(e.target.value.toLowerCase()));
  const onFocus = () => setInFocus(true);
  const onBlur = () => setInFocus(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(getPinyinWithTones(value));
    setSuccess(true);
  };

  useEffect(() => {
    if (success) setTimeout(() => setSuccess(false), 500);
  }, [success]);

  useEffect(() => {
    //setIconSize(textInput.current.getBoundingClientRect().height * 0.7);
  }, []);

  const iconStyle = {
    alignSelf: "center"
  };

  return (
    <div style={{ display: "flex" }}>
      <Input
        ref={textInput}
        type="text"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="pin1yin1"
        value={inFocus ? value : getPinyinWithTones(value)}
      />

      {success ? (
        <Check size={iconSize} color="#3bb44a" style={iconStyle} />
      ) : (
        <Clipboard size={iconSize} onClick={onCopy} style={iconStyle} />
      )}
    </div>
  );
};
