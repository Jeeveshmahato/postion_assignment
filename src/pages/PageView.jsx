import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageRenderer from "../components/PageRenderer";

export default function PageView() {
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);
  const [layout, setLayout] = useState("full");

  useEffect(() => {
    if (templateId) {
      const templates = JSON.parse(localStorage.getItem("templates") || "[]");
      setTemplate(templates.find(t => t.id === templateId));
    }
  }, [templateId]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-4 z-50">
        <label htmlFor="layout-select" className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Layout</label>
        <select
          id="layout-select"
          value={layout}
          onChange={e => setLayout(e.target.value)}
          className="px-2 py-2 border border-2 rounded bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="full">Full Width</option>
          <option value="two-column">2 Column</option>
          <option value="hero">Hero Section</option>
        </select>
      </div>
      <PageRenderer template={template} layout={layout} />
    </div>
  );
} 