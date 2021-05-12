import db from "../db.js";

// Splash Screen
const splash = document.querySelector("#splash");
document.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    splash.classList.add("display-none");
  }, 2000);
});

// Choice Item
let idItem = "0101010000";
let price = 0;
document.addEventListener("DOMContentLoaded", (e) => {
  let listItemContent = "";
  let items = db.find((item) => {
    return item.tipe === "taste";
  });
  items.items.forEach((item) => {
    listItemContent += `
          <div class="list_item">
          <div class="container_item" style="background-color: ${item.color}">
          <img src="/img/taste/${item.src}" alt="${item.src}" />    
          </div>
          <p class="text_item">${item.name}</p>
          </div>
          `;
  });
  document.querySelector(".container_list").innerHTML = listItemContent;
  document.querySelector(".id_cake").innerText = idItem;
  price = findPrice(idItem);
});

const choices = document.querySelectorAll(".choice_item");
const itemImg = document.querySelectorAll(".item");
let listItemContent;
let items;
for (let i = 0; i < choices.length; i++) {
  choices[i].addEventListener("click", (event) => {
    document.querySelector(".active").classList.remove("active");
    choices[i].classList.add("active");
    for (let j = 0; j < itemImg.length; j++) {
      itemImg[j].src = itemImg[j].src.replace("_white", "_gray");
    }
    itemImg[i].src = itemImg[i].src.replace("_gray", "_white");
    switch (choices[i].id) {
      case "taste":
        listItemContent = "";
        items = db.find((item) => {
          return item.tipe === "taste";
        });
        items.items.forEach((item) => {
          listItemContent += `

          <div class="list_item" onclick="iniDiklik(${item})">
          <div class="container_item" style="background-color: ${item.color}">
          <img src="/img/taste/${item.src}" alt="${item.src}" />    
          </div>
          <p class="text_item">${item.name}</p>
          </div>
          `;
        });
        document.querySelector(".container_list").innerHTML = listItemContent;
        break;
      case "shape":
        listItemContent = "";
        items = db.find((item) => {
          return item.tipe === "shape";
        });
        items.items.forEach((item) => {
          listItemContent += `
          <div class="list_item">
          <div class="container_item" style="background-color: ${item.color}">
          <img src="/img/shape/${item.src}" alt="${item.src}" />    
          </div>
          <p class="text_item">${item.name}</p>
          </div>
          `;
        });
        document.querySelector(".container_list").innerHTML = listItemContent;
        break;
      case "color":
        listItemContent = "";
        items = db.find((item) => {
          return item.tipe === "color";
        });
        items.items.forEach((item) => {
          listItemContent += `
          <div class="list_item">
          <div class="container_item" style="background-color: ${item.color}">
          <img src="/img/color/${item.src}" alt="${item.src}" />    
          </div>
          <p class="text_item">${item.name}</p>
          </div>
          `;
        });
        document.querySelector(".container_list").innerHTML = listItemContent;
        break;
      case "topping":
        listItemContent = "";
        items = db.find((item) => {
          return item.tipe === "topping";
        });
        items.items.forEach((item) => {
          listItemContent += `
          <div class="list_item">
          <div class="container_item" style="background-color: ${item.color}">
          <img src="/img/topping/${item.src}" alt="${item.src}" />    
          </div>
          <p class="text_item">${item.name}</p>
          </div>
          `;
        });
        document.querySelector(".container_list").innerHTML = listItemContent;
        break;
      case "addition":
        listItemContent = "";
        items = db.find((item) => {
          return item.tipe === "addition";
        });
        items.items.forEach((item) => {
          listItemContent += `
          <div class="list_item">
          <div class="container_item" style="background-color: ${item.color}">
          <img src="/img/addition/${item.src}" alt="${item.src}" />    
          </div>
          <p class="text_item">${item.name}</p>
          </div>
          `;
        });
        document.querySelector(".container_list").innerHTML = listItemContent;
        break;
    }
  });
}

// List Item <Onclick</Onclick>
let containerList = document.querySelector(".container_list");
containerList.addEventListener("click", function (e) {
  if (e.target.className !== "container_list") {
    let idTemp = document.querySelector(".id_cake").innerText;

    let index = Array.prototype.indexOf.call(
      containerList.children,
      e.target.className == "list_item"
        ? e.target
        : e.target.tagName == "IMG"
        ? e.target.parentElement.parentElement
        : e.target.parentElement
    );

    let itemApa = db.find((item) => {
      return item.tipe === document.querySelector(".active").id;
    });

    let indexChoice = db.indexOf(itemApa);

    if (indexChoice == 0) {
      idItem = itemApa.items[index].id + idTemp.substring(2, idTemp.length);
    } else if (indexChoice == db.length - 1) {
      idItem = idTemp.substring(0, idTemp.length - 2) + itemApa.items[index].id;
    } else {
      idItem =
        idTemp.substring(0, (indexChoice + 1) * 2 - 2) +
        itemApa.items[index].id +
        idTemp.substring((indexChoice + 1) * 2, idTemp.length);
    }
    price = findPrice(idItem);
    document.querySelector(".id_cake").innerText = idItem;
  }

  //
});

let itemItem = [];
function findPrice(id) {
  let idT = id.substring(0, 2);
  let idS = id.substring(2, 4);
  let idC = id.substring(4, 6);
  let idO = id.substring(6, 8);
  let idA = id.substring(8, 10);
  let idItemss = [idT, idS, idC, idO, idA];
  let tempPrice = 0;
  itemItem = [];
  for (let i = 0; i < db.length; i++) {
    db[i].items.forEach((item) => {
      if (item.id === idItemss[i]) {
        tempPrice += item.price;
        itemItem.push(item.name);
        console.log(itemItem[i]);
      }
    });
  }
  return tempPrice;
}

const orderbtn = document.getElementById("orderBtn");
orderbtn.addEventListener("click", () => {
  if (idItem && price) {
    window.location =
      "/pages/order.html?id=" +
      idItem +
      "&price=" +
      price +
      "&items=" +
      itemItem;
  }
});

function getLenItem() {
  let lenItem = [];
  for (let i = 0; i < db.length; i++) {
    lenItem.push(db[i].items.length);
  }
  return lenItem;
}

const randombtn = document.getElementById("randomBtn");
randombtn.addEventListener("click", () => {
  let randId = "";
  let b = 1;
  let lenItem = getLenItem();
  for (let i = 0; i < lenItem.length; i++) {
    if (i >= lenItem.length - 2) {
      b = 0;
    }
    randId += "0" + (Math.floor(Math.random() * lenItem[i]) + b).toString();
  }

  idItem = randId;
  document.querySelector(".id_cake").innerText = idItem;
  console.log(randId);
});

const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("keypress", function (e) {
  let maxLen = getLenItem();
  let value = searchInput.value;
  let valid = false;
  let j = 0;
  if (e.key === "Enter") {
    for (let i = 0; i < value.length; i++) {
      if (i % 2 == 0) {
        value.charAt(i) === 0 ? (valid = true) : (valid = false);
        console.log(value.charAt(i));
      } else {
        value.charAt(i) <= maxLen[j] && value.charAt(i) >= 0
          ? (valid = true)
          : (valid = false);
        j++;
      }
    }
    if (valid) {
      idItem = searchInput.value;
      document.querySelector(".id_cake").innerText = idItem;
    }
  }
});
