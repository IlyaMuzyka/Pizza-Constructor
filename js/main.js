const inputsCheckboxes = document.querySelectorAll('.container-custom-checkbox input'),
      ingredients = document.querySelectorAll('.current-pizza-item'),
      drinks = document.querySelectorAll('.select-drink-item'),
      totalAmount = document.querySelector('.total-amount .summa'),
      orderBtn = document.querySelector('.typical-btn');

const modal = document.querySelector('.modal-window'),
      modalSubject = document.querySelector('.modal-window__subject'),
      modalOrderBtn = document.querySelector('.modal-window__submit-btn');

const calcOrder = () => {
    const activeIngredients = document.querySelectorAll('.container-custom-checkbox.active'),
          activeDrinks = document.querySelectorAll('.select-drink-item.active');

    const startPrice = 300,
          ingredientsPrice = activeIngredients.length * 25,
          drinksPrice = activeDrinks.length * 95;

    totalAmount.innerHTML = `${startPrice + ingredientsPrice + drinksPrice}₽`;
};

calcOrder();

const addedIngredient = checkboxes => {
    const checkboxesArr = Array.from(checkboxes),
          ingredientsArr = Array.from(ingredients);

    ingredientsArr.splice(0, 2);

    for(let checkbox of checkboxes) {
        checkbox.addEventListener('click', e => {
            const target = e.target,
                  index = checkboxesArr.indexOf(target);

            target.parentNode.classList.toggle('active');
            ingredientsArr[index].classList.toggle('active');

            calcOrder();
        });
    }
};

addedIngredient(inputsCheckboxes);

const addDrinks = drinks => {
    for(let drink of drinks) {
        drink.addEventListener('click', function() {
            this.classList.toggle('active');
            calcOrder();
        });
    }
};

addDrinks(drinks);

const showModal = () => {
    modal.classList.remove('none');
    prepareModalContent();
};

const hideModal = () => {
    modal.classList.add('none');
};

orderBtn.addEventListener('click', showModal);

window.addEventListener('click', e => {
    const target = e.target;

    if(target.classList.contains('modal-window')) {
        hideModal();
    }
});

modalOrderBtn.addEventListener('click', hideModal);

const cleanModalContent = () => {
    modalSubject.innerHTML = '';
};

const prepareModalContent = () => {
    cleanModalContent();

    const activeIngredients = document.querySelectorAll('.container-custom-checkbox.active'),
          activeDrinks = document.querySelectorAll('.select-drink-item.active');

    let ingredientsList = [],
        drinksList = [];

    if(activeIngredients) {
        for(let ingredient of activeIngredients) {
            ingredientsList.push(ingredient.innerText);
        }
    }

    if(activeDrinks) { 
        for(let drink of activeDrinks) {
            drinksList.push(drink.dataset.name);
        }
    }

    const totalIngredientsStr = ingredientsList.join(', ') || 'нет ингредиентов',
          totalDrinksStr = drinksList.join(', ') || 'нет напитков';

    const totalText = `Вы заказали пиццу с ингредиентами: ${totalIngredientsStr}, а так же напитки: ${totalDrinksStr}. С вас ${totalAmount.innerHTML}`;
    modalSubject.innerHTML = totalText;
};

