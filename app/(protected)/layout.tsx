import { ReviewModalComponent } from "@/components/review-modal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  //   DialogDescription,
  //   DialogFooter,
  //   DialogHeader,
  //   DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/signin");

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <Link href="/">
          <Image src="/logo.png" width={24} height={24} alt="home" />
        </Link>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="font-bold">Add A Review</Button>
            </DialogTrigger>
            <ReviewModalComponent />
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={session.user?.image ?? undefined}
                  alt={session.user?.name ?? undefined}
                />
                <AvatarFallback>{session.user?.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {children}
    </>
  );
}
