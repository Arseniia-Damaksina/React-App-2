import React, { useState } from "react";
import AddTaskBoardButton from "./buttons/AddTaskBoardButton";
import AddTaskBoardForm from "./forms/AddTaskBoardForm";

const AddTaskBoard: React.FC = () => {
  const [taskBoardForm, setTaskBoardForm] = useState<boolean>(false);

  return (
    <div className="flex items-center w-64">
      {taskBoardForm ? (
        <AddTaskBoardForm setTaskBoardForm={setTaskBoardForm} />
      ) : (
        <AddTaskBoardButton setTaskBoardForm={setTaskBoardForm} />
      )}
    </div>
  );
};

export default AddTaskBoard;

