import { ETaskStatus } from '@/lib/types';
import { emailTemplate, mailOption, transporter } from './emailConfig';

export const sendEmail = async (
  title: string,
  status: ETaskStatus,
  userEmail: string,
) => {
  const emailResult = await transporter.sendMail({
    ...mailOption(userEmail),
    subject: `Task marked as ${status}`,
    text: `
    Dear User,
    Your task title with ${title} has been marked as ${status}
    `,
    html: emailTemplate(title, status),
  });

  if (!emailResult.accepted) return { error: 'Failed to send email' };
  return { success: 'Email Sent Successfully' };
};
