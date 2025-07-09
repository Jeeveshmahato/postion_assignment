import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TemplateProvider } from "./context/TemplateContext";
import Home from "./pages/Home";
import AdminTemplateBuilder from "./pages/AdminTemplateBuilder";
import PageView from "./pages/PageView";

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <TemplateProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/template-builder" element={<AdminTemplateBuilder />} />
            <Route path="/page/:templateId" element={<PageView />} />
          </Routes>
        </Router>
      </TemplateProvider>
    </div>
  );
} 