/**
 * Gère les intéractions JS sur la page principale
 */


const itemsContainer = document.getElementById('listItems');
//on va stocker le résultat de la requête dans listItems
const listItems = [];

//création des cartes produit
function createItems(array) {
    array.forEach((element) => {
        //créaction d'une div.card et d'une div.card-body pour afficher les articles
        let itemCard = document.createElement('div');
        itemCard.classList.add('card', 'h-100');
        itemCard.id = element._id;
        let itemCardBody = document.createElement('div');
        itemCardBody.classList.add('card-body');
        //création d'une div.col pour chaque nouvelle carte créée
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('col-12', 'col-lg-4', 'my-3');
        //extraction des éléments de l'objet js dans des éléments html
        let itemImage = document.createElement('img');
        itemImage.src = element.imageUrl;
        itemImage.height = 225;
        itemImage.classList.add('card-img-top', 'w-100');
        let itemName = document.createElement('h3');
        itemName.textContent = element.name;
        itemName.classList.add('card-title');
        let itemPrice = document.createElement('p');
        itemPrice.textContent = (element.price / 100) + '€';
        itemPrice.classList.add('text-right');
        let itemDescription = document.createElement('p');
        itemDescription.textContent = element.description;
        itemDescription.classList.add('card-text');
        let linkButtonCtn = document.createElement('div');
        linkButtonCtn.classList.add('d-flex', 'justify-content-between', 'align-items-center')
        let addCartBtn = document.createElement('div');
        addCartBtn.classList.add('btn', 'btn-warning', 'float-right', 'btnAddCart');
        addCartBtn.textContent = 'Ajouter au panier'
        let productLink = document.createElement('a');
        productLink.classList.add('text-muted', 'linkToProduct');
        productLink.href = '../product/produit.html';
        productLink.innerHTML = 'Plus d&#39options';
        //insertion des éléments dans les divs nouvellement créées
        itemCard.appendChild(itemImage);
        itemCardBody.appendChild(itemName);
        itemCardBody.appendChild(itemDescription);
        itemCardBody.appendChild(itemPrice);
        linkButtonCtn.appendChild(productLink);
        linkButtonCtn.appendChild(addCartBtn);
        itemCardBody.appendChild(linkButtonCtn);
        itemCard.appendChild(itemCardBody);
        cardContainer.appendChild(itemCard);
        itemsContainer.appendChild(cardContainer);
    })
}

//appel de l'api pour obtenir les informations des produits
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
            listItems.push(element);
        })
    })
    .then(function () {
        createItems(listItems);
    })
    .catch(function (err) {
        console.log(err)
    });
;

//On test si l'id de la carte produit = l'id d'un objet de l'api teddies
function idChecker(target, array) {
    array.forEach((element) => {
        if (((target).parentElement.parentElement.parentElement.id) == element._id && target.matches('a.linkToProduct')) {
            localStorage.pageId = (target).parentElement.parentElement.parentElement.id;
            location.href = '../product/produit.html';
        }
    })
}

itemsContainer.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target && e.target.matches('a.linkToProduct')) {
        console.log('ça marche !');
        console.log(e.target);
        console.log((e.target).parentElement.parentElement.parentElement.id);
        idChecker(e.target, listItems);
    }
    else if (e.target && e.target.matches('div.btnAddCart')) {
        console.log('ça marche aussi !');
        console.log(e.target);
        console.log((e.target).parentElement.parentElement.parentElement.id);
        idChecker(e.target, listItems);

    }
});


