import type { User } from "better-auth";
import { RecentBookSection } from "../sections/book/recent-book-section";
import HeaderSection from "../sections/header-section";
import { RecentImagesSection } from "../sections/image/recent-images-section";
import QuickActionsSection from "../sections/quick-actions-section";

interface DashboardViewProps {
  user: User;
}

export default function DashboardView({ user }: DashboardViewProps) {
  return (
    <div className="container flex-1 px-4 py-6">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <HeaderSection userName={user.name} />
        {/* Quick Actions */}
        <QuickActionsSection />
        {/* Recent Books */}
        <RecentBookSection />
        {/* Recent Images */}
        <RecentImagesSection />
      </div>
    </div>
  );
}
