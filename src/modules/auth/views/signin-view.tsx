"use client";
import { FacebookIcon } from "@/components/social-icons";
import { AppleIcon } from "@/components/social-icons";
import { GoogleIcon } from "@/components/social-icons";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Link } from "lucide-react";
import React from "react";

export default function SignInView() {
  const handleGoogleSignIn = async () => {
    console.log("Signing in with Google");
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground mt-2">
            Sign in to continue to ColorVibe Studio
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleGoogleSignIn()}
              //   disabled={isLoading}
              className="flex w-full items-center justify-center py-6"
            >
              <GoogleIcon className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              //   onClick={() => handleSocialSignIn("apple")}
              //   disabled={isLoading}
              className="flex w-full items-center justify-center py-6"
            >
              <AppleIcon className="mr-2 h-5 w-5" />
              Sign in with Apple
            </Button>

            <Button
              type="button"
              variant="outline"
              //   onClick={() => handleSocialSignIn("github")}
              //   disabled={isLoading}
              className="flex w-full items-center justify-center py-6"
            >
              <GithubIcon className="mr-2 h-5 w-5" />
              Sign in with GitHub
            </Button>

            <Button
              type="button"
              variant="outline"
              //   onClick={() => handleSocialSignIn("facebook")}
              //   disabled={isLoading}
              className="flex w-full items-center justify-center py-6"
            >
              <FacebookIcon className="mr-2 h-5 w-5" />
              Sign in with Facebook
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
