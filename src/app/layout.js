"use client"
import { usePathname } from "next/navigation";
import AdminNavbar from "./container/Navbar";
import { Providers } from "./Providers";
import "./styles/globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className= {pathname!="/"? ` md:grid md:grid-cols-[64px,_1fr] lg:h-full` : null}>
          <AdminNavbar />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
