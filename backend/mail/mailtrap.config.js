import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: 'educahub@yanlima.com',
  name: 'Educahub',
};
