import Link from "next/link";

export default function Custom404() {
    return (
        <div className="min-h-screen flex items-center justify-center text-center flex-col">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <Link href={"/"} className="underline mt-4" onClick={() => window.history.back()}>Back to Home</Link>
        </div>
    )
}