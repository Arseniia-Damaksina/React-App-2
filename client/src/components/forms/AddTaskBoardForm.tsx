import React, { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { createTaskBoardAsync } from "../../slices/taskBoardSlice";
import { capitalizeString, showToastError } from "../../utils/utilFunctions";
import { ToastContainer } from "react-toastify";

interface AddTaskBoardFormProps {
  setTaskBoardForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTaskBoardForm: React.FC<AddTaskBoardFormProps> = ({ setTaskBoardForm }) => {
  const dispatch = useAppDispatch();
  const [newTaskBoard, setNewTaskBoard] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskBoard(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskBoard.trim()) {
      showToastError("Task board name cannot be empty");
      return;
    }
    dispatch(createTaskBoardAsync(capitalizeString(newTaskBoard)));
    setNewTaskBoard("");
    setTaskBoardForm(false);
  };

  const handleHideButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTaskBoardForm(false);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col w-full mb-3">
      <input
        type="text"
        value={newTaskBoard}
        onChange={handleInputChange}
        placeholder="Add your task board"
        className="border-2 border-secondary rounded-lg p-3 bg-white shadow-lg"
      />
      <div className="flex justify-between w-full">
        <button type="submit" className="w-1/2 p-3 mt-2 rounded-lg bg-tertiary text-white">
          Create
        </button>
        <button
          className="w-1/2 px-2 mt-2 ml-2 rounded-lg bg-white text-secondary shadow-lg border border-secondary"
          onClick={handleHideButtonClick}
        >
          Hide
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default AddTaskBoardForm;
