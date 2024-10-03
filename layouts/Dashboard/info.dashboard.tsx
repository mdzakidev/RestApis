import { useEffect, useState } from "react";
import { HiEye, HiUsers, HiRefresh, HiClock } from "react-icons/hi";
import { stats } from "@/models/server.models";
import { getTotalUsers } from "@/models/users.models";

interface DashboardItem {
    icon: JSX.Element;
    label: string;
    value: number;
}

export default function DashboardInfo() {
    const [data, setData] = useState<DashboardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ress = await stats();
                const totalUsers = await getTotalUsers();

                setData([
                    {
                        icon: <HiEye size={24} className="text-primary-500" />,
                        label: "Visitor",
                        value: ress[0].visitors,
                    },
                    {
                        icon: <HiUsers size={24} className="text-primary-500" />,
                        label: "Users",
                        value: totalUsers,
                    },
                    {
                        icon: <HiRefresh size={24} className="text-primary-500" />,
                        label: "Total Requests",
                        value: ress[0].requests,
                    },
                    {
                        icon: <HiClock size={24} className="text-primary-500" />,
                        label: "Requests Today",
                        value: 10442,
                    },
                ]);
            } catch (error) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {data.map((item, index) => (
                <div key={index} className="background rounded-xl w-full p-4 border border-a flex items-center gap-4">
                    <div className="p-2 bg-transparent text-primary rounded-xl">{item.icon}</div>
                    <div>
                        <div className="text-black !text-opacity-60 dark:text-white text-sm font-medium">{item.label}</div>
                        <div className="text-black dark:text-white text-xl">{item.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
