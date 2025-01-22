import SideNav from "@/components/nav/side-nav";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <SideNav />
      </div>
      <div className="col-span-3">
        <main>{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
