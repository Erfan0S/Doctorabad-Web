import { NextRequest, NextResponse } from "next/server";
import checkUserIpCountry from "@repo/core/middlewares/checkUserIpCountry";
import { checkUserDivice } from "@repo/core/middlewares/checkUserDivice";
import { getCollectionMap } from "./lib/collectionCache";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Handle collection redirects first
  const match = pathname.match(/^\/dm\/cl\/(\d+)$/);
  if (match) {
    const id = match[1];
    const map = await getCollectionMap();
    const searchText = map[id];

    const url = req.nextUrl.clone();
    url.pathname = "/product-list/search";
    url.search = searchText ? `?search=${encodeURIComponent(searchText)}` : "";
    return NextResponse.redirect(url, 302);
  }

  // Run your existing middleware for everything else
  let res = NextResponse.next();
  res = await checkUserIpCountry(req, res);
  res = await checkUserDivice(req, res);

  return res;
}

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
// };
