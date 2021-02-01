import Head from "next/head";
import React from "react";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="max-w-4xl m-auto">{children}</main>
    </>
  );
}
