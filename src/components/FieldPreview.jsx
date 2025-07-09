import React from "react";

export default function FieldPreview({ field }) {
  switch (field.type) {
    case "text":
      return (
        <div className="mb-3 animate-fade-in">
          <label className="block mb-1 font-medium dark:text-gray-200">Text Label</label>
          <input className="w-full px-2 py-1 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 transition" placeholder={field.label} disabled />
        </div>
      );
    case "textarea":
      return (
        <div className="mb-3 animate-fade-in">
          <label className="block mb-1 font-medium dark:text-gray-200">Textarea Label</label>
          <textarea className="w-full px-2 py-1 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 transition" placeholder={field.label} disabled />
        </div>
      );
    case "image":
      return (
        <div className="mb-3 animate-fade-in">
          <label className="block mb-1 font-medium dark:text-gray-200">{field.label}</label>
          <img
            src={field.value || "https://via.placeholder.com/300x150?text=Image"}
            alt={field.label}
            className="rounded max-h-40 object-cover border dark:border-gray-600 shadow"
          />
        </div>
      );
    case "button":
      return (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-3 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition animate-fade-in"
          disabled
        >
          {field.label}
        </button>
      );
    default:
      return null;
  }
} 