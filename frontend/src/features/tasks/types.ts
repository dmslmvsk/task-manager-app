export type TaskStatus = "new" | "done";

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
}

export interface CreateTaskDTO {
    title: string;
    description?: string;
}
