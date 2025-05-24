import { authClient } from "@/lib/auth-client";
import { LayoutDashboardIcon } from "lucide-react";
import React from "react";

type HeaderSectionProps = {
  userName: string;
};

export default function HeaderSection({ userName }: HeaderSectionProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="flex items-center gap-2">
          <LayoutDashboardIcon className="text-primary h-7 w-7" />
          Dashboard
        </span>
      </h1>
      <p className="text-muted-foreground mt-1">
        Welcome back, {userName}! Manage your coloring resources.
      </p>
    </div>
  );
}
