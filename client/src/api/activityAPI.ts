import axios, { AxiosResponse } from "axios";
import { Activity } from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAllActivityLogs(): Promise<AxiosResponse<Activity[]>> {
  try {
    const response = await axios.get<Activity[]>(`${API_BASE_URL}/activity`);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch all activities");
  }
}

export async function getLogsByTaskBoardId(
  taskBoardId: number
): Promise<AxiosResponse<Activity[]>> {
  try {
    const response = await axios.get<Activity[]>(
      `${API_BASE_URL}/activity/${taskBoardId}`
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch activity logs");
  }
}

export async function logActivity(
  activityData: Activity
): Promise<AxiosResponse<Activity>> {
  try {
    const response = await axios.post<Activity>(
      `${API_BASE_URL}/activity`,
      activityData
    );
    return response;
  } catch (error) {
    throw new Error("Failed to log activity");
  }
}

export async function clearActivityLog(taskBoardId: number): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/activity/${taskBoardId}`);
  } catch (error) {
    throw new Error("Failed to clear activity log");
  }
}
