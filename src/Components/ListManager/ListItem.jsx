import React from "react";
import { Trash2, Edit } from "react-feather";
import { Checkbox } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import { palette } from "../../Utils/theme";

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
      <Chip
        label={item.list.length}
        variant="outlined"
        size="small"
        style={{
          border: `1px solid ${palette.textColor}`,
          color: palette.textColor
        }}
      />
      <div>
        <Edit onClick={onEdit} style={{ cursor: "pointer" }} />
        <Trash2
          color={palette.alert}
          onClick={onDelete}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
