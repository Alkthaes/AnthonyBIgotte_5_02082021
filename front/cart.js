//gère la page panier
//récupération des articles dans le localStorage
let retrievedCartList = JSON.parse(localStorage.getItem('itemsInCart'));
console.log(retrievedCartList);
const mainContent = document.getElementById('main-content');
let totalPrice = 0;

//affichange de la liste des articles dans le panier
retrievedCartList.forEach((element) => {
    let cartItem = document.createElement('div');
    cartItem.classList.add('row', 'bg-secondary', 'mt-3', 'text-white', 'd-flex', 'align-items-center');
    cartItem.innerHTML =
        `<div class="col-3">
            <img src="${element.imageUrl}" alt="" width="80" height="80" class="m-3">
        </div>
        <div class="col-3">
            <p>${element.name}</p>
        </div>
        <div class="col-3">
            <button id="remove-item" class=" mr-3 btn btn-warning py-2 px-3">-</button>
            <span id="number-item">1</span>
            <button id="add-item" class=" ml-3 btn btn-warning py-2 px-3">+</button>
        </div>
        <div class="col-3">
            <p class="article-price">${(element.price) / 100}€</p>
        </div>
        `
        ;
    totalPrice += ((element.price / 100));
    mainContent.appendChild(cartItem);
})
const divTotal = document.createElement('div');
divTotal.innerHTML = `<p>Total : <span id="total-price">${totalPrice}€</span></p>`;
mainContent.appendChild(divTotal);