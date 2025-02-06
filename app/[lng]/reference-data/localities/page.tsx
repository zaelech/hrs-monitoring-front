"use client";
import { ChevronRight } from "lucide-react";
import LocalityTable from "@/components/LocalityTable";
import { useTranslation } from "@/../app/i18n/client";
import { use } from "react";
import { useLocalities } from "@/hooks/useLocalities";

interface PageProps {
    params: Promise<{
        lng: string;
    }>;
}

export default function Localities({ params }: PageProps) {
    const { lng } = use(params);
    const { t } = useTranslation(lng, "locality");
    const { localities, isLoading, error } = useLocalities();
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                    <span>{t("referenceData")}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                    <span>{t("localities")}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{t("localities")}</h1>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <LocalityTable localities={localities} lng={lng} />
            )}
        </div>
    );
}
