import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  IP_CHECKED_COOKIE,
  IP_COUNTRY_COOKIE,
  IPINFO_API_TOKEN,
} from "../constants/constants";

interface IpInfoResponse {
  ip: string;
  asn: string;
  as_name: string;
  as_domain: string;
  country_code: string;
  country: string;
  continent_code: string;
  continent: string;
}

async function checkUserIpCountry(
  req: NextRequest,
  res: NextResponse = NextResponse.next()
) {
  const ipChecked = cookies().get(IP_CHECKED_COOKIE)?.value;
  if (ipChecked) {
    return res;
  }

  const forwarded = req.headers.get("x-forwarded-for");
  const ip = req.ip || (!!forwarded ? forwarded.split(",")[0].trim() : null);

  if (!!ip) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(
        `https://api.ipinfo.io/lite/${ip}?token=${IPINFO_API_TOKEN}`,
        {
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);

      const data = (await response.json()) as IpInfoResponse;

      // console.log(data);

      if (!!data.continent_code) {
        res.cookies.set(IP_COUNTRY_COOKIE, data.country_code, {
          sameSite: "lax",
        });
        return res;
      }
    } catch (error) {
      console.error("Failed to check IP country:", error);
    }
  }

  res.cookies.set(IP_COUNTRY_COOKIE, "IR", {
    sameSite: "lax",
  });
  return res;
}

export default checkUserIpCountry;
