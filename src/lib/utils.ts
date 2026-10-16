import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function publicAssetUrl(path: string) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) return path;

  const baseUrl = import.meta.env.BASE_URL;
  const relativePath = path.replace(/^\/+/, "");
  if (relativePath.startsWith(baseUrl.replace(/^\/+/, ""))) return `/${relativePath}`;

  return `${baseUrl}${relativePath}`;
}
