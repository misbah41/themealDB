
const mealList = document.getElementById('mealDisplay');
const mealDetailsContent = document.querySelector('.mealDetailsContent');

// deatials button event listeners
const detailsCloseBtn = document.getElementById('detailsCloseBtn');
detailsCloseBtn.addEventListener('click', () => {
	mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list that matches with the ingredients list
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
	let searchInput = document.getElementById('searchInput').value;
	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
		.then(response => response.json())
		.then(data => {
			let renderHtmlTag = "";
			if (data.meals) {
				data.meals.forEach(meal => {
					renderHtmlTag += `
						 <div id="modalBox" class="meal-item" data-id = "${meal.idMeal}">
								 <div class = "meal-img">
										 <img src = "${meal.strMealThumb}" alt = "food">
								 </div>
								 <div class = "meal-name">
										 <h3>${meal.strMeal}</h3>
										 <a href = "#" class = "detailsBtn">Get Details</a>
								 </div>
						 </div>
						 `;
				});
				mealList.classList.remove('findFail');
			} else {
				renderHtmlTag = "Sorry, Please Enter a Valid Recipe Name!";
				mealList.classList.add('findFail');
			}
			mealList.innerHTML = renderHtmlTag;
		});
});


// get recipe of the meal list
mealList.addEventListener('click', function (e) {
	e.preventDefault();
	if (e.target.classList.contains('detailsBtn')) {
		let mealItem = e.target.parentElement.parentElement;
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
			.then(res => res.json())
			.then(data => modalMealRecipe(data.meals));
	}
});


// create a modal function
function modalMealRecipe(meal) {
	meal = meal[0];
	let renderHtmlTag = `
		 <h2 class = "recipe-title">${meal.strMeal}</h2>
		 <div class = "recipe-meal-img">
				 <img src = "${meal.strMealThumb}" alt = "">
		 </div>
		 <p class = "recipe-category">${meal.strCategory}</p>
		 <div class = "recipe-instruct">
				 <h3>INGREDIENTS</h3>
				 <li ><i class="fa fa-check-square" aria-hidden="true"></i>
					 ${meal.strIngredient1}</li>
				 <li><i class="fa fa-check-square" aria-hidden="true"></i>
					 ${meal.strIngredient2}</li>
				 <li><i class="fa fa-check-square" aria-hidden="true"></i>
					 ${meal.strIngredient3}</li>
				 <li><i class="fa fa-check-square" aria-hidden="true"></i>
					 ${meal.strIngredient4}</li>
				 <li><i class="fa fa-check-square" aria-hidden="true"></i>
					 ${meal.strIngredient5}</li>
				 <li><i class="fa fa-check-square" aria-hidden="true"></i>
					 ${meal.strIngredient6}</li>
				 <li><i class="fa fa-check-square" aria-hidden="true"></i>
					 ${meal.strIngredient7}</li>
				 <li><i class="fa fa-check-square" aria-hidden="true"></i>
					 ${meal.strIngredient8}</li>
		 </div>
 `;
	mealDetailsContent.innerHTML = renderHtmlTag;
	mealDetailsContent.parentElement.classList.add('showRecipe');
};


