import { Head } from '@inertiajs/react';

const pages = [
    {
        name: '',
        href: '',
        icon: ''
    }
];

export default function DashboardProvider({ user }) {
    console.log(user);

    return (
        <>
            <Head title="Mon tableau de bord" />
            Tableau de bord (provider).
        </>
    );
}
