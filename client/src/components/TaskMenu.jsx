import { useEffect } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch } from "../store/store";
import { deleteTaskAsync } from "../slices/taskSlice";
import { fetchTasksAsync } from "../slices/taskSlice";

const TaskMenu = ({ id, setEditModalOpen, setTaskModalOpen }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  const handleDeleteTask = (taskListId) => {
    dispatch(deleteTaskAsync(taskListId)).then(() => {
      dispatch(fetchTasksAsync());
    });
  };

  const handleEditTask = () => {
    setEditModalOpen(true);
    setTaskModalOpen(false);
  };

  return (
    <Menu>
      <MenuHandler>
        <EllipsisVerticalIcon className="w-6 h-6" />
      </MenuHandler>
      <MenuList>
        <MenuItem
          onClick={() => setTaskModalOpen(true)}
          className="flex items-center mb-1"
        >
          <FolderOpenIcon className="w-5 h-5 mr-1" />
          Open
        </MenuItem>
        <MenuItem onClick={handleEditTask} className="flex items-center mb-1">
          <PencilSquareIcon className="w-5 h-5 mr-1" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => handleDeleteTask(id)}
          className="flex items-center mb-1 text-primary"
        >
          <TrashIcon className="w-5 h-5 mr-1" />
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TaskMenu;
