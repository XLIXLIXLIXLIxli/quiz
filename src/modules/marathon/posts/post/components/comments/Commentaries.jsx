import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import CommentMenu from "./CommentMenu";

export default function Commentaries({ post, IdAdmin }) {
  const pb = new PocketBase(process.env.REACT_APP_PB_URL);

  useEffect(() => {
    pb.collection("comments")
      .getList(1, 50, {
        filter: `idPost="${post.id}"`,
      })
      .then((value) => {
        setAllComments(value.items);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [comment, setComment] = useState("");

  const sendCommentButton = () => {
    pb.collection("comments")
      .create({
        idPost: post.id,
        message: comment,
        name: localStorage.getItem("name"),
        userId: localStorage.getItem("userId"),
      })
      .then((e) => setAllComments((prev) => [...prev, e]));
    setComment("");
  };

  const [allComments, setAllComments] = useState([]);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  return (
    <Box
      sx={{
        mt: "4px",
      }}
    >
      {(allComments.length !== 0 ||
        localStorage.getItem("role") !== "user") && (
        <Box
          sx={{
            backgroundColor: " rgba(255, 255, 255,0.5)",
            borderRadius: "10px",
            p: "4px 4px 0.1px 4px",

            mb: "4px",
          }}
        >
          {localStorage.getItem("role") === IdAdmin && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                height: "45px",
                bgcolor: "white",
                p: "4px",
                borderRadius: "6px",
                mb: "4px",
              }}
            >
              <InputBase
                sx={{ width: "100%", m: "4px" }}
                maxRows={"10"}
                placeholder="Написать замечание"
                inputProps={{ "aria-label": "Написать комментарий" }}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              <IconButton
                onClick={() => {
                  sendCommentButton();
                }}
              >
                <SendIcon sx={{}} />
              </IconButton>
            </Box>
          )}

          {allComments.map((comment) => (
            <Box
              key={comment.id}
              sx={{
                p: "10px",
                mb: "4px",
                bgcolor: "white",
                borderRadius: "6px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar
                    variant="rounded"
                    sx={{
                      backgroundColor: stringToColor(comment.name),
                    }}
                  >
                    {comment.name[0]}
                  </Avatar>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="subtitle1" component="div">
                        {comment.name}
                      </Typography>
                      <Typography variant="body2">{comment.message}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      ></Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {localStorage.getItem("userId") === comment.userId ||
                    localStorage.getItem("role") === IdAdmin ? (
                      <CommentMenu
                        pb={pb}
                        comment={comment}
                        allComments={allComments}
                        setAllComments={setAllComments}
                      />
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
