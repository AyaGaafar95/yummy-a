// displayMeals()
// listOfMeals()
// allMeals
let submit;

function openSideNav() {
  $(".sideBar-contain").animate(
    {
      left: 0,
    },
    500
  );

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".contain-ul li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}

function closeSideNav() {
  let theWidth = $(".sideBar-contain .theDark-side").outerWidth();
  $(".sideBar-contain").animate(
    {
      left: -theWidth,
    },
    500
  );

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".contain-ul li").animate(
    {
      top: 300,
    },
    500
  );
}

closeSideNav();
$(".sideBar-contain i.open-close-icon").click(() => {
  if ($(".sideBar-contain").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});
//
let listOfMeals = [];
async function meals() {
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
  );

  let data = await res.json();
  listOfMeals = data.meals;
  displayMeals();
  console.log(data);
}
meals();
function displayMeals() {
  // strMeal.split(" ").at(0);
  let temp = "";
  listOfMeals.forEach((el) => {
    temp += ` <div class="col-lg-4 col-md-4 g-4 ">
  <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src="${el.strMealThumb}" alt="" />
   <div
      class="layer position-absolute d-flex align-items-center text-black p-2 text-center"
    ></div> 
     <h3>${el.strMeal.split(" ").at(0)}</h3> 
  </div>
</div>`;
  });
  document.getElementById("myRow").innerHTML = temp;
}

// **************** Search **********************
function searchInputs() {
  searchContainer.innerHTML = `
  <div class="row py-4 ">
      <div class="col-md-6 ">
          <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white  bg-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
  </div>`;
  myRow.innerHTML = "";
}
async function searchByName(word) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}
async function searchByFirstLetter(term) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  word == "" ? (word = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${word}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}

// ******************************************
let arrOfCategories = [];
async function Categories() {
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  let data = await res.json();
  arrOfCategories = data.categories;
  console.log(data);
}
Categories();

function getCategories() {
  let temp = "";
  arrOfCategories.forEach((el) => {
    temp += ` <div class="col-lg-4 col-md-4">
  <div class="meal position-relative">
    <img class="w-100" src="${el.strCategoryThumb}" alt="" />
    <!-- <div
      class="layer d-flex justify-content-center  align-items-center text-start"
    ></div> -->
    <!-- <h3>${el.strCategory}</h3> -->
  </div>
</div>`;
  });
  document.getElementById("myRow").innerHTML = temp;
}
//  ******************** getArea  ****************************
let areaArr = [];
async function getArea() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  let data = await res.json();
  areaArr = data.meals;
  console.log(areaArr);
  displayArea(areaArr);
}

function displayArea(arr) {
  let temp = "";
  arr.forEach((el) => {
    temp += `
    <div class="col-md-3">
     <div onclick="getMealsOfArea('${el.strArea}')" class="rounded-2 text-center cursor-pointer">
<i class="fa-solid fa-house-laptop fa-4x"></i>
<h3>${el.strArea}</h3>
</div>
</div>
`;
  });
  document.getElementById("myRow").innerHTML = temp;
  console.log(temp);
}

mealsOfArea = [];
async function getMealsOfArea(area) {
  // myRow.innerHTML = "";
  temp = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  mealsOfArea = response.meals;
  mealsOfArea.forEach((el) => {
    temp = ` <div class="col-lg-4 col-md-4">
  <div class="meal position-relative">
    <img class="w-100" src="${el.strMealThumb}" alt="" />
    <div
      class="layer d-flex justify-content-center  align-items-center text-start"
    ></div> 
    <h3>${el.strMeal}</h3> 
  </div>
</div>`;
  });
  console.log(response);
}

// *************** Ingredients ****************************
let ingredientsArr = [];
async function getIngredients() {
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  ingredientsArr = respone.meals;
  console.log(respone.meals);
  displayIngredients();
}
function displayIngredients() {
  var temp = "";
  ingredientsArr.forEach((el) => {
    temp += `
  <div class="col-md-3">
          <div onclick="  ('${
            el.strIngredient
          }')" class="rounded-2 text-center cursor-pointer">
                  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                  <h3>${el.strIngredient}</h3>
                   <p>${el.strDescription.split(" ").slice(0, 20).join(" ")}</p>
                 
          </div>
  </div>`;
  });
  document.getElementById("myRow").innerHTML = temp;
}

// *************** Contact Us ****************************
function contacts() {
  myRow.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="validationOfInputs()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers invalid
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="validationOfInputs()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid 
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="validationOfInputs()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="validationOfInputs()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="validationOfInputs()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Min 8 characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="validationOfInputs()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `;
  submit = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repassInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passInputTouched = false;
let repassInputTouched = false;

function validationOfInputs() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repassInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submit.removeAttribute("disabled");
  } else {
    submit.setAttribute("disabled", true);
  }
}
function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
