import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RouteEnum } from './enum/route-enum';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateDynamicRoutePath = (
  route: RouteEnum,
  params: Record<string, string>,
): string => {
  let path = route as string;
  for (const key in params) {
    path = path.replace(`:${key}`, params[key]);
  }

  console.log(path);
  

  return path;
};

export function formatShortNumber(prestige: number): string {
  if (prestige >= 1_000_000) {
    return (prestige / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
  } else if (prestige >= 1_000) {
    return (prestige / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return prestige.toString();
}
