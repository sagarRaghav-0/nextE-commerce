"use client";

import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
    return (
        <>
            <div className="flex px-5 md:px-10 my-5 items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-wide">
                    Ekamya
                </Link>

                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton
                            mode="modal"
                            forceRedirectUrl="/dashboard"
                        >
                            <button className="py-2 px-4 cursor-pointer bg-[var(--btn-color)] text-white font-bold hover:bg-lime-800 rounded-full">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                        <SignOutButton redirectUrl="/">
                            <button className="py-2 px-4 cursor-pointer bg-red-600 text-white font-bold hover:bg-red-700 rounded-full">
                                Sign Out
                            </button>
                        </SignOutButton>

                    </SignedIn>
                </div>
            </div>

            <hr className="my-2 border-gray-300" />
        </>
    );
};

export default Header;
