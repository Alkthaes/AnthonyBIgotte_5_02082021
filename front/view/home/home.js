/**
 * Gère les interactions JS sur la page principale
 */

/** */
class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle);
    }
};

const itemsContainer = document.getElementById('listItems');

fetch('http://localhost:3000/api/teddies')
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        const teddies = value;
        teddies.forEach((element) => {
            let newItem = new Article(element);
            //créaction d'une div.card pour afficher les articles
            let itemCard = document.createElement('div');
            itemCard.classList.add('card');
            itemsContainer.appendChild(itemCard);
            //extraction des éléments de l'objet js dans des éléments html
            let itemImage = document.createElement('img');
            itemImage.src = newItem.imageUrl;
            let itemName = document.createElement('p');
            itemName.innerText = newItem.name;
            itemName.classList.add('card-title');
            let itemPrice = document.createElement('p');
            itemPrice.innerText = (newItem.price / 100) + '€';
            itemPrice.classList.add('text-right');
            let itemDescription = document.createElement('p');
            itemDescription.innerText = newItem.description;
            itemDescription.classList.add('card-text');
            //insertion des éléments dans la div nouvellement créée
            itemCard.appendChild(itemImage);
            itemCard.appendChild(itemName);
            itemCard.appendChild(itemDescription);
            console.log(itemCard);
            itemCard.appendChild(itemPrice);


        })
    })
    .catch(function (err) {
        console.log(err)
    })