import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.scss";
import FormPage from "./pages/FormPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route
          path="user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
