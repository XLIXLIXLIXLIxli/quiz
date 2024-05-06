import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import Sort from "./components/Sort";
import Accepted from "./components/Accepted";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect } from "react";

export default function Header({
  setFirst,
  setModerated,
  alignment,
  setPage,
  pb,
  moderated,
  operatorSearchInput,
  findOperator,
  setadminSorting,
  setOperatorSearchInput,
  open,
  fetchPostsAdmin,
}) {
  useEffect(() => {
    if (operatorSearchInput) {
      fetchPostsAdmin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operatorSearchInput]);

  return (
    <>
      {localStorage.getItem("role") === process.env.REACT_APP_ADMIN_ID ? (
        <Box sx={{ display: "flex", justifyContent: "center", zIndex: 15 }}>
          <Stack
            direction="row"
            sx={{
              display: "flex",

              width: "650px",
              zIndex: 15,
            }}
            justifyContent="space-between"
          >
            <Box
              sx={{ bgcolor: " rgba(255, 255, 255,0.1)", borderRadius: "8px" }}
            >
              <Link to="/marathon" className="Link">
                <Box
                  component="img"
                  src={logo}
                  alt="img"
                  sx={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "5px",
                    pr: 0.5,

                    pl: 0.5,
                    pt: 0.5,
                  }}
                ></Box>
              </Link>
            </Box>

            {document.location.pathname === "/marathon" ? (
              <Sort
                setPage={setPage}
                alignment={alignment}
                setModerated={setModerated}
                moderated={moderated}
              />
            ) : (
              <> </>
            )}
            {document.location.pathname === "/marathon" ? (
              <Box
                sx={{
                  backgroundColor: "#00000033",
                  borderRadius: "8px",
                  p: "4px",
                }}
              >
                <Autocomplete
                  disablePortal
                  size="small"
                  color="primary"
                  id="combo-box-demo"
                  sx={{
                    width: "150px",
                    backgroundColor: "#00000033",
                    borderRadius: "4px",
                    border: "0 !important",
                  }}
                  options={findOperator}
                  inputValue={operatorSearchInput}
                  onInputChange={(event, newInputValue) => {
                    setOperatorSearchInput(newInputValue);
                    setadminSorting(`operator~"${newInputValue}"`);
                  }}
                  popupIcon={<ArrowDropDownIcon sx={{ color: "grey" }} />}
                  renderInput={(params) => (
                    <TextField
                      sx={{ border: "0 !important" }}
                      {...params}
                      label="Поиск"
                      InputLabelProps={{
                        style: { color: "#FFFFFF80" },
                      }}
                      inputProps={{
                        ...params.inputProps,
                        style: { color: "white" },
                      }}
                    />
                  )}
                />
              </Box>
            ) : (
              <> </>
            )}

            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {(document.location.pathname === "/marathon" ||
                document.location.pathname === "/quiz") && (
                <Link to="/moderation" className="Link">
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: " rgba(255, 255, 255,0.1)",
                      borderRadius: "8px",
                      width: "90px",
                      height: "48px",
                    }}
                    variant="text"
                  >
                    Рейтинг
                  </Button>
                </Link>
              )}
              {(document.location.pathname === "/moderation" ||
                document.location.pathname === "/quiz") && (
                <Link to="/marathon" className="Link">
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: " rgba(255, 255, 255,0.1)",
                      borderRadius: "8px",
                      width: "90px",
                      height: "48px",
                    }}
                    variant="text"
                  >
                    Все посты
                  </Button>
                </Link>
              )}
              {document.location.pathname !== "/quiz" && (
                <Link to="/quiz" className="Link">
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: " rgba(255, 255, 255,0.1)",
                      borderRadius: "8px",
                      width: "90px",
                      height: "48px",
                    }}
                    variant="text"
                  >
                    Тесты
                  </Button>
                </Link>
              )}
              <Link to="/login">
                <IconButton
                  onClick={() => {
                    setFirst((prev) => !prev);
                    localStorage.removeItem("token");
                  }}
                  sx={{
                    backgroundColor: " rgba(255, 255, 255,0.1)",
                    borderRadius: "8px",
                    height: "48px",
                    width: "48px",
                  }}
                >
                  <LogoutIcon sx={{ color: "white" }} />
                </IconButton>
              </Link>
            </Stack>
          </Stack>
        </Box>
      ) : (
        // user     // user    // user    // user    // user    // user    // user    // user    // user    // user    // user    // user    // user    // user    // user    // user
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack
            direction="row"
            sx={{
              display: "flex",

              width: "650px",
            }}
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1.5}
            >
              <Box
                sx={{
                  bgcolor: " rgba(255, 255, 255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Link to="/marathon" className="Link">
                  <Box
                    component="img"
                    src={logo}
                    alt="img"
                    sx={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "5px",
                      pr: 0.5,

                      pl: 0.5,
                      pt: 0.5,
                    }}
                  ></Box>
                </Link>
              </Box>
              {document.location.pathname !== "/quiz" && (
                <Accepted open={open} pb={pb}></Accepted>
              )}
            </Stack>
            {document.location.pathname === "/marathon" ? (
              <Sort
                alignment={alignment}
                setModerated={setModerated}
                moderated={moderated}
                setPage={setPage}
              />
            ) : (
              <> </>
            )}

            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {(document.location.pathname === "/marathon" ||
                document.location.pathname === "/quiz") && (
                <Link to="/moderation" className="Link">
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: " rgba(255, 255, 255,0.1)",
                      borderRadius: "8px",
                      width: "90px",
                      height: "48px",
                    }}
                    variant="text"
                  >
                    Рейтинг
                  </Button>
                </Link>
              )}
              {(document.location.pathname === "/moderation" ||
                document.location.pathname === "/quiz") && (
                <Link to="/marathon" className="Link">
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: " rgba(255, 255, 255,0.1)",
                      borderRadius: "8px",

                      height: "48px",
                    }}
                    variant="text"
                  >
                    Посты
                  </Button>
                </Link>
              )}
              {document.location.pathname !== "/quiz" && (
                <Link to="/quiz" className="Link">
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: " rgba(255, 255, 255,0.1)",
                      borderRadius: "8px",

                      height: "48px",
                    }}
                    variant="text"
                  >
                    Тесты
                  </Button>
                </Link>
              )}
              <Link to="/login">
                <IconButton
                  onClick={() => {
                    setFirst((prev) => !prev);
                    localStorage.removeItem("token");
                  }}
                  sx={{
                    backgroundColor: " rgba(255, 255, 255,0.1)",
                    borderRadius: "8px",
                    height: "48px",
                    width: "48px",
                  }}
                >
                  <LogoutIcon sx={{ color: "white" }} />
                </IconButton>
              </Link>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
}
