import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function checkCookie() {
  const cookieStore = await cookies();

  const nextAuthToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!nextAuthToken) {
    console.log("No NextAuth cookie found");
    return null;
  }

  const decodedToken = await decode({
    token: nextAuthToken,
    secret: process.env.NEXTAUTH_SECRET || "",
  });

  // console.log("decodedToken:", decodedToken);

  return decodedToken?.accessToken;
}
