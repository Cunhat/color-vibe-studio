import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookIcon, ImageIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";

export default function QuickActionsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SparklesIcon className="text-primary h-5 w-5" />
            Studio Generator
          </CardTitle>
          <CardDescription>
            Create new line art with AI assistance
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/studio">Launch Studio</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookIcon className="text-primary h-5 w-5" />
            Books Collection
          </CardTitle>
          <CardDescription>
            Manage and organize your coloring books
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/books">View Books</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="text-primary h-5 w-5" />
            Image Collection
          </CardTitle>
          <CardDescription>
            Manage and organize your generated images
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/images">View Images</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
