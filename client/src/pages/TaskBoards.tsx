import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTaskBoards } from "../slices/taskBoardSlice";
import { fetchTaskBoardsAsync } from "../slices/taskBoardSlice";
import AddTaskBoard from "../components/AddTaskBoard";
import TaskBoardButton from "../components/buttons/TaskBoardButton";
import EditTaskBoardForm from "../components/forms/EditTaskBoardForm";
import Header from "../components/Header";

const TaskBoards: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskboards = useSelector(selectTaskBoards);
  const navigate = useNavigate();

  const [updatedBoard, setUpdatedBoard] = useState<string>("");
  const [taskBoardForm, setTaskBoardForm] = useState<boolean>(false);
  const [selectedTaskBoardId, setSelectedTaskBoardId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchTaskBoardsAsync());
  }, [dispatch]);

  const handleNavigate = (id: number) => {
    navigate(`/taskboard/${id}`);
  };

  const handleEditForm = (id: number, board: string) => {
    setTaskBoardForm(true);
    setSelectedTaskBoardId(id);
    setUpdatedBoard(board);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold my-5 text-center">Choose Your Task Board</h1>
        <div className="flex flex-col items-center">
          <AddTaskBoard />
          {taskboards.map((taskboard) => {
            return (
              <React.Fragment key={taskboard.id}>
                {taskBoardForm && selectedTaskBoardId === taskboard.id ? (
                  <EditTaskBoardForm
                    updatedBoard={updatedBoard}
                    setUpdatedBoard={setUpdatedBoard}
                    setTaskBoardForm={setTaskBoardForm}
                    selectedTaskBoardId={taskboard.id}
                  />
                ) : (
                  <TaskBoardButton
                    taskboard={taskboard}
                    onEdit={handleEditForm}
                    onNavigate={handleNavigate}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskBoards;
