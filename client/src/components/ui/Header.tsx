import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/tudu.png";
import AddTasklistButton from "../buttons/AddTasklistButton";
import HistoryButton from "../buttons/HistoryButton";

const Header: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  let headerTitle = "";

  const taskBoardId = parseInt(currentPath.split("/")[2], 10);

  if (currentPath === "/") {
    headerTitle = "Task Boards";
  } else if (currentPath.startsWith("/taskboard")) {
    headerTitle = "My Task Board";
  }

  return (
    <div className="min-h-20 w-full flex justify-between items-center pr-6 pl-4 py-4">
      <div className="flex justify-start items-center">
        <img className="w-16" src={logo} alt="Logo" />
        <p className="hidden sm:block font-bold" style={{ fontSize: "36px" }}>
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
