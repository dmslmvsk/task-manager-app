import { api } from "@/lib/api";
import type { Task, CreateTaskDTO, TaskStatus } from "./types";

export const getTasks = async (): Promise<Task[]> => {
    const { data } = await api.get("/tasks");
    return data;
};

export const createTask = async (payload: CreateTaskDTO): Promise<Task> => {
    const { data } = await api.post("/tasks", payload);
    return data;
};

export const updateTaskStatus = async ({
    id,
    status,
}: {
    id: number;
    status: TaskStatus;
}) => {
    const { data } = await api.patch(`/tasks/${id}`, { status });
    return data;
};

export const deleteTask = async (id: number) => {
    const { data } = await api.delete(`/tasks/${id}`);
    return data;
};
