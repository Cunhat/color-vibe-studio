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

type SidebarProps = {
  prompts: {
    id: string;
    prompt: string;
    createdAt: string;
  }[];
};

export function StudioSidebar({ prompts }: SidebarProps) {
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
          <div className="flex items-center">
            <History className="text-muted-foreground mr-1 h-4 w-4" />
            <span className="text-sm font-medium">Image History</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {prompts.length > 0 ? (
              <div className="space-y-2 px-2">
                {prompts.map((img, idx) => (
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
                <p className="mt-1 text-xs">Enter a prompt to get started</p>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
