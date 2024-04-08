import React, { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { createTaskListAsync } from "../../slices/taskListSlice";
import { capitalizeString, showToastError } from "../../utils/utilFunctions";

interface AddTasklistFormProps {
  setTaskListForm: React.Dispatch<React.SetStateAction<boolean>>;
  taskBoardId: number;
}

const AddTasklistForm: React.FC<AddTasklistFormProps> = ({
  setTaskListForm,
  taskBoardId,
}) => {
  const dispatch = useAppDispatch();
  const [newTaskList, setNewTaskList] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskList(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskList.trim()) {
      showToastError("Task list cannot be empty");
      return;
    }
    dispatch(
      createTaskListAsync({ title: capitalizeString(newTaskList), taskBoardId })
    );
    setNewTaskList("");
    setTaskListForm(false);
  };

  const handleHideButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setTaskListForm(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTaskList}
        onChange={handleChange}
        placeholder="Add your tasklist"
        className="border border-secondary rounded-lg p-3 bg-white shadow-lg"
      />
      <button
        type="submit"
        className="ml-2 p-3 rounded-lg bg-tertiary text-white"
      >
        Create
      </button>
      <button
        onClick={handleHideButtonClick}
        className="p-3 ml-2 rounded-lg bg-white text-secondary shadow-lg border border-secondary"
      >
        Hide
      </button>
    </form>
  );
};

export default AddTasklistForm;
