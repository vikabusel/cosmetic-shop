const items = [{
  title: "Гель для умывания",
  description: "Для смешанной или жирной кожи с тенденцией к акне",
  tags: ["Гель"],
  price: 50.88,
  img: "./img/1.jpg",
  rating: 4.7,
},
{
  title: "Гель для умывания мицеллярный",
  description: "Мицеллярный очищающий пенящийся гель Laboratorios Babe",
  tags: ["Гель"],
  price: 16.81,
  img: "./img/2.jpg",
  rating: 4.5,
},
{
  title: "Очищающая пенка для умывания",
  description: "Функциональная пенка Neulii",
  tags: ["Пенка"],
  price: 41.39,
  img: "./img/3.jpeg",
  rating: 4.9,
},
{
  title: "Очищающий мист для лица",
  description: "Мист ELMOLU объединяет очищающие и увлажняющие свойства",
  tags: ["Мист"],
  price: 47.20,
  img: "./img/4.jpg",
  rating: 4.8,
},
{
  title: "Очищающее масло для лица",
  description: "Гель NEEDLY со сбалансированным pH и мягкой формулой глубоко очищает кожу",
  tags: ["Масло"],
  price: 65.84,
  img: "./img/5.jpg",
  rating: 5.0,
},
{
  title: "Тонер для лица",
  description: "Тонер для лица 3INA помогает удалить остатки загрязнений и увлажнить кожу после очищения и демакияжа",
  tags: ["Тонер"],
  price: 31.31,
  img: "./img/6.jpg",
  rating: 4.5,
},
{
  title: "Мицеллярная вода",
  description: "Очищение, снятие макияжа",
  tags: ["Вода"],
  price: 45.85,
  img: "./img/7.jpg",
  rating: 4.8,
},
{
  title: "Маска для лица",
  description: "Глубокое очищение и сужение пор",
  tags: ["Маска"],
  price: 5.85,
  img: "./img/8.jpg",
  rating: 4.3,
},
{
  title: "Обновляющая пилинг-пудра для лица",
  description: "Натуральная энзимная пудра для лица для всех типов кожи",
  tags: ["Пилинг"],
  price: 12.01,
  img: "./img/9.jpeg",
  rating: 4.6,
},
];

let filter = [...items];

const div = document.querySelector("#shop-items");
const template = document.querySelector("#item-template");

const nothingFound = document.querySelector("#nothing-found");

function findItems(arr) {
  nothingFound.textContent = "";
  div.innerHTML = "";
  arr.forEach((item) => {
    div.append(crewShopItem(item));
  });
  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
};

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
};

findItems(filter.sort((a, b) => sortByAlphabet(a, b)));

function crewShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = template.content.cloneNode(true);
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}BYN`;

  const ratingContainer = item.querySelector(".rating");

  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");

  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });

  return item;
};

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();

  filter = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );
  filter.sort((a, b) => sortByAlphabet(a, b));
  findItems(filter);
  sortControl.selectedIndex = 0;
};

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("keydown", function(event) {
  if (event.key == 'Enter') {
    applySearch
  }
});
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      filter.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      filter.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      filter.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      filter.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  findItems(filter);
});