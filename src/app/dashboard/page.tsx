import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookIcon,
  ImageIcon,
  SparklesIcon,
  LayoutDashboardIcon,
  GalleryVerticalIcon,
} from "lucide-react";
import Link from "next/link";

import { auth } from "@/server/auth";
import { headers } from "next/headers";

interface Book {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  images: string[];
}

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // const [books, setBooks] = useState<Book[]>([]);
  // const [images, setImages] = useState<GeneratedImage[]>([]);
  //   const { isAuthenticated, userName } = useAuth();
  //   const navigate = useNavigate();

  const books: Book[] = [];
  const images: GeneratedImage[] = [];

  //   useEffect(() => {
  //     console.log("Dashboard: Auth state check", {
  //       isAuthenticated,
  //       userName,
  //       localStorageAuth: localStorage.getItem("isAuthenticated"),
  //       localStorageUser: localStorage.getItem("userName"),
  //     });

  //     // Redirect to sign in page if not authenticated
  //     if (!isAuthenticated) {
  //       console.log("Dashboard: Not authenticated, redirecting to signin");
  //       navigate("/signin");
  //       return;
  //     }

  //     console.log("Dashboard: Loading user data");

  //     // Load books from localStorage
  //     const storedBooks = JSON.parse(
  //       localStorage.getItem("coloringBooks") || "[]",
  //     );
  //     setBooks(storedBooks);

  //     // Load images from localStorage
  //     const storedImages = JSON.parse(
  //       localStorage.getItem("generatedImages") || "[]",
  //     );
  //     setImages(storedImages);
  //   }, [isAuthenticated, navigate, userName]);

  // Return early if not authenticated to prevent flash of dashboard
  //   if (!isAuthenticated) {
  //     console.log("Dashboard: Rendering null due to not authenticated");
  //     return null;
  //   }

  return (
    <div className="container flex-1 px-4 py-6">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="flex items-center gap-2">
              <LayoutDashboardIcon className="text-primary h-7 w-7" />
              Dashboard
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {session?.user?.name}! Manage your coloring resources.
          </p>
        </div>

        {/* Quick Actions */}
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
                <Link href="/books">View Books</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="text-primary h-5 w-5" />
                Simple Generator
              </CardTitle>
              <CardDescription>Quick line art generation tool</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/generator">Start Creating</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Books */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <BookIcon className="h-5 w-5" />
            Recent Books
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.length > 0 ? (
              books.slice(0, 4).map((book) => (
                <Link href={`/books/${book.id}`} key={book.id}>
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                    <div className="flex h-24 items-center justify-center bg-purple-50">
                      {book.images.length > 0 ? (
                        <div className="flex gap-1">
                          <ImageIcon className="text-primary/40 h-5 w-5" />
                          <span className="text-primary/60 text-sm">
                            {book.images.length} images
                          </span>
                        </div>
                      ) : (
                        <BookIcon className="text-primary/30 h-8 w-8" />
                      )}
                    </div>
                    <CardContent className="py-4">
                      <h3 className="line-clamp-1 font-medium">{book.title}</h3>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {new Date(book.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <Card className="col-span-full p-4 text-center">
                <CardContent className="py-8">
                  <BookIcon className="text-muted-foreground/50 mx-auto mb-4 h-12 w-12" />
                  <p className="text-muted-foreground">
                    You haven't created any books yet
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/books">Create Your First Book</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {books.length > 0 && (
              <Card className="bg-secondary/20 flex h-full items-center justify-center border-dashed">
                <CardContent className="p-8 text-center">
                  <Button
                    asChild
                    variant="ghost"
                    className="flex h-full w-full flex-col gap-2"
                  >
                    <Link href="/books">
                      <BookIcon className="text-primary/70 mx-auto mb-2 h-6 w-6" />
                      <span>View All Books</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Images */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <GalleryVerticalIcon className="h-5 w-5" />
            Recent Images
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.length > 0 ? (
              images.slice(0, 4).map((image) => (
                <Card
                  key={image.id}
                  className="overflow-hidden transition-shadow hover:shadow-md"
                >
                  <div className="bg-secondary/30 flex aspect-square items-center justify-center overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="py-4">
                    <p className="line-clamp-2 text-sm">{image.prompt}</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {new Date(image.timestamp).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full p-4 text-center">
                <CardContent className="py-8">
                  <ImageIcon className="text-muted-foreground/50 mx-auto mb-4 h-12 w-12" />
                  <p className="text-muted-foreground">
                    You haven't generated any images yet
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/studio">Generate Your First Image</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {images.length > 0 && (
              <Card className="bg-secondary/20 flex h-full items-center justify-center border-dashed">
                <CardContent className="p-8 text-center">
                  <Button
                    asChild
                    variant="ghost"
                    className="flex h-full w-full flex-col gap-2"
                  >
                    <Link href="/studio">
                      <ImageIcon className="text-primary/70 mx-auto mb-2 h-6 w-6" />
                      <span>Generate More Images</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
