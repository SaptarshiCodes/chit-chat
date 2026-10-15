import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";

async function DesktopNavbar() {
  const user = await currentUser();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button variant="ghost" className="flex items-center gap-2" nativeButton={false} render={<Link href="/" />}>
        <HomeIcon className="size-4.5" />
        <span className="hidden lg:inline">Home</span>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" nativeButton={false} render={<Link href="/notifications" />}>
            <BellIcon className="size-4.5" />
            <span className="hidden lg:inline">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            nativeButton={false}
            render={
              <Link
                href={`/profile/${
                  user.username ??
                  user.emailAddresses[0].emailAddress.split("@")[0]
                }`}
              />
            }
          >
            <UserIcon className="size-4.5" />
            <span className="hidden lg:inline">Profile</span>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}
export default DesktopNavbar;

