import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Button from "@mui/material/Button";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PostForm from "./PostForm";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "550px",
  minHeight: "536px",

  boxShadow: 24,

  backgroundColor: "#404040",

  borderRadius: "14px",
};

export default function BasicModal({
  open,
  handleClose,
  handleOpen,
  rcd,
  handleSnackbarOpen,
  handlePostAdded,
  lifehackLock,
  creative,
  changePattrenLock,
  isSubmitDisabled,
  setIsSubmitDisabled,
}) {
  const [pos, setPos] = useState(window.pageYOffset);
  window.onscroll = () => setPos(window.pageYOffset);
  const [addStage, setaddStage] = useState("Lifehack");

  const [platform, setPlatform] = useState("");
  const [dialogLink, setDialogLink] = useState("");

  const handleChange = (event, newValue) => {
    setaddStage(newValue);
  };

  const [line, setLine] = useState(0);

  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
      }}
    >
      <div>
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            position: "fixed",
            bottom: "0px",
          }}
        >
          {pos >= 1500 ? (
            <IconButton
              size="large"
              onClick={() => window.scrollTo(0, 0)}
              sx={{
                backdropFilter: "blur(41px)",
                backgroundColor: " rgba(255, 255, 255,0.1)",
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
              }}
            >
              <ArrowUpwardIcon sx={{ color: " rgba(255, 255, 255,0.9)" }} />
            </IconButton>
          ) : (
            <div></div>
          )}

          {rcd.length === 0 ||
          (creative === true) &
            (lifehackLock === true) &
            (changePattrenLock === true) ? (
            <Box></Box>
          ) : (
            <Button
              size="large"
              onClick={handleOpen}
              sx={{
                backdropFilter: "blur(41px)",
                backgroundColor: " rgba(255, 255, 255,0.1)",
                borderRadius: "8px",
                boxShadow:
                  "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                p: 1.5,
              }}
              startIcon={<AddIcon />}
            >
              Добавить
            </Button>
          )}
        </Box>

        <Modal open={open} onClose={handleClose}>
          <Stack alignItems="center" sx={style}>
            <BottomNavigation
              showLabels
              value={line}
              onChange={(event, newValue) => {
                setLine(newValue);
              }}
              sx={{
                bgcolor: "#595959",
                mr: 2,
                ml: 2,
                mt: 1,
                p: 1,
                width: "520px",
                borderRadius: "8px",
              }}
            >
              <BottomNavigationAction
                sx={{
                  color: "#E0E0E0",
                  "&.MuiBottomNavigationAction-root.Mui-selected": {
                    color: "#F6E2A1",
                  },
                }}
                label="Голосовая линия"
                icon={<HeadsetMicIcon />}
              />

              <BottomNavigationAction
                sx={{
                  color: "#E0E0E0",
                  "&.MuiBottomNavigationAction-root.Mui-selected": {
                    color: "#F6E2A1",
                  },
                }}
                label="Чаты"
                icon={<QuestionAnswerIcon />}
              />
            </BottomNavigation>
            <Tabs
              sx={{
                ".css-1h1swpg-MuiTabs-indicator ": {
                  backgroundColor: "#EEDE9D",
                },
                ".css-1jrfnaf-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                  color: "#E0E0E0",
                },

                ".css-114an9f-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                  color: "#E0E0E0",
                },
              }}
              value={addStage}
              onChange={handleChange}
            >
              <Tab
                sx={{ color: "#E0E0E0" }}
                onClick={() => {
                  setaddStage("Lifehack");
                }}
                label="Лайфхаки"
                value="Lifehack"
                icon={
                  lifehackLock === true ? (
                    <LockClockOutlinedIcon></LockClockOutlinedIcon>
                  ) : (
                    <LockClockOutlinedIcon
                      sx={{ color: "#11ffee00" }}
                    ></LockClockOutlinedIcon>
                  )
                }
                iconPosition="top"
                disabled={lifehackLock}
              />
              <Tab
                sx={{ color: "#E0E0E0" }}
                onClick={() => {
                  setaddStage("ChangePattern");
                }}
                label="Переделай шаблон"
                value="ChangePattern"
                disabled={changePattrenLock}
                icon={
                  changePattrenLock === true ? (
                    <LockClockOutlinedIcon></LockClockOutlinedIcon>
                  ) : (
                    <LockClockOutlinedIcon
                      sx={{ color: "#11ffee00" }}
                    ></LockClockOutlinedIcon>
                  )
                }
                iconPosition="top"
              />
              <Tab
                sx={{ color: "#E0E0E0" }}
                onClick={() => {
                  setaddStage("Creative");
                }}
                label="Креативные диалоги"
                value="Creative"
                disabled={creative}
                iconPosition="top"
                icon={
                  creative === true ? (
                    <LockClockOutlinedIcon sx={{}}></LockClockOutlinedIcon>
                  ) : (
                    <LockClockOutlinedIcon
                      sx={{ color: "#11ffee00" }}
                    ></LockClockOutlinedIcon>
                  )
                }
              />
            </Tabs>

            <PostForm
              addStage={addStage}
              line={line}
              handleSnackbarOpen={handleSnackbarOpen}
              handlePostAdded={handlePostAdded}
              isSubmitDisabled={isSubmitDisabled}
              setIsSubmitDisabled={setIsSubmitDisabled}
              platform={platform}
              setPlatform={setPlatform}
              dialogLink={dialogLink}
              setDialogLink={setDialogLink}
            ></PostForm>
          </Stack>
        </Modal>
      </div>
    </Box>
  );
}
