"use client";

import { usePathname } from "next/navigation";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./Navbarsm";

const AdminNavbar = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname != "/" ? (
        <>
          <NavbarMobile />
          <NavbarDesktop />
        </>
      ) : null}
    </>
  );
};

export default AdminNavbar;
