import Layout from "@/components/layouts";
import ProfileLayouts from "@/layouts/Profile/index.profile";
import { getUser } from "@/models/users.models";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface User {
    id: string;
    uuid: string;
    displayName: string;
    email: string;
    picture: string;
    apikey: string;
    limit: number;
    isAdmins: boolean;
    isPremium: boolean;
    totalreq: number;
}

export default function Profile() {
    const { data: session } = useSession();
    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (session?.user?.email) {
                const userData = await getUser(session.user.email);
                setData(userData as User | null);
            }
        }
        fetchData();
    }, [session?.user?.email]); // Use email as dependency

    return (
        <Layout title="Zayden APIs | Profile">
            <ProfileLayouts />
        </Layout>
    );
}
