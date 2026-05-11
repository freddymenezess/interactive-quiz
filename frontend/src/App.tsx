import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<div style={{ color: "#1a1a2e", padding: "2rem" }}>Home (em breve)</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
