import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiShoppingCart,
  FiBox,
  FiUsers,
  FiEdit,
  FiImage,
  FiMail,
} from "react-icons/fi";

const NavbarDesktop = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "داشبورد", icon: <FiHome />, href: "/dashboard" },
    { name: "سفارشات", icon: <FiShoppingCart />, href: "/orders" },
    { name: "محصولات", icon: <FiBox />, href: "/products" },
    { name: "کاربران", icon: <FiUsers />, href: "/users" },
    { name: "وبلاگ", icon: <FiEdit />, href: "/blog" },
    { name: "اسلایدر", icon: <FiImage />, href: "/slider" },
    { name: "تیکت", icon: <FiMail />, href: "/email" },
  ];
  return (
    <>
      <nav
        className={`hidden md:block bg-gray-900 text-white shadow-md z-20 md:h-screen transition-all duration-500 ease-in-out ${
          isMenuOpen ? "w-60" : "w-16"
        }`}
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <div className="md:flex flex-col items-center py-5 space-y-6 hidden">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 p-3 w-full transition-all duration-300 ease-in-out ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span
                className={`text-lg transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavbarDesktop;
