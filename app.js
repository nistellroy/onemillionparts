const colors = require("colors");
const crypto = require("crypto");
const axios = require("axios");
const cheerio = require("cheerio");

const hash = crypto.randomBytes(13).toString("hex");



const go = async () => {
    const res = await axios({
        method: "POST",
        url: "https://onemillionparts.com/controller/authentication/login.php",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": "PHPSESSID=" + hash
        },
        data: "user_name=Sharof&pass_word=shar-@!_ov&remember_me=1"
    });-

    console.log(res.data);

    const response = await axios({
        method: "GET",
        url: "https://onemillionparts.com/controller/buying/read.php?_dc=1667349325477&StorageSearchingCase=1&Storage=mb362&page=1&start=0&limit=50",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": "PHPSESSID=" + hash
        }
    });

    console.log(response.data);
}
go();


