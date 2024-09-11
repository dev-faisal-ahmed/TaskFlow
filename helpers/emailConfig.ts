import NodeMailer from 'nodemailer';
import { GMAIL_ID, GMAIL_PASS } from '@/lib/config';
import { ETaskStatus } from '@/lib/types';

export const transporter = NodeMailer.createTransport({
  service: 'gmail',
  auth: { user: GMAIL_ID, pass: GMAIL_PASS },
});

export const mailOption = (email: string) => {
  return { from: GMAIL_ID, to: email };
};

export const emailTemplate = (title: string, status: ETaskStatus) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      *,
      html,
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <main
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 100vh;
        margin: 0 auto;
      "
    >
      <section
        style="
          padding: 20px;
          border: 2px solid #f1f1f1;
          min-width: 450px;
          max-width: 500px;
          border-radius: 10px;
        "
      >
        <h1
          style="
            font-size: 1.5rem;
            text-align: center;
            color: #1f6e65;
            font-weight: bolder;
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 10px;
          "
        >
          TaskFlow
        </h1>
        <p style="margin-top: 10px">Dear User,</p>
        Your task title with <b>${title}</b> has been marked as <b>${status}</b>  
      </section>
    </main>
  </body>
</html>
`;
};
