//gère la page panier
//récupération des articles dans le localStorage
let retrievedCartList = JSON.parse(localStorage.getItem('itemsInCart'));
console.log(retrievedCartList);
const mainContent = document.getElementById('main-content');
let totalPrice = 0;
let numberArticle = 1;

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
            <span id="number-item">${numberArticle}</span>
            <button id="add-item" class=" ml-3 btn btn-warning py-2 px-3">+</button>
        </div>
        <div class="col-3">
            <p class="article-price">${(element.price) / 100}€</p>
        </div>
        `
        ;
    totalPrice += ((element.price / 100));
    mainContent.appendChild(cartItem);


    const divTotal = document.createElement('div');
    divTotal.classList.add('mt-3');
    divTotal.innerHTML = `<p class="font-weight-bold">Total : <span id="total-price">${totalPrice}€</span></p>`;
    mainContent.appendChild(divTotal);
});

//ajout et suprresion d'articles dans le panier
mainContent.addEventListener('click', function (e) {
    if (e.target && e.target.matches('button#remove-item')) {

    }
})

//passer la commande
//extraire les id produits
const productsId = [];
retrievedCartList.forEach((element) => {
    productsId.push(element._id);
})
//extraire les données client
const customerContact = {
    firstName: document.getElementById('customerFirstName'),
    lastName: document.getElementById('customerLastName'),
    address: document.getElementById('customerAddress'),
    city: document.getElementById('customerCity'),
    email: document.getElementById('customerEmail')
};
//données envoyées au serveur
function sendForm(contact, products) {
    fetch('http://localhost:3000/api/teddies/order', {
        method: "POST",
        body: JSON.stringify({
            contact: contact,
            products: products,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            console.log(json);
            localStorage.setItem('orderId', json.orderId);
            localStorage.setItem('orderPrice', totalPrice);
            window.location = `./confirmpage.html?id=${json.orderId}&name=${customerContact.lastName}&prix=${totalPrice}`;
        })
        .catch(function (err) {
            console.log(err);
        });
}

const formOrder = document.getElementById('order-form');
//écoute de l'envoie du formulaire
formOrder.addEventListener('submit', function (e) {
    e.preventDefault();
    sendForm(customerContact, productsId);

    localStorage.removeItem('itemsInCart');
    //document.location.href = 'confirmpage.html';

    //console.log(json.orderId);
})