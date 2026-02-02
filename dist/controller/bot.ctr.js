import TelegramBot from "node-telegram-bot-api";
import { Bot } from "../model/bot.model.js";
import { log } from "node:console";
Bot.sync({ force: true });
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.onText(/\/start/, (msg) => {
    console.log(msg);
});
export const getMessageFromToday = async (req, res, next) => {
    try {
    }
    catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
//# sourceMappingURL=bot.ctr.js.map