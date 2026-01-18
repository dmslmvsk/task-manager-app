import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useLogin } from "@/features/auth/hooks";

export const Route = createFileRoute("/auth/login")({
    component: LoginPage,
});

const formSchema = z.object({
    email: z.string("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

function LoginPage() {
    const { mutate, isPending, error } = useLogin();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values);
    }

    return (
        <div className="w-full max-w-sm space-y-6 border bg-white p-8 rounded-lg shadow-sm">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">Login</h1>
                <p className="text-zinc-500 text-sm">
                    Enter your credentials to access tasks
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="user@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {error && (
                        <div className="text-sm text-red-500 font-medium text-center">
                            Login failed. Please check your credentials.
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </Form>

            <div className="text-center text-sm">
                <span className="text-zinc-500">Don't have an account? </span>
                <Link
                    to="/auth/register"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
}
