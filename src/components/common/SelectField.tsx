import React from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectFieldProps {
    label: string;
    name?: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, onChange, options, placeholder, disabled = false, required = false }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <>
            <div className="sm:col-span-1 content-center">
                <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            </div>
            <div className="sm:col-span-2">
                <div className="mt-2">
                    <select
                        name={name}
                        id={name}
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        required={required}
                        className={`appearance-none block w-full rounded-md border-0 p-1.5 text-gray-900 bg-white ring-inset focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 h-[38px] ${
                            disabled ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};
