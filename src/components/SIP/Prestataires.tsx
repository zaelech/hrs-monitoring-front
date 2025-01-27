interface Prestataire {
    label: string;
    value: string;
}

const prestataires: Prestataire[] = [
    {
        label: "Maitrise de l'ouvrage",
        value: "Aéroport international de Genève",
    },
    {
        label: "Architecte",
        value: "RSHP + Jacques Bugna SA",
    },
    {
        label: "Ingénieur civil",
        value: "T Ingénierie SA",
    },
    {
        label: "Ingénieur E",
        value: "Ingérop Conseils et Ingénierie",
    },
    {
        label: "Ingénieur CVS",
        value: "Ingérop Conseils et Ingénierie",
    },
    {
        label: "Autres",
        value: "Ingérop Conseils et Ingénierie",
    },
];

function Prestataires() {
    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            {prestataires.map((prestataire, index) => (
                <>
                    <div key={`label-${index}`} className="sm:col-span-1 content-center">
                        <span className="block text-sm font-medium leading-6 text-gray-900">{prestataire.label}</span>
                    </div>
                    <div key={`value-${index}`} className="sm:col-span-2">
                        <span className="block text-sm text-gray-900">{prestataire.value}</span>
                    </div>
                </>
            ))}
        </div>
    );
}

export default Prestataires;
