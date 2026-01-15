import { useTasks, useToggleTask, useDeleteTask } from "@/features/tasks/hooks";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function TaskList() {
    const { data: tasks, isLoading } = useTasks();
    const { mutate: toggle } = useToggleTask();
    const { mutate: remove } = useDeleteTask();

    if (isLoading) return <div>Loading...</div>;
    if (!tasks?.length)
        return <div className="text-zinc-500">No tasks yet.</div>;

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className="p-4 flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={task.status === "done"}
                            onCheckedChange={(checked) => {
                                toggle({
                                    id: task.id,
                                    status: checked ? "done" : "new",
                                });
                            }}
                        />
                        <span
                            className={
                                task.status === "done"
                                    ? "line-through text-zinc-500"
                                    : ""
                            }
                        >
                            {task.title}
                        </span>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => remove(task.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </Card>
            ))}
        </div>
    );
}
