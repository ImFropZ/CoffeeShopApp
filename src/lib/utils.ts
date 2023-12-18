import { appWindow } from "@tauri-apps/api/window";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function toggleFullscreen() {
  const isFullscreen = await appWindow.isFullscreen();
  if (!isFullscreen) {
    appWindow.setFullscreen(true);
  } else {
    appWindow.setFullscreen(false);
  }
}

export async function addToLocalStorage<T>(key: string, items: T) {
  localStorage.setItem(key, JSON.stringify(items));
}

export async function getFromLocalStorage<T>(key: string) {
  const value = localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value) as T;
}
