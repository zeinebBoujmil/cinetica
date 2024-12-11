import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard","/dashboard/discover","/dashboard/movies/popular","/dashboard/movies/now-playing","/dashboard/movies/top-rated","/dashboard/TVShows/popular","/dashboard/TVShows/top-rated","/dashboard/TVShows/on-the-air"];

export async function middleware(req: NextRequest) { 
  const url = req.nextUrl.clone(); 
  const sessionToken = await getToken({ req, secret: process.env.TMDB_API_KEY });

  //console.log("Session token:", sessionToken);
  //console.log("Requested URL:", req.nextUrl.pathname);

  // Si l'utilisateur n'est pas authentifié et accède à une route protégée
  if (!sessionToken && protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur est authentifié et tente d'accéder à /login
  if (sessionToken && req.nextUrl.pathname === "/login") {
    url.pathname = "/dashboard/discover";
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur non authentifié tente d'accéder à /
  if (!sessionToken && req.nextUrl.pathname === "/") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur authentifié accède à /
  if (sessionToken && req.nextUrl.pathname === "/") {
    url.pathname = "/dashboard/discover";
    return NextResponse.redirect(url);
  }

  // Par défaut, continue la requête
  return NextResponse.next();
}
