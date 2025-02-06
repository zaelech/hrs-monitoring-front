import { ChevronRight, House } from "lucide-react";
import Link from "next/link";
import Title from "./Title";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    items: BreadcrumbItem[];
    currentLabel: string;
    title: string;
    lng: string;
}

export const PageHeader = ({ items, currentLabel, title, lng }: PageHeaderProps) => {
    return (
        <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <Link href={`/${lng}/`}>
                    <House size={16} className="text-gray-500" />
                </Link>
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
            <Title variant="h1">{title}</Title>
        </div>
    );
};
