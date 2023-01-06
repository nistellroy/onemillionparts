//block html
const parent = document.querySelector(".content__block");
let models = [];

const count = prompt("Model noutbook");
console.log(count);

const server = async function() {
  if(localStorage.length > 0) {
  models = JSON.parse(localStorage.getItem("model"));
}
  const res = await fetch("/index", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      Count: count
    })
  });
  const data = await res.json();
    console.log(data.comment);
    console.log(data.title);
    document.querySelector(".title").innerHTML = data.storage;
    document.querySelector(".amount").innerHTML = "$" + data.amount + "USD";
    document.querySelector(".info").innerHTML = data.title;
    document.querySelector(".picurl").src = data.img;
    models.push(data.storage + " " + data.title.split(" ")[0].toString());
    localStorage.setItem("model", JSON.stringify(models));
    console.log( JSON.parse(localStorage.getItem("model")));

    for(let i = 0; i < data.comment.length; i++) {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('h3');
        img.setAttribute("src", data.comment[i]);
        title.innerHTML = data.array[i];
        div.classList.add("block")
        title.classList.add("title__block")
        div.append(img);
        div.append(title);
        parent.append(div);
        console.log(div);
     }
};

server();


document.getElementById("database").addEventListener("click", async function() {
  const response = await fetch("/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.querySelector(".text").value,
      model: JSON.parse(localStorage.getItem("model"))
    })
  });
  const data = await response.json();
  console.log(data);
   // localStorage.clear();
});

  document.getElementById("clear").addEventListener("click", async () => {
    localStorage.clear();
    });
