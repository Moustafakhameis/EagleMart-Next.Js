// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export default async function middleWare(req: NextRequest) {
//   const JWT = await getToken({ req });
//   const { accessToken } = JWT ?? {};

//   if (accessToken) {
//     return NextResponse.next();
//   }

//   return NextResponse.redirect(`${process.env.MY_DOMAIN}/login`);
// }

// export const config = {
//   matcher: ["/cart", "/wishlist"],
// };










import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const JWT = await getToken({ req });
  const { accessToken } = JWT ?? {};

  const { pathname } = req.nextUrl;


  const authPages = ["/login", "/register"];

  if (accessToken) {

    if (authPages.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }


  if (pathname.startsWith("/cart") || pathname.startsWith("/wishlist" )) {
    return NextResponse.redirect(`${process.env.MY_DOMAIN}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart:path*", "/wishlist", "/login", "/register"],
};
