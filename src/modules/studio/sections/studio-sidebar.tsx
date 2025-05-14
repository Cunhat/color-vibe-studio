"use client";
import { ArrowLeft, History, TextCursorInput } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { api } from "@/trpc/react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

export function StudioSidebar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudioSidebarSuspense />
    </Suspense>
  );
}

function StudioSidebarSuspense() {
  const [prompts] = api.prompt.getPrompts.useSuspenseQuery();

  return (
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
        </div>
        <Link href="/studio">
          <Button variant="default" className="w-full">
            New Image
          </Button>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {prompts.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {prompts.map((prompt) => (
                  <li className="flex" key={prompt.id}>
                    <Link
                      href={`/studio/${prompt.id}`}
                      className="hover:bg-secondary/70 bg-secondary/40 h-9 w-full cursor-pointer rounded-md p-2 text-ellipsis transition-colors"
                    >
                      <button className="w-full cursor-pointer overflow-hidden text-left text-xs text-ellipsis whitespace-nowrap">
                        {prompt.prompt}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted-foreground p-4 text-center text-sm">
                <TextCursorInput className="mx-auto mb-2 h-8 w-8 opacity-50" />
                <p>No image history yet</p>
                <p className="mt-1 text-xs">Enter a prompt to get started</p>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
