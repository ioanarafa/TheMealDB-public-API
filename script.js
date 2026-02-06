let meals = [];
let currentMeal = null;
let cart = [];


document.getElementById("searchBtn").onclick = function() {
  let ing = document.getElementById("ingredient").value.trim();

  if (ing === "") {
    document.getElementById("message").innerText = "Scrie un ingredient!";
    return;
  }

  document.getElementById("loader").style.display = "block";
  document.getElementById("results").innerHTML = "";
  document.getElementById("message").innerText = "";

  
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ing)
    .then(r => r.json())
    .then(data => {
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
      }, 1000);

      if (!data.meals) {
        document.getElementById("message").innerText = "Nimic gasit";
        return;
      }

      meals = data.meals;
      showResults();
    })
    .catch(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("message").innerText = "Eroare la cautare!";
    });
};


function showResults() {
  let div = document.getElementById("results");
  div.innerHTML = "";
  for (let m of meals) {
    let card = document.createElement("div");
    card.className = "meal";
    card.innerHTML = "<img src='" + m.strMealThumb + "'><h4>" + m.strMeal + "</h4> <span> "+ m.idMeal + "</span>";
    card.onclick = function() {
      openDetails(m.idMeal);
    };
    div.appendChild(card);
  }
}


function openDetails(id) {
  fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
    .then(r => r.json())
    .then(data => {
      let m = data.meals[0];
      currentMeal = m;
      document.getElementById("mealName").innerText = m.strMeal;
      document.getElementById("mealImg").src = m.strMealThumb;
      document.getElementById("mealArea").innerText = m.strArea;
      document.getElementById("mealCat").innerText = m.strCategory;
      document.getElementById("mealInst").innerText = m.strInstructions;
      document.getElementById("details").style.display = "flex";
    });
}

document.getElementById("deleteBtn").onclick = function() {
  meals = meals.filter(m => m.idMeal !== currentMeal.idMeal);
  document.getElementById("details").style.display = "none";
  showResults();
};

document.getElementById("cancelBtn").onclick = function() {
  document.getElementById("details").style.display = "none";
};

document.getElementById("orderBtn").onclick = function() {
  cart.push(currentMeal);
  updateCart();
  document.getElementById("details").style.display = "none";
};


function updateCart() {
  document.getElementById("cartIcon").style.display = "block";
  document.getElementById("count").innerText = cart.length;
}

document.getElementById("cartIcon").onclick = function() {
  document.getElementById("cart").style.display = "flex";
  let list = document.getElementById("cartItems");
  list.innerHTML = "";
  for (let c of cart) {
    list.innerHTML += "<p>" + c.strMeal + "</p>";
  }
};

document.getElementById("closeCart").onclick = function() {
  document.getElementById("cart").style.display = "none";
};
