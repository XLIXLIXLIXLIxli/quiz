import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import PocketBase from "pocketbase";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AudioRec from "./audio/AudioRec";

const pb = new PocketBase(process.env.REACT_APP_PB_URL);
const PostForm = ({
  handlePostAdded,
  line,
  addStage,
  isSubmitDisabled,
  setIsSubmitDisabled,
  dialogLink,
  setDialogLink,
  platform,
  setPlatform,
}) => {
  const [desc, setDesc] = useState("");
  const [descPlaceholder, setdescPlaceholder] = useState("");

  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = useState("");

  const [selectedMusic, setSelectedMusic] = useState(null);
  const inputRef = useRef(null);
  const [, setFieldsFilled] = useState(false);
  const [, setErrorMessage] = useState(null);
  const [recordedBlob, setRecordedBlob] = React.useState(null);
  const [stageRate, setStageRate] = useState();

  const [countFiles, setCountFiles] = useState(0);

  useEffect(() => {
    switch (addStage) {
      case "Lifehack":
        setIsSubmitDisabled(true);
        setdescPlaceholder("Напиши свой лайфхак");
        setTitle("лайфхак");
        setDesc("");
        setSelectedImages([]);
        setDialogLink("");
        setPlatform("");
        setStageRate({
          finalRate: 0,
          realUseRate: 0,
          understandableRate: 0,
          utilityRate: 0,
        });

        break;
      case "ChangePattern":
        setIsSubmitDisabled(true);
        setdescPlaceholder("Напиши изменённый шаблон");
        setTitle("изменённый шаблон");
        setDesc("");
        setSelectedImages([]);
        setDialogLink("");
        setPlatform("");
        setStageRate({
          transferOfEssenceRate: 0,
          creativeRate: 0,
          howMuchWasChangedRate: 0,
          finalRate: 0,
          accuracyRate: 0,
        });

        break;
      case "Creative":
        setIsSubmitDisabled(true);
        setdescPlaceholder("Почему именно этот диалог");
        setTitle("диалог");
        setDesc("");
        setSelectedImages([]);
        setDialogLink("");
        setPlatform("");
        setStageRate({
          LackOfTemplatesRate: 0,
          complianceWithTonalityRate: 0,
          originality: 0,
          correctnessOfPresentation: 0,
          satisfiedСustomer: 0,
          finalRate: 0,
        });

        break;
      default:
        setdescPlaceholder("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addStage]);

  const createData = () => {
    setIsSubmitDisabled(false);
    setLoading(true);
    setIsSubmitDisabled(true);

    const formData = new FormData();
    formData.append("desc", desc);
    formData.append("operator", localStorage.getItem("name"));
    formData.append("moderation", "Ожидает проверки");
    formData.append("platform", platform);
    formData.append("dialogLink", dialogLink);
    formData.append("rate", JSON.stringify(stageRate));

    formData.append("stage", addStage);
    formData.append("typeOfSupport", line);

    if (selectedMusic !== null) {
      formData.append("audio", selectedMusic);
    }

    if (recordedBlob !== null) {
      formData.append("record", recordedBlob);
    }

    formData.append("operatorId", localStorage.getItem("userId"));
    selectedImages.forEach((file, index) => {
      formData.append(`img[${index}]`, file);
    });

    const promises = selectedImages.map((file) =>
      fetch(file)
        .then((response) => response.blob())
        .then((file) => {
          formData.append("img", file);
        })
    );

    Promise.all(promises)
      .then(() => {
        pb.collection("posts")
          .create(formData)
          .then(() => {
            handlePostAdded();
          })
          .catch((error) => {
            console.error("Ошибка при создании поста:", error);
          });
      })
      .catch((error) => {
        console.error("Ошибка при добавлении фотографии:", error);
      });
  };

  const checkFields = () => {
    if (
      desc.trim() !== "" &&
      dialogLink.trim() !== "" &&
      platform.trim() !== "" &&
      countFiles >= 1
    ) {
      setFieldsFilled("Поле заполнено");
      setErrorMessage(null);
    } else {
      setFieldsFilled("");
      if (countFiles === 0) {
        setErrorMessage("Выберите хотя бы одну картинку");
      } else {
        setErrorMessage(null);
      }
    }
  };

  const handleSubmit = () => {
    if (desc && dialogLink && platform) {
      if (countFiles >= 1) {
      } else {
        setErrorMessage("Выберите хотя бы одну картинку");
      }
    } else {
      setErrorMessage("Заполните все поля");
    }
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
    checkFields();
  };

  const handleDialogLinkChange = (e) => {
    setDialogLink(e.target.value);
    checkFields();
  };

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
    checkFields();
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const uploadedImages = [];
      for (let i = 0; i < Math.min(files.length, 10); i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedImages.push(e.target.result);
          if (uploadedImages.length === Math.min(files.length, 10)) {
            setSelectedImages((prevImages) => [
              ...prevImages,
              ...uploadedImages,
            ]);
            inputRef.current.selectedImages = [
              ...selectedImages,
              ...uploadedImages,
            ];
            setCountFiles(Math.min(files.length, 10));
          }
        };
        reader.readAsDataURL(file);
      }
      if (files.length > 10) {
        setCountFiles(1);
      }
    }
  };

  const handleFileInputChange = () => {
    const filesInput = inputRef.current;
    if (filesInput && filesInput.files) {
      const newCountFiles = filesInput.files.length;
      setSelectedImages([]);
      setCountFiles(0);
      inputRef.current.value = null;

      if (newCountFiles > 1) {
        handleSubmit();
      }
    }
  };

  useEffect(() => {
    if (addStage === "Creative") {
      setIsSubmitDisabled(
        !(
          desc &&
          dialogLink &&
          platform &&
          (selectedMusic !== null || countFiles >= 1)
        )
      );
    }
    if (addStage === "Lifehack" || addStage === "ChangePattern") {
      setIsSubmitDisabled(!desc);
    }

    selectedImages.length > 2
      ? setErrorMessage("Ошибка: Максимум 10 изображений разрешено")
      : setErrorMessage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desc, dialogLink, platform, countFiles, selectedImages, selectedMusic]);

  const handleImagePaste = (event) => {
    const items = event.clipboardData.items;
    const images = [];

    const currentImageCount = selectedImages.length;

    for (let i = 0; i < Math.min(items.length, 10 - currentImageCount); i++) {
      const item = items[i];
      if (item.type.indexOf("image") !== -1) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          images.push(event.target.result);
          setSelectedImages((prevImages) => [...prevImages, ...images]);

          setCountFiles(Math.min(currentImageCount + images.length, 10));
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("paste", handleImagePaste);

    return () => {
      document.removeEventListener("paste", handleImagePaste);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImages]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedMusic(selectedFile);
  };

  return (
    <form className="modal">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          bgcolor: "#595959",
          borderRadius: "8px",
          p: "8px",

          width: "520px",
        }}
      >
        <Typography sx={{ p: "4px", color: "#F2F2F2" }} variant="h6">
          Добавить {title}
        </Typography>
        {addStage === "ChangePattern" && (
          <Typography
            sx={{
              p: "4px",

              color: "#F2F2F2",
              width: "470px",
            }}
            variant="subtitle2"
          >
            Lorem Ipsum - это текст-"рыба", часто используемый в печати и
            вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на
            латинице с начала XVI века. В то время некий безымянный печатник
            создал большую коллекцию размеров и форм шрифтов, используя Lorem
            Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил
            без заметных изменений пять веков,
          </Typography>
        )}
        <TextField
          value={desc}
          onBlur={handleDescChange}
          onChange={handleDescChange}
          type="text"
          color="secondary"
          placeholder={descPlaceholder}
          multiline
          minRows={6}
          sx={{
            mb: "8px",
            width: "470px",
            backgroundColor: "#DFE4E5",
            borderRadius: "4px",
          }}
          maxRows={10}
        />

        {addStage === "Creative" && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <TextField
              onBlur={handleDialogLinkChange}
              color="secondary"
              value={dialogLink}
              onChange={handleDialogLinkChange}
              type="text"
              placeholder="Ссылка на диалог"
              multiline
              sx={{
                mb: "8px",
                width: "470px",
                backgroundColor: "#DFE4E5",
                borderRadius: "4px",
              }}
              maxRows={5}
            />
            <FormControl
              color="secondary"
              sx={{
                mb: "8px",
                width: "470px",
                backgroundColor: "#DFE4E5",
                borderRadius: "4px",
              }}
            >
              <Select
                displayEmpty
                value={platform}
                onChange={handlePlatformChange}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography sx={{ color: "rgba(0, 0, 0, 0.4)" }}>
                        Платформа
                      </Typography>
                    );
                  }
                  return selected;
                }}
              >
                <MenuItem value={"SMS"}>SMS</MenuItem>
                <MenuItem value={"Chat"}>Chat</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}

        {line === 1 && addStage === "Creative" && (
          <Box>
            <Box onSubmit={handleSubmit}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <input
                  accept="image/*"
                  id="upload-button"
                  type="file"
                  style={{ display: "none" }}
                  ref={inputRef}
                  onChange={handleImageUpload}
                  multiple
                  onClick={handleFileInputChange}
                  value={null}
                />
                <Box>
                  <label htmlFor="upload-button">
                    <Button
                      startIcon={<FileUploadIcon />}
                      variant="outlined"
                      component="span"
                      color="primary"
                    >
                      Выбрать фотографии
                    </Button>
                  </label>
                  {selectedImages.length > 0 && (
                    <Button
                      sx={{ ml: 1 }}
                      onClick={() => setSelectedImages([])}
                      variant="outlined"
                      component="span"
                      color="primary"
                    >
                      <DeleteIcon />
                    </Button>
                  )}
                </Box>
                {selectedImages.length > 0 && (
                  <Stack
                    htmlFor="upload-button"
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{ pt: "16px" }}
                  >
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box sx={{ width: "500px" }}>
                        {selectedImages.map((image, index) => (
                          <img
                            key={index}
                            className="uploadImage"
                            src={image}
                            alt={`Предпросмотр ${index + 1}`}
                          />
                        ))}
                      </Box>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Box>
        )}
        {line === 0 &&
          (addStage === "ChangePattern" || addStage === "Creative") && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <input
                style={{ display: "none" }}
                value={null}
                type="file"
                accept="audio/*"
                id="audio-button"
                onChange={handleFileChange}
              />
              <label htmlFor="audio-button">
                <Button
                  startIcon={<FileUploadIcon />}
                  variant="outlined"
                  component="span"
                  color="primary"
                >
                  Выбрать аудио
                </Button>
              </label>
              {selectedMusic !== null && (
                <Typography
                  variant="caption"
                  sx={{ color: "#F2F2F2", pt: 0.5 }}
                >
                  Файл добавлен
                </Typography>
              )}
            </Stack>
          )}
        {line === 0 && addStage === "ChangePattern" && (
          <AudioRec
            setRecordedBlob={setRecordedBlob}
            recordedBlob={recordedBlob}
          ></AudioRec>
        )}
        <Box>
          <Alert
            sx={{
              border: "0",
              width: "400px",
              color: "#F2F2F2",
              "& .MuiAlert-icon": {
                color: "#EEDE9D",
              },
            }}
            variant="outlined"
            severity="info"
          >
            Чтобы добавить {title}, необходимо заполнить
            {(addStage === "Lifehack" || addStage === "ChangePattern") &&
              " поле"}
            {addStage === "Creative" && " поля"}
            {line === 0 && addStage === "Creative" && " и добавить аудио"}
            {line === 1 && addStage === "Creative" && " и добавить фото"}
          </Alert>
        </Box>
      </Stack>

      <LoadingButton
        disabled={isSubmitDisabled}
        sx={{
          mt: "8px",
          borderRadius: "8px",
        }}
        onClick={createData}
        loading={loading}
        variant="contained"
        size="large"
        color="secondary"
      >
        Добавить
      </LoadingButton>
    </form>
  );
};

export default PostForm;
