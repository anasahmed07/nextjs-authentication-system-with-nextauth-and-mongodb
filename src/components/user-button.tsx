import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

const UserButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="h-10 w-10 m-10 rounded-full float-right"/>;
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();
  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/")
  }
  return (
    <nav>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none relative float-right m-10">
            <div className="flex gap-4 items-center">
              <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarImage
                  className="size-10 hover:opacity-75 transition"
                  src={session.user?.image || undefined}
                />
                <AvatarFallback className="bg-sky-900 text-white">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="bottom" className="w-50">
            <DropdownMenuItem className="h-10" onClick={() => handleSignOut()}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none relative float-right m-6">
            <CircleUserRound className="h-10 w-10"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="bottom" className="w-50">
            <Link href="sign-in"><DropdownMenuItem className="h-10">Sign in</DropdownMenuItem></Link>
            <Link href="sign-up"><DropdownMenuItem className="h-10">Sign up</DropdownMenuItem></Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default UserButton;
