import { useState } from "react";
import { MoreHorizontal, ChevronDown, ChevronUp, Search, Filter, Edit } from "lucide-react";
import { useTranslation } from "@/../app/i18n/client";
import Link from "next/link";

export interface Locality {
    id: number;
    place: string;
    zipCode: string;
    number?: number;
    municipality: string;
    bfsNumber?: string;
    canton: string;
    coordinateE?: number;
    coordinateN?: number;
    language: string;
    validity: boolean;
}

interface LocalityTableProps {
    lng: string;
    localities: Locality[];
}

const LocalityTable = ({ lng, localities }: LocalityTableProps) => {
    const { t } = useTranslation(lng, "locality");
    const [sortField, setSortField] = useState<keyof Locality | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [filters, setFilters] = useState({
        place: "",
        zipCode: "",
        municipality: "",
        canton: "",
        validity: "",
    });
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    const handleSort = (field: keyof Locality) => {
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

    const SortIcon = ({ field }: { field: keyof Locality }) => {
        if (sortField !== field) return null;
        return sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    };

    const toggleDropdown = (id: number) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const filteredLocalities = localities.filter((locality) => {
        return (
            locality.place.toLowerCase().includes(filters.place.toLowerCase()) &&
            locality.zipCode.toLowerCase().includes(filters.zipCode.toLowerCase()) &&
            locality.municipality.toLowerCase().includes(filters.municipality.toLowerCase()) &&
            locality.canton.toLowerCase().includes(filters.canton.toLowerCase()) &&
            (filters.validity === "" || locality.validity.toString().toLowerCase().includes(filters.validity.toLowerCase()))
        );
    });

    const headers = [
        { key: "place", label: "lieu" },
        { key: "zipCode", label: "npa" },
        { key: "municipality", label: "municipalite" },
        { key: "canton", label: "canton" },
        { key: "validity", label: "validite" },
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
                <Link
                    href={`/${lng}/reference-data/localities/edit/new`}
                    className="flex items-center gap-2 text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                >
                    <span className="text-xl">+</span> {t("addNew")}
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
                                        onClick={() => handleSort(header.key as keyof Locality)}
                                    >
                                        <span>{t(header.label)}</span>
                                        <SortIcon field={header.key as keyof Locality} />
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
                    {filteredLocalities.map((locality) => (
                        <tr key={locality.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{locality.place}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{locality.zipCode}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{locality.municipality}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{locality.canton}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span
                                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                        locality.validity
                                            ? "bg-green-50 text-green-700 border border-green-200"
                                            : "bg-red-50 text-red-700 border border-red-200"
                                    }`}
                                >
                                    {locality.validity ? t("valid") : t("invalid")}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right relative">
                                <div className="relative">
                                    <button onClick={() => toggleDropdown(locality.id)} className="text-gray-400 hover:text-gray-500">
                                        <MoreHorizontal size={20} />
                                    </button>
                                    {activeDropdown === locality.id && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                            <div className="py-1" role="menu">
                                                <Link
                                                    href={`/${lng}/reference-data/localities/edit/${locality.id}`}
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

export default LocalityTable;
