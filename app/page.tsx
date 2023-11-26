import { fetchGraphQL } from "@/lib/services/graphql";
import Link from "next/link";
import { readTokenFromFile } from "@/lib/services/fileService";

const gql = String.raw;

const getProducts = async (shop: string) => {
  try{
    const query = gql`
      query getProductsAndVariants {
        products(first: 5) {
          edges {
            cursor
            node {
              id
              title
              description
              handle
              variants(first: 3) {
                edges {
                  cursor
                  node {
                    id
                    title
                    price
                  }
                }
              }
              images(first: 1) {
                edges {
                  node {
                    transformedSrc
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `;
  
    const products = await fetchGraphQL(shop, query);
  
    return products;

  }catch(e:any){
    console.log(e.message)
    return []

  }
};

export default async function Home({ searchParams: { shop } }: any) {

  const token = await readTokenFromFile()

  const products = getProducts(shop);
  console.log(products);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Welcome
      <p>Access Token: {token}</p>
      <Link href={`/api/install?shop=${shop}`}>Sign In</Link>
    </main>
  );
}
