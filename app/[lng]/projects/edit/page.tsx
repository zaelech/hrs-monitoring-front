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

interface FormData {
    numero: string;
    localite: string;
    parcelle: string;
    numeroSousProjet: string;
    mo: string;
    assuranceRctcAssureur: string;
    assuranceRctcEcheance: string;
    garantieBeEntite: string;
    garantieBeMontant: string;
    garantieBeEcheance: string;
    type: string;
    remuneration: string;
    ppe: string;
}

function ProjectEdit() {
    const [formData, setFormData] = useState<FormData>({
        numero: "1021",
        localite: "1021",
        parcelle: "1021",
        numeroSousProjet: "1021",
        mo: "1021",
        assuranceRctcAssureur: "1021",
        assuranceRctcEcheance: "1021",
        garantieBeEntite: "1021",
        garantieBeMontant: "1021",
        garantieBeEcheance: "1021",
        type: "1021",
        remuneration: "1021",
        ppe: "1021",
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
                    <span>Projects</span>
                    <ChevronRight size={16} className="text-gray-400" />
                    <span>Project Edit</span>
                </div>
                <Title variant="h1">Project Edit</Title>
            </div>
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Projet
                            </Title>
                        </div>
                        <InputField label="Numéro" name="numero" type="text" value={formData.numero} onChange={handleChange("numero")} />
                        <InputField label="Localité" name="localite" type="text" value={formData.localite} onChange={handleChange("localite")} />
                        <InputField label="Parcelle" name="parcelle" type="text" value={formData.parcelle} onChange={handleChange("parcelle")} />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Sous-projets
                            </Title>
                        </div>
                        <InputField
                            label="N°Sous-Projet"
                            name="numeroSousProjet"
                            type="text"
                            value={formData.numeroSousProjet}
                            onChange={handleChange("numeroSousProjet")}
                        />
                        <InputField label="MO" name="mo" type="text" value={formData.mo} onChange={handleChange("mo")} />
                        <InputField
                            label="Assurance RCTC_Assureur"
                            name="assuranceRctcAssureur"
                            type="text"
                            value={formData.assuranceRctcAssureur}
                            onChange={handleChange("assuranceRctcAssureur")}
                        />
                        <SelectField
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={(value) => setFormData({ ...formData, type: value })}
                            options={[
                                { value: "EG", label: "EG" },
                                { value: "ET", label: "ET" },
                                { value: "DT", label: "DT" },
                            ]}
                            placeholder="Sélectionnez une option"
                        />
                        <SelectField
                            label="Rémunération"
                            name="remuneration"
                            value={formData.remuneration}
                            onChange={(value) => setFormData({ ...formData, remuneration: value })}
                            options={[
                                { value: "Forfait", label: "Forfait" },
                                { value: "Coût plafond", label: "Coût plafond" },
                                { value: "Livre ouvert", label: "Livre ouvert" },
                            ]}
                            placeholder="Sélectionnez une option"
                        />
                        <SelectField
                            label="PPE"
                            name="ppe"
                            value={formData.ppe}
                            onChange={(value) => setFormData({ ...formData, ppe: value })}
                            options={[
                                { value: "PPE tiers", label: "PPE tiers" },
                                { value: "PPE promo", label: "PPE promo" }
                            ]}
                            placeholder="Sélectionnez une option"
                        />
                        <InputField
                            label="Assurance RCTC_Echeance"
                            name="assuranceRctcEcheance"
                            type="text"
                            value={formData.assuranceRctcEcheance}
                            onChange={handleChange("assuranceRctcEcheance")}
                        />
                        <InputField
                            label="GarantieBE_Entité"
                            name="garantieBeEntite"
                            type="text"
                            value={formData.garantieBeEntite}
                            onChange={handleChange("garantieBeEntite")}
                        />
                        <InputField
                            label="GarantieBE_Montant"
                            name="garantieBeMontant"
                            type="text"
                            value={formData.garantieBeMontant}
                            onChange={handleChange("garantieBeMontant")}
                        />
                        <InputField
                            label="GarantieBE_Echéance"
                            name="garantieBeEcheance"
                            type="text"
                            value={formData.garantieBeEcheance}
                            onChange={handleChange("garantieBeEcheance")}
                        />
                   
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProjectEdit;
