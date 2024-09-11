import { sendEmail } from '@/helpers/sendEmail';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const newData = body?.event?.data?.new;
  const userEmail = newData?.userEmail;
  const status = newData?.status;
  const title = newData?.title;

  try {
    const response = await sendEmail(title, status, userEmail);
    if (response?.error) throw new Error(response.error);
    return new NextResponse('Event Updated Successfully', { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse(error?.message || 'Something went wrong', {
      status: 400,
    });
  }
};
