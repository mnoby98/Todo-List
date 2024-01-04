import { useState } from "react";
import { useTask } from "./TaskContextProvider";
import TodoList from "./TodoList";

function Task({ task, id, complete }) {
  const [editTask, setEditTask] = useState(false);
  const { dispatch } = useTask();

  return (
    <div className={`  p-2 border-b border-gray-300`}>
      <DeployTask
        task={task}
        id={id}
        complete={complete}
        dispatch={dispatch}
        setEditTask={setEditTask}
        editTask={editTask}
      />
      {editTask && (
        <TodoList
          id={id}
          setEditTask={setEditTask}
          edit="edit"
        />
      )}
    </div>
  );
}

export default Task;

function DeployTask({ id, complete, dispatch, task, setEditTask, editTask }) {
  function handleEdit() {
    setEditTask((prevEditTask) => !prevEditTask);
  }

  function handleCompleteTask() {
    dispatch({ type: "complete", payload: id });
  }
  return (
    <div
      className={`flex justify-between items-center p-2 ${
        complete ? "bg-gray-100" : ""
      }`}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          checked={complete}
          onChange={() => handleCompleteTask()}
          className=" w-4 h-4 cursor-pointer "
        />
        <div className={`${complete ? "line-through" : ""}`}>{task}</div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit()}
          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          {editTask ? "Close" : "Edit"}
        </button>
        <button
          onClick={() => dispatch({ type: "delete", payload: id })}
          className="bg-red-500 text-white  px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">
          X
        </button>
      </div>
    </div>
  );
}
