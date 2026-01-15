import { api } from "@/lib/api";
import type { Task, CreateTaskDTO, TaskStatus } from "./types";

// 1. Получение (все ок)
export const getTasks = async (): Promise<Task[]> => {
    const { data } = await api.get("/tasks");
    return data;
};

// 2. Создание (ИСПРАВЛЕНО: переименовали аргумент в payload)
export const createTask = async (payload: CreateTaskDTO): Promise<Task> => {
    const { data } = await api.post("/tasks", payload);
    return data;
};

// 3. Обновление (ИСПРАВЛЕНО: возвращаем data для единообразия)
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

// 4. Удаление (ИСПРАВЛЕНО: возвращаем data)
export const deleteTask = async (id: number) => {
    const { data } = await api.delete(`/tasks/${id}`);
    return data;
};
