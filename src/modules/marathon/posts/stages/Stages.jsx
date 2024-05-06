import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import Skeleton from "@mui/material/Skeleton";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Stages = ({
  setStages,
  setPage,
  stages,
  pb,
  lifehackLock,
  setLifehackLock,
  changePattrenLock,
  setChangePattrenLock,
  creative,
  setCreative,
  IdAdmin,
}) => {
  const [realtime, setRealtime] = React.useState();

  const paternTitle =
    changePattrenLock === true ? "будeт доступно после такого-то числа" : "";

  const creativeTitle =
    creative === true ? "будeт доступно после такого-то числа" : "";
  const [dataLoaded, setDataLoaded] = React.useState(false);

  React.useEffect(() => {
    pb.collection("stagesLock")
      .getFullList({ sort: "-stage" })
      .then((value) => {
        const lockValues = value.map((item) => item.lock);

        setLifehackLock(lockValues[0]);
        setCreative(lockValues[1]);
        setChangePattrenLock(lockValues[2]);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        setDataLoaded(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realtime]);

  React.useEffect(() => {
    pb.collection("stagesLock").subscribe("*", (e) => {
      setRealtime(e.record);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLifehackLockChange = (event) => {
    const updatedValue = event.target.checked;
    setLifehackLock(updatedValue);
    updatelifehackLock("lifehack", updatedValue);
  };

  const updatelifehackLock = (stageName, updatedValue) => {
    setLifehackLock(updatedValue);

    pb.collection("stagesLock")
      .update("zrtpv6z1bztvbjk", { lock: updatedValue })
      .catch((error) => {
        console.error(`Ошибка при обновлении значения "${stageName}":`, error);
      });
  };
  ///////////////////////////

  const handlePattern = (event) => {
    const updatedValue = event.target.checked;
    setChangePattrenLock(updatedValue);
    updatePattern("changePattren", updatedValue);
  };

  const updatePattern = (stageName, updatedValue) => {
    setChangePattrenLock(updatedValue);

    pb.collection("stagesLock")
      .update("tjoy5vcb3eur5d1", { lock: updatedValue })
      .catch((error) => {
        console.error(`Ошибка при обновлении значения "${stageName}":`, error);
      });
  };

  ///////////////////

  const handleCreative = (event) => {
    const updatedValue = event.target.checked;
    setCreative(updatedValue);
    updateCreative("creative", updatedValue);
  };

  const updateCreative = (stageName, updatedValue) => {
    setCreative(updatedValue);

    pb.collection("stagesLock")
      .update("9od6g5d5sycj766", { lock: updatedValue })
      .catch((error) => {
        console.error(`Ошибка при обновлении значения "${stageName}":`, error);
      });
  };

  function lifeHackIcon() {
    if (lifehackLock === true) {
      if (lifehackLock && changePattrenLock && creative) {
        return null;
      } else {
        return <LockClockOutlinedIcon />;
      }
    } else {
      return null;
    }
  }
  function changePattrenIcon() {
    if (changePattrenLock === true) {
      if (lifehackLock && changePattrenLock && creative) {
        return null;
      } else {
        return <LockClockOutlinedIcon />;
      }
    } else {
      return null;
    }
  }

  function CreativeIcon() {
    if (creative === true) {
      if (lifehackLock && changePattrenLock && creative) {
        return null;
      } else {
        return <LockClockOutlinedIcon />;
      }
    } else {
      return null;
    }
  }

  const changePattrenLockIcon = changePattrenIcon();
  const lifeHackLockIcon = lifeHackIcon();
  const creativeLockIcon = CreativeIcon();

  return (
    <Stack>
      <Stack alignItems="center" direction="column">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{ mb: "8px" }}
        >
          {dataLoaded ? (
            <Stack alignItems="center" sx={{ width: "20%" }} direction="column">
              <Button
                disabled={
                  !(lifehackLock && changePattrenLock && creative) &&
                  lifehackLock
                }
                size="large"
                sx={
                  stages !== "Lifehack"
                    ? {
                        minWidth: "140px",
                        backgroundColor: " rgba(255, 255, 255,0.1)",
                        borderRadius: "8px",
                      }
                    : {
                        minWidth: "140px",
                        backgroundColor: " rgba(0, 0, 0, 0.08)",
                        borderRadius: "8px",
                      }
                }
                onClick={() => {
                  if (stages === "Lifehack") {
                    setStages("");
                    setPage(2);
                  } else {
                    setStages("Lifehack");
                    setPage(2);
                  }
                }}
                variant="text"
                startIcon={lifeHackLockIcon}
              >
                Лайфхаки
              </Button>

              {localStorage.getItem("role") === IdAdmin && (
                <Switch
                  size="small"
                  checked={lifehackLock}
                  onChange={handleLifehackLockChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              )}
            </Stack>
          ) : (
            <Stack alignItems="center" sx={{ width: "20%" }} direction="column">
              <Skeleton
                sx={{ borderRadius: "8px" }}
                variant="rectangular"
                width={140}
                height={42.25}
              />

              {localStorage.getItem("role") === IdAdmin && (
                <Switch size="small" />
              )}
            </Stack>
          )}
          <Stack alignItems="center" sx={{ width: "45%" }} direction="column">
            {dataLoaded ? (
              <Stack
                alignItems="center"
                sx={{ width: "45%" }}
                direction="column"
              >
                <Tooltip title={paternTitle}>
                  <Box>
                    <Button
                      disabled={
                        !(lifehackLock && changePattrenLock && creative) &&
                        changePattrenLock
                      }
                      startIcon={changePattrenLockIcon}
                      size="large"
                      sx={
                        stages !== "ChangePattern"
                          ? {
                              backgroundColor: " rgba(255, 255, 255,0.1)",
                              borderRadius: "8px",
                              minWidth: "220px",
                            }
                          : {
                              backgroundColor: " rgba(0, 0, 0, 0.08)",
                              borderRadius: "8px",
                              minWidth: "220px",
                            }
                      }
                      onClick={() => {
                        if (stages === "ChangePattern") {
                          setStages("");
                          setPage(2);
                        } else {
                          setStages("ChangePattern");
                          setPage(2);
                        }
                      }}
                    >
                      Переделай шаблон
                    </Button>
                  </Box>
                </Tooltip>
                {localStorage.getItem("role") === IdAdmin && (
                  <Switch
                    size="small"
                    onChange={handlePattern}
                    checked={changePattrenLock}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                )}
              </Stack>
            ) : (
              <Stack
                alignItems="center"
                sx={{ width: "20%" }}
                direction="column"
              >
                <Skeleton
                  sx={{ borderRadius: "8px" }}
                  variant="rectangular"
                  width={220}
                  height={42.25}
                />

                {localStorage.getItem("role") === IdAdmin && (
                  <Switch size="small" />
                )}
              </Stack>
            )}
          </Stack>
          <Stack alignItems="center" sx={{ width: "20%" }} direction="column">
            {dataLoaded ? (
              <Stack
                alignItems="center"
                sx={{ width: "20%" }}
                direction="column"
              >
                <Tooltip title={creativeTitle}>
                  <Box>
                    <Button
                      size="large"
                      disabled={
                        !(lifehackLock && changePattrenLock && creative) &&
                        creative
                      }
                      startIcon={creativeLockIcon}
                      sx={
                        stages !== "Creative"
                          ? {
                              backgroundColor: " rgba(255, 255, 255,0.1)",
                              borderRadius: "8px",
                              minWidth: "140px",
                            }
                          : {
                              backgroundColor: " rgba(0, 0, 0, 0.08)",
                              borderRadius: "8px",
                              minWidth: "140px",
                            }
                      }
                      onClick={() => {
                        if (stages === "Creative") {
                          setStages("");
                          setPage(2);
                        } else {
                          setStages("Creative");
                          setPage(2);
                        }
                      }}
                    >
                      Креатив
                    </Button>
                  </Box>
                </Tooltip>
                {localStorage.getItem("role") === IdAdmin && (
                  <Switch
                    size="small"
                    onChange={handleCreative}
                    checked={creative}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                )}
              </Stack>
            ) : (
              <Stack
                alignItems="center"
                sx={{ width: "20%" }}
                direction="column"
              >
                <Skeleton
                  sx={{ borderRadius: "8px" }}
                  variant="rectangular"
                  width={120}
                  height={42.25}
                />

                {localStorage.getItem("role") === IdAdmin && (
                  <Switch size="small" />
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
        <Box>
          {lifehackLock && changePattrenLock && creative && dataLoaded ? (
            <Stack
              sx={{
                bgcolor: " rgba(0, 0, 0, 0.3)",

                borderRadius: "8px",
                p: 2,
                m: 1,
                width: "400px",
              }}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography sx={{ color: "white" }} variant="h5">
                Марафон завершен
              </Typography>
              <Typography sx={{ color: "white" }} variant="subtitle1">
                Добавлять посты больше не нужно
              </Typography>
              <br></br>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Typography sx={{ color: "white" }} variant="subtitle2">
                  Cпасибо за участие
                </Typography>
                <FavoriteBorderIcon
                  sx={{ color: "white" }}
                ></FavoriteBorderIcon>
              </Stack>
            </Stack>
          ) : (
            <></>
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default Stages;
