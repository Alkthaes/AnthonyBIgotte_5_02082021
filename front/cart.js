//gère la page panier
document.addEventListener('DOMContentLoaded', () => {
    //quand la page est prête
    getProducts();
    //récupérer les article du localStorade
    cart.init();
    //charger les articles du panier
    showCart();
});
//appel de l'api pour obtenir les informations des produits
const products = [];
function getProducts() {
    fetch('http://localhost:3000/api/teddies')
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            value.forEach((element) => {
                //on extrait ici chaque objet de la réponse de la requête dans l'array listItems
                //pour utiliser les données à volonté
                products.push(element);
            })
        })
        .catch(function (err) {
            console.log(err)
        });
};

//récupération des articles dans le localStorage
const cart = {
    KEY: 'Orinoco_cart',
    contents: [],
    init() {
        //on consulte le contenu du localStorage et initialise cart.contents
        let _contents = localStorage.getItem(cart.KEY);
        if (_contents) {
            cart.contents = JSON.parse(_contents);
        } else {
            //panier factice de test
            cart.contents = [
                {
                    "colors": ["Tan", "Chocolate", "Black", "White"],
                    "_id": "5be9c8541c9d440000665243",
                    "name": "Norbert",
                    "price": 2900,
                    "imageUrl": "teddy_1.jpg",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "qty": 2
                },
                {
                    "colors": [
                        "Pale brown",
                        "Dark brown",
                        "White"
                    ],
                    "_id": "5beaa8bf1c9d440000a57d94",
                    "name": "Arnold",
                    "price": 3900,
                    "imageUrl": "teddy_2.jpg",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "qty": 1
                },
                {
                    "colors": [
                        "Brown",
                        "Blue",
                        "Pink"
                    ],
                    "_id": "5beaabe91c9d440000a57d96",
                    "name": "Gustav",
                    "price": 4500,
                    "imageUrl": "teddy_4.jpg",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "qty": 1
                },
            ];
            cart.sync();
        }
    },
    async sync() {
        let _cart = JSON.stringify(cart.contents);
        await localStorage.setItem(cart.KEY, _cart); //modifie le localStorage storage en fonction du contenu de cart.contents
    },
    find(id) {
        //rechercher un article avec son nom
        let match = cart.contents.filter(item => {
            if (item._id == id)
                return true;
        });
        if (match && match[0])
            return match[0];
    },
    add(id) {
        //ajout d'un article dans le panier
        //on vérifie si l'article est déja dans le panier
        if (cart.find(id)) {
            cart.increase(id, 1);
        } else {
            let arr = products.filter(product => {
                if (product._id == id) {
                    return true;
                }
            });
            if (arr && arr[0]) {
                let obj = {
                    _id: arr[0]._id,
                    name: arr[0].name,
                    qty: 1,
                    price: arr[0].price
                };
                cart.contents.push(obj);
                //mise à jour du localStorage
                cart.sync();
            } else {
                //le nom du produit n'existe pas
                console.error('Produit invalide');
            }
        }
    },
    increase(id, qty = 1) {
        //augmenter la quantité dde l'article
        cart.contents = cart.contents.map(item => {
            if (item._id === id)
                item.qty = item.qty + qty;
            return item;
        });
        //mise à jour du localStorage
        cart.sync();
    },
    reduce(id, qty = 1) {
        //réduit la quantité de l'article
        cart.contents = cart.contents.map(item => {
            if (item._id === id)
                item.qty = item.qty - qty;
            return item;
        });
        //mise à jour du localStorage
        cart.sync();
    },
    remove(id) {
        //supprime un article du panier en utilisant son id
        cart.contents = cart.contents.filter(item => {
            if (item.id !== id)
                return true;
        });
        //mise à jour du localStorage
        cart.sync()
    },
    empty() {
        //vide tout le panier
        CART.contents = [];
        //mise à jour du localStorage
        CART.sync()
    },
    sort(field = 'id') {
        //trier par catégorie ex : nom, prix, id
        //retourne une copie triée de cart.contents
        let sorted = cart.contents.sort((a, b) => {
            if (a[field] > b[field]) {
                return 1;
            } else if (a[field] < a[field]) {
                return -1;
            } else {
                return 0;
            }
        });
        return sorted;
        //pas d'impact sur le localStorage
    },
}

function addItem(e) {
    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    console.log('article ajouté au panier', id);
    cart.add(id, 1);
    showCart();
}

const mainContent = document.getElementById('main-content');
let totalPrice = document.querySelector('span#total-price');
let total = 0;

//création de la page panier en html
function showCart() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let s = cart.sort('qty'); //s comme "sort"
    s.forEach(element => {
        let cartItem = document.createElement('div');
        let numberArticle = element.qty;
        let price = (numberArticle * element.price) / 100;
        total += price;
        let imgPath = '../images/';
        cartItem.classList.add('row', 'bg-secondary', 'mt-3', 'text-white', 'd-flex', 'align-items-center', 'justify-content-between', `article-${element.name}`);
        cartItem.innerHTML =
            `<div class="col-2">
            <img src="${imgPath + element.imageUrl}" alt="" width="80" height="80" class="m-3">
        </div>
        <div class="col-2 text-center">
            <p class="itemName">${element.name}</p>
        </div>
        <div class="col-2">
            <label for="number-article" class="sr-only">Quantité</label>
            <input class="number-article" name="number-article" type="number" min="1" placeholder="${numberArticle}" data-id="${element._id}">
        </div>
        <div class="col-2 text-center">
            <p class="article-price">${price}€</p>
        </div>
        <div class="col-2">
            <button type="button" class="btn btn-danger remove-item" data-id="${element._id}">Supprimer</button>
        </div>
        `
            ;
        totalPrice.innerHTML = total + '€';
        const divTotal = document.getElementById('total-container');
        cartItems.appendChild(cartItem);
        mainContent.insertBefore(cartItems, divTotal);
    })
};

//modification de la quantité d'articles


//suprresion d'articles dans le panier
function removeItem() {
    let removeButtons = document.getElementsByClassName('remove-item');
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', function (e) {
            e.preventDefault();
            console.log('clicked');
            let id = e.target.getAttribute('data-id');
            cart.remove(id);
        })
    }
};

//passer la commande
//extraire les id produits
const productsId = [];
cart.contents.forEach((element) => {
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
})