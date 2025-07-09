import React, { useEffect } from "react";
import { TemplateProvider } from "../context/TemplateContext";
import TemplateBuilder from "../components/TemplateBuilder";
import { useLocation, Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function AdminTemplateBuilder() {
  const query = useQuery();
  const editId = query.get("edit");

  useEffect(() => {
    if (editId) {
      // Set the selected template in localStorage for TemplateBuilder to pick up
      localStorage.setItem("editTemplateId", editId);
    } else {
      localStorage.removeItem("editTemplateId");
    }
  }, [editId]);

  return (
    <div>
        <div className="mb-4 fixed top-4 left-4 ">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 active:scale-95 transition font-semibold text-base"
          >
            <span className="material-icons">arrow_back</span>
            Back to Home
          </Link>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-teal-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 min-h-screen">
      <div className="w-[90%] mx-auto py-10 px-4">
      
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight drop-shadow-lg animate-fade-in">Template Builder</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in">Create or edit your page templates below.</p>
        </div>
        <TemplateProvider>
          <TemplateBuilder />
        </TemplateProvider>
      </div>
    </div>
    </div>
    
  );
} 