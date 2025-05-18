import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { GeneratedImage } from "../components/generated-image";
import { PromptAreaId } from "../sections/prompt-area-id";
import { StudioSidebar } from "../sections/studio-sidebar";

export default function StudioViewId({ id }: { id: string }) {
  return (
    <SidebarProvider>
      <div className="bg-secondary/20 flex h-screen w-full overflow-hidden">
        <StudioSidebar />
        <SidebarInset>
          <div className="bg-secondary/20 flex h-screen overflow-hidden">
            <PromptAreaId id={id} />
            <div className="bg-secondary/30 flex w-2/3 flex-col">
              <div className="relative flex flex-grow items-center justify-center p-10">
                <GeneratedImage id={id} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
