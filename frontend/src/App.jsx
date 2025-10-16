import Navbar from "./components/Navbar";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import "./App.css";
import Experiences from "./components/Experiences";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Admin/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import SkillsAdmin from "./pages/Admin/SkillsAdmin";
import ProjectsAdmin from "./pages/Admin/ProjectsAdmin";
import ExperiencesAdmin from "./pages/Admin/ExperiencesAdmin";
import AboutAdmin from "./pages/Admin/AboutAdmin";
import { useState } from "react";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" replace />;
}

function PortfolioHome() {
  return (
    <>
      <Navbar />
      <main>
        <About />
        <Skills />
        <Experiences />
        <Projects />
      </main>
    </>
  );
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* PORTFÖY */}
        <Route path="/" element={<PortfolioHome />} />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={
            token ? (
              <Navigate to="/admin" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        {/* ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard token={token} />} />
          <Route path="about" element={<AboutAdmin token={token} />} />
          <Route path="skills" element={<SkillsAdmin token={token} />} />
          <Route path="projects" element={<ProjectsAdmin token={token} />} />
          <Route
            path="experiences"
            element={<ExperiencesAdmin token={token} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
