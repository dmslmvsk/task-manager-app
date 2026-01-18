import { TaskItem } from "./task-item";
import { type Task } from "@/features/tasks/types";

interface TaskListProps {
    tasks: Task[];
    isLoading?: boolean;
}

export function TaskList({ tasks, isLoading }: TaskListProps) {
    if (isLoading) return <div className="space-y-3"></div>;

    if (!tasks?.length)
        return (
            <div className="text-center py-12 border-2 border-dashed rounded-3xl border-zinc-100 text-zinc-400">
                No tasks found.
            </div>
        );

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}
