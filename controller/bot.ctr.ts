import type { NextFunction, Request, Response } from "express";
import TelegramBot from "node-telegram-bot-api";
import { Bot } from "../model/bot.model.js";

Bot.sync({ force: false });
const bot = new TelegramBot(process.env.BOT_TOKEN as string, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatid = msg.chat.id;

  if (msg.text === "/text") {
    const foundedUser = await Bot.findOne({ where: { chat_id: chatid } });

    if (!foundedUser) {
      bot.sendMessage(chatid, "Telefon raqamni ulashing", {
        reply_markup: {
          keyboard: [[{ text: "Telefon raqam ulashish", request_contact: true }]],
        },
      });

      console.log(msg);
      
    }
  }
});

export const getMessageFromToday = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
