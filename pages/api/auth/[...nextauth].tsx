import NextAuth, { Account, Profile, User } from 'next-auth';
import Google from 'next-auth/providers/google';
import { checkUsers } from '@/models/users.models'; // Adjust the import path
import { createUser } from '@/models/users.models'; // Adjust the import path
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV !== "production",
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    redirect_uri: process.env.BASE_URL + '/api/auth/callback/google',
                },
            },
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            return `${baseUrl}/profile`;
        },
        async signIn(params: { user: User | AdapterUser; account: Account | null; profile?: Profile }) {
            const { user, account, profile } = params;
            if (user && profile) {
                const userExists = await checkUsers(user.id || profile.email || '');
                if (!userExists) {
                    await createUser(profile);
                }
            }
            if (account && account.provider === 'google' && !!profile?.email) {
                return true;
            } else {
                return false;
            }
        },
        async jwt(params: { token: JWT; user: User | AdapterUser; account: Account | null; profile?: Profile; isNewUser?: boolean }) {
            const { token, user } = params;
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.avatar = user.image ?? '';
            }
            return token;
        },
        async session(params: { session: any; token: any; user: any; newSession: any; trigger: any }) {
            const { session, token } = params;
            session.user = token;
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    }
});
