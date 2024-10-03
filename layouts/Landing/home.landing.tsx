import Link from 'next/link';
import { ReactTyped } from 'react-typed';
import { signIn, useSession } from 'next-auth/react';
import ButtonUI from '@/components/ui/button';

export default function HomeLanding() {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen flex items-center justify-center flex-col px-4 bg-white home-landing" id="home">
            <div className="text-primary-500 text-4xl md:text-5xl font-semibold mb-4 text-center">
                <ReactTyped strings={["Welcome To RestApi", "Powered By Adrian"]} typeSpeed={100} backSpeed={50} loop />
            </div>
            <div className="text-gray-500 text-xl md:text-2xl font-medium max-w-3xl text-center mb-6">
                Zayden is a simple, easy to use, and powerful open-source project management tool.
            </div>
            <div className="flex space-x-4">
                {session?.user ? (
                    <Link href="/profile" passHref>
                        <ButtonUI variant="primary">
                            Profile
                        </ButtonUI>
                    </Link>
                ) : (
                    <ButtonUI variant="primary" onClick={() => signIn("google")}>
                        Sign In
                    </ButtonUI>
                )}
                <Link href="/dashboard" passHref>
                    <ButtonUI variant="outline">
                        Documentation
                    </ButtonUI>
                </Link>
            </div >
        </div >
    );
}
