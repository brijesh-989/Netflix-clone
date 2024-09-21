import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Auth from "./pages/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />}></Route>o
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
