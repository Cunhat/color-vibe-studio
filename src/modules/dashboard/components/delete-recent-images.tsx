"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { api } from "@/trpc/react";

type DeleteRecentImagesProps = {
  selectedImages: string[];
};

export default function DeleteRecentImages({
  selectedImages,
}: DeleteRecentImagesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const utils = api.useUtils();

  const deleteImagesMutation = api.image.deleteImages.useMutation({
    onSuccess: async () => {
      await utils.image.getImages.invalidate();
      setIsOpen(false);
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete all your selected images.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteImagesMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={() => deleteImagesMutation.mutate(selectedImages)}
            disabled={deleteImagesMutation.isPending}
          >
            {deleteImagesMutation.isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {deleteImagesMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
