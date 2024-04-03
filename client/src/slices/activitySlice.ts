import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Activity, ActivityState } from "../types/types";
import { RootState } from "../store/rootReducer";
import {
  getAllActivityLogs,
  getLogsByTypeAndId,
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

export const fetchLogsByTypeAndId = createAsyncThunk(
  "activity/fetchLogsByTypeAndId",
  async ({ type, id }: { type: string; id: number }) => {
    try {
      const response = await getLogsByTypeAndId(type, id);
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
  async () => {
    try {
      await clearActivityLog();
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
      .addCase(fetchLogsByTypeAndId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogsByTypeAndId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activity = action.payload;
      })
      .addCase(fetchLogsByTypeAndId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(logOneActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOneActivity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activity.push(action.payload); // Assuming the logged activity is added to the state
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
        state.activity = []; // Assuming the activity log state is cleared
      })
      .addCase(clearActivityLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      });
  },
});

export const selectActivity = (state: RootState) => state.activity.activity;

export default activitySlice.reducer;
