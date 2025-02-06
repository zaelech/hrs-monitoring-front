"use client";
import { ChevronRight } from "lucide-react";
import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";
import Title from "@/components/common/Title";
import { useState, useEffect } from "react";
import { useTranslation } from "@/../app/i18n/client";
import { use } from "react";

interface PageProps {
    params: Promise<{
        lng: string;
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
    const { lng } = use(params) as { lng: string };
    const { t } = useTranslation(lng, "project");
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
                alert("Erreur lors du chargement des localités");
            }
        };

        fetchLocations();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Conversion des types pour correspondre à notre schéma Prisma
        const projectData = {
            number: parseInt(formData.number),
            locationId: parseInt(formData.locationId),
            parcel: formData.parcel,
        };

        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la sauvegarde");
            }

            alert("Projet sauvegardé avec succès!");
            // Réinitialiser le formulaire
            setFormData({
                number: "",
                locationId: "",
                parcel: "",
            });
        } catch (error) {
            console.error("Erreur:", error);
            alert("Une erreur est survenue lors de la sauvegarde");
        }
    };

    const handleChange = (field: keyof FormData) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                    <span>{t("projects")}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                    <span>{t("edit")}</span>
                </div>
                <Title variant="h1">{t("projectEdit")}</Title>
            </div>
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg md:col-span-2" onSubmit={handleSubmit}>
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                {t("project")}
                            </Title>
                        </div>
                        <InputField
                            label={t("number")}
                            name="number"
                            type="number"
                            value={formData.number}
                            onChange={handleChange("number")}
                            placeholder={t("enterNumber")}
                        />
                        <SelectField
                            label={t("location")}
                            name="locationId"
                            value={formData.locationId}
                            onChange={handleChange("locationId")}
                            options={locations.map((loc) => ({
                                value: loc.id.toString(),
                                label: `${loc.place} (${loc.zipCode})`,
                            }))}
                            placeholder={t("selectLocation")}
                        />
                        <InputField
                            label={t("parcel")}
                            name="parcel"
                            value={formData.parcel}
                            onChange={handleChange("parcel")}
                            placeholder={t("enterParcel")}
                        />
                    </div>
                </div>
                <div className="px-4 py-6 sm:p-8">
                    <button type="submit" className="bg-[#FF6600] text-white px-4 py-2 rounded-md hover:bg-[#FF8533] transition-colors">
                        {t("save")}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProjectEdit;
