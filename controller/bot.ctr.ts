import type { NextFunction, Request, Response } from "express";
import TelegramBot from "node-telegram-bot-api";
import { Bot } from "../model/bot.model.js";
import { BotUser } from "../model/botUser.js";
import { Op } from "sequelize";

Bot.sync({ force: false });
BotUser.sync({ force: false });

const bot = new TelegramBot(process.env.BOT_TOKEN as string, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id as number;
  const full_name = msg.from?.first_name as string;

  const foundedUser = await Bot.findOne({ where: { chat_id: chatId } });
  if (msg.text === "/start") {
    if (!foundedUser?.dataValues) {
      await BotUser.create({ full_name, chat_id: chatId });

      bot.sendMessage(chatId, "Telefon raqamni ulashing", {
        reply_markup: {
          keyboard: [
            [{ text: "📞 Telefon raqam ulashish", request_contact: true }],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    } else {
       if(foundedUser.dataValues && !foundedUser.dataValues.phone_number){
        bot.sendMessage(chatId, "Telefon raqamni ulashing", {
            reply_markup: {
                 keyboard : [
                    [{text:"📞 Telefon raqam ulashish", request_contact: true}],
                 ],
                 remove_keyboard: true,
                 one_time_keyboard: true
            },
        });
       }

       bot.sendMessage(chatId, "Botdan foydalanishingiz mumkin!✅")
    }
  } else {
  }
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id as number;

  const foundedUser = await BotUser.findOne({where : {chat_id: chatId}});

  if(msg.contact){
    if(foundedUser?.dataValues){
        await BotUser.update(
            {phone_number: msg.contact?.phone_number},
            {where: {chat_id: foundedUser.dataValues.chat_id}},
        )
    }
  }

  if(msg.text && msg.text !== "/start"){
    await Bot.create({full_name: foundedUser?.dataValues.full_name, phone_number: foundedUser?.dataValues.phone_number,
        chat_id: foundedUser?.dataValues.chat_id, message: msg.text
    })

    bot.sendMessage(chatId, "Murojatingiz yetkazildi, u tez orada ko'rib chiqiladi!")
  }
});

export const getMessageFromToday = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const currentDate = new Date()
    currentDate.setUTCHours(0,0,0,0)

    const messages = await Bot.findAll({where: {createAt: {[Op.gte]: currentDate}}})

    res.status(200).json(messages)
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};


export const getMessageLastTenDay = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 10)

    const messages = await Bot.findAll({where: {createAt: {[Op.gte]: currentDate}}})

    res.status(200).json(messages)
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};