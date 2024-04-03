import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../store/store";
import Header from "./ui/Header";
import TaskColumn from "./TaskColumn";
import { fetchTaskListsAsync, selectTaskLists } from '../slices/taskListSlice';

const TaskArea: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasklists = useSelector(selectTaskLists);

  const closedTasklistIndex = tasklists.findIndex(tasklist => tasklist.title === "Closed");
  let modifiedTasklists = closedTasklistIndex !== -1 ? tasklists.filter(tasklist => tasklist.title !== "Closed") : [...tasklists];
  if (closedTasklistIndex !== -1) {
    modifiedTasklists.push(tasklists[closedTasklistIndex]);
  }

  useEffect(() => {
    dispatch(fetchTaskListsAsync());
  }, [dispatch]); 

  return (
    <div className="w-9/10 min-h-9/10 h-auto my-8 rounded-large bg-white rounded-2xl shadow-lg">
      <Header />
      <div className="flex flex-col items-center sm:flex-row sm:items-start mx-6 overflow-x-scroll min-h-3/4 h-auto sm:flex-wrap md:flex-nowrap">
        {modifiedTasklists.map((tasklist) => {
          return <TaskColumn key={tasklist.id} tasklist={tasklist} />;
        })}
      </div>
    </div>
  );
};

export default TaskArea;
