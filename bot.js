const VkBot = require('node-vk-bot-api'); //библиотека вк бот
const Markup = require('node-vk-bot-api/lib/markup'); //кнопачки-попачки в
const api = require('node-vk-bot-api/lib/api'); //апи для запросов в БД вк
const mongoose = require('mongoose'); //подключение джаваскрипт библиотеки mongoose
const TOKEN = 'd9f6f7301df2427afb2e32ce174328dcc513f51d92daf0a1c3b710f8a8a4fa8cb4ada9b077651d6e8492e';

const bot = new VkBot(TOKEN);

mongoose.connect(`mongodb://localhost/${require("./package.json").name}`).then(() => {
    const userInfoSchema = mongoose.Schema({
        id: Number,
        login: String,
        password: Number
    })
    const scheduleSchema = mongoose.Schema({
        day: Number,
        text: String
    })
    const userInfo = mongoose.model('User Info', userInfoSchema);
    const schedule = mongoose.model('Schedule', scheduleSchema);

    bot.command(/^начать\.?$/i, ctx => {
        ctx.reply('How can I help you?', null, Markup.keyboard([
            [Markup.button('Get login and password', 'primary')],
            [Markup.button('Get schedule', 'default')]
        ]))
    })

    bot.command(/^get login and password\.?$/i, ctx => {
        let userId = ctx.message.from_id;
        api("users.get", {
            user_ids: userId,
            access_token: TOKEN,
        }).then(snap => {
            userInfo.findOne({
                id: userId
            }).exec((e, data) => {
                ctx.reply(`Hi, @id${userId}(${snap.response[0].first_name})! This is your login and password:\n\nLogin: ${data.login}\nPassword: ${data.password}`);
            })
        })
    })

    bot.command(/^get schedule\.?$/i, ctx => {
        let userId = ctx.message.from_id;
        api("users.get", {
            user_ids: userId,
            access_token: TOKEN,
        }).then(snap => {
            schedule.findOne({
                day: new Date().getDay()
            }).exec((e, data1) => {
                schedule.findOne({
                    day: new Date(new Date().getTime() + 86400000).getDay()
                }).exec((e, data2) => {
                    ctx.reply(`Hi, @id${userId}(${snap.response[0].first_name})!\n\nBehold our today's schedule:\n${data1.text}\n\nBehold our tomorrow's schedule:\n${data2.text}`);
                })
            })
        })
    })

    bot.startPolling();
})