import { NextRequest, NextResponse, userAgent } from "next/server";
import { VIEWPORT_HEADER } from "../constants/constants";

export async function checkUserDivice(
  req: NextRequest,
  res: NextResponse = NextResponse.next(),
) {
  const { device } = userAgent(req);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  // Clone headers and add our custom viewport header
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(VIEWPORT_HEADER, viewport);

  // Pass these headers to the response
  res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return res;
}
