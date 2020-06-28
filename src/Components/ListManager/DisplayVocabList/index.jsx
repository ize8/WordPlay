import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { TableRow } from "./TableRow";

import { TextField } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { TableRow as MaterialRow } from "@material-ui/core";

const uuid = () => nanoid(10);

export const DisplayVocabList = ({ list, updateList }) => {
  const [useColors, setUseColors] = useState(true);
  const [useTones, setUseTones] = useState(true);
  const [title, setTitle] = useState("");

  const updateRow = index => {
    return newData => {
      let newList = list.list;
      if (newData === null) newList = newList.filter((e, i) => i !== index);
      else newList[index] = newData;
      updateList({
        ...list,
        list: newList
      });
    };
  };

  useEffect(() => {
    if (list) setTitle(list.label);
  }, [list?.label]);

  useEffect(() => {
    if (list !== null)
      updateList({
        ...list,
        label: title
      });
  }, [title]);

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "10px",
        marginTop: "10px",
        width: "50em"
      }}
    >
      {list == null ? (
        <p>Empty list...</p>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              marginBottom: "10px",
              alignItems: "center"
            }}
          >
            <div>
              <TextField
                variant="outlined"
                label="Title"
                type="text"
                placeholder="Give me a name!"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ fontSize: "16px", marginRight: "10px" }}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={useColors}
                  onChange={e => setUseColors(e.target.checked)}
                  color="primary"
                />
              }
              label="Colors"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={useTones}
                  onChange={e => setUseTones(e.target.checked)}
                  color="primary"
                />
              }
              label="Tones"
            />
            <div>
              <Chip
                label={`${list.list.length} entries`}
                variant="outlined"
                size="small"
              />
            </div>
          </div>
          <TableContainer
            component={Paper}
            style={{ maxHeight: "40rem", backgroundColor: "gainsboro" }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <MaterialRow>
                  <TableCell
                    style={{ backgroundColor: "black", color: "lightgray" }}
                  >
                    {" "}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ backgroundColor: "black", color: "lightgray" }}
                  >
                    中文
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ backgroundColor: "black", color: "lightgray" }}
                  >
                    PinYin
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ backgroundColor: "black", color: "lightgray" }}
                  >
                    English
                  </TableCell>
                </MaterialRow>
              </TableHead>
              <TableBody>
                {list?.list?.map((row, index) => (
                  <TableRow
                    key={uuid()}
                    row={row}
                    updateData={updateRow(index)}
                    color={useColors}
                    tones={useTones}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};
