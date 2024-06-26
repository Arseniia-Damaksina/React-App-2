import React from "react";
import { useAppDispatch } from "../../store/store";
import { updateTaskBoardAsync } from "../../slices/taskBoardSlice";
import { capitalizeString, showToastError } from "../../utils/utilFunctions";
import { ToastContainer } from "react-toastify";
import TaskBoardInput from "./inputs/TaskBoardInput";

interface EditTaskBoardFormProps {
  updatedBoard: string;
  setUpdatedBoard: React.Dispatch<React.SetStateAction<string>>;
  setTaskBoardForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTaskBoardId: number;
}

const EditTaskBoardForm: React.FC<EditTaskBoardFormProps> = ({
  updatedBoard,
  setUpdatedBoard,
  setTaskBoardForm,
  selectedTaskBoardId,
}) => {
  const dispatch = useAppDispatch();

  const handleHideButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setTaskBoardForm(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updatedBoard.trim()) {
      showToastError("Task board name cannot be empty");
      return;
    }
    dispatch(
      updateTaskBoardAsync({
        taskBoardId: selectedTaskBoardId,
        updatedBoard: capitalizeString(updatedBoard),
      })
    );
    setUpdatedBoard("");
    setTaskBoardForm(false);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col w-full mb-3">
      <TaskBoardInput
        value={updatedBoard}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdatedBoard(e.target.value)}
        placeholder="Edit your task board"
      />
      <div className="flex justify-between w-full">
        <button
          type="submit"
          className="w-1/2 p-3 mt-2 rounded-lg bg-tertiary text-white"
        >
          Edit
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

export default EditTaskBoardForm;
