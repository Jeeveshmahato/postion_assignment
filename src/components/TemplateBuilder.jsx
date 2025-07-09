import React, { useState, useEffect } from "react";
import { FIELD_TYPES } from "../utils/fieldTypes";
import FieldEditor from "./FieldEditor";
import FieldPreview from "./FieldPreview";
import { useTemplate } from "../context/TemplateContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function TemplateBuilder() {
  const { state, dispatch } = useTemplate();
  const [fields, setFields] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // On mount, check if we should edit a template
  useEffect(() => {
    const editId = localStorage.getItem("editTemplateId");
    if (editId && state.templates.length > 0) {
      setSelectedTemplate(editId);
      const t = state.templates.find(t => t.id === editId);
      if (t) {
        setFields(t.fields);
        setTemplateName(t.name);
      }
      localStorage.removeItem("editTemplateId");
    }
  }, [state.templates]);

  useEffect(() => {
    if (selectedTemplate) {
      const t = state.templates.find(t => t.id === selectedTemplate);
      if (t) {
        setFields(t.fields);
        setTemplateName(t.name);
      }
    }
  }, [selectedTemplate, state.templates]);

  const handleAddField = type => {
    setFields([...fields, { id: Date.now() + Math.random(), type, label: `${type} label` }]);
  };

  const handleFieldChange = (idx, newField) => {
    setFields(fields.map((f, i) => (i === idx ? newField : f)));
  };

  const handleDeleteField = idx => {
    setFields(fields.filter((_, i) => i !== idx));
  };

  const handleDragEnd = result => {
    if (!result.destination) return;
    setFields(reorder(fields, result.source.index, result.destination.index));
  };

  const handleSave = () => {
    if (!templateName) {
      alert("Template name required");
      return;
    }
    const id = selectedTemplate || Date.now().toString();
    const template = { id, name: templateName, fields };
    dispatch({ type: "SAVE_TEMPLATE", template });
    setSelectedTemplate(id);
    alert("Template saved!");
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 dark:bg-transparent transition-colors duration-300">
      <div className="flex-1 min-w-[350px]">
        <h2 className="text-lg font-bold mb-4 dark:text-white animate-fade-in">Template Builder</h2>
        <input
          className="w-full mb-2 px-2 py-1 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Template Name"
          value={templateName}
          onChange={e => setTemplateName(e.target.value)}
        />
        <select
          className="w-full mb-2 px-2 py-1 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 transition"
          value={selectedTemplate}
          onChange={e => setSelectedTemplate(e.target.value)}
        >
          <option value="">Load Existing Template</option>
          {state.templates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <div className="flex gap-2 mb-4">
          {FIELD_TYPES.map(ft => (
            <button
              key={ft.type}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition shadow-md hover:scale-105 active:scale-95 duration-150"
              onClick={() => handleAddField(ft.type)}
              type="button"
            >
              + {ft.label}
            </button>
          ))}
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="fields">
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2"
              >
                {fields.map((field, idx) => (
                  <Draggable key={field.id} draggableId={field.id.toString()} index={idx}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="transition-transform duration-200 hover:scale-[1.01]"
                      >
                        <FieldEditor
                          field={field}
                          onChange={f => handleFieldChange(idx, f)}
                          onDelete={() => handleDeleteField(idx)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 transition shadow-md hover:scale-105 active:scale-95 duration-150"
          onClick={handleSave}
        >
          Save Template
        </button>
      </div>
      <div className="flex-1 min-w-[350px] bg-gradient-to-br from-white via-blue-50 to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-md p-4 animate-fade-in shadow-lg border-2 border-blue-200 dark:border-blue-900 relative">
        <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white text-xs px-3 py-1 rounded-full shadow font-bold tracking-wide animate-fade-in">Live Preview</span>
        <h3 className="text-base font-semibold mb-4 dark:text-white">&nbsp;</h3>
        {fields.length === 0 && <div className="text-gray-500 dark:text-gray-400">Add fields to preview</div>}
        {fields.map((field, idx) => (
          <FieldPreview key={field.id} field={field} />
        ))}
      </div>
    </div>
  );
} 