import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import download from "../images/download.svg";
import Button from "@mui/material/Button";

export default function Upload({ handleSubmit, isFileUploaded, checkFields }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    setIsSubmitDisabled(!isFileUploaded || checkFields === "");
  }, [isFileUploaded, checkFields]);

  const inputFiles = () => {
    const inputs = document.querySelectorAll(".input__file");

    inputs.forEach((input) => {
      const label = input.nextElementSibling;
      const labelVal = label.querySelector(
        ".input__file-button-text"
      ).innerText;

      input.addEventListener("change", (e) => {
        const countFiles = input.files && input.files.length;

        if (countFiles >= 1) {
          const invalidFiles = Array.from(input.files).filter(
            (file) => !file.name.toLowerCase().match(/\.(jpg|png|gif)$/)
          );

          if (invalidFiles.length > 0) {
            const invalidFileNames = invalidFiles
              .map((file) => file.name)
              .join(", ");
            setErrorMessage(
              `Выбраны неподдерживаемые файлы: ${invalidFileNames}. Пожалуйста, выберите файлы с расширениями .jpg, .png или .gif.`
            );
            input.value = "";
            setIsSubmitDisabled(true);
          } else {
            setErrorMessage(null);
            setIsSubmitDisabled(checkFields === "");
          }
        } else {
          setErrorMessage(null);
          setIsSubmitDisabled(true);
        }

        label.querySelector(".input__file-button-text").innerText = countFiles
          ? `Выбрано файлов: ${countFiles}`
          : labelVal;
      });
    });
  };

  return (
    <Box className="input__wrapper">
      <form onSubmit={handleSubmit}>
        <input
          onClick={inputFiles}
          name="file"
          type="file"
          id="input__file"
          className="input input__file"
          multiple
          accept=".jpg, .png, .gif"
        />
        <label htmlFor="input__file" className="input__file-button">
          <span className="input__file-icon-wrapper">
            <img
              className="input__file-icon"
              src={download}
              alt="Выбрать файл"
              width="25"
            />
          </span>
          <span className="input__file-button-text">Выберите файлы</span>
        </label>

        {errorMessage && (
          <Alert
            sx={{ mt: "16px", mb: "16px" }}
            variant="outlined"
            severity="error"
          >
            {errorMessage}
          </Alert>
        )}

        <Button
          size="large"
          sx={{ width: "458px" }}
          variant="contained"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          Добавить диалог
        </Button>
      </form>
    </Box>
  );
}
