import AdminNavbar from "./container/Navbar";
import { Providers } from "./Providers";
import "./styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className=" md:grid md:grid-cols-[64px,_1fr] lg:h-full">
          <AdminNavbar />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
