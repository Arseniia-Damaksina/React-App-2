import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

interface AddTasklistButtonProps {
  setTaskListForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTasklistButton: React.FC<AddTasklistButtonProps> = ({
  setTaskListForm
}) => {
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTaskListForm(true);
  };

  return (
    <button
      onClick={handleButtonClick}
      className="p-3 rounded-lg bg-secondary text-white flex items-center"
    >
      <PlusIcon className="w-5 h-5" />
      <span className="hidden sm:block">Create New List</span>
    </button>
  );
};

export default AddTasklistButton;
