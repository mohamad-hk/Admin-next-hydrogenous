import AdminNavbar from "./container/Navbar";
import { Providers } from "./Providers";
import "./styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="lg:grid lg:grid-cols-[240px_minmax(900px,_1fr)_0px] lg:h-full">
          <AdminNavbar />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
