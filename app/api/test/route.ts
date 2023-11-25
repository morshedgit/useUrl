export async function GET(request: Request) {
  // Extract the code from the query parameters
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  console.log("Reached: ", code);

  // Ensure to include the protocol in the redirect URL
  const redirectUrl = new URL(`${url.protocol}//${url.host}`);
  redirectUrl.pathname = "/"; // if you have a specific path
  redirectUrl.searchParams.append("code", code || "null");
  return Response.redirect(redirectUrl.toString());
}
