"use client";
import { ChevronRight } from "lucide-react";
import Prestataires from "@/components/SIP/Prestataires";
import RessourcesHRS from "@/components/SIP/RessourcesHRS";
import { InputField } from "@/components/common/InputField";
import { RadioField } from "@/components/common/RadioField";
import { TextAreaField } from "@/components/common/TextAreaField";
import Title from "@/components/common/Title";
import { useState } from "react";

interface FormData {
    projet: string;
    numero: string;
    debutTravaux: string;
    reception: string;
    signatureContrat: string;
    assuranceRcTc: string;
    validitePolice: string;
    garantieBonneExecution: string;
    validiteGarantie: string;
    montantGarantie: string;
    montantContratHT: string;
    honnorairesHRS: string;
    avenantsPOSignes: string;
    honorairesDTExternes: string;
    rgHrs: string;
    coutProbableMesserli: string;
    montantFactureAuMo: string;
    paiementsHRS: string;
    montantPayeParMo: string;
    autresDebiteurs: string;
    etatDesVentes: string;
    etatDesVentesSur: string;
    devisAcquerTransmis: string;
    devisAcquerFactures: string;
    devisAcquereursSignes: string;
    devisAcquereursPayes: string;
    transmisNonValides: string;
    aTransmettreEstimation: string;
    cfcEnCoursAjudication: string;
    cfcEnPreparation: string;
    delaisConformite: string;
    delaisCommentaire: string;
    securiteConformite: string;
    securiteCommentaire: string;
    planificationMandatairesCommentaire: string;
    problemesSousTraitantsCommentaire: string;
}

function SIPEdit() {
    const [formData, setFormData] = useState<FormData>({
        projet: "Aéroport - Aile Est - Bat 2",
        numero: "1331,00",
        debutTravaux: "2017-06-06",
        reception: "2020-07-17",
        signatureContrat: "2017-03-28",
        assuranceRcTc: "La Bâloise",
        validitePolice: "2020-12-31",
        garantieBonneExecution: "Swiss Re",
        validiteGarantie: "2021-10-28",
        montantGarantie: "1.00",
        montantContratHT: "10.00",
        honnorairesHRS: "1.00",
        avenantsPOSignes: "-5.00",
        honorairesDTExternes: "0",
        rgHrs: "1.00",
        coutProbableMesserli: "11.00",
        montantFactureAuMo: "3.00",
        paiementsHRS: "1.00",
        montantPayeParMo: "2.00",
        autresDebiteurs: "0",
        etatDesVentes: "0",
        etatDesVentesSur: "1331.00",
        devisAcquerTransmis: "1331.00",
        devisAcquerFactures: "1331.00",
        devisAcquereursSignes: "1331.00",
        devisAcquereursPayes: "1331.00",
        transmisNonValides: "2.00",
        aTransmettreEstimation: "6.00",
        cfcEnCoursAjudication: "Sous-faces, Serr. diverse, Doublage verre, Faux-planchers, Echafuadages",
        cfcEnPreparation: "Monilier, Coupe feu, Plâtrerie, Faux-plafonds",
        delaisConformite: "conforme",
        delaisCommentaire: "",
        securiteConformite: "conforme",
        securiteCommentaire: "",
        planificationMandatairesCommentaire: "",
        problemesSousTraitantsCommentaire: "",
    });

    const nbJours = () => {
        const debutTravaux = new Date(formData.debutTravaux);
        const reception = new Date(formData.reception);
        const diffTime = Math.abs(reception.getTime() - debutTravaux.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const totalDevisRevises = () => {
        const montantContratHT = Number(formData.montantContratHT);
        const avenantsPOSignes = Number(formData.avenantsPOSignes);
        return montantContratHT + avenantsPOSignes;
    };

    const coutProbableDevisRevise = () => {
        const coutProbableMesserli = Number(formData.coutProbableMesserli);
        return totalDevisRevises() + coutProbableMesserli;
    };

    const liquidite = () => {
        const montantPayeParMo = Number(formData.montantPayeParMo);
        const paiementsHRS = Number(formData.paiementsHRS);
        return montantPayeParMo - paiementsHRS;
    };

    const retardPaiementMO = () => {
        const montantFactureAuMo = Number(formData.montantFactureAuMo);
        const montantPayeParMo = Number(formData.montantPayeParMo);
        return montantFactureAuMo - montantPayeParMo;
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
                    <span>Projects</span>
                    <ChevronRight size={16} className="text-gray-400" />
                    <span>Édition SIP</span>
                </div>
                <Title variant="h1">Édition SIP</Title>
            </div>

            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Données de base
                            </Title>
                        </div>
                        <InputField label="Projet" name="projet" value={formData.projet} onChange={() => {}} disabled={true} />
                        <InputField label="No" name="numero" value={formData.numero} onChange={() => {}} disabled={true} />
                        <div className="flex flex-col gap-2">
                            <span className="font-medium">Ressources HRS</span>
                            <button type="button" className="border-solid border-2 border-[#FF6600] text-[#FF6600] text-sm px-3 py-1 rounded w-fit">
                                Ajouter
                            </button>
                        </div>
                        <div className="sm:col-span-5">
                            <RessourcesHRS />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-medium">Prestataires</span>
                            <button type="button" className="border-solid border-2 border-[#FF6600] text-[#FF6600] text-sm px-3 py-1 rounded w-fit">
                                Ajouter
                            </button>
                        </div>
                        <div className="sm:col-span-5">
                            <Prestataires />
                        </div>
                        <InputField
                            label="Début travaux"
                            name="debutTravaux"
                            type="date"
                            value={formData.debutTravaux}
                            onChange={handleChange("debutTravaux")}
                        />
                        <InputField label="Réception" name="reception" type="date" value={formData.reception} onChange={handleChange("reception")} />
                        <InputField
                            label="Signature contrat"
                            name="signatureContrat"
                            type="date"
                            value={formData.signatureContrat}
                            onChange={handleChange("signatureContrat")}
                        />
                        <InputField label="Nb jrs" name="nbJours" value={nbJours().toString()} onChange={() => {}} disabled={true} />
                        <InputField label="Assurance RC/TC" name="assuranceRcTc" value={formData.assuranceRcTc} onChange={handleChange("assuranceRcTc")} />
                        <InputField
                            label="Validite police"
                            type="date"
                            name="validitePolice"
                            value={formData.validitePolice}
                            onChange={handleChange("validitePolice")}
                        />
                        <InputField
                            label="Garantie bonne execution"
                            name="garantieBonneExecution"
                            value={formData.garantieBonneExecution}
                            onChange={handleChange("garantieBonneExecution")}
                        />
                        <InputField
                            label="Validite garantie"
                            type="date"
                            name="validiteGarantie"
                            value={formData.validiteGarantie}
                            onChange={handleChange("validiteGarantie")}
                        />
                        <InputField
                            label="Montant garantie"
                            name="montantGarantie"
                            value={formData.montantGarantie}
                            onChange={handleChange("montantGarantie")}
                            currency={true}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Controlling
                            </Title>
                        </div>
                        <InputField
                            label="Montant contrat (HT)"
                            name="montantContratHT"
                            value={formData.montantContratHT}
                            onChange={handleChange("montantContratHT")}
                            currency={true}
                        />
                        <InputField
                            label="Honnoraires HRS"
                            name="honnorairesHRS"
                            value={formData.honnorairesHRS}
                            onChange={handleChange("honnorairesHRS")}
                            currency={true}
                        />
                        <InputField
                            label="Avenants PO signes (HT)"
                            name="avenantsPOSignes"
                            value={formData.avenantsPOSignes}
                            onChange={handleChange("avenantsPOSignes")}
                            currency={true}
                        />
                        <InputField
                            label="Honoraires DT externes"
                            name="honorairesDTExternes"
                            value={formData.honorairesDTExternes}
                            onChange={handleChange("honorairesDTExternes")}
                            currency={true}
                        />
                        <InputField
                            label="Total = devis révisés (HT)"
                            name="totalDevisRevises"
                            value={totalDevisRevises().toFixed(2)}
                            onChange={() => {}}
                            disabled={true}
                            currency={true}
                        />
                        <InputField label="RG HRS" name="rgHrs" value={formData.rgHrs} onChange={handleChange("rgHrs")} currency={true} />
                        <InputField
                            label="Cout probable Messerli"
                            name="coutProbableMesserli"
                            value={formData.coutProbableMesserli}
                            onChange={handleChange("coutProbableMesserli")}
                            currency={true}
                        />
                        <InputField
                            label="Coût prob./devis révisé (HT)"
                            name="totalCoutProbable"
                            value={coutProbableDevisRevise().toFixed(2)}
                            onChange={() => {}}
                            disabled={true}
                            currency={true}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Liquidité
                            </Title>
                        </div>
                        <InputField
                            label="Montant facturé au MO (HT)"
                            name="montantFactureAuMo"
                            value={formData.montantFactureAuMo}
                            onChange={handleChange("montantFactureAuMo")}
                            currency={true}
                        />
                        <InputField
                            label="Paiements HRS"
                            name="paiementsHRS"
                            value={formData.paiementsHRS}
                            onChange={handleChange("paiementsHRS")}
                            currency={true}
                        />
                        <InputField
                            label="Montant payé par MO (HT)"
                            name="montantPayeParMo"
                            value={formData.montantPayeParMo}
                            onChange={handleChange("montantPayeParMo")}
                            currency={true}
                        />
                        <InputField label="Liquidité" name="liquidite" value={liquidite().toFixed(2)} onChange={() => {}} disabled={true} currency={true} />
                        <InputField
                            label="Retard paiement MO"
                            name="retardPaiementMO"
                            value={retardPaiementMO().toFixed(2)}
                            onChange={() => {}}
                            disabled={true}
                            currency={true}
                        />
                        <InputField
                            label="Autres débiteurs (HT)"
                            name="autresDebiteurs"
                            value={formData.autresDebiteurs}
                            onChange={handleChange("autresDebiteurs")}
                            currency={true}
                        />

                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Gestion PPE
                            </Title>
                        </div>
                        <InputField
                            label="Etat des ventes"
                            name="etatDesVentes"
                            value={formData.etatDesVentes}
                            onChange={handleChange("etatDesVentes")}
                            currency={true}
                        />
                        <InputField
                            label="sur"
                            name="etatDesVentesSur"
                            value={formData.etatDesVentesSur}
                            onChange={handleChange("etatDesVentesSur")}
                            currency={true}
                        />
                        <InputField
                            label="Devis acquér. transmis. (HT)"
                            name="devisAcquerTransmis"
                            value={formData.devisAcquerTransmis}
                            onChange={handleChange("devisAcquerTransmis")}
                            currency={true}
                        />
                        <InputField
                            label="Devis acquér. facturés (HT)"
                            name="devisAcquerFactures"
                            value={formData.devisAcquerFactures}
                            onChange={handleChange("devisAcquerFactures")}
                            currency={true}
                        />
                        <InputField
                            label="Devis acquéreurs signés (HT)"
                            name="devisAcquereursSignes"
                            value={formData.devisAcquerFactures}
                            onChange={handleChange("devisAcquerFactures")}
                            currency={true}
                        />
                        <InputField
                            label="Devis acquéreurs payés (HT)"
                            name="devisAcquereursPayes"
                            value={formData.devisAcquereursPayes}
                            onChange={handleChange("devisAcquereursPayes")}
                            currency={true}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Avenants MO (modification projet)
                            </Title>
                        </div>
                        <InputField
                            label="Transmis, non validés (HT)"
                            name="transmisNonValides"
                            value={formData.transmisNonValides}
                            onChange={handleChange("transmisNonValides")}
                            currency={true}
                        />
                        <InputField
                            label="A transmettre, estimation (HT)"
                            name="aTransmettreEstimation"
                            value={formData.aTransmettreEstimation}
                            onChange={handleChange("aTransmettreEstimation")}
                            currency={true}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Adjudications
                            </Title>
                        </div>
                        <InputField
                            label="CFC en cours d'ajudication"
                            name="cfcEnCoursAjudication"
                            value={formData.cfcEnCoursAjudication}
                            onChange={handleChange("cfcEnCoursAjudication")}
                        />
                        <InputField
                            label="CFC en préparation"
                            name="cfcEnPreparation"
                            value={formData.cfcEnPreparation}
                            onChange={handleChange("cfcEnPreparation")}
                        />
                        <div className="sm:col-span-3">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Délais
                            </Title>
                        </div>

                        <div className="sm:col-span-3">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Sécurité
                            </Title>
                        </div>
                        <RadioField
                            name="delaisConformite"
                            value={formData.delaisConformite}
                            options={[
                                { label: "Conforme", value: "conforme" },
                                { label: "Non conforme", value: "non conforme" },
                            ]}
                            onChange={handleChange("delaisConformite")}
                            disabled={false}
                        />
                        <RadioField
                            name="securiteConformite"
                            value={formData.securiteConformite}
                            options={[
                                { label: "Conforme", value: "conforme" },
                                { label: "Non conforme", value: "non conforme" },
                            ]}
                            onChange={handleChange("securiteConformite")}
                            disabled={false}
                        />
                        <TextAreaField name="delaisCommentaire" value={formData.delaisCommentaire} onChange={handleChange("delaisCommentaire")} rows={4} />
                        <TextAreaField
                            name="securiteCommentaire"
                            value={formData.securiteCommentaire}
                            onChange={handleChange("securiteCommentaire")}
                            rows={4}
                        />
                        <div className="sm:col-span-3">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Planification mandataires
                            </Title>
                        </div>
                        <div className="sm:col-span-3">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Problèmes sous-traitants
                            </Title>
                        </div>
                        <TextAreaField
                            name="planificationMandatairesCommentaire"
                            value={formData.planificationMandatairesCommentaire}
                            onChange={handleChange("planificationMandatairesCommentaire")}
                            rows={4}
                        />
                        <TextAreaField
                            name="problemesSousTraitantsCommentaire"
                            value={formData.problemesSousTraitantsCommentaire}
                            onChange={handleChange("problemesSousTraitantsCommentaire")}
                            rows={4}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Annexes
                            </Title>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SIPEdit;
