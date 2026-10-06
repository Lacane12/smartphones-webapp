let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";
let item = "";

// Номер кнопки -> название производителя
let brands = { 1: "Apple", 2: "Samsung", 3: "Xiaomi", 4: "Google" };

for (let id in brands) {
  let btn = document.getElementById("btn" + id);
  btn.addEventListener("click", function () {
    let buttons = document.querySelectorAll(".btn");
    buttons.forEach(function (b) {
      b.classList.remove("active");
    });
    if (tg.MainButton.isVisible && item === id) {
      // Повторное нажатие на ту же кнопку скрывает MainButton
      tg.MainButton.hide();
      item = "";
    } else {
      tg.MainButton.setText("Вывести информацию по " + brands[id]);
      item = id;
      btn.classList.add("active");
      tg.MainButton.show();
    }
  });
}

// По нажатию на MainButton передаём выбранный item боту
Telegram.WebApp.onEvent("mainButtonClicked", function () {
  tg.sendData(item);
});

// Показываем имя пользователя, открывшего интерфейс
let usercard = document.getElementById("usercard");
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
  usercard.innerText = "Пользователь: " + tg.initDataUnsafe.user.first_name;
}
