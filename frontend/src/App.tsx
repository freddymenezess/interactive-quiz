import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import OTPVerificationPage from "./pages/OTPVerificationPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import PasswordChangedPage from "./pages/PasswordChangedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />
        <Route path="/new-password" element={<NewPasswordPage />} />
        <Route path="/password-changed" element={<PasswordChangedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
