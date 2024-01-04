import { createContext, useReducer, useContext } from "react";

const initialState = {
  tasks: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { tasks: [...state.tasks, action.payload] };
    case "edit":
      const editTask = state.tasks.find(
        (task) => task.id === action.payload.id
      );
      editTask.task = action.payload.task;
      return { tasks: [...state.tasks] };
    case "delete":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "complete":
      const completedTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      const completedTasks = [...state.tasks];
      completedTasks[completedTaskIndex] = {
        ...completedTasks[completedTaskIndex],
        complete: !completedTasks[completedTaskIndex].complete,
      };
      return {
        tasks: completedTasks,
      };
    default:
      throw new Error("Unknown action type");
  }
}

const taskContext = createContext();

function TaskContextProvider({ children }) {
  const [{ tasks }, dispatch] = useReducer(reducer, initialState);
  return (
    <taskContext.Provider value={{ dispatch, tasks }}>
      {children}
    </taskContext.Provider>
  );
}

export default TaskContextProvider;

function useTask() {
  const context = useContext(taskContext);
  if (context === undefined) throw new Error("Context used out of Provider");
  return context;
}

export { taskContext, useTask };
