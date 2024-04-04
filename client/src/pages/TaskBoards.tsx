import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { capitalizeString } from "../utils/utilFunctions";
import Header from "../components/ui/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { selectTaskBoards } from "../slices/taskBoardSlice";
import {
  fetchTaskBoardsAsync,
  updateTaskBoardAsync,
} from "../slices/taskBoardSlice";
// @ts-ignore
import TaskBoardMenu from "../components/menus/TaskBoardMenu";
import AddTaskBoardButton from "../components/buttons/AddTaskBoardButton";

const TaskBoards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const taskboards = useSelector(selectTaskBoards);
  const navigate = useNavigate();

  const [updatedBoard, setUpdatedBoard] = useState<string>("");
  const [taskBoardForm, setTaskBoardForm] = useState<boolean>(false);
  const [selectedTaskBoardId, setSelectedTaskBoardId] = useState<number | null>(
    null
  );

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedBoard(e.target.value);
  };

  const handleHideButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setTaskBoardForm(false);
  };

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    if (!updatedBoard.trim()) {
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
    dispatch(
      updateTaskBoardAsync({
        taskBoardId: id,
        updatedBoard: capitalizeString(updatedBoard),
      })
    );
    setUpdatedBoard("");
    setTaskBoardForm(false);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold my-5">Choose Your Task Board</h1>
        <div className="flex flex-col items-center">
          <AddTaskBoardButton />
          {taskboards.map((taskboard) => {
            return (
              <React.Fragment key={taskboard.id}>
                {taskBoardForm && selectedTaskBoardId === taskboard.id ? (
                  <form
                    onSubmit={(e) => handleFormSubmit(e, taskboard.id)}
                    className="flex flex-col w-full mb-3"
                  >
                    <input
                      type="text"
                      value={updatedBoard}
                      onChange={handleInputChange}
                      placeholder="Add your task board"
                      className="border-2 border-secondary rounded-lg p-3 bg-white shadow-lg"
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
                  </form>
                ) : (
                  <button
                    key={taskboard.id}
                    className="w-64 p-3 mb-3 rounded-lg bg-secondary text-white text-xl font-bold flex justify-between items-center"
                    onClick={() => handleNavigate(taskboard.id)}
                  >
                    <p>{taskboard.board}</p>
                    <TaskBoardMenu
                      taskboard={taskboard}
                      onEdit={handleEditForm}
                    />
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TaskBoards;
