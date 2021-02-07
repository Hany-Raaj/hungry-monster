const mealItems = document.getElementById('mealItems');
const searchBtn = document.getElementById('searchBtn');
const warning = document.getElementById('warning');

searchBtn.addEventListener('click', function () {
    const mealInput = document.getElementById('mealInput').value;
    mealItems.innerHTML = '';
    if (mealInput === '') {
        warning.style.display = 'block';
    } else {
        getMeal(mealInput);
        warning.style.display = 'none';
    }
});

const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderMealInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};

const renderMealInfo = meal => {
    const mealDetailsDiv = document.getElementById('mealDetails');

    mealDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${meal.strMealThumb}" alt="">
    <h4>${meal.strMeal}</h4>
    
    <h5 class="pt-3 pb-2">Ingredients</h5>
    <ul class="list-unstyled mb-0">
        <li><i class="fa fa-check-square" aria-hidden="true"></i>${meal.strMeasure1}, ${meal.strIngredient1}</li>
        <li><i class="fa fa-check-square" aria-hidden="true"></i>${meal.strMeasure2}, ${meal.strIngredient2}</li>
        <li><i class="fa fa-check-square" aria-hidden="true"></i>${meal.strMeasure3}, ${meal.strIngredient3}</li>
        <li><i class="fa fa-check-square" aria-hidden="true"></i>${meal.strMeasure4}, ${meal.strIngredient4}</li>
    </ul>

`;
};

function getMeal(mealId) {
    const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(mainApi)
        .then(res => res.json())
        .then(data => {
            displayMeals(data.meals);
        });

    const displayMeals = meals => {
        const mealsDiv = document.getElementById('mealItems');
        if (meals != null) {
            meals.map(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.className = 'col-md-3';
                const mealInfo = `
                        <div onclick="displayDetails('${meal.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${meal.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${meal.strMeal}</h4>
                        </div>
                    `;
                mealDiv.innerHTML = mealInfo;
                mealsDiv.appendChild(mealDiv);
            });
        } else {
            warning.style.display = 'block';
        }
    };
}