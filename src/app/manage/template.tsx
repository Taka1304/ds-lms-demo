import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default Template;
