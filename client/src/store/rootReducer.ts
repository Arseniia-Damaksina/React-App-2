import { combineReducers } from "@reduxjs/toolkit";
import taskBordSlice from "../slices/taskBoardSlice";
import taskListsReducer from "../slices/taskListSlice";
import tasksReducer from "../slices/taskSlice";
import activityReducer from "../slices/activitySlice";

const rootReducer = combineReducers({
  taskBoards: taskBordSlice,
  taskLists: taskListsReducer,
  tasks: tasksReducer,
  activity: activityReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;