import React, { useState } from "react";
import AddTasklistButton from "./buttons/AddTasklistButton";
import AddTasklistForm from "./forms/AddTaskListForm";

const AddTaskList: React.FC<{ taskBoardId: number }> = ({ taskBoardId }) => {
  const [taskListForm, setTaskListForm] = useState<boolean>(false);

  return (
    <div className="flex items-center">
      {taskListForm ? (
        <AddTasklistForm
          setTaskListForm={setTaskListForm}
          taskBoardId={taskBoardId}
        />
      ) : (
        <AddTasklistButton setTaskListForm={setTaskListForm} />
      )}
    </div>
  );
};

export default AddTaskList;
