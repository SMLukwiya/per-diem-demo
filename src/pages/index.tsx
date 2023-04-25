import { Button } from "@/components/ui/button";
import { H1, H3 } from "@/components/ui/typography";
import { Menubar } from "@radix-ui/react-menubar";
import { type NextPage } from "next";
import { type CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken, getProviders, getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const signinUrl = "/api/auth/signin?callbackUrl=/app";

  return (
    <>
      <Head>
        <title>luno</title>
        <meta name="description" content="luno" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen bg-gradient-to-bl from-slate-950 via-slate-900 to-slate-950">
        <Menubar className="transparent sticky top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700">
          <div className="container m-auto flex h-16 items-center justify-between px-4 sm:px-8">
            <div className="flex">
              <Link href="/" className="flex cursor-pointer items-center">
                <div className="flex cursor-pointer items-center gap-2 text-white">
                  <Image src="/logo.svg" alt="luno" width={22} height={22} />
                  <div className="font-bold">Per Diem</div>
                </div>
              </Link>
            </div>
            <div className="flex gap-2">
              <Link href={signinUrl}>
                <Button variant="subtle">Start Trial</Button>
              </Link>
              <Link href={signinUrl}>
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href={signinUrl}>
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </Menubar>
        <main className="flex flex-col items-center justify-center px-4 text-center sm:px-8 ">
          <H1>Look Ma, No Commission</H1>
          <H3>
            Some apps charge up to a 30% commission for online orders. When you
            have your own app you can pay 0%. That’s right. Zero. Nada. Zilch.
          </H3>
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps(context: CtxOrReq) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/app" },
    };
  }
  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Home;
