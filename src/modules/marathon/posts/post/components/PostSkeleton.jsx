import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo2 from "../../../../../images/logo2.svg";
import Button from "@mui/material/Button";

export default function PostSkeleton({
  rcd,
  handleOpen,
  moderated,
  lifehackLock,
  changePattrenLock,
  creative,
  IdAdmin,
}) {
  const [emptyTitle, setEmptyTitle] = useState();

  useEffect(() => {
    switch (moderated) {
      case '&& moderation = "Принят"':
        setEmptyTitle("Нет принятых диалогов");

        break;
      case '&& moderation = "Не принят"':
        setEmptyTitle("Нет не принятых постов");

        break;
      case '&& moderation = "Ожидает проверки"':
        setEmptyTitle("Нет постов, ожидающих модерации.");

        break;
      default:
        if (
          moderated !== '&& moderation = "Принят"' &&
          moderated !== '&& moderation = "Не принят"' &&
          moderated !== '&& moderation = "Ожидает проверки"'
        ) {
          if (
            rcd.filter((item) => {
              return (
                item.operator === localStorage.getItem("name") ||
                localStorage.getItem("role") === IdAdmin
              );
            }).length === 0
          ) {
            setEmptyTitle("Нет постов");
          }
        }
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moderated, rcd]);

  return (
    <Box>
      <Box sx={{ mt: "200px", minHeight: "700px" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: "300px",
          }}
        >
          <Box
            component="img"
            src={logo2}
            alt="img"
            sx={{
              mt: "-25px",
              pl: "13px",
              minHeight: "200px",
            }}
          ></Box>

          <Stack
            sx={{ pb: 2 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ color: "white" }} variant="h6">
              {emptyTitle}
            </Typography>

            {(creative === true) &
            (lifehackLock === true) &
            (changePattrenLock === true) ? (
              <></>
            ) : (
              <Box>
                {localStorage.getItem("role") !== IdAdmin && (
                  <Typography sx={{ color: "white" }} variant="subtitle2">
                    Чтобы добавить нажмите кнопку ниже.
                  </Typography>
                )}
              </Box>
            )}
          </Stack>

          {localStorage.getItem("role") !== IdAdmin &&
          (creative === true) &
            (lifehackLock === true) &
            (changePattrenLock === true) ? (
            <Box></Box>
          ) : (
            <Box>
              {localStorage.getItem("role") !== IdAdmin && (
                <Button
                  onClick={handleOpen}
                  size="large"
                  sx={{
                    backgroundColor: " rgba(255, 255, 255,0.1)",
                    borderRadius: "8px",
                  }}
                  variant="text"
                >
                  Добавить
                </Button>
              )}
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
