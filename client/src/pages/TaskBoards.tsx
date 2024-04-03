import React, { useEffect } from "react";
import Header from "../components/ui/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { selectTaskBoards } from "../slices/taskBoardSlice";
import { fetchTaskBoardsAsync } from "../slices/taskBoardSlice";
// @ts-ignore
import TaskBoardMenu from "../components/menus/TaskBoardMenu";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const taskboards = useSelector(selectTaskBoards);
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/taskboard/${id}`);
  };

  useEffect(() => {
    dispatch(fetchTaskBoardsAsync());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold my-5">Choose Your Task Board</h1>
        <div className="flex flex-col">
          <button className="w-64 flex justify-center items-center p-3 mb-3 border-2 border-secondary rounded-lg bg-white font-bold text-xl shadow-lg">
            + Add New Task Board
          </button>
          {taskboards.map((taskboard) => {
            return (
              <button
                key={taskboard.id}
                className="w-64 p-3 mb-3 rounded-lg bg-secondary text-white text-xl font-bold flex justify-center items-center"
                onClick={() => handleNavigate(taskboard.id)}
              >
                <p>{taskboard.board}</p>
                <TaskBoardMenu />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
