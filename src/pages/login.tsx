import { Button } from "@/components/ui/button";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Input } from "@/components/ui/input"
import { useState } from "react";

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      signIn('credentials', { email, password, callbackUrl: '/app' });
    } catch (error) {
      console.error(error);
    }

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
        <nav className="sticky top-0 z-40 w-full border-b border-b-slate-200 transparent dark:border-b-slate-700">
          <div className="container flex h-16 px-4 sm:px-8 m-auto items-center justify-between">
            <div className="flex">
              <Link href="/" className="flex items-center cursor-pointer">
                <div className="cursor-pointer flex gap-2 items-center">
                  <Image src="/logo.svg" alt="luno Tech" width={22} height={22} />
                  <div className="font-bold">luno</div>
                </div>
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex items-center justify-center text-center px-4 sm:px-8 ">
          <div className="flex max-w-[980px] mt-20 flex-col items-center justify-center text-center gap-2">
            <h1 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl lg:text-4xl lg:leading-[1.1]">
              Login to luno
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center gap-2 mt-4">
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <div className="w-full">
                  <Button className="w-full" type="submit">Login</Button>
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
