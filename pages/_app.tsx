import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app';
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider attribute="class">
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ThemeProvider>

    );
}

export default MyApp;
