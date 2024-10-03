import React from 'react';

interface ButtonProps {
    variant: "primary" | "outline";
    children: React.ReactNode;
    onClick?: () => void;
}

const ButtonUI: React.FC<ButtonProps> = ({ variant, children, onClick }) => {
    const baseClasses = "px-4 py-2 rounded-xl focus:outline-none w-full";
    const variantClasses = variant === "primary" ? "bg-primary-500 text-white" : "border border-primary-500 text-primary-500";

    return (
        <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonUI;
