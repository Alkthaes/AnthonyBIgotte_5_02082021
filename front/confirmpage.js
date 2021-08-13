const container = document.querySelector('main.container');
const orderId = localStorage.getItem('orderId');
const orderPrice = localStorage.getItem('orderPrice');
const orderSummary = document.createElement('div');
orderSummary.classList.add('row');
orderSummary.innerHTML =
    `<div class="col-8 bg-white">
        <h2>Numéro de commande</h2>
            <p>Votre numéro de commande est :${orderId}<br>
            gardez-le bien précieusement !</p>
            <p>Prix total de la commande : ${orderPrice}€</p>
    </div>
            `
    ;
container.appendChild(orderSummary);