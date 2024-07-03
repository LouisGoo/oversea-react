import styles from "@/styles/Home.module.css";
import { Button } from "antd";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const router = useRouter();
  // router.push('/login');
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Image src={"/ustc3.jpg"} alt="" width={800} height={450}/>
      </main>
    </>
  );
}
