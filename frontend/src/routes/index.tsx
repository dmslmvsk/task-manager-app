import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreateTaskForm } from "@/features/tasks/components/create-task-form";
import { TaskList } from "@/features/tasks/components/task-list";
import { useAuthStore } from "@/features/auth/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
    beforeLoad: () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        if (!isAuthenticated) {
            throw redirect({
                to: "/auth/login",
            });
        }
    },
    component: Index,
});

function Index() {
    const logout = useAuthStore((s) => s.logout);

    return (
        <div className="max-w-xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                    <p className="text-zinc-500">Manage your daily goals.</p>
                </div>
                <Button variant="outline" onClick={() => logout()}>
                    Logout
                </Button>
            </div>

            <CreateTaskForm />
            <TaskList />
        </div>
    );
}
