import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ setFirst }: any) => {
  const navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function auth(email: string, password: string) {
    const response = await fetch(`${process.env.REACT_APP_LOGIN_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "role",
      data.user.role === "SUPERVISOR"
        ? `${process.env.REACT_APP_ADMIN_ID}`
        : "user"
    );
    localStorage.setItem("userId", data.user.userId);
    localStorage.setItem("name", data.user.fullName);

    setFirst((prev: any) => !prev);
    navigate("/posts");
  }

  return (
    <div className="login">
      <Box
        className="Login-page"
        sx={{
          width: "650px",
          height: "650px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          backdropFilter: "blur(41px)",
          borderRadius: "50px",
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="img"
          sx={{ minWidth: "120px", mb: "60px", minHeight: "10px" }}
        ></Box>
        <Typography sx={{ textAlign: "center", color: "white" }} variant="h5">
          Введите почту и пароль
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ textAlign: "center", color: "white" }}
        >
          Почта должна быть с доменом @samokat-team.ru
        </Typography>

        <OutlinedInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Логин"
          sx={{
            width: "350px",
            borderRadius: "25px",
            mt: "20px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />

        <OutlinedInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          type={showPassword ? "text" : "password"}
          sx={{
            width: "350px",
            borderRadius: "25px",
            mt: "20px",
            color: "white",
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />

        <Button
          variant="contained"
          sx={{
            width: "400px",
            borderRadius: "25px",
            mt: "20px",
          }}
          onClick={() => {
            auth(email, password);
          }}
        >
          Войти
        </Button>
      </Box>
    </div>
  );
};

export default Login;
