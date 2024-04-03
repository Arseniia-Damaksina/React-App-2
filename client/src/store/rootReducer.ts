import { combineReducers } from "@reduxjs/toolkit";
import taskListsReducer from "../slices/taskListSlice";
import tasksReducer from "../slices/taskSlice";
import activityReducer from "../slices/activitySlice";

const rootReducer = combineReducers({
  taskLists: taskListsReducer,
  tasks: tasksReducer,
  activity: activityReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;