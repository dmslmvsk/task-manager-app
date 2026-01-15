import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTask } from "@/features/tasks/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const schema = z.object({
    title: z.string().min(1, "Required"),
});

export function CreateTaskForm() {
    const { mutate, isPending } = useCreateTask();
    const form = useForm<{ title: string }>({
        resolver: zodResolver(schema),
        defaultValues: { title: "" },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    mutate(
                        { title: data.title },
                        { onSuccess: () => form.reset() }
                    );
                })}
                className="flex gap-2"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    placeholder="Add a new task..."
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    Add
                </Button>
            </form>
        </Form>
    );
}
