import { useState } from "react";
import Task from "./Task";
import { useTask } from "./TaskContextProvider";

function Tasks() {
  const [filter, setFilter] = useState("all");
  const { tasks } = useTask();
  const orderTasks = [...tasks].sort((a, b) =>
    a.complete ? 1 : b.complete ? -1 : 0
  );
  return orderTasks?.length !== 0 ? (
    <div className="mt-4 shadow-2xl bg-[#ffffff] rounded-lg overflow-y-auto max-h-80">
      <div className="flex justify-between px-3">
        <div>
          <label htmlFor="filter">Tasks</label>
          <select
            className="border-2 border-gray-300 rounded-md m-2"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      {filter === "all" &&
        orderTasks?.map((task) => (
          <Task
            task={task.task}
            key={task.id}
            id={task.id}
            complete={task.complete}
          />
        ))}
      {filter === "complete" &&
        orderTasks?.map(
          (task) =>
            task.complete === true && (
              <Task
                task={task.task}
                key={task.id}
                id={task.id}
                complete={task.complete}
              />
            )
        )}
      {filter === "incomplete" &&
        orderTasks?.map(
          (task) =>
            task.complete === false && (
              <Task
                task={task.task}
                key={task.id}
                id={task.id}
                complete={task.complete}
              />
            )
        )}
    </div>
  ) : (
    <div className="text-gray-600 text-center mt-4">
      No tasks available. Enter your task!
    </div>
  );
}

export default Tasks;
