import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../store/store";
import { createTaskBoardAsync } from "../../slices/taskBoardSlice";
import { capitalizeString } from "../../utils/utilFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTasklistButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newTaskBoard, setNewTaskBoard] = useState<string>("");
  const [taskBoardForm, setTaskBoardForm] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskBoard(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskBoard.trim()) {
      toast.error("Task board name cannot be empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    dispatch(createTaskBoardAsync(capitalizeString(newTaskBoard)));
    setNewTaskBoard("");
    setTaskBoardForm(false);
  };

  const handleAddBoardButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setTaskBoardForm(true);
  };

  const handleHideButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setTaskBoardForm(false);
  };

  return (
    <div className="flex items-center w-64">
      {taskBoardForm ? (
        <form onSubmit={handleFormSubmit} className="flex flex-col w-full mb-3">
          <input
            type="text"
            value={newTaskBoard}
            onChange={handleInputChange}
            placeholder="Add your task board"
            className="border-2 border-secondary rounded-lg p-3 bg-white shadow-lg"
          />
          <div className="flex justify-between w-full">
          <button
            type="submit"
            className="w-1/2 p-3 mt-2 rounded-lg bg-tertiary text-white"
          >
            Create
          </button>
          <button
            className="w-1/2 px-2 mt-2 ml-2 rounded-lg bg-white text-secondary shadow-lg border border-secondary"
            onClick={handleHideButtonClick}
          >
            Hide
          </button>
          </div>
        </form>
      ) : (
        <button
          className="w-64 flex justify-center items-center p-3 mb-3 border-2 border-secondary rounded-lg bg-white font-bold text-xl shadow-lg"
          onClick={handleAddBoardButtonClick}
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create New Board</span>
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddTasklistButton;
