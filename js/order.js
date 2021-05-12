const urlParams = new URLSearchParams(window.location.search);
document.addEventListener("DOMContentLoaded", (e) => {
  const id = urlParams.get("id");
  const price = urlParams.get("price");
  const items = urlParams.get("items").split(",");

  const idElement = document.querySelector(".order_id_cake");
  idElement.innerText = "#" + id;
  const priceElement = document.querySelector(".price_cake");
  priceElement.innerText = "Rp." + price;

  const dt = document.querySelectorAll(".dt");

  for (let i = 0; i < dt.length; i++) {
    dt[i].innerText = items[i];
  }
});

const orderButton = document.querySelector(".order_button");
const modal = document.querySelector("#myModal");
orderButton.addEventListener("click", () => {
  modal.style.display = "flex";
});

const batalButton = document.querySelector(".btn_batal");
batalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

const orderBtn = document.querySelector(".btn_order");
orderBtn.addEventListener("click", () => {
  var win = window.open(
    `https://wa.me/6282198246668?text=%20Saya%20Order%20Cake%20dengan%20ID:%20${urlParams.get(
      "id"
    )}`,
    "_blank"
  );
});
