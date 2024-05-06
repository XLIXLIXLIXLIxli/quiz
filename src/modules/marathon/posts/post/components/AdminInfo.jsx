import Typography from "@mui/material/Typography";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ChatIcon from "@mui/icons-material/Chat";

export default function AdminInfo({ post, DateTime, dt, IdAdmin }) {
  let year = post.created.slice(2, 4);
  let month = post.created.slice(5, 7);
  let day = post.created.slice(8, 10);
  const authorChip = post.operator;

  useEffect(() => {
    switch (post.stage) {
      case "Lifehack":
        setChipTitle("Лайфхаки");

        break;
      case "ChangePattern":
        setChipTitle("Переделай шаблон");

        break;
      case "Creative":
        setChipTitle("Креатив");

        break;
      default:
    }
  }, [post.stage]);

  const [chipTitle, setChipTitle] = useState(post.stage);

  return (
    <Stack sx={{ bgcolor: "white", borderRadius: "6px", m: "2px" }}>
      <Stack justifyContent="space-between">
        <Stack
          sx={{ p: "4px" }}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={4}
        >
          {localStorage.getItem("role") === IdAdmin && (
            <>
              {post.typeOfSupport === 0 ? (
                <Tooltip title="Голосовая линия">
                  <HeadsetMicIcon sx={{ color: "#616161" }} />
                </Tooltip>
              ) : (
                <></>
              )}
              {post.typeOfSupport === 1 ? (
                <Tooltip title="Чаты">
                  <QuestionAnswerIcon sx={{ color: "#616161" }} />
                </Tooltip>
              ) : (
                <></>
              )}
            </>
          )}
          {post.dialogLink.length > 1 ? (
            <Tooltip title={post.dialogLink}>
              <Link
                sx={{ color: "#616161" }}
                href={post.dialogLink}
                underline="none"
                target="_blank"
              >
                <Typography sx={{ color: "#616161" }} variant="body2">
                  Ссылка
                </Typography>
              </Link>
            </Tooltip>
          ) : (
            <></>
          )}
          <Tooltip title="Дата создания">
            <Typography sx={{ color: "#616161" }} variant="body2">
              {day}.{month}.{year}
            </Typography>
          </Tooltip>
          {post.operator.length >= 1 &&
          localStorage.getItem("role") === IdAdmin ? (
            <Chip icon={<PersonIcon />} label={authorChip} sx={{}} />
          ) : (
            <div></div>
          )}
          {post.platform === "Платформа: SMS" ? (
            <Tooltip title="SMS">
              <InstagramIcon sx={{ color: "#616161" }} />
            </Tooltip>
          ) : (
            <></>
          )}
          {post.platform === "Chat" ? (
            <Tooltip title="Платформа: Чаты">
              <ChatIcon sx={{ color: "#616161" }} />
            </Tooltip>
          ) : (
            <></>
          )}
          <Tooltip title="Этап">
            <Chip label={chipTitle} />
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  );
}
