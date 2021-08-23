//gère les interractions avec le panier

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
        //rechercher un article avec son id
        let match = cart.contents.filter(item => {
            if (item._id == id) {
                return true;
            }
        });

        if (match && match[0]) {
            return match[0];
        }
    },
    add(id) {
        //ajout d'un article dans le panier
        //on vérifie si l'article est déja dans le panier
        if (cart.find(id)) {
            cart.increase(id, 1);
        } else {
            let arr = PRODUCTS.filter(product => {
                if (product._id == id) {
                    return true;
                }
            });

            if (arr && arr[0]) {
                let obj = {
                    _id: arr[0]._id,
                    name: arr[0].name,
                    qty: 1,
                    price: arr[0].price,
                    imageUrl: arr[0].imageUrl
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
            if (item._id === id) {
                item.qty = item.qty + qty;
            }

            return item;
        });

        //mise à jour du localStorage
        cart.sync();
    },
    reduce(id, qty = 1) {
        //réduit la quantité de l'article
        cart.contents = cart.contents.map(item => {
            if (item._id === id) {
                item.qty = item.qty - qty;
            }

            return item;
        });
        //mise à jour du localStorage
        cart.sync();
    },
    remove(id) {
        //supprime un article du panier en utilisant son id
        cart.contents = cart.contents.filter(item => {
            if (item._id !== id) {
                return true;
            }
        });

        //mise à jour du localStorage
        cart.sync()
    },
    empty() {
        //vide tout le panier
        cart.contents = [];
        //mise à jour du localStorage
        cart.sync()
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
};


let PRODUCTS = [];

document.addEventListener('DOMContentLoaded', () => {
    //quand la page est prête
    getProducts(showProducts, errorMessage);
    //initialiser le panier
    cart.init();
    //affiche le panier
    try {
        showCart();
    } catch (err) {
        console.log(err);
    }
});

//affichage du prix total des articles
let totalPrice = document.getElementById('total-price');
//création de la page panier en html
function showCart() {
    let cartItems = document.getElementById('cart-items');
    let total = 0;

    cartItems.innerHTML = '';
    let s = cart.sort('qty'); //s comme "sort"

    s.forEach(element => {
        let cost = element.qty * (element.price / 100);
        let cartItem = document.createElement('div');

        cartItem.classList.add('row', 'bg-secondary', 'mt-3', 'text-white', 'd-flex', 'align-items-center', 'justify-content-between', 'cart-item');
        //création de la div img
        let imageContainer = document.createElement('div');

        imageContainer.classList.add('col-2', 'my-3');
        cartItem.appendChild(imageContainer);
        let articleImage = document.createElement('img');

        articleImage.setAttribute('width', '100');
        articleImage.setAttribute('height', '100');
        articleImage.src = element.imageUrl;
        articleImage.alt = element.name;
        imageContainer.appendChild(articleImage);
        //création de la div nom
        let articleNameContainer = document.createElement('div');

        articleNameContainer.classList.add('col-2', 'text-center');
        cartItem.appendChild(articleNameContainer);
        let articleName = document.createElement('p');

        articleName.innerText = element.name;
        articleNameContainer.appendChild(articleName);
        //création de la div de contrôle de la quantité
        let controls = document.createElement('div');

        controls.classList.add('controls', 'col-2', 'text-center');
        cartItem.appendChild(controls);
        //bouton moins
        let minus = document.createElement('span');

        minus.classList.add('btn', 'btn-warning', 'me-3');
        minus.textContent = '-';
        minus.setAttribute('data-id', element._id)

        controls.appendChild(minus);
        minus.addEventListener('click', decrementCart);
        //quantité
        let qty = document.createElement('span');
        qty.classList.add('item-qty');

        qty.textContent = element.qty;
        controls.appendChild(qty);
        //bouton plus
        let plus = document.createElement('span');

        plus.classList.add('btn', 'btn-warning', 'ms-3');
        plus.textContent = '+';
        plus.setAttribute('data-id', element._id)
        controls.appendChild(plus);
        plus.addEventListener('click', incrementCart)
        //prix
        let priceContainer = document.createElement('div');

        priceContainer.classList.add('col-2');
        cartItem.appendChild(priceContainer);
        let price = document.createElement('p');

        price.classList.add('article-price');
        price.innerHTML = cost + '€';
        priceContainer.appendChild(price);
        //bouton supprimer
        let supprBtnCtn = document.createElement('div');

        supprBtnCtn.classList.add('col-2');
        cartItem.appendChild(supprBtnCtn);
        let supprButton = document.createElement('button');

        supprButton.classList.add('btn', 'btn-danger');
        supprButton.setAttribute('data-id', element._id);
        supprButton.innerText = 'Supprimer';
        supprButton.addEventListener('click', removeItem)
        supprBtnCtn.appendChild(supprButton);

        cartItems.appendChild(cartItem);
        total += cost;
        totalPrice.innerText = total + '€';

    })
};

//augmenter la quantité d'un article
function incrementCart(e) {
    e.preventDefault();

    let id = e.target.getAttribute('data-id');

    cart.increase(id, 1);

    let controls = e.target.parentElement;
    let qty = controls.querySelector('span:nth-child(2)');
    let item = cart.find(id);

    if (item) {
        qty.textContent = item.qty;
    } else {
        document.getElementById('cart').removeChild(controls.parentElement);
    }

    showCart();
};

//réduire la quantité d'un article
function decrementCart(e) {
    e.preventDefault();

    let id = e.target.getAttribute('data-id');

    cart.reduce(id, 1);

    let controls = e.target.parentElement;
    let qty = controls.querySelector('span:nth-child(2)');
    let minus = controls.querySelector('span:nth-child(1)');
    let item = cart.find(id);

    if (item) {
        qty.textContent = item.qty;

        if (item.qty === 0) {
            cart.remove(id);
            controls.parentElement.remove();
        }
    }

    else {
        document.getElementById('cart').removeChild(controls.parentElement);
    }

    showCart();
};

//requête pour obtenir les informations produits
function getProducts(success, failure) {
    fetch('http://localhost:3000/api/teddies')
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(success)
        .catch(failure);
};

//création des cartes produit
function showProducts(products) {
    try {
        let itemsContainer = document.getElementById('listItems');

        PRODUCTS = products;
        products.forEach((element) => {
            //création d'une div.col pour chaque nouvelle carte créée
            let cardContainer = document.createElement('div');

            //créaction d'une div.card et d'une div.card-body pour afficher les articles
            let itemCard = document.createElement('div');

            itemCard.classList.add('card', 'h-100');
            itemCard.id = element._id;
            cardContainer.appendChild(itemCard);


            cardContainer.classList.add('col-12', 'col-lg-4', 'my-3');
            itemsContainer.appendChild(cardContainer);

            //extraction des éléments de l'objet js dans des éléments html
            let itemImage = document.createElement('img');

            //création de l'image
            itemImage.src = element.imageUrl;
            itemImage.height = 225;
            itemImage.classList.add('card-img-top', 'w-100');
            itemCard.appendChild(itemImage);

            let itemCardBody = document.createElement('div');

            itemCardBody.classList.add('card-body');
            itemCard.appendChild(itemCardBody);

            //nom de l'article
            let itemName = document.createElement('h3');
            itemName.textContent = element.name;
            itemName.classList.add('card-title');
            itemCardBody.appendChild(itemName);

            //prix de l'article
            let itemPrice = document.createElement('p');
            itemPrice.textContent = (element.price / 100) + '€';
            itemPrice.classList.add('text-right');
            itemCardBody.appendChild(itemPrice);

            //description de l'article
            let itemDescription = document.createElement('p');
            itemDescription.textContent = element.description;
            itemDescription.classList.add('card-text');
            itemCardBody.appendChild(itemDescription);

            //ajout du bouton panier et du lien vers la page produit
            let linkButtonCtn = document.createElement('div');
            linkButtonCtn.classList.add('d-flex', 'justify-content-between', 'align-items-center');
            itemCardBody.appendChild(linkButtonCtn);

            //bouton d'ajout au panier
            let addCartBtn = document.createElement('button');
            addCartBtn.classList.add('btn', 'btn-warning', 'float-right', 'btnAddCart');
            addCartBtn.textContent = 'Ajouter au panier';
            addCartBtn.setAttribute('data-id', element._id);
            addCartBtn.addEventListener('click', addItem);
            linkButtonCtn.appendChild(addCartBtn);

            //lien vers la page du produit
            let productLink = document.createElement('a');
            productLink.classList.add('text-muted', 'linkToProduct');
            productLink.href = `../product/produit.html?id=${element._id}`;
            productLink.innerHTML = 'Plus d&#39options';
            linkButtonCtn.appendChild(productLink);
        })
    } catch (err) {
        console.log(err);
    }
};

//ajout d'un article dans le panier
function addItem(e) {
    e.preventDefault();

    let id = e.target.getAttribute('data-id');

    console.log('article ajouté au panier', id);
    cart.add(id, 1);

    let cartAlert = document.getElementById('cartAlert');
    appear(cartAlert);
    setTimeout(disappear, 3000);

    try {
        showCart();
    } catch (err) {
        console.log(err);
    };
}

//apparition et disparition de l'alerte d'ajout au panier
function appear(div) {
    div.classList.remove('d-none');
    div.style.display = null;
}

function disappear() {
    let cartAlert = document.getElementById('cartAlert');
    cartAlert.style.display = 'none';
}

//suprresion d'articles dans le panier
function removeItem(e) {
    e.preventDefault();

    let id = e.target.getAttribute('data-id');

    cart.remove(id);

    e.target.parentElement.parentElement.remove();

    try {
        showCart();
    } catch (err) {
        console.log(err);
    };
}

function errorMessage(err) {
    //affiche le message d'erreur dans la console
    console.error(err);
}

//passer la commande
//extraire les id produits
const productsId = [];
cart.contents.forEach((element) => {
    //productsId.push(element._id);
    //if (element.qty > 1) {
    for (let i = 1; i <= element.qty; i++) {
        productsId.push(element._id);
    }
    //}
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
            localStorage.setItem('orderPrice', totalPrice.innerText);
            window.location = `./confirmpage.html?id=${json.orderId}&prix=${totalPrice.innerText}`;
        })
        .catch(function (err) {
            console.log(err);
        });
};

const formOrder = document.getElementById('order-form');
//écoute de l'envoie du formulaire
try {
    formOrder.addEventListener('submit', function (e) {
        e.preventDefault();
        //extraire les id produits
        const productsId = [];

        cart.contents.forEach((element) => {
            for (let i = 1; i <= element.qty; i++) {
                productsId.push(element._id);
            }
        })
        sendForm(customerContact, productsId);
        cart.empty();
    })
} catch (error) {
    console.log(error);
}