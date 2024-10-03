import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { getApikeyUser, getIsPremium, getLimit, getTotalReq, getExpired, getCreatedAt } from "@/models/users.models"

const formatDate = (dateString: string | null): string => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}

export default function StatsProfile() {
    const { data: session } = useSession()
    const router = useRouter()
    const [profileData, setProfileData] = useState({
        apikey: null as string | null,
        requestTotal: 0,
        limit: 0,
        type: "",
        expirationDate: null as string | null,
        createdAt: null as string | null,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!session) {
            // Redirect to login if there is no session
            router.push('/auth/signin')
            return
        }

        const fetchData = async () => {
            if (session.user.email) {
                try {
                    const [apikey, requestTotal, limit, isPremium, expirationDate, createdAt] = await Promise.all([
                        getApikeyUser(session.user.email),
                        getTotalReq(session.user.email),
                        getLimit(session.user.email),
                        getIsPremium(session.user.email),
                        getExpired(session.user.email),
                        getCreatedAt(session.user.email)
                    ])

                    setProfileData({
                        apikey,
                        requestTotal: requestTotal || 0,
                        limit: limit || 0,
                        type: isPremium ? "Premium" : "Free",
                        expirationDate: expirationDate || null,
                        createdAt: createdAt || null
                    })
                } catch (err) {
                    window.location.reload()
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchData()
    }, [session, router])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="background rounded-xl w-full p-4 border border-a flex flex-col gap-4">
            <h5>Detail Profile</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {[
                    { label: 'Name', value: session?.user.name },
                    { label: 'Email', value: session?.user.email },
                    { label: 'Api Key', value: profileData.apikey },
                    { label: 'Request Total', value: profileData.requestTotal },
                    { label: 'Limit', value: profileData.limit },
                    { label: 'Type Account', value: profileData.type },
                    { label: 'Created At', value: formatDate(profileData.createdAt) },
                    { label: 'Expiration Date', value: formatDate(profileData.expirationDate) }
                ].map(({ label, value }) => (
                    <div key={label}>
                        <div className="font-light text-sm text-opacity-75 dark:text-white text-black">{label}</div>
                        <div className="break-words">{value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
