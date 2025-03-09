import { NextResponse } from 'next/server';

export const handleApiResponse = <T>(status: number, data: T) => {
  return NextResponse.json(data, { status });
};
