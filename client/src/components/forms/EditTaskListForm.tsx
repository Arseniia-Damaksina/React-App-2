import React, { useState } from "react";
import { TaskList } from "../../types/types";
import { useAppDispatch } from "../../store/store";
import {
  updateTaskListAsync,
  fetchTaskListsAsync,
} from "../../slices/taskListSlice";
import { capitalizeString, showToastError } from "../../utils/utilFunctions";

interface EditTaskListFormProps {
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
  tasklist: TaskList;
  taskBoardId: number;
}

const EditTaskListForm: React.FC<EditTaskListFormProps> = ({
  tasklist,
  taskBoardId,
  setUpdateForm,
}) => {
  const dispatch = useAppDispatch();
  const [updatedTaskList, setUpdatedTaskList] = useState<string>(
    tasklist.title
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTaskList(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updatedTaskList.trim()) {
      showToastError("Task list cannot be empty");
      return;
    }
    dispatch(
      updateTaskListAsync({
        taskBoardId,
        taskListId: tasklist.id,
        updatedTitle: capitalizeString(updatedTaskList),
      })
    ).then(() => {
      dispatch(fetchTaskListsAsync());
    });
    setUpdateForm(false);
  };

  const handleHideButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setUpdateForm(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={updatedTaskList}
        onChange={handleChange}
        placeholder="Edit your tasklist"
        className="rounded-lg p-2"
      />
      <button
        type="submit"
        className="px-2 py-1 mt-2 mr-2 rounded-lg border border-secondary bg-secondary text-white"
      >
        Edit
      </button>
      <button
        className="px-2 py-1 rounded-lg bg-white text-secondary shadow-lg border border-secondary"
        onClick={handleHideButtonClick}
      >
        Hide
      </button>
    </form>
  );
};

export default EditTaskListForm;
