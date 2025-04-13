// app/api/reels/route.ts
import { NextResponse } from 'next/server';
import reels from '../../../data/reels.json';

export async function GET() {
  return NextResponse.json(reels);
}
