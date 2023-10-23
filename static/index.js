let reverse;
let responseServer = [];
const dateMonth = new Date();

let select = document.querySelector("#select");
select.value = dateMonth.getMonth() + 1;
select.selected;

const arrayMonth = [
  "undefined",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


document.querySelector('.date').addEventListener("change", (event) => {

  const block = document.querySelector(".center__general");
      block.innerHTML = "";
  
  reverse = String(event.target.value).split("-").reverse();
  let str = String(reverse.join("."));

  
  
  responseServer.find(element => {

    if(element.date == str) {
      document.querySelector(".data__name").innerHTML = element.name;
      document.querySelector(".data__date").innerHTML = element.date;
      document.querySelector(".data__amount").innerHTML = element.amount;
      for(let i = 0; i < element.storage.length; i++) {
        const div = document.createElement('div');
        const num = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('div');
        img.setAttribute("src", element.images[i]);
        title.innerHTML = element.storage[i];
        num.innerHTML =  "#" + (i + 1);
        div.classList.add("block");
        num.classList.add("number");
        title.classList.add("title__block");
        div.append(num);
        div.append(img);
        div.append(title);
        block.append(div);
     }
    }
  });
});


const response = new Promise((resolve, reject) => {
  fetch("/amount")
  .then(data => {
    return resolve(data.json());
  });
});
response.then(res => {
  responseServer = res;
  let x = 0;
  let amount = 0;
  console.log("0" + select.value);
  function getCountDay(number) {
    for(let i = 0; i < number.length; i++) {
      if(number[i].date.split(".")[1] == "0" + select.value) {
        x++;
        amount += number[i].amount;
      }
    }
  } 
  getCountDay(res);
  let y = amount;
  let result = 400/100;
  document.querySelector(".proc").innerHTML = y / result + "% (100%)";
  document.querySelector(".month").innerHTML = amount + " (400)";
  document.querySelector(".days").innerHTML = x + " (20-22)";
  document.querySelector(".data__month").innerHTML = arrayMonth[select.value];
  document.querySelector(".sr").innerHTML = (amount / x).toFixed(2) + " (20)";
});

document.querySelector("#select").addEventListener("change", (event) => {
  console.log(event.target.value);
  let x = 0;
  let amount = 0;
  function getCountDay(number) {
    for(let i = 0; i < number.length; i++) {
      if(number[i].date.split(".")[1] == "0" + event.target.value) {
        x++;
        amount += number[i].amount;
      } 
    }
  } 
  getCountDay(responseServer);
  let y = amount;
  let result = 400/100;
  document.querySelector(".proc").innerHTML = y / result + "% (100%)";
  document.querySelector(".month").innerHTML = amount + " (400)";
  document.querySelector(".days").innerHTML = x + " (20-22)";
  document.querySelector(".data__month").innerHTML = arrayMonth[select.value];
  document.querySelector(".sr").innerHTML = (amount / x).toFixed(2) + " (20)";
});

document.querySelector("#search").addEventListener("click", () => {
  const getting = responseServer.find(item => {
    const x = item.storage.find(i => {
      return i.split(" ")[0] === document.querySelector(".edit").value;
    });
    return x;
  });
  const count = getting.storage.findIndex(item => {
    return item.split(" ")[0] === document.querySelector(".edit").value;
  });
  console.log(getting, count);

  const block = document.querySelector(".center__general");
      block.innerHTML = "";

      document.querySelector(".data__name").innerHTML = getting.name;
      document.querySelector(".data__date").innerHTML = getting.date;
      document.querySelector(".data__amount").innerHTML = getting.amount;

      const div = document.createElement('div');
        const num = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('div');
        img.setAttribute("src", getting.images[count]);
        title.innerHTML = getting.storage[count];
        num.innerHTML =  "FOUND";
        div.classList.add("block");
        num.classList.add("number");
        title.classList.add("title__block");
        div.append(num);
        div.append(img);
        div.append(title);
        block.append(div);
      
});