import { useState } from "react";
import { MoreHorizontal, ChevronDown, ChevronUp, Search, Filter, Edit } from "lucide-react";
import { useTranslation } from "@/../app/i18n/client";
import Link from "next/link";

export interface Customer {
    id: number;
    number: number;
    name: string;
    address: string;
    comment?: string;
}

interface CustomerTableProps {
    lng: string;
    customers: Customer[];
}

const CustomerTable = ({ lng, customers }: CustomerTableProps) => {
    const { t } = useTranslation(lng, "customer");
    const [sortField, setSortField] = useState<keyof Customer | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [filters, setFilters] = useState({
        number: "",
        name: "",
        address: "",
    });
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    const handleSort = (field: keyof Customer) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const handleFilterChange = (field: string, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const SortIcon = ({ field }: { field: keyof Customer }) => {
        if (sortField !== field) return null;
        return sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    };

    const toggleDropdown = (id: number) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const filteredCustomers = customers.filter((customer) => {
        return (
            customer.number.toString().includes(filters.number) &&
            customer.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            customer.address.toLowerCase().includes(filters.address.toLowerCase())
        );
    });

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        if (!sortField) return 0;
        
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();
        
        return sortDirection === 'asc' 
            ? aString.localeCompare(bString)
            : bString.localeCompare(aString);
    });

    const headers = [
        { key: "number", label: "number" },
        { key: "name", label: "name" },
        { key: "address", label: "address" },
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
                <Link
                    href={`/${lng}/customers/edit/new`}
                    className="flex items-center gap-2 text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                >
                    <span className="text-xl">+</span> {t("new")}
                </Link>
            </div>
            <table className="min-w-full divide-y divide-gray-100">
                <thead>
                    <tr className="bg-gray-50/50">
                        {headers.map((header) => (
                            <th key={header.key} scope="col" className="px-6 py-4">
                                <div className="space-y-2">
                                    <div
                                        className="flex items-center justify-between gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort(header.key as keyof Customer)}
                                    >
                                        <span>{t(header.label)}</span>
                                        <SortIcon field={header.key as keyof Customer} />
                                    </div>
                                    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-2 py-1">
                                        <Search size={14} className="text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder={`${t("filter")} ${t(header.label)}`}
                                            className="w-full text-sm border-none focus:ring-0 p-0 placeholder-gray-400"
                                            value={filters[header.key as keyof typeof filters]}
                                            onChange={(e) => handleFilterChange(header.key, e.target.value)}
                                        />
                                        <Filter size={14} className="text-gray-400" />
                                    </div>
                                </div>
                            </th>
                        ))}
                        <th scope="col" className="relative px-6 py-4">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {sortedCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.number}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right relative">
                                <div className="relative">
                                    <button onClick={() => toggleDropdown(customer.id)} className="text-gray-400 hover:text-gray-500">
                                        <MoreHorizontal size={20} />
                                    </button>
                                    {activeDropdown === customer.id && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                            <div className="py-1" role="menu">
                                                <Link
                                                    href={`/${lng}/customers/edit/${customer.id}`}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    <Edit size={16} className="mr-2" />
                                                    {t("edit")}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;
