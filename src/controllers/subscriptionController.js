import fs from 'node:fs/promises';
import path from 'node:path';
import handlebars from 'handlebars';
import { Subscription } from '../models/subscription.js';
import { sendMail } from '../utils/sendMail.js';

const sendWelcomeEmail = async (email, lang = 'uk', t) => {
  try {
    const templateName =
      lang === 'en'
        ? 'subscription-welcome-en.html'
        : 'subscription-welcome.html';
    const templatePath = path.resolve('src', 'templates', templateName);
    const templateSource = await fs.readFile(templatePath, 'utf-8');
    const template = handlebars.compile(templateSource);

    const html = template({
      clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
      year: new Date().getFullYear(),
    });

    const subject = t('subscription.welcomeSubject');

    await sendMail({
      to: email,
      subject: subject,
      html,
    });
    console.log(`Welcome email successfully queued for sending to ${email}`);
  } catch (error) {
    console.error(`Failed to send welcome email to ${email}:`, error);
  }
};

export const createSubscription = async (req, res) => {
  const { email } = req.body;

  const existingSubscription = await Subscription.findOne({ email });

  if (existingSubscription) {
    return res.status(200).json({
      message: req.t('subscription.alreadySubscribed'),
    });
  }
  await Subscription.create({ email });

  sendWelcomeEmail(email, req.i18n.language, req.t);

  res.status(201).json({
    message: req.t('subscription.success'),
  });
};
