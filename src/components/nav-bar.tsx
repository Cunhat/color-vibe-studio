import { Button } from "@/components/ui/button";
import { PenIcon, BookIcon } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <PenIcon className="text-primary h-6 w-6" />
              <span className="text-xl font-bold">ColorVibe Studio</span>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="/#features"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Features
          </a>
          <a
            href="/#examples"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Examples
          </a>
          <Link
            href="/generator"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Generator
          </Link>
          <Link
            href="/books"
            className="hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors"
          >
            <BookIcon className="h-4 w-4" />
            My Books
          </Link>
          <a
            href="/#pricing"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Pricing
          </a>
          <a
            href="/#faq"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm" asChild>
            <Link href="/generator">Try for Free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
