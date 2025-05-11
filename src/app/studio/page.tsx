"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  SparklesIcon,
  DownloadIcon,
  LoaderIcon,
  RotateCcwIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ArrowLeft,
  Redo,
  Undo,
  Image as ImageIcon,
  SendIcon,
  TextCursorInput,
  BookIcon,
  History,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarSeparator,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { env } from "@/env";

import { api } from "@/trpc/react";

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

const Studio = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageHistory, setImageHistory] = useState<GeneratedImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  const [scale, setScale] = useState(1);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const promptInputRef = useRef<HTMLInputElement>(null);

  // Load books from localStorage when component mounts
  useEffect(() => {
    const storedBooks = JSON.parse(
      localStorage.getItem("coloringBooks") || "[]",
    );
    setBooks(storedBooks);
  }, []);

  const generateImageMutation = api.imageGeneration.generateImage.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateImageMutation.mutate({ prompt });
    }
  };

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

  const handleUndo = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      toast.info("Reverted to previous version");
    }
  };

  const handleRedo = () => {
    if (currentImageIndex < imageHistory.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      toast.info("Restored to next version");
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const selectImage = (index: number) => {
    if (index >= 0 && index < imageHistory.length) {
      setCurrentImageIndex(index);
    }
  };

  const currentImage =
    currentImageIndex >= 0 ? imageHistory[currentImageIndex] : null;

  return (
    <SidebarProvider>
      <div className="bg-secondary/20 flex h-screen w-full overflow-hidden">
        {/* Sidebar for history */}
        <Sidebar side="left" variant="sidebar">
          <SidebarHeader>
            <div className="flex items-center justify-between px-4 py-2">
              <Link
                href="/"
                className="text-primary hover:text-primary/80 flex items-center"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                <span className="font-medium">Back</span>
              </Link>
              <div className="flex items-center">
                <History className="text-muted-foreground mr-1 h-4 w-4" />
                <span className="text-sm font-medium">Image History</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                {imageHistory.length > 0 ? (
                  <div className="space-y-2 px-2">
                    {imageHistory.map((img, idx) => (
                      <div
                        key={img.id}
                        className={`cursor-pointer rounded-md p-3 transition-colors ${idx === currentImageIndex ? "bg-primary/10 border-primary/30 border" : "hover:bg-secondary/70 bg-secondary/40"}`}
                        onClick={() => selectImage(idx)}
                      >
                        <div className="mb-2 flex items-center">
                          <div className="bg-muted mr-2 h-8 w-8 overflow-hidden rounded">
                            <img
                              src={img.url}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-muted-foreground text-xs">
                            {new Date(img.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {idx === currentImageIndex && (
                              <span className="text-primary ml-2 font-medium">
                                • Current
                              </span>
                            )}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-xs">{img.prompt}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground p-4 text-center text-sm">
                    <TextCursorInput className="mx-auto mb-2 h-8 w-8 opacity-50" />
                    <p>No image history yet</p>
                    <p className="mt-1 text-xs">
                      Enter a prompt to get started
                    </p>
                  </div>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset>
          <div className="bg-secondary/20 flex h-screen overflow-hidden">
            {/* Left Panel - Lovable Style Interface */}
            <div className="border-border/50 bg-background flex w-1/3 flex-col border-r">
              {/* Header */}
              <div className="border-border/50 flex items-center border-b p-4">
                <h1 className="flex items-center text-2xl font-bold">
                  <ImageIcon className="text-primary mr-2 h-6 w-6" />
                  Studio Generator
                </h1>
              </div>

              {/* Main Content Area */}
              <div className="flex flex-grow flex-col overflow-hidden p-4">
                {/* Chat/History Display - Mimics Lovable's conversation area */}
                <div className="bg-secondary/20 mb-4 flex-grow overflow-y-auto rounded-lg p-4">
                  {imageHistory.length > 0 ? (
                    <div className="space-y-4">
                      {imageHistory.map((img, idx) => (
                        <div
                          key={img.id}
                          className={`rounded-lg p-3 ${idx === currentImageIndex ? "bg-primary/10 border-primary/30 border" : "bg-secondary/40"}`}
                          onClick={() => selectImage(idx)}
                        >
                          <p className="text-muted-foreground text-sm">
                            Prompt:
                          </p>
                          <p className="text-sm font-medium">{img.prompt}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-muted-foreground text-xs">
                              {new Date(img.timestamp).toLocaleTimeString()}
                            </span>
                            {idx === currentImageIndex && (
                              <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                      <div className="bg-primary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                        <TextCursorInput className="text-primary/50 h-10 w-10" />
                      </div>
                      <h3 className="mb-2 text-xl font-medium">
                        Start with a prompt
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Describe what you want to generate below
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Prompt Area - Similar to Lovable's input area */}
                <div className="bg-background border-border/50 sticky bottom-0 rounded-lg border shadow-lg">
                  <div className="flex flex-col space-y-2 p-4">
                    {currentImage && (
                      <div className="border-border/30 border-b pb-2">
                        <div className="flex justify-between">
                          <p className="text-muted-foreground text-sm">
                            Currently viewing:
                          </p>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleUndo}
                              disabled={currentImageIndex <= 0}
                            >
                              <Undo className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleRedo}
                              disabled={
                                currentImageIndex >= imageHistory.length - 1
                              }
                            >
                              <Redo className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="truncate text-sm font-medium">
                          {currentImage.prompt}
                        </p>
                      </div>
                    )}

                    <div className="relative">
                      <Textarea
                        placeholder="Describe what you want to create... (e.g., 'A friendly dragon in a castle')"
                        className="min-h-[100px] resize-none pr-12"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <Button
                        className="absolute right-2 bottom-2"
                        size="sm"
                        disabled={
                          !prompt.trim() || generateImageMutation.isPending
                        }
                        onClick={() => generateImageMutation.mutate({ prompt })}
                      >
                        {generateImageMutation.isPending ? (
                          <LoaderIcon className="h-4 w-4 animate-spin" />
                        ) : (
                          <SendIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Image Display */}
            <div className="bg-secondary/30 flex w-2/3 flex-col">
              <div
                className="relative flex flex-grow items-center justify-center p-10"
                ref={canvasRef}
              >
                {currentImage ? (
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
                  </>
                ) : (
                  <div className="max-w-md p-8 text-center">
                    <div className="bg-primary/10 mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full">
                      <SparklesIcon className="text-primary/50 h-16 w-16" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold">Ready to create</h3>
                    <p className="text-muted-foreground mb-6 text-lg">
                      Enter a prompt and generate your first line art
                    </p>
                  </div>
                )}
              </div>

              {/* History Slider */}
              {imageHistory.length > 0 && (
                <div className="bg-background border-border/50 flex h-24 items-center gap-4 overflow-x-auto border-t px-4">
                  {imageHistory.map((image, index) => (
                    <div
                      key={image.id}
                      className={`h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-primary scale-110"
                          : "border-border/50"
                      }`}
                      onClick={() => selectImage(index)}
                    >
                      <img
                        src={image.url}
                        alt={`Version ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SidebarInset>
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
    </SidebarProvider>
  );
};

export default Studio;
