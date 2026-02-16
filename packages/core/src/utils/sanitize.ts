import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import { isServerSide } from "../constants/constants";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export default function sanitize(html: string) {
  if (isServerSide) {
    return purify.sanitize(html);
  }

  return DOMPurify.sanitize(html);
}
