import * as React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CardContent from "@mui/material/CardContent";
import Header from "../header/Header";

const pb = new PocketBase("https://esup.fun");

export default function DataGridDemo({ setFirst }) {
  const [data, setData] = useState();
  const [, setStartTime] = useState(0);

  const tests = [
    {
      id: 11111111111111,
      title: "Тест 1",
      disabled: true,
      questions: [
        {
          questionText:
            "Народная песня чернокожих американских рабов называется «Следуй за тыквенным черпаком». Дело в том, что благодаря этому черпаку можно легко найти ЕЁ. Мы не спрашиваем, как принято называть тыквенный черпак у нас. Назовите ЕЁ.",
          answerOptions: [
            { answerText: "Пекин", isCorrect: false },
            { answerText: "Париж", isCorrect: false },
            { answerText: "Москва", isCorrect: true },
            { answerText: "Токио", isCorrect: false },
          ],
        },
        {
          questionText: "Кто основал Microsoft?",
          answerOptions: [
            { answerText: "Билл Хейдер", isCorrect: false },
            { answerText: "Билл Гейтс", isCorrect: true },
            { answerText: "Стив Джобс", isCorrect: false },
            { answerText: "Марк Цукерберг", isCorrect: false },
          ],
        },
        {
          questionText: "Какое животное ассоциируется с Древним Египтом?",
          answerOptions: [
            { answerText: "Лев", isCorrect: false },
            { answerText: "Кот", isCorrect: true },
            { answerText: "Колибри", isCorrect: false },
            { answerText: "Кролик", isCorrect: false },
          ],
        },
        {
          questionText: "Кто придумал Шерлока Холмса?",
          answerOptions: [
            { answerText: "Агата Кристи", isCorrect: false },
            { answerText: "Стиг Ларссон", isCorrect: false },
            { answerText: "Эдгар Аллан По", isCorrect: false },
            { answerText: "Артур Конан Дойл", isCorrect: true },
          ],
        },
      ],
    },
    {
      id: 222222222222222222,
      title: "Тест 2",
      disabled: true,
      questions: [
        {
          questionText: " 1Кто основал Microsoft?",
          answerOptions: [
            { answerText: "Билл Хейдер", isCorrect: false },
            { answerText: "Билл Гейтс", isCorrect: true },
            { answerText: "Стив Джобс", isCorrect: false },
            { answerText: "Марк Цукерберг", isCorrect: false },
          ],
        },
        {
          questionText: " 2 Кто основал Microsoft?",
          answerOptions: [
            { answerText: "Билл Хейдер", isCorrect: false },
            { answerText: "Билл Гейтс", isCorrect: true },
            { answerText: "Стив Джобс", isCorrect: false },
            { answerText: "Марк Цукерберг", isCorrect: false },
          ],
        },
        {
          questionText: "",
          answerOptions: [{ answerText: "Завершить", isCorrect: null }],
        },
      ],
    },
  ];
  const [testsS, setTestsS] = useState(tests);

  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [answers, setAnswers] = useState({});

  const [isRunning, setIsRunning] = useState(false);

  const handleTestStart = (testId) => {
    const selectedTest = tests.find((test) => test.id === testId);

    setStartTime(Date.now());
    startTimer();
    setSelectedTest(selectedTest);
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setMinutes(0);
    setSeconds(0);
    setEndTime(0);
  };

  const handleAnswerButtonClick = (answerOption) => {
    setCurrentQuestion(currentQuestion + 1);

    if (currentQuestion === selectedTest.questions.length - 1) {
      stopTimer();
      setShowScore(true);
    }

    const isCorrect = answerOption.isCorrect;
    const testId = selectedTest.id;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setAnswers((prevAnswers) => {
      const newAnswers = {
        ...(prevAnswers || {}),
        id: testId,
        [testId]: {
          ...(prevAnswers[testId] || {}),
          [currentQuestion]: {
            selectedAnswer: answerOption.answerText,
            isCorrect: isCorrect,
          },
        },
      };

      return newAnswers;
    });
  };

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          setSeconds(0);
        } else {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  useEffect(() => {
    if (showScore === true) {
      create();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, showScore]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  function create() {
    pb.collection("quiz").create({
      userId: localStorage.getItem("userId"),
      time: "test",
      answers: JSON.stringify(answers),
      endTime: endTime,
      fullName: localStorage.getItem("name"),
    });
  }

  // const updateTest = async (testId, testName, isFinished) => {
  //   try {
  //     await pb.collection("quiz").update(testId, {
  //       testName: testName,
  //       isFinished: isFinished,
  //     });
  //     console.log("Значения обновлены успешно.");
  //   } catch (error) {
  //     console.error("Ошибка при обновлении значений:", error);
  //   }
  // };

  pb.collection("quiz").subscribe("*", function (e) {});

  useEffect(() => {
    pb.collection("quiz")
      .getFullList({
        filter: `userId = "${localStorage.getItem("userId")}"`,
        sort: "-created",
      })
      .then((value) => {
        setData(value);
        const answersId = value.map((item) => item.answers.id);

        function updateDisabledStatus() {
          for (let i = 0; i < testsS.length; i++) {
            if (!answersId.includes(testsS[i].id)) {
              setTestsS((prevState) => {
                const updatedFirsts = [...prevState];
                updatedFirsts[i].disabled = false;
                return updatedFirsts;
              });
            }
          }
        }
        updateDisabledStatus();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {selectedTest ? (
          <Box
            sx={{
              width: "100%",

              mt: 2,
              borderRadius: "14px",
              backgroundColor: " rgba(255, 255, 255,0.4)",
            }}
          >
            <Box>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ p: 1 }}
              >
                {showScore === false && (
                  <Card
                    sx={{
                      width: "100%",
                      height: "50px",
                      backgroundColor: " white",
                      borderRadius: "10px",
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography sx={{ p: 1 }} variant="h6">
                        Вопрос {currentQuestion + 1} из{" "}
                        {selectedTest.questions.length}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                        sx={{ p: 1 }}
                      >
                        <TimerOutlinedIcon sx={{ color: "text.secondary" }} />{" "}
                        <Typography variant="body1" color="text.secondary">
                          {minutes > 0 && `${minutes} мин. `}
                          {seconds >= 0 && seconds < 10
                            ? `0${seconds} сек.`
                            : `${seconds} сек.`}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Card>
                )}
                <Card
                  sx={{
                    width: "100%",
                    minHeight: "250px",
                    backgroundColor: " white",
                    borderRadius: "10px",
                  }}
                >
                  {
                    <Typography sx={{ p: 2 }} variant="h6">
                      {selectedTest &&
                        selectedTest.questions[currentQuestion] &&
                        selectedTest.questions[currentQuestion].questionText}

                      {showScore && (
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={7}
                        >
                          <Typography color="text.secondary" variant="h5">
                            Тест завершен
                          </Typography>{" "}
                          <Typography sx={{ fontSize: 28 }}>
                            Правильных ответов {score} из{" "}
                            {selectedTest.questions.length}
                          </Typography>{" "}
                          <Typography variant="body1" color="text.secondary">
                            Времени затрачено:
                            {" " + minutes > 0 && `${minutes} мин. `}
                            {" " + seconds} сек.
                            {endTime > 0 &&
                              ` (Прошло времени: ${Math.floor(
                                endTime / 1000
                              )} сек.)`}
                          </Typography>
                        </Stack>
                      )}
                    </Typography>
                  }
                </Card>
                {showScore && (
                  <Button
                    sx={{
                      backgroundColor: " rgba(255, 255, 255,0.8)",
                      borderRadius: "8px",
                      width: "100%",
                      height: "60px",
                      color: "black",
                      "&:hover, &:focus": {
                        backgroundColor: " rgba(255, 255, 255,0.5)",
                      },
                    }}
                    variant="text"
                    onClick={() => setSelectedTest(null)}
                  >
                    Пройти еще
                  </Button>
                )}
              </Stack>

              <Box>
                {showScore ? (
                  <></>
                ) : (
                  <>
                    <Grid
                      sx={{ p: 1 }}
                      container
                      spacing={{ md: 2 }}
                      columns={{ md: 8 }}
                    >
                      {selectedTest &&
                        selectedTest.questions &&
                        selectedTest.questions[currentQuestion] &&
                        selectedTest.questions[
                          currentQuestion
                        ].answerOptions.map((answerOption, index) => (
                          <Grid item md={4} key={answerOption.answerText}>
                            <Button
                              sx={{
                                backgroundColor: " rgba(255, 255, 255,0.8)",
                                borderRadius: "8px",
                                width: "100%",
                                height: "80px",
                                color: "black",
                                "&:hover, &:focus": {
                                  backgroundColor: " rgba(255, 255, 255,0.5)",
                                },
                              }}
                              variant="text"
                              onClick={() =>
                                handleAnswerButtonClick(answerOption)
                              }
                              disabled={showScore}
                            >
                              {answerOption.answerText}
                            </Button>
                          </Grid>
                        ))}
                    </Grid>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <Grid sx={{ pt: 2 }} container spacing={2}>
              {testsS.map((test) => (
                <Grid item key={test.id}>
                  <Card
                    sx={{
                      minWidth: "100px",

                      backgroundColor: test.disabled
                        ? " rgba(180, 250, 184,0.4)"
                        : " rgba(255, 255, 255,0.5)",

                      borderRadius: "14px",
                    }}
                  >
                    <CardContent
                      sx={{
                        backgroundColor: " rgba(64, 64, 64,0.5)",
                        borderRadius: "10px",
                        m: 1,
                      }}
                    >
                      <Stack direction="row" spacing={1}>
                        <TimerOutlinedIcon sx={{ pb: 1, color: "#F2F2F2" }} />
                        <Typography
                          sx={{ fontSize: 14, pt: 0.3 }}
                          color="#F2F2F2"
                          gutterBottom
                        >
                          Время на прохождение: 30 минут
                        </Typography>
                      </Stack>
                      <Typography color="#FFFFFF" variant="h5" component="div">
                        {test.title}
                      </Typography>
                      <Typography sx={{ mb: 1 }} color="#F2F2F2">
                        Описание теста
                      </Typography>
                    </CardContent>

                    <Button
                      disabled={test.disabled}
                      variant="filled"
                      sx={{
                        backgroundColor: " rgba(255, 255, 255,0.5)",
                        borderRadius: "10px",
                        width: "300px",
                        height: "50px",
                        mr: 1,
                        ml: 1,
                        mb: 1,

                        color: "black",
                        "&:hover, &:focus": {
                          backgroundColor: " rgba(255, 255, 255,0.6)",
                        },
                      }}
                      onClick={() => handleTestStart(test.id)}
                    >
                      {test.disabled ? "Тест завершен " : "Начать"}
                    </Button>

                    {/* <Button
                      variant="text"
                      sx={{
                        borderRadius: "10px",
                        width: "634px",
                        height: "30px",
                        mr: 1,
                        ml: 1,
                        mb: 1,
                      }}
                    >
                      Тест завершен
                    </Button> */}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}
