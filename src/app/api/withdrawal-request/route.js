import { EmailTemplate } from '@/components/emails/withdrawal';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export  async function POST(req, res) {
  try {
    const body = await req.json();
    const { user, coins } = body;
    const { data, error } = await resend.emails.send({
      from: 'LiRa Games <noreply@resend.dev>',
      to: ['vlyras2@gmail.com'],
      subject: 'New Withdrawal Request',
      react: EmailTemplate({ user, coins }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
};
