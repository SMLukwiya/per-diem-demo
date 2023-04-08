import { Button } from "@/components/ui/button";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { useState } from "react";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    if (isSubmitting) return;
    event.preventDefault();

    setIsSubmitting(true);

    signIn("credentials", { email, password, callbackUrl: "/app" }).catch(
      console.error
    );

    setIsSubmitting(true);
    return true;
  };

  return (
    <>
      <Head>
        <title>luno</title>
        <meta name="description" content="luno" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <nav className="transparent sticky top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700">
          <div className="container m-auto flex h-16 items-center justify-between px-4 sm:px-8">
            <div className="flex">
              <Link href="/" className="flex cursor-pointer items-center">
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src="/logo.svg"
                    alt="luno Tech"
                    width={22}
                    height={22}
                  />
                  <div className="font-bold">luno</div>
                </div>
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex items-center justify-center px-4 text-center sm:px-8 ">
          <div className="mt-20 flex max-w-[980px] flex-col items-center justify-center gap-2 text-center">
            <h1 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl lg:text-4xl lg:leading-[1.1]">
              Login to luno
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mt-4 flex flex-col items-center justify-center gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <div className="w-full">
                  <Button className="w-full" type="submit">
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
