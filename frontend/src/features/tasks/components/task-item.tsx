import { useState } from "react";
import { useToggleTask, useDeleteTask } from "@/features/tasks/hooks";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronDown, AlignLeft } from "lucide-react";
import { type Task } from "@/features/tasks/types";
import { cn } from "@/lib/utils";

interface TaskItemProps {
    task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { mutate: toggle } = useToggleTask();
    const { mutate: remove } = useDeleteTask();

    const isDone = task.status === "done";

    return (
        <Card
            className={cn(
                "relative overflow-hidden transition-all duration-300 group border-zinc-200/60",
                "hover:border-indigo-200 hover:shadow-md",
                isDone ? "bg-zinc-50/50" : "bg-white",
                isExpanded && "ring-1 ring-indigo-100 shadow-sm",
            )}
        >
            <div
                className={cn(
                    "absolute left-0 top-0 bottom-0 w-1 transition-colors",
                    isDone ? "bg-zinc-300" : "bg-indigo-500",
                )}
            />

            <div className="p-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-4 flex-1">
                    <div className="pt-1">
                        <Checkbox
                            className="h-5 w-5 rounded-md border-zinc-300"
                            checked={isDone}
                            onCheckedChange={(checked) => {
                                toggle({
                                    id: task.id,
                                    status: checked ? "done" : "new",
                                });
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                        <div
                            className="cursor-pointer select-none"
                            onClick={() =>
                                task.description && setIsExpanded(!isExpanded)
                            }
                        >
                            <span
                                className={cn(
                                    "text-base font-semibold transition-all leading-tight block",
                                    isDone
                                        ? "line-through text-zinc-400 font-normal"
                                        : "text-zinc-800",
                                )}
                            >
                                {task.title}
                            </span>

                            {task.description && !isExpanded && (
                                <div className="flex items-center gap-1.5 mt-1 text-zinc-400">
                                    <AlignLeft className="w-3 h-3" />
                                    <span className="text-[12px] truncate max-w-50">
                                        {task.description}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    {task.description && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-8 w-8 text-zinc-400 transition-transform",
                                isExpanded && "rotate-180",
                            )}
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-300 hover:text-red-500 hover:bg-red-50"
                        onClick={() => remove(task.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Раскрывающееся описание */}
            {isExpanded && task.description && (
                <div className="px-14 pb-4 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-zinc-500 leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                        {task.description}
                    </p>
                </div>
            )}
        </Card>
    );
}
