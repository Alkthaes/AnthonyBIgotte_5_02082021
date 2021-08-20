/*pour la fonction d'ajout au panier
et l'accés aux pages produit*/
import { cart } from './cart'
//stockage des produits ajoutés au panier dans le localStorage
let itemsInCart = [];
//conserver les articles dans le panier même en naviguant entre les pages porduits et la page d'accueil
if ((JSON.parse(localStorage.getItem('itemsInCart'))) != null) {
    (JSON.parse(localStorage.getItem('itemsInCart'))).forEach((element) => {
        itemsInCart.push(element);
    })
}

/*fonction d'ajout au panier*/
function addItemCart(object) {
    itemsInCart.push(listItems[listItems.indexOf(object)]);
}

//On test si l'id de la carte produit = l'id d'un objet de l'api teddies
function idChecker(target, array) {
    array.forEach((element) => {
        if (((target).parentElement.parentElement.parentElement.id) == element._id && target.matches('a.linkToProduct')) {
            localStorage.pageId = (target).parentElement.parentElement.parentElement.id;
            //location.href = '../product/produit.html';
        }
        else if (((target).parentElement.parentElement.parentElement.id) == element._id && target.matches('button.btnAddCart')) {
            addItemCart(element);
        }
    })
}

//On cible ici la div principale pour écouter l'event
//et on exécute deux codes différents pour le bouton ajout au panier et le lien vers la page produit
try {
    itemsContainer.addEventListener('click', function (e) {
        //e.preventDefault();
        if (e.target && e.target.matches('a.linkToProduct')) {
            idChecker(e.target, listItems);
        }
        else if (e.target && e.target.matches('button.btnAddCart')) {
            idChecker(e.target, listItems);
            localStorage.setItem(cart.KEY, JSON.stringify(itemsInCart));
            location.href = '../cart.html';
        }
    })
} catch (error) {
    console.log(error);
}

//ajouter au panier depuis la page produit
try {
    articleContainer.addEventListener('click', function (e) {
        if (e.target && e.target.matches('button#prodPgAddCart')) {
            itemsInCart.push(article);
            localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
            location.href = '../cart.html';
        }
    })
} catch (error) {
    console.log(error);
}




