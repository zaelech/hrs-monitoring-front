import { PropsWithChildren } from "react";

type LoginLayoutProps = {
    children: React.ReactNode;
    params: { lng: string };
};

export default async function LoginLayout({ children, params }: LoginLayoutProps) {
    // Nous accédons à lng ici
    const { lng } = params;

    return <div className="min-h-screen">{children}</div>;
}
