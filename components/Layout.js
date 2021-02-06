import { useAuth } from "contexts/auth";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { CartIcon } from "./CartIcon";
import Image from "next/image";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-yellow-200 text-black shadow-md py-5">
        <Navbar />
      </header>
      <main className="max-w-4xl m-auto mt-10">{children}</main>
    </>
  );
}

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between max-w-4xl m-auto">
      <div className="text-2xl font-bold">
        <Link href="/">
          <a>Sample Checkout</a>
        </Link>
      </div>
      <ul className="flex items-center">
        <li className="mr-5">
          {user ? (
            <div className="flex items-center">
              <div class="flex justify-center items-center p-5">
                <div class="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    class="block h-12 w-12 rounded-full overflow-hidden focus:outline-none"
                  >
                    <img
                      class="h-full w-full object-cover"
                      src={user.picture}
                      alt="avatar"
                    />
                  </button>
                  <div
                    class={`${
                      !open && "hidden"
                    } absolute left-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl`}
                  >
                    <Link href="/api/logout">
                      <a class="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white">
                        Logout
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="ml-3">Gabriel</div>
              </div>
            </div>
          ) : (
            <Link href="/api/login">
              <a className="border border-blue-500 px-4 py-2 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white  mr-5">
                Login
              </a>
            </Link>
          )}
        </li>
        <li>
          <CartIcon />
        </li>
      </ul>
    </nav>
  );
};
