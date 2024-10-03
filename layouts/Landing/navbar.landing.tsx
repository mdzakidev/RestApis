import { useEffect, useState } from "react";

const links = [
    { name: "Home", href: "#home" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" }
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 100);
        const handleResize = () => {
            if (window.innerWidth > 768) setIsOpen(false);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <header
                className={`fixed w-full z-50 px-8 md:px-44 py-8 flex justify-between select-none transition-[padding,box-shadow] duration-700 glass-navbar bg-white items-center ${isSticky ? "sticky-nav" : ""} ${isOpen ? "!shadow-none" : ""}`}
            >
                <div className="text-2xl font-bold">Zay<span className="text-primary-500">den</span></div>
                <nav className="hidden md:flex gap-6 items-center text-black">
                    {links.map(({ name, href }) => (
                        <a
                            key={href}
                            href={href}
                            className="hover:text-primary-500 font-semibold transition-colors duration-300"
                        >
                            {name}
                        </a>
                    ))}
                </nav>
                <button
                    className="md:hidden relative p-2 cursor-pointer"
                    onClick={() => setIsOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="rgba(0, 0, 0, 1)"
                    >
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                    </svg>
                </button>
            </header>
            <div
                className={`fixed flex flex-col gap-4 z-40 inset-0 transition-[top] duration-700 select-none bg-white h-fit w-full py-4 px-8 -top-36 mobile-menu glass-navbar ${isOpen ? "!top-24" : ""}`}
                hidden={isOpen}
            >
                <div className="flex flex-col items-center gap-6 text-black">
                    {links.map(({ name, href }) => (
                        <a
                            key={href}
                            href={href}
                            className="text-lg font-semibold hover:text-primary-500 transition-colors duration-300"
                        >
                            {name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}