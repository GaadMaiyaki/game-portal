import { promises as fs } from 'fs';
import path from 'path';

import { UserData, UserDataWithoutPassword } from '@game-portal/types';
import { SESSION_KEYS } from '@game-portal/constants';
import { z } from 'zod';

import { handleApiResponse } from '@/lib/utils/http-util';
import { createSession, getSession } from '@/lib/helpers/session';
import { profileSchema } from '@/lib/schemas/profile';

export async function PUT(req: Request) {
  try {
    const session = await getSession<UserDataWithoutPassword>(
      SESSION_KEYS.USER_SESSION
    );

    if (!session) {
      return handleApiResponse(401, { error: 'Authorized access' });
    }

    const body = await req.json();

    await profileSchema.parseAsync(body);

    const filePath = path.join(process.cwd(), 'src/data/users.json');

    const userFileData = await fs.readFile(filePath, 'utf-8');

    const registeredUsers = JSON.parse(userFileData) as UserData[];

    const updatedUsers = registeredUsers.map((registeredUser) =>
      registeredUser.username === session.username
        ? { ...registeredUser, ...body }
        : registeredUser
    );

    await fs.writeFile(filePath, JSON.stringify(updatedUsers, null, 2));

    const newSessionPayload = { ...session, ...body };

    await createSession(newSessionPayload, SESSION_KEYS.USER_SESSION);

    return handleApiResponse(200, newSessionPayload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleApiResponse(400, {
        error: error.errors.map((e) => e.message)?.[0],
      });
    }

    return handleApiResponse(500, { error: 'An error occured' });
  }
}
