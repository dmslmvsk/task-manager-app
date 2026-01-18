import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTask } from "@/features/tasks/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function CreateTaskForm() {
    const { mutate, isPending } = useCreateTask();

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    function onSubmit(values: FormValues) {
        mutate(values, {
            onSuccess: () => {
                form.reset();
                toast.success("Task created!");
            },
            onError: () => {
                toast.error("Failed to create task");
            },
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100"
            >
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        placeholder="What needs to be done?"
                                        className="bg-white border-zinc-200"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-indigo-600 hover:bg-indigo-700"
                    >
                        {isPending ? "Adding..." : "Add Task"}
                    </Button>
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <textarea
                                    className="w-full min-h-20 p-3 rounded-md border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    placeholder="Add description (optional)..."
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
