import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import DoneIcon from "@mui/icons-material/Done";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Tooltip from "@mui/material/Tooltip";

const Sort = ({ setModerated, moderated, setPage }) => {
  return (
    <Box
      sx={{
        backgroundColor: " rgba(255, 255, 255,0.1)",
        borderRadius: "8px",
      }}
    >
      <ToggleButtonGroup size="small" sx={{ p: "4px" }}>
        <Tooltip title="Принятые">
          <ToggleButton
            value="accepted"
            size="small"
            sx={
              moderated === '&& moderation = "Принят"'
                ? {
                    color: "rgba(0, 0, 0, 0.87)",
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                  }
                : { color: "white" }
            }
            onClick={() => {
              if (moderated === '&& moderation = "Принят"') {
                setModerated("");
                setPage(2);
              } else {
                setModerated('&& moderation = "Принят"');
                setPage(2);
              }
            }}
          >
            <DoneIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Ожидают проверки">
          <ToggleButton
            value="w8"
            sx={
              moderated === '&& moderation = "Ожидает проверки"'
                ? {
                    color: "rgba(0, 0, 0, 0.87)",
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                  }
                : { color: "white" }
            }
            onClick={() => {
              if (moderated === '&& moderation = "Ожидает проверки"') {
                setModerated("");
                setPage(2);
              } else {
                setModerated('&& moderation = "Ожидает проверки"');
                setPage(2);
              }
            }}
          >
            <AccessTimeOutlinedIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Не принятые">
          <ToggleButton
            value="Deny"
            sx={
              moderated === '&& moderation = "Не принят"'
                ? {
                    color: "rgba(0, 0, 0, 0.87)",
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                  }
                : { color: "white" }
            }
            onClick={() => {
              if (moderated === '&& moderation = "Не принят"') {
                setModerated("");
                setPage(2);
              } else {
                setModerated('&& moderation = "Не принят"');
                setPage(2);
              }
            }}
          >
            <DoDisturbAltIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Sort;
