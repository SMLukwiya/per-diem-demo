import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { P, H3, H2 } from "@/components/ui/typography";
import { Menubar } from "@radix-ui/react-menubar";

import { api } from "@/utils/api";
import AuthShowcase from "@/components/showAuthCase";
import { type ChangeEvent, useState } from "react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: restaurant, isLoading: isFetching } = useGetAllUserRestaurants(
    sessionData?.user.id
  );
  const { mutate, isLoading: isCreating } = useCreateRestaurant(
    sessionData?.user.id
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!sessionData || !sessionData.user) return <h1>Loading...</h1>;

  if (isFetching) return <h1>Loading...</h1>;

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { title, description };
    mutate({ data, userId: sessionData?.user.id || "" });
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menubar>
        <AuthShowcase sessionData={sessionData} />
      </Menubar>

      <main className="justify-centerbg-gradient-to-b flex min-h-screen flex-col items-center">
        {restaurant ? (
          <div className="w-1/2">
            <H3>My Store</H3>
            <H2>{restaurant.title}</H2>
            <P>{restaurant.description}</P>
            <P>More details...</P>
            <Link
              href={{
                pathname: "/app/menu",
                query: { restaurantId: restaurant.id },
              }}
            >
              <Button className="rounded-full bg-white/10 px-10 py-2 text-center">
                Create Menu
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <H3>Create your shop and start earning</H3>

            <form className="w-1/2" onSubmit={handleSubmit}>
              <div>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="shop name"
                  className="my-2 w-full p-2 text-black outline-none"
                />
              </div>
              <div>
                <Textarea
                  rows={10}
                  placeholder="Enter you restaurant description."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="my-2 w-full p-2 text-white outline-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isCreating}
                className="rounded-full bg-white/10 px-10 text-center font-semibold text-white no-underline transition hover:bg-white/20"
              >
                Create
              </Button>
            </form>
          </>
        )}
      </main>
    </>
  );
};

export default Home;

function useGetAllUserRestaurants(userId?: string | "") {
  return api.restaurant.show.useQuery({
    userId: userId || "",
  });
}

function useCreateRestaurant(userId?: string) {
  const utils = api.useContext();

  return api.restaurant.create.useMutation({
    onSuccess: async () => {
      await utils.restaurant.show.invalidate({ userId: userId || "" });
    },
  });
}
