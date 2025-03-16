import { Drawer, DrawerContent, DrawerBody } from "@heroui/drawer";
import { Button, useDisclosure } from "@heroui/react";
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
  FiMenu,
} from "react-icons/fi";

const NavbarMobile = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();

  const menuItems = [
    { name: "داشبورد", icon: <FiHome />, href: "/dashboard" },
    { name: "سفارشات", icon: <FiShoppingCart />, href: "/orders" },
    { name: "محصولات", icon: <FiBox />, href: "/products" },
    { name: "کاربران", icon: <FiUsers />, href: "/users" },
    { name: "وبلاگ", icon: <FiEdit />, href: "/blog" },
    { name: "اسلایدر", icon: <FiImage />, href: "/slider" },
    { name: " پیام ها", icon: <FiMail />, href: "/email" },
  ];
  return (
    <>
      <Button className="md:hidden" onPress={onOpen}>
        <FiMenu />
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <DrawerBody>
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
                  <span>{item.name}</span>
                </Link>
              ))}
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarMobile;
