import { useSession } from "next-auth/react";
import type { ReactNode } from "react";
import { useEffect } from "react";

export default function Shell(props: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    // TODO: make session work (session cookie exists but session is empty)
    // if (!loading && !session) window.location.href = "/";
  }, [loading, session]);

  if (!session) {
    return <div></div>;
  }

  return (
    <>
      <div>
        <main className="mb-12">{props.children}</main>
      </div>
    </>
  );
}