import NavbarDashboard from "@/components/nav-bar-dashboard";
import { type Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavbarDashboard />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
