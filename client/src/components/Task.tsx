import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { TaskInterface, TaskList } from "../types/types";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { getPriorityColor } from "../utils/utilFunctions";
// @ts-ignore
import TaskMenu from "./TaskMenu";
import EditTaskForm from "./forms/EditTaskForm";
import { updateTaskAsync, fetchTasksAsync } from "../slices/taskSlice";
import Modal from "./ui/Modal";
import TaskCard from "./TaskCard";

const Task: React.FC<{
  task: TaskInterface;
  tasklists: TaskList[];
  open: null | number;
  setOpen: React.Dispatch<React.SetStateAction<null | number>>;
  closed: boolean;
}> = ({ task, tasklists, closed }) => {
  
  const [selectMove, setSelectMove] = useState<string>("Move To");
  const [open, setOpen] = React.useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOption = e.target.value;
    setSelectMove(selectedOption);

    const updatedTaskList = tasklists.find(
      (tasklist) => tasklist.title === selectedOption
    );

    if (updatedTaskList) {
      await dispatch(
        updateTaskAsync({
          taskId: task.id,
          updatedTask: {
            ...task,
            taskListId: updatedTaskList.id,
            taskListTitle: updatedTaskList.title,
          },
        })
      );
    } else {
      console.error("Task list not found for selected option:", selectedOption);
    }

    window.location.reload();
  };

  const handleOpen = (value: number) => {
    setOpen((prev) => (prev === value ? null : value));
  };

  return (
    <>
      {editModalOpen && (
        <Modal active={editModalOpen} setActive={setEditModalOpen}>
          <EditTaskForm task={task} setEditModalOpen={setEditModalOpen} />
        </Modal>
      )}
      {taskModalOpen && (
        <Modal active={taskModalOpen} setActive={setTaskModalOpen}>
          <TaskCard
            task={task}
            setTaskModalOpen={setTaskModalOpen}
            setEditModalOpen={setEditModalOpen}
          />
        </Modal>
      )}

      <div
        className={`mb-3 pt-3 pb-4 px-4 rounded-lg ${
          closed ? "bg-closed" : "bg-tertiaryLight"
        }`}
      >
        <div
          className={`w-full flex justify-between cursor-pointer ${
            closed ? "pointer" : ""
          }`}
          onClick={closed ? () => handleOpen(task.id) : undefined}
        >
          <p className="font-bold w-9/10">
            {task.name.length > 45 ? (
              <>
                {task.name.slice(0, 45)}...
              </>
            ) : (
              task.name
            )}
          </p>

          <TaskMenu
            id={task.id}
            setEditModalOpen={setEditModalOpen}
            setTaskModalOpen={setTaskModalOpen}
          />
        </div>
        {(closed && open === task.id) || !closed ? (
          <>
            <p className="text-secondaryVariant my-2 border-l-2 border-secondary pl-2">
              {task.description.length > 45 ? (
                <>
                  {task.description.slice(0, 45)}...
                  <span
                    className="underline text-coolBlack"
                    onClick={() => setTaskModalOpen(true)}
                  >
                    More
                  </span>
                </>
              ) : (
                task.description
              )}
            </p>
            <div className="flex mb-2">
              <CalendarDaysIcon className="h-6 w-6 mr-1" />
              <span>{task.dueDate}</span>
            </div>
            <div
              className={`w-fit px-2 pb-1 flex justify-center rounded-lg font-semibold ${getPriorityColor(
                task.priority
              )}`}
            >
              <span className="font-semibold">{task.priority}</span>
            </div>
            <select
              name="moveTo"
              value={selectMove}
              onChange={(e) => handleSelectChange(e)}
              className="w-full p-1 rounded-lg mt-3"
            >
              <option value="">Move To</option>
              {tasklists
                .filter((taskList) => taskList.title !== task.taskListTitle)
                .map((taskList) => (
                  <option key={taskList.id} value={taskList.title}>
                    {taskList.title}
                  </option>
                ))}
            </select>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Task;
