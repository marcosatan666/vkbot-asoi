// const mongoose = require('mongoose'); //подключение джаваскрипт библиотеки mongoose
// const data = require('./schedule.json');
// mongoose.connect(`mongodb://localhost/${require("./package.json").name}`).then(() => {
//     const scheduleSchema = mongoose.Schema({
//         day: Number,
//         text: String
//     })
//     const schedule = mongoose.model('Schedule', scheduleSchema);
//     const obj = new Object(data) //мы создаем обьект odj на подобие database.json(data) чтобы получить все наследования глобального класса Object
//     for(let key in obj) {
//         new schedule({
//             day: +key,
//             text: obj[key]
//         }).save(e => {
//             if(e) throw e;
//             console.log(`${+key} was successfully added!`);
//         })
//     }
// })