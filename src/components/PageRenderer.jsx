import React from "react";
import FieldPreview from "./FieldPreview";

export default function PageRenderer({ template, layout = "full" }) {
  if (!template) return <div className="text-center text-gray-400 dark:text-gray-500 mt-10">No template found.</div>;

  // Hero layout
  if (layout === "hero") {
    return (
      <div className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-white p-12 rounded-3xl text-center mb-8 shadow-2xl animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-6 drop-shadow-lg tracking-tight animate-fade-in">{template.name}</h1>
        <div className="flex flex-col items-center gap-6 max-w-xl mx-auto">
          {template.fields.map((field, idx) => (
            <div key={field.id} className="w-full animate-fade-in">
              <FieldPreview field={field} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Two-column layout
  if (layout === "two-column") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
        {template.fields.map((field, idx) => (
          <div key={field.id} className="p-6 bg-gradient-to-br from-white via-blue-50 to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-lg border-2 border-blue-100 dark:border-blue-900 animate-fade-in">
            <FieldPreview field={field} />
          </div>
        ))}
      </div>
    );
  }

  // Default: full width
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl p-10 animate-fade-in">
      <h1 className="text-3xl font-extrabold mb-8 text-blue-700 dark:text-blue-300 tracking-tight drop-shadow-lg animate-fade-in">{template.name}</h1>
      <div className="flex flex-col gap-6">
        {template.fields.map((field, idx) => (
          <div key={field.id} className="animate-fade-in">
            <FieldPreview field={field} />
          </div>
        ))}
      </div>
    </div>
  );
} 