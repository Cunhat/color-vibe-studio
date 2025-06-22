import { authClient } from "@/lib/auth-client";
import { LayoutDashboardIcon } from "lucide-react";
import React from "react";

type HeaderSectionProps = {
  userName: string;
};

export default function HeaderSection({ userName }: HeaderSectionProps) {
  return (
    <div>
      <h1 className="font-heading-bold text-text-primary mb-2 text-2xl md:text-3xl">
        Welcome back, {userName}! 👋
      </h1>
      <p className="text-muted-foreground">
        Ready to create amazing coloring pages today?
      </p>
    </div>
  );
}
