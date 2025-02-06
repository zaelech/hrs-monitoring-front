import { useState, useEffect } from "react";

interface Project {
    id: number;
    number: number;
    parcel: string;
    location: {
        id: number;
        place: string;
        canton: string;
    };
}

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects");
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des projets");
                }
                const data = await response.json();
                setProjects(data);
                setError(null);
            } catch (error) {
                setError("Une erreur est survenue lors du chargement des projets");
                console.error("Erreur:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { projects, isLoading, error };
}
