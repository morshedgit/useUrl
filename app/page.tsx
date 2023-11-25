import { NextPageContext } from "next";
import Link from "next/link";

export default async function Home(context: NextPageContext) {
  const shop = context.query.shop;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Welcome
      <Link href={`/api/install?shop${shop}`}>Sign In</Link>
    </main>
  );
}
