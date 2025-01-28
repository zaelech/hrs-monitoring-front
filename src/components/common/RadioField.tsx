import React from "react";

interface RadioOption {
    label: string;
    value: string;
}

interface RadioFieldProps {
    label?: string;
    name: string;
    value: string;
    options: RadioOption[];
    onChange: (value: string) => void;
    disabled?: boolean;
}

export const RadioField: React.FC<RadioFieldProps> = ({
    label,
    name,
    value,
    options,
    onChange,
    disabled = false,
}) => {
    return (
        <>
            {label && (
                <div className="sm:col-span-1 content-center">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        {label}
                    </label>
                </div>
            )}
            <div className={`sm:col-span-${label ? "2" : "3"}`}>
                <div className="mt-2">
                    <div className="flex gap-4">
                        {options.map((option) => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`${name}-${option.value}`}
                                    name={name}
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={(e) => onChange(e.target.value)}
                                    disabled={disabled}
                                    className="h-4 w-4 border-gray-300 text-[#FF6600] focus:ring-[#FF6600] disabled:cursor-not-allowed"
                                />
                                <label
                                    htmlFor={`${name}-${option.value}`}
                                    className={`ml-2 block text-sm font-medium ${
                                        disabled ? "text-gray-500" : "text-gray-900"
                                    } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
