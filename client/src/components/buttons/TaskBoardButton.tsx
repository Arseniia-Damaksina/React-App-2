import React from "react";
import { capitalizeString } from "../../utils/utilFunctions";
// @ts-ignore
import TaskBoardMenu from "../menus/TaskBoardMenu";

interface TaskBoardButtonProps {
  taskboard: { id: number; board: string };
  onEdit: (id: number, board: string) => void;
  onNavigate: (id: number) => void;
}

const TaskBoardButton: React.FC<TaskBoardButtonProps> = ({ taskboard, onEdit, onNavigate }) => {
  return (
    <button
      key={taskboard.id}
      className="w-64 p-3 mb-3 rounded-lg bg-secondary text-white text-xl font-bold flex justify-between items-center"
      onClick={() => onNavigate(taskboard.id)}
    >
      <p>{capitalizeString(taskboard.board)}</p>
      <TaskBoardMenu taskboard={taskboard} onEdit={onEdit} />
    </button>
  );
};

export default TaskBoardButton;
