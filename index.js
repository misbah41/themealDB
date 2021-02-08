
const mealDisplay = document.getElementById('mealDisplay');
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
	if (searchInput !== "") {
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
			.then(response => response.json())
			.then(data => {
				let renderHtmlTag = "";
				if (data.meals) {
					data.meals.forEach(meal => {
						renderHtmlTag += `
						<div onclick="getDetails(${meal.idMeal})"  class="meal-itemBox" data-id = "${meal.idMeal}">
							<div class = "meal-img">
								<img src = "${meal.strMealThumb}" alt = "food">
							</div>
							<div class = "meal-name">
								<h3>${meal.strMeal}</h3>
							</div>
						</div>
						`;
					});
					mealDisplay.classList.remove('findFail');
				} else {
					renderHtmlTag = "Sorry, Please Enter a Valid Recipe Name!";
					mealDisplay.classList.add('findFail');
				}
				mealDisplay.innerHTML = renderHtmlTag;
			})
			.catch (()=> alert('API fail Please wait a few minutes'))

	} else {
		alert('Please Enter Any Recipe Name')
	}
});



// Function For Get Details Of Meals
const getDetails = mealId => {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
		.then(response => response.json())
		.then(data => modalMealRecipe(data.meals));

}

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
				<ul id="ingredientList">

				</ul>
		 </div>
 `;
	mealDetailsContent.innerHTML = renderHtmlTag;
	//for loop for all ingredients 
	const ingredientList = document.getElementById('ingredientList');
	for (let i = 1; i <= 20; i++) {
		if (meal['strIngredient' + i]) {
			const ingredients = document.createElement('li');
			ingredients.innerText = `${meal['strMeasure' + i]} ${meal['strIngredient' + i]}`;
			ingredientList.appendChild(ingredients);
		}
	}
	mealDetailsContent.parentElement.classList.add('showRecipe');
};


//thank you