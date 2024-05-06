import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import Card from "@mui/material/Card";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import TocIcon from "@mui/icons-material/Toc";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Header from "../header/Header";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import StarIcon from "@mui/icons-material/Star";

const pb = new PocketBase(process.env.REACT_APP_PB_URL);
const IdAdmin = process.env.REACT_APP_ADMIN_ID;

const columns = [
  {
    field: "rating",
    headerName: "Рейтинг",
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: "operator",
    headerName: "Оператор",
    width: 280,
  },
  {
    field: "Accepted",
    renderHeader: () => <DoneIcon />,
    width: 80,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: "w8",
    renderHeader: () => <AccessTimeOutlinedIcon />,
    width: 80,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: "deny",
    renderHeader: () => <DoDisturbAltIcon />,
    width: 80,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
];

export default function DataGridDemo({ setFirst }) {
  const [tableUsers, settableUsers] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    pb.collection("posts")
      .getFullList({ sort: "-created" })
      .then((value) => {
        settableUsers(value);
        const userRatings = value.reduce((acc, record) => {
          const { operator, rate } = record;
          if (acc[operator]) {
            acc[operator] += rate.finalRate;
          } else {
            acc[operator] = rate.finalRate;
          }
          return acc;
        }, {});
        setRatings(userRatings);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const w8 = tableUsers.reduce((acc, record) => {
    if (record.moderation === "Ожидает проверки") {
      acc[record.operator] = acc[record.operator]
        ? acc[record.operator] + 1
        : 1;
    }
    return acc;
  }, {});

  const accepted = tableUsers.reduce((acc, record) => {
    if (record.moderation === "Принят") {
      acc[record.operator] = acc[record.operator]
        ? acc[record.operator] + 1
        : 1;
    }
    return acc;
  }, {});

  const deny = tableUsers.reduce((acc, record) => {
    if (record.moderation === "Не принят") {
      acc[record.operator] = acc[record.operator]
        ? acc[record.operator] + 1
        : 1;
    }
    return acc;
  }, {});

  const users = tableUsers.reduce((acc, record) => {
    acc[record.operator] = acc[record.operator] ? acc[record.operator] + 1 : 1;

    return acc;
  }, {});

  const rows = Object.keys(users).map((operator) => {
    const record = tableUsers.find((record) => record.operator === operator);

    return {
      id: record.operatorId,
      operator: operator,
      Accepted: accepted[operator] || 0,
      w8: w8[operator] || 0,
      deny: deny[operator] || 0,
      rating: ratings[operator] || 0,
    };
  });

  const myRate = () => {
    const operator = localStorage.getItem("name");
    const userRating = ratings[operator] || 0;
    return userRating;
  };

  const topUsers = Object.keys(accepted)
    .sort((a, b) => accepted[b] - accepted[a])
    .slice(0, 5)
    .map((operator) => {
      const record = tableUsers.find((record) => record.operator === operator);
      return {
        operator: operator,
        accepted: accepted[operator],
        id: record.operatorId,
      };
    });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        ml: "auto",
        mr: "auto",
        width: "650px",
        minHeight: "100vh",
        height: "auto",
        p: 1,
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(41px)",
      }}
    >
      <Header setFirst={setFirst} pb={pb}></Header>
      <Box
        sx={{
          width: "650px",
          ml: "auto",
          mr: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1000px",
            mt: 1,
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              pt: 0.5,
              pr: 0.25,
              pl: 0.25,
            }}
          >
            <Box>
              <Stack
                direction="column"
                justifyContent="space-around"
                alignItems="center"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  key={topUsers.id}
                  justifyContent="space-around"
                >
                  {topUsers.map((user, index) => {
                    return (
                      <Card
                        sx={{
                          width: "118px",
                          height: "118px",
                          backgroundColor: " rgba(0, 0, 0,0.3)",
                          p: 0.5,
                          borderRadius: "5px",
                          mr: 0.25,
                          ml: 0.25,
                        }}
                        key={user.id}
                      >
                        <CardContent
                          sx={{
                            borderRadius: "2.5px",
                            p: 0.25,
                          }}
                        >
                          <Typography>
                            <EmojiEventsTwoToneIcon
                              sx={{
                                color:
                                  index === 0
                                    ? "#FFD700"
                                    : index === 1
                                    ? "#C0C0C0"
                                    : index === 2
                                    ? "#CD7F32"
                                    : "rgba(205, 214, 219, 0)",
                              }}
                            />
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "white",
                            }}
                          >
                            {user.operator}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Stack>
              </Stack>
            </Box>
            {localStorage.getItem("role") !== IdAdmin && (
              <Stack
                sx={{
                  p: 1,
                  mt: 1,
                  backgroundColor: " rgba(0, 0, 0,0.3)",
                  borderRadius: "6px",
                  width: "35%",
                }}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <Typography sx={{ color: "white" }}>
                  Сумма моих баллов: {myRate()}
                </Typography>
                <StarIcon sx={{ color: "#faaf00", pb: 0.3 }}></StarIcon>
              </Stack>
            )}
            <Box
              sx={{
                mt: 1,
                backgroundColor: " rgba(0, 0, 0,0.3)",
                borderRadius: "6px",
              }}
            >
              <ListItemButton
                sx={{ borderRadius: "6px 6px 0px 0px " }}
                onClick={handleClick}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                  }}
                >
                  <TocIcon sx={{}} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: "white",
                  }}
                  primary="Таблица со всеми пользователями"
                />
                {open ? (
                  <ExpandLess
                    sx={{
                      color: "white",
                    }}
                  />
                ) : (
                  <ExpandMore sx={{ color: "white" }} />
                )}
              </ListItemButton>

              <Collapse in={open} timeout="auto">
                <DataGrid
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "rating", sort: "desc" }],
                    },
                  }}
                  sx={{
                    border: "0",
                    p: 1,
                    color: "white",
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                      outline: "none !important",
                    },
                    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within":
                      {
                        outline: "none !important",
                      },
                    "& .MuiDataGrid-iconSeparator": {
                      display: "none",
                    },

                    "& .MuiSvgIcon-root  ": {
                      color: "white ",
                    },
                    height: "70vh",

                    "&      .-MuiDataGrid-virtualScroller  ": {
                      overflowY: "auto",
                    },
                    "& ::-webkit-scrollbar": { display: "none" },

                    "& .MuiDataGrid-overlay": {
                      backgroundColor: "rgba(255, 0, 0, 0)",
                    },
                  }}
                  pagination
                  hideFooter
                  disableColumnSelector
                  rows={rows}
                  columns={columns}
                  disableSelectionOnClick
                />
              </Collapse>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
