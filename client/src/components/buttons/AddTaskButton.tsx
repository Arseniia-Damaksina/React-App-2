import React from "react";
import { onClickButtonProps } from "../../types/types";
import { PlusIcon } from "@heroicons/react/24/outline";

const AddButton: React.FC<onClickButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 my-3 border-2 border-tertiary rounded-lg bg-white text-secondary text-md font-semibold flex items-center justify-center"
    >
      <PlusIcon className="h-5 w-5"/> {text}
    </button>
  );
};

export default AddButton;
