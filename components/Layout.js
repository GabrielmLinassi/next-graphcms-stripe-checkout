import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-yellow-200 text-black shadow-md py-5">
        <nav className="max-w-4xl m-auto">
          <ul className="flex items-center justify-between">
            <li className="text-xl font-bold">
              <Link href="/">
                <a>Sample Checkout</a>
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <a>Cart</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="max-w-4xl m-auto">{children}</main>
    </>
  );
}
