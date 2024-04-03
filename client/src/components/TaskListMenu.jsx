import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch } from "../store/store";
import { deleteTaskListAsync } from "../slices/taskListSlice";

const TaskListMenu = ({ id, onClick, setAddModalOpen }) => {
  const dispatch = useAppDispatch();

  const handleDeleteTaskList = (taskListId) => {
    dispatch(deleteTaskListAsync(taskListId));
  };

  return (
    <Menu className="flex justify-start rounded-lg">
      <MenuHandler>
        <EllipsisVerticalIcon className="w-6 h-6" />
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={onClick} className="flex items-center mb-1">
          <PencilSquareIcon className="w-5 h-5 mr-1" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => setAddModalOpen(true)}
          className="flex items-center mb-1"
        >
          <PlusIcon className="w-5 h-5 mr-1" /> Add New Task
        </MenuItem>
        <MenuItem
          onClick={() => handleDeleteTaskList(id)}
          className="flex items-center mb-1 text-primary"
        >
          <TrashIcon className="w-5 h-5 mr-1" />
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TaskListMenu;
