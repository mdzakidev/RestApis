import { getApikeyWithEmail, changeApikey, checkPremiumUser } from '@/models/users.models';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function EditsProfile() {
    const { data: session, status } = useSession();
    const [apikey, setApikey] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        const fetchApikey = async () => {
            if (status === 'authenticated' && session?.user?.email) {
                try {
                    const apiKey = await getApikeyWithEmail(session.user.email);
                    setApikey(apiKey);
                } catch (error) {
                    console.error('Failed to fetch API key:', error);
                }
            }
        };
        fetchApikey();
    }, [session, status]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApikey(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (status === 'authenticated' && session?.user?.email) {
            try {
                if (await checkPremiumUser(session.user.email)) {
                    const success = await changeApikey(session.user.email, apikey);
                    if (success) {
                        setIsEditing(false);
                    } else {
                        console.error('Failed to update API key');
                    }
                } else {
                    console.error('User is not a premium user');
                }
            } catch (error) {
                console.error('Failed to update API key:', error);
            }
        }
    };

    return (
        <div className="background rounded-xl w-full p-4 border border-a flex flex-col gap-4">
            <h5>Edit Profile</h5>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <label htmlFor="apikey" className="flex flex-col gap-2 w-full">
                        <span className="text-sm">API Key</span>
                        <input
                            type="text"
                            name="apikey"
                            id="apikey"
                            value={apikey}
                            onChange={handleChange}
                            className="text-sm bg-transparent border-a rounded-xl !ring-0"
                            disabled={!isEditing}
                        />
                    </label>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <label htmlFor="apikey" className="flex flex-col gap-2 w-full">
                        <span className="text-sm">API Key</span>
                        <input
                            type="text"
                            name="apikey"
                            id="apikey"
                            value={apikey}
                            onChange={handleChange}
                            className="text-sm bg-transparent border-a rounded-xl !ring-0"
                            disabled={!isEditing}
                        />
                    </label>
                </div>

                <div className="flex justify-end w-full mt-4">
                    <button
                        type="submit"
                        className="rounded-xl w-fit h-fit px-4 py-2 border border-a capitalize text-base !text-sm bg-primary-500 text-white !px-8"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
