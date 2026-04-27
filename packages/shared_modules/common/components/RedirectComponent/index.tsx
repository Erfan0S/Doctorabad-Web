import { redirect } from "next/navigation";

export default function RedirectComponent({ url }: { url: string }) {
  redirect(url);
  return null;
}
