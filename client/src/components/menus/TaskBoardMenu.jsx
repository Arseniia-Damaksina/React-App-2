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
} from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../store/store";
import { deleteTaskBoardAsync } from "../../slices/taskBoardSlice";

const TaskBoardMenu = ({ taskboard, onEdit }) => {
  const dispatch = useAppDispatch();

  const handleDeleteTaskBoard = (taskBoardId) => {
    dispatch(deleteTaskBoardAsync(taskBoardId));
  };

  return (
    <Menu className="flex justify-start rounded-lg">
      <MenuHandler>
        <EllipsisVerticalIcon className="w-6 h-6" />
      </MenuHandler>
      <MenuList>
        <MenuItem
          className="flex items-center mb-1"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(taskboard.id, taskboard.board);
          }}
        >
          <PencilSquareIcon className="w-5 h-5 mr-1" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTaskBoard(taskboard.id);
          }}
          className="flex items-center mb-1 text-primary"
        >
          <TrashIcon className="w-5 h-5 mr-1" />
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TaskBoardMenu;
