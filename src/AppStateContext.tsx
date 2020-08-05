import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";
import { findItemIndexById } from "./utils/findItemIndexById";
import { DragItem } from "./DragItem";
import { moveItem } from "./moveItem";
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
  ],
  draggedItem: undefined
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
  draggedItem: DragItem | undefined;
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
    }
  | {
      type: "MOVE_LIST";
      payload: {
        dragIndex: number;
        hoverIndex: number;
      };
    }
  | {
      type: "SET_DRAGGED_ITEM";
      payload: DragItem | undefined;
    }
  | {
      type: "MOVE_TASK";
      payload: {
        dragIndex: number;
        hoverIndex: number;
        sourceColumn: string;
        targetColumn: string;
      };
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
    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload;
      state.lists = moveItem(state.lists, dragIndex, hoverIndex);
      return { ...state };
    }
    case "SET_DRAGGED_ITEM": {
      return { ...state, draggedItem: action.payload };
    }
    case "MOVE_TASK": {
      const {
        dragIndex,
        hoverIndex,
        sourceColumn,
        targetColumn
      } = action.payload;
      const sourceListIndex = findItemIndexById(state.lists, sourceColumn);
      const targetListIndex = findItemIndexById(state.lists, targetColumn);
      const item = state.lists[sourceListIndex].tasks.splice(dragIndex, 1)[0];
      state.lists[targetListIndex].tasks.splice(hoverIndex, 0, item);
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
