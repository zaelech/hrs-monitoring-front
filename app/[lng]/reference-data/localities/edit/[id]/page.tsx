"use client";
import { ChevronRight } from "lucide-react";
import { InputField } from "@/components/common/InputField";
import { RadioField } from "@/components/common/RadioField";
import { SelectField } from "@/components/common/SelectField";
import Title from "@/components/common/Title";
import { useState, useEffect } from "react";
import { useTranslation } from "@/../app/i18n/client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { Locality } from "@/components/LocalityTable";

interface PageProps {
    params: Promise<{
        lng: string;
        id: string;
    }>;
}

interface FormData {
    lieu: string;
    npa: string;
    numero: string;
    municipalite: string;
    bfsNr: string;
    canton: string;
    e: string;
    n: string;
    langue: string;
    validite: string;
}

function LocalityEdit({ params }: PageProps) {
    const { lng, id } = use(params) as { lng: string; id: string };
    const { t } = useTranslation(lng, "locality");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        lieu: "",
        npa: "",
        numero: "",
        municipalite: "",
        bfsNr: "",
        canton: "",
        e: "",
        n: "",
        langue: "",
        validite: "Oui",
    });

    useEffect(() => {
        if (id !== "new") {
            const fetchLocality = async () => {
                try {
                    const response = await fetch(`/api/locations/${id}`);
                    if (!response.ok) {
                        throw new Error("Erreur lors de la récupération de la localité");
                    }
                    const data = await response.json();
                    setFormData({
                        lieu: data.place,
                        npa: data.zipCode,
                        numero: data.number?.toString() || "",
                        municipalite: data.municipality,
                        bfsNr: data.bfsNumber || "",
                        canton: data.canton,
                        e: data.coordinateE?.toString() || "",
                        n: data.coordinateN?.toString() || "",
                        langue: data.language,
                        validite: data.validity ? "Oui" : "Non",
                    });
                } catch (err) {
                    setError(err instanceof Error ? err.message : "Une erreur est survenue");
                }
            };
            fetchLocality();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const locationData = {
                place: formData.lieu,
                zipCode: formData.npa,
                number: formData.numero ? parseInt(formData.numero) : null,
                municipality: formData.municipalite,
                bfsNumber: formData.bfsNr || null,
                canton: formData.canton,
                coordinateE: formData.e ? parseFloat(formData.e) : null,
                coordinateN: formData.n ? parseFloat(formData.n) : null,
                language: formData.langue,
                validity: formData.validite === "Oui",
            };

            const url = id === "new" ? "/api/locations" : `/api/locations/${id}`;
            const method = id === "new" ? "POST" : "PUT";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(locationData),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la sauvegarde de la localité");
            }

            router.push(`/${lng}/reference-data/localities`);
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
            <div className="mb-8">
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                    <span>{t("referenceData")}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                    <span>{t("localities")}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                    <span>{id === "new" ? t("new") : t("edit")}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{id === "new" ? t("newLocality") : t("editLocality")}</h1>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                    <InputField label={t("lieu")} name="lieu" value={formData.lieu} onChange={(value) => handleInputChange("lieu", value)} required />
                    <InputField label={t("npa")} name="npa" value={formData.npa} onChange={(value) => handleInputChange("npa", value)} required />
                    <InputField
                        label={t("numero")}
                        name="numero"
                        value={formData.numero}
                        onChange={(value) => handleInputChange("numero", value)}
                        type="number"
                    />
                    <InputField
                        label={t("municipalite")}
                        name="municipalite"
                        value={formData.municipalite}
                        onChange={(value) => handleInputChange("municipalite", value)}
                        required
                    />
                    <InputField label={t("bfsNr")} name="bfsNr" value={formData.bfsNr} onChange={(value) => handleInputChange("bfsNr", value)} />
                    <SelectField
                        label={t("canton")}
                        value={formData.canton}
                        onChange={(value) => handleInputChange("canton", value)}
                        options={[
                            { value: "VD", label: "Vaud" },
                            { value: "GE", label: "Genève" },
                            { value: "FR", label: "Fribourg" },
                            // Ajoutez les autres cantons ici
                        ]}
                        required
                    />
                    <InputField
                        label={t("coordinateE")}
                        name="e"
                        value={formData.e}
                        onChange={(value) => handleInputChange("e", value)}
                        type="number"
                        step="0.000001"
                    />
                    <InputField
                        label={t("coordinateN")}
                        name="n"
                        value={formData.n}
                        onChange={(value) => handleInputChange("n", value)}
                        type="number"
                        step="0.000001"
                    />
                    <SelectField
                        label={t("language")}
                        value={formData.langue}
                        onChange={(value) => handleInputChange("langue", value)}
                        options={[
                            { value: "fr", label: "Français" },
                            { value: "de", label: "Deutsch" },
                            { value: "it", label: "Italiano" },
                        ]}
                        required
                    />
                    <RadioField
                        label={t("validity")}
                        name="validite"
                        value={formData.validite}
                        onChange={(value) => handleInputChange("validite", value)}
                        options={[
                            { value: "Oui", label: t("valid") },
                            { value: "Non", label: t("invalid") },
                        ]}
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push(`/${lng}/reference-data/localities`)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    >
                        {t("cancel")}
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? t("saving") : t("save")}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LocalityEdit;
