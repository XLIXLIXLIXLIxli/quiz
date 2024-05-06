import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Grid from "@mui/material/Grid";

export default function BasicPopover({
  comment,
  setAllComments,
  allComments,
  pb,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deletecomm = () => {
    pb.collection("comments").delete(comment.id, { id: comment.id });

    const indexComment = allComments.indexOf(comment);

    setAllComments((prev) => {
      prev.splice(indexComment, 1);
      return [...prev];
    });
  };

  return (
    <div>
      <IconButton
        size="small"
        key={comment.id}
        onClick={handleClick}
        aria-label="delete"
      >
        <ClearIcon fontSize="inherit" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ m: 0.7 }}>Удалить</Typography>
        <Grid
          sx={{ p: 0.7 }}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            size="small"
            sx={{ m: 0.7 }}
            aria-describedby={id}
            variant="contained"
            onClick={deletecomm}
          >
            Да
          </Button>
          <Button
            size="small"
            sx={{ m: 0.7 }}
            aria-describedby={id}
            variant="contained"
            onClick={handleClose}
          >
            Нет
          </Button>
        </Grid>
      </Popover>
    </div>
  );
}
