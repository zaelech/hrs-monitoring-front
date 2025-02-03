import { PropsWithChildren } from "react";

type LoginLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ lng: string }>;
};

export default async function LoginLayout({ children, params }: LoginLayoutProps) {
    // Nous accédons à lng ici
    const { lng } = await params;

    return <div className="min-h-screen">{children}</div>;
}
