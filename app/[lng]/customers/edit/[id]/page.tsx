"use client";
import { ChevronRight } from "lucide-react";
import { InputField } from "@/components/common/InputField";
import { TextAreaField } from "@/components/common/TextAreaField";
import { PageHeader } from "@/components/common/PageHeader";
import { useEffect, useState, use } from "react";
import { useTranslation } from "@/../app/i18n/client";
import { useRouter } from "next/navigation";

interface PageProps {
    params: Promise<{
        lng: string;
        id: string;
    }>;
}

interface FormData {
    number: number;
    name: string;
    address: string;
    comment: string;
}

function CustomerEdit({ params }: PageProps) {
    const { lng, id } = use(params) as { lng: string; id: string };
    const { t } = useTranslation(lng, "customer");
    const router = useRouter();
    const isNew = id === "new";

    const [formData, setFormData] = useState<FormData>({
        number: 0,
        name: "",
        address: "",
        comment: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isNew) {
            // Charger les données du client existant
            fetch(`/api/customers/${id}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Erreur lors de la récupération du client");
                    return res.json();
                })
                .then((data) => {
                    setFormData({
                        number: data.number,
                        name: data.name,
                        address: data.address,
                        comment: data.comment || "",
                    });
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    }, [id, isNew]);

    const handleChange = (field: keyof FormData) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: field === "number" ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const url = isNew ? "/api/customers" : `/api/customers/${id}`;
            const method = isNew ? "POST" : "PUT";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la sauvegarde du client");
            }

            router.push(`/${lng}/customers`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <PageHeader
                    items={[{ label: t("title"), href: `/${lng}/customers` }]}
                    currentLabel={isNew ? t("new") : t("edit")}
                    title={isNew ? t("customerNew") : t("customerEdit")}
                    lng={lng}
                />
            </div>
            <form onSubmit={handleSubmit} className="bg-surface shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <InputField
                            label={t("number")}
                            name="number"
                            type="number"
                            value={formData.number.toString()}
                            onChange={handleChange("number")}
                            required
                        />
                        <InputField label={t("name")} name="name" type="text" value={formData.name} onChange={handleChange("name")} required />
                        <InputField label={t("address")} name="address" type="text" value={formData.address} onChange={handleChange("address")} required />
                        <TextAreaField label={t("comments")} name="comment" value={formData.comment} onChange={handleChange("comment")} />
                        {error && (
                            <div className="sm:col-span-6">
                                <p className="text-red-500">{error}</p>
                            </div>
                        )}
                        <div className="sm:col-span-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => router.push(`/${lng}/customers`)}
                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                {t("cancel")}
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                {loading ? t("saving") : t("save")}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CustomerEdit;
