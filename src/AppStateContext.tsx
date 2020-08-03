import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";
import { findItemIndexById } from "./utils/findItemIndexById";
const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }]
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }]
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }]
    }
  ]
};

interface Task {
  id: string;
  text: string;
}
interface List {
  id: string;
  text: string;
  tasks: Task[];
}
export interface AppState {
  lists: List[];
}

interface AppStateContextProps {
  state: AppState;
  dispatch: Dispatch<Action>;
}
const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};

// "discriminated union" syntax.
// behaves like switch, using type as case, to designate payload.
type Action =
  | {
      type: "ADD_LIST";
      payload: string;
    }
  | {
      type: "ADD_TASK";
      payload: { listId: string; text: string };
    };

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST": {
      if (action.payload.length === 0) {
        return state;
      }
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: uuidv4(), text: action.payload, tasks: [] }
        ]
      };
    }
    case "ADD_TASK": {
      if (action.payload.text.length === 0) {
        return state;
      }
      const targetListIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      );
      state.lists[targetListIndex].tasks.push({
        id: uuidv4(),
        text: action.payload.text
      });
      return {
        ...state
      };
    }
    default: {
      return state;
    }
  }
};
