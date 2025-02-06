"use client";
import { ChevronRight } from "lucide-react";
import ProjectTable from "@/components/ProjectTable";
import { useTranslation } from "@/../app/i18n/client";
import { use } from "react";
import { useProjects } from "@/hooks/useProjects";
import { PageHeader } from "@/components/common/PageHeader";

interface PageProps {
    params: Promise<{
        lng: string;
    }>;
}

export default function Projects({ params }: PageProps) {
    const { lng } = use(params);
    const { t } = useTranslation(lng, "project");
    const { projects, isLoading, error } = useProjects();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <PageHeader items={[]} currentLabel={t("projects")} title={t("title")} lng={lng} />

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <ProjectTable projects={projects} lng={lng} />
            )}
        </div>
    );
}
