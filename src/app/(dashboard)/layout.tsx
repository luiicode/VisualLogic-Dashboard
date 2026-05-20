import { SideBarMenu } from "@/components/custom/SideBarMenu";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <SideBarMenu userName="John Doe" userEmail="john.doe@example.com" />
      </SidebarProvider>
      {children}
    </>
  );
}
