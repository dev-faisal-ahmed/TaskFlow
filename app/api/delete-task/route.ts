import { apolloClient } from '@/lib/graphQlClient';
import { NextRequest, NextResponse } from 'next/server';
import { PERMANENTLY_DELETE_TASK } from '@/lib/query';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    await apolloClient.mutate({
      mutation: PERMANENTLY_DELETE_TASK,
      variables: { id: body?.payload?.id },
    });

    return new NextResponse(`Task has been deleted `, {
      status: 200,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse(error.message || 'Something went wrong', {
      status: 400,
    });
  }
};
