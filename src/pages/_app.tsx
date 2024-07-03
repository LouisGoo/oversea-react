import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Login from "./login";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // if(!localStorage.getItem('user')){
  //   router.push('/login');
  // }

  return router.pathname === '/login'?(<Component {...pageProps} />):(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
