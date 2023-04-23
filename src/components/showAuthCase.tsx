import { type Session } from "next-auth/core/types";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

export default function AuthShowcase({
  sessionData,
}: {
  sessionData: Session;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-b-slate-400 px-4 py-2">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 rounded-full">
          <Image
            src={sessionData?.user.image || ""}
            className="h-12 w-12 rounded-full"
            alt="profile pic"
            fill
          />
        </div>
        <p>{sessionData?.user.name}</p>
      </div>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
