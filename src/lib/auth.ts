export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export function setAuth(token: string, role: string) {
  document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
  document.cookie = `role=${role}; path=/; max-age=604800; SameSite=Lax`;
}

export function clearAuth() {
  document.cookie = 'token=; path=/; max-age=0';
  document.cookie = 'role=; path=/; max-age=0';
}

export function getToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='));
  return match ? match.split('=')[1] : null;
}

export function getRole(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('role='));
  return match ? match.split('=')[1] : null;
}

export function getAuthHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
