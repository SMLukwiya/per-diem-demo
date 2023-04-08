import { Button } from "@/components/ui/button";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>luno</title>
        <meta name="description" content="luno" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-bl from-slate-950 via-slate-900 to-slate-950 min-h-screen relative">
        <nav className="sticky top-0 z-40 w-full border-b border-b-slate-200 transparent dark:border-b-slate-700">
          <div className="container flex h-16 px-4 sm:px-8 m-auto items-center justify-between">
            <div className="flex">
              <Link href="/" className="flex items-center cursor-pointer">
                <div className="cursor-pointer flex gap-2 items-center text-white">
                  <Image src="/logo.svg" alt="luno" width={22} height={22} />
                  <div className="font-bold">luno</div>
                </div>
              </Link>
            </div>
            <div className="flex gap-2">
              <Link href="/login"><Button variant="ghost">Login</Button></Link>
              <Link href="/login"><Button>Sign up</Button></Link>
            </div>
          </div>
        </nav>
        <main className="flex items-center justify-center text-center px-4 sm:px-8 ">
          <div className="flex max-w-[980px] mt-20 flex-col items-center justify-center text-center gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] text-white">
              A better way to [placeholder]
            </h1>
            <p className="max-w-[640px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
              Luno is ultimate tool for building minimum viable products at lightning speed.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Link href="/login"><Button size="lg">Get started</Button></Link>
            </div>
          </div>
        </main>
        <div className="max-w-5xl 2xl:max-w-7xl m-auto px-12 pt-12">
          <Image src="/screenshot-app.png" alt="luno Tech" width={2310} height={1118} className="rounded-t-3xl 2xl:rounded-3xl border border-slate-700 shadow-2xl shadow-slate-600" />
        </div>
      </div>
    </>
  );
};

export default Home;
