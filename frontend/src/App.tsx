import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import OTPVerificationPage from "./pages/OTPVerificationPage";
import CreateNewPasswordPage from "./pages/CreateNewPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/otp" element={<OTPVerificationPage />} />
        <Route path="/auth/new-password" element={<CreateNewPasswordPage />} />
        <Route path="/" element={<div style={{ color: "#1a1a2e", padding: "2rem" }}>Home (em breve)</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
