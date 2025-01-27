import React from "react";

interface TitleProps {
    children: React.ReactNode;
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className?: string;
}

const Title: React.FC<TitleProps> = ({ children, variant = "h1", className = "" }) => {
    const baseStyles = {
        h1: "text-3xl font-bold",
        h2: "text-2xl font-semibold",
        h3: "text-xl font-semibold",
        h4: "text-lg font-semibold",
        h5: "text-base font-semibold",
        h6: "text-sm font-semibold",
    }[variant];

    const Component = variant as keyof JSX.IntrinsicElements;

    return <Component className={`${baseStyles} ${className} mt-4`}>{children}</Component>;
};

export default Title;
