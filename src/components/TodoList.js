import { ErrorMessage, Field, Form, Formik } from "formik";
import { useTask } from "./TaskContextProvider";
import TextError from "./TextError";
import * as Yup from "yup";
let id = 0;
let complete = false;

function TodoList({ edit, id: editId, setEditTask }) {
  const { dispatch } = useTask();

  let initialValues = { task: "" };

  const validationSchema = Yup.object({
    task: Yup.string().required("Required!"),
  });

  const onSubmit = (values) => {
    if (edit) {
      const editTask = { task: values.task, id: editId };
      dispatch({ type: "edit", payload: editTask });
      setEditTask((edit) => !edit);
    } else {
      const newTask = { task: values.task, id: id++, complete };
      dispatch({ type: "add", payload: newTask });
      values.task = "";
    }
  };

  return (
    <div
      className={` p-3 shadow-2xl rounded-md bg-[#ffffff] ${
        edit ? "  border-gray-300" : " "
      }`}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        <Form>
          <div className=" items-center flex justify-between gap-2">
            <Field
              className="focus:outline-none  flex-grow min-w-20 focus:border-gray-300 rounded-md px-2 py-1 border border-gray-300"
              id="task"
              type="text"
              name="task"
              placeholder={edit ? "Edit Task" : "Enter Task"}
            />
            <button
              type="submit"
              className={`  text-base  text-white py-1 px-2 rounded-md ${
                edit
                  ? "hover:bg-blue-600 bg-blue-400 "
                  : "hover:bg-[#dedede] bg-[#f3f4f6]"
              }`}>
              {edit ? " Edit" : "📝"}
            </button>
          </div>
          <ErrorMessage
            name="task"
            component={TextError}
          />
        </Form>
      </Formik>
    </div>
  );
}

export default TodoList;
