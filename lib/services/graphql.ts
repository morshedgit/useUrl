const graphqlEndpoint = (shop: string) =>
  `https://${shop}.myshopify.com/admin/api/2023-10/graphql.json`;
interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export async function fetchGraphQL<T = any>(
  shop: string,
  query: string,
  variables: Record<string, any> = {}
): Promise<GraphQLResponse<T>> {
  const response = await fetch(graphqlEndpoint(shop), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add other headers as needed (e.g., for authentication)
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
