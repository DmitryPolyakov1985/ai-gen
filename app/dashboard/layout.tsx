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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam voluptas
          eligendi delectus provident corrupti, modi nesciunt incidunt
          doloremque dolorum, totam accusantium cumque officia reprehenderit
          harum temporibus. Optio facilis excepturi dolorem enim velit commodi
          blanditiis quis tempora, incidunt nam. Deleniti, officia pariatur!
          Fugiat, labore! Accusantium aperiam eius, aut perspiciatis harum
          suscipit.
        </p>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
