"use client";
import { ChevronRight } from "lucide-react";
import { InputField } from "@/components/common/InputField";
import { TextAreaField } from "@/components/common/TextAreaField";
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
    numero: string;
    nom: string;
    adresse: string;
    commentaires: string;
}

function CustomerEdit({ params }: PageProps) {
    const { lng } = use(params) as { lng: string };
    const { t } = useTranslation(lng, "customer");
    const [formData, setFormData] = useState<FormData>({
        numero: "",
        nom: "",
        adresse: "",
        commentaires: "",
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
                <Title variant="h1">{t("customerEdit")}</Title>
            </div>
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                {t("customerEdit")}
                            </Title>
                        </div>
                        <InputField label={t("number")} name="numero" type="text" value={formData.numero} onChange={handleChange("numero")} />
                        <InputField label={t("name")} name="nom" type="text" value={formData.nom} onChange={handleChange("nom")} />
                        <InputField label={t("address")} name="adresse" type="text" value={formData.adresse} onChange={handleChange("adresse")} />
                        <TextAreaField label={t("comments")} name="commentaires" value={formData.commentaires} onChange={handleChange("commentaires")} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CustomerEdit;
