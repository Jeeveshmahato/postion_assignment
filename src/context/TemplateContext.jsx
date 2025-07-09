import React, { createContext, useReducer, useContext, useEffect } from "react";

const TemplateContext = createContext();

const initialState = {
  templates: [],
  currentTemplate: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_TEMPLATES":
      return { ...state, templates: action.templates };
    case "SET_CURRENT_TEMPLATE":
      return { ...state, currentTemplate: action.template };
    case "SAVE_TEMPLATE": {
      const updated = state.templates.filter(t => t.id !== action.template.id).concat(action.template);
      localStorage.setItem("templates", JSON.stringify(updated));
      return { ...state, templates: updated, currentTemplate: action.template };
    }
    default:
      return state;
  }
}

export function TemplateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const templates = JSON.parse(localStorage.getItem("templates") || "[]");
    dispatch({ type: "LOAD_TEMPLATES", templates });
  }, []);

  return (
    <TemplateContext.Provider value={{ state, dispatch }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (!context) throw new Error("useTemplate must be used within a TemplateProvider");
  return context;
} 