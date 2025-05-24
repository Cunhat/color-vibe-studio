"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormMessage,
  Form,
  FormDescription,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";

const BookFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(256, {
    message: "Title must be less than 256 characters",
  }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(256, {
      message: "Description must be less than 256 characters",
    }),
});

type BookFormType = z.infer<typeof BookFormSchema>;

export default function CreateBookSection() {
  const [open, setOpen] = useState(false);

  const form = useForm<BookFormType>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createBookMutation = api.book.createBook.useMutation({
    onSuccess: () => {
      setOpen(false);
      form.reset();
    },
  });

  function onSubmit(data: BookFormType) {
    createBookMutation.mutate({
      title: data.title,
      description: data.description,
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="mt-4 md:mt-0">Create New Book</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Book</AlertDialogTitle>
          <AlertDialogDescription>
            Create a new book to store your coloring pages.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => form.reset()}>
                Cancel
              </AlertDialogCancel>
              <Button type="submit">
                {createBookMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {createBookMutation.isPending ? "Creating..." : "Create Book"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
