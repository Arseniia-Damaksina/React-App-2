import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

interface AddTaskBoardButtonProps {
  setTaskBoardForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTaskBoardButton: React.FC<AddTaskBoardButtonProps> = ({ setTaskBoardForm }) => {
  const handleAddBoardButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTaskBoardForm(true);
  };

  return (
    <button
      className="w-64 flex justify-center items-center p-3 mb-3 border-2 border-secondary rounded-lg bg-white font-bold text-xl shadow-lg"
      onClick={handleAddBoardButtonClick}
    >
      <PlusIcon className="w-5 h-5" />
      <span>Create New Board</span>
    </button>
  );
};

export default AddTaskBoardButton;
