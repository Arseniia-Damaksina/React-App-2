import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/tudu.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import AddTasklistButton from "../buttons/AddTasklistButton";
import HistoryButton from "../buttons/HistoryButton";
import { selectTaskBoards, fetchTaskBoardsAsync } from "../../slices/taskBoardSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const taskboards = useSelector(selectTaskBoards);

  useEffect(() => {
    dispatch(fetchTaskBoardsAsync());
  }, [dispatch]);

  const location = useLocation();
  const currentPath = location.pathname;
  let headerTitle: string | undefined;

  const taskBoardId = parseInt(currentPath.split("/")[2], 10);

  if (currentPath === "/") {
    headerTitle = "Task Boards";
  } else if (currentPath.startsWith("/taskboard")) {
    const taskboard = taskboards.find((board) => board.id === taskBoardId);
    headerTitle = taskboard?.board
  }

  return (
    <div className="min-h-20 w-full flex flex-col md:flex-row justify-between items-center pr-6 pl-4 py-4">
      <div className="flex justify-start items-center">
        <img className="w-16" src={logo} alt="Logo" />
        <p className="font-bold" style={{ fontSize: "36px" }}>
          {headerTitle}
        </p>
      </div>
      <div className="flex">
        {headerTitle !== "Task Boards" && (
          <>
            <HistoryButton />
            <AddTasklistButton taskBoardId={taskBoardId}/>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
