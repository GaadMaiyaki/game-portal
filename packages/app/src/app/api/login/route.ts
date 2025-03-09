import { promises as fs } from 'fs';
import path from 'path';

import { z } from 'zod';
import { UserData } from '@game-portal/types';
import { SESSION_KEYS } from '@game-portal/constants';

import { LoginDataProps, loginSchema } from '@/lib/schemas/login';
import { handleApiResponse } from '@/lib/utils/http-util';
import { createSession } from '@/lib/helpers/session';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginDataProps;

    await loginSchema.parseAsync(body);

    const filePath = path.join(process.cwd(), 'src/data/users.json');

    const userFileData = await fs.readFile(filePath, 'utf-8');

    const registeredUsers = JSON.parse(userFileData) as UserData[];

    const user = registeredUsers.find(
      ({ username, password }) =>
        username === body.username && password === body.password
    );

    if (!user) {
      return handleApiResponse(401, { error: 'Invalid username, or password' });
    }

    const userDataResponse = { ...user, password: undefined };

    await createSession(userDataResponse, SESSION_KEYS.USER_SESSION);

    return handleApiResponse(200, userDataResponse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleApiResponse(400, {
        error: error.errors.map((e) => e.message)?.[0],
      });
    }
    return handleApiResponse(500, { error: 'An error occured' });
  }
}
