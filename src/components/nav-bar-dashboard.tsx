import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import { PenIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function NavbarDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  async function signOut() {
    "use server";
    await auth.api.signOut({
      headers: await headers(),
    });
  }

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <div className="flex items-center gap-2">
              <PenIcon className="text-primary h-6 w-6" />
              <span className="text-xl font-bold">ColorVibe Studio</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!session ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
            </>
          ) : (
            <form action={signOut}>
              <Button variant="ghost" size="sm" type="submit">
                Logout
              </Button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
