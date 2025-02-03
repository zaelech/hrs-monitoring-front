"use client";
import { ChevronRight } from "lucide-react";
import ProjectTable from "@/components/ProjectTable";
import { projects } from "@/data/projects";
import { useTranslation } from "@/../app/i18n/client";

interface PageProps {
    params: Promise<{
        lng: string;
    }>;
}

async function SIP({ params }: PageProps) {
    const { lng } = await params;
    const { t } = useTranslation(lng, "common");
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                    <span>{t("projects")}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                    <span>{t("sip")}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{t("sip")}</h1>
            </div>

            <ProjectTable projects={projects} lng={lng} />
        </div>
    );
}

export default SIP;
