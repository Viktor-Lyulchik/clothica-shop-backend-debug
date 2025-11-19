import TelegramBot from 'node-telegram-bot-api';
import i18next from '../config/i18n.js';
import { User } from '../models/user.js';

const token = process.env.TELEGRAM_BOT_TOKEN;
let bot;

const ukT = await i18next.getFixedT('uk');
const enT = await i18next.getFixedT('en');

if (token) {
  bot = new TelegramBot(token);

  bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = match[1];
    const lang = msg.from.language_code === 'uk' ? 'uk' : 'en';
    const t = lang === 'uk' ? ukT : enT;

    if (userId) {
      try {
        const user = await User.findById(userId);
        if (!user) {
          return bot.sendMessage(chatId, t('telegram.userNotFound'));
        }
        if (user.telegramLinked) {
          return bot.sendMessage(chatId, t('telegram.alreadyLinked'));
        }
        await User.findByIdAndUpdate(userId, {
          telegramChatId: chatId,
          telegramUserId: msg.from.id,
          telegramLinked: true,
        });
        bot.sendMessage(chatId, t('telegram.linkSuccess'));
      } catch (error) {
        console.error('Error linking telegram account:', error);
        bot.sendMessage(chatId, t('telegram.linkError'));
      }
    } else {
      bot.sendMessage(chatId, t('telegram.welcome'));
    }
  });
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const lang = msg.from.language_code === 'uk' ? 'uk' : 'en';
    const t = lang === 'uk' ? ukT : enT;
    const helpText = t('telegram.help');
    bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
  });
} else {
  console.warn('TELEGRAM_BOT_TOKEN not found. Bot will not be initialized');
}

export const setupTelegramWebhook = async () => {
  if (!bot) return;

  const webhookUrl = `${process.env.RENDER_EXTERNAL_URL}/api/telegram/webhook/${token}`;
  try {
    await bot.setWebHook(webhookUrl);
    console.log(`✅ Telegram webhook set up at: ${webhookUrl}`);
  } catch (error) {
    console.error('❌ Failed to set Telegram webhook:', error.message);
  }
};

export const processTelegramUpdate = (update) => {
  if (bot) {
    bot.processUpdate(update);
  }
};

export const sendPasswordResetCode = async (chatId, code) => {
  if (!bot) return;
  const message = ukT('telegram.resetCodeMessage', { code });
  await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
};
