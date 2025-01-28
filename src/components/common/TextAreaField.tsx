import React from "react";

interface TextAreaFieldProps {
    label?: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    disabled = false,
    rows = 3
}) => {
    return (
        <>
            {label && (
                <div className="sm:col-span-1 content-center">
                    <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                        {label}
                    </label>
                </div>
            )}
            <div className={`sm:col-span-${label ? "2" : "3"}`}>
                <div className="mt-2">
                    <textarea
                        name={name}
                        id={name}
                        rows={rows}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`block w-full rounded-md border-0 p-1.5 text-gray-900 bg-[#FFE5CC] ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF6600] sm:text-sm sm:leading-6 ${
                            disabled ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                    />
                </div>
            </div>
        </>
    );
};
