import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BoardPage from "@/pages/BoardPage";
import LoginPage from "@/pages/LoginPage";
import ViewPage from "@/pages/ViewPage";
import EditPage from "@/pages/EditPage";
import AuthPage from "@/pages/AuthPage";
import SearchPage from "@/pages/SearchPage";
import TopNavigation from "@/components/common/TopNavigation";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  const location = useLocation();

  const hideTopNavPaths = ["/login", "/auth", "/error"];

  const showTopNav = !hideTopNavPaths.includes(location.pathname);

  return (
    <div className="App">
      {showTopNav && <TopNavigation />}
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/view/:id" element={<ViewPage />} />
        <Route path="/edit/:id?" element={<EditPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/error" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </div>
  );
}

export default App;
