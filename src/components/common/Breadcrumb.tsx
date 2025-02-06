import { ChevronRight, House } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    currentLabel: string;
}

export const Breadcrumb = ({ items, currentLabel }: BreadcrumbProps) => {
    return (
        <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <House size={16} className="text-gray-500" />
                <ChevronRight size={16} className="text-gray-400" />
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        {item.href ? (
                            <Link href={item.href} className="hover:text-gray-700 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span>{item.label}</span>
                        )}
                        <ChevronRight size={16} className="text-gray-400" />
                    </div>
                ))}
                <span>{currentLabel}</span>
            </div>
        </div>
    );
};
