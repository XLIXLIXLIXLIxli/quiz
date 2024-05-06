import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import Box from "@mui/material/Box";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useState } from "react";

export default function Alerts({ post, pb, IdAdmin }) {
  const publish = "Принят";
  const deny = "Не принят";
  const w8ToPublish = "Ожидает проверки";

  const toPublish = () => {
    pb.collection("posts")
      .update(post.id, {
        moderation: publish,
      })
      .then(() => {
        setMode(publish);
      });
  };

  const [mode, setMode] = useState(post.moderation);

  const refuseToPublish = () => {
    pb.collection("posts")
      .update(post.id, {
        moderation: deny,
      })
      .then(() => {
        setMode(deny);
      });
  };

  return (
    <Box
      sx={{
        mr: "4px",
        ml: "4px",
        mb: "4px",

        backgroundColor: " rgba(255, 255, 255,0.1)",

        borderRadius: "14px",
      }}
    >
      {mode === deny ? (
        <Alert
          icon={<NotInterestedIcon fontSize="inherit" />}
          sx={{ borderRadius: "6px" }}
          severity="error"
        >
          {mode}
        </Alert>
      ) : (
        <></>
      )}
      {mode === publish ? (
        <Alert
          icon={<DoneIcon fontSize="inherit" />}
          sx={{ borderRadius: "6px" }}
          severity="success"
        >
          {mode}
        </Alert>
      ) : (
        <></>
      )}
      {mode === w8ToPublish ? (
        <Alert
          icon={<AccessTimeOutlinedIcon fontSize="inherit" />}
          sx={{ borderRadius: "6px" }}
          action={
            <Stack direction="row" spacing={4}>
              <Box>
                <Button
                  onClick={refuseToPublish}
                  color="error"
                  size="small"
                  endIcon={<NotInterestedIcon />}
                >
                  Отказать
                </Button>
                <Button
                  onClick={toPublish}
                  color="success"
                  size="small"
                  endIcon={<DoneIcon />}
                >
                  Принять
                </Button>
              </Box>

              <></>
            </Stack>
          }
          severity="warning"
        >
          {mode}
        </Alert>
      ) : (
        <></>
      )}
    </Box>
  );
}
