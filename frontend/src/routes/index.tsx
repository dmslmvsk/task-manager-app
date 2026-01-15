import { createFileRoute } from "@tanstack/react-router";
import { CreateTaskForm } from "@/features/tasks/components/create-task-form";
import { TaskList } from "@/features/tasks/components/task-list";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div className="max-w-xl mx-auto p-6 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                <p className="text-zinc-500">Manage your daily goals.</p>
            </div>

            <CreateTaskForm />
            <TaskList />
        </div>
    );
}
