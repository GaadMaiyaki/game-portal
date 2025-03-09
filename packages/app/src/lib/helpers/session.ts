import { cookies } from 'next/headers';

export const createSession = async (
  userSession: Record<string, unknown>,
  sessionKey: string
) => {
  const cookieStore = await cookies();

  const expires = new Date();
  expires.setDate(expires.getDate() + 3);

  cookieStore.set(sessionKey, JSON.stringify(userSession), {
    httpOnly: true,
    secure: true,
    expires,
    path: '/',
  });
};

export const getSession = async <T>(
  sessionKey: string
): Promise<T | undefined> => {
  const cookieStore = await cookies();
  const session = cookieStore.get(sessionKey);
  return session ? (JSON.parse(session.value || '{}') as T) : undefined;
};

export const removeSession = async (sessionKey: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(sessionKey);
};
