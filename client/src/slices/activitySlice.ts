import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Activity, ActivityState } from "../types/types";
import { RootState } from "../store/rootReducer";
import {
  getAllActivityLogs,
  getLogsByTaskBoardId,
  logActivity,
  clearActivityLog,
} from "../api/activityAPI";

const initialState: ActivityState = {
  activity: [],
  status: "",
  error: null,
};

export const fetchAllActivityLogs = createAsyncThunk(
  "activity/fetchAllActivityLogs",
  async () => {
    try {
      const response = await getAllActivityLogs();
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch all activity logs");
    }
  }
);

export const fetchLogsByTaskBoardId = createAsyncThunk(
  "activity/fetchLogsByTaskBoardId",
  async ({ taskBoardId }: { taskBoardId: number }) => {
    try {
      const response = await getLogsByTaskBoardId(taskBoardId);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch activity logs by type and ID");
    }
  }
);

export const logOneActivity = createAsyncThunk(
  "activity/logOneActivity",
  async (activityData: Activity) => {
    try {
      const response = await logActivity(activityData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to log activity");
    }
  }
);

export const clearActivityLogs = createAsyncThunk(
  "activity/clearActivityLogs",
  async (taskBoardId: number) => {
    try {
      await clearActivityLog(taskBoardId);
    } catch (error) {
      throw new Error("Failed to clear all activity logs");
    }
  }
);

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllActivityLogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllActivityLogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activity = action.payload;
      })
      .addCase(fetchAllActivityLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;;
      })
      .addCase(fetchLogsByTaskBoardId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogsByTaskBoardId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activity = action.payload;
      })
      .addCase(fetchLogsByTaskBoardId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(logOneActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOneActivity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activity.push(action.payload); 
      })
      .addCase(logOneActivity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(clearActivityLogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearActivityLogs.fulfilled, (state) => {
        state.status = "succeeded";
        state.activity = []; 
      })
      .addCase(clearActivityLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      });
  },
});

export const selectActivity = (state: RootState) => state.activity.activity;

export default activitySlice.reducer;
