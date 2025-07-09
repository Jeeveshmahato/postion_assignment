import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTemplates(JSON.parse(localStorage.getItem("templates") || "[]"));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      const updated = templates.filter(t => t.id !== id);
      setTemplates(updated);
      localStorage.setItem("templates", JSON.stringify(updated));
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/template-builder?edit=${id}`);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="w-[90%] mx-auto py-12 px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold mb-2 text-blue-700 dark:text-blue-300 tracking-tight drop-shadow-lg animate-fade-in">Mini CMS Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 animate-fade-in">Build, preview, and manage dynamic pages with ease.</p>
          <Link
            to="/admin/template-builder"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 active:scale-95 transition font-semibold text-lg animate-fade-in"
          >
            <span className="material-icons">add_circle</span>
            Go to Template Builder
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 animate-fade-in">Your Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {templates.length === 0 && (
            <div className="col-span-2 text-center text-gray-400 dark:text-gray-500 animate-fade-in">No templates yet. Create one!</div>
          )}
          {templates.map(t => (
            <div
              key={t.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col my-[10px] gap-3 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-[1.02] transition animate-fade-in"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="material-icons text-blue-400 dark:text-blue-300">description</span>
                <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{t.name}</div>
              </div>
              <div className="flex gap-2 mt-2">
                <Link
                  to={`/page/${t.id}`}
                  className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 active:scale-95 transition font-semibold text-base text-center"
                >
                  <span className="material-icons align-middle mr-1">visibility</span>
                  View
                </Link>
                <button
                  onClick={() => handleEdit(t.id)}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 active:scale-95 transition font-semibold text-base"
                  title="Edit"
                >
                  <span className="material-icons align-middle mr-1">edit</span>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 active:scale-95 transition font-semibold text-base"
                  title="Delete"
                >
                  <span className="material-icons align-middle mr-1">delete</span>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 