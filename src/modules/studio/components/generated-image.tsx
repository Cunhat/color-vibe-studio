"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { AlertTriangle, DownloadIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import GeneratingImgLoader from "./generating-img-loader";

type GeneratedImageProps = {
  id: string;
};

export function GeneratedImage({ id }: GeneratedImageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GeneratedImageSuspense id={id} />
    </Suspense>
  );
}

function GeneratedImageSuspense({ id }: GeneratedImageProps) {
  const [scale, setScale] = useState(1);

  const [prompt] = api.prompt.getPromptById.useSuspenseQuery({
    id: id,
  });

  const image = prompt?.image;

  const handleDownload = () => {
    window.open(image?.url, "_blank");
    toast.success("Download started!");
  };

  if (!prompt?.isReady) {
    return <GeneratingImgLoader />;
  }

  if (!prompt) {
    return null;
  }

  if (prompt.isError) {
    return (
      <div className="w-full max-w-md p-8 text-center">
        <div className="relative">
          {/* Error state container */}
          <div className="bg-background/50 border-destructive/30 relative z-10 rounded-xl border p-8 shadow-xl backdrop-blur-md">
            <div className="bg-destructive/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <AlertTriangle className="text-destructive h-10 w-10" />
            </div>

            <h3 className="text-destructive mb-2 text-2xl font-bold">
              Generation Failed
            </h3>

            <Alert
              variant="destructive"
              className="bg-destructive/10 border-destructive/20 mb-6"
            >
              <AlertDescription>{prompt.errorMessage}</AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Image action buttons in the image area (right side) */}
      <div className="absolute right-6 bottom-6 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={!image?.url}
        >
          <DownloadIcon className="mr-1 h-4 w-4" />
          Download
        </Button>
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => setShowBookDialog(true)}
          disabled={!currentImage || books.length === 0}
        >
          <BookIcon className="mr-1 h-4 w-4" />
          Save to Book
        </Button> */}
      </div>

      <div
        className="max-h-full transition-all duration-200"
        style={{ transform: `scale(${scale})` }}
      >
        <img
          src={image?.url}
          alt="Generated line art"
          className="max-h-[70vh] rounded-lg object-contain shadow-lg"
        />
      </div>
      {/* Dialog for saving to book */}
      {/* <Dialog open={showBookDialog} onOpenChange={setShowBookDialog}>
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
      </Dialog> */}
    </>
  );
}
