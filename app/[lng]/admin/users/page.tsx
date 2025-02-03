import UsersClient from './UsersClient';

export default function UsersPage({
    params,
}: {
    params: { lng: string };
}) {
    return <UsersClient lng={params.lng} />;
}