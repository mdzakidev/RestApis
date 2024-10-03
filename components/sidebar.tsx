import React, { FC, forwardRef, RefObject, useEffect, useState } from 'react';
import { HiChartPie, HiOutlineHome } from "react-icons/hi";
import { HiCreditCard } from "react-icons/hi2";
import Link from "next/link";

interface MenuItem {
    icon: JSX.Element;
    name: string;
    href: string;
}

const menuItems: MenuItem[] = [
    { icon: <HiOutlineHome size={24} />, name: "Dashboard", href: "/dashboard" },
    { icon: <HiCreditCard size={24} />, name: "Payments", href: "/payments" },
    { icon: <HiChartPie size={24} />, name: "Analytics", href: "/analytics" },
];

const MenuList: FC<{ items: MenuItem[] }> = ({ items }) => {
    const [currentPath, setCurrentPath] = useState<string>("");

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const isActive = (item: MenuItem) => item.href === currentPath;

    return (
        <>
            {items.map((item, index) => (
                <Link
                    href={item.href}
                    key={index}
                    aria-current={isActive(item) ? "page" : undefined}
                >
                    <div
                        className={`sidebar-item rounded-xl relative flex items-center my-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#3f434c] group transition duration-300 ${isActive(item) ? "active" : ""}`}
                    >
                        <div className="h-10 flex items-center ml-2 text-base">
                            {item.icon}
                            <span className="ml-3 text-sm font-semibold">{item.name}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
};

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ isOpen }, ref) => {
    return (
        <div
            ref={ref}
            className={`fixed md:relative z-50 w-0 md:w-72 h-screen overflow-y-scroll background border-r p-4 sidebar select-none invisible opacity-0 md:visible md:opacity-100 transition-[width,opacity,visibility,background-color] duration-300 ${isOpen ? "!w-72 !opacity-100 !visible" : "false"}`}
        >
            <h1 className='text-2xl text-center mt-4 font-semibold'>Zay<span className='text-primary-500'>den</span></h1>
            <div className="mt-8">
                <div className="text-black dark:text-white">
                    <MenuList items={menuItems} />
                </div>
            </div>
        </div>
    );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
