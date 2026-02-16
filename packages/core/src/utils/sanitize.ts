import DOMPurify, { clearWindow } from "isomorphic-dompurify";

export default function sanitize(html: string) {
  return DOMPurify.sanitize(html);
}
