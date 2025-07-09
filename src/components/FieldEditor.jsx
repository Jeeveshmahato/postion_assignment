import React from "react";

export default function FieldEditor({ field, onChange, onDelete }) {
  // Handle image upload
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      onChange({ ...field, value: ev.target.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="border rounded-md p-3 mb-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300 shadow hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <input
            className="w-full mb-2 px-2 py-1 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Label"
            value={field.label}
            onChange={e => onChange({ ...field, label: e.target.value })}
          />
          {field.type === "button" && (
            <input
              className="w-full mb-2 px-2 py-1 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Button Link"
              value={field.link || ""}
              onChange={e => onChange({ ...field, link: e.target.value })}
            />
          )}
          {field.type === "image" && (
            <div className="mb-2">
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-blue-300 dark:hover:file:bg-gray-600"
                onChange={handleImageChange}
              />
              {field.value && (
                <img
                  src={field.value}
                  alt="Preview"
                  className="mt-2 rounded max-h-32 border dark:border-gray-600 shadow"
                />
              )}
            </div>
          )}
        </div>
        <button
          className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
          onClick={onDelete}
          title="Delete field"
        >
          &#10006;
        </button>
      </div>
    </div>
  );
} 