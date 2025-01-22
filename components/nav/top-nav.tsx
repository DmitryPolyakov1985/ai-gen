"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

const TopNav = () => {
  const { isSignedIn, user } = useUser();

  console.log("afs ", { isSignedIn, user });

  return (
    <nav className="flex justify-between items-center p-2 shadow">
      <Link href={`/`}>AI</Link>
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
      </div>
    </nav>
  );
};

export default TopNav;
