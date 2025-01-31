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
    subProject: string;
    cfc: string;
    contactResp: string;
    adjudicataire: string;
    prestation: string;
    type: string;
    prixHt: string;
    prixTtc: string;
    confCommEnvoyeeLe: string;
    confCommRecueLe: string;
    confAdjEnvoyeeLe: string;
    contratEnvoyeLe: string;
    contratSigneLe: string;
    panneauChantier: string;
    wirMontant: string;
    wirDate: string;
    gbeMontant: string;
    gbeEcheance: string;
    gbeDateReception: string;
    g_Acompte_Montant: string;
    g_Acompte_DateReception: string;
    dec_Resp: string;
    montantDfNetHt: string;
    soldeDfNetHt: string;
    envoi: string;
    signe: string;
    g_Dft_Montant: string;
    g_Dft_reçu: string;
}

function ContractEdit({ params }: PageProps) {
    const { lng } = use(params) as { lng: string };
    const { t } = useTranslation(lng, "contract");
    const [formData, setFormData] = useState<FormData>({
        subProject: "",
        cfc: "",
        contactResp: "",
        adjudicataire: "",
        prestation: "",
        type: "",
        prixHt: "",
        prixTtc: "",
        confCommEnvoyeeLe: "",
        confCommRecueLe: "",
        confAdjEnvoyeeLe: "",
        contratEnvoyeLe: "",
        contratSigneLe: "",
        panneauChantier: "",
        wirMontant: "",
        wirDate: "",
        gbeMontant: "",
        gbeEcheance: "",
        gbeDateReception: "",
        g_Acompte_Montant: "",
        g_Acompte_DateReception: "",
        dec_Resp: "",
        montantDfNetHt: "",
        soldeDfNetHt: "",
        envoi: "",
        signe: "",
        g_Dft_Montant: "",
        g_Dft_reçu: "",
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
                <Title variant="h1">{t("contractEdit")}</Title>
            </div>
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                {t("Contract")}
                            </Title>
                        </div>
                        <InputField
                            label={t("subProject")}
                            name="subProject"
                            type="text"
                            value={formData.subProject}
                            onChange={handleChange("subProject")}
                        />
                        <InputField
                            label={t("cfc")}
                            name="cfc"
                            type="text"
                            value={formData.cfc}
                            onChange={handleChange("cfc")}
                        />
                        <InputField
                            label={t("contactResp")}
                            name="contactResp"
                            type="text"
                            value={formData.contactResp}
                            onChange={handleChange("contactResp")}
                        />
                        <InputField
                            label={t("adjudicataire")}
                            name="adjudicataire"
                            type="text"
                            value={formData.adjudicataire}
                            onChange={handleChange("adjudicataire")}
                        />
                        <SelectField
                            label={t("prestation")}
                            name="prestation"
                            value={formData.prestation}
                            onChange={(value) => setFormData({ ...formData, prestation: value })}
                            options={[
                                { value: "Fournisseur", label: t("fournisseur") },
                                { value: "Mandataire", label: t("mandataire") },
                                { value: "Sous-traitant", label: t("sousTraitant") },
                            ]}
                            placeholder={t("selectionnezUneOption")}
                        />
                        <SelectField
                            label={t("type")}
                            name="type"
                            value={formData.type}
                            onChange={(value) => setFormData({ ...formData, type: value })}
                            options={[
                                { value: "Forfait", label: t("forfait") },
                                { value: "Métré", label: t("métré") },
                            ]}
                            placeholder={t("selectionnezUneOption")}
                        />
                        <InputField
                            label={t("prixHt")}
                            name="prixHt"
                            type="text"
                            value={formData.prixHt}
                            onChange={handleChange("prixHt")}
                        />
                        <InputField
                            label={t("prixTtc")}
                            name="prixTtc"
                            type="text"
                            value={formData.prixTtc}
                            onChange={handleChange("prixTtc")}
                        />
                        <InputField
                            label={t("confCommEnvoyeeLe")}
                            name="confCommEnvoyeeLe"
                            type="date"
                            value={formData.confCommEnvoyeeLe}
                            onChange={handleChange("confCommEnvoyeeLe")}
                        />
                        <InputField
                            label={t("confCommRecueLe")}
                            name="confCommRecueLe"
                            type="date"
                            value={formData.confCommRecueLe}
                            onChange={handleChange("confCommRecueLe")}
                        />
                        <InputField
                            label={t("confAdjEnvoyeeLe")}
                            name="confAdjEnvoyeeLe"
                            type="date"
                            value={formData.confAdjEnvoyeeLe}
                            onChange={handleChange("confAdjEnvoyeeLe")}
                        />
                        <InputField
                            label={t("contratEnvoyeLe")}
                            name="contratEnvoyeLe"
                            type="date"
                            value={formData.contratEnvoyeLe}
                            onChange={handleChange("contratEnvoyeLe")}
                        />
                        <InputField
                            label={t("contratSigneLe")}
                            name="contratSigneLe"
                            type="date"
                            value={formData.contratSigneLe}
                            onChange={handleChange("contratSigneLe")}
                        />
                        <SelectField
                            label={t("panneauChantier")}
                            name="panneauChantier"
                            value={formData.panneauChantier}
                            onChange={(value) => setFormData({ ...formData, panneauChantier: value })}
                            options={[
                                { value: "Oui", label: t("oui") },
                                { value: "Non", label: t("non") },
                            ]}
                            placeholder={t("selectionnezUneOption")}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                {t("WIR")}
                            </Title>
                        </div>
                        <InputField
                            label={t("wirMontant")}
                            name="wirMontant"
                            type="text"
                            value={formData.wirMontant}
                            onChange={handleChange("wirMontant")}
                        />
                        <InputField
                            label={t("wirDate")}
                            name="wirDate"
                            type="date"
                            value={formData.wirDate}
                            onChange={handleChange("wirDate")}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                {t("Garantie")}
                            </Title>
                        </div>
                        <InputField
                            label={t("gbeMontant")}
                            name="gbeMontant"
                            type="text"
                            value={formData.gbeMontant}
                            onChange={handleChange("gbeMontant")}
                        />
                        <InputField
                            label={t("gbeEcheance")}
                            name="gbeEcheance"
                            type="date"
                            value={formData.gbeEcheance}
                            onChange={handleChange("gbeEcheance")}
                        />
                        <InputField
                            label={t("gbeDateReception")}
                            name="gbeDateReception"
                            type="date"
                            value={formData.gbeDateReception}
                            onChange={handleChange("gbeDateReception")}
                        />
                        <InputField
                            label={t("gAcompteMontant")}
                            name="g_Acompte_Montant"
                            type="text"
                            value={formData.g_Acompte_Montant}
                            onChange={handleChange("g_Acompte_Montant")}
                        />
                        <InputField
                            label={t("gAcompteDateReception")}
                            name="g_Acompte_DateReception"
                            type="date"
                            value={formData.g_Acompte_DateReception}
                            onChange={handleChange("g_Acompte_DateReception")}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                {t("Décompte")}
                            </Title>
                        </div>
                        <InputField
                            label={t("decResp")}
                            name="dec_Resp"
                            type="text"
                            value={formData.dec_Resp}
                            onChange={handleChange("dec_Resp")}
                        />
                        <InputField
                            label={t("montantDfNetHt")}
                            name="montantDfNetHt"
                            type="text"
                            value={formData.montantDfNetHt}
                            onChange={handleChange("montantDfNetHt")}
                        />
                        <InputField
                            label={t("soldeDfNetHt")}
                            name="soldeDfNetHt"
                            type="text"
                            value={formData.soldeDfNetHt}
                            onChange={handleChange("soldeDfNetHt")}
                        />
                        <InputField
                            label={t("envoi")}
                            name="envoi"
                            type="date"
                            value={formData.envoi}
                            onChange={handleChange("envoi")}
                        />
                        <InputField
                            label={t("signe")}
                            name="signe"
                            type="date"
                            value={formData.signe}
                            onChange={handleChange("signe")}
                        />
                        <InputField
                            label={t("gDftMontant")}
                            name="g_Dft_Montant"
                            type="text"
                            value={formData.g_Dft_Montant}
                            onChange={handleChange("g_Dft_Montant")}
                        />
                        <InputField
                            label={t("gDftRecu")}
                            name="g_Dft_reçu"
                            type="date"
                            value={formData.g_Dft_reçu}
                            onChange={handleChange("g_Dft_reçu")}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ContractEdit;
