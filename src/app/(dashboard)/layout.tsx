import { SideBarMenu } from "@/components/custom/SideBarMenu";
import { TopMenu } from "@/components/custom/TopMenu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SideBarMenu userName="John Doe" userEmail="john.doe@example.com" />
      <SidebarInset>
        <TopMenu />
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
