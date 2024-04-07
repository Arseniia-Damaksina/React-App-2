import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../store/store";
import { createTaskListAsync } from "../../slices/taskListSlice";
import { capitalizeString, showToastError } from "../../utils/utilFunctions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTasklistButton: React.FC<{ taskBoardId: number }> = ({
  taskBoardId,
}) => {
  const dispatch = useAppDispatch();
  const [newTaskList, setNewTaskList] = useState<string>("");
  const [taskListForm, setTaskListForm] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskList(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskList.trim()) {
      showToastError("Task list cannot be empty");
      return;
    }
    dispatch(
      createTaskListAsync({ title: capitalizeString(newTaskList), taskBoardId })
    );
    setNewTaskList("");
    setTaskListForm(false);
  };

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTaskListForm(true);
  };

  const handleHideButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setTaskListForm(false);
  };

  return (
    <div className="flex items-center">
      {taskListForm ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTaskList}
            onChange={handleChange}
            placeholder="Add your tasklist"
            className="border border-secondary rounded-lg p-3 bg-white shadow-lg"
          />
          <button
            type="submit"
            className="ml-2 p-3 rounded-lg bg-tertiary text-white"
          >
            Create
          </button>
          <button
            className="p-3 ml-2 rounded-lg bg-white text-secondary shadow-lg border border-secondary"
            onClick={handleHideButtonClick}
          >
            Hide
          </button>
        </form>
      ) : (
        <button
          className="p-3 rounded-lg bg-secondary text-white flex items-center"
          onClick={handleButtonClick}
        >
          <PlusIcon className="w-5 h-5" />
          <span className="hidden sm:block">Create New List</span>
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddTasklistButton;
