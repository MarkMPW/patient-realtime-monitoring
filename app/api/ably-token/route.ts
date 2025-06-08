import { NextRequest, NextResponse } from "next/server";
import Ably from "ably";

const ablyRest = new Ably.Rest(process.env.ABLY_API_KEY!);

export async function GET(req: NextRequest) {
  try {
    const clientId = `client-${Math.random().toString(36).substring(2, 15)}`;
    const tokenRequest = await ablyRest.auth.createTokenRequest({
      clientId,
    });

    return NextResponse.json(tokenRequest);
  } catch (error) {
    console.error('Error creating token:', error);
    return NextResponse.json(
      { error: 'Failed to create token' },
      { status: 500 }
    );
  }
} 