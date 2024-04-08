import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { TaskList } from "../types/types";
// @ts-ignore
import TaskListMenu from "./menus/TaskListMenu";
import EditTaskListForm from "./forms/EditTaskListForm";
import Task from "./Task";
import AddButton from "./buttons/AddTaskButton";
import AddTaskForm from "./forms/AddTaskForm";
import { selectTaskLists } from "../slices/taskListSlice";
import { fetchTasksAsync, selectTasks } from "../slices/taskSlice";
import Modal from "./ui/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskColumn: React.FC<{ tasklist: TaskList; taskBoardId: number }> = ({
  tasklist,
  taskBoardId,
}) => {
  const dispatch = useAppDispatch();
  const tasks = useSelector(selectTasks);
  const tasklists = useSelector(selectTaskLists);

  const selectOptions = tasklists.filter(
    (tasklist) => tasklist.taskBoardId === taskBoardId
  );

  const [open, setOpen] = React.useState<number | null>(null);
  const [addModalOpen, setAddModalOpen] = React.useState<boolean>(false);
  const [updateForm, setUpdateForm] = React.useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  const tasksByCategory = tasks.filter(
    (task) =>
      task.taskListTitle === tasklist.title &&
      task.taskBoardId === tasklist.taskBoardId
  );

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setUpdateForm(true);
  };

  return (
    <>
      {addModalOpen && (
        <Modal active={addModalOpen} setActive={setAddModalOpen}>
          <AddTaskForm tasklist={tasklist} setAddModalOpen={setAddModalOpen} />
        </Modal>
      )}

      <div className="flex flex-col mr-4 flex-shrink-0 w-64 md:w-56 lg:w-64">
        {tasklist.title !== "Closed" ? (
          <>
            <div className="flex justify-between py-4 pl-3 pr-2 rounded-lg bg-tertiary">
              {updateForm ? (
                <EditTaskListForm
                  tasklist={tasklist}
                  taskBoardId={taskBoardId}
                  setUpdateForm={setUpdateForm}
                />
              ) : (
                <p className="font-bold">{tasklist.title}</p>
              )}
              <div className="flex items-center">
                <span className="font-bold pr-1">{tasksByCategory.length}</span>
                <TaskListMenu
                  id={tasklist.id}
                  taskBoardId={taskBoardId}
                  onClick={handleButtonClick}
                  setAddModalOpen={setAddModalOpen}
                />
              </div>
            </div>
            <AddButton
              text={"Add New Task"}
              onClick={() => setAddModalOpen(true)}
            />
            <div>
              {tasksByCategory.map((task) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    selectOptions={selectOptions}
                    tasklists={tasklists}
                    closed={false}
                    open={null}
                    setOpen={setOpen}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between py-4 pl-3 pr-2 rounded-lg bg-primary">
              <p className="font-bold">{tasklist.title}</p>
              <div className="flex items-center">
                <span className="font-bold pr-1">{tasksByCategory.length}</span>
              </div>
            </div>
            <div className="mt-3">
              {tasksByCategory.map((task) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    tasklists={tasklists}
                    open={open}
                    closed={true}
                    setOpen={setOpen}
                    selectOptions={selectOptions}
                  />
                );
              })}
            </div>
          </>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default TaskColumn;
