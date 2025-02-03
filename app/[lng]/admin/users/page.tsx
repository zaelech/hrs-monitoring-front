"use client";
import UsersClient from "./UsersClient";

interface PageProps {
    params: Promise<{
        lng: string;
    }>;
}

async function UsersPage({ params }: PageProps) {
    const { lng } = await params;
    return <UsersClient lng={lng} />;
}

export default UsersPage;
