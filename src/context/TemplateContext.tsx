import React, { createContext, useReducer, useContext, ReactNode } from "react";

export type Field = {
  id: string;
  type: string;
  label: string;
  link?: string;
  value?: string;
};

export type Template = {
  id: string;
  name: string;
  fields: Field[];
};

type State = {
  templates: Template[];
  currentTemplate: Template | null;
};

type Action =
  | { type: "LOAD_TEMPLATES"; templates: Template[] }
  | { type: "SET_CURRENT_TEMPLATE"; template: Template | null }
  | { type: "SAVE_TEMPLATE"; template: Template };

const TemplateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

const initialState: State = {
  templates: [],
  currentTemplate: null,
};

function reducer(state: State, action: Action): State {
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

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
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