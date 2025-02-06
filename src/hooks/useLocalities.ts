import { useState, useEffect } from 'react';
import { Locality } from '@/components/LocalityTable';

export function useLocalities() {
    const [localities, setLocalities] = useState<Locality[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocalities = async () => {
            try {
                const response = await fetch('/api/locations');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des localités');
                }
                const data = await response.json();
                // Transformation des données pour correspondre à notre interface Locality
                const formattedData: Locality[] = data.map((location: any) => ({
                    id: location.id,
                    place: location.place,
                    zipCode: location.zipCode,
                    municipality: location.municipality,
                    canton: location.canton,
                    validity: location.validity,
                }));
                setLocalities(formattedData);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocalities();
    }, []);

    return { localities, isLoading, error };
}
