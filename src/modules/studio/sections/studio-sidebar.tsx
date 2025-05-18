"use client";
import { ArrowLeft, History, TextCursorInput } from "lucide-react";
import dayjs from "dayjs";

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

  const groupedPrompts = prompts.reduce(
    (acc, prompt) => {
      const date = dayjs(prompt.createdAt);
      const today = dayjs().startOf("day");
      const sevenDaysAgo = today.subtract(7, "day");
      const thirtyDaysAgo = today.subtract(30, "day");

      if (date.isSame(today, "day")) {
        acc.today.push(prompt);
      } else if (date.isAfter(sevenDaysAgo)) {
        acc.last7Days.push(prompt);
      } else if (date.isAfter(thirtyDaysAgo)) {
        acc.last30Days.push(prompt);
      } else {
        acc.older.push(prompt);
      }
      return acc;
    },
    { today: [], last7Days: [], last30Days: [], older: [] } as {
      today: typeof prompts;
      last7Days: typeof prompts;
      last30Days: typeof prompts;
      older: typeof prompts;
    },
  );

  const renderPromptList = (
    prompts: typeof groupedPrompts.today,
    title: string,
  ) => {
    if (prompts.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="text-accent-foreground mb-2 px-2 text-xs font-medium">
          {title}
        </h3>
        <ul className="flex flex-col gap-1">
          {prompts
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((prompt) => (
              <li className="flex" key={prompt.id}>
                <Link
                  href={`/studio/${prompt.id}`}
                  className="hover:bg-secondary h-9 w-full cursor-pointer rounded-md p-2 text-ellipsis transition-colors"
                >
                  <button className="w-full cursor-pointer overflow-hidden text-left text-xs text-ellipsis whitespace-nowrap">
                    {prompt.prompt}
                  </button>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    );
  };

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
              <>
                {renderPromptList(groupedPrompts.today, "Today")}
                {renderPromptList(groupedPrompts.last7Days, "Last 7 Days")}
                {renderPromptList(groupedPrompts.last30Days, "Last 30 Days")}
                {renderPromptList(groupedPrompts.older, "Older")}
              </>
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
