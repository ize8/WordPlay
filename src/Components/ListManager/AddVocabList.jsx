import React, { useState, useEffect } from "react";
import { ChevronsRight } from "react-feather";
import Spinner from "react-svg-spinner";
import { DisplayVocabList } from "./DisplayVocabList";
import { searchDic } from "../../CEDICT-API";
import { Backdrop } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { TextField } from "@material-ui/core";

export const AddVocabList = ({ saveVocabList, initVocabList = null }) => {
  const [vocabList, setVocabList] = useState(null);
  const [rawText, setRawText] = useState("");
  const [rawList, setRawList] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setVocabList(initVocabList);
  }, [initVocabList]);

  useEffect(() => {
    const list = rawText
      .split(`\n`)
      .map(e => e.replace(/ /g, ""))
      .filter(e => e.length > 0);
    setRawList(list);
  }, [rawText]);

  const onProcess = async () => {
    setProcessing(true);
    const result = await searchDic(rawList);
    if (result == null) {
      console.log("error in CEDICT-API");
      return;
    }
    const mappedResult = result.map((e, i) => {
      if (e.match.simp !== "") return { ...e.match };
      return { ...e.match, simp: rawList[i] };
    });

    const needAppend = initVocabList != null || vocabList != null;
    const newList = {
      id: initVocabList ? initVocabList.id : null,
      label: needAppend ? initVocabList?.label : "",
      created: needAppend ? initVocabList?.created : new Date(),
      updated: new Date(),
      list: needAppend
        ? [...(vocabList ? vocabList?.list : []), ...mappedResult]
        : mappedResult
    };
    setProcessing(false);
    setVocabList(newList);
  };

  const onSave = () => {
    if (!vocabList) saveVocabList(null);
    else if (vocabList.label === "") alert("Please name your list!");
    else saveVocabList(vocabList);
  };

  return (
    <Backdrop
      open={true}
      style={{
        color: "#fff",
        zIndex: 3,
        overflowY: "auto",
        alignItems: "flex-start"
      }}
    >
      <Paper
        style={{
          top: "100px",
          zIndex: 15,
          margin: "15px",
          opacity: 1,
          borderRadius: 5,
          color: "black",
          backgroundColor: "lightgray",
          width: "auto",
          padding: "10px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              multiline
              variant="filled"
              rowsMax={20}
              label="生词（简体字）"
              style={{ width: "10rem", margin: "5px", fontSize: "16px" }}
              value={rawText}
              placeholder="single expression in every line please! (use ENTER)"
              onChange={e => setRawText(e.target.value)}
            />
            <Button onClick={() => setRawText("")}>Clear</Button>
          </div>
          <div
            onClick={onProcess}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "gainsboro",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "3px 3px 6px black"
            }}
          >
            <ChevronsRight />
            {processing ? (
              <Spinner color="salmon" size="30px" />
            ) : (
              <span>Add</span>
            )}
            <ChevronsRight />
          </div>
          <DisplayVocabList list={vocabList} updateList={setVocabList} />
        </div>
        <div style={{ padding: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ fontSize: "16px" }}
            onClick={onSave}
          >
            {vocabList?.id ? "Save" : "Create"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ fontSize: "16px" }}
            onClick={() => saveVocabList(null)}
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};
