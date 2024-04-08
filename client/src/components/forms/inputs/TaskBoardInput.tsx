import React from "react";

interface TaskBoardInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const TaskBoardInput: React.FC<TaskBoardInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border-2 border-secondary rounded-lg p-3 bg-white shadow-lg"
    />
  );
};

export default TaskBoardInput;
