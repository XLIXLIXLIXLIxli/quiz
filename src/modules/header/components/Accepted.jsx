import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

const Accepted = ({ pb, open }) => {
  const myName = localStorage.getItem("name");

  const [acceptedDialogues, setAcceptedDialogues] = useState([]);
  const [w8Dialogues, setW8Dialogues] = useState([]);

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#579656",
        height: "40px",
        width: "40px",
        borderRadius: "8px",
        fontSize: 16,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  useEffect(() => {
    pb.collection("posts")
      .getFullList({
        filter: `operatorId = "${localStorage.getItem("userId")}"`,
        $autoCancel: false,
      })
      .then((value) => {
        setAcceptedDialogues(
          value.filter((value) => value.moderation === "Принят")
        );
        setW8Dialogues(
          value.filter((value) => value.moderation === "Ожидает проверки")
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        p: 0.5,
      }}
    >
      <Avatar {...stringAvatar(myName)} />
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: "8px",
          height: "32px",
          p: "4px",
          ml: "4px",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Typography
            sx={{ fontSize: 12, color: "white", ml: "4px", mr: "4px" }}
          >
            {myName.split(" ")[0]} {myName.split(" ")[1]}
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              color: "white",
              ml: "4px",
              mr: "4px",
              minWidth: "126px",
            }}
            variant="body2"
          >
            {acceptedDialogues.length} принято {w8Dialogues.length} на проверке
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Accepted;
