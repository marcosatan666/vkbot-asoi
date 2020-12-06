// const mongoose = require('mongoose'); //подключение джаваскрипт библиотеки mongoose
// const data = require('./database.json');
// mongoose.connect(`mongodb://localhost/${require("./package.json").name}`).then(() => {
//     const userInfoSchema = mongoose.Schema({
//         id: Number,
//         login: String,
//         password: Number
//     })
//     const userInfo = mongoose.model('User Info', userInfoSchema);
//     const obj = new Object(data) //мы создаем обьект odj на подобие database.json(data) чтобы получить все наследования глобального класса Object
//     for(let key in obj) {
//         let arr = obj[key].split("/");
//         new userInfo({
//             id: +key,
//             login: arr[0],
//             password: +arr[1]
//         }).save(e => {
//             if(e) throw e;
//             console.log(`${+key} was successfully added!`);
//         })
//     }
// })