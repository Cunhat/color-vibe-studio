"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookIcon, DownloadIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

interface Book {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  images: string[];
}

export default function GeneratedImage() {
  const [imageHistory, setImageHistory] = useState<GeneratedImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  const [scale, setScale] = useState(1);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  // Load books from localStorage when component mounts
  useEffect(() => {
    const storedBooks = JSON.parse(
      localStorage.getItem("coloringBooks") || "[]",
    );
    setBooks(storedBooks);
  }, []);

  const handleDownload = () => {
    if (currentImageIndex === -1 || !imageHistory.length) {
      toast.error("No image to download");
      return;
    }

    // In a real implementation, this would download the actual image
    window.open(imageHistory[currentImageIndex].url, "_blank");
    toast.success("Download started!");
  };

  const handleSaveToBook = (bookId: string) => {
    if (currentImageIndex === -1 || !imageHistory.length) {
      toast.error("No image to save");
      return;
    }

    // Get books from localStorage
    const storedBooks = JSON.parse(
      localStorage.getItem("coloringBooks") || "[]",
    );
    const bookIndex = storedBooks.findIndex((b: Book) => b.id === bookId);

    if (bookIndex !== -1) {
      // Add the image to the book
      storedBooks[bookIndex].images.push(imageHistory[currentImageIndex].url);
      localStorage.setItem("coloringBooks", JSON.stringify(storedBooks));
      toast.success("Image saved to book!");
      setShowBookDialog(false);
    } else {
      toast.error("Book not found");
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  return (
    <>
      <div className="absolute top-6 right-6 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomOut}
          disabled={scale <= 0.5}
        >
          <ZoomOutIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomIn}
          disabled={scale >= 2}
        >
          <ZoomInIcon className="h-4 w-4" />
        </Button>
        <span className="bg-secondary inline-flex items-center justify-center rounded px-2 text-sm">
          {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Image action buttons in the image area (right side) */}
      <div className="absolute right-6 bottom-6 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={!currentImage}
        >
          <DownloadIcon className="mr-1 h-4 w-4" />
          Download
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowBookDialog(true)}
          disabled={!currentImage || books.length === 0}
        >
          <BookIcon className="mr-1 h-4 w-4" />
          Save to Book
        </Button>
      </div>

      <div
        className="max-h-full transition-all duration-200"
        style={{ transform: `scale(${scale})` }}
      >
        <img
          src={currentImage.url}
          alt="Generated line art"
          className="max-h-[70vh] rounded-lg object-contain shadow-lg"
        />
      </div>
      {/* Dialog for saving to book */}
      <Dialog open={showBookDialog} onOpenChange={setShowBookDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save to Book</DialogTitle>
            <DialogDescription>
              Choose which book to save your line art to
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2 py-4">
            {books.length === 0 ? (
              <div className="py-4 text-center">
                <p className="mb-4">You don't have any books yet.</p>
                <Button asChild>
                  <Link href="/books">
                    <BookIcon className="mr-2 h-4 w-4" />
                    Create a Book
                  </Link>
                </Button>
              </div>
            ) : (
              books.map((book) => (
                <Button
                  key={book.id}
                  variant="outline"
                  className="h-auto justify-start py-3"
                  onClick={() => handleSaveToBook(book.id)}
                >
                  <div className="flex items-center">
                    <BookIcon className="text-primary mr-2 h-4 w-4" />
                    <div className="text-left">
                      <p className="font-medium">{book.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {book.images.length} images
                      </p>
                    </div>
                  </div>
                </Button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
