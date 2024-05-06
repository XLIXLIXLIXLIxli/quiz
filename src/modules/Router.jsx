import * as React from "react";
import Login from "../Pages/Login";
import Marathon from "../Pages/Marathon";

import ModerationPage from "../Pages/ModerationPage";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizPage from "../Pages/QuizPage";

export default function Router() {
  const [, setFirst] = React.useState(false);

  if (localStorage.getItem("token")) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/marathon" element={<Marathon setFirst={setFirst} />} />
          <Route
            path="/moderation"
            element={<ModerationPage setFirst={setFirst} />}
          />
          <Route path="/quiz" element={<QuizPage setFirst={setFirst} />} />
          <Route path="*" element={<Navigate to="/marathon" replace />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setFirst={setFirst} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
