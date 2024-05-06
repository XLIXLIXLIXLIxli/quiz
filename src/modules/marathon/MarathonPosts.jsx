import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PocketBase from "pocketbase";
import BasicModal from "./posts/createPost/BasicModal";
import { useObserver } from "../../hooks/useObserver";
import ChangePatternRating from "./posts/post/components/rating/ChangePatternRating";
import LifehackRating from "./posts/post/components/rating/LifehackRating";
import CreativeRating from "./posts/post/components/rating/CreativeRating";
import ImgCarousel from "./posts/post/components/Images/ImgCarousel";
import Commentaries from "./posts/post/components/comments/Commentaries";
import Box from "@mui/material/Box";
import { DateTime } from "luxon";
import Alerts from "./posts/post/components/Alerts";
import Header from "../header/Header";
import Player from "./posts/post/components/Player";
import Snackbar from "@mui/material/Snackbar";
import Stages from "./posts/stages/Stages";
import AdminInfo from "./posts/post/components/AdminInfo";
import PostSkeleton from "./posts/post/components/PostSkeleton";

const IdAdmin = process.env.REACT_APP_ADMIN_ID;

const pb = new PocketBase(process.env.REACT_APP_PB_URL);

export default function MarathonPosts({ setFirst }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(2);
  const [dataLoaded, setDataLoaded] = useState(false);
  const handleOpen = () => {
    setPage(2);
    setOpen(true);
    window.scrollTo(0, 0);
  };

  const dt = DateTime.local();
  dt.setLocale("ru").toFormat("d MMMM tt - ZZZZZ");

  const handleClose = () => {
    setOpen(false);
    setIsSubmitDisabled(true);
  };
  const [rcd, setRcd] = useState([]);
  const lastElement = useRef();

  const [findOperator, setFindOperator] = useState([]);
  const [operatorSearchInput, setOperatorSearchInput] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    pb.collection("posts")
      .getFullList({ sort: "operator" })
      .then((value) => {
        const names = value.map((item) => item.operator);

        const filterNames = [...new Set(names)];
        setFindOperator(filterNames);
      });
  }, []);

  const myId = localStorage.getItem("userId");
  const [stages, setStages] = useState("");
  const [lifehackLock, setLifehackLock] = React.useState(true);
  const [changePattrenLock, setChangePattrenLock] = React.useState(true);
  const [creative, setCreative] = React.useState(true);

  const [adminSorting, setadminSorting] = useState(`sort=""`);
  const [moderated, setModerated] = useState("");
  const [alignment, setAlignment] = useState("All");

  const userSearch =
    (localStorage.getItem("role") === IdAdmin
      ? adminSorting
      : `operatorId="${myId}"`) +
    moderated +
    ` && stage ~"${stages}"`;
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  useEffect(() => {
    if (localStorage.getItem("role") === IdAdmin) fetchPostsAdmin();
    else {
      fetchPostsUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moderated, findOperator, operatorSearchInput, stages]);

  const fetchPostsAdmin = () => {
    pb.collection("posts")
      .getList(1, 5, {
        sort: "-created",
        filter: userSearch,
        $autoCancel: false,
        perPage: 5,
      })
      .then((value) => {
        setRcd(value.items);
        setTotalPage(value.totalPages);
        setDataLoaded(true);
      });
  };

  const fetchPostsUser = () => {
    pb.collection("posts")
      .getList(1, 5, {
        sort: "-created",
        filter: userSearch,
        $autoCancel: false,
        perPage: 5,
      })
      .then((value) => {
        setRcd(value.items);
        setTotalPage(value.totalPages);
        setDataLoaded(true);
      });
  };

  const [totalPage, setTotalPage] = useState(0);

  const changePage = () => {
    if (page <= totalPage)
      pb.collection("posts")
        .getList(page, 50, {
          sort: "-created",
          filter: userSearch,
          $autoCancel: false,
          perPage: 5,
        })
        .then((value) => {
          setRcd((prev) => [...prev, ...value.items]);
          setPage((prev) => prev + 1);
          setDataLoaded(true);
        });
  };

  useObserver(lastElement, page <= totalPage, () => {
    changePage();
  });

  const handlePostAdded = () => {
    setOpen(false);
    handleSnackbarOpen();
    fetchPostsUser();
  };

  return (
    <Box>
      <Box
        sx={{
          ml: "auto",
          mr: "auto",
          width: "650px",
          height: "auto",
          minHeight: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(41px)",
          p: 1,
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        }}
      >
        <Box>
          <Header
            fetchPostsAdmin={fetchPostsAdmin}
            setFirst={setFirst}
            setModerated={setModerated}
            setAlignment={setAlignment}
            alignment={alignment}
            moderated={moderated}
            setPage={setPage}
            pb={pb}
            operatorSearchInput={operatorSearchInput}
            findOperator={findOperator}
            setadminSorting={setadminSorting}
            setOperatorSearchInput={setOperatorSearchInput}
            open={open}
            setRcd={setRcd}
            setTotalPage={setTotalPage}
            page={page}
            setStages={setStages}
            stages={stages}
          ></Header>

          <Box sx={{ pt: "10px" }}>
            <Stages
              setPage={setPage}
              setStages={setStages}
              stages={stages}
              pb={pb}
              lifehackLock={lifehackLock}
              setLifehackLock={setLifehackLock}
              changePattrenLock={changePattrenLock}
              setChangePattrenLock={setChangePattrenLock}
              creative={creative}
              setCreative={setCreative}
              IdAdmin={IdAdmin}
            ></Stages>
            <Box>
              {(rcd.filter((item) => {
                return (
                  item.operator === localStorage.getItem("name") ||
                  localStorage.getItem("role") === IdAdmin
                );
              }).length ===
                0) &
              dataLoaded ? (
                <Box>
                  <PostSkeleton
                    moderated={moderated}
                    rcd={rcd}
                    open={open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    dataLoaded={dataLoaded}
                    lifehackLock={lifehackLock}
                    changePattrenLock={changePattrenLock}
                    creative={creative}
                    IdAdmin={IdAdmin}
                  />
                </Box>
              ) : (
                rcd
                  .filter((item) => {
                    return (
                      item.operator === localStorage.getItem("name") ||
                      localStorage.getItem("role") === IdAdmin
                    );
                  })
                  .map((post) => {
                    return (
                      <Box key={post.id}>
                        <Box
                          sx={{
                            width: "100%",
                            pt: "4px",
                            pb: "8px",
                          }}
                        >
                          <Card
                            sx={{
                              borderRadius: "14px",
                              backgroundColor: " rgba(255, 255, 255,0.4)",
                            }}
                          >
                            <Box
                              sx={{
                                m: "4px",
                                pt: "4px",
                                pb: "0.1px",
                                borderRadius: "10px",
                                backgroundColor: " rgba(255, 255, 255,0.5)",
                              }}
                            >
                              <Alerts pb={pb} post={post}></Alerts>
                              <Player post={post}></Player>
                              <ImgCarousel post={post} />
                            </Box>
                            <Box>
                              <Box
                                sx={{
                                  pr: "4px",
                                  pl: "4px",
                                }}
                              >
                                <Box
                                  sx={{
                                    p: "2px",
                                    borderRadius: "10px",
                                    backgroundColor: " rgba(255, 255, 255,0.6)",
                                  }}
                                >
                                  {post.rate && post.stage === "Lifehack" && (
                                    <LifehackRating
                                      setRcd={setRcd}
                                      pb={pb}
                                      post={post}
                                      IdAdmin={IdAdmin}
                                    ></LifehackRating>
                                  )}
                                  {post.rate &&
                                    post.stage === "ChangePattern" && (
                                      <ChangePatternRating
                                        setRcd={setRcd}
                                        pb={pb}
                                        post={post}
                                        IdAdmin={IdAdmin}
                                      ></ChangePatternRating>
                                    )}
                                  {post.rate && post.stage === "Creative" && (
                                    <CreativeRating
                                      setRcd={setRcd}
                                      pb={pb}
                                      post={post}
                                      IdAdmin={IdAdmin}
                                    ></CreativeRating>
                                  )}

                                  <Typography
                                    sx={{
                                      m: "2px",
                                      mb: "4px",
                                      p: "4px",
                                      display: "block",
                                      wordWrap: "break-word",
                                      bgcolor: "white",
                                      borderRadius: "6px",
                                    }}
                                    variant="body2"
                                  >
                                    {post.desc}
                                  </Typography>

                                  <AdminInfo
                                    dt={dt}
                                    DateTime={DateTime}
                                    post={post}
                                    IdAdmin={IdAdmin}
                                  />
                                </Box>
                                <Commentaries
                                  IdAdmin={IdAdmin}
                                  dt={dt}
                                  post={post}
                                  pb={pb}
                                />
                              </Box>
                            </Box>
                          </Card>
                        </Box>
                      </Box>
                    );
                  })
              )}
            </Box>
            <Box
              sx={{
                ml: "auto",
                mr: "auto",
                width: "650px",
                height: "20px",
                pr: 1,
                pl: 1,
              }}
              ref={lastElement}
            />
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        message="Диалог отправлен на модерацию"
      ></Snackbar>
      <BasicModal
        isSubmitDisabled={isSubmitDisabled}
        setIsSubmitDisabled={setIsSubmitDisabled}
        page={page}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        rcd={rcd}
        handleSnackbarOpen={handleSnackbarOpen}
        handlePostAdded={handlePostAdded}
        changePattrenLock={changePattrenLock}
        creative={creative}
        lifehackLock={lifehackLock}
      ></BasicModal>
    </Box>
  );
}
