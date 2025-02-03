"use client";

import React from "react";

interface RessourceHRS {
    role: string;
    employe: string;
    pourcentage: number;
}

const ressources: RessourceHRS[] = [
    {
        role: "Chef de projet",
        employe: "Jean Dupont",
        pourcentage: 40,
    },
    {
        role: "Directeur de travaux",
        employe: "Marie Martin",
        pourcentage: 60,
    },
    {
        role: "Assistant de projet",
        employe: "Pierre Dubois",
        pourcentage: 80,
    },
];

function RessourcesHRS() {
    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            {ressources.map((ressource, index) => (
                <React.Fragment key={index}>
                    {" "}
                    {/* ou simplement <Fragment key={index}> */}
                    <div className="sm:col-span-1 content-center">
                        <span className="block text-sm font-medium leading-6 text-gray-900">{ressource.role}</span>
                    </div>
                    <div className="sm:col-span-2">
                        <span className="block text-sm text-gray-900">
                            {ressource.employe} ({ressource.pourcentage}%)
                        </span>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}

export default RessourcesHRS;
