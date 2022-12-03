import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import RootLayout from "../components/layouts/root-layout";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to onvu!</title>
      </Head>
      <main className="app">
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </main>
    </>
  );
}

export default CustomApp;
