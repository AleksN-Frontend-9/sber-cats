console.log("work");

const $wr = document.querySelector("[data-wr]");

const getCatHTML = (cat) => `
        <div class="card">
            <img src="${cat.image}" class="card__image" alt="${cat.name}" />
            <div class="card__body">
                <h3>${cat.name}, ${cat.age} лет</h3>
                <p>${cat.description}</p>
            </div>
            <div class="card__button">
                <button>Редактировать</button>
                <button><i class="fa-regular fa-lg fa-trash-can"></i></button>
            </div>
        </div>
	`;

fetch("https://cats.petiteweb.dev/api/single/AleksN-Frontend-9/show/")
  .then((resolve) => resolve.json())
  .then((data) => {
    $wr.insertAdjacentHTML("afterbegin", data.map((cat) => getCatHTML(cat)).join(""));

    console.log({ data });
  });

const openPopUp = document.getElementById("open_pop_up");
const closePopUp = document.getElementById("pop_up_close");
const PopUp = document.getElementById("pop_up");

openPopUp.addEventListener("click", (e) => {
  PopUp.classList.add("active");
});

closePopUp.addEventListener("click", () => {
  PopUp.classList.remove("active");
});

const idName = document.getElementById("id_name");

openPopUp.addEventListener("click", () => {
  fetch("https://cats.petiteweb.dev/api/single/AleksN-Frontend-9/ids/")
    .then((resolve) => resolve.json())
    .then((data) => {
      idName.value = data.length + 1;
    });
});

const form = document.getElementById("form");

function getFormValue(event) {
  event.preventDefault();

  const id = form.querySelector("#id_name");
  const name = form.querySelector("#name");
  const form_image = form.querySelector("#form_image");
  const age = form.querySelector("#age");
  const rate = form.querySelector("#rate");
  const favorite = form.querySelector("#favorite");
  const description = form.querySelector("#description");

  const data = {
    id: id.value,
    name: name.value,
    image: form_image.value,
    age: age.value,
    rate: rate.value,
    favorite: favorite.value,
    description: description.value,
  };

  console.log(data);

  const jsonData = JSON.stringify(data);

  console.log(jsonData);

  const postData = async (url, jsonData) => {
    const response = await fetch(url, {
      method: "POST",
      body: jsonData,
    });

    return await response.json();
  };

  postData("https://cats.petiteweb.dev/api/single/AleksN-Frontend-9/add/", jsonData);
}

form.addEventListener("submit", getFormValue());
