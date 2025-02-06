import { useState, useEffect } from "react";
import { Customer } from "@/components/CustomerTable";

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/customers")
            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors de la récupération des clients");
                return res.json();
            })
            .then((data) => {
                setCustomers(data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { customers, isLoading, error };
}
