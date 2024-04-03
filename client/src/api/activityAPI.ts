import axios, { AxiosResponse } from "axios";
import { Activity } from "../types/types";
import { API_BASE_URL } from "../utils/url";

export async function getAllActivityLogs(): Promise<AxiosResponse<Activity[]>> {
  try {
    const response = await axios.get<Activity[]>(`${API_BASE_URL}/activity`);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch all activities");
  }
}

export async function getLogsByTypeAndId(
  type: string,
  id: number
): Promise<AxiosResponse<Activity[]>> {
  try {
    const response = await axios.get<Activity[]>(
      `${API_BASE_URL}/activity/${type}/${id}`
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

export async function clearActivityLog(): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/activity`);
  } catch (error) {
    throw new Error("Failed to clear activity log");
  }
}
