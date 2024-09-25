import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RouteEnum } from './enum/route-enum';
import { RawUserEntity, UserEntity } from './model/entity/user/user.entity';
import Compressor from 'compressorjs';
import { MAX_IMAGE_SIZE } from './constant/constant';

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

  // console.log(path);

  return path;
};

export function formatShortNumber(prestige: number): string {
  if (prestige >= 1_000_000) {
    return (prestige / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
  } else if (prestige >= 1_000) {
    return (prestige / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return prestige.toString();
}

export async function convertImageURLToUint8Array(
  imageUrl: string,
): Promise<Uint8Array> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const arrayBuffer = await blob.arrayBuffer();

  const uint8Array = new Uint8Array(arrayBuffer);

  return uint8Array;
}

export async function convertFileToUint8Array(file: File | undefined) {
  if (!file) return new Uint8Array();

  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

export async function convertImageURLToBlob(imageUrl: string): Promise<Blob> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  return blob;
}

export function convertUint8ArrayToImageURL(uint8Array: Uint8Array | number[]) {
  let url = '';

  if (uint8Array instanceof Uint8Array) {
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });

    url = URL.createObjectURL(blob);
  }
  return url;
}

export async function validateFile(file: File) {
  if (!file || !file.type.startsWith('image/') || file.size > MAX_IMAGE_SIZE) {
    return false;
  }
  return true;
}

export async function validateImageURL(imageUrl: string) {
  try {
    const blob = await convertImageURLToBlob(imageUrl);

    if (
      !blob ||
      !blob.type.startsWith('image/') ||
      blob.size > MAX_IMAGE_SIZE
    ) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

export async function compressImageURLToUint8Array(
  imageUrl: string,
): Promise<Uint8Array | null> {
  try {
    const blob = await convertImageURLToBlob(imageUrl);

    if (!blob || blob.type.indexOf('image/') === -1) {
      console.error('Provided URL is not an image: ', imageUrl);
      return null;
    }

    const compressedBlob: Blob = await new Promise((resolve, reject) => {
      new Compressor(blob, {
        quality: 0.9,
        maxWidth: 1920,
        maxHeight: 1080,
        mimeType: 'image/jpeg',
        success(result) {
          resolve(result);
        },
        error(error) {
          reject(error);
        },
      });
    });

    const arrayBuffer = await compressedBlob.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error('Error in compressing image: ', error);
    return null;
  }
}
