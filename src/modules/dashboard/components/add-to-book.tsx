"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book } from "lucide-react";
import { useForm } from "react-hook-form";

import { z } from "zod";

type AddToBookProps = {
  selectedImages: Array<string>;
};

const AddToBookSchema = z.object({
  book: z.string().min(1, { message: "Selecting a book is required!" }),
});

type AddToBookFormType = z.infer<typeof AddToBookSchema>;

export default function AddToBook({ selectedImages }: AddToBookProps) {
  const booksQuery = api.book.getBooks.useQuery();

  const form = useForm<AddToBookFormType>({
    resolver: zodResolver(AddToBookSchema),
    defaultValues: {
      book: "",
    },
  });

  function onSubmit(data: AddToBookFormType) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Book className="h-4 w-4" />
          Add to Book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Book</DialogTitle>
          <DialogDescription>
            Select a book to add the selected images to.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="add-to-book-form"
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="book"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a book" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {booksQuery.data?.map((book) => {
                        return (
                          <SelectItem key={book.id} value={book.id}>
                            {book.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add to Book</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
