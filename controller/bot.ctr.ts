import type { NextFunction, Request, Response } from "express"
import TelegramBot from "node-telegram-bot-api"
import { Bot } from "../model/bot.model.js"

Bot.sync({force: false})
const bot = new TelegramBot(process.env.BOT_TOKEN as string, {polling: true})


bot.onText(/\/start/, (msg) => {
    console.log(msg);
})





export const getMessageFromToday = async (req: Request, res: Response, next: NextFunction) => {
    try {
   
    } catch (error:any) {
        res.status(500).send({
            message: error.message
        })
    }
}