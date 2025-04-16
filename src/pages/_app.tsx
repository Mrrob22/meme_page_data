import React from 'react';
import { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import '@/styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <CookiesProvider>
            <Component {...pageProps} />
        </CookiesProvider>
    );
};

export default MyApp;