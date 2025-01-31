"use client";
import { ChevronRight } from "lucide-react";
import Prestataires from "@/components/SIP/Prestataires";
import RessourcesHRS from "@/components/SIP/RessourcesHRS";
import { InputField } from "@/components/common/InputField";
import { RadioField } from "@/components/common/RadioField";
import { TextAreaField } from "@/components/common/TextAreaField";
import { SelectField } from "@/components/common/SelectField";
import Title from "@/components/common/Title";
import { useState } from "react";
import { useTranslation } from "@/../app/i18n/client";
import { use } from "react";

interface PageProps {
    params: Promise<{
        lng: string;
    }>;
}

interface FormData {
    lieu: string;
    npa: string;
    numero: string;
    municipalite: string;
    bfsNr: string;
    cantion: string;
    e: string;
    n: string;
    langue: string;
    validite: string;
}

function LocalityEdit({ params }: PageProps) {
    const { lng } = use(params) as { lng: string };
    const { t } = useTranslation(lng, "locality");
    const [formData, setFormData] = useState<FormData>({
        lieu: "",
        npa: "",
        numero: "",
        municipalite: "",
        bfsNr: "",
        cantion: "",
        e: "",
        n: "",
        langue: "",
        validite: "",
    });   

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
                    <span>{t("title")}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                    <span>{t("edit")}</span>
                </div>
                <Title variant="h1">{t("localityEdit")}</Title>
            </div>
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                {t("locality")}
                            </Title>
                        </div>
                        <InputField
                            label={t("lieu")}
                            name="lieu"
                            value={formData.lieu}
                            onChange={handleChange("lieu")}
                            placeholder={t("lieu")}
                        />
                        <InputField
                            label={t("npa")}
                            name="npa"
                            value={formData.npa}
                            onChange={handleChange("npa")}
                            placeholder={t("npa")}
                        />
                        <InputField
                            label={t("numero")}
                            name="numero"
                            value={formData.numero}
                            onChange={handleChange("numero")}
                            placeholder={t("numero")}
                        />
                        <InputField
                            label={t("municipalite")}
                            name="municipalite"
                            value={formData.municipalite}
                            onChange={handleChange("municipalite")}
                            placeholder={t("municipalite")}
                        />
                        <InputField
                            label={t("bfs-Nr")}
                            name="bfs-Nr"
                            value={formData.bfsNr}
                            onChange={handleChange("bfsNr")}
                            placeholder={t("bfs-Nr")}
                        />
                        <InputField
                            label={t("cantion")}
                            name="cantion"
                            value={formData.cantion}
                            onChange={handleChange("cantion")}
                            placeholder={t("cantion")}
                        />
                        <InputField
                            label={t("e")}
                            name="e"
                            value={formData.e}
                            onChange={handleChange("e")}
                            placeholder={t("e")}
                        />
                        <InputField
                            label={t("n")}
                            name="n"
                            value={formData.n}
                            onChange={handleChange("n")}
                            placeholder={t("n")}
                        />
                        <InputField
                            label={t("langue")}
                            name="langue"
                            value={formData.langue}
                            onChange={handleChange("langue")}
                            placeholder={t("langue")}
                        />
                        <InputField
                            label={t("lieu")}
                            name="lieu"
                            value={formData.lieu}
                            onChange={handleChange("lieu")}
                            placeholder={t("lieu")}
                        />
                        <SelectField
                            label={t("validite")}
                            name="validite"
                            value={formData.validite}
                            onChange={(value) => setFormData({ ...formData, validite: value })}
                            options={[
                                { value: "Oui", label: t("oui") },
                                { value: "Non", label: t("non") },
                            ]}
                            placeholder={t("selectionnezUneOption")}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LocalityEdit;
