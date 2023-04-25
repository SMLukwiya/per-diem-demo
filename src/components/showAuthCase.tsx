import { type Session } from "next-auth/core/types";
import { signIn, signOut } from "next-auth/react";
import { P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export default function AuthShowcase({
  sessionData,
}: {
  sessionData: Session;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-b-slate-400 px-4 py-2">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 rounded-full">
          <Avatar>
            <AvatarImage
              src={sessionData?.user.image || ""}
              className="h-12 w-12 rounded-full"
              alt="profile pic"
            />
          </Avatar>
        </div>
        <P>{sessionData?.user.name}</P>
      </div>
      <Button
        className="rounded-full bg-white/10 px-10 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={
          sessionData
            ? () => void signOut({ callbackUrl: "/" })
            : () => void signIn()
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
}
