import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import getVerifiedAddressBalanceOf from '@/lib/zora/getVerifiedAddressBalanceOf';
import getBallFrame from '@/lib/getBallFrame';
import getVerifiedAddressesFromBody from '@/lib/farcaster/getVerifiedAddressesFromBody';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const verifiedAddresses = await getVerifiedAddressesFromBody(body)
  const balanceOf = await getVerifiedAddressBalanceOf(verifiedAddresses)
  const isCollector = balanceOf > 0n 

  return new NextResponse(
    getFrameHtmlResponse(getBallFrame(isCollector)),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
