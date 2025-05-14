import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NoImageGenerated from "../components/no-image-generated";
import { PromptArea } from "../sections/prompt-area";
import { StudioSidebar } from "../sections/studio-sidebar";
import { PromptAreaId } from "../sections/prompt-area-id";

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
                <NoImageGenerated />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
