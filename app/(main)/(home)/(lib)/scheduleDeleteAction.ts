'use server';

import { HASURA_ADMIN_SECRET, HASURA_META_DATA_API } from '@/lib/config';

export const scheduleDeleteAction = async (
  taskId: string,
  scheduleAt: Date,
) => {
  try {
    const response = await fetch(HASURA_META_DATA_API!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET!,
      },
      body: JSON.stringify({
        type: 'create_scheduled_event',
        args: {
          webhook: 'https://2abe-103-172-15-244.ngrok-free.app/api/delete-task',
          schedule_at: scheduleAt,
          payload: {
            id: taskId,
          },
        },
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) return { success: 'Task is scheduled to be deleted' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message || 'Something went wrong' };
  }
};
