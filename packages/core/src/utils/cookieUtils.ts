import Cookies from "js-cookie";

export const getServerSideCookie = async (key: string) => {
  try {
    const { cookies } = await import("next/headers");
    return cookies().get(key)?.value;
  } catch (error) {
    return undefined;
  }
};

export const appendNextRequestCookies = async () => {
  try {
    const { cookies } = await import("next/headers");

    return cookies()
      .getAll()
      .reduce((prev, current) => {
        const { name, value } = current;
        return prev + `${name}=${value};`;
      }, "");
  } catch (error) {
    return "";
  }
};

export const getClientSideCookie = (key: string) => {
  return Cookies.get(key);
};

export const setClientCookie = (
  key: string,
  value: string,
  options?: Cookies.CookieAttributes
) => {
  Cookies?.set(key, value, options);
};
