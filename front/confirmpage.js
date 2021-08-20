const container = document.querySelector('main.container');
const orderId = localStorage.getItem('orderId');
const orderPrice = localStorage.getItem('orderPrice');
const orderSummary = document.createElement('div');
orderSummary.classList.add('row');
orderSummary.innerHTML =
    `<div class="col col-md-8 bg-white">
        <h2 class ="mb-5">Numéro de commande</h2>
            <p class="mb-5">Votre numéro de commande est : <span class="font-weight-bold">${orderId}</span><br>
            gardez-le bien précieusement !</p>
            <p>Prix total de la commande : ${orderPrice}</p>
    </div>
            `
    ;
container.appendChild(orderSummary);