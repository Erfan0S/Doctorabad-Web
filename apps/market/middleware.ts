import { NextRequest, NextResponse } from "next/server";
import checkUserIpCountry from "@repo/core/middlewares/checkUserIpCountry";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();
  res = await checkUserIpCountry(req, res);

  return res;
}
