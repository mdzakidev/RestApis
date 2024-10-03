import { useEffect, useRef, useState } from 'react';
import Motion from "@/components/motion";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import StatsProfile from './stats.profile';
import EditsProfile from './edits.profile';

export default function ProfileLayouts() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-screen h-screen background flex flex-row overflow-x-hidden">
            <Sidebar ref={sidebarRef} isOpen={isSidebarOpen} />
            <div className="effect-2 w-full">
                <Motion>
                    <div className="w-full h-screen overflow-y-scroll">
                        <Navbar title="Profile" toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                        <div className="p-4 md:px-8 z-30 background">
                            <div className="flex flex-col gap-2 md:gap-4">
                                <StatsProfile />
                                <EditsProfile />
                            </div>
                        </div>
                    </div>
                </Motion>
            </div>
        </div>
    );
}
