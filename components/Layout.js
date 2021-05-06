import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
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
        <header className="text-black bg-yellow-200 shadow-md">
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
  const router = useRouter();

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
              <div className="flex items-center justify-center p-5">
                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="block w-12 h-12 overflow-hidden rounded-full focus:outline-none"
                  >
                    <img className="object-cover w-full h-full" src={user.picture} alt="avatar" />
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
            <SampleButton
              onClick={() => {
                router.push(`/api/login?redirect-to=${router.asPath}`);
              }}
            >
              Login
            </SampleButton>
          )}
        </li>
      </ul>
    </nav>
  );
};

const SampleButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    tw="border border-blue-500 px-4 py-2 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white"
  >
    {children}
  </button>
);

const NavLink = ({ path, title }) => (
  <Link href={path}>
    <a className="block px-4 py-2 text-gray-900 transition-colors duration-200 rounded text-normal hover:bg-purple-500 hover:text-white">
      {title}
    </a>
  </Link>
);
