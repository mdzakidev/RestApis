import { useEffect, useState } from "react";
import { stats } from "@/models/server.models";
import { getTotalUsers } from "@/models/users.models";

interface DataItem {
    amount: number;
    name: string;
}

function formatNumber(value: number): string {
    if (value >= 1e9) {
        return (value / 1e9).toFixed(1).replace(/\.0$/, '') + 'B+';
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M+';
    } else if (value >= 1e3) {
        return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K+';
    }
    return value.toString();
}

async function fetchData(): Promise<DataItem[]> {
    try {
        const statsData = await stats();
        const totalUsers = await getTotalUsers();

        return [
            { name: "Requests", amount: statsData[0].requests },
            { name: "Visitors", amount: statsData[0].visitors },
            { name: "Features", amount: statsData[0].features },
            { name: "Users", amount: totalUsers }
        ];
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}

export default function AboutLanding() {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchData();
                setData(data);
            } catch (err) {
                setError(err as string);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex items-center justify-center flex-col" id="about">
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                {data.length ? (
                    data.map((item) => (
                        <div
                            className="p-8 bg-white text-primary-500 rounded-xl flex flex-col items-center"
                            key={item.name}
                        >
                            <div className="text-6xl font-semibold">{formatNumber(item.amount)}</div>
                            <p>{item.name}</p>
                        </div>
                    ))
                ) : (
                    <div>No data available</div>
                )}
            </div>
            <div className="flex flex-col gap-4 basis-2/3 justify-between mt-4">
                <div className="flex flex-col gap-4 text-center md:text-left">
                    <h1 className="font-semibold text-primary-500 text-[1.875rem]">What is the RestApi website?</h1>
                    <p className="text-black text-base md:text-xl">
                        This is a website dedicated to RESTful APIs, designed not only as a platform to practice and enhance my knowledge but also to provide valuable resources and tools for others who are learning or working with APIs.
                    </p>
                </div>
                <div className="flex flex-col gap-4 text-center md:text-right">
                    <h1 className="font-semibold text-primary-500 text-[1.875rem]">What is the use of this website?</h1>
                    <p className="text-black text-base md:text-xl">
                        This website is designed to make downloading programs or data simpler and more efficient. It serves as a user-friendly platform where you can easily access and retrieve the files you need, streamlining the process and saving you time.
                    </p>
                </div>
            </div>
        </div>
    );
}
