import { ChevronRight } from "lucide-react";
import Prestataires from "../components/SIP/Prestataires";
import { FormField } from "../components/common/FormField";
import { RadioField } from "../components/common/RadioField";
import { TextAreaField } from "../components/common/TextAreaField";
import Title from "../components/common/Title";
import { useState } from "react";

interface FormData {
    projet: string;
    numero: string;
    cp: string;
    dt: string;
    debutTravaux: string;
    reception: string;
    signatureContrat: string;
    assuranceRcTc: string;
    validitePolice: string;
    garantieBonneExecution: string;
    validiteGarantie: string;
    montantGarantie: string;
    montantGarantieCurrency: string;
    montantContratHT: string;
    montantContratHTCurrency: string;
    honnorairesHRS: string;
    honnorairesHRCurrency: string;
    avenantsPOSignes: string;
    avenantsPOSignesCurrency: string;
    honorairesDTExternes: string;
    honorairesDTExternesCurrency: string;
    rgHrs: string;
    rgHrsCurrency: string;
    coutProbableMesserli: string;
    coutProbableMesserliCurrency: string;
    montantFactureAuMo: string;
    montantFactureAuMoCurrency: string;
    paiementsHRS: string;
    paiementsHRSCurrency: string;
    montantPayeParMo: string;
    montantPayeParMoCurrency: string;
    autresDebiteurs: string;
    autresDebiteursCurrency: string;
    etatDesVentes: string;
    etatDesVentesCurrency: string;
    etatDesVentesSur: string;
    etatDesVentesSurCurrency: string;
    devisAcquerTransmis: string;
    devisAcquerTransmisCurrency: string;
    devisAcquerFactures: string;
    devisAcquerFacturesCurrency: string;
    devisAcquereursSignes: string;
    devisAcquereursSignesCurrency: string;
    devisAcquereursPayes: string;
    devisAcquereursPayesCurrency: string;
    transmisNonValides: string;
    transmisNonValidesCurrency: string;
    aTransmettreEstimation: string;
    aTransmettreEstimationCurrency: string;
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
        cp: "SAP/VIJ/COS/SND",
        dt: "BEN/REB/MOJ/MFA/DIG/JAC",
        debutTravaux: "2017-06-06",
        reception: "2020-07-17",
        signatureContrat: "2017-03-28",
        assuranceRcTc: "La Bâloise",
        validitePolice: "2020-12-31",
        garantieBonneExecution: "Swiss Re",
        validiteGarantie: "2021-10-28",
        montantGarantie: "1.00",
        montantGarantieCurrency: "CHF",
        montantContratHT: "10.00",
        montantContratHTCurrency: "CHF",
        honnorairesHRS: "1.00",
        honnorairesHRCurrency: "CHF",
        avenantsPOSignes: "-5.00",
        avenantsPOSignesCurrency: "CHF",
        honorairesDTExternes: "0",
        honorairesDTExternesCurrency: "CHF",
        rgHrs: "1.00",
        rgHrsCurrency: "CHF",
        coutProbableMesserli: "11.00",
        coutProbableMesserliCurrency: "CHF",
        montantFactureAuMo: "3.00",
        montantFactureAuMoCurrency: "CHF",
        paiementsHRS: "1.00",
        paiementsHRSCurrency: "CHF",
        montantPayeParMo: "2.00",
        montantPayeParMoCurrency: "CHF",
        autresDebiteurs: "0",
        autresDebiteursCurrency: "CHF",
        etatDesVentes: "0",
        etatDesVentesCurrency: "CHF",
        etatDesVentesSur: "1331.00",
        etatDesVentesSurCurrency: "CHF",
        devisAcquerTransmis: "1331.00",
        devisAcquerTransmisCurrency: "CHF",
        devisAcquerFactures: "1331.00",
        devisAcquerFacturesCurrency: "CHF",
        devisAcquereursSignes: "1331.00",
        devisAcquereursSignesCurrency: "CHF",
        devisAcquereursPayes: "1331.00",
        devisAcquereursPayesCurrency: "CHF",
        transmisNonValides: "2.00",
        transmisNonValidesCurrency: "CHF",
        aTransmettreEstimation: "6.00",
        aTransmettreEstimationCurrency: "CHF",
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
                        <FormField label="Projet" name="projet" value={formData.projet} onChange={handleChange("projet")} />
                        <FormField label="No" name="numero" value={formData.numero} onChange={handleChange("numero")} />
                        <FormField label="CP" name="cp" value={formData.cp} onChange={handleChange("cp")} />
                        <FormField label="DT" name="dt" value={formData.dt} onChange={handleChange("dt")} />
                        <div className="flex flex-col gap-2">
                            <span className="font-medium">Prestataires</span>
                            <button type="button" className="border-solid border-2 border-[#FF6600] text-[#FF6600] text-sm px-3 py-1 rounded w-fit">
                                Ajouter
                            </button>
                        </div>
                        <div className="sm:col-span-5">
                            <Prestataires />
                        </div>
                        <FormField
                            label="Début travaux"
                            name="debutTravaux"
                            type="date"
                            value={formData.debutTravaux}
                            onChange={handleChange("debutTravaux")}
                        />
                        <FormField label="Réception" name="reception" type="date" value={formData.reception} onChange={handleChange("reception")} />
                        <FormField
                            label="Signature contrat"
                            name="signatureContrat"
                            type="date"
                            value={formData.signatureContrat}
                            onChange={handleChange("signatureContrat")}
                        />
                        <FormField label="Nb jrs" name="nbJours" value={nbJours().toString()} onChange={() => {}} disabled={true} />
                        <FormField label="Assurance RC/TC" name="assuranceRcTc" value={formData.assuranceRcTc} onChange={handleChange("assuranceRcTc")} />
                        <FormField
                            label="Validite police"
                            type="date"
                            name="validitePolice"
                            value={formData.validitePolice}
                            onChange={handleChange("validitePolice")}
                        />
                        <FormField
                            label="Garantie bonne execution"
                            name="garantieBonneExecution"
                            value={formData.garantieBonneExecution}
                            onChange={handleChange("garantieBonneExecution")}
                        />
                        <FormField
                            label="Validite garantie"
                            type="date"
                            name="validiteGarantie"
                            value={formData.validiteGarantie}
                            onChange={handleChange("validiteGarantie")}
                        />
                        <FormField
                            label="Montant garantie"
                            name="montantGarantie"
                            value={formData.montantGarantie}
                            onChange={handleChange("montantGarantie")}
                            currency={{
                                value: formData.montantGarantieCurrency,
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, montantGarantieCurrency: currency })),
                            }}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Controlling
                            </Title>
                        </div>
                        <FormField
                            label="Montant contrat (HT)"
                            name="montantContratHT"
                            value={formData.montantContratHT}
                            onChange={handleChange("montantContratHT")}
                            currency={{
                                value: formData.montantContratHTCurrency,
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, montantContratHTCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Honnoraires HRS"
                            name="honnorairesHRS"
                            value={formData.honnorairesHRS}
                            onChange={handleChange("honnorairesHRS")}
                            currency={{
                                value: formData.honnorairesHRCurrency,
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, honnorairesHRCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Avenants PO signes (HT)"
                            name="avenantsPOSignes"
                            value={formData.avenantsPOSignes}
                            onChange={handleChange("avenantsPOSignes")}
                            currency={{
                                value: formData.avenantsPOSignesCurrency,
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, avenantsPOSignesCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Honoraires DT externes"
                            name="honorairesDTExternes"
                            value={formData.honorairesDTExternes}
                            onChange={handleChange("honorairesDTExternes")}
                            currency={{
                                value: formData.honorairesDTExternesCurrency,
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, honorairesDTExternesCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Total = devis révisés (HT)"
                            name="totalDevisRevises"
                            value={totalDevisRevises().toFixed(2)}
                            onChange={() => {}}
                            disabled={true}
                            currency={{
                                value: formData.avenantsPOSignesCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="RG HRS"
                            name="rgHrs"
                            value={formData.rgHrs}
                            onChange={handleChange("rgHrs")}
                            currency={{
                                value: formData.rgHrsCurrency,
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, rgHrsCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Cout probable Messerli"
                            name="coutProbableMesserli"
                            value={formData.coutProbableMesserli}
                            onChange={handleChange("coutProbableMesserli")}
                            currency={{
                                value: formData.coutProbableMesserliCurrency,
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, coutProbableMesserliCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Coût prob./devis révisé (HT)"
                            name="totalCoutProbable"
                            value={coutProbableDevisRevise().toFixed(2)}
                            onChange={() => {}}
                            disabled={true}
                            currency={{
                                value: formData.avenantsPOSignesCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Liquidité
                            </Title>
                        </div>
                        <FormField
                            label="Montant facturé au MO (HT)"
                            name="montantFactureAuMo"
                            value={formData.montantFactureAuMo}
                            onChange={handleChange("montantFactureAuMo")}
                            currency={{
                                value: formData.montantFactureAuMoCurrency,
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, montantFactureAuMoCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Paiements HRS"
                            name="paiementsHRS"
                            value={formData.paiementsHRS}
                            onChange={handleChange("paiementsHRS")}
                            currency={{
                                value: formData.paiementsHRSCurrency,
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, paiementsHRSCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Montant payé par MO (HT)"
                            name="montantPayeParMo"
                            value={formData.montantPayeParMo}
                            onChange={handleChange("montantPayeParMo")}
                            currency={{
                                value: formData.montantPayeParMoCurrency,
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, montantPayeParMoCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Liquidité"
                            name="liquidite"
                            value={liquidite().toFixed(2)}
                            onChange={() => {}}
                            disabled={true}
                            currency={{
                                value: formData.avenantsPOSignesCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Retard paiement MO"
                            name="retardPaiementMO"
                            value={retardPaiementMO().toFixed(2)}
                            onChange={() => {}}
                            disabled={true}
                            currency={{
                                value: formData.avenantsPOSignesCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Autres débiteurs (HT)"
                            name="autresDebiteurs"
                            value={formData.autresDebiteurs}
                            onChange={handleChange("autresDebiteurs")}
                            currency={{
                                value: formData.avenantsPOSignesCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Gestion PPE
                            </Title>
                        </div>
                        <FormField
                            label="Etat des ventes"
                            name="etatDesVentes"
                            value={formData.etatDesVentes}
                            onChange={handleChange("etatDesVentes")}
                            currency={{
                                value: formData.etatDesVentesCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="sur"
                            name="etatDesVentesSur"
                            value={formData.etatDesVentesSur}
                            onChange={handleChange("etatDesVentesSur")}
                            currency={{
                                value: formData.etatDesVentesSurCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Devis acquér. transmis. (HT)"
                            name="devisAcquerTransmis"
                            value={formData.devisAcquerTransmis}
                            onChange={handleChange("devisAcquerTransmis")}
                            currency={{
                                value: formData.devisAcquerTransmisCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Devis acquér. facturés (HT)"
                            name="devisAcquerFactures"
                            value={formData.devisAcquerFactures}
                            onChange={handleChange("devisAcquerFactures")}
                            currency={{
                                value: formData.devisAcquerFacturesCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Devis acquéreurs signés (HT)"
                            name="devisAcquereursSignes"
                            value={formData.devisAcquerFactures}
                            onChange={handleChange("devisAcquerFactures")}
                            currency={{
                                value: formData.devisAcquerFacturesCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="Devis acquéreurs payés (HT)"
                            name="devisAcquereursPayes"
                            value={formData.devisAcquereursPayes}
                            onChange={handleChange("devisAcquereursPayes")}
                            currency={{
                                value: formData.devisAcquereursPayesCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Avenants MO (modification projet)
                            </Title>
                        </div>
                        <FormField
                            label="Transmis, non validés (HT)"
                            name="transmisNonValides"
                            value={formData.transmisNonValides}
                            onChange={handleChange("transmisNonValides")}
                            currency={{
                                value: formData.transmisNonValidesCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <FormField
                            label="A transmettre, estimation (HT)"
                            name="aTransmettreEstimation"
                            value={formData.aTransmettreEstimation}
                            onChange={handleChange("aTransmettreEstimation")}
                            currency={{
                                value: formData.aTransmettreEstimationCurrency.toString(),
                                onCurrencyChange: (currency) => setFormData((prev) => ({ ...prev, totalDevisRevisesCurrency: currency })),
                            }}
                        />
                        <div className="sm:col-span-6">
                            <Title variant="h3" className="bg-[#FF6600] text-white text-center p-2">
                                Adjudications
                            </Title>
                        </div>
                        <FormField
                            label="CFC en cours d'ajudication"
                            name="cfcEnCoursAjudication"
                            value={formData.cfcEnCoursAjudication}
                            onChange={handleChange("cfcEnCoursAjudication")}
                        />
                        <FormField
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
