//============================================Mahmadiyarov Sharof 2022=====================================================
const axios = require('axios'); //for parsing
const express = require('express'); // for server
const color = require('colors'); // for terminal colors
const path = require('path'); // for my files
const app = express(); 
const PORT = process.env.PORT ?? 3200; //port number
const crypto = require('crypto'); // hash random 16b
const hash = crypto.randomBytes(13).toString("hex");
const minutesFunction = require('./static/add/minFunc');
const timeShift = require('./static/add/arrFunc');
const {MongoClient} = require('mongodb');

let arrayStorage = [];
let arrayTime = [];
let finishArray = [];
let arStorage = [];

const database = new MongoClient("mongodb+srv://users:nistell16@cluster0.h5lezlv.mongodb.net/?retryWrites=true&w=majority");

//start application express js
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));
//start server,  send response json 
app.post("/index", (req, send) => {
    const go = async () => {
        const res = await axios({
            method: "POST",
            url: "https://onemillionparts.com/controller/authentication/login.php",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': `PHPSESSID=${hash}; objectSession=%7B%22Username%22%3A%22Sharof%22%2C%22Userrole%22%3A1%2C%22RoleName%22%3Anull%7D`
            },
            data: "user_name=Artur&pass_word=ar_$@rut12&remember_me=1" //form data login and password site htt://onemillionparts.com/app.php
        });
        const getHeaders = await res.headers['set-cookie'].toString();

        const response = await axios({
            method: "GET",
            url: `https://onemillionparts.com/controller/buying/read.php?_dc=1667349325477&StorageSearchingCase=1&Storage=${req.body.Count}&page=1&start=0&limit=50`,
            headers: {
                'Cookie': `${getHeaders}`
            },
        });

        //information for terminal number, title, time and logo
        const date = new Date();
        arrayStorage.push(response.data.data[0].Storage.green + '\t' + date.toLocaleTimeString().gray + "\t" + response.data.data[0].Title.split(" ")[0].toString().red);
        arrayTime.push(date.toLocaleTimeString());
        arStorage.push(response.data.data[0].Storage + " "  + response.data.data[0].Title.split(" ")[0].toString());
        console.log("===================Amount===================");
        if(arrayTime.length > 1) {
            const storage = arrayTime.filter((str, index) => {
                return index;
            });
            storage.forEach((element, index) => {
                console.log(index + 1, '\t', arrayStorage[index], '\t', timeShift(arrayTime[index], storage[index]));
            });
            console.log("============================================");
        } else console.log(`------------------${date.toLocaleDateString()}------------------`.bgGreen);

        const array = response.data.data[0].Comment.split(",").toString();
        const go = array.split(":").slice(1).toString();
        const arr = go.split(",");

        // here i send images
        const newobj = arr.map((index, data) => {
            switch (index) {
                case " bottom":
                    return "./img/bottom.png";
                case " back":
                    return "./img/back.png";
                case " caddy":
                    return "./img/caddy.png";
                case " hinges":
                    return "./img/hinges.png";
                case " palmrest":
                    return "./img/palmrest.png";
                case " keyboard":
                    return "./img/clavie.png";
                case " lcd back":
                    return "./img/lcdBack.png";
                case " screws":
                    return "./img/screws.png";
                case " front":
                    return "./img/font.png";
                case " fan":
                    return "./img/fan.png";
            }
        });

        const newnewobj = newobj.filter(index => {
            return index;
        });

        //this is currency usd cad format
        axios("https://currate.ru/api/?get=rates&pairs=USDCAD,CADUSD&key=d5ebeb3e6cc4744e3697c11801bdfb39")
            .then(currence => {
            send.json({
                comment: newnewobj,
                array: arr,
                title: response.data.data[0].Title,
                storage: response.data.data[0].Storage,
                img: response.data.data[0].PicURL1,
                amount: response.data.data[0].AmountPaid,
                sum: currence.data.data.USDCAD
            });
        });
    }
go();
});

app.post("/", async (client, server) => {
    const date = await new Date();
    const db = await database.db().collection("onemillionparts");
    await db.insertOne({name: "Sharof", date: date.toLocaleDateString().replace(/\//g, "."), storage: arStorage, amount: arStorage.length});
    });

app.get("/amount", async (req, res) => {
        database.connect();
        const db = await database.db().collection("onemillionparts");
        await db.find().toArray((err, data) => {
        res.send(data);
    });
});

app.get("/amount/:dateTime", async (req, res) => {
    const db = await database.db().collection("onemillionparts");
    const result = await db.findOne({date: req.params.dateTime});
    res.send(result);
});

//listen port for my created server
app.listen(PORT, () => {
    console.log("server is started in port: ".yellow + PORT);
});
