export async function GET(request: Request) {
  // Extract the code from the query parameters
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  console.log("Reached");

  return Response.redirect(`/?${code}`);
}
