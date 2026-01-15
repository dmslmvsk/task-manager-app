export type TaskStatus = "new" | "done";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}

// Данные для создания
export interface CreateTaskDTO {
    title: string;
    description?: string;
}
