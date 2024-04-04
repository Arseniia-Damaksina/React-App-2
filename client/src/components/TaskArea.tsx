import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import TaskColumn from "./TaskColumn";
import { fetchTaskListsAsync, selectTaskLists } from "../slices/taskListSlice";

const TaskArea: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasklists = useSelector(selectTaskLists);
  const location = useLocation();

  const taskBoardId = location.pathname.split("/")[2];

  const tasksByBoard = tasklists.filter(
    (tasklist) => tasklist.taskBoardId === parseInt(taskBoardId, 10)
  );

  const closedTasklistIndex = tasksByBoard.findIndex(
    (tasklist) => tasklist.title === "Closed"
  );
  let modifiedTasklists =
    closedTasklistIndex !== -1
      ? tasksByBoard.filter((tasklist) => tasklist.title !== "Closed")
      : [...tasksByBoard];
  if (closedTasklistIndex !== -1) {
    modifiedTasklists.push(tasksByBoard[closedTasklistIndex]);
  }

  console.log(modifiedTasklists)

  useEffect(() => {
    dispatch(fetchTaskListsAsync());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-start mx-6 overflow-x-scroll min-h-3/4 h-auto sm:flex-wrap md:flex-nowrap">
      {modifiedTasklists.map((tasklist) => {
        return <TaskColumn key={tasklist.id} tasklist={tasklist} taskBoardId={parseInt(taskBoardId, 10)}/>;
      })}
    </div>
  );
};

export default TaskArea;
