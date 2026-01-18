import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
    component: WelcomePage,
});

function WelcomePage() {
    return (
        <div className="py-20 flex flex-col items-center text-center space-y-8 px-4">
            <div className="space-y-4 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900">
                    Organize your work <br />
                    <span className="text-indigo-600">and life, finally.</span>
                </h1>
                <p className="text-xl text-zinc-600">
                    Become focused, organized, and calm with TaskFlow. The
                    world’s best task manager and to-do list app.
                </p>
            </div>

            <div className="flex gap-4">
                <Button size="lg" className="h-12 px-8 text-lg" asChild>
                    <Link to="/tasks">
                        Go to My Tasks <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-5xl w-full text-left">
                {[
                    "Fast and intuitive interface",
                    "Real-time data sync",
                    "Modern tech stack (Go + React)",
                ].map((feature) => (
                    <div
                        key={feature}
                        className="flex gap-3 items-start p-4 border rounded-xl bg-white"
                    >
                        <CheckCircle2 className="text-green-500 w-6 h-6 shrink-0" />
                        <span className="font-medium text-zinc-700">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
