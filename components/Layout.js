import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import tw from "twin.macro";

import { useAuth } from "contexts/auth";
import { CartIcon } from "components/CartIcon";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div tw="w-full h-full grid grid-template-rows[100px 1fr 100px]">
        <header className="bg-yellow-200 text-black shadow-md">
          <Navbar />
        </header>
        <main tw="max-w-6xl m-auto w-full my-10">{children}</main>
        <div tw="bg-yellow-200 text-lg">
          <div tw="max-w-6xl m-auto flex items-center justify-end h-full">
            <a href="#">
              Made by <b>Gabriel Linassi</b>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav tw="h-full flex items-center justify-between max-w-6xl m-auto">
      <div className="text-2xl font-bold">
        <Link href="/">
          <a>Sample Checkout</a>
        </Link>
      </div>
      <ul className="flex items-center">
        <li className="mr-5">
          <CartIcon />
        </li>
        <li>
          {user ? (
            <div className="flex items-center">
              <div className="flex justify-center items-center p-5">
                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="block h-12 w-12 rounded-full overflow-hidden focus:outline-none"
                  >
                    <img className="h-full w-full object-cover" src={user.picture} alt="avatar" />
                  </button>
                  <div
                    className={`${
                      !open && "hidden"
                    } absolute left-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl`}
                  >
                    <NavLink path="/orders" title="My Orders" />
                    <NavLink path="/me" title="Profile" />
                    <NavLink path="/api/logout" title="Logout" />
                  </div>
                </div>
                <div className="ml-3">{user.nickname}</div>
              </div>
            </div>
          ) : (
            <Link href="/api/login">
              <a className="border border-blue-500 px-4 py-2 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white">
                Login
              </a>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

const NavLink = ({ path, title }) => (
  <Link href={path}>
    <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white">
      {title}
    </a>
  </Link>
);
