import React, { ChangeEvent } from "react";
import { Trash2, Edit } from "react-feather";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

export const ListItem = ({
  item,
  selected,
  onSwapSelect,
  onDelete,
  onEdit
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Checkbox
        checked={selected === undefined ? false : true}
        onChange={onSwapSelect}
        color="primary"
      />

      <span>{item.label}</span>
      <Chip label={item.list.length} variant="outlined" size="small" />
      <div>
        <Edit onClick={onEdit} style={{ cursor: "pointer" }} />
        <Trash2
          color="salmon"
          onClick={onDelete}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
