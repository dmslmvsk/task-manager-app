import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/features/auth/store";
import { Button } from "@/components/ui/button";
import { LayoutList, LogOut, User } from "lucide-react";

export function Header() {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate({ to: "/auth/login" });
    };

    return (
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className="text-xl font-bold tracking-tight flex items-center gap-2"
                    >
                        <div className="bg-indigo-600 p-1.5 rounded-lg">
                            <LayoutList className="text-white w-5 h-5" />
                        </div>
                        TaskFlow
                    </Link>

                    <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
                        <Link
                            to="/"
                            className="text-zinc-500 hover:text-zinc-900 [&.active]:text-indigo-600"
                        >
                            Home
                        </Link>
                        {isAuthenticated && (
                            <Link
                                to="/tasks"
                                className="text-zinc-500 hover:text-zinc-900 [&.active]:text-indigo-600"
                            >
                                My Tasks
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-full">
                                <User className="w-4 h-4" />
                                <span className="font-medium">
                                    {user?.username}
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                                className="text-zinc-500"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" asChild>
                                <Link to="/auth/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/auth/register">Get Started</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
