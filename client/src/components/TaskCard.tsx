import React from "react";
import { TaskInterface } from "../types/types";
import {
  PencilSquareIcon,
  XMarkIcon,
  CalendarDaysIcon,
  ListBulletIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { fetchLogsByTypeAndId, selectActivity } from "../slices/activitySlice";

const TaskCard: React.FC<{
  task: TaskInterface;
  setTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ task, setTaskModalOpen, setEditModalOpen }) => {
  const dispatch = useAppDispatch();
  const activityLogs = useSelector(selectActivity);

  useEffect(() => {
    dispatch(fetchLogsByTypeAndId({ type: "task", id: task.id }));
  }, [dispatch, task.id]);

  const handleEdit = () => {
    setEditModalOpen(true);
    setTaskModalOpen(false);
  };

  const handleClose = () => {
    setEditModalOpen(false);
    setTaskModalOpen(false);
  };
  return (
    <div className="flex flex-col items-start w-3/4 lg:w-2/3 xl:1/2 bg-white rounded-xl">
      <div className="w-full flex justify-end bg-secondary rounded-t-xl p-2">
        <button onClick={handleEdit}>
          <PencilSquareIcon className="w-6 h-6 text-white mr-2" />
        </button>
        <button onClick={handleClose}>
          <XMarkIcon className="w-6 h-6 text-white mr-2" />
        </button>
      </div>
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/3 m-5">
          <div className="w-full flex justify-start">
            <div className="flex justify-start">
              <p className="text-secondary w-full font-bold text-3xl p-3 text-left">
                {task.name}
              </p>
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-1/3 flex flex-col text-lg px-3">
              <div className="w-full text-gray-400 pb-3 flex items-center">
                <ListBulletIcon className="w-5 h-5 mr-2" />
                <span>Task List</span>
              </div>
              <div className="text-gray-400 pb-3 flex items-center">
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                <span>Date</span>
              </div>
              <div className="text-gray-400 pb-3 flex items-center">
                <ArrowUpIcon className="w-5 h-5 mr-2" />
                <span>Priority</span>
              </div>
            </div>
            <div className="w- flex flex-col text-lg px-3">
              <p className="w-full pb-3">{task.taskListTitle}</p>
              <p className="w-full pb-3">{task.dueDate}</p>
              <p className="w-full pb-3">{task.priority}</p>
            </div>
          </div>
          <div className="px-3 pb-2">
            <p className="text-xl font-bold py-2">Description</p>
            <p className="text-gray-400 pb-3">{task.description}</p>
          </div>
        </div>
        <div className="bg-gray-100 w-full md:w-2/3 p-5">
          <h2 className="text-2xl font-bold p-3">Activity</h2>
          <ul>
            {activityLogs.length > 0 ? (
              <ul>
                {activityLogs.map((activity) => (
                  <li
                    className="flex m-3 text-sm text-gray-600"
                    key={activity.id}
                  >
                    <p className="w-2/3 mr-3">- {activity.log.text}</p>
                    <p className="w-1/3">{activity.log.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No activity logs found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
