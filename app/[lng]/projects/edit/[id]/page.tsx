"use client";
import { ChevronRight } from "lucide-react";
import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";
import Title from "@/components/common/Title";
import { useState, useEffect } from "react";
import { useTranslation } from "@/../app/i18n/client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/PageHeader";

interface PageProps {
    params: Promise<{
        lng: string;
        id: string;
    }>;
}

interface FormData {
    number: string;
    locationId: string;
    parcel: string;
}

interface Location {
    id: number;
    place: string;
    zipCode: string;
}

function ProjectEdit({ params }: PageProps) {
    const { lng, id } = use(params) as { lng: string; id: string };
    const { t } = useTranslation(lng, "project");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [locations, setLocations] = useState<Location[]>([]);

    const [formData, setFormData] = useState<FormData>({
        number: "",
        locationId: "",
        parcel: "",
    });

    // Charger les localités au chargement du composant
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("/api/locations");
                if (!response.ok) throw new Error("Erreur lors du chargement des localités");
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error("Erreur:", error);
                setError("Erreur lors du chargement des localités");
            }
        };

        fetchLocations();
    }, []);

    // Charger le projet si on est en mode édition
    useEffect(() => {
        if (id !== "new") {
            const fetchProject = async () => {
                try {
                    const response = await fetch(`/api/projects/${id}`);
                    if (!response.ok) {
                        throw new Error("Erreur lors de la récupération du projet");
                    }
                    const data = await response.json();
                    setFormData({
                        number: data.number.toString(),
                        locationId: data.locationId.toString(),
                        parcel: data.parcel,
                    });
                } catch (err) {
                    setError(err instanceof Error ? err.message : "Une erreur est survenue");
                }
            };
            fetchProject();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const projectData = {
                number: parseInt(formData.number),
                locationId: parseInt(formData.locationId),
                parcel: formData.parcel,
            };

            const url = id === "new" ? "/api/projects" : `/api/projects/${id}`;
            const method = id === "new" ? "POST" : "PUT";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la sauvegarde du projet");
            }

            router.push(`/${lng}/projects`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <PageHeader
                items={[{ label: t("projects"), href: `/${lng}/projects` }]}
                currentLabel={id === "new" ? t("new") : t("edit")}
                title={id === "new" ? t("newProject") : t("editProject")}
                lng={lng}
            />

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                    <InputField
                        label={t("number")}
                        name="number"
                        type="number"
                        value={formData.number}
                        onChange={(value) => handleInputChange("number", value)}
                        required
                    />
                    <SelectField
                        label={t("location")}
                        value={formData.locationId}
                        onChange={(value) => handleInputChange("locationId", value)}
                        options={locations.map((loc) => ({
                            value: loc.id.toString(),
                            label: `${loc.place} (${loc.zipCode})`,
                        }))}
                        required
                    />
                    <InputField label={t("parcel")} name="parcel" value={formData.parcel} onChange={(value) => handleInputChange("parcel", value)} required />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push(`/${lng}/projects`)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        {t("cancel")}
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#FF6600] rounded-md hover:bg-[#FF8533] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6600] disabled:opacity-50"
                    >
                        {isLoading ? t("saving") : t("save")}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProjectEdit;
