"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (

    <div className="navbar  bg-white text-[#3b75c2] flex items-center justify-between px-10 md:px-20 lg:px-35 shadow-sm">

      <div className="navbar-start flex justify-between">
        <div className="dropdown lg:ml-3 lg:hidden sm:mr-5">
          <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-transparent border-none hover:text-[#3b75c2] btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/appointments"}>All Appointment</Link>
            </li>

            <li>
              <Link href={"/doctors"}>Doctors</Link>
            </li>
            <li>
              <Link href={"/dashboard"}>Dashboard</Link>
            </li>
          </ul>
        </div>

        <Link href="/" className="hidden lg:flex">
          <Image src="/logo.png" height={40} width={250} alt="logo" priority />
        </Link>
      </div>

      <div className="lg:navbar-center hidden lg:flex">


        <ul className="flex gap-2 ml-2 ">
          <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/appointments"}>All Appointment</Link>
            </li>

            <li>
              <Link href={"/doctors"}>Doctors</Link>
            </li>
            <li>
              <Link href={"/dashboard"}>Dashboard</Link>
            </li>
        </ul>
      </div>

      <div className="sm:navbar-center lg:hidden">
        <Link href="/">
          <Image src="/logo.png" height={40} width={250} alt="logo" priority />
        </Link>
      </div>


      <div className="navbar-end flex items-center ">
        <ul className="flex items-center gap-3">
          {/* <li>
          <Link href={"/profile"}>Profile</Link>
        </li> */}

          {user ?
            <>
              <li>
                <Avatar>
                  <Link href={'/user'} className="cursor-pointer">
                    <Avatar.Image
                      referrerPolicy="no-referrer" alt="John Doe"
                      className="h-full w-full object-cover"
                      src={user?.image} />
                  </Link>
                  <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </li>
              <li>
                <Button size="sm" onClick={handleSignOut} variant="danger" className={"rounded-full "}>
                  Logout
                </Button>
              </li>
            </>
            :
            <>
              <li>
                <Link href={"/login"}>Login</Link>
              </li>
              <li>
                <Link href={"/signup"}>Sign Up</Link>
              </li>
            </>
          }
        </ul>



      </div>

    </div>

  );
};

export default Navbar;