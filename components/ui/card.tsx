import React from 'react';

interface CardUIProps {
    children: React.ReactNode;
    className?: string;
}

export default function CardUI({ children, className = '' }: CardUIProps) {
    return (
        <div
            className={`background rounded-xl w-full p-4 border border-a !bg-white !text-dark !border-[#E4E4E4] flex flex-col gap-8 items-center basis-full lg:basis-1/3 max-w-xs ${className}`}
        >
            {children}
        </div>
    );
}
