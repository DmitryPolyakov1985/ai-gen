"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/nav/mode-toggle";

const TopNav = () => {
  const { isSignedIn, user } = useUser();

  //   console.log("afs ", { isSignedIn, user });

  return (
    <nav className="flex justify-between items-center p-2 shadow">
      <Link href="/">
        <Image
          priority
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={50}
          className="cursor-pointer"
        />
      </Link>
      <div className="flex justify-end items-center gap-5">
        {isSignedIn && (
          <Link href={`/dashboard`}>{user.fullName}'s Dashboard</Link>
        )}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="ml-1">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
