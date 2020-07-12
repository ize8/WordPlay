/* eslint-disable */
import React, { useState, useEffect } from "react";
import { FolderPlus } from "react-feather";
import Paper from "@material-ui/core/Paper";
import { ListItem } from "./ListItem";
import { AddVocabList } from "./AddVocabList";
import { palette } from "../../Utils/theme";

export const ListManager = ({
  database,
  activeIdList,
  changeActiveIdList,
  deleteWordList,
  addWordList,
  updateWordList,
  innerStyle
}) => {
  const style = {
    padding: "5px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: palette.panelBackground,
    color: palette.textColor,
    border: "1px solid gray",
    ...innerStyle
  };

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [toEdit, setToEdit] = useState(null);

  const onDelete = list => {
    if (
      window.confirm(
        `Do you really want to delete ${list.label} with ${
          list.list.length
        } entries?`
      )
    )
      deleteWordList(list);
  };

  const onAdd = () => setShowAddDialog(!showAddDialog);
  const onSaveVocabList = list => {
    if (list === null) console.log("...add cancelled...");
    else {
      if (!list.id) addWordList(list);
      else updateWordList(list);
    }
    setShowAddDialog(false);
    setToEdit(null);
  };
  const onEditList = id => () => {
    setToEdit(database.find(e => e.id === id));
    setShowAddDialog(true);
  };

  return (
    <>
      <Paper style={style}>
        {showAddDialog && (
          <AddVocabList
            saveVocabList={onSaveVocabList}
            initVocabList={toEdit}
          />
        )}
        <div
          onClick={onAdd}
          style={{
            marginBottom: "10px",
            padding: "3px",
            display: "flex",
            alignItems: "center",
            backgroundColor: palette.headerBackground,
            color: palette.textColor,
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          <FolderPlus style={{ marginRight: "5px" }} />
          <span>Add Vocab</span>
        </div>
        {database?.map(vocabList => {
          const isSelected = activeIdList.find(e => e == vocabList.id);
          return (
            <ListItem
              key={vocabList.id}
              item={vocabList}
              selected={isSelected}
              onEdit={onEditList(vocabList.id)}
              onDelete={() => onDelete(vocabList)}
              onSwapSelect={() =>
                changeActiveIdList(
                  isSelected
                    ? activeIdList.filter(e => e != vocabList.id)
                    : [...activeIdList, vocabList.id]
                )
              }
            />
          );
        })}
        <p>{database?.length == 0 ? "no" : database?.length} entries</p>
      </Paper>
    </>
  );
};
