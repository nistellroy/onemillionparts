//block html
const parent = document.querySelector(".content__block");

const count = prompt("Enter acticle");

async function server() {
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
    document.querySelector(".amount").innerHTML = "$" + data.amount + "USD" + "  :   " + "$" + (data.amount * data.sum).toFixed(2) + "CAD" ;
    document.querySelector(".info").innerHTML = data.title;
    document.querySelector(".picurl").src = data.img;


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

}

document.getElementById("database").addEventListener("click", async () => {
  const res = await fetch("/save", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    });
  });

server();
