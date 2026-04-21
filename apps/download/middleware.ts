import { NextRequest, NextResponse } from "next/server";
import checkUserIpCountry from "@repo/core/middlewares/checkUserIpCountry";
import { checkUserDivice } from "@repo/core/middlewares/checkUserDivice";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();
  res = await checkUserIpCountry(req, res);
  res = await checkUserDivice(req, res);

  return res;
}
