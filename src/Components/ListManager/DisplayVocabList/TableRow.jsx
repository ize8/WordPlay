import React, { useState, useEffect } from "react";
import { DisplayPinyin, InputPinyin } from "../../InputPinyin";
import { Save, Edit2, Trash2, XCircle } from "react-feather";

import { TableRow as MaterialRow } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { Input } from "@material-ui/core";

/*
你好
怎么样
厕所
粗食
*/

export const TableRow = (
  { row, updateData, color = true, tones = true },
  key
) => {
  const [editing, setEditing] = useState(false);
  const [pinyin, setPinyin] = useState(row?.pinyin);
  const [eng, setEng] = useState(row?.eng);
  const tdStyle = { padding: "5px", fontSize: "1rem" };

  const updateRow = () => {
    setEditing(false);
    updateData({
      ...row,
      pinyin: pinyin,
      eng: eng
    });
  };

  const deleteRow = () => {
    if (window.confirm(`Are you sure to delete ${row.simp} from the list?`)) {
      updateData(null);
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setPinyin(row?.pinyin);
  };

  useEffect(() => {}, [editing]);

  if (editing) {
    return (
      <MaterialRow key={key}>
        <TableCell style={{ padding: "2px", minWidth: "50px" }} align="center">
          <Save onClick={updateRow} />
          <XCircle color="salmon" onClick={cancelEdit} />
        </TableCell>
        <TableCell style={{ ...tdStyle, fontSize: "20px" }} align="center">
          {row?.simp}
        </TableCell>
        <TableCell style={{ ...tdStyle, minWidth: "200px" }} align="left">
          <InputPinyin value={pinyin} change={setPinyin} />
        </TableCell>
        <TableCell style={{ ...tdStyle, minWidth: "400px" }} align="left">
          <Input
            value={eng}
            multiline
            onChange={e => setEng(e.target.value)}
            style={{ width: "90%" }}
          />
        </TableCell>
      </MaterialRow>
    );
  } else
    return (
      <MaterialRow key={key}>
        <TableCell style={{ padding: "2px", minWidth: "50px" }} align="center">
          <Edit2 onClick={() => setEditing(true)} />
          <Trash2 color="salmon" onClick={deleteRow} />
        </TableCell>
        <TableCell
          style={{ ...tdStyle, fontSize: "20px", whiteSpace: "nowrap" }}
          align="center"
        >
          {row?.simp}
        </TableCell>
        <TableCell style={{ ...tdStyle, whiteSpace: "nowrap" }} align="center">
          <DisplayPinyin text={row?.pinyin} tones={tones} color={color} />
        </TableCell>
        <TableCell style={tdStyle} align="left">
          {row?.eng}
        </TableCell>
      </MaterialRow>
    );
};
