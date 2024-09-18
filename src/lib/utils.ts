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
  return path;
};
