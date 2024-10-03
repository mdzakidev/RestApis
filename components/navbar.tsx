import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { IoMdExit, IoMdMoon, IoMdSunny } from "react-icons/io";
import { PiGearSixThin } from "react-icons/pi";
import guest from "@/assets/image/guest.png";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";

interface DropdownItem {
    name: string;
    icon: React.ComponentType;
    link: string | (() => void);
}

interface NavbarProps {
    title: string;
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ title, toggleSidebar, isSidebarOpen }) => {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dropdownItems: DropdownItem[] = [
        { name: "Settings", icon: PiGearSixThin, link: "/profile" },
        ...(session ? [{ name: "Sign Out", icon: IoMdExit, link: () => signOut() }] : [{ name: "Sign In", icon: IoMdExit, link: () => signIn() }]),
    ];

    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    return (
        <div className="w-full flex justify-between items-center p-4 md:px-8 select-none z-40 transition-colors duration-300">
            <div className="flex items-center gap-4 cursor-default text-center">
                <div className={`md:hidden cursor-pointer ${theme === "dark" ? "text-white" : "text-black"}`}>
                    <HiMenu
                        size={24}
                        onClick={toggleSidebar}
                    />
                </div>
                <div className="text-2xl md:text-3xl capitalize font-semibold">{title}</div>
            </div>
            <div className="flex items-center gap-4 cursor-pointer">
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        id="theme-toggle"
                        className="hidden"
                        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                        checked={theme === "dark"}
                        aria-label="Toggle theme"
                    />
                    <div className="swap swap-rotate">
                        {theme === "dark" ? <IoMdSunny /> : <IoMdMoon />}
                    </div>
                </label>
                <div className="relative">
                    <Image
                        src={session?.user?.image || guest}
                        alt="Profile"
                        width="32"
                        height="32"
                        className="object-cover w-8 h-8 rounded-full cursor-pointer"
                        onClick={toggleMenu}
                    />
                    <div className={`absolute right-0 w-56 p-2 mt-2 rounded-xl border border-opacity-20 border-black dark:border-white dark:border-opacity-20 bg-white dark:bg-[#222830] transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                        <ul aria-label="submenu">
                            {dropdownItems.map(({ name, icon: Icon, link }) => (
                                <li key={name} className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 rounded-xl">
                                    <a
                                        href={typeof link === "string" ? link : undefined}
                                        onClick={typeof link === "function" ? (e) => { e.preventDefault(); link(); } : undefined}
                                        className="inline-flex items-center w-full px-2 text-sm rounded-xl"
                                    >
                                        <div className="px-2 flex items-center py-2">
                                            <Icon />
                                            <span className="ml-4 font-semibold">{name}</span>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
