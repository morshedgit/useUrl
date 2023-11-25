import Link from "next/link";

export default function Home({ searchParams: { shop } }: any) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Welcome
      <Link href={`/api/install?shop=${shop}`}>Sign In</Link>
    </main>
  );
}
