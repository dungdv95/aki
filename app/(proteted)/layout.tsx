import LayoutNav from "@/components/layout-nav";
// import LayoutSide from "@/components/layout-side";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "AKI",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // const layout = cookies().get("react-resizable-panels:layout");
  // const collapsed = cookies().get("react-resizable-panels:collapsed");

  // const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  // const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return <LayoutNav>{children}</LayoutNav>;
}
