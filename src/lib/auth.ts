import type { User } from '@/types/auth';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const COOKIE_MAX_AGE = 604800;
export const AUTH_CHANGED_EVENT = 'auth-changed';

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${name}=`;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(prefix));
  return match ? decodeURIComponent(match.slice(prefix.length)) : null;
}

function notifyAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  }
}

export function setAuth(token: string, user: Pick<User, 'role' | 'nombre' | 'email'>) {
  setCookie('token', token);
  setCookie('role', user.role);
  setCookie('userName', user.nombre);
  setCookie('userEmail', user.email);
  notifyAuthChange();
}

export function clearAuth() {
  ['token', 'role', 'userName', 'userEmail'].forEach((name) => {
    document.cookie = `${name}=; path=/; max-age=0`;
  });
  notifyAuthChange();
}

export function getToken(): string | null {
  return getCookie('token');
}

export function getRole(): string | null {
  return getCookie('role');
}

export function getUserName(): string | null {
  return getCookie('userName');
}

export function getUserEmail(): string | null {
  return getCookie('userEmail');
}

export function getStoredUser(): { nombre: string; email: string; role: string } | null {
  const role = getRole();
  const nombre = getUserName();
  const email = getUserEmail();
  if (!role || !nombre) return null;
  return { nombre, email: email || '', role };
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function getAuthHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function subscribeAuthChange(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(AUTH_CHANGED_EVENT, callback);
  return () => window.removeEventListener(AUTH_CHANGED_EVENT, callback);
}
