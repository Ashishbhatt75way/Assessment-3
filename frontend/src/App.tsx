import { Route, Routes } from "react-router-dom";
import AuthanticatedLayout from "./layouts/Authanticated";
import BasicLayout from "./layouts/Basic";
import Home from "./pages/homepage";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import GenerateQR from "./components/GenerateQR";
import AdminPanel from "./components/AdminPanel";
import ShortLinkAnalytics from "./components/AnalyticsData";

function App() {
  return (
    <Routes>
      <Route element={<AuthanticatedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/generate-qr" element={<GenerateQR />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/analytics" element={<ShortLinkAnalytics />} />
      </Route>
      <Route element={<BasicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
