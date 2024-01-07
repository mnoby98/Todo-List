import "./App.css";
import TodoList from "./components/TodoList";
import TaskContextProvider from "./components/TaskContextProvider";
import Tasks from "./components/Tasks";

function App() {
  return (
    <TaskContextProvider>
      <div className=" h-svh flex gap-5 flex-col md:flex-row  items-center px-2 justify-center   bg-[#0bb6ff]">
        <main className="pt-2  lg:text-base lg:font-normal md:text-xl md:font-semibold  text-xl  font-semibold   rounded-md  w-full  max-w-md">
          <section>
            <TodoList />
          </section>
          <section>
            <Tasks />
          </section>
        </main>
        <header>
          <NextLevelEgy />
        </header>
      </div>
    </TaskContextProvider>
  );
}

export default App;

function NextLevelEgy() {
  return (
    <div className=" uppercase items-center h-80 flex flex-col justify-center text-white font-bold text-3xl">
      To Do List
      <p className="  font-semibold px-2 py-1  text-center  bg-[#101010]">
        Next Level Egy
      </p>
    </div>
  );
}
