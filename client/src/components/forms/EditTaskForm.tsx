import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../store/store";
import { fetchTasksAsync, updateTaskAsync } from "../../slices/taskSlice";
import { addTask, FormData, TaskInterface } from "../../types/types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  capitalizeFirstLetter,
  showToastError,
} from "../../utils/utilFunctions";

const EditTaskForm: React.FC<{
  task: TaskInterface;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ task, setEditModalOpen }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    name: task.name,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const taskToUpdate: addTask = {
    ...formData,
    name: capitalizeFirstLetter(formData.name),
    taskListId: task.taskListId,
    taskListTitle: task.taskListTitle,
    taskBoardId: task.taskBoardId,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToastError("Task list cannot be empty");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(formData.dueDate);
    if (!formData.dueDate || selectedDate < currentDate) {
      showToastError("Please, select the valid date");
      return;
    }

    if (!["Low", "Medium", "High"].includes(formData.priority)) {
      showToastError("Please, choose the priority");
      return;
    }

    await dispatch(
      updateTaskAsync({ taskId: task.id, updatedTask: taskToUpdate })
    );
    await dispatch(fetchTasksAsync());
    setFormData({
      name: "",
      description: "",
      dueDate: "",
      priority: "",
    });
    setEditModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-80 bg-white rounded-2xl">
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-end">
          <button onClick={() => setEditModalOpen(false)}>
            <XMarkIcon className="w-6 h-6 mr-3 mt-3" />
          </button>
        </div>
        <h1 className="text-secondary w-full font-bold text-3xl p-3 text-center">
          Edit Task
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col py-3 w-5/6">
        <label htmlFor="name">Task Name: </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-lg p-2 border-2 mb-3 shadow-lg"
        />
        <label htmlFor="name">Description: </label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="rounded-lg p-2 border-2 mb-3 shadow-lg"
        ></textarea>
        <label htmlFor="name">Date: </label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="rounded-lg p-2 border-2 mb-3 shadow-lg"
        />
        <label htmlFor="name">Priority: </label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="rounded-lg p-2 border-2 mb-3 shadow-lg"
        >
          <option value="">Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          className="p-2 my-3 rounded-lg bg-secondary text-white"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditTaskForm;
