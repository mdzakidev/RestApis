import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    style: ['normal', 'italic'],
    display: 'swap',
});

interface LayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    title = "Zayden APIs",
    description = "Zayden APIs is a platform that provides APIs for developers to use in their projects.",
}) => {
    return (
        <div className={poppins.className}>
            <Head>
                <title>{title}</title>
                <meta name="robots" content="index,follow" />
                <meta property="og:title" content={`${title} - ${description}`} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={process.env.BASE_URL} />
                <meta property="og:type" content="website" />
                <meta name="keywords" content="zayden, zaydenapis, xyzen, api, restapis, xyzteams, xyz" />
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
        </div>
    );
};

export default Layout;
