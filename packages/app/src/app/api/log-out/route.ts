import { removeSession } from '@/lib/helpers/ssesion';
import { handleApiResponse } from '@/lib/utils/http-util';

export async function POST() {
  try {
    await removeSession('session');
    return handleApiResponse(200, {});
  } catch (error) {
    return handleApiResponse(500, { error: 'An error occured' });
  }
}
