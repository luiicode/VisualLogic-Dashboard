export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] via-[35%] to-[#312e81] w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
}
