import { useState } from "react"; // Добавили useState
import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreateTaskForm } from "@/features/tasks/components/create-task-form";
import { TaskList } from "@/features/tasks/components/task-list";
import { useAuthStore } from "@/features/auth/store";
import { useTasks } from "@/features/tasks/hooks"; // Импортируем хук здесь
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Если есть в shadcn
type FilterValue = "all" | "new" | "done";
export const Route = createFileRoute("/tasks")({
    beforeLoad: () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        if (!isAuthenticated) {
            throw redirect({ to: "/auth/login" });
        }
    },
    component: TasksPage,
});

function TasksPage() {
    const { data: tasks = [] } = useTasks();
    const [filter, setFilter] = useState<FilterValue>("all");

    const filteredTasks = tasks.filter((task) => {
        if (filter === "all") return true;
        return task.status === filter;
    });

    return (
        <div className="max-w-2xl mx-auto p-6 py-12 space-y-10">
            <div className="space-y-2 text-center md:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
                    My Tasks
                </h1>
                <p className="text-zinc-500">
                    Add, complete and manage your daily activities.
                </p>
            </div>

            <div className="space-y-6">
                <CreateTaskForm />

                <div className="flex flex-col gap-4">
                    <Tabs
                        defaultValue="all"
                        onValueChange={(value) =>
                            setFilter(value as FilterValue)
                        }
                    >
                        <TabsList className="grid w-full grid-cols-3 max-w-100">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="new">Active</TabsTrigger>
                            <TabsTrigger value="done">Completed</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <TaskList tasks={filteredTasks} />
                </div>
            </div>
        </div>
    );
}
